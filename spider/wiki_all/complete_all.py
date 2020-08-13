import requests
import wikiapi
import pymongo
import time
import math
import csv
from multiprocessing import Process, Lock


base_url = 'https://zh.wikipedia.org/w/api.php'     # 中文Wiki API


# 根据词条名字获取查询链接
def get_url_by_name(name):
    return base_url + \
           '?action=query&format=json&prop=extracts&titles=' + \
           name + '&explaintext=1&exsectionformat=wiki'


# 根据 page_id 获取查询链接
def get_url_by_page_id(page_id):
    return base_url + \
           '?action=query&format=json&prop=extracts&pageids=' + \
           str(page_id) + '&explaintext=1&exsectionformat=wiki&redirects=1'

# print(get_url_by_page_id(5893962))


# 输出debug信息
def print_debug_info(lock, info_type, *args):
    pass
    # lock.acquire()
    # print(info_type, end=' ')
    # for i in args:
    #     print(i, end=' ')
    # print('\n')
    # lock.release()


# 标记超链接文本
def make_linked_words(text, link_dict, redirect_dict):
    linked_words = list()
    for link_dict_title, link_dict_page_id in link_dict.items():
        if link_dict_title in text:
            linked_words.append({
                'text': link_dict_title,
                'page_id': link_dict_page_id
            })

    for redirect_dict_from, redirect_dict_to in redirect_dict.items():
        if redirect_dict_from in text:
            linked_words.append({
                'text': redirect_dict_from,
                'page_id': link_dict[redirect_dict_to]
            })

    return linked_words


# 将内容包装成item
def make_sections(sections, link_dict, redirect_dict):
    ret = []
    for i in sections:
        cur_section = {
            'title': i.title,
            'text': i.text,
            'linked_words': make_linked_words(i.text, link_dict, redirect_dict),
            'sections': make_sections(i.sections, link_dict, redirect_dict)
        }

        ret.append(cur_section)
    return ret


# 获取该词条链接到的 Main/Article 词条的 page_id 与 真名，与重定向信息
def link_query(page_id):
    session = requests.Session()
    params = {'action': 'query', 'generator': 'links', 'pageids': page_id, 'format': 'json',  'redirects': 1, 'gplnamespace': 0, 'gpllimit': 500,}
    tmp_container = session.get(base_url, params=params).json()

    redirect_dict = dict()
    link_dict = dict()
    for i in tmp_container['query']['pages'].values():
        if i.get('missing') is None:
            link_dict[i['title']] = i['pageid']
    if tmp_container['query'].get('redirects') is not None:
        for i in tmp_container['query']['redirects']:
            redirect_dict[i['from']] = i['to']

    while 'continue' in tmp_container:
        params['gplcontinue'] = tmp_container['continue']['gplcontinue']
        tmp_container = session.get(base_url, params=params).json()
        if tmp_container['query'].get('redirects') is not None:
            for i in tmp_container['query']['redirects']:
                redirect_dict[i['from']] = i['to']
        for i in tmp_container['query']['pages'].values():
            if i.get('missing') is None:
                link_dict[i['title']] = i['pageid']
    session.close()
    return {
        'redirect_dict': redirect_dict,
        'link_dict': link_dict
    }


def parse(response, lock, mongo):
    json = response.json()
    json_pages = json['query']['pages']

    # extracts 信息分段发送（冗余）
    if 'continue' in json:
        print_debug_info(lock, 'Error:', 'extracts need continue')

    # page_id 为json动态属性，需要用for循环获取
    for page_id, page_content in json_pages.items():
        if 'redirects' in json['query']:
            if mongo.count_documents({'page_id': int(page_id)}) != 0:
                return None
                # return {
                #     'isNone': True,
                #     'redirects_to': int(page_id)
                # }

        # page_id 为"-1"则词条不存在（冗余）
        if page_id != '-1':
            title = json_pages[page_id]['title']
            wiki = wikiapi.Wikipedia('zh', json, page_id)
            page = wiki.page(title)

            # 只考虑 namespace 为 Main/Article的词条，namespace参见"https://en.wikipedia.org/wiki/Wikipedia:Namespace"（冗余）
            if page.namespace == 0:

                # 该名字为"别名"，需要额外一次请求获取"真名"（冗余）
                if page_content['extract'] == '':
                    real_title = page.displaytitle
                    print_debug_info(lock, page_id, 'Warning:', 'extracts is empty')

                # 该词条是一个完整的实体，可以被保存（正常情况仅有该代码段会执行）
                else:
                    print_debug_info(lock, 'Success:', page.namespace, page_id, title, response)

                    linked_items = []

                    # 将被该词条链接的词条加入爬取队列，此处需要至少一个请求
                    query = link_query(page_id)
                    link_dict = query['link_dict']
                    redirect_dict = query['redirect_dict']
                    for link_title in link_dict:
                        link_page_id = link_dict[link_title]
                        linked_items.append({'page_id': link_page_id, 'title': link_title})

                    sections = {
                        'title': 'summary',
                        'text': page.summary,
                        'linked_words': make_linked_words(page.summary, link_dict, redirect_dict),
                        'sections': make_sections(page.sections, link_dict, redirect_dict)
                    }

                    return {
                        'page_id': int(page_id),
                        'title': title,
                        'sections': sections,
                        'linked_items': linked_items
                    }

            # namespace 不为0（冗余）
            else:
                print_debug_info(lock, 'Warning:', 'ns is not 0')

        # page_id 为 -1，即该词条不存在，且无重定向链接（冗余）
        else:
            print_debug_info(lock, 'Warning', 'page_id is -1')

    return None
    # return {
    #     'isNone': True
    # }


