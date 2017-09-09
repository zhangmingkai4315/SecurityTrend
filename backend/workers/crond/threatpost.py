from crond import CrondJob
import time

class TheatPost(CrondJob):
  
  def __init__(self, type_name=None):
    CrondJob.__init__(self)
    if type_name is None:
      self.type_name = 'ThreadPost'
    self.base_url = 'https://threatpost.com'
    self.threads_posts = []

  def parse_list(self):
    try:
      data = self.fetch(self.base_url)
      articles = data.find_all('article', {'class': "home-left"})
      for art in articles:
        try:
          post = {}
          post['title'] = art.find('a').get_text()
          post['url'] = art.find('a').get('href')
          self.threads_posts.append(post)
        except:
          continue
    except Exception as e:
      print e

  def parse_each(self,post):
    if not post.has_key('url'):
      return
    try:
      data = self.fetch(post['url'])
      _contents_list = data.find('div', attrs={'class': 'entry-content'}).find_all('p')
      contents = ''
      for i in _contents_list:
        contents = contents + i.get_text() +'\n'
      post["content"] = contents
      p_date = data.find('time').get('datetime')
      if p_date:
        post["post_date"] = p_date+' 00:00:00'
      else:
        post["post_date"]=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      post["img_url"] = data.find(
          'header', attrs={'class': 'entry-header'}).find('img').get('src')
    except Exception as e:
      print e
    finally:
      time.sleep(5)
      return post

  def start(self):
    self.parse_list()
    for post in self.threads_posts:
      self.parse_each(post)
      self.save(post)
    
    
