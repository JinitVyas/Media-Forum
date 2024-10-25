import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests

const MyAccountProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail'); // Retrieve email from localStorage
    if (!email) {
      console.error('No email found in localStorage');
      return;
    }
    else{
      console.log(email);
    }

    const fetchUserData = async () => {
      console.log("yoo")
      try {
        // Make an API call to get user data by email
        const response = await axios.get(`http://localhost:3001/api/users_email?email=${email}`);
        // console.log(response.data)
        if (response.data) {
          setUserData(response.data); // Store user data in state
        } else {
          console.error('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // Show loading indicator until data is fetched
  }
  

  return (
    
    <div className="flex items-center justify-center bg-gray-100">
      
      <div className="bg-white shadow-lg p-6 w-full flex">
        {/* Left Side: Profile Picture and Name */}
        <div className="flex items-center">
          <img
            src="/Photos/Profile.jpeg" // Replace with the correct path for the profile image
            alt="Profile"
            className="rounded-full w-24 h-24 mr-6"
          />
          <div>
            <h1 className="text-[25px] font-bold text-gray-800 uppercase">{userData.firstName} {userData.lastName}</h1>
            <p className="text-gray-500 mt-1">Congratulations! Welcome to our family</p>
            <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              Member
            </span>
          </div>
        </div>

        {/* Right Side: Referrals, Earnings, and Rank Progress */}
        <div className="ml-auto flex flex-col justify-between">
          {/* Referrals and Earnings */}
          <div className="flex space-x-8">
            <div className="text-center">
              <h2 className="text-gray-600 font-semibold">Referrals</h2>
              <p className="text-2xl font-bold text-gray-800">83</p>
            </div>
            <div className="text-center">
              <h2 className="text-gray-600 font-semibold">Earnings</h2>
              <p className="text-2xl font-bold text-gray-800">12,640.00 INR</p>
            </div>
          </div>

          {/* Rank Progress Bar */}
          <div className="mt-4">
            <p className="text-gray-500 mb-2">Until Senior Sales Officer Rank...</p>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountProfile;
