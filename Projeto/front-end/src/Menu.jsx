import { Link, useLocation } from 'react-router-dom';
import './Menu.css';

export default function Menu({ aoSair, nomeUsuario }) {
  const { pathname } = useLocation();
  const links = [
    { path: '/', label: 'Início' },
    { path: '/todas', label: 'Ver Todas as Desculpas' },
    { path: '/crud', label: 'Gerenciar Desculpas' },
    { path: '/sobre-mim', label: 'Sobre Mim' },
    { path: '/sobre-projeto', label: 'Sobre o Projeto' }
  ];

  return (
    <nav className="menu-navbar">
      <div className="menu-container">
        <div className="menu-wrapper">
          <div className="menu-lado-esquerdo">
            <span className="menu-logo">DesculpasAPI</span>
            <div className="menu-links-container">
              <div className="menu-links">
                {links.map(l => (
                  <Link key={l.path} to={l.path} className={pathname === l.path ? 'menu-link-active' : 'menu-link-inactive'}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="menu-lado-direito">
            <div className="menu-user-info">
              <span className="menu-greeting">Olá, {nomeUsuario}! 👋</span>
              <button onClick={aoSair} className="menu-logout-btn">Sair</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
