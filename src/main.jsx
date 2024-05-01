import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Login from '../src/pages/Login/Login.jsx';
import CriarConta2 from '../src/pages/Criarconta/CriarConta2.jsx';
import CriarConta from '../src/pages/Criarconta/CriarConta.jsx';
import Books from './pages/Books/books.jsx';
import ProfileUser from './pages/ProfileUser/Profileuser.jsx';
import Errorpage from '../src/pages/errorPage/Errorpage.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CriarConta" element={<CriarConta />} />
          <Route path="/ContaCont" element={<CriarConta2 />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/pageuser" element={<ProfileUser/>} />
          <Route path="*" element={<Errorpage error={{ message: 'Página não encontrada' }} />} />
       
         
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
);