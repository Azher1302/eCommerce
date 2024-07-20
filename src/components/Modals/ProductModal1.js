import React, { useState } from 'react';
import MainModal from './MainModal';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { BaseUrl } from '../../Config/config';
import { Transition } from '@headlessui/react';

const ProductModal1 = ({ modalOpen, setModalOpen, product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  const handleAddToCart = async () => {
    toast.success("Added to cart");
    const id = 0+1;

    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

    const requestBody = {
      id: 0,
      ItemId: product.Id, // Ensure this is the correct item ID
      Quantity: quantity,
      // ItemImage: product.ItemImage,
      // UserId: userId // Uncomment if UserId is required
    };

    try {
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
        // window.location.reload();
        setModalOpen(false); // Optionally close modal after adding to cart
      } else {
        toast.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  if (!product) return null;

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <Transition show={modalOpen} as={React.Fragment}>
        <div className="inline-block lg:py-0 py-24 md:w-3/4 w-full overflow-y-auto h-full align-middle transition-all transform">
          <div className="grid bg-white lg:grid-cols-2 gap-2 overflow-hidden shadow-xl rounded-2xl">
            <div className="p-4 md:h-96 h-72">
              <img
                src={BaseUrl + `api/Master/LoadItemImage?ImageName=${product.ItemImage}`} // Ensure BaseUrl is defined correctly
                className="w-full h-full object-contain"
                alt={product.ItemName}
                // onError={(e) => e.target.src = '/images/placeholder.png'} // Handle image load error
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
                      {product.Rate}
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
                    disabled={product.quantity < quantity}
                    className="flex-colo py-4 border-none"
                  >
                    <FiPlus />
                  </button>
                </div>
                <button
                  className="group relative w-full flex justify-center py-6 px-3 border border-transparent text-sm font-bold rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                  onClick={handleAddToCart}
                >
                  <FaCartShopping className="mr-2" />
                  Add to Cart
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
                <p className="text-sm leading-6 text-gray-500 md:leading-6">GST: {product.GST}</p>
                <p className="text-sm leading-6 text-gray-500 md:leading-6">Item Type: {product.ItemType}</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </MainModal>
  );
};

export default React.memo(ProductModal1);
