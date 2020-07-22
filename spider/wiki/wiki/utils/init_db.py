from py2neo import Graph,Node,Relationship, NodeMatcher
import pymongo

# Neo4j
graph = Graph('bolt://59.110.238.59:10087', auth=('neo4j', 'pedia_search'))
graph.delete_all()

# MongoDB
mongo = pymongo.MongoClient('mongodb://pedia_search_mongo_rw:pedia_search_mongo_rw@59.110.238.59:10086/pedia_search')['pedia_search']['pedia_search']
mongo.delete_many({})
