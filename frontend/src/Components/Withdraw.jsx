import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';

const Withdraw = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [message, setMessage] = useState('');

  // Fetching total earnings and current balance from the database (dummy values used here)
  useEffect(() => {
    const fetchData = async () => {
      // Replace with your actual API calls
      const earnings = await fetch('/api/earnings'); // Endpoint for total earnings
      const balance = await fetch('/api/balance'); // Endpoint for current balance
      setTotalEarnings(await earnings.json());
      setCurrentBalance(await balance.json());
    };

    fetchData();
  }, []);

  const handleWithdraw = () => {
    if (parseFloat(withdrawAmount) > currentBalance) {
      setMessage('Withdrawal amount exceeds current balance.');
    } else {
      setMessage('Withdrawal successful!'); // Implement actual withdrawal logic here
      // Reset the input field
      setWithdrawAmount('');
    }
  };

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
