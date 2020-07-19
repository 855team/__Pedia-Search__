import scrapy


class WikiItem(scrapy.Item):
    page_id = scrapy.Field()
    title = scrapy.Field()
    sections = scrapy.Field()
    linked_items = scrapy.Field()
