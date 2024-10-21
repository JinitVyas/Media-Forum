import React, { useState } from 'react';
import { FaHome, FaUser, FaDollarSign, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MyAccountSideBar = () => {
    const [isMarketingOpen, setMarketingOpen] = useState(false);
    const [isReportsOpen, setReportsOpen] = useState(false);

    const toggleMarketing = () => setMarketingOpen(!isMarketingOpen);
    const toggleReports = () => setReportsOpen(!isReportsOpen);

    return (
        <div className="w-80 h-full bg-[#1f2937] text-white p-4">
            {/* Sidebar content here */}
            <h1 className="text-lg font-bold">Dashboard</h1>
            {/* Other sidebar items */}
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <FaHome className="mr-2" />
                <span>Dashboard</span>
            </div>
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <FaUser className="mr-2" />
                <span>Profile</span>
            </div>
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <span>Edit Your Account</span>
            </div>
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <span>Change Your Password</span>
            </div>
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <FaDollarSign className="mr-2" />
                <span>Payout Details</span>
            </div>

            {/* Marketing Dropdown */}
            <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-500 cursor-pointer" onClick={toggleMarketing}>
                <span>Marketing</span>
                {isMarketingOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isMarketingOpen && (
                <div className="pl-6">
                    <div className="py-1 hover:bg-blue-500 cursor-pointer">Link 1</div>
                    <div className="py-1 hover:bg-blue-500 cursor-pointer">Link 2</div>
                    <div className="py-1 hover:bg-blue-500 cursor-pointer">Link 3</div>
                </div>
            )}

            {/* Payments */}
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
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
                <span>LogOut</span>
            </div>
        </div>
    );
};

export default MyAccountSideBar;
