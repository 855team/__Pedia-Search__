import pymongo

page_size = 100

from_mongo_session = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@59.110.238.59:10086/pedia_search')

to_mongo_session = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@47.113.103.137:10086/pedia_search')

txt_file = open('dump.txt', 'a+', newline='', encoding='utf_8_sig')

cnt = 0
max_cnt = 10000
page = from_mongo_session['pedia_search']['pedia_search'].find(skip=cnt, limit=page_size)
# max_cnt = mongo_session['pedia_search']['pedia_search'].count_documents({})

while cnt < max_cnt:
    cnt += page_size
    arr = []
    for i in page:
        txt_file.write(i['title']+'\n')
        arr.append(i)
    to_mongo_session['pedia_search']['pedia_search'].insert_many(arr)
    print(str(cnt / max_cnt * 100) + '%')
    page = from_mongo_session['pedia_search']['pedia_search'].find(skip=cnt, limit=page_size)

txt_file.close()

# for i in cursor:
#     cnt += 1
#     print(cnt)
#     print(i)

# while cnt <= 1000:
#     cnt += 1
#     print(cnt, cursor)
#     cursor = cursor.next()
