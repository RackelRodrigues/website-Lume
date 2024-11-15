from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


uri='mongodb+srv://rackelrodrigues:kbI9PzUMmwcgjfoD@lume.yaufbho.mongodb.net/?retryWrites=true&w=majority&appName=Lume'

client = MongoClient(uri, server_api=ServerApi('1'))

mydb = client['lumedb']


mycollection = mydb['Livros']
esquema = {
  'idusuario':'int',
  'lendo': 'int',
  'lido': 'int',
  'quero_ler': 'int',
  'abandonado': 'int'
}


mycollection = mydb['Favoritos']
esquema = {
  'idusuario':'int',
  'idlivro': 'int',
  'avaliacao': 'int'
}

mycollection.create_index('idusuario', unique=True)
mycollection.create_index('idlivro', unique=True)


print(mydb.list_collection_names())