from flask import Flask, render_template, redirect, url_for, flash, request
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo
from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename
from esquema import app, db, Usuarios
import os, re


# Definição da classe formulário
class CadastroForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email()])
    password = PasswordField('password', validators=[DataRequired()])
    confirm_password = PasswordField('confirm_password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Cadastrar')

# Criação da instância Flask
app = Flask(__name__)
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
@app.route("/cadastro", methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        # Validar o registro dos usuários
        is_valid, message = validate_registration(email, password, confirm_password)
        if not is_valid:
            flash(message, 'error')
            return redirect(url_for('cadastro'))
        
        # Segurança Hash para senha de usuário
        hashed_password = generate_password_hash(password)

        #Salvar usuário no BD
        new_user = Usuarios(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        flash('Cadastro realizado com sucesso', 'success')
        return redirect(url_for('home'))
    
    return render_template('cadastro.html')

@app.route("/uploud", methods=['POST'])
def uploud():
    if 'imagem_perfil' not in request.files:
        return 'Nenhuma imagem enviada'
    image = request.files['imagem_perfil']

    if image.filename == '':
        return 'Nenhum arquivo selecionado'
    if not allowed_file(image.filename):
        return 'Tipo de arquivo não permetido'
    if image.content_length > MAX_FILE_SIZE:
        return 'Tamanho do arquivo excede o limite permitido'
    
    #Caminho onde deseja salvar as imagens
    path = 'C:\Users\Higo\Downloads\Arquivos - 2023\Higo\Projeto Lume\uploud_imagens'
    image.save(os.path.join(path, image.filename))

    return 'Uploud de imagem realizado com sucesso!'

@app.route("/criar_perfil", methods=['GET', 'POST'])
def criar_perfil():
    if request.method == 'POST':
        name = request.form['name']
        username = request.form['username']

        # instância do usuário com os dados fornecidos
        novo_usuario = Usuarios(nome=name, nome_usuario=username)
        # Salvar usuario no banco de dados
        novo_usuario.save()

        return redirect(url_for('home'))
    
    return render_template('criar_perfil.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        #lógica para autenticar
        flash('Login realizado com sucesso!', 'sucess')
    return render_template('login.html')



@app.route('/home')
def home():
    return 'Página inicial'

if __name__ == "__main__":
    app.run(debug=True)
