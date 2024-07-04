import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserSecret, FaUser } from "react-icons/fa";
import { MdDashboard, MdFolderDelete } from "react-icons/md";
import { IoSettings, IoHome } from "react-icons/io5";
import axios from 'axios';
import { BaseUrl } from '../../Config/config';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loggedInUsers, setLoggedInUsers] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const token = localStorage.getItem('token') || '';
  const navigate = useNavigate();

  useEffect(() => {
    const tokenadmin = localStorage.getItem('tokenadmin');
    if (!tokenadmin) {
      navigate('/AdminLogin');
    }
  }, [navigate]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('totalUsers');
    if (storedUsers) {
      setTotalUsers(parseInt(storedUsers, 10));
    }

    const storedDeletedCount = localStorage.getItem('deletedCount');
    if (storedDeletedCount) {
      setDeletedCount(parseInt(storedDeletedCount, 10));
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchLoggedInUsers(token);
    }
  }, [token]);

  const fetchLoggedInUsers = async (token) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/User/GetUserDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('API Response:', response.data);
      // Adjust the following line based on the actual response structure
      setLoggedInUsers(response.data.loggedInUsers);
    } catch (error) {
      console.error('Error fetching logged-in user count:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white h-64 lg:h-screen w-full lg:w-64 flex flex-col justify-between">
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
          <ul className="space-y-2">
            <div className="flex items-center">
              <MdDashboard className="text-gray-400 mr-3 h-5 w-5" />
              <li>
                <NavLink exact to="/Home1" activeClassName="bg-gray-700 rounded" className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</NavLink>
              </li>
            </div>
            <div className='flex items-center'>
              <FaUser className='text-gray-400 mr-3 h-5 w-5' />
              <li>
                <NavLink to="/dashboardUserSignInTable" activeClassName="bg-gray-700 rounded" className="block py-2 px-4 hover:bg-gray-700 rounded">Users</NavLink>
              </li>
            </div>
            <div className='flex items-center'>
              <IoSettings className='text-gray-400 mr-3 h-5 w-5' />
              <li>
                <NavLink to="/AdminSettings" activeClassName="bg-gray-700 rounded" className="block py-2 px-4 hover:bg-gray-700 rounded">Settings</NavLink>
              </li>
            </div>
            <div className='flex items-center'>
              <IoHome className='text-gray-400 mr-3 h-5 w-5' />
              <li>
                <NavLink to="/" activeClassName="bg-gray-700 rounded" className="block py-2 px-4 hover:bg-gray-700 rounded">Go to home</NavLink>
              </li>
            </div>
          </ul>
        </div>
        <div className="p-4 border-t border-gray-700">
          <p>&copy; 2024 Admin Dashboard</p>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-grow p-6 lg:p-10">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6">Welcome to Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Card for Total Users */}
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-md flex items-center">
            <FaUserSecret className="text-black-500 mr-4 lg:mr-7 h-8 w-8 lg:h-10 lg:w-12" />
            <div>
              <h2 className="text-lg lg:text-xl font-semibold mb-1">Total Users</h2>
              <p className="text-3xl lg:text-4xl font-bold">{totalUsers}</p>
            </div>
          </div>
          {/* Card for Deleted Items Count */}
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-md flex items-center">
            <MdFolderDelete className="text-black-500 mr-4 lg:mr-7 h-8 w-8 lg:h-10 lg:w-12" />
            <div>
              <h2 className="text-lg lg:text-xl font-semibold mb-1">Deleted Items</h2>
              <p className="text-3xl lg:text-4xl font-bold">{deletedCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
