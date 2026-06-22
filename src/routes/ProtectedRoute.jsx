import { Navigate } from 'react-router-dom';

import { useAppContext } from '../context/AppContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoadingAuth } = useAppContext();

  if (isLoadingAuth) {
    return (
      <main className="app-shell">
        <section className="hero">
          <p className="eyebrow">Authentification</p>
          <h1>Verification de la session...</h1>
        </section>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}