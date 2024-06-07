import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainModal from './MainModal';
import { toast } from 'react-toastify';
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
  useEffect(() => {
    const savedUserName = localStorage.getItem('savedUserName');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedUserName && savedPassword) {
      setUserName(savedUserName);
      setPassword(savedPassword);
    }
  }, []);

  // Function to update total users count in local storage
  const updateTotalUsersCount = () => {
    const totalUsersCount = parseInt(localStorage.getItem('totalUsers') || 0) + 1;
    localStorage.setItem('totalUsers', totalUsersCount);
  };

  const handleLoginSuccess = () => {
    toast.success('Login successful!');
    updateTotalUsersCount(); // Update total users count
    navigate('/'); // Navigate to AdminDashboard route
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (userName === 'superAdmin' && password === 'admin') {
        handleLoginSuccess();
        return;
      }

      const response = await axios.post(

         BaseUrl +'api/User/Login',
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
            <button type="submit" className="w-full text-center py-3 mt-2 rounded bg-green-500 text-white hover:bg-green-600">
              Login
            </button>
            <p className="text-center mt-2">
              Don't have an account? <Link to="/signin" className="text-blue-500">Sign up</Link>
             </p>
          </form>
        </div>
      </MainModal>
    </div>
  );
}

export default Login;