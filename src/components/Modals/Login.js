import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainModal from './MainModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../Config/config';

function Login({ modalOpen, setModalOpen }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Load saved user details from local storage
  // useEffect(() => {
  //   const savedUserName = localStorage.getItem('savedUserName');
  //   const savedPassword = localStorage.getItem('savedPassword');
  //   if (savedUserName && savedPassword) {
  //     setUserName(savedUserName);
  //     setPassword(savedPassword);
  //   }
  // }, []);

  // Function to update total users count in local storage
  const updateTotalUsersCount = () => {
    const totalUsersCount = parseInt(localStorage.getItem('totalUsers') || 0) + 1;
    localStorage.setItem('totalUsers', totalUsersCount);
  };

  const handleLoginSuccess = () => {
    toast.success('Login successful!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      className: 'text-sm', // Custom class for smaller size
    });
    updateTotalUsersCount(); // Update total users count
    navigate('/'); // Navigate to AdminDashboard route
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there is already a token in local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      toast.info('You are already logged in!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        className: 'text-sm', // Custom class for smaller size
      });
      return;
    }

    try {
      if (userName === 'superAdmin' && password === 'admin') {
        handleLoginSuccess();
        return;
      }

      const response = await axios.post(
        BaseUrl + 'api/User/Login',
        { UserName: userName, Password: password }
      );

      if (response.data.Status !== 200) {
        throw new Error(response.data.Message);
      }

      setModalOpen(false);
      handleLoginSuccess();
      const token = response.data.Token;
      localStorage.setItem('token', token); // Store token in local storage
      setToken(token); // Save the token
      // Save user details in local storage
      localStorage.setItem('savedUserName', userName);
      localStorage.setItem('savedPassword', password);

      // Start the timer to clear the token after 30 minutes
      setTimeout(() => {
        localStorage.removeItem('token');
        toast.warn('Your session has expired. Please log in again.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          className: 'text-sm', // Custom class for smaller size
        });
        setToken(''); // Clear the token state
        setUserData(null); // Clear user data
        navigate('/login'); // Navigate to login page
      }, 10 * 60 * 1000); // 30 minutes in milliseconds

    } catch (err) {
      setError(err.message);
    } finally {
      setUserName('');
      setPassword('');
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
        BaseUrl + 'api/User/GetUserDetails',
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
    <div>
      <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="inline-block sm:w-4/5 md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-white relative rounded-2xl">
          <h2 className="text-3xl font-bold">Login</h2>
          <form className="flex flex-col gap-6 text-left" onSubmit={handleSubmit}>
            <input
              label="Username"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-gradient-to-r from-main to-subMain hover:from-subMain hover:to-main transition duration-300 ease-in-out lg:py-3 py-2 px-6 font-semibold rounded-md text-xs lg:text-sm shadow-lg transform hover:scale-105">
              Login
            </button>
            <p className="text-center mt-2">
              Don't have an account? <Link to="/signin" className="text-blue-500">Sign up</Link>
            </p>
          </form>
        </div>
      </MainModal>
      <ToastContainer /> {/* Add ToastContainer for toast notifications */}
    </div>
  );
}

export default Login;
