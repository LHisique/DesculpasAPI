
import './QuemSomos.css';
import luisImg from './luis.jpg';

function QuemSomos() {
  return (
    <div className="quem-sou-caixa">
      <h2 className="quem-sou-titulo">Quem é esse cara lindo?!!</h2>
      
      <div className="quem-sou-mensagem">
        <p className="quem-sou-mensagem-texto">
          Montei esse site em inspiração ao meu lado introvertido e um pouco anti social, vou usar isso toda vez que for necessário. 
        </p>
      </div>

      <div className="quem-sou-bloco-autor">
        <h3 className="quem-sou-subtitulo">Desenvolvido por: Luís Isique</h3>
        
        <div className="quem-sou-cartao">
          <div className="quem-sou-foto">
            <img src={luisImg} alt="Luís Isique" />
          </div>
          <div>
            <p className="quem-sou-nome">Luís Isique</p>
            <p className="quem-sou-ra">RA: 221483</p>
          </div>
        </div>
        
        <p className="quem-sou-lembrete">
          
        </p>
      </div>
    </div>
  );
}

export default QuemSomos;
