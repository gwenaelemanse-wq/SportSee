import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './Login.css';
import logo from '../public/images/LogoLogin.png';
import photoLogin from '../public/images/PhotoLogin.png';

export default function Login() {
const { isAuthenticated, login } = useAppContext();
const navigate = useNavigate();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);

if (isAuthenticated) {
return <Navigate to="/dashboard" replace />;
}

const handleSubmit = async (event) => {
event.preventDefault();
setError('');
setIsSubmitting(true);
try {
await login({ username, password });
navigate('/dashboard', { replace: true });
} catch (loginError) {
setError(loginError.message);
} finally {
setIsSubmitting(false);
}
};

return (
<main className="login-page">
<section className="login-hero">
<div className="login-left">
<img src={logo} alt="SportSee Logo" className="login-logo" />
<div className="login-card">
<h1 className="login-tagline">Transformez<br />vos stats en résultats</h1>
<h2 className="login-subtitle">Se connecter</h2>
<form onSubmit={handleSubmit}>
<label className="login-label">Adresse email</label>
<input
className="login-input"
type="text"
value={username}
onChange={(e) => setUsername(e.target.value)}
placeholder="sophiemartin"
/>
<label className="login-label">Mot de passe</label>
<input
className="login-input"
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="••••••••"
/>
{error && <p className="login-error">{error}</p>}
<button className="login-btn" type="submit" disabled={isSubmitting}>
{isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
</button>
<a href="#" className="login-forgot">Mot de passe oublié ?</a>
</form>
</div>
</div>
<div className="login-right">
<img src={photoLogin} alt="Coureurs" className="login-photo" />
<div className="login-bubble">
Analysez vos performances en un clin d&apos;œil,<br />
suivez vos progrès et atteignez vos objectifs.
</div>
</div>
</section>
</main>
);
}