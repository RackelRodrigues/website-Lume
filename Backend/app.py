from flask import Flask, render_template, redirect, url_for, flash, request
from email_validator import *
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo

app = Flask(__name__)
app.config['SECRET_KEY'] = 'sua_chave_secreta'

class LoginForm(FlaskForm):
   email = StringField('E-mail', validators=[DataRequired(), Email()])
   password = PasswordField('Senha', validators=[DataRequired()])
   submit = SubmitField('Entrar')

class CadastroForm(FlaskForm):
   username = StringField('Nome Completo', validators=[DataRequired()])
   email = StringField('E-mail', validators=[DataRequired(), Email()])
   password = PasswordField('Senha', validators=[DataRequired()])
   submit = SubmitField('Entrar')


@app.route('/', methods=['GET', 'POST'])
def home():
   if request.method == 'POST':
      action = request.form.get('action')
      if action == 'login':
         return redirect(url_for('login'))
      elif action == 'cadastro':
         return redirect(url_for('cadastro'))
   else:
      return render_template('home.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
   form = LoginForm()
   if form.validate_on_submit():
      ##return redirect(url_for('index')) 
      flash('Login realizado com sucesso!', 'success')
   return render_template('login.html', form=form)
      

@app.route("/cadastro", methods=['GET', 'POST'])
def cadastro():
   form = CadastroForm()
   if form.validate_on_submit():
      flash('Cadastro realizado com sucesso')
      return redirect(url_for('login'))
   return render_template('cadastro.html', form=form)
   

if __name__ == "__main__":
   app.run(debug=True)