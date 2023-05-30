import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false); // Estado para controlar o modo de registro

  const handleLogin = (event) => {
    event.preventDefault(); // Impede o envio do formulário

    // Realizar a validação de login (substitua com sua lógica de autenticação)
    if (username === 'admin' && password === 'password') {
      alert('Login bem-sucedido');
      // Redirecionar para outra página ou executar ações adicionais
      navigate('/dashboard');
    } else {
      alert('Nome de usuário ou senha inválidos');
    }
  };

  const handleToggleMode = () => {
    setUsername('');
    setPassword('');
    setIsRegisterMode(!isRegisterMode);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">{isRegisterMode ? 'Cadastro' : 'Login'}</h1>
      <form className="login-form" onSubmit={handleLogin}>
        {isRegisterMode && (
          <input
            type="text"
            placeholder="Nome completo"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
