import { useState } from 'react';
import axios from 'axios';
import './Inicio.css';
import desesperadoImg from './desesperado.jpg';

function Inicio() {
  const [desculpa, setDesculpa] = useState("Clique no botão para gerar uma desculpa!");
  const [carregando, setCarregando] = useState(false);

  const buscarDesculpa = async () => {
    setCarregando(true);
    const resposta = await axios.get('http://localhost:8000/api/desculpas.php?random=true');
    if (resposta.data && resposta.data.frase) {
      setDesculpa(resposta.data.frase);
    } else {
      setDesculpa("Erro: " + (resposta.data.erro || "Desconhecido"));
    }
    setCarregando(false);
  };

  return (
    <div className="inicio-wrapper">
      <img src={desesperadoImg} alt="Pessoa desesperada" className="inicio-img" />
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
