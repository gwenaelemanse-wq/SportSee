import { Link } from 'react-router-dom';

export default function Error() {
	return (
		<main className="app-shell">
			<section className="hero">
				<p className="eyebrow">404</p>
				<h1>Page introuvable</h1>
				<p className="lead">La route demandee n'existe pas dans l'application.</p>
				<Link to="/login">Retour a la connexion</Link>
			</section>
		</main>
	);
}
