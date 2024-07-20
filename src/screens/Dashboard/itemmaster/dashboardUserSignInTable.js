import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DashboardUserSignInTable.css'; // Import your custom CSS file
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../../Config/config';

const DashboardUserSignInTable = () => {
  const navigate = useNavigate();
  const [userSignInData, setUserSignInData] = useState([]);

  useEffect(() => {
    const tokenadmin = localStorage.getItem('tokenadmin');
    if (!tokenadmin) {
      navigate('/AdminLogin');
    } else {
      fetchUserSignInData(tokenadmin);
    }
  }, [navigate]);

  const fetchUserSignInData = async (token) => {
    try {
      const response = await fetch(`${BaseUrl}api/User/GetSignUpUsers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }

      const data = await response.json();
      const updatedData = data.map((item, index) => ({ ...item, SequentialId: index + 1 }));
      setUserSignInData(updatedData);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to fetch items');
    }
  };

  const handleBlock = (index) => {
    const updatedUsers = userSignInData.map((user, i) => {
      if (i === index) {
        return { ...user, blocked: true };
      }
      return user;
    });
    setUserSignInData(updatedUsers);
    toast.success('User blocked successfully');
  };

  const handleUnblock = (index) => {
    const updatedUsers = userSignInData.map((user, i) => {
      if (i === index) {
        return { ...user, blocked: false };
      }
      return user;
    });
    setUserSignInData(updatedUsers);
    toast.success('User unblocked successfully');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Sign-In Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">User Type</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {userSignInData.length > 0 ? (
              userSignInData.map((user, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-6">{user.Name}</td>
                  <td className="py-3 px-6">{user.Email}</td>
                  <td className="py-3 px-6">{user.UserTypeName}</td>
                  <td className="py-3 px-6">{user.Mobile}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {user.blocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    {user.blocked ? (
                      <button
                        onClick={() => handleUnblock(index)}
                        className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md transition duration-300"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlock(index)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md transition duration-300"
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center text-gray-500">No user data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardUserSignInTable;
