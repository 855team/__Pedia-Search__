from py2neo import Graph, Node, Relationship
from py2neo.matching import *
import networkx as nx


def calcPR():
    # print('start')
    # fo = open("graph.txt", "w")
    graph = Graph('bolt://47.113.103.137:10087', auth=('neo4j', 'pedia_search'))
    G = nx.DiGraph()
    node_matcher = NodeMatcher(graph)
    nodes = node_matcher.match('Entry').all()
    for node in nodes:
        G.add_node(node['page_id'])
        print("node page_id: ",node['page_id'])
    print("number of nodes: ",G.number_of_nodes())

    relationships = graph.match(nodes=None, r_type= 'linkTo', limit=None).all()
    i = 0
    print('start loop')
    d_out = dict((node, 0) for node in G.nodes())
    for relationship in relationships:
        i = i + 1
        print(i)
        print(relationship)
        start = relationship.start_node['page_id']
        end = relationship.end_node['page_id']
        if start != end :
            d_out[start] = d_out[start] + 1
            print('edge: ',start,' -> ',end)
            G.add_edge(*(start,end))
    personalization = dict((node,d_out[node] + 1) for node in G.nodes())
    # print(personalization[22],personalization[6724188])
    # print(personalization)
    print('start pagerank')
    result = nx.pagerank(G, alpha=1, personalization = personalization, nstart = personalization ,max_iter=100, tol=1e-8, weight='weight', dangling=None)
    print(result)
    print(sorted(result.items(), key=lambda kv: (kv[1], kv[0])))
    # i = 0
    # transaction = graph.begin()
    # for cur_page_id in result:
    #     i = i + 1
    #     weight = result[cur_page_id]
    #     print("node:",i,cur_page_id,weight)
    #     matcher = NodeMatcher(graph)
    #     node = matcher.match(page_id = cur_page_id).first()
    #     # 操作
    #     node['weight'] = weight  # 修改weight
    #     transaction.push(node)
    #
    # transaction.commit()

# # 构建空图
# G=nx.DiGraph()

# # 向图中添加节点
# pages = ["1","2","3","4"]
# G.add_nodes_from(pages)
#
# # 向图中添加边，可以不添加节点，直接添加边
# G.add_edges_from([('1','2'), ('1','4'),('1','3'), ('4','1'),('2','3'),('2','4'),('3','1'),('4','3')])
#
#
#
#
# # 另一种方式,可以改用pagerank或pagerank_numpy
# result = nx.pagerank_scipy(G, alpha=0.85, personalization=None, max_iter=100, tol=1e-06, weight='weight', dangling=None)
# print(result)

calcPR()