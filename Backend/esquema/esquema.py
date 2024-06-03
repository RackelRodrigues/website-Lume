from peewee import *
from peewee import PostgresqlDatabase, Model, CharField, ForeignKeyField, BooleanField, IntegerField


db = PostgresqlDatabase('lumedb', port=5432, user='postgres', password='875838')
#db = PostgresqlDatabase('lume_db', port=5432, user='postgres', password='123456')


class BaseModel(Model):
    class Meta:
        database = db

class Usuarios(BaseModel):
    email = CharField(max_length=255, unique=True, null=False)
    senha = CharField(max_length=250, null=False)
    is_admin = BooleanField(default=False)
    is_active = BooleanField(default=True) 

class Perfil(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='perfil', field='id')
    nome = CharField(max_length=100)
    nome_usuario = CharField(max_length=8, unique=True)
    inicial = CharField(max_length=8)

class LivroQueroLer(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='livros_quero_ler', column_name='usuario_id')
    livro_id = CharField()

class LivroLendo(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='livros_lendo', column_name='usuario_id')
    livro_id = CharField()

class LivroAbandonado(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='livros_abandonados', column_name='usuario_id')
    livro_id = CharField()

class LivroJaLi(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='livros_ja_li', column_name='usuario_id')
    livro_id = CharField()

    #inicial = CharField(max_length=8, unique=True)

class Favoritos(BaseModel):
    id_usuario = ForeignKeyField(Usuarios, backref='favoritos', field='id')
    livro_id = CharField()
    avaliacao = IntegerField() 

# Criação das tabelas
db.connect()
db.create_tables([Usuarios, Perfil,LivroQueroLer, LivroLendo, LivroAbandonado, LivroJaLi, Favoritos])
db.close()