def get_response(page_id, request_session, lock):
    retry_cnt = 0
    # lock.acquire()
    # print(page_id)
    # lock.release()
    while True:
        try:
            response = request_session.get(get_url_by_page_id(page_id), timeout=10)
            return response

        except Exception as e:
            retry_cnt += 1

            lock.acquire()
            print(str(page_id) + ':', 'Fetch Response Timeout(10s) ' + str(retry_cnt) + ' times', e)
            lock.release()

            time.sleep(1)
            continue


def complete_all(id, start, end, lock):
    page_size = 10

    request_session = requests.Session()
    page_mongo_session = pymongo.MongoClient(
        'mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@59.110.238.59:10086/pedia_search')
    all_mongo_session = pymongo.MongoClient(
        'mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@47.113.103.137:10086/pedia_search')

    node_csv_file = open('data/node_' + str(id) + '.csv', 'a+', newline='', encoding='utf_8_sig')
    node_csv = csv.writer(node_csv_file)

    relation_csv_file = open('data/relation_' + str(id) + '.csv', 'a+', newline='', encoding='utf_8_sig')
    relation_csv = csv.writer(relation_csv_file)

    cnt = 0
    s = 0
    page = all_mongo_session['pedia_search']['pedia_remain'].find(skip=start+cnt, limit=page_size)


    while start + cnt < end:
        t_cnt = 0
        for i in page:
            t_cnt += 1
            response = get_response(i['page_id'], request_session, lock)
            item = parse(response, lock, page_mongo_session['pedia_search']['pedia_search'])

            if item is not None:
                s += 1
                page_mongo_session['pedia_search']['pedia_search'].insert_one(item)
                cur_id = item['page_id']
                cur_node = (cur_id, 'Entry', item['title'], 0.0)
                node_csv.writerow(cur_node)
                for ii in item['linked_items']:
                    relation_csv.writerow(('linkTo', cur_id, ii['page_id']))
            # if item.get('isNone') is not None and item.get('redirects_to') is not None:
            #     print('Process ' + str(id) + ':', i['page_id'], '->', item['redirects_to'], 'already exists.')
            # elif item.get('redirects_to') is not None:
            #     print('Process ' + str(id) + ':', i['page_id'], '->', item['redirects_to'], 'newly stored')
            # lock.acquire()
            # print(item)
            # lock.release()

        cnt += page_size
        page = all_mongo_session['pedia_search']['pedia_all'].find(skip=start + cnt, limit=page_size)

        lock.acquire()
        print('Process ' + str(id) + ':', str(s) + ' / ' + str(cnt) + ' / ' + str(end - start), str(cnt / (end - start) * 100) + '%')
        lock.release()

    print('Process ' + str(id), 'done.', s, 'scraped.')


def main():
    all_mongo_session = pymongo.MongoClient(
        'mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@47.113.103.137:10086/pedia_search')
    max_cnt = all_mongo_session['pedia_search']['pedia_remain'].count_documents({})
    all_mongo_session.close()

    process_num = 8
    process_arr = []
    lock = Lock()

    start = 0
    end = math.floor(max_cnt / process_num)
    process_arr.append(Process(target=complete_all, args=(1, start, end, lock,)))
    print('Process ' + str(1) + ' :', str(start) + ' - ' + str(end))

    for i in range(2, process_num):
        start = end + 1
        end = start + math.floor(max_cnt / process_num)
        p = Process(target=complete_all, args=(i, start, end, lock,))
        process_arr.append(p)
        print('Process ' + str(i) + ' :', str(start) + ' - ' + str(end))

    start = end + 1
    end = max_cnt
    process_arr.append(Process(target=complete_all, args=(process_num, start, end, lock,)))
    print('Process ' + str(process_num) + ' :', str(start) + ' - ' + str(end))

    for i in process_arr:
        time.sleep(1)
        i.start()


if __name__ == '__main__':
    main()
