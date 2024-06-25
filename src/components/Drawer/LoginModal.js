// LoginModal.js
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const LoginModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-700 hover:text-black"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Login Required</h2>
        <p className="mb-4">Please log in to proceed to checkout.</p>
       
        <p className='text-xl font-italic bg-transparent mb-4'>  Go to Login</p>
        
      </div>
    </div>
  );
};

export default LoginModal;
