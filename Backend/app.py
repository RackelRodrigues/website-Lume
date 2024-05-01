from flask import Flask, render_template, redirect, url_for, flash, request, jsonify
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

# Extensões e tamanhos de arquivos aceitos
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_FILE_SIZE = 10 * 1024 * 1024 # 10 MB

def allowed_file(filename):
    return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ROTAS
@app.route("/cadastro", methods=['POST'])
def cadastro():
    try:
        data = request.get_json()
        email = data.get('email')
        senha= data.get('senha')
        confirm_password = data.get('confirm_password')


        if not email or not senha or not confirm_password:
            return jsonify({'message': 'Por favor, preencha todos os campos'}), 400
        

        if len(email) > 255 or len(senha) > 100:
            return jsonify({'message': 'O email deve ter no máximo 255 caracteres e a senha deve ter no máximo 100 caracteres'}), 400

        if senha!= confirm_password:
            return jsonify({'message': 'A senha e a confirmação de senha não correspondem'}), 400

        is_valid, message = validate_registration(email, senha, confirm_password)
        if not is_valid:
            return jsonify({'message': message}), 400

        hashed_password = generate_password_hash(senha)
        new_user = Usuarios(email=email, senha=hashed_password)
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
        
            if not email:
                return jsonify({'message': 'Email não pode ser vazio'}), 400
            
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

    return 'Cuida'

@app.route('/perfil/inicial/<email>', methods=['GET'])
def get_inicial(email):
    try:
        usuario = Usuarios.select().where(Usuarios.email == email).get()
        perfil = Perfil.select().where(Perfil.usuario == usuario.id).get()
        return jsonify({'inicial': perfil.inicial, 'primeiro_nome': usuarios.nome_usuario.split()[0]})
    except Usuarios.DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado'}), 404
    except Perfil.DoesNotExist:
        return jsonify({'error': 'Perfil não encontrado'}), 404
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar perfil inicial: {str(e)}'}), 500
#Não precisa mexer eu já criei a rota
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        senha = data.get('senha')

        # Busca o usuário pelo email
        user = Usuarios.get_or_none(email=email)
        if user:
            # Verifica se a senha está correta
            if check_password_hash(user.senha, senha):
                flash('Login realizado com sucesso!', 'success')
                return redirect(url_for('home'))
            else:
                flash('Senha inválida', 'error')
        else:
            flash('Usuário não encontrado', 'error')


    
    return redirect(url_for('home'))

@app.route('/search-books', methods=['POST'])
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

@app.route('/popular-books', methods=['GET'])
def get_popular_books():
    url = 'https://www.googleapis.com/books/v1/volumes?q=bestsellers+subject:nonfiction&maxResults=7'
    response = requests.get(url)
    data = response.json()
    return jsonify(data)



@app.route('/')
def home():
    return 'Página inicial'

if __name__ == "__main__":
    app.run(debug=True)
