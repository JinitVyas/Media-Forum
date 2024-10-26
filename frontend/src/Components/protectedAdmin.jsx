import { Navigate, useLocation } from 'react-router-dom';

// ProtectedRoute checks if the user has a valid token before granting access to a route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userEmail'); // Check for token in localStorage
  const location = useLocation();

  // Redirect to login if not authenticated and trying to access protected routes
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If token exists, allow access to the protected route
  return children;
};

export default ProtectedRoute;