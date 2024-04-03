from flask import Flask, render_template, redirect, url_for, flash, request
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo

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
        return False, "E-mail, senha e confirmação de senha são campos obrigatórios."
    
    if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
        return False, "E-mail inválido. Por favor, insira um e-mail válido."
    if len(password) < 8:
        return False, "A senha deve ter pelo menos 8 caracteres."
    
    if not re.search(r'[a-z]', password) or not re.search(r'[A-Z]', password) or not re.search(r'\d', password):
        return False, "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula e um dígito."
    if password != confirm_password:
        return False, "A senha e a confirmação de senha não correspondem."
    
    return True, "Cadastro válido."
    
 
@app.route("/cadastro", methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        #lógica para autenticar
        flash('Cadastro realizado com sucesso')
        return redirect(url_for('home'))
    return render_template('cadastro.html')

@app.route("/uploud", methods=['POST'])
def uploud():
    if 'imagem_perfil' in request.files:
        image = request.files['imagem_perfil']
        # Caminho para salvar imagens 
        path = 'C:\Users\Higo\Downloads\Arquivos - 2023\Higo\Projeto Lume\uploud_imagens'
        image.save(os.path.join(path, image.filename))
        return 'Uploud de imagem realizado com sucesso!'
    else:
        return 'Nenhuma imagem enviada'

@app.route("/criar_perfil", methods=['GET', 'POST'])
def criar_perfil():
    if request.method == 'POST':
        name = request.form['name']
        username = request.form['username']
        # Salvar name e username no banco de dados
        # Redirecionar para página inicial após finalizar criação de perfil
        return redirect(url_for('home'))
    return render_template('criar_perfil.html')h

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
