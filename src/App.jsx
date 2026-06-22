import { useEffect, useState } from 'react';

import { AppProvider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';
import {
  clearSession,
  getStoredUserId,
  loginUser,
  restoreSession,
  saveSession,
} from './services/authService';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [userId, setUserId] = useState(() => getStoredUserId());

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      const session = await restoreSession();

      if (!isMounted) {
        return;
      }

      if (session.isAuthenticated) {
        setIsAuthenticated(true);
        setUserId(session.userId ?? getStoredUserId());
      } else {
        setIsAuthenticated(false);
        setUserId(null);
      }

      setIsLoadingAuth(false);
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (credentials) => {
    const session = await loginUser(credentials);

    saveSession(session.token, session.userId);
    setIsAuthenticated(true);
    setUserId(session.userId);

    return session;
  };

  const handleLogout = () => {
    clearSession();
    setIsAuthenticated(false);
    setUserId(null);
  };

  const appState = {
    isAuthenticated,
    isLoadingAuth,
    userId,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AppProvider value={appState}>
      <AppRoutes />
    </AppProvider>
  );
}