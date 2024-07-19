import React, { useState } from 'react';
import MainModal from './MainModal';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { FaCartShopping } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { FaRupeeSign } from 'react-icons/fa';
import { IoCart } from "react-icons/io5";

const ProductModal = ({ modalOpen, setModalOpen, product }) => {
  const [item, setItem] = useState(1);

  const handleIncrement = () => {
    setItem(item + 1);
  };

  const handleDecrement = () => {
    if (item > 1) {
      setItem(item - 1);
    }
  };

  const handleAddToCart = () => {
    toast.success("Added to cart");

    // Retrieve the Id from local storage
    const storedId = localStorage.getItem('Id');

    // Create a new cart item object
    const newCartItem = {
      userId: storedId, // Include the user Id from local storage
      id: product.GST,
      title: product.title,
      price: product.salePrice,
      quantity: item,
      Gst:product.GST,
      image: product.image,
      flashSale: product.flashSale,
      flashSalePrice: product.flashSalePrice,
      flashSaleStartDate: product.flashSaleStartDate,
      flashSaleEndDate: product.flashSaleEndDate,
    };

    // Retrieve existing cart items from local storage
    let existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let existingCartItems2 = JSON.parse(localStorage.getItem('CartItems')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = existingCartItems.findIndex(cartItem => cartItem.id === product._id);
    const existingProductIndex2 = existingCartItems2.findIndex(cartItem => cartItem.id === product._id);

    if (existingProductIndex !== -1) {
      // If the product exists, update its quantity
      existingCartItems[existingProductIndex].quantity += item;
    } else {
      // If the product doesn't exist, add the new cart item to the existing cart items array
      existingCartItems = [...existingCartItems, newCartItem];
    }

    if (existingProductIndex2 !== -1) {
      // If the product exists, update its quantity
      existingCartItems2[existingProductIndex2].quantity += item;
    } else {
      // If the product doesn't exist, add the new cart item to the existing cart items array
      existingCartItems2 = [...existingCartItems2, newCartItem];
    }

    // Update the cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    localStorage.setItem('CartItems', JSON.stringify(existingCartItems2));

    // Refresh the page
    window.location.reload();
  };

  if (!product) return null; // Render nothing if product is not defined

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block lg:py-0 py-24 md:w-3/4 w-full overflow-y-auto h-full align-middle transition-all transform ">
        <div className="grid bg-white lg:grid-cols-2 gap-2 overflow-hidden shadow-xl rounded-2xl">
          <div className="p-4 md:h-96 h-72">
            <img
              src={`/images/${product.image}`}
              className="w-full h-full object-contain"
              alt={product.title}
            />
          </div>
          <div className="w-full flex gap-4 flex-col p-5 md:p-8 text-left">
            <div className="block">
              <h1 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold">
                {product.title}
              </h1>
              <p className="text-sm leading-6 text-gray-500 md:leading-6">{product.description}</p>
            </div>
            <div className="flex items-center">
              {product.flashSale ? (
                <h2 className="text-xl font-bold flex items-center">
                  <FaRupeeSign className="mr-1" />
                  {product.salePrice}
                  <del className="text-text ml-3 text-sm font-medium flex items-center">
                    <FaRupeeSign className="mr-1" />
                    {product.price}.00
                  </del>
                </h2>
              ) : (
                <div className="flex items-center text-lg font-black">
                  <FaRupeeSign className="mr-1" />
                  {product.flashSale}
                </div>
              )}
            </div>
            <div className="grid sm:grid-cols-5 gap-3 items-center">
              <div className="grid sm:col-span-2 col-span-5 grid-cols-3 gap-1 border border-text rounded-md">
                <button
                  onClick={handleDecrement}
                  disabled={item === 1}
                  className="flex-colo py-4 border-none"
                >
                  <FiMinus />
                </button>
                <p className="flex-colo py-4">{item}</p>
                <button
                  onClick={handleIncrement}
                  disabled={
                    product.quantity < item || product.quantity === item
                  }
                  className="flex-colo py-4 border-none"
                >
                  <FiPlus />
                </button>
              </div>
              <button 
                className='group relative w-full flex justify-center py-6 px-3 border border-transparent text-sm font-bold rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300'
                onClick={handleAddToCart}
              >
                <IoCart className="mr-2" />
              </button>
            </div>
            <div className="flex text-sm">
              Category:
              <span className="text-main font-bold ml-3">{product.type}</span>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              {product.tag.map((t, i) => (
                <div 
                  key={i}
                  className="py-1 px-3 bg-deepest text-main rounded-full text-xs"
                >
                  {t}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm leading-6 text-gray-500 md:leading-6" > ID: {product._id}</p>
              <p className="text-sm leading-6 text-gray-500 md:leading-6" >Item Type: {product.type}</p>
            </div>
          </div>
        </div>
      </div>
    </MainModal>
  );
};

export default React.memo(ProductModal);
