import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppContext } from '../context/AppContext';
import Dashboard from '../pages/Dashboard';
import Error from '../pages/Error';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import AppLayout from '../layout/AppLayout';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  const { isAuthenticated } = useAppContext();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
      />
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}