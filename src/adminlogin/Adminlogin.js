import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { BaseUrl } from '../Config/config';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
         BaseUrl + 'api/User/Login',
        { UserName: username, Password: password }
      );

      if (response.data.Status !== 200) {
        throw new Error(response.data.Message);
      }

      const token = response.data.Token;
      localStorage.setItem('token admin', token);
      setToken(token); // Set the token state

      // Fetch user data after setting the token
      fetchData();

      // Display alert here before navigating
      window.alert('Admin logged in successfully!');

      // Wait for a short time to allow the user to see the alert before navigating
      setTimeout(() => {
        navigate('/AdminDashboard');
      }, 200); // Adjust the time as needed
    } catch (err) {
      // console.error('Error:', err.message);
      window.alert('Login failed. Please Try Again');
    }
  };
  useEffect(() => {
    if (token) {
      console.log('Token:', token); // Log the token when it's received
      // You can perform further actions with the token here
      fetchData(token);
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        BaseUrl + 'api/User/GetUserDetails', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle response data as needed
    } catch (error) {
      console.error('Error fetching user data:', error);
      // window.alert('Error fetching user data');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
  <div className="flex items-center"> {/* Flex container for username icon and input */}
    <FaRegUser className="text-gray-400 mr-3 h-5 w-5" /> {/* Username icon */}
    <label htmlFor="username" className="sr-only">Username</label>
    <input
      id="username"
      name="username"
      type="text"
      autoComplete="username"
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>
  <div className="flex items-center"> {/* Flex container for password icon and input */}
    <FaLock className="text-gray-400 mr-3 h-5 w-5" /> {/* Password icon */}
    <label htmlFor="password" className="sr-only">Password</label>
    <input
      id="password"
      name="password"
      type="password"
      autoComplete="current-password"
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
</div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
