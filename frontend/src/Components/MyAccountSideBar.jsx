import { useState } from 'react';
import { FaHome, FaUser, FaDollarSign, FaLock, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MyAccountSideBar = () => {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isMarketingOpen, setMarketingOpen] = useState(false);
    const [isReportsOpen, setReportsOpen] = useState(false);

    const toggleProfile = () => setProfileOpen(!isProfileOpen);
    const toggleMarketing = () => setMarketingOpen(!isMarketingOpen);
    const toggleReports = () => setReportsOpen(!isReportsOpen);

    return (
        <div className="w-80 h-full bg-[#1f2937] text-white p-4">
            {/* Dashboard */}
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <FaHome className="mr-2" />
                <span>Dashboard</span>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-500 cursor-pointer" onClick={toggleProfile}>
                <span>Profile</span>
                {isProfileOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isProfileOpen && (
                <div className="pl-6">
                    <div className="py-1 hover:bg-blue-500 cursor-pointer flex items-center">
                        <FaUser className="mr-2" />
                        <span>Edit Your Account</span>
                    </div>
                    <div className="py-1 hover:bg-blue-500 cursor-pointer flex items-center">
                        <FaLock className="mr-2" />
                        <span>Change Your Password</span>
                    </div>
                    <div className="py-1 hover:bg-blue-500 cursor-pointer flex items-center">
                        <FaDollarSign className="mr-2" />
                        <span>Payout Details</span>
                    </div>
                </div>
            )}

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

            {/* Payments */}
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <FaDollarSign className="mr-2" />
                <span>Payments</span>
            </div>

            {/* Reports Dropdown */}
            <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-500 cursor-pointer" onClick={toggleReports}>
                <span>Reports</span>
                {isReportsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isReportsOpen && (
                <div className="pl-6">
                    <div className="py-1 hover:bg-blue-500 cursor-pointer">Reports</div>
                    <div className="py-1 hover:bg-blue-500 cursor-pointer">My Team</div>
                </div>
            )}

            {/* Log Out */}
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <span>Log Out</span>
            </div>
        </div>
    );
};

export default MyAccountSideBar;
