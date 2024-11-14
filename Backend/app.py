from flask import Flask, render_template, make_response,redirect, url_for, flash, request, jsonify, session, flash
import requests
from flask_wtf import FlaskForm
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from peewee import DoesNotExist
from functools import wraps
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from playhouse.shortcuts import model_to_dict
from esquema.esquema import *
from datetime import timedelta
import os, re
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv
import sendgrid
import jwt
from datetime import datetime, timedelta

load_dotenv();

#coloquei oque eu enviei via whatsapp



# Lógica de autenticação
def validate_registration(email, password, confirm_password, is_active, is_admin):
    if not email or not password or not confirm_password:
        return False, "Por favor, preencha todos os campos."
    
    if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
        return False, "E-mail inválido. Por favor, insira um e-mail válido."
    if len(password) < 8:
        return False, "A senha deve ter pelo menos 8 caracteres."
    
    if not re.search(r'[a-z]', password) or not re.search(r'[A-Z]', password) or not re.search(r'\d', password):
        return False, "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula e um dígito."
    if password != confirm_password:
        return False, "A senha e a confirmação de senha não correspondem."
    
    return True, "Cadastro válido."


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id) 


from sendgrid.helpers.mail import Mail as SendGridMail
import jwt
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env
load_dotenv()





print(os.getenv("SENDGRID_API_KEY"))


def send_email(to_email, subject, content):
    """Função para enviar e-mail utilizando SendGrid"""
    message = SendGridMail(
        from_email='rackelrodrigues247@gmail.com',
        to_emails=to_email,
        subject=subject,
        plain_text_content=content
    )
    try:
        #sg = SendGridAPIClient(api_key=app.config['SENDGRID_API_KEY'])
        sg = SendGridAPIClient(app.config['SENDGRID_API_KEY'])
        response = sg.send(message)
        print(f"Status code: {response.status_code}")
        print(f"Body: {response.body}")
        print(f"Headers: {response.headers}")
    except Exception as e:
        print(f"Erro ao enviar e-mail: {str(e)}")

def generate_reset_token(user_id):
    """Gera um token JWT com validade de 30 minutos"""
    expiration = timedelta(minutes=30)
    token = create_access_token(identity=user_id, expires_delta=expiration)
    return token

class CadastroForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email()])
    password = PasswordField('password', validators=[DataRequired()])
    confirm_password = PasswordField('confirm_password', validators=[DataRequired(), EqualTo('password')])
    



# Lógica de autenticação
def validate_registration(email, password, confirm_password, is_active, is_admin):
    if not email or not password or not confirm_password:
        return False, "Por favor, preencha todos os campos."
    
    if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
        return False, "E-mail inválido. Por favor, insira um e-mail válido."
    if len(password) < 8:
        return False, "A senha deve ter pelo menos 8 caracteres."
    
    if not re.search(r'[a-z]', password) or not re.search(r'[A-Z]', password) or not re.search(r'\d', password):
        return False, "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula e um dígito."
    if password != confirm_password:
        return False, "A senha e a confirmação de senha não correspondem."
    
    return True, "Cadastro válido."


@login_manager.user_loader
def load_user(user_id):
    return Usuarios.query.get(user_id) 

# Registrar atividades dos usuários para o feed
def registrar_atividade(usuario_id, descricao):
    try:
        Atividades.create(usuario_id=usuario_id, descricao=descricao)
    except Exception as e:
        print(f'Erro ao registrar atividade: {str(e)}')

import jwt
from datetime import datetime, timedelta

def generate_reset_token(user_id):
    expiration = datetime.utcnow() + timedelta(hours=1)  # Token válido por 1 hora
    token = jwt.encode(
        {'user_id': user_id, 'exp': expiration}, 
        app.config['JWT_SECRET_KEY'], 
        algorithm='HS256'
    )
    return token

