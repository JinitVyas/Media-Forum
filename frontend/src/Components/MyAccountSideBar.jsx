import { useState } from 'react';
import { FaHome, FaDollarSign, FaChevronDown, FaChevronUp, FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import Withdraw from './Withdraw'; 

const MyAccountSideBar = ({setActiveComponent }) => {
    const [isMarketingOpen, setMarketingOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const toggleMarketing = () => setMarketingOpen(!isMarketingOpen);

    // Handle Logout Function
    // Handle Logout Function
    const handleLogout = () => {
        setLoading(true);
        setError('');

        try {
            // Remove 'userEmail' and any other necessary local storage items
            localStorage.removeItem('userEmail'); // Remove userEmail
            localStorage.removeItem('token');     // Remove token if needed

            // Redirect to login page
            navigate('/login');
        } catch (error) {
            setError('Error logging out. Please try again.');
            console.error('Error logging out:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-80 h-full bg-[#1f2937] text-white p-4">
            {/* Dashboard */}
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center" onClick={() => setActiveComponent('dashboard')}>
                <FaHome className="mr-2" />
                <span>Dashboard</span>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-500 cursor-pointer" onClick={() => setActiveComponent('changePassword')}>
                <span>Change Password</span>
            </div>

            {/* Marketing Dropdown */}
            <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-500 cursor-pointer" onClick={toggleMarketing}>
                <span>Marketing</span>
                {isMarketingOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isMarketingOpen && (
                <div className="pl-6">
                    <div className="py-1 hover:bg-blue-500 cursor-pointer">Links</div>
                </div>
            )}

            {/* Withdraw Button */}
            <div
                className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center"
                onClick={() => setActiveComponent('withdraw')}
            >
                <FaRupeeSign className="mr-2" />
                <span>Withdraw</span>
            </div>

            {/* Reports Dropdown */}
            <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-500 cursor-pointer" onClick={() => setActiveComponent('team')}>
                <span>My Team</span>
            </div>

            {/* Log Out */}
            <div
                className={`px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleLogout}
                disabled={loading}
            >
                <span>Log Out</span>
            </div>

            {/* Show error message if logout fails */}
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>
    );
};

export default MyAccountSideBar;
