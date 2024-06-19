import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';

const Flashproduct = ({ product, modalOpen, setModalOpen, addToCart }) => {
  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-8 max-w-md m-auto rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={() => setModalOpen(false)}
        >
          Close
        </button>
        <div className="flex justify-center">
          <img
            src={`/images/${product.image}`} // Adjust path to your images
            alt={product.title}
            className="w-64 h-64 object-contain"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold">{product.ItemName}</h2>
          <p className="text-sm text-gray-600">{product.ItemDescription}</p>
          <div className="flex justify-between items-center mt-4">
            <h3 className="text-lg font-semibold">
              <FaRupeeSign className="inline mr-1" />
              {product.Rate}.00
            </h3>
            <button
              className="px-4 py-2 bg-main text-white rounded-md hover:bg-subMain"
              onClick={() => {
                addToCart(product);
                setModalOpen(false);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashproduct;
