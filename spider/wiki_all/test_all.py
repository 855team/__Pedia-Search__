import pymongo

mongo_session = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@47.113.103.137:10086/pedia_search')


cnt = 0
cursor = mongo_session['pedia_search']['pedia_all'].find().distinct('pager_id')
print(cursor)

# while cnt <= 1000:
#     cnt += 1
#     print(cnt, cursor)
#     cursor = cursor.next()
