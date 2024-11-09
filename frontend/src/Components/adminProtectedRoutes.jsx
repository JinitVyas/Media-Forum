import { Navigate, useLocation } from 'react-router-dom';

// ProtectedRoute checks if the user has a valid token before granting access to a route
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken'); // Check for auth token in localStorage
    const location = useLocation();

    // Redirect to login if not authenticated and trying to access protected routes
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

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

    // If token exists, allow access to the protected route
    return children;
};

export default ProtectedRoute;