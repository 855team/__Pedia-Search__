
import networkx as nx

# 构建空图
G=nx.DiGraph()

# 向图中添加节点
pages = ["1","2","3","4"]
G.add_nodes_from(pages)

# 向图中添加边，可以不添加节点，直接添加边
G.add_edges_from([('1','2'), ('1','4'),('1','3'), ('4','1'),('2','3'),('2','4'),('3','1'),('4','3')])




# 另一种方式,可以改用pagerank或pagerank_numpy
result = nx.pagerank_scipy(G, alpha=0.85, personalization=None, max_iter=100, tol=1e-06, weight='weight', dangling=None)
print(result)