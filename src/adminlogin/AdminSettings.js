import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { useNavigate } from 'react-router-dom';

const AdminSettings = () => {

  
  const navigate = useNavigate();

  useEffect(() => {
      const tokenadmin = localStorage.getItem('token admin');
      if (!tokenadmin) {
          navigate('/AdminLogin');
      }
  }, [navigate]);

  // State for form inputs
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the form data to your backend or perform other actions
    console.log(formData);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-main"
              placeholder="Enter company name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-main"
              placeholder="Enter email address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-main"
              placeholder="Enter phone number"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-main"
              placeholder="Enter address"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-main text-white py-2 px-4 rounded hover:bg-subMain focus:outline-none focus:bg-subMain"
          >
            Save Settings
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AdminSettings;
