from py2neo import Graph, Node, Relationship
from py2neo.matching import *
import networkx as nx






graph = Graph('bolt://47.113.103.137:10087', auth=('neo4j', 'pedia_search'))
G = nx.DiGraph()
node_matcher = NodeMatcher(graph)
nodes = node_matcher.match('Entry').all()
for node in nodes:
    G.add_node(node['page_id'])
    if (node['page_id'] == 99464):
        print(node)