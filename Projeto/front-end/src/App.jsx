import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './Menu';
import Login from './Login';
import Inicio from './Inicio';
import GerenciarDesculpas from './GerenciarDesculpas';
import QuemSomos from './QuemSomos';
import TodasDesculpas from './TodasDesculpas';
import SobreProjeto from './SobreProjeto';
import Cadastro from './Cadastro';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Verifica se o usuário já estava logado na sessão anterior
    const usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    }
  }, []);

  const lidarComLogin = (dadosUsuario) => {
    setUsuario(dadosUsuario);
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
  };

  const lidarComSair = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  // Se não estiver logado, mostra apenas as telas de Login e Cadastro
  if (!usuario) {
    return (
      <Router>
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="*" element={<Login aoLogar={lidarComLogin} />} />
        </Routes>
      </Router>
    );
  }

  // Se estiver logado, mostra o Menu e as outras telas
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Menu aoSair={lidarComSair} nomeUsuario={usuario.nome} />
        
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/todas" element={<TodasDesculpas />} />
            <Route path="/crud" element={<GerenciarDesculpas />} />
            <Route path="/sobre-mim" element={<QuemSomos />} />
            <Route path="/sobre-projeto" element={<SobreProjeto />} />
            <Route path="*" element={<Inicio />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
