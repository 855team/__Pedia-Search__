# frontend-api-format
## 查找

### 根据keyword在mongodb中查找wiki词条

**method：**POST

**url：**/search/wiki

**cookie：**不需要

**参数：**

​	**formdata：**

```
{
	keyword:"keyword"
}
```

**返回json：**

```json
{
    "title":"上海",
    "page_id": 54321
    "sections":{
        "title":"历史",
        "text":"参见balabala",
        "linked_words":[
            {
                text: "文本",
                page_id: 123456
            }
        ],
        "sections":[
            {
                "title":"早期历史",
                "text":"正文",
                "linked_words":[
                    {
                        text: "文本",
                        page_id: 123456
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
                        page_id: 123456
                    }
                ]
                "sections" :[
                    {
                        "title":"早期历史",
                        "text":"正文",
                        "linked_words":[
                            {
                                text: "文本",
                                page_id: 123456
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```
**explanation：**
- title表示中心词汇
- sections是目录结构
- 如果不是最后一级目录，title是百科里的名称，text表示正文内容，sections不为空且是更深目录的数组，linkedwords是带有超链接词的数组
- 如果是最后一级目录，title是百科里的名称，text表示正文内容，sections是空数组，linkedwords是带有超链接词的数组
- 中文编码请统一为utf-8

### 根据page_id在mongodb中查找wiki词条

**method：**POST

**url：**/search/page_id

**cookie：**不需要

**参数：**

​	**formdata：**

```json
{
	page_id:54321
}
```

**返回json：**

```json
{
    "title":"上海",
    "page_id": 54321
    "sections":{
        "title":"历史",
        "text":"参见balabala",
        "linked_words":[
            {
                text: "文本",
                page_id: 123456
            }
        ],
        "sections":[
            {
                "title":"早期历史",
                "text":"正文",
                "linked_words":[
                    {
                        text: "文本",
                        page_id: 123456
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
                        page_id: 123456
                    }
                ]
                "sections" :[
                    {
                        "title":"早期历史",
                        "text":"正文",
                        "linked_words":[
                            {
                                text: "文本",
                                page_id: 123456
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```



### 根据keyword在neo4j中查找relatedtags

**method：**POST

**url：**/search/related

**cookie：**不需要

**参数：**

​	**formdata:**

```
{
	keyword:"keyword"
}
```

**返回json：**

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
**explanation：**
- linked_words是关联词汇
- weight是节点的权重
- 全部的关联词汇



## 用户登录

### 登录

**method：**POST

**url：**/login

**cookie：**不需要

**参数：**

​	**formdata:**

```json
{
	username:"username",
	password:"password"
}
```

**返回json：**

​	**成功登陆：**

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

​	**用户名或密码出错：**

```json
{
    code: 401,
    message: "用户名或密码错误"
}
```

**explanation：**

登录后，后端返回的请求头中会包括一段Cookie，将这段Cookie的JSESSIONID加入接下来的请求中即可验证身份

### 登出

**method：**POST

**url：**/logout

**cookie：**需要

**参数：**无

**返回json：**

​	**成功登出：**

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

**explanation：**

什么参数都不需要，只要在请求头中带上Cookie即可，退出后session会结束


### 未登录情况

**method：**POST

**url：**/user/saverecord或/user/queryrecord（未登录情况下）

**cookie：**不需要

**返回json：**

```json
{
    code:403
    message:"未登录"
}
```

### session超时

**method：**POST

**url：**/user/saverecord或/user/queryrecord（session超时）

**cookie：**需要

**返回json：**

```json
{
    code:403
    message:"session无效，请重新登录"
}
```

**explanation：**

注意在logout后，如果不清除Cookie，也会返回session无效

### 检验登录状态

**method：**POST

**url：** /user/checklogin

**cookie：**需要

**参数：**无

**返回json：**

​	**未登录时（无Cookie）：**

```json
{
    code:403
    message:"未登录"
}
```

