import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { FaUser, FaLock } from 'react-icons/fa'; // Icons for User and Password
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Eye icons
import { Link } from 'react-router-dom';
import '../app.css';

const Login = ({ prop }) => {
  const [email, setEmail] = useState(''); // Changed state from username to email
  const [password, setPassword] = useState(''); // State for password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState(''); // State to display login errors
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate(); // React Router navigation hook

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle login
  const handleLogin = async () => {
    setLoading(true);
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, // Sending email instead of username
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        navigate('/accountPage'); // Navigate to My Account page
      } else {
        // Display error message from backend
        setError(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      // Handle network errors or other issues
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Turn off the loading state
    }
  };

  // Handle key press for Enter key
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin(); // Call handleLogin on Enter key press
    }
  };

  return (
    <div className="flex items-center justify-center min-h-fit pt-20 pb-10">
      <div className="bg-white p-8 shadow-all rounded w-full max-w-md">
        <h1 className={`text-4xl ${prop ? prop.fontColor : ""} font-bold ${prop ? prop.textalign : 'text-center'} mb-10`}>
          LOGIN
        </h1>

        {/* Email Input */}
        <div className="flex items-center border border-gray-300 rounded mb-4 p-2">
          <FaUser className="text-gray-500 mr-3" />
          <input
            type="email" // Changed input type to email
            placeholder="Enter Email" // Updated placeholder to Enter Email
            className="w-full outline-none"
            value={email} // Set value to email
            onChange={(e) => setEmail(e.target.value)} // Update state for email
            onKeyPress={handleKeyPress} // Handle Enter key press
            disabled={loading} // Disable inputs while loading
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center border border-gray-300 rounded mb-4 p-2">
          <FaLock className="text-gray-500 mr-3" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            className="w-full outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress} // Handle Enter key press
            disabled={loading} // Disable inputs while loading
          />
          <button onClick={togglePasswordVisibility} className="focus:outline-none">
            {showPassword ? (
              <AiFillEye className="text-gray-500" />
            ) : (
              <AiFillEyeInvisible className="text-gray-500" />
            )}
          </button>
        </div>

        {/* Display Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Forgot Password Link */}
        <div className="text-right mb-4">
          <Link to="/forgotPassword" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className={`w-full bg-blue-500 text-white text-lg py-2 rounded hover:bg-blue-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
