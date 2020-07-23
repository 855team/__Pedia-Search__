import scrapy
import requests
from .. import wikiapi # hack自 wikipediaapi 项目源码，将部分request请求外移（方便利用scrapy的并发）
from wiki.items import WikiItem
from scrapy_redis.spiders import RedisSpider
# import wikiapi


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


# 标记超链接文本
def make_linked_words(text, link_dict, redirect_dict):
    linked_words = list()
    for link_dict_title, link_dict_page_id in link_dict.items():
        if link_dict_title in text:
            linked_words.append({
                'text': link_dict_title,
                'page_id': link_dict_page_id
            })

    for redirect_dict_from, redirect_dict_to in redirect_dict.items():
        if redirect_dict_from in text:
            linked_words.append({
                'text': redirect_dict_from,
                'page_id': link_dict[redirect_dict_to]
            })

    return linked_words


# 将内容包装成item
def make_sections(sections, link_dict, redirect_dict):
    ret = []
    for i in sections:
        cur_section = {
            'title': i.title,
            'text': i.text,
            'linked_words': make_linked_words(i.text, link_dict, redirect_dict),
            'sections': make_sections(i.sections, link_dict, redirect_dict)
        }

        ret.append(cur_section)
    return ret


# 获取该词条链接到的 Main/Article 词条的 page_id 与 真名，与重定向信息
def link_query(page_id):
    session = requests.Session()
    params = {'action': 'query', 'generator': 'links', 'pageids': page_id, 'format': 'json',  'redirects': 1, 'gplnamespace': 0, 'gpllimit': 500,}
    tmp_container = session.get(base_url, params=params).json()

    redirect_dict = dict()
    link_dict = dict()
    for i in tmp_container['query']['pages'].values():
        if i.get('missing') is None:
            link_dict[i['title']] = i['pageid']
    if tmp_container['query'].get('redirects') is not None:
        for i in tmp_container['query']['redirects']:
            redirect_dict[i['from']] = i['to']

    while 'continue' in tmp_container:
        params['gplcontinue'] = tmp_container['continue']['gplcontinue']
        tmp_container = session.get(base_url, params=params).json()
        if tmp_container['query'].get('redirects') is not None:
            for i in tmp_container['query']['redirects']:
                redirect_dict[i['from']] = i['to']
        for i in tmp_container['query']['pages'].values():
            if i.get('missing') is None:
                link_dict[i['title']] = i['pageid']
    session.close()
    return {
        'redirect_dict': redirect_dict,
        'link_dict': link_dict
    }


# wiki爬虫，继承自scrapy.Spider
class wiki(scrapy.Spider):
    name = 'wiki'
    allowed_domains = ['zh.wikipedia.org']
    start_urls = [get_url_by_name('历史')]
    # count = 0

    def parse(self, response):
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
                        query = link_query(page_id)
                        link_dict = query['link_dict']
                        redirect_dict = query['redirect_dict']
                        for link_title in link_dict:
                            link_page_id = link_dict[link_title]
                            linked_items.append({'page_id': link_page_id, 'title': link_title})
                            yield scrapy.Request(get_url_by_page_id(link_page_id))

                        sections = {
                            'title': 'summary',
                            'text': page.summary,
                            'linked_words': make_linked_words(page.summary, link_dict, redirect_dict),
                            'sections': make_sections(page.sections, link_dict, redirect_dict)
                        }

                        yield WikiItem(page_id=int(page_id), title=title, sections=sections, linked_items=linked_items)

                # namespace 不为0（冗余）
                else:
                    print_debug_info('Warning:', 'ns is not 0')

            # page_id 为 -1，即该词条不存在，且无重定向链接（冗余）
            else:
                print_debug_info('Warning', 'page_id is -1')



