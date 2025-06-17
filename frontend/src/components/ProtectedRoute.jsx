import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ token, childPage }) => {
  const location = useLocation();

  // Check if the current page is '/' or '/login' or '/register'
  const isPublicPage = ['/', '/login', '/register'].includes(location.pathname);
  if (token === null) {
    return <Navigate to="/" replace />;
  } else if (token && isPublicPage) {
    return <Navigate to="/dashboard" replace />;
  }
  return childPage;
};

export default ProtectedRoute;
