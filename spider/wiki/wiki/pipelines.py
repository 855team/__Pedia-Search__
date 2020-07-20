# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


from itemadapter import ItemAdapter
import pymongo
from py2neo import Graph, Node, Relationship, NodeMatcher


class WikiPipeline:
    def process_item(self, item, spider):
        item_dict = ItemAdapter(item).asdict()

        # MongoDB
        mongo = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@47.113.103.137:10086/pedia_search')['pedia_search']['pedia_search']
        mongo.insert_one(item_dict)

        # Neo4j
        graph = Graph('bolt://47.113.103.137:10087', auth=('neo4j', 'pedia_search'))
        transaction = graph.begin()
        matcher = NodeMatcher(graph)

        node_from = Node('Entry', page_id=item_dict['page_id'], title=item_dict['title'], weight=0.0)
        if transaction.exists(node_from):
            transaction.push(node_from)
        else:
            transaction.create(node_from)

        for i in item_dict['linked_items']:
            node_to = matcher.match('Entry', page_id=i).first( )
            if node_to is None:
                node_to = Node('Entry', page_id=i, title='', weight=0.0)
                transaction.create(node_to)

            transaction.merge(Relationship(node_from, 'linkTo', node_to))

        transaction.commit()

        return item
