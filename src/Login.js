import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3001';

function Login() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('/login', { 
        username: username,
        password: password
      });
  
      if (response.data.success) {
        const userId = response.data.userId;
        localStorage.setItem('userId', userId);
        
        navigate('/');
        window.location.reload();
      } else {
        alert('Usuário ou senha inválidos! Por favor, verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao realizar o login: ', error);
      alert('Ocorreu um erro ao realizar o login.');
    }
  }

  const handleToggleMode = () => {
    setUsername('');
    setPassword('');
    setIsRegisterMode(!isRegisterMode);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('/registrar', {
        fullName: fullName,
        username: username,
        password: password,
      },);

      if (response.data.success) {
        alert('Usuário registrado com sucesso!');
        navigate('/Login');
      } else {
        alert('Erro ao cadastrar usuário!');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário: ', error);
      alert('Ocorreu um erro ao cadastrar o usuário.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">{isRegisterMode ? 'Cadastro' : 'Login'}</h1>
      <form className="login-form" onSubmit={isRegisterMode ? handleRegister : handleLogin}>
        {isRegisterMode && (
          <input
            type="text"
            placeholder="Nome completo"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
            className="login-input"
          />
        )}
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          {isRegisterMode ? 'Registrar' : 'Entrar'}
        </button>
      </form>
      <div className="toggle-mode-container">
        <span>
          {isRegisterMode ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}
        </span>
        <button className="toggle-mode-button" onClick={handleToggleMode}>
          {isRegisterMode ? 'Entrar' : 'Registrar'}
        </button>
      </div>
    </div>
  );
}

export default Login;