@app.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
    """Rota para solicitar redefinição de senha"""
    if request.method == 'POST':
        email = request.form['email']
        
        # Usando Peewee para buscar o usuário pelo e-mail
        try:
            user = Usuarios.get(Usuarios.email == email)
            token = generate_reset_token(user.email)  # Gere o token com o e-mail do usuário
            reset_url = url_for('confirm_reset', token=token, _external=True)
            send_email(email, 'Redefinição de Senha', f'Clique no link para redefinir sua senha: {reset_url}')
            flash('Um e-mail com o link de redefinição de senha foi enviado.')
            return redirect(url_for('login'))
        
        except Usuarios.DoesNotExist:
            flash('E-mail não encontrado', 'error')
            return redirect(url_for('reset_password'))

@app.route('/confirm_reset/<token>', methods=['GET', 'POST'])
def confirm_reset(token):
    try:
        # Decodifica o token para verificar a validade e obter o e-mail
        decoded_token = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
        user_email = decoded_token['user_email']
    except jwt.ExpiredSignatureError:
        flash('O link de redefinição de senha expirou.')
        return redirect(url_for('reset_password'))
    except jwt.InvalidTokenError:
        flash('Token inválido.')
        return redirect(url_for('reset_password'))
    
    if request.method == 'POST':
        new_password = request.form['new_password']
        confirm_password = request.form['confirm_password']
        
        if new_password == confirm_password:
            try:
                # Aqui estamos buscando o usuário pelo email, não pelo id
                usuario = Usuarios.get(Usuarios.email == user_email)
                usuario.senha = new_password  # Atualiza a senha
                usuario.save()  # Salva a atualização no banco de dados
                flash('Senha atualizada com sucesso!')
                return redirect(url_for('login'))
            except Usuarios.DoesNotExist:
                flash('Usuário não encontrado.')
        else:
            flash('As senhas não coincidem. Tente novamente.')

    return redirect(url_for('reset_password'))  # Caso POST não ocorra ou falhe




@app.route("/cadastro", methods=['POST'])
def cadastro():
    if request.method == 'POST':
        data = request.json
        email = data['email']
        senha = data['password']
        confirma_senha = data['confirm_password']
        is_admin = data['is_admin']
        is_active = data['is_active']
        
        # Verificar comprimento do email e senha
        if len(email) > 255 or len(senha) > 100:
            return jsonify({'message': 'O email deve ter no máximo 255 caracteres e a senha deve ter no máximo 100 caracteres'}), 400

        if senha != confirma_senha:
            return jsonify({'message': 'A senha e a confirmação de senha não correspondem'}), 400

        is_valid, message = validate_registration(email, senha, confirma_senha, is_active, is_admin)
        if not is_valid:
            return jsonify({'message': message}), 400
        
        # Verificar se o email já está cadastrado no banco de dados
        existing_user = Usuarios.get_or_none(email=email)
        if existing_user:
            return jsonify({'message': 'Este email já está sendo usado por outro usuário. Por favor, escolha outro.'}), 400

        # Criar novo usuário
        new_user = Usuarios(email=email, senha=senha, is_admin=is_admin, is_active=is_active)
        new_user.save()

        # Gerar token de acesso
        access_token = create_access_token(identity=new_user.id)

        # Atualizar o usuário com o token de acesso
        new_user.access_token = access_token
        new_user.save()

        return jsonify({'message': 'Usuário cadastrado com sucesso!', 'access_token': access_token}), 201
    
    return jsonify({'message': 'Método não permitido'}), 405


@app.route("/criar_perfil", methods=['POST'])
def criar_perfil():
    if request.method == 'POST':
        data = request.json
        name = data.get('name')
        username = data.get('username')
        inicial = data.get('inicial')
        email = data.get('email')

        if not all([name, username, inicial, email]):
            return jsonify({'message': 'Nome, nome de usuário, inicial e email são obrigatórios'}), 400
        
        try:
            usuario = Usuarios.select().where(Usuarios.email == email).get()
        except Usuarios.DoesNotExist:
            return jsonify({'message': 'Usuário não encontrado'}), 404
        
        # Crie uma nova instância do modelo "Perfil"
        novo_perfil = Perfil(nome=name, nome_usuario=username, inicial=inicial, usuario=usuario.id)
        
        # Salve o novo perfil no banco de dados
        novo_perfil.save()

        return jsonify({'message': 'Perfil criado com sucesso'}), 201

    return jsonify({'message': 'Método não permitido'}), 405


