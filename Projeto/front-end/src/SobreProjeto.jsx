
import './SobreProjeto.css';

function SobreProjeto() {
  return (
    <div className="sobre-projeto-caixa">
      <h2 className="sobre-projeto-titulo">Sobre o Projeto</h2>
      
      <div className="sobre-projeto-conteudo">
        <p className="sobre-projeto-paragrafo">
          O <strong>Sistema de Desculpas</strong> 
        </p>
        
        <h3 className="sobre-projeto-subtitulo">Tecnologias Utilizadas</h3>
        <ul className="sobre-projeto-lista">
          <li><strong>Front-end:</strong> React, CSS, Axios para consumo de API.</li>
          <li><strong>Back-end:</strong> PHP Orientado a Objetos.</li>
          <li><strong>Banco de Dados:</strong> MySQL (xammp) relacional, organizando Usuários e Desculpas de forma independente.</li>
        </ul>

        <h3 className="sobre-projeto-subtitulo">Como o sistema funciona</h3>
        <p className="sobre-projeto-paragrafo">
          O sistema separa claramente as responsabilidades. O Front-end atua apenas na interface, enquanto o Back-end fornece endpoints em formato JSON (eu mesmo fiz a api).
        </p>
      </div>
    </div>
  );
}

export default SobreProjeto;
