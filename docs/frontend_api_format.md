# frontend-api-format
## mindmap(from mongodb)
```
{
    "title":"上海",
    "page_id": "54321"
    "sections":{
        "title":"历史",
        "text":"参见balabala",
        "linked_words":[
            {
                text: "文本",
                page_id: "123456"
            }
        ],
        "sections":[
            {
                "title":"早期历史",
                "text":"正文",
                "linked_words":[
                    {
                        text: "文本",
                        page_id: "123456"
                    }
                ],
                sections: []
            },
            {
                "title":"开埠初期",
                "text":"正文",
                "linked_words":[
                    {
                        text: "文本",
                        page_id: "123456"
                    }
                ]
                "sections" :[
                    {
                        "title":"早期历史",
                        "text":"正文",
                        "linked_words":[
                            {
                                text: "文本",
                                page_id: "123456"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```
### explanation
- title表示中心词汇
- sections是目录结构
- 如果不是最后一级目录，title是百科里的名称，text表示正文内容，sections不为空且是更深目录的数组，linkedwords是带有超链接词的数组
- 如果是最后一级目录，title是百科里的名称，text表示正文内容，sections是空数组，linkedwords是带有超链接词的数组
- 中文编码请统一为utf-8
## releatedtags(from neo4j)
```
{
    "title":"上海",
    "linked_words":[
    {
        "title":"中国",
        "weight":"3.2"
    },
    {
        "title":"川建国",
        "weight":"2.2"
    }
    ]
}
```
### explanation
- linked_words是关联词汇
- weight是节点的权重
- 全部的关联词汇
