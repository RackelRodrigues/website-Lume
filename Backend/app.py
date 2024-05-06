from flask import Flask, render_template, redirect, url_for, flash, request, jsonify
import requests
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from peewee import DoesNotExist
from werkzeug.utils import secure_filename
from esquema.esquema import Usuarios, Livros, Perfil, Favoritos
import os, re
import requests
from flask_cors import CORS


# Definição da classe formulário
class CadastroForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email()])
    password = PasswordField('password', validators=[DataRequired()])
    confirm_password = PasswordField('confirm_password', validators=[DataRequired(), EqualTo('password')])
    

# Criação da instância Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SECRET_KEY'] = 'sua_chave_secreta'

# Lógica de autenticação
def validate_registration(email, password, confirm_password, name, username):
    if not email or not password or not confirm_password or not name or not username:
        return False, "Por favor, preencha todos os campos."
    
    if len(email.strip()) == 0:
        return False, "O campo de e-mail não pode estar em branco."
    
    if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
        return False, "E-mail inválido. Por favor, insira um e-mail válido."
    
    if len(password) < 8:
        return False, "A senha deve ter pelo menos 8 caracteres."
    
    if not re.search(r'[a-z]', password) or not re.search(r'[A-Z]', password) or not re.search(r'\d', password):
        return False, "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula e um dígito."
    
    if password != confirm_password:
        return False, "A senha e a confirmação de senha não correspondem."
    
    return True, "Cadastro válido."

# ROTAS
@app.route("/cadastro", methods=['POST'])
def cadastro():
    try:
        data = request.get_json()
        email = data.get('email')
        password= data.get('password')
        confirm_password = data.get('confirm_password')


        is_valid, message = validate_registration(email, password, confirm_password)
        if not is_valid:
            return jsonify({'message': message}), 400
        

        if len(email) > 255 or len(password) > 100:
            return jsonify({'message': 'O email deve ter no máximo 255 caracteres e a senha deve ter no máximo 100 caracteres'}), 400

        if password!= confirm_password:
            return jsonify({'message': 'A senha e a confirmação de senha não correspondem'}), 400

        is_valid, message = validate_registration(email, password, confirm_password)
        if not is_valid:
            return jsonify({'message': message}), 400

        hashed_password = generate_password_hash(password)
        new_user = Usuarios(email=email, password=hashed_password)
        new_user.save()

        return jsonify({'message': 'Cadastro realizado com sucesso'}), 201

    except Exception as e:
        return jsonify({'message': f"Ocorreu um erro durante o cadastro: {e}"}), 500


@app.route("/criar_perfil", methods=['POST'])
def criar_perfil():
    if request.method == 'POST':
        try:
            data = request.get_json()
            name = data.get('name')
            username = data.get('username')
            email = data.get('email')  
            inicial = data.get('inicial')
        
            # Verifica se os campos estão preenchidos
            is_valid, message = validate_registration(email, None, None, name, username)
            if not is_valid:
                return jsonify({'message': message}), 400
            
            # Verifica se o usuário já existe
            try:
                user = Usuarios.get(Usuarios.email == email)
            except Usuarios.DoesNotExist:
                return jsonify({'message': 'Usuário não encontrado'}), 404
            
            # Cria o perfil
            new_perfil = Perfil(usuario=user.id, nome=name, nome_usuario=username, inicial=inicial)
            new_perfil.save()

            return jsonify({'message': 'Perfil criado com sucesso'}), 201

        except Exception as e:
            return jsonify({'message': f"Erro ao criar perfil: {e}"}), 500

    return jsonify({'error': 'Método não permitido'}), 405

@app.route('/perfil/inicial/<email>', methods=['GET'])
def get_inicial(email):
    try:
        usuario = Usuarios.select().where(Usuarios.email == email).get()
        perfil = Perfil.select().where(Perfil.usuario == usuario.id).get()
        return jsonify({'inicial': perfil.inicial, 'primeiro_nome': usuario.nome_usuario.split()[0]})
    except Usuarios.DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado'}), 404
    except Perfil.DoesNotExist:
        return jsonify({'error': 'Perfil não encontrado'}), 404
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar perfil inicial: {str(e)}'}), 500
    

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        senha = data.get('senha')

        # Verifica se o email e a senha estão preenchidos
        is_valid, message = validate_registration(email, senha)
        if not is_valid:
            return jsonify({'error': message}), 400

        # Busca o usuário pelo email
        user = Usuarios.get_or_none(email=email)
        if user:
            # Verifica se a senha está correta
            if check_password_hash(user.senha, senha):
                return jsonify({'message': 'Login realizado com sucesso'}), 200
            else:
                return jsonify({'error': 'Senha inválida'}), 401
        else:
            return jsonify({'error': 'Usuário não encontrado'}), 404

    return jsonify({'error': 'Método não permitido'}), 405

