from peewee import PostgresqlDatabase, Model, CharField 

db = PostgresqlDatabase('lume_db', port=5432, user='postgres', password='123456')

class BaseModel(Model):
    class Meta:
        database = db

class Usuarios(BaseModel):
    nome = CharField(max_length=100)
    nome_usuario = CharField(max_length=15)
    email = CharField(max_length=100, unique=True, null=False)
    senha = CharField(max_length=100, null=False)

db.connect()
db.create_tables([Usuarios])
db.close()

