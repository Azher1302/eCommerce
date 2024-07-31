import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../Config/config';
import Login from '../../components/Modals/Login';
import { Transition } from 'react-transition-group';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUpload } from 'react-icons/fa'; // Font Awesome Upload icon
import { FaCamera } from "react-icons/fa6";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!avatar) {
      toast.error('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', avatar);

    const token = localStorage.getItem('token');

    axios.post(BaseUrl + 'api/User/UploadAvatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        setUserDetails(prevDetails => ({
          ...prevDetails,
          AvatarUrl: response.data.avatarUrl // Assuming the response contains the new avatar URL
        }));
        setAvatar(null);
        setAvatarPreview(null);
        toast.success('Avatar updated successfully');
      })
      .catch(error => {
        toast.error('Error updating avatar');
        console.error('Error updating avatar:', error);
      });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeLoginModal = () => {
    setModalOpen(false);
  };

  if (loading) return <div className="text-center text-lg text-gray-700">Loading...</div>;

  if (error) return (
    <div className="text-center text-red-500">
      Error: {error}
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-10">
      {userDetails && (
        <Transition in={true} timeout={300} mountOnEnter unmountOnExit>
          {state => (
            <div className={`transition-opacity duration-300 ${state === 'entered' ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative md:flex">
                {/* Image container */}
                {/* <div className="md:flex-shrink-0 relative">
                  <img
                    className="h-48 w-48 object-cover rounded-full border-4 border-white-500"
                    src={avatarPreview || userDetails.AvatarUrl || 'https://via.placeholder.com/150'}
                    alt="User avatar"
                  />
                  <label htmlFor="file-input" className="absolute bottom-6 left-2 right-4  cursor-pointer text-black-500 hover:text-blue-700">
                    <FaCamera size={24} />
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div> */}
                {/* User details */}
                <div className="p-8">
                  <h1 className="block mt-1 text-lg leading-tight font-medium text-black">User Profile</h1>
                  <p className="mt-2 text-gray-500"><strong>Name:</strong> {userDetails.UserName}</p>
                  <p className="mt-2 text-gray-500"><strong>Email:</strong> {userDetails.Email}</p>
                  <p className="mt-2 text-gray-500"><strong>Number:</strong> {userDetails.Mobile}</p>
                  <div className="flex-grow mt-4">
                   
                  </div>
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