@app.route('/perfil/inicial/<email>', methods=['GET'])
def get_inicial(email):
    try:
        usuario = Usuarios.select().where(Usuarios.email == email).get()
        perfil = Perfil.select().where(Perfil.usuario == usuario.id).get()
        primeiro_nome = perfil.nome.split()[0]  
        return jsonify({'inicial': perfil.inicial, 'primeiro_nome': primeiro_nome})

    except Usuarios.DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado'}), 404
    except Perfil.DoesNotExist:
        return jsonify({'error': 'Perfil não encontrado'}), 404
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar perfil inicial: {str(e)}'}), 500


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        senha = data.get('senha')

        user = Usuarios.get_or_none(Usuarios.email == email, Usuarios.senha == senha)
        if user:
            access_token = user.access_token  # Obtém o token armazenado no banco de dados
            login_user(user, remember=True, duration=timedelta(days=30))

            response_data = {
                'message': 'Login realizado com sucesso',
                'access_token': access_token,
                'is_admin': user.is_admin  # Inclui a informação 'is_admin' no retorno
            }

            response = make_response(jsonify(response_data), 200)
            response.set_cookie('access_token', access_token, httponly=True, samesite='None')
            return response
        else:
            return jsonify({'message': 'Usuário não encontrado'}), 401
    if current_user.is_authenticated:
        # Se o usuário já estiver autenticado, redirecione para a página desejada após o login
        next_page = request.args.get('next')
        return redirect(next_page or url_for('index'))
    return jsonify({'message': 'Método não permitido'}), 405


#Rackel,um token JWT é gerado com o email do usuário como a identidade (identity=email). Quando você acessa a rota protegida (/protected), o decorator @jwt_required() verifica se o token é válido e, se for, você pode obter a identidade do token usando get_jwt_identity(), que neste caso será o email do usuário associado ao token.

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get('access_token')

        if not token:
            return jsonify({'error': 'Token de acesso ausente'}), 401

        try:
            payload = jwt.decode(token, 'aP34!eK@82&dO39s#BzLxG$wMpt^Qd%yZfHk!1JpN3q&UwFv', algorithms=['HS256'])
            user_id = payload['sub']
            user = Usuarios.get_or_none(id=user_id)
            if user and user.is_admin:
                return f(*args, **kwargs)
            else:
                return jsonify({'error': 'Usuário não autorizado'}), 403
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token inválido'}), 401

    return decorated_function


# Rota para a tela de administração

@app.route('/admin')
@login_required
def admin():
    if not current_user.is_authenticated:
        return redirect(url_for('login'))  

    
    moderators = Usuarios.select().where((Usuarios.is_admin == True) & (Usuarios.is_active == True))
    if moderators.count() == 0:
        return jsonify({'error': 'Não há moderadores ativos. Crie um novo moderador.'}), 404
        
    users = list(moderators) + list(Usuarios.select().where((Usuarios.is_admin == False) & (Usuarios.is_active == True)))
    user_data = [{'email': user.email, 'is_admin': user.is_admin, 'is_active': user.is_active} for user in users]
    return jsonify({'users': user_data}), 200


@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    if 'user_id' in session:
        admin_user = Usuarios.get_or_none(id=session['user_id'], is_admin=True)
        if admin_user:
            user_to_delete = Usuarios.get_or_none(id=user_id)
            if user_to_delete:
                if user_to_delete.is_admin:
                    moderators_count = Usuarios.select().where((Usuarios.is_admin == True) & (Usuarios.is_active == True)).count()
                    if moderators_count > 1:
                        user_to_delete.is_active = False
                        user_to_delete.save()
                        return jsonify({'message': f'O usuário {user_to_delete.email} foi desativado com sucesso!'}), 200
                    else:
                        return jsonify({'error': 'Não é possível excluir o último moderador!'}), 400
                else:
                    user_to_delete.is_active = False
                    user_to_delete.save()
                    return jsonify({'message': f'O usuário {user_to_delete.email} foi desativado com sucesso!'}), 200
    return jsonify({'error': 'Usuário não autorizado'}), 401

