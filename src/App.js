import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Estude from './Estude';
import Historico from './Historico';
import logo from './imagens/shelf-logo.png';

function App() {
  return (
    <Router>
      <header>
        <div className="header-links">
          <Link to="/historico" className="header-link">Histórico</Link>
          <Link to="/" className="header-link logo">
          <img src={logo} alt="Logo" /></Link>
          <Link to="/estude" className="header-link">Estude</Link>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estude" element={<Estude />} />
        <Route path="/historico" element={<Historico />} />
      </Routes>

      <footer>
          <p>Criado por Matheus Campos e José Victor para a disciplina de Programação Web</p>
      </footer>
    </Router>
  );
}

export default App;