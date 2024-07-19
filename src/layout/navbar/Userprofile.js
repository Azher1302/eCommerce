import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../Config/config';
import Login from '../../components/Modals/Login';
import { Transition } from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setModalOpen(true); // Open login modal if token is not present
      setLoading(false);
      return;
    }

    axios.get(BaseUrl + `api/User/GetUserDetails`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        setUserDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching user details');
        setLoading(false);
      });
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeLoginModal = () => {
    setModalOpen(false);
  };

  // const handleLogin = () => {
  //   toast.info('Opening login modal...');
  //   openModal();
  // };

  // if (loading) return <div className="text-center text-lg text-gray-700">Loading...</div>;
  if (error) return (
    <div className="text-center text-red-500">
      Error: {error}
    </div>
  );

  // Render user details only if userDetails is not null
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-10">
      {userDetails && (
        <Transition in={true} timeout={300} mountOnEnter unmountOnExit>
          {state => (
            <div className={`transition-opacity duration-300 ${state === 'entered' ? 'opacity-100' : 'opacity-0'}`}>
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img className="h-48 w-full object-cover md:w-48" src={userDetails.AvatarUrl} alt="User avatar" />
                </div>
                <div className="p-8">
                  <h1 className="block mt-1 text-lg leading-tight font-medium text-black">User Profile</h1>
                  <p className="mt-2 text-gray-500"><strong>Name:</strong> {userDetails.UserName}</p>
                  <p className="mt-2 text-gray-500"><strong>Email:</strong> {userDetails.Email}</p>
                  <p className="mt-2 text-gray-500"><strong>Number:</strong> {userDetails.Mobile}</p>
                  {/* <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>Login</button> */}
                </div>
              </div>
            </div>
          )}
        </Transition>
      )}
      <ToastContainer />
      {modalOpen && <Login modalOpen={modalOpen} setModalOpen={setModalOpen} onClose={closeLoginModal} />}
    </div>
  );
};

export default UserProfile;
