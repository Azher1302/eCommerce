import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import './profile.css';

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('signinuser'));
    if (storedUserData) {
      setUserData(storedUserData);
    } else {
      console.error('User data not found');
    }
  }, []);

  if (!userData) {
    return <div> 
      <Navigate to='/'></Navigate>
    
    </div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="profile-container bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-1 animate-spread"></div>
          <img src={userData.avatar} alt="User Avatar" className="relative w-full h-full rounded-full shadow-lg border-4 border-white" />
        </div>
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-2">{userData.name}</h2>
        <p className="text-gray-700 text-center mb-4 italic">{userData.bio}</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-gray-600">Name:</p>
            <p className="text-gray-800">{userData.name}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Email:</p>
            <p className="text-gray-800">{userData.email}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Phone Number:</p>
            <p className="text-gray-800">{userData.phoneNumber}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Date of Birth:</p>
            <p className="text-gray-800">{userData.dateOfBirth}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Age:</p>
            <p className="text-gray-800">{userData.age}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Password:</p>
            <div className="flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={userData.password}
                readOnly
                className="border rounded px-2 py-1 w-full bg-gray-100"
              />
              <button
                type="button"
                className="ml-2 text-blue-500 hover:text-blue-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/" className="text-blue-500 hover:text-blue-700 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
