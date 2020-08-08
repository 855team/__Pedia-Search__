import pymongo
import requests
import time
import math
from multiprocessing import Process, Lock

base_url = 'https://zh.wikipedia.org/w/api.php'


def get_url_by_page_id(page_id):
    return base_url + \
           '?action=query&format=json&pageids=' + \
           str(page_id) + '&redirects=1'


def get_redirects_info(page_id, request_session, lock):
    retry_cnt = 0
    while True:
        try:
            json = request_session.get(get_url_by_page_id(page_id), timeout=10).json()
            return json

        except Exception as e:
            retry_cnt += 1

            lock.acquire()
            print('Fetch Redirects_Info Timeout(10s) ' + str(retry_cnt) + ' times', e)
            lock.release()

            time.sleep(1)
            continue


def get_rem(id, start, end, lock):
    page_size = 50

    request_session = requests.Session()
    page_mongo_session = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@59.110.238.59:10086/pedia_search')
    all_mongo_session = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@47.113.103.137:10086/pedia_search')

    cnt = 0
    page = all_mongo_session['pedia_search']['pedia_all'].find(skip=start+cnt, limit=page_size)
    s = 0

    request_set = set()

    while start + cnt < end:
        t_cnt = 0
        for i in page:
            t_cnt += 1
            if page_mongo_session['pedia_search']['pedia_search'].count_documents({'page_id': int(i['page_id'])}) == 0:
                json = get_redirects_info(int(i['page_id']), request_session, lock)
                if 'redirects' in json['query']:
                    for _page_id, _page in json['query']['pages'].items():
                        if _page_id not in request_set:
                            if page_mongo_session['pedia_search']['pedia_search'].count_documents({'page_id': int(_page_id)}) == 0:
                                all_mongo_session['pedia_search']['pedia_remain'].update_one({'page_id': int(_page_id)}, {'$set': {'page_id': int(_page_id)}}, upsert=True)
                                request_set.add(int(_page_id))
                                # print('Redirects:', str(i['page_id']) + '->' + str(_page_id), str(len(request_set)) + ' / ' + str(cnt + t_cnt), _page_id, str((cnt + t_cnt) / (end - start) * 100) + '%')
                else:
                    s += 1
                    all_mongo_session['pedia_search']['pedia_remain'].update_one({'page_id': int(i['page_id'])}, {'$set': {'page_id': int(i['page_id'])}}, upsert=True)
                    request_set.add(int(i['page_id']))
                    # print('Non-redirects:', str(len(request_set)) + ' / ' + str(cnt + t_cnt), i['page_id'], str((cnt + t_cnt) / (end - start) * 100) + '%')

        cnt += page_size
        page = all_mongo_session['pedia_search']['pedia_all'].find(skip=start+cnt, limit=page_size)

        lock.acquire()
        print('Process ' + str(id) + ':', str(len(request_set)) + ' / ' + str(cnt) + ' / ' + str(end - start), str(cnt / (end - start) * 100) + '%')
        lock.release()

    print('Process ' + str(id), 'done.', s, 'scraped.')

    request_session.close()
    all_mongo_session.close()
    page_mongo_session.close()


def main():
    all_mongo_session = pymongo.MongoClient(
        'mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@47.113.103.137:10086/pedia_search')
    max_cnt = all_mongo_session['pedia_search']['pedia_all'].count_documents({})
    all_mongo_session.close()

    process_num = 6
    process_arr = []
    lock = Lock()

    start = 0
    end = math.floor(max_cnt / process_num)
    process_arr.append(Process(target=get_rem, args=(1, start, end, lock,)))
    print('Process ' + str(1) + ' :', str(start) + ' - ' + str(end))

    for i in range(2, process_num):
        start = end + 1
        end = start + math.floor(max_cnt / process_num)
        p = Process(target=get_rem, args=(i, start, end, lock,))
        process_arr.append(p)
        print('Process ' + str(i) + ' :', str(start) + ' - ' + str(end))

    start = end + 1
    end = max_cnt
    process_arr.append(Process(target=get_rem, args=(process_num, start, end, lock,)))
    print('Process ' + str(process_num) + ' :', str(start) + ' - ' + str(end))

    for i in process_arr:
        time.sleep(1)
        i.start()


if __name__ == '__main__':
    main()
