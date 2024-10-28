import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios'; // Make sure to install axios with `npm install axios`

const AdminWithdrawalRequest = () => {
    const [requests, setRequests] = useState([]);

    // Fetch withdrawal requests from the API
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/withdrawal-requests'); // Update with your API endpoint
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching withdrawal requests:', error);
            }
        };

        fetchRequests();
    }, []);

    // Approve a withdrawal request
    const handleApprove = async (requestId) => {
        try {
            await axios.post(`/api/withdrawal-requests/approve/${requestId}`); // Update with your API endpoint
            alert(`Approved request for ${requestId}`);
            // Optionally, refresh the requests after approval
            setRequests((prev) => prev.filter((request) => request.id !== requestId));
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    // Reject a withdrawal request
    const handleReject = async (requestId) => {
        try {
            await axios.post(`/api/withdrawal-requests/reject/${requestId}`); // Update with your API endpoint
            alert(`Rejected request for ${requestId}`);
            // Optionally, refresh the requests after rejection
            setRequests((prev) => prev.filter((request) => request.id !== requestId));
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Withdrawal Requests</h1>
            <div className="bg-white shadow-md overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2 text-left">Username</th>
                            <th className="border px-4 py-2 text-left">Name</th>
                            <th className="border px-4 py-2 text-left">Email</th>
                            <th className="border px-4 py-2 text-left">Withdraw Amount</th>
                            <th className="border px-4 py-2 text-left">Bank Passbook</th>
                            <th className="border px-4 py-2 text-left sticky right-0 bg-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id} className="border-b">
                                <td className="border px-4 py-2">{request.username}</td>
                                <td className="border px-4 py-2">{request.name}</td>
                                <td className="border px-4 py-2">{request.email}</td>
                                <td className="border px-4 py-2">{request.withdrawAmount}</td>
                                <td className="border px-4 py-2">
                                    <img
                                        src={request.passbookPhoto}
                                        alt="Bank Passbook"
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="px-4 pt-6 bg-white flex items-center justify-center">
                                    <button
                                        onClick={() => handleApprove(request.id)}
                                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2 flex items-center"
                                    >
                                        <FaCheckCircle className="mr-1" /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(request.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center"
                                    >
                                        <FaTimesCircle className="mr-1" /> Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminWithdrawalRequest;
