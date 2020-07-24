# frontend-api-format
## mindmap(from mongodb)

method:POST

url: /search/wiki

formdata：

```
{
	keyword:"keyword"
}
```

返回的json：

```json
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

method:POST

url: /search/related

formdata:

```
{
	keyword:"keyword"
}
```

返回的json：

```json
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



# 登录

method:POST

url: /login

formdata:

```json
{
	username:"username",
	password:"password"
}
```

成功登陆返回json：

```json
{
    "code": 200,
    "data": {
        "authorities": [
            {
                "authority": "ROLE_XXX"
            }
        ],
        "details": {
            "remoteAddress": "0:0:0:0:0:0:0:1",
            "sessionId": "018C17EEDD08D4A403A3F096C010779B"
        },
        "authenticated": true,
        "principal": {
            "password": null,
            "username": "username",
            "authorities": [
                {
                    "authority": "ROLE_XXX"
                }
            ],
            "accountNonExpired": true,
            "accountNonLocked": true,
            "credentialsNonExpired": true,
            "enabled": true
        },
        "credentials": null,
        "name": "855team"
    },
    "message": "登录成功"
}
```

如果用户名或密码出错会返回json：

```json
{
    code: 401,
    message: "用户名或密码错误"
}
```



### explanation

登录后，后端返回的请求头中会包括一段Cookie，将这段Cookie的JSESSIONID加入接下来的请求中即可验证身份

# 登出

method:POST

url: /logout

成功登出返回json：

```json
{
    "code": 200,
    "data": {
        "authorities": [
            {
                "authority": "ROLE_XXX"
            }
        ],
        "details": {
            "remoteAddress": "0:0:0:0:0:0:0:1",
            "sessionId": "018C17EEDD08D4A403A3F096C010779B"
        },
        "authenticated": true,
        "principal": {
            "password": null,
            "username": "855team",
            "authorities": [
                {
                    "authority": "ROLE_XXX"
                }
            ],
            "accountNonExpired": true,
            "accountNonLocked": true,
            "credentialsNonExpired": true,
            "enabled": true
        },
        "credentials": null,
        "name": "855team"
    },
    "message": "退出成功"
}
```

### explanation

什么参数都不需要，只要在请求头中带上Cookie即可，退出后session会结束


# 未登录情况

method:POST

url：/user/saverecord或/user/queryrecord（未登录情况下）

返回json：

```json
{
    code:403
    message:"未登录"
}
```

# session超时

method:POST

url：/user/saverecord或/user/queryrecord（session超时）

返回json：

```json
{
    code:403
    message:"session无效，请重新登录"
}
```

### explanation

注意在logout后，如果不清除Cookie，也会返回session无效

# 注册

method:POST

url: /user/register

formdata:

```json
{
	username:"username",
	password:"password"
}
```

### explanation

注册后会返回userID，如果username重复，则注册失败，返回0

# 获取用户搜索记录

url：/user/queryrecord

什么参数都不需要

返回json：

```json
[
 {
	keyword:"keyword",
	last_keyword:"last_keyword",
	query_time:"time"
 },
 {
 	···
 }
]
```

# 插入用户搜索记录

method:POST

url：/user/saverecord

formdata:

```json
{
	keyword:"keyword",
	last_keyword:"last_keyword"
}
```

无返回值

