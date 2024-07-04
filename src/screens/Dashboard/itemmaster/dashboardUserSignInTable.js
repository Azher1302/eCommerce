import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DashboardUserSignInTable.css'; // Import your custom CSS file
import { useNavigate } from 'react-router-dom';

const DashboardUserSignInTable = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
      const tokenadmin = localStorage.getItem('tokenadmin');
      if (!tokenadmin) {
          navigate('/AdminLogin');
      }
  }, [navigate]);

  const [userSignInData, setUserSignInData] = useState([]);

  useEffect(() => {
    // Retrieve user sign-in data from local storage
    const storedUserData = JSON.parse(localStorage.getItem('signinuserdata')) || [];
    setUserSignInData(storedUserData);
  }, []);

  const handleBlock = (index) => {
    const updatedUsers = userSignInData.map((user, i) => {
      if (i === index) {
        return { ...user, blocked: true };
      }
      return user;
    });
    setUserSignInData(updatedUsers);
    localStorage.setItem('signinuserdata', JSON.stringify(updatedUsers)); // Update local storage
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
    localStorage.setItem('signinuserdata', JSON.stringify(updatedUsers)); // Update local storage
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
              <th className="py-3 px-6 text-left">Password</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {userSignInData.map((user, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.password}</td>
                <td className="py-3 px-6">{user.phoneNumber}</td>
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
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardUserSignInTable;