@app.route('/detalhes_livro/<livro_id>', methods=['GET'])
def detalhes_livro(livro_id):
    try:
        # Solicitação à API do Google Books para obter os detalhes do livro
        url = f'https://www.googleapis.com/books/v1/volumes/{livro_id}'
        response = requests.get(url)
        
        if response.status_code == 200:
            livro_info = response.json()
            
            # Extrair os detalhes relevantes do livro
            titulo = livro_info.get('volumeInfo', {}).get('title', '')
            autores = livro_info.get('volumeInfo', {}).get('authors', [])
            sinopse = livro_info.get('volumeInfo', {}).get('description', '')

            # Formatar os autores como uma string separada por vírgula
            autores_formatados = ', '.join(autores) if autores else ''

            return jsonify({
                'titulo': titulo,
                'autores': autores_formatados,
                'sinopse': sinopse
            }), 200
        else:
            return jsonify({'error': 'Falha ao obter informações do livro da API de livros do Google'}), 500
    except Exception as e:
        return jsonify({'error': f'Erro ao processar a solicitação: {str(e)}'}), 500


@app.route('/search_books', methods=['POST'])
def search_books():
   
    data = request.json
    query = data.get('query', '')
    
    api_key = 'AIzaSyCsUUXAR5RnP5beEmDu95DID0Wqz8dyTPo'
    url = f'https://www.googleapis.com/books/v1/volumes?q={query}&key={api_key}'

    response = requests.get(url)
    data = response.json()

    return jsonify(data)


@app.route('/bestsellers',methods=['GET'])
def get_bestsellers():
    url = 'https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=7'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

@app.route('/popular_books', methods=['GET'])
def popular_books():
    url = 'https://www.googleapis.com/books/v1/volumes?q=bestsellers+subject:nonfiction&maxResults=7'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

@app.route('/cadastrar_livro', methods=['POST'])
def cadastrar_livro():
    data = request.json
    titulo = data.get('titulo')
    autor = data.get('autor')
    isbn = data.get('isbn')  # identificador único para livros, nº de 13 dígitos
    usuario_id = data.get('usuario_id')
    status_leitura = data.get('status_leitura', '')  # Armazenar o status de leitura
    pagina_atual = data.get('pagina_atual', None)  # Página atual do livro

    # Construir a URL de pesquisa na API
    url = 'https://www.googleapis.com/books/v1/volumes?q='

    if titulo:
        url += f'intitle:{titulo}+'
    if autor:
        url += f'inauthor:{autor}+'
    if isbn:
        url += f'isbn:{isbn}'

    # Fazer a solicitação à API de livros do Google
    response = requests.get(url)

    if response.status_code == 200:
        # Adiciona os detalhes extraídos do livro ao banco de dados
        novo_livro = Livros(usuario_id=usuario_id, livro_id=isbn, status_leitura=status_leitura)

        # Define o status de leitura conforme necessário
        if status_leitura == 'lendo':
            novo_livro.lendo = True
            novo_livro.pagina_atual = pagina_atual  # Armazenar a página atual do livro
        elif status_leitura == 'lido':
            novo_livro.lido = True
        elif status_leitura == 'quero_ler':
            novo_livro.quero_ler = True
        elif status_leitura == 'abandonado':
            novo_livro.abandonado = True

        # Salva as alterações no banco de dados
        novo_livro.save()

        return jsonify({'message': 'Livro cadastrado com sucesso'}), 200
    else:
        return jsonify({'error': 'Falha ao obter informações do livro da API de livros do Google'}), 500

@app.route('/adicionar_favoritos', methods=['POST'])
def adicionar_favoritos():
    data = request.json
    usuario_id = data.get('usuario_id')
    livro_id = data.get('livro_id')
    avaliacao = data.get('avaliacao', None)

    # Verifica se o usuário e o livro existem
    if not Usuarios.get_or_none(id=usuario_id):
        return jsonify({'error': 'Usuário não encontrado'}), 404
    if not Livros.get_or_none(id=livro_id):
        return jsonify({'error': 'Livro não encontrado'}), 404
    
    # Adiciona o livro aos favoritos se a avaliação for 5 estrelas
    if avaliacao == 5:
        novo_favorito = Favoritos.create(id_usuario=usuario_id, id_livro=livro_id, avaliacao=avaliacao)
        return jsonify({'message': 'Livro adicionado aos favoritos com sucesso'}), 200
    # conclusão da avaliação
    else:
        return jsonify({'message': 'Avaliação concluída'}), 200

    

