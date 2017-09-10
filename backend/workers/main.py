import logging

from crond import CrondJob
from crond.threatpost import TheatPost

logging.basicConfig(filename='workers.log', 
                    format='%(asctime)s %(levelname)s %(message)s',
                    datefmt='%m/%d/%Y %I:%M:%S %p',
                    level=logging.DEBUG)

def regist_worker(WorkerClass):
  logging.info('Regist worker ' + WorkerClass.__name__)
  if not issubclass(WorkerClass,CrondJob):
    logging.error(WorkerClass.__name__ + ' is not subclass of '+ CrondJob.__name__)
    return
  logging.info('Regist worker ' + WorkerClass.__name__ +' success')
  worker = WorkerClass()
  logging.info('Start worker ' + WorkerClass.__name__)
  worker.start()
  logging.info('Web Scraping done[worker:' + WorkerClass.__name__ + ']')

def job_start():
  logging.info('Start cron job')
  regist_worker(TheatPost)

if __name__ == '__main__':
  job_start()
