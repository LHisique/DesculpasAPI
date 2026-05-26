import React, { useState } from 'react';
import axios from 'axios';
import './Inicio.css';

function Inicio() {
  const [desculpa, setDesculpa] = useState("Clique no botão para gerar uma desculpa!");
  const [carregando, setCarregando] = useState(false);

  const buscarDesculpa = async () => {
    setCarregando(true);
    try {
      // Busca uma desculpa aleatória diretamente da nossa API PHP
      const resposta = await axios.get('http://localhost:8000/api/desculpas.php?random=true');
      if (resposta.data && resposta.data.frase) {
        setDesculpa(resposta.data.frase);
      } else {
        setDesculpa("Erro: " + (resposta.data.erro || "Desconhecido"));
      }
    } catch (erro) {
      setDesculpa("Erro ao conectar na API.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="inicio-wrapper">
      <h1 className="inicio-title">Gerador de Desculpas</h1>
      <p className="inicio-desculpa-box">
        "{desculpa}"
      </p>
      <button 
        onClick={buscarDesculpa}
        disabled={carregando}
        className="inicio-button"
      >
        {carregando ? "Gerando..." : "Gerar Nova Desculpa"}
      </button>
    </div>
  );
}

export default Inicio;