​	**jsessionid超时（有Cookie）：**

```json
{
    code:403
    message:"session无效，请重新登录"
}
```

​	**处于登录状态：**

```json
{
	code:200
	message:"已登录"
	username:"XXX"
}
```



## 用户操作

### 注册

**method：**POST

**url：**/user/register

**cookie：**不需要

**参数：**

​	**formdata：**

```json
{
	username:"username",
	password:"password"
}
```

**返回json：**

​	**注册成功：**userID

​	**注册失败（username重复）：**0

### 获取用户搜索记录

**method：**POST

**url：**/user/queryrecord

**cookie：**需要

**参数：**无

**返回json：**

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

### 插入用户搜索记录（用户已登录）

**method：**POST

**url：**/user/saverecord

**cookie：**需要

**参数：**

​	**formdata：**

```json
{
	keyword:"keyword",
	last_keyword:"last_keyword"
}
```

**返回json：**无

### 插入用户搜索记录（用户未登录）

**method：**POST

**url：**/user/saverecord_anonymous

**cookie：**不需要

**参数：**

​	**formdata：**

```json
{
	keyword:"keyword",
	last_keyword:"last_keyword"
}
```

**返回json：**无

**explanation：**

对用户未登录的情况使用，将其搜索记录归为root的

### 获取热榜信息

**method：**GET

**url：**/trend/get

**cookie：**不需要

**参数：**无

**返回json：**

```json
[
    {
        "keyword": "word2",
        "times": 3,
        "startTime": "2020-09-03T14:10:00.000+00:00",
        "endTime": "2020-09-03T14:30:00.000+00:00",
        "type": "RANK"
    },
    {
        ...
    }
]
```



## 联想框

### 搜索联想框（前缀搜索）

**method：**POST

**url：**(/9200)/search/_search

**cookie：**不需要

**header：** Content-Type :  application/json 

**参数：**

​	**json：**

```json
{
  "query": {
    "bool": {
      "must": [
        {
          "prefix": {
            "title.keyword": "the string"
          }
        }
      ]
    }
  },
  "size": 10
}
```



**返回json：**

```json
{
    "took": 12,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "search",
                "_type": "_doc",
                "_id": "13870",
                "_score": 1.0,
                "_source": {
                    "title": "string"
                }
            }
        ]
    }
}
```

**explanation：**

无匹配度，可以进行简繁混杂搜索

### 搜索联想框（模糊搜索）

**method：**POST

**url：**(/9200)/search/_search

**cookie：**不需要

**header：** Content-Type :  application/json 

**参数：**

​	**json：**

```json
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": "the string"
          }
        }
      ]
    }
  },
  "size": 10
}
```

**返回json：**

```json
{
    "took": 12,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "search",
                "_type": "_doc",
                "_id": "13870",
                "_score": 1.0,
                "_source": {
                    "title": "string"
                }
            }
        ]
    }
}
```

**explanation：**

有匹配度，不能进行简繁混杂搜索

## 管理员

### 授权

**method：**POST

**url：**/user/grant

**cookie：**需要（且必须用管理员账号登录）

**参数：**

​	**formdata:**

```json
{
	username:"XXXX"
}
```

**返回json：**

1 —— 成功为用户授予管理员权限

0 —— 不存在该用户

**explanation：**

数据库初始时有一个root账号为管理员

### 创建热榜

**method：**POST

**url：**/trend/create

**cookie：**需要（且必须用管理员账号登录）

**参数：**

​	**formdata:**

```json
{
	startTime:"yyyy-MM-dd HH:mm:ss",
    endTime:"yyyy-MM-dd HH:mm:ss",
    size:n
}
```

**返回json：**

```json
[
    {
        "keyword": "word2",
        "times": 3,
        "startTime": "2020-09-03T14:10:00.000+00:00",
        "endTime": "2020-09-03T14:30:00.000+00:00",
        "type": "RANK"
    },
    {
        ...
    }
]
```

