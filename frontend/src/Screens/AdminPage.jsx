import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from '../Components/AdminNavbar';
import AdminUsers from '../Components/AdminUsers';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users'); // Ensure this is the correct URL
        console.log('Fetched Users:', response.data); // Log the fetched data
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error); // Log the error if it occurs
      }
    };

    fetchUsers(); // Call the function to fetch data
  }, []);


  return (
    <div className={` min-h-screen`}>
      {/* Navbar */}
      <AdminNavbar />

      <Routes>
        {/* Redirect from /admin to /admin/users */}
        <Route path="/" element={<Navigate to="users" />} />
        
        {/* Pass users as a prop to AdminUsers */}
        <Route path="users" element={<AdminUsers users={users} />} />
      </Routes>
    </div>
  );
};

export default AdminPage;