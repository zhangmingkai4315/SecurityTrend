import requests
import logging

from db import Trends
from bs4 import BeautifulSoup

logging.getLogger("requests").setLevel(logging.WARNING)
logging.getLogger("urllib3").setLevel(logging.WARNING)
# requests.packages.urllib.util.ssl_.DEFAULT_CIPHERS = 'RSA+3DES'
# requests.utils.ssl_.DEFAULT_CIPHERS = 'RSA+3DES'
class CrondJob(object):
  __type__ = 'default'
  def __init__(self):
    self.type_name = 'Default'
    self.base_url = None
    self.headers = {
        'referer': 'https://www.google.com.hk/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
    }
  def fetch(self,url,headers=None):
    try:
      if headers is not None:
        self.headers = headers
      result = requests.get(url,headers = self.headers)
      if result.status_code == 200:
        return BeautifulSoup(result.content, "html.parser")
      else:
        return None
    except Exception as e:
      return None
  def save(self,post,type_name=None):
    if type_name is None:
      type_name = self.type_name
    trends = Trends(title=post['title'],
                    content=post['content'],
                    url=post['url'],
                    type_name=type_name,
                    post_date=post['post_date'],
                    image_url=post['img_url'])
    trends.save()
    
  
