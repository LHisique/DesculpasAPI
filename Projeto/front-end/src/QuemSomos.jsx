import React from 'react';
import './QuemSomos.css';

function QuemSomos() {
  return (
    <div className="quem-somos-container">
      <h2 className="quem-somos-title">Quem Somos</h2>
      
      <div className="quem-somos-banner">
        <p className="quem-somos-banner-text">
          Olá! 👋 Construí este Gerador de Desculpas para o meu projeto final (avaliação B2). 
          A ideia foi colocar a mão na massa e juntar tudo o que aprendemos: React no visual e PHP com Banco de Dados nos bastidores. Espero que você goste do resultado!
        </p>
      </div>

      <div className="quem-somos-author-section">
        <h3 className="quem-somos-subtitle">Desenvolvido por:</h3>
        
        <div className="quem-somos-author-card">
          <div className="quem-somos-avatar">
            A
          </div>
          <div>
            <p className="quem-somos-author-name">[SEU NOME AQUI]</p>
            <p className="quem-somos-author-ra">RA: [SEU RA AQUI]</p>
          </div>
        </div>
        
        <p className="quem-somos-note">
          * Não esqueça de trocar seu nome e RA ali em cima no código antes de entregar, hein! 😉
        </p>
      </div>
    </div>
  );
}

export default QuemSomos;
