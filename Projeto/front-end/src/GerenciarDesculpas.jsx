import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GerenciarDesculpas.css';

function GerenciarDesculpas() {
  const [desculpas, setDesculpas] = useState([]);
  const [novaFrase, setNovaFrase] = useState('');
  const [editando, setEditando] = useState(null);

  const API_URL = 'http://localhost:8000/api/desculpas.php';

  const carregarDesculpas = async () => {
    try {
      // Carrega a lista completa de desculpas do banco de dados
      const res = await axios.get(API_URL);
      setDesculpas(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    carregarDesculpas();
  }, []);

  const salvar = async (e) => {
    e.preventDefault();
    try {
      // Verifica se o usuário está editando uma desculpa (PUT) ou criando uma nova (POST)
      if (editando) {
        await axios.put(API_URL, { id: editando.id, frase: novaFrase });
      } else {
        await axios.post(API_URL, { frase: novaFrase });
      }
      setNovaFrase('');
      setEditando(null);
      carregarDesculpas();
    } catch (err) {
      alert("Erro ao salvar.");
    }
  };

  const editar = (desculpa) => {
    setEditando(desculpa);
    setNovaFrase(desculpa.frase);
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setNovaFrase('');
  };

  const apagar = async (id) => {
    // Pede confirmação antes de deletar o registro para evitar acidentes
    if (window.confirm("Deseja realmente apagar esta desculpa?")) {
      try {
        await axios.delete(`${API_URL}?id=${id}`);
        carregarDesculpas();
      } catch (err) {
        alert("Erro ao apagar.");
      }
    }
  };

  return (
    <div className="gerenciar-wrapper">
      <h2 className="gerenciar-title">Gerenciar Desculpas</h2>
      
      <form onSubmit={salvar} className="gerenciar-form">
        <input 
          type="text" 
          value={novaFrase}
          onChange={(e) => setNovaFrase(e.target.value)}
          placeholder="Digite a nova desculpa..."
          className="gerenciar-input"
          required
        />
        <button type="submit" className="gerenciar-btn-salvar">
          {editando ? 'Atualizar' : 'Adicionar'}
        </button>
        {editando && (
          <button type="button" onClick={cancelarEdicao} className="gerenciar-btn-cancelar">
            Cancelar
          </button>
        )}
      </form>

      <div className="gerenciar-table-container">
        <table className="gerenciar-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Frase</th>
              <th className="center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {desculpas.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.frase}</td>
                <td className="center">
                  <button onClick={() => editar(d)} className="gerenciar-btn-editar">Editar</button>
                  <button onClick={() => apagar(d.id)} className="gerenciar-btn-apagar">Apagar</button>
                </td>
              </tr>
            ))}
            {desculpas.length === 0 && (
              <tr>
                <td colSpan="3" className="empty">Nenhuma desculpa cadastrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GerenciarDesculpas;
