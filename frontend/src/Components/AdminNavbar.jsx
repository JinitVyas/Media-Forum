import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Admin Panel Heading on the left */}
      <h1 className="text-2xl text-white font-bold">Admin Panel</h1>
      
      {/* Links on the right */}
      <div className="flex space-x-6">
        {[
          { label: "Users", path: "users" },
          { label: "Pending Registration", path: "pendingRegistration" },
          { label: "Withdrawal Requests", path: "withdrawalRequests" },
          { label: "Change Password", path: "changePassword" },
        ].map(({ label, path }, index) => (
          <Link 
            key={index} 
            to={`/admin/${path}`} 
            className={`font-me text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavbar;