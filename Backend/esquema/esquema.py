from peewee import PostgresqlDatabase, Model, CharField, ForeignKeyField

db = PostgresqlDatabase('lumedb', port=5432, user='postgres', password='875838')

class BaseModel(Model):
    class Meta:
        database = db

class Usuarios(BaseModel):
    email = CharField(max_length=255, unique=True, null=False)
    senha = CharField(max_length=250, null=False)

class Perfil(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='perfil', field='id')
    nome = CharField(max_length=100)
    nome_usuario = CharField(max_length=8, unique=True)
    inicial = CharField(max_length=8, unique=True)

db.connect()
db.create_tables([Usuarios, Perfil])
db.close()


