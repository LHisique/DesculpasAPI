import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Cadastro.css';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const navegar = useNavigate();

  const lidarComCadastro = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/cadastro.php', { nome, login, senha }).then((res) => {
      if (res.data && res.data.erro) {
        alert(res.data.erro);
      } else {
        alert("Cadastro realizado!");
        navegar('/login');
      }
    });
  };

  return (
    <div className="cadastro-wrapper">
      <div className="cadastro-container">
        <h2 className="cadastro-title">Criar Nova Conta</h2>
        
        <form onSubmit={lidarComCadastro}>
          <div className="cadastro-form-group">
            <label className="cadastro-label">Nome Completo</label>
            <input 
              type="text" 
              onChange={(e) => setNome(e.target.value)}
              className="cadastro-input"
              required
            />
          </div>
          <div className="cadastro-form-group">
            <label className="cadastro-label">Login</label>
            <input 
              type="text" 
              onChange={(e) => setLogin(e.target.value)}
              className="cadastro-input"
              required
            />
          </div>
          <div className="cadastro-form-group-last">
            <label className="cadastro-label">Senha</label>
            <input 
              type="password" 
              onChange={(e) => setSenha(e.target.value)}
              className="cadastro-input"
              required
            />
          </div>
          <button type="submit" className="cadastro-button">
            Cadastrar
          </button>
        </form>
        
        <div className="cadastro-footer">
          <Link to="/login" className="cadastro-link">
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
