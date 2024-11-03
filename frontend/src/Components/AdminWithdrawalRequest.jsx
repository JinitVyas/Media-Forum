import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';

const AdminWithdrawalRequest = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/withdrawal-requests');
                const pendingRequests = response.data.filter(request => request.status === 'pending');
                setRequests(Array.isArray(pendingRequests) ? pendingRequests : []);
            } catch (error) {
                console.error('Error fetching withdrawal requests:', error);
            }
        };
    
        fetchRequests();
    }, []);
    

    const handleApprove = async (requestId) => {
        try {
            const token = localStorage.getItem('authToken'); // Get the token from localStorage
            const response = await axios.post('http://localhost:3001/api/withdraw', {
                requestId: requestId // Data to send in the body
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Set the authorization header
                }
            });
    
            if (response.data.success) {
                alert(`Approved request for ${requestId}`);
                setRequests((prev) => prev.filter((request) => request._id !== requestId));
            } else {
                alert(response.data.message); // Show error message from the response
            }
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };
    
    
    const handleReject = async (requestId) => {
        try {
            await axios.post('http://localhost:3001/api/rejectWithdrawReq', { requestId });
            alert(`Rejected request for ${requestId}`);
            setRequests((prev) => prev.filter((request) => request._id !== requestId));
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };
    

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
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
                            <th className="border px-4 py-2 text-left">Request Date</th>
                            <th className="border px-4 py-2 text-left sticky right-0 bg-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((request) => (
                                <tr key={request._id} className="border-b">
                                    <td className="border px-4 py-2">{request.userDetails.accountUsername}</td>
                                    <td className="border px-4 py-2">{request.userDetails.firstName}</td>
                                    <td className="border px-4 py-2">{request.userDetails?.email}</td>
                                    <td className="border px-4 py-2">{request.amount}</td>
                                    <td className="border px-4 py-2">
                                        <img
                                            src={`../../uploads/${request.userDetails.bankPassbook}`}
                                            alt="Bank Passbook"
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="border px-4 py-2">{formatDate(request.createdAt)}</td>
                                    <td className="px-4 pt-6 bg-white flex items-center justify-center">
                                        <button
                                            onClick={() => handleApprove(request._id)}
                                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2 flex items-center"
                                        >
                                            <FaCheckCircle className="mr-1" /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(request._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center"
                                        >
                                            <FaTimesCircle className="mr-1" /> Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No withdrawal requests available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminWithdrawalRequest;
