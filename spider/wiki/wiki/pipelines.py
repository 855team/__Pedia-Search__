import pymongo
import csv
import os
from itemadapter import ItemAdapter


class WikiPipeline:

    def open_spider(self, spider):
        node_header = ('page_id:ID', ':LABEL', 'title', 'weight')
        self.node_csv_file = open('wiki/data/node.csv', 'a+', newline='', encoding='utf_8_sig')
        self.node_csv = csv.writer(self.node_csv_file)
        if os.path.getsize('wiki/data/node.csv') == 0:
            self.node_csv.writerow(node_header)

        relation_header = (':TYPE', ':START_ID', 'END_ID')
        self.relation_csv_file = open('wiki/data/relation.csv', 'a+', newline='', encoding='utf_8_sig')
        self.relation_csv = csv.writer(self.relation_csv_file)
        if os.path.getsize('wiki/data/relation.csv') == 0:
            self.relation_csv.writerow(relation_header)

        self.mongo_client = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@59.110.238.59:10086/pedia_search')

    def close_spider(self, spider):
        self.node_csv_file.close()
        self.relation_csv_file.close()
        self.mongo_client.close()

    def process_item(self, item, spider):
        item_dict = ItemAdapter(item).asdict()

        # MongoDB Server
        # client = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@59.110.238.59:10086/pedia_search')
        mongo = self.mongo_client['pedia_search']['pedia_search']
        mongo.insert_one(item_dict)

        # Neo4j File
        cur_id = item_dict['page_id']
        cur_node = (cur_id, 'Entry', item_dict['title'], 0.0)
        self.node_csv.writerow(cur_node)
        for i in item_dict['linked_items']:
            self.relation_csv.writerow(('linkTo', cur_id, i['page_id']))

        # Neo4j Server
        # graph = Graph('bolt://59.110.238.59:10087', auth=('neo4j', 'pedia_search'))
        # transaction = graph.begin()
        #
        # node_from = Node('Entry', page_id=item_dict['page_id'], title=item_dict['title'], weight=0.0)
        #
        # for item in item_dict['linked_items']:
        #     node_to = Node('Entry', page_id=item['page_id'], title=item['title'], weight=0.0)
        #     transaction.merge(Relationship(node_from, 'linkTo', node_to), primary_label='Entry', primary_key='page_id')
        #
        # transaction.commit()

        return {'page_id': item_dict['page_id'], 'title': item_dict['title']}
