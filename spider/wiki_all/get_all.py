import requests
import pymongo

base_url = 'https://zh.wikipedia.org/w/api.php'
request_session = requests.Session()
mongo_session = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@47.113.103.137:10086/pedia_search')

params = {
    'action': 'query',
    'list': 'allpages',
    'gapfilterredir': 'nonredirects',
    'apnamespace': 0,
    'aplimit': 500,
    'format': 'json'
}


def store_mongo(json):
    page_arr = json['query']['allpages']
    arr = []
    for i in page_arr:
        tmp = {
            'page_id': i['pageid'],
            'title': i['title']
        }
        arr.append(tmp)

    mongo_session['pedia_search']['pedia_all'].insert_many(arr)


my_get = request_session.get(base_url, params=params).json()
cnt = 1
print('Query:', cnt, end=' ', flush=True)

store_mongo(my_get)
print('Scraped:', cnt * 500, flush=True)

while 'continue' in my_get:
    params['apcontinue'] = my_get['continue']['apcontinue']
    my_get = request_session.get(base_url, params=params).json()
    cnt += 1
    print('Query:', cnt, end=' ', flush=True)
    store_mongo(my_get)
    print('Scraped:', cnt * 500, flush=True)

request_session.close()
mongo_session.close()
