import datetime
from peewee import *

db = PostgresqlDatabase('lumedb', port=5432, user='postgres', password='875838')
#db = PostgresqlDatabase('lume_db', port=5432, user='postgres', password='123456')


class BaseModel(Model):
    class Meta:
        database = db

# Definição das tabelas
class Usuarios(BaseModel):
    email = CharField(max_length=255, unique=True, null=False)
    senha = CharField(max_length=250, null=False)
    is_admin = BooleanField(default=False)
    is_active = BooleanField(default=True) 
    access_token = CharField(max_length=500, null=True)
    
    @classmethod
    def get_by_access_token(cls, access_token):
        return cls.get(cls.access_token == access_token)

class Perfil(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='perfil', field='id')
    nome = CharField(max_length=100)
    nome_usuario = CharField(max_length=8, unique=True)
    inicial = CharField(max_length=8)

class Livros(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='livros', column_name='usuario_id')
    livro_id = CharField(max_length=100)  # ID do livro na API

class LivroQueroLer(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='livros_quero_ler')
    livro_id = CharField()

class LivroLendo(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='livros_lendo')
    livro_id = CharField()

class LivroAbandonado(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='livros_abandonados')
    livro_id = CharField()

class LivroJaLi(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='livros_ja_li')
    livro_id = CharField()

class Favoritos(BaseModel):
    id_usuario = ForeignKeyField(Usuarios, backref='favoritos')
    livro_id = CharField()
    avaliacao = IntegerField()

class Atividades(BaseModel):
    usuario_id = ForeignKeyField(Usuarios, backref='atividades')
    tipo = CharField(max_length=20)  # Tipo de atividade (favorito e avaliacao)
    descricao = CharField(max_length=255)
    timestamp = DateTimeField(default=datetime.datetime.now)

class Avaliacoes(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='avaliacoes')
    livro = ForeignKeyField(Livros, backref='avaliacoes')
    avaliacao = IntegerField()

 

# Criação das tabelas se não existirem
db.connect()
db.create_tables([Usuarios, Perfil, Livros, LivroQueroLer, LivroLendo, LivroAbandonado, LivroJaLi, Favoritos])
db.close()