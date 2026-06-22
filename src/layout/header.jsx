import { NavLink } from 'react-router-dom';
import logo from '../public/images/LogoLogin.png';
import './header.css';
import { useAppContext } from '../context/AppContext';

export default function Header() {
    const { logout } = useAppContext();

    return (
        <header className="navbar">
            <img src={logo} alt="SportSee Logo" className="navbar-logo" />
            <nav className="navbar-pill">
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'navbar-link navbar-link--active' : 'navbar-link'}>
                    Dashboard
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => isActive ? 'navbar-link navbar-link--active' : 'navbar-link'}>
                    Mon profil
                </NavLink>
                <span className="navbar-sep" />
                <button type="button" className="navbar-logout" onClick={logout}>
                    Se déconnecter
                </button>
            </nav>
        </header>
    );
}