#!/usr/bin/python
# -*- coding: UTF-8 -*-

import MySQLdb
import hashlib
import time

db_connection = MySQLdb.connect('127.0.0.1', 'abc', '', 'security_trend_development',use_unicode=True, charset="utf8")
cursor = db_connection.cursor()


def exist_content(content):
  """ if content already in database then reject save ops
  """
  if not content:
    return True
  content_md5 = hashlib.md5(content.encode("utf8")).hexdigest()
  cursor.execute(
      "SELECT id from trends where content_md5 = '%s' limit 1;" % content_md5)
  results = cursor.fetchone()
  if results is not None:
    return True
  else:
    return False


def get_type_id(name):
  """get the trends type id from its name
     if the type not exist then create new trends type
  """
  cursor.execute("SELECT id from trends_type where name = '%s' limit 1;" % name)
  results = cursor.fetchone()
  if results is not None:
    print results
    return results[0]
  else:
    try:
      cursor.execute("insert into trends_type(name) values('%s')" % name)
      db_connection.commit()
      cursor.execute(
          "SELECT id from trends_type where name = '%s' limit 1;" % name)
      results = cursor.fetchone()
      return results[0]
    except:
      db_connection.rollback()
      return None

class Trends(object):
  def __init__(self,title,short=None,content=None,type_name=None,url=None,image_url=None):
    self.title = title
    self.short = short or content[:50]
    self.content = content
    self.type_name = type_name
    self.url = url
    self.image_url = image_url
    self.content_md5 = hashlib.md5(self.content.encode("utf8")).hexdigest()
  def save(self):
    if exist_content(self.content) is True:
      return
    type_id = get_type_id(self.type_name)
    try:
      sql = "INSERT INTO trends(title, \
          short_description, content, type_id, url, img_url,content_md5,createdAt,updatedAt) \
          VALUES ('%s', '%s', '%s', '%d','%s', '%s','%s','%s','%s' )" % \
          (self.title, 
           self.short,
           self.content, 
           type_id, 
           self.url, 
           self.image_url,
           self.content_md5,
           time.strftime('%Y-%m-%d %H:%M:%S'), 
           time.strftime('%Y-%m-%d %H:%M:%S')
           )
      cursor.execute(sql)
      db_connection.commit()
    except Exception as e:
      print e
      db_connection.rollback()

def main():
  trends=Trends(title='test', 
            content=u'Python处理中英文混合字符串, 每20个字符换一行, 应该如何计算呢?',
            url='/url',
            image_url='/image_url',
            type_name='TEST1')
  trends.save()

if __name__ == '__main__':
  main()
