from peewee import PostgresqlDatabase, Model, CharField, ForeignKeyField, BooleanField, IntegerField

db = PostgresqlDatabase('lume', port=5432, user='postgres', password='152538')

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
    #inicial = CharField(max_length=8, unique=True)


class Livros(BaseModel):
    usuario = ForeignKeyField(Usuarios, backref='livros', column_name='usuario_id')
    livro_id = CharField(max_length=100)  # ID do livro na API
    pagina_atual = IntegerField(default=0)
    lendo = BooleanField(default=False)
    lido = BooleanField(default=False)
    quero_ler = BooleanField(default=False)
    abandonado = BooleanField(default=False)


class Favoritos(BaseModel):
    id_usuario = ForeignKeyField(Usuarios, backref='favoritos', field='id')
    id_livro = ForeignKeyField(Livros, backref='favoritos', field='id')
    avaliacao = IntegerField()  # Classificação do livro pelo usuário (de 1 a 5 estrelas)

# Criação das tabelas
db.connect()
db.create_tables([Usuarios, Perfil, Livros, Favoritos])
db.close()
