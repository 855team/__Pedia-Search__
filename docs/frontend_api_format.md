# frontend-api-format
## mindmap(from mongodb)
```
{
    "keyword":"上海",
    "linkedwords":["word1","word2"],
    "intro":"上海是一座城市",
    "dir":[{
        "name":"历史",
        "content":"参见",
        "linkedwords":["word1","word2"],
        "child":[
            {
                "name":"早期历史",
                "content":"正文",
                "linkedwords":["word1","word2"]
            },
            {
                "name":"开埠初期",
                "content":"正文",
                "linkedwords":["word1","word2"]
            }
        ]
    },
    {
        ...
    }
    ]
}
```
### explanation
- keyword表示中心词汇
- intro是维基百科的正文部分
- dir是目录结构
- 如果不是最后一级目录，name是百科里的名称，content表示正文内容,child是更深目录的数组
- 如果是最后一级目录，name是百科里的名称，content表示正文内容，linkedwords是带有超链接词的数组
- 中文编码请统一为utf-8
## releatedtags(from neo4j)
```
{
    "keyword":"上海",
    "linkedword":[
    {
        "word":"中国",
        "weight":"3.2"
    },
    {
        "word":"川建国",
        "weight":"2.2"
    }
    ]
}
```
### explanation
- words是关联词汇
- weight是节点的权重
- 全部的关联词汇