@app.route('/botao_adicionar_favoritos', methods=['POST'])
def botao_adicionar_favoritos():
    data = request.json
    usuario_id = data.get('usuario_id')
    livro_id = data.get('livro_id')

    # Verifica se o usuário e o livro existem
    if not Usuarios.get_or_none(id=usuario_id):
        return jsonify({'error': 'Usuário não encontrado'}), 404
    if not Livros.get_or_none(id=livro_id):
        return jsonify({'error': 'Livro não encontrado'}), 404

    # Adiciona o livro aos favoritos diretamente
    novo_favorito = Favoritos.create(id_usuario=usuario_id, id_livro=livro_id, classificacao=5)
    return jsonify({'message': 'Livro adicionado diretamente aos favoritos com sucesso'}), 200

@app.route('/remover_livro', methods=['POST'])
def remover_livro():
    data = request.json
    livro_id = data.get('livro_id')
    usuario_id = data.get('usuario_id')
    status_leitura = data.get('status_leitura')

    try:
        livro = Livros.get(Livros.id == livro_id, Livros.usuario_id == usuario_id)
        if livro:
            # Verifique o status de leitura do livro
            if status_leitura == 'lendo':
                livro.lendo = False
            elif status_leitura == 'lido':
                livro.lido = False
            elif status_leitura == 'quero_ler':
                livro.quero_ler = False
            elif status_leitura == 'abandonado':
                livro.abandonado = False
            else:
                return jsonify({'error': 'Status de leitura inválido'}), 400
            
            # Salvar as alterações no banco de dados
            livro.save()
            
            return jsonify({'message': 'Livro removido com sucesso'}), 200
        else:
            return jsonify({'error': 'Esse livro não foi adicionado a nenhuma lista'}), 404
    except Livros.DoesNotExist:
        return jsonify({'error': 'Esse livro não foi adicionado a nenhuma lista'}), 404
    except Exception as e:
        return jsonify({'error': f'Erro ao remover o livro: {str(e)}'}), 500
    
@app.route('/mover_livro', methods=['POST'])
def mover_livro():
    data = request.json
    livro_id = data.get('livro_id')
    usuario_id = data.get('usuario_id')
    novo_status_leitura = data.get('novo_status_leitura')

    try:
        # Verifica se o livro pertence ao usuário
        livro = Livros.get(Livros.id == livro_id, Livros.usuario_id == usuario_id)
        
        # Atualiza o status de leitura do livro
        if novo_status_leitura in ['lendo', 'lido', 'quero_ler', 'abandonado']:
            setattr(livro, novo_status_leitura, True)
            livro.save()
            return jsonify({'message': 'Livro movido com sucesso para a lista ' + novo_status_leitura}), 200
        else:
            return jsonify({'error': 'Status de leitura inválido'}), 400

    except Livros.DoesNotExist:
        return jsonify({'error': 'Livro não encontrado ou não pertence ao usuário'}), 404
    except Exception as e:
        return jsonify({'error': f'Erro ao mover o livro: {str(e)}'}), 500
    
@app.route('/progresso_leitura', methods=['POST'])
def progresso_leitura():
    data = request.json
    livro_id = data.get('livro_id')
    usuario_id = data.get('usuario_id')
    pagina_atual = data.get('pagina_atual')

    try:
        livro = Livros.get(Livros.id == livro_id, Livros.usuario_id == usuario_id)
        if livro:
            # Verifica se o livro está marcado como 'lendo'
            if livro.lendo:
                # Atualiza a página atual do livro
                livro.pagina_atual = pagina_atual
                livro.save()

                # Obtém o número total de páginas do livro da API do Google Books
                url = f'https://www.googleapis.com/books/v1/volumes/{livro.livro_id}'
                response = requests.get(url)
                if response.status_code == 200:
                    livro_info = response.json()
                    total_paginas = livro_info.get('volumeInfo', {}).get('pageCount', 0)

                    # Calcula a porcentagem de progresso
                    if total_paginas > 0:
                        progresso = (pagina_atual / total_paginas) * 100
                        return jsonify({'message': 'Progresso atualizado com sucesso', 'progresso': progresso}), 200
                    else:
                        return jsonify({'error': 'Número total de páginas não disponível'}), 500
                else:
                    return jsonify({'error': 'Falha ao obter informações do livro da API de livros do Google'}), 500
            else:
                return jsonify({'error': 'O livro não está marcado como "lendo"'}), 400
        else:
            return jsonify({'error': 'Livro não encontrado'}), 404
    except Livros.DoesNotExist:
        return jsonify({'error': 'Livro não encontrado'}), 404
    except Exception as e:
        return jsonify({'error': f'Erro ao atualizar o progresso de leitura: {str(e)}'}), 500


@app.route('/')
def home():
    return 'Página inicial'

if __name__ == "__main__":
    app.run(debug=True)
