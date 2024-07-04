import React, { useState } from 'react';
import MainModal from './MainModal';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { FaCartShopping, FaRupeeSign } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const ProductModal1 = ({ modalOpen, setModalOpen, product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    toast.success("Added to cart");

    const newCartItem = {
      id: product.Id,
      title: product.ItemName,
      price: product.Rate,
      quantity: quantity,
      image: product.image,
      flashSale: product.flashSale,
      flashSalePrice: product.flashSalePrice,
      flashSaleStartDate: product.flashSaleStartDate,
      flashSaleEndDate: product.flashSaleEndDate,
    };

    let existingCartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (!existingCartItems) {
      existingCartItems = [];
    }

    // Check if the item already exists in cart based on id
    const existingItemIndex = existingCartItems.findIndex(item => item.id === newCartItem.id);

    if (existingItemIndex !== -1) {
      // If item exists, update its quantity
      existingCartItems[existingItemIndex].quantity += quantity;
    } else {
      // If item does not exist, add it to cart
      existingCartItems.push(newCartItem);
    }
    window.location.reload();

    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));

    setModalOpen(false); // Optionally close modal after adding to cart
  };

  if (!product) return null;

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block lg:py-0 py-24 md:w-3/4 w-full overflow-y-auto h-full align-middle transition-all transform">
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
                {product.ItemName}
              </h1>
              <p className="text-sm leading-6 text-gray-500 md:leading-6">{product.ItemDescription}</p>
            </div>
            <div className="flex items-center">
              {product.flashSale ? (
                <h2 className="text-xl font-bold flex items-center">
                  <FaRupeeSign className="mr-1" />
                  {product.flashSalePrice}
                  <del className="text-text ml-3 text-sm font-medium flex items-center">
                    <FaRupeeSign className="mr-1" />
                    {product.Rate}.00
                  </del>
                </h2>
              ) : (
                <div className="flex items-center text-lg font-black">
                  <FaRupeeSign className="mr-1" />
                  {product.Rate}
                </div>
              )}
            </div>
            <div className="grid sm:grid-cols-5 gap-3 items-center">
              <div className="grid sm:col-span-2 col-span-5 grid-cols-3 gap-1 border border-text rounded-md">
                <button
                  onClick={handleDecrement}
                  disabled={quantity === 1}
                  className="flex-colo py-4 border-none"
                >
                  <FiMinus />
                </button>
                <p className="flex-colo py-4">{quantity}</p>
                <button
                  onClick={handleIncrement}
                  disabled={product.quantity < quantity || product.quantity === quantity}
                  className="flex-colo py-4 border-none"
                >
                  <FiPlus />
                </button>
              </div>
              <button
                className='group relative w-full flex justify-center py-6 px-3 border border-transparent text-sm font-bold rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300'
                onClick={handleAddToCart}
              >
                <FaCartShopping className="mr-2" />
                
              </button>
            </div>
            <div className="flex text-sm">
              Category:
              <span className="text-main font-bold ml-3">{product.ItemType}</span>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              {product.tag && product.tag.map((t, i) => (
                <div
                  key={i}
                  className="py-1 px-3 bg-deepest text-main rounded-full text-xs"
                >
                  {t}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm leading-6 text-gray-500 md:leading-6">ID: {product.Id}</p>
              <p className="text-sm leading-6 text-gray-500 md:leading-6">Item Type: {product.ItemType}</p>
            </div>
          </div>
        </div>
      </div>
    </MainModal>
  );
};

export default React.memo(ProductModal1);
