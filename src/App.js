// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Estude from './Estude';
import Historico from './Historico';
import Login from './Login';
import logo from './imagens/shelf-logo.png';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const handleLogin = (userId) => {
    setUserId(userId);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    window.location.reload();
  };

  return (
    <Router>
      <header>
        <div className="header-links">
          <Link to="/" className="header-link logo">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="header-links-mobile">
            <Link to="/historico" className="header-link" id="link-text">
              HISTÓRICO
            </Link>
            <Link to="/estude" className="header-link" id="link-text">
              ESTUDE
            </Link>
            {userId ? (
              <button className="header-link" id="link-text" onClick={handleLogout}>
                LOGOUT
              </button>
            ) : (
              <Link to="/login" className="header-link" id="link-text">
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estude" element={<Estude />} />
          <Route path="/historico" element={<Historico userId={userId} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </main>

      <footer>
        <p>Criado por Matheus Campos e José Victor para a disciplina de Programação Web</p>
      </footer>
    </Router>
  );
}

export default App;
