import './App.css'
import RegisterPage from './Screens/RegisterPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Screens/HomePage';
import AdminPage from './Screens/AdminPage';
import LoginPage from './Screens/LoginPage';
import ForgotePassword from './Screens/ForgotPassword';
import AccountPage from './Screens/AccountPage';
import PlanPage from './Screens/PlanPage';
import LegalDocumentPage from './Screens/LegalDocumentPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotPassword" element={<ForgotePassword />} />
          <Route path="/accountPage" element={<AccountPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/legalDocument" element={<LegalDocumentPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
