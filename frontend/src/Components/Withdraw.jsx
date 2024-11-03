import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import axios from 'axios';

const Withdraw = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(''); // New state for payment details
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem('authToken'); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/userdata', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        if (response.data) {
          setTotalEarnings(response.data.user.totalIncome);
          setCurrentBalance(response.data.user.currentBalance);
        } else {
          console.error('No user data found');
          setMessage('No user data found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authToken]);

  const handleWithdraw = async () => {
    if (!withdrawAmount) {
      setMessage('Please enter an amount.');
      return;
    }

    // if (!paymentDetails) {
    //   setMessage('Please provide payment details.');
    //   return;
    // }

    if (parseFloat(withdrawAmount) > currentBalance) {
      setMessage('Withdrawal amount exceeds current balance.');
      return;
    }

    try {
      setMessage('Processing withdrawal request...');
      const response = await axios.post(
        'http://localhost:3001/api/withdrawRequest',
        {
          amount: parseFloat(withdrawAmount),
          paymentDetails: paymentDetails // Include payment details
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      if (response.data.success === true) {
        setMessage('Withdrawal request submitted! Payment will be processed within 48 hours.');
        setWithdrawAmount('');
        setPaymentDetails(''); // Clear payment details
      } else {
        setMessage(response.data.message || 'Request failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      setMessage(error.response?.data?.message || 'An error occurred while processing your request.');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="w-1/4 mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Withdraw</h2>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Total Earnings:</span>
          <span className="text-xl font-semibold">{totalEarnings} INR</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Current Balance:</span>
          <span className="text-xl font-semibold">{currentBalance} INR</span>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="withdraw-amount" className="block text-gray-700 mb-2">
          Enter Withdrawal Amount:
        </label>
        <input
          type="number"
          id="withdraw-amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Amount"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="payment-details" className="block text-gray-700 mb-2">
          Payment Details:
        </label>
        <textarea
          id="payment-details"
          value={paymentDetails}
          onChange={(e) => setPaymentDetails(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Provide payment details (e.g., bank account or UPI)"
        />
      </div>

      <button
        onClick={handleWithdraw}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
      >
        <FaMoneyBillWave className="inline-block mr-2" />
        Withdraw
      </button>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default Withdraw;