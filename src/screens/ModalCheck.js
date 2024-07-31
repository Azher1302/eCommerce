import React from 'react';
import { Dialog } from '@headlessui/react';
import { IoMdClose } from 'react-icons/io';

const ModalCheck = ({ isOpen, onClose, onConfirm, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center z-50">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose size={24} />
        </button>
        {children}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalCheck;
