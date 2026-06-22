import logo from '../public/images/Logo.png';
import './footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer-copy">©Sportsee &nbsp; Tous droits réservés</p>
            <div className="footer-right">
                <a href="#">Conditions générales</a>
                <a href="#">Contact</a>
                <img src={logo} alt="SportSee" className="footer-logo" />
            </div>
        </footer>
    );
}