from scrapy import cmdline

cmdline.execute('scrapy crawl wiki -s JOBDIR=wiki/data/job_dir'.split())
