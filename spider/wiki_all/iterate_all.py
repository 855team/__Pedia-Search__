import pymongo
import csv

mongo_session = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@59.110.238.59:10086/pedia_search')

cnt = 0
page_size = 50
max_cnt = mongo_session['pedia_search']['pedia_search'].count_documents({})

node_header = ('page_id:ID', ':LABEL', 'title', 'weight')
node_csv_file = open('data/node.csv', 'a+', newline='', encoding='utf_8_sig')
node_csv = csv.writer(node_csv_file)
node_csv.writerow(node_header)

relation_header = (':TYPE', ':START_ID', 'END_ID')
relation_csv_file = open('data/relation.csv', 'a+', newline='', encoding='utf_8_sig')
relation_csv = csv.writer(relation_csv_file)
relation_csv.writerow(relation_header)

title_csv_file = open('data/title.csv', 'a+', newline='', encoding='utf_8_sig')
title_csv = csv.writer(title_csv_file)

print(max_cnt, flush=True)

while cnt < max_cnt:
    page = mongo_session['pedia_search']['pedia_search'].find(skip=cnt, limit=page_size)
    cnt += page_size
    for item in page:
        cur_id = item['page_id']
        cur_node = (cur_id, 'Entry', item['title'], 0.0)
        node_csv.writerow(cur_node)
        title_csv.writerow((cur_id, item['title']))

        mongo_session['pedia_search']['pedia_brief'].insert_one({
            'page_id': cur_id,
            'title': item['title']
        })

        for ii in item['linked_items']:
            relation_csv.writerow(('linkTo', cur_id, ii['page_id']))

    print('Progress:', cnt, str(cnt / max_cnt * 100) + '%')

node_csv_file.close()
relation_csv_file.close()
mongo_session.close()