@app.route('/toggle_admin/<int:user_id>', methods=['PUT'])
def toggle_admin(user_id):
    if 'user_id' in session:
        admin_user = Usuarios.get_or_none(id=session['user_id'], is_admin=True)
        if admin_user:
            user_to_toggle = Usuarios.get_or_none(id=user_id)
            if user_to_toggle:
                user_to_toggle.is_admin = not user_to_toggle.is_admin
                user_to_toggle.save()
                if user_to_toggle.is_admin:
                    return jsonify({'message': f'O usuário {user_to_toggle.email} agora é um moderador!'}), 200
                else:
                    return jsonify({'message': f'O usuário {user_to_toggle.email} não é mais um moderador!'}), 200
    return jsonify({'error': 'Usuário não autorizado'}), 401

@app.route('/painel')
def painel():
    if 'user_id' in session:
        user_id = session['user_id']
        user = Usuarios.get_or_none(id=user_id, is_admin=False)
        if user:
            return jsonify({'message': 'Bem-vindo ao painel de usuário!'}), 200
    return jsonify({'error': 'Usuário não autorizado'}), 401

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
    url = f'https://www.googleapis.com/books/v1/volumes?q={query}&key=coloque aqui'

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
    try:
        url = 'https://www.googleapis.com/books/v1/volumes?q=bestsellers+subject:nonfiction&maxResults=7'
        response = requests.get(url)
        response.raise_for_status()  # Levanta uma exceção para códigos de status HTTP 4xx/5xx

        data = response.json()
        return jsonify(data), 200
    except requests.exceptions.RequestException as e:
        # Lida com erros na solicitação HTTP
        return jsonify({'error': 'Erro ao buscar dados da API do Google Books', 'details': str(e)}), 500
    except ValueError as e:
        # Lida com erros ao decodificar a resposta JSON
        return jsonify({'error': 'Erro ao processar a resposta da API do Google Books', 'details': str(e)}), 500



@app.route('/adicionar_quero_ler/<livro_id>', methods=['POST'])
@login_required
def adicionar_quero_ler(livro_id):
        # Verifica se o usuário está autenticado
        if current_user.is_authenticated:
            # Faça aqui o que você precisa fazer quando o usuário está autenticado
            email = current_user.email

            livro_quero_ler = LivroQueroLer.create(usuario=current_user, livro_id=livro_id)
            return jsonify({'message': 'Livro adicionado à lista "Quero Ler" com sucesso.'}), 200
        else:
            return jsonify({'error': 'Token inválido para este usuário.'}), 401
  
   


@app.route('/adicionar_lendo', methods=['POST'])
def adicionar_lendo():
    data = request.json
    email = data.get('email')
    livro_id = data.get('livro_id')

    try:
        usuario = Usuarios.get(Usuarios.email == email)
        livro_lendo = LivroLendo.create(usuario=usuario, livro_id=livro_id)
        return jsonify({'message': 'Livro adicionado à lista "Lendo" com sucesso.'}), 200
    except Usuarios.DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/adicionar_abandonei', methods=['POST'])
def adicionar_abandonei():
    data = request.json
    email = data.get('email')
    livro_id = data.get('livro_id')

    try:
        usuario = Usuarios.get(Usuarios.email == email)
        livro_abandonei = LivroAbandonado.create(usuario=usuario, livro_id=livro_id)
        return jsonify({'message': 'Livro adicionado à lista "Abandonei" com sucesso.'}), 200
    except Usuarios.DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/adicionar_ja_li', methods=['POST'])
def adicionar_ja_li():
    data = request.json
    email = data.get('email')
    livro_id = data.get('livro_id')

    try:
        usuario = Usuarios.get(Usuarios.email == email)
        livro_ja_li = LivroJaLi.create(usuario=usuario, livro_id=livro_id)
        return jsonify({'message': 'Livro adicionado à lista "Já Li" com sucesso.'}), 200
    except Usuarios.DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/feed/<int:usuario_id>', methods=['GET'])
