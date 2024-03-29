from peewee import *

db = PostgresqlDatabase('lume', port=5432, user='postgres', password='1525')

class BaseModel(Model):
    class Meta:
        database = db

class Usuarios(BaseModel):
    nome = TextField()
    sobrenome = TextField()
    email = TextField(unique=True, null=False)
    senha = TextField(null=False)

db.connect()
db.create_tables([Usuarios])
db.close()

