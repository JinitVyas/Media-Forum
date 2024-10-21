import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import MyAccountProfile from '../Components/MyAccountProfile';
import MyAccountSideBar from '../Components/MyAccountSideBar';
import MyAccountCard from '../Components/MyAccountCard';
import GoToTopButton from '../Components/GoToTopButton';
import IntroBanner from '../Components/IntroBanner';

const AccountPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <IntroBanner />
      <Navbar />
      <div className="flex flex-grow">
        {/* Sidebar with fixed width */}
        <MyAccountSideBar />

        {/* Main content section with flexible width */}
        <div className="flex-grow p-4">

          {/* Profile */}
          <h1 className="text-4xl font-bold text-gray-600 text-left mb-8">
            My Account
          </h1>
          <MyAccountProfile />

          <h1 className="text-4xl font-bold text-gray-600 text-left mt-10">
            Dashboard
          </h1>
          {/* Card Section */}
          <div className="mt-6">
            {/* First row with 4 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MyAccountCard
                number="83"
                title="Total Referrals"
                description="Rewards and commissions received by now"
                bgColor="bg-green-400"
              />
              <MyAccountCard
                number="67"
                title="Paid Referrals"
                description="Withdrawn number of referrals until now"
                bgColor="bg-yellow-400"
              />
              <MyAccountCard
                number="13"
                title="Unpaid Referrals"
                description="Which have not been withdrawn yet"
                bgColor="bg-red-400"
              />
              <MyAccountCard
                number="6"
                title="Total Payout Transactions"
                bgColor="bg-blue-400"
              />
            </div>

            {/* Second row with 2 columns */}
            <div className="flex flex-col md:flex-row md:space-x-2 mt-4">
              <MyAccountCard
                number="9,500.00INR"
                title="Withdrawn Earnings"
                description="Withdrawn earnings by now (total transactions)"
                bgColor="bg-gray-200"
                textColor="text-black"
              />
              <MyAccountCard
                number="3,140.00INR"
                title="Current Account Balance"
                bgColor="bg-gray-400"
              />
            </div>
          </div>
          
        </div>
      </div>
      <GoToTopButton />
      <Footer />
    </div>
  );
};

export default AccountPage;
