import { useState, useEffect } from 'react';
import axios from 'axios';
import './TodasDesculpas.css';

function TodasDesculpas() {
  const [desculpas, setDesculpas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarTodasDesculpas = async () => {
      const resposta = await axios.get('http://localhost:8000/api/desculpas.php');
      setDesculpas(Array.isArray(resposta.data) ? resposta.data : []);
      setCarregando(false);
    };
    buscarTodasDesculpas();
  }, []);

  return (
    <div className="todas-wrapper">
      <h2 className="todas-title">Catálogo de Desculpas</h2>
      <p className="todas-description">Navegue por todas as desculpas registradas em nosso banco de dados.</p>
      
      {carregando ? (
        <p className="todas-loading">Carregando desculpas...</p>
      ) : (
        <div className="todas-grid">
          {desculpas.map(d => (
            <div key={d.id} className="todas-card">
              <span className="todas-card-id">#{d.id}</span>
              <span className="todas-card-text">{d.frase}</span>
            </div>
          ))}
          {desculpas.length === 0 && (
            <p className="todas-empty">Nenhuma desculpa encontrada.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TodasDesculpas;
