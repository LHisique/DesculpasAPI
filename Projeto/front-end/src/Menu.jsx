
import { Link, useLocation } from 'react-router-dom';
import './Menu.css';

function Menu({ onLogout, userName }) {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const linkClass = (path) => isActive(path) ? 'menu-link-active' : 'menu-link-inactive';

  return (
    <nav className="menu-navbar">
      <div className="menu-container">
        <div className="menu-wrapper">
          <div className="menu-lado-esquerdo">
            <div className="menu-logo-container">
              <span className="menu-logo">DesculpasApp</span>
            </div>
            <div className="menu-links-container">
              <div className="menu-links">
                <Link to="/" className={linkClass('/')}>Início</Link>
                <Link to="/todas" className={linkClass('/todas')}>Ver Todas as Desculpas</Link>
                <Link to="/crud" className={linkClass('/crud')}>Gerenciar Desculpas</Link>
                <Link to="/sobre-mim" className={linkClass('/sobre-mim')}>Sobre Mim</Link>
                <Link to="/sobre-projeto" className={linkClass('/sobre-projeto')}>Sobre o Projeto</Link>
              </div>
            </div>
          </div>
          <div className="menu-lado-direito">
            <div className="menu-user-info">
              <span className="menu-greeting">Olá, {userName}! 👋</span>
              <button onClick={onLogout} className="menu-logout-btn">
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
