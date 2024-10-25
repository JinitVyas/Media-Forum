import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import MyAccountProfile from '../Components/MyAccountProfile';
import MyAccountSideBar from '../Components/MyAccountSideBar';
import GoToTopButton from '../Components/GoToTopButton';
import IntroBanner from '../Components/IntroBanner';
import Dashboard from '../Components/Dashboard';
import Withdraw from '../Components/Withdraw';
import ChangePassword from '../Components/ChangePassword';

const AccountPage = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard'); // State to track active component

  const renderComponent = () => {
    switch (activeComponent) {
      case 'withdraw':
        return <Withdraw />;
      case 'changePassword':
        return <ChangePassword />;
      case 'team':
        return <div>My Team Component</div>; // Replace with your actual component
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <IntroBanner />
      <Navbar />
      <div className="flex flex-grow">
        <MyAccountSideBar setActiveComponent={setActiveComponent} />
        {renderComponent()} {/* Render the active component */}
      </div>
      <GoToTopButton />
      <Footer />
    </div>
  );
};

export default AccountPage;
