import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../../Config/config';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signin.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    Id: 0,
    Name: '',
    Email: '',
    UserName: '',
    Password: '',
    Mobile: '',
    // UserType: 1,
  });

  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const storedToken = localStorage.getItem('adminToken1');

  const navigate = useNavigate();

  const updateSigninUsersCount = () => {
    const totalUsersCount = parseInt(localStorage.getItem('signinUsers') || 0) + 1;
    localStorage.setItem('signinUsers', totalUsersCount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
         BaseUrl + 'api/User/Add_or_Update_User',
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.data.Status !== 200) {
        throw new Error(response.data.Message);
      }

      updateSigninUsersCount();
      localStorage.setItem('signinuser', JSON.stringify(formData));
      const existingUsers = JSON.parse(localStorage.getItem('signinuserdata')) || [];
      existingUsers.push(formData);
      localStorage.setItem('signinuserdata', JSON.stringify(existingUsers));

      setFormData({
        Id: 0,
        Name: '',
        Email: '',
        UserName: '',
        Password: '',
        Mobile: '',
        UserType: 1,
      });

      setSubmitted(true);
      navigate('/userprofile');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="blur-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="form-container">
        <div>
          <h2 className="text-center">Sign in to your account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="Name"
              type="text"
              required
              placeholder="Name"
              value={formData.Name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email-address">Email address</label>
            <input
              id="email-address"
              name="Email"
              type="email"
              required
              placeholder="Email address"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone-number">Phone Number</label>
            <input
              id="phone-number"
              name="Mobile"
              type="tel"
              required
              placeholder="Phone Number"
              value={formData.Mobile}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="UserName"
              type="text"
              required
              placeholder="Username"
              value={formData.UserName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                id="password"
                name="Password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
                value={formData.Password}
                onChange={handleChange}
              />
              <button type="button" className="password-toggle-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit">Sign in</button>
        </form>
        {submitted && <p className="text-green-500 text-center">Form submitted successfully!</p>}
      </div>
      <ToastContainer /> {/* Add ToastContainer for toast notifications */}
    </div>
  );
};

export default SignIn;
