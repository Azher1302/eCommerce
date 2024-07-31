// src/components/Modals/ProductModal2.js
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaRupeeSign } from 'react-icons/fa';
import axios from 'axios';
import { BaseUrl } from '../../Config/config';
import { toast } from 'react-toastify';

const ProductModal2 = ({ modalOpen, setModalOpen, product, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        'https://api.onlineshop.initstore.com/api/User/AddorRemoveFromCart' , {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        },
        {
          id: 0, // You can use a user-specific ID if needed
          ItemId: product.Id,
          Quantity: quantity,
        }
      );

      if (response.data.Status === 200) {
        toast.success('Product added to cart successfully!');
        onClose(); // Close the modal after successful addition
      } else {
        throw new Error(response.data.Message);
      }
    } catch (error) {
      toast.error('Failed to add product to cart. Please try again.');
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-10">
      <Dialog.Overlay
        className="fixed inset-0 bg-black opacity-30"
        onClick={() => setModalOpen(false)}
      />

      <div
        className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto p-6 relative">
          {/* Close button */}
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          <div className="flex flex-col items-center">
            <img
              src={BaseUrl + `api/Master/LoadItemImage?ImageName=${product.ItemImage}`}
              alt={product.ItemName}
              className="w-full h-64 object-cover rounded-t-xl mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">{product.ItemName}</h3>
            <div className="flex items-center mt-2">
              <FaRupeeSign className="text-gray-800" />
              <h3 className="text-lg font-semibold text-gray-800 ml-1">{product.Rate}</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">{product.ItemDescription}</p>
            <div className="mt-4 flex items-center">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-600 mr-2">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal2;
