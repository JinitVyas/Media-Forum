import { Navigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('authToken');
  const location = useLocation();

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    // Decode the token to get the payload
    const decodedToken = jwtDecode(token);

    // Check if the token has expired (optional)
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('authToken'); // Remove expired token
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check for admin role if `adminOnly` is set to true
    if (adminOnly && decodedToken.role !== 'admin') {
      return <Navigate to="/accountPage" replace />;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the checks pass, allow access to the route
  return children;
};

export default ProtectedRoute;
