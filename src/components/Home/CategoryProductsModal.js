import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';
import { BaseUrl } from '../../Config/config';
import { FaRupeeSign, FaShoppingCart } from 'react-icons/fa'; // Import cart icon
import ProductModal1 from '../Modals/ProductModal1'; // Ensure this path is correct

const CategoryProductsModal = ({ modalOpen, onClose, products = [], addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); // Added state for login modal
  const [quantity, setQuantity] = useState(1); // Add state for quantity

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
    setProductModalOpen(false);
  };

  const handleAddToCart = async (product) => {
    console.log('start');
    const token = localStorage.getItem('token');

    if (!token) {
      // Open login modal if no token is found
      setLoginModalOpen(true);
      return;
    }

    const requestBody = {
      id: 0, // Update this based on your logic
      ItemId: product.Id, // Ensure this is the correct item ID
      Quantity: quantity,
    };

    try {
      console.log("heck first");
      const response = await fetch(BaseUrl + 'api/User/AddorRemoveFromCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('API Response:', result);
        toast.success('Item added to cart successfully');
        console.log('end');
        // window.location.reload();

        // Store product details in local storage individually
        const cartItemKey = `cartItem_${product.Id}`;
        const existingItem = localStorage.getItem(cartItemKey);

        if (existingItem) {
          // Item already exists in local storage, update its quantity
          const existingItemDetails = JSON.parse(existingItem);
          existingItemDetails.Quantity += quantity;
          localStorage.setItem(cartItemKey, JSON.stringify(existingItemDetails));
          console.log('end');
        } else {
          // Add new item to local storage
          const newItem = {
            Id: product.Id,
            ItemName: product.ItemName,
            ItemImage: product.ItemImage,
            Rate: product.Rate,
            Quantity: quantity,
            ItemDescription: product.ItemDescription,
            GST: product.GST,
            ItemType: product.ItemType,
            flashSalePrice: product.flashSalePrice,
            tag: product.tag,
          };
          localStorage.setItem(cartItemKey, JSON.stringify(newItem));
        }

        setProductModalOpen(false); // Optionally close modal after adding to cart
      } else {
        toast.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <>
      <Dialog open={modalOpen} onClose={onClose} className="relative z-10">
        <Dialog.Overlay 
          className="fixed inset-0 bg-black opacity-30"
          onClick={onClose}
        />

        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-screen-lg w-full mx-auto p-6 relative overflow-hidden">
            <button
              onClick={onClose}
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
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="overflow-y-auto h-80"> {/* Adjust height as needed */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? products.map(product => (
                  <div
                    key={product.Id}
                    onClick={() => handleProductClick(product)}
                    className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                  >
                    <img
                      src={BaseUrl + `api/Master/LoadItemImage?ImageName=${product.ItemImage}`}
                      alt={product.ItemName}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">{product.ItemName}</h3>
                      <div className="flex items-center">
                        <FaRupeeSign className="text-gray-800" />
                        <h3 className="text-lg font-semibold text-gray-800 ml-1">{product.Rate}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{product.ItemDescription}</p>
                    </div>
                    <button
                      className="group relative w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering handleProductClick
                        handleAddToCart(product);
                      }}
                    >
                      <span className="flex-1">Add to Cart</span>
                      <FaShoppingCart className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                )) : (
                  <p className="text-gray-600">No products available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Render ProductModal1 if a product is selected */}
      {selectedProduct && (
        <ProductModal1
          modalOpen={productModalOpen}
          setModalOpen={setProductModalOpen}
          product={selectedProduct}
          onClose={handleCloseProductModal}
          addToCart={addToCart} // Pass the addToCart function
        />
      )}
    </>
  );
};

export default CategoryProductsModal;