def feed(usuario_id):
    try:
        # Buscar todas as atividades relacionadas ao usuário
        atividades = (Atividades
                      .select()
                      .where(Atividades.usuario_id == usuario_id)
                      .order_by(Atividades.timestamp.desc())
                      .limit(10))  # Limitar o número de atividades retornadas.

        # Estruturar os dados para retorno em JSON
        feed_data = []
        for atividade in atividades:
            feed_data.append({
                'descricao': atividade.descricao,
                'timestamp': atividade.timestamp.strftime('%Y-%m-%d %H:%M:%S')
            })

        return jsonify({'feed': feed_data}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    
@app.route('/botao_adicionar_favoritos', methods=['POST'])
def botao_adicionar_favoritos():
    data = request.json
    usuario_id = data.get('usuario_id')
    livro_id = data.get('livro_id')

    try:
        # Verifica se o usuário existe
        usuario = Usuarios.get_or_none(Usuarios.id == usuario_id)
        if not usuario:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        # Verifica se o livro existe
        livro = Livros.get_or_none(Livros.id == livro_id)
        if not livro:
            return jsonify({'error': 'Livro não encontrado'}), 404

        # Adiciona aos favoritos diretamente
        Favoritos.create(usuario=usuario, livro=livro)

        # Registra a atividade de adicionar aos favoritos
        Atividades.create(usuario=usuario, tipo='adicionar_favoritos', livro=livro)

        return jsonify({'message': 'Livro adicionado aos favoritos com sucesso'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/avaliacao_livro', methods=['POST'])
def avaliacao_livro():
    data = request.json
    usuario_id = data.get('usuario_id')
    livro_id = data.get('livro_id')
    avaliacao = data.get('avaliacao')

    try:
        # Verifica se o usuário existe
        usuario = Usuarios.get_or_none(Usuarios.id == usuario_id)
        if not usuario:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        # Verifica se o livro existe
        livro = Livros.get_or_none(Livros.id == livro_id)
        if not livro:
            return jsonify({'error': 'Livro não encontrado'}), 404

        # Verifica se a avaliação está dentro do intervalo de 1 a 5 estrelas
        if not (1 <= avaliacao <= 5):
            return jsonify({'error': 'A avaliação deve estar no intervalo de 1 a 5 estrelas'}), 400

        # Cria uma nova avaliação na tabela Avaliacoes
        nova_avaliacao = Avaliacoes.create(id_usuario=usuario_id, livro_id=livro_id, avaliacao=avaliacao)

        # Atualiza a avaliação média do livro na tabela Livros
        total_avaliacoes = Avaliacoes.select(fn.Count(Avaliacoes.avaliacao)).where(Avaliacoes.livro_id == livro_id).scalar()
        soma_avaliacoes = Avaliacoes.select(fn.Sum(Avaliacoes.avaliacao)).where(Avaliacoes.livro_id == livro_id).scalar()
        
        if total_avaliacoes:
            livro.avaliacao_media = soma_avaliacoes / total_avaliacoes
        else:
            livro.avaliacao_media = 0
        
        livro.save()

        # Registra a atividade de adição de avaliação
        Atividades.create(usuario=usuario, descricao=f'Avaliou o livro {livro.titulo} com {avaliacao} estrelas')

        # Adiciona aos favoritos se a avaliação for 5 estrelas
        if avaliacao == 5:
            Favoritos.create(id_usuario=usuario_id, livro_id=livro_id)
            Atividades.create(usuario=usuario, descricao=f'Adicionou o livro {livro.titulo} aos favoritos')

        return jsonify({'message': 'Avaliação registrada com sucesso'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


    
"""
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
""" 

"""
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
"""
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

@app.route('/book-details/<book_id>')
def get_book_details(book_id):
    try:
        
        base_url = 'https://www.googleapis.com/books/v1/volumes/'

        url = base_url + book_id

        response = requests.get(url)


        if response.status_code == 200:
            
            return jsonify(response.json())
        else:
          
            return jsonify({'error': 'Falha ao obter detalhes do livro'}), response.status_code
    except Exception as e:
       
        return jsonify({'error': 'Erro ao processar a requisição'}), 500

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout realizado com sucesso'}), 200


@app.route('/')
def first_page():
    return render_template('first_page.html')

if __name__ == "__main__":
    app.run(debug=True)
