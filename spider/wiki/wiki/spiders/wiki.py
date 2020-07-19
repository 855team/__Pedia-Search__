import scrapy
import requests
from .. import wikiapi # hack自 wikipediaapi 项目源码，将部分request请求外移（方便利用scrapy的并发）
# import wikiapi
from wiki.items import WikiItem


verbose = True                                      # debug详细信息开关
base_url = 'https://zh.wikipedia.org/w/api.php'     # 中文Wiki API


# 根据词条名字获取查询链接
def get_url_by_name(name):
    return base_url + \
           '?action=query&format=json&prop=extracts&titles=' + \
           name + '&explaintext=1&exsectionformat=wiki'


# 根据 page_id 获取查询链接
def get_url_by_page_id(page_id):
    return base_url + \
           '?action=query&format=json&prop=extracts&pageids=' + \
           str(page_id) + '&explaintext=1&exsectionformat=wiki'


# 输出debug信息
def print_debug_info(info_type, *args):
    print(info_type, end=' ')
    for i in args:
        print(i, end=' ')
    print('\n')


# 将内容包装成item
def make_sections(sections):
    ret = []
    for i in sections:
        cur_section = {'title': i.title, 'text': i.text}
        if len(i.sections) != 0:
            cur_section['sections'] = make_sections(i.sections)
        ret.append(cur_section)
    return ret


# 获取该词条链接到的 Main/Article 词条的 page_id 与 真名
def link_query(page_id):
    session = requests.Session()
    params = {'action': 'query', 'generator': 'links', 'pageids': page_id, 'format': 'json',  'redirects': 1, 'gplnamespace': 0, 'gpllimit': 500,}
    tmp_container = session.get(base_url, params=params).json()
    link_list = list(tmp_container['query']['pages'].values())
    while 'continue' in tmp_container:
        params['gplcontinue'] = tmp_container['continue']['gplcontinue']
        tmp_container = session.get(base_url, params=params).json()
        link_list += tmp_container['query']['pages'].values()
    session.close()
    return link_list


# wiki爬虫，继承自scrapy.Spider
class wiki(scrapy.Spider):
    name = 'wiki'
    allowed_domains = ['zh.wikipedia.org']
    start_urls = [get_url_by_name('历史')]
    # count = 0

    def parse(self, response):
        # if self.count > 10:
        #     return
        # else:
        #     self.count += 1
        json = response.json()
        json_pages = json['query']['pages']

        # extracts 信息分段发送（冗余）
        if 'continue' in json:
            print_debug_info('Error:', 'extracts need continue')

        # page_id 为json动态属性，需要用for循环获取
        for page_id, page_content in json_pages.items():

            # page_id 为"-1"则词条不存在（冗余）
            if page_id != '-1':
                title = json_pages[page_id]['title']
                wiki = wikiapi.Wikipedia('zh', json, page_id)
                page = wiki.page(title)

                # 只考虑 namespace 为 Main/Article的词条，namespace参见"https://en.wikipedia.org/wiki/Wikipedia:Namespace"（冗余）
                if page.namespace == 0:

                    # 该名字为"别名"，需要额外一次请求获取"真名"（冗余）
                    if page_content['extract'] == '':
                        real_title = page.displaytitle
                        print_debug_info('Warning:', 'extracts is empty')
                        yield scrapy.Request(get_url_by_name(real_title))

                    # 该词条是一个完整的实体，可以被保存（正常情况仅有该代码段会执行）
                    else:
                        print_debug_info('Success:', page.namespace, page_id, title, response)

                        linked_items = []

                        # 将被该词条链接的词条加入爬取队列，此处需要至少一个请求
                        link_list = link_query(page_id)
                        for i in link_list:
                            if i.get('missing') is None:
                                linked_items.append(i['pageid'])
                                yield scrapy.Request(get_url_by_page_id(i['pageid']))

                        sections = {
                            'title': 'summary',
                            'text': page.summary,
                            'sections': make_sections(page.sections)
                        }

                        yield WikiItem(page_id=page_id, title=title, sections=sections, linked_items=linked_items)

                # namespace 不为0（冗余）
                else:
                    print_debug_info('Warning:', 'ns is not 0')

            # page_id 为 -1，即该词条不存在，且无重定向链接（冗余）
            else:
                print_debug_info('Warning', 'page_id is -1')



