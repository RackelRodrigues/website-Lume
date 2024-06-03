from flask import Flask, render_template, redirect, url_for, flash, request, jsonify, session, flash
import requests
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from peewee import DoesNotExist
from werkzeug.utils import secure_filename
from esquema.esquema import *
import os, re
import requests
from flask_cors import CORS



class CadastroForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email()])
    password = PasswordField('password', validators=[DataRequired()])
    confirm_password = PasswordField('confirm_password', validators=[DataRequired(), EqualTo('password')])
    


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SECRET_KEY'] = 'sua_chave_secreta'


# Lógica de autenticação
def validate_registration(email, password, confirm_password):
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



@app.route("/cadastro", methods=['POST'])
def cadastro():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['password']
        confirma_senha = request.form['confirm_password']
        is_admin = request.form['is_admin']
        is_active = request.form['is_active']
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

        
        if not Usuarios.select().exists():
            new_user = Usuarios(email=email, senha=senha, is_admin=True)
        else:
            new_user = Usuarios(email=email, senha=senha, is_active=True)
        new_user.save()

        return jsonify({'message': 'Usuário cadastrado com sucesso!'}), 201
    
    return jsonify({'message': 'Método não permitido'}), 405


@app.route("/criar_perfil", methods=['POST'])
def criar_perfil():
    if request.method == 'POST':
        name = request.form.get('name')
        username = request.form.get('username')
        
        if not name or not username:
            return jsonify({'message': 'Nome e nome de usuário são obrigatórios'}), 400
        
        # Crie uma nova instância do modelo "Perfil"
        novo_perfil = Perfil(nome=name, nome_usuario=username)
        
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
        email = request.form.get('email')
        senha = request.form.get('senha')

        user = Usuarios.get_or_none(email=email, senha=senha)
        if user:
            session['user_id'] = user.id  # Armazena o ID do usuário na sessão
            if user.is_admin:
                return jsonify({'redirect': url_for('admin')}), 200
            else:
                return jsonify({'redirect': url_for('principal')}), 200
        else:
            flash('Usuário não encontrado', 'error')
    
    # Retorno padrão caso não seja feito o redirecionamento
    return jsonify({'message': 'Erro ao fazer login'}), 401
    
    return jsonify({'error': 'Usuário não encontrado'}), 404

    return jsonify({'error': 'Método não permitido'}), 405

# Rota para a tela de administração
@app.route('/admin')
def admin():
    if 'user_id' in session:
        user = Usuarios.get_or_none(id=session['user_id'])
        if user and user.is_admin:
            # Garante que sempre haja pelo menos um moderador na lista de usuários
            moderators = Usuarios.select().where((Usuarios.is_admin == True) & (Usuarios.is_active == True))
            if moderators.count() == 0:
                return jsonify({'error': 'Não há moderadores ativos. Crie um novo moderador.'}), 404
            
            # Garante que os moderadores estejam no topo da lista
            users = list(moderators) + list(Usuarios.select().where((Usuarios.is_admin == False) & (Usuarios.is_active == True)))
            user_data = [{'email': user.email, 'is_admin': user.is_admin, 'is_active': user.is_active} for user in users]
            return jsonify({'users': user_data}), 200
    return jsonify({'error': 'Usuário não autorizado'}), 401

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

@app.route('/adicionar_quero_ler', methods=['POST'])
def adicionar_quero_ler():
    data = request.json
    email = data.get('email')
    livro_id = data.get('livro_id')

    try:
        usuario = Usuarios.get(Usuarios.email == email)
        livro_quero_ler = LivroQueroLer.create(usuario=usuario, livro_id=livro_id)
        return jsonify({'message': 'Livro adicionado à lista "Quero Ler" com sucesso.'}), 200
    except Usuarios.DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
   
#rota para adicionar ao lendo
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
    

#rota para colocar na lisat de abandonei     
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
    
    
@app.route('/adicionar_favorito', methods=['POST'])
def adicionar_favorito():
    data = request.json
    email = data.get('email')
    livro_id = data.get('livro_id')
    avaliacao = data.get('avaliacao')

    try:
        usuario = Usuarios.get(Usuarios.email == email)
        favorito = Favoritos.create(id_usuario=usuario, livro_id=livro_id, avaliacao=avaliacao)
        return jsonify({'message': 'Livro adicionado aos favoritos com sucesso.'}), 200
    except Usuarios.DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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


@app.route('/')
def first_page():
    return render_template('first_page.html')

if __name__ == "__main__":
    app.run(debug=True)
