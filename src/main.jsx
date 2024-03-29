import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from '../src/pages/Login/Login.jsx';
import CriarConta2 from '../src/pages/Criarconta/CriarConta2.jsx';
import CriarConta from '../src/pages/Criarconta/CriarConta.jsx';
import Errorpage from '../src/pages/errorPage/Errorpage.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CriarConta" element={<CriarConta />} />
        <Route path="/ContaCont" element={<CriarConta2 />} />
        <Route path="/Errorpage" element={<Errorpage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);