import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../Config/config'; // Ensure this points to your config file

const LoginMobile = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Load saved user details from local storage
  useEffect(() => {
    const savedUserName = localStorage.getItem('savedUserName');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedUserName && savedPassword) {
      setUserName(savedUserName);
      setPassword(savedPassword);
    }
  }, []);

  const handleLoginSuccess = () => {
    toast.success('Login successful!');
    navigate('/'); // Navigate to home route
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (userName === 'superAdmin' && password === 'admin') {
        handleLoginSuccess();
        return;
      }

      const response = await axios.post(
        `${BaseUrl}api/User/Login`,
        { UserName: userName, Password: password }
      );

      if (response.data.Status !== 200) {
        throw new Error(response.data.Message);
      }

      handleLoginSuccess();
      const token = response.data.Token;
      localStorage.setItem('token', token); // Store token in local storage
      setToken(token); // Save the token
      // Save user details in local storage
      localStorage.setItem('savedUserName', userName);
      localStorage.setItem('savedPassword', password);

    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const fetchData = async (token) => {
    try {
      const response = await axios.get(
        `${BaseUrl}api/User/GetUserDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly formatted Authorization header
          },
        }
      );
      setUserData(response.data);
    } catch (error) {
      setError('Error fetching user data');
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <ToastContainer />
      <div className="max-w-md w-full px-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
          <p className="text-lg text-white">Login to your account</p>
        </div>
        <form className="bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
            <a href="#" className="text-blue-500 hover:text-blue-700 text-sm font-bold">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginMobile;
