from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri='mongodb+srv://rackelrodrigues:kbI9PzUMmwcgjfoD@lume.yaufbho.mongodb.net/?retryWrites=true&w=majority&appName=Lume'



def mongo_ping():
    client = MongoClient(uri)
    try:
      client.admin.command('ping')
      return {
         "message": "deu certo", 
         "code": 200
         }
    except Exception as e:
      return e, 404
    

print(mongo_ping())