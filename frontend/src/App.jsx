import './App.css';
import RegisterPage from './Screens/RegisterPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Screens/HomePage';
import AdminPage from './Screens/AdminPage';
import LoginPage from './Screens/LoginPage';
import ForgotPassword from './Screens/ForgotPassword';
import AccountPage from './Screens/AccountPage';
import PlanPage from './Screens/PlanPage';
import LegalDocumentPage from './Screens/LegalDocumentPage';
import NotFound from './components/NotFound';
import UploadImage from './Components/UploadImage';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/image" element={<UploadImage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/legalDocument"
          element={
              <LegalDocumentPage />
          }
        />
        
        {/* Protected Routes */}
        <Route
          path="/accountPage"
          element={
              <AccountPage />
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plan"
          element={
              <PlanPage />
          }
        />
        

        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
