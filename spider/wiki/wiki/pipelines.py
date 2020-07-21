# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import pymongo
import csv
from itemadapter import ItemAdapter
from py2neo import Graph, Node, Relationship


class WikiPipeline:

    def open_spider(self, spider):
        headers = ['page_id:ID', 'title', 'weight']
        # self.node_csv_file =  open('./dump/test_node.csv', 'w+')
        # self.relation_csv_file = open('./dump/test_relation.csv', 'w+')
        # self.node_csv = csv.writer(self.node_csv_file)
        # self.mongo_client = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@59.110.238.59:10086/pedia_search')

    # def close_spider(self, spider):
    #     self.mongo_client.close()

    def process_item(self, item, spider):
        item_dict = ItemAdapter(item).asdict()

        # MongoDB Server
        client = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@59.110.238.59:10086/pedia_search')
        mongo = client['pedia_search']['pedia_search']
        mongo.insert_one(item_dict)
        client.close()
        #
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
        # return item
        return {'page_id:ID': item_dict['page_id'], 'title': item_dict['title'], 'weight': 0.0}
