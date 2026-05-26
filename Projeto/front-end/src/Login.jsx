import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ aoLogar }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navegar = useNavigate();

  const lidarComLogin = async (e) => {
    e.preventDefault();
    try {
      // Envia os dados de acesso para o servidor validar
      const res = await axios.post('http://localhost:8000/api/login.php', {
        login,
        senha
      });

      if (res.data && res.data.status === 'success') {
        aoLogar({ nome: res.data.nome, login });
      } else {
        setErro(res.data.message || "Erro desconhecido");
      }
    } catch (err) {
      setErro("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Acesso ao Sistema</h2>
        
        {erro && (
          <div className="login-error">
            {erro}
          </div>
        )}

        <form onSubmit={lidarComLogin}>
          <div className="login-form-group">
            <label className="login-label">Login</label>
            <input 
              type="text" 
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="login-form-group-last">
            <label className="login-label">Senha</label>
            <input 
              type="password" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div>
            <button type="submit" className="login-button">
              Entrar
            </button>
          </div>
        </form>
        <div className="login-footer">
          <p>Login padrão: admin | Senha: 123456</p>
          <div style={{ marginTop: '0.5rem' }}>
            <Link to="/cadastro" className="login-link">
              Ainda não tem conta? Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
