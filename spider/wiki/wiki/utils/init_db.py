from py2neo import Graph,Node,Relationship, NodeMatcher
import pymongo

# Neo4j
graph = Graph('bolt://47.113.103.137:10087', auth=('neo4j', 'pedia_search'))
graph.delete_all()

# MongoDB
mongo = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@47.113.103.137:10086/pedia_search')['pedia_search']['pedia_search']
mongo.delete_many({})
