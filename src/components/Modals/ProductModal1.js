import React, { useState } from 'react';
import MainModal from './MainModal';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { BaseUrl } from '../../Config/config';
import { Transition } from '@headlessui/react';
import Login from './Login';

const ProductModal1 = ({ modalOpen, setModalOpen, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  const handleAddToCart = async () => {
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
        window.location.reload();

        // Store product details in local storage individually
        const cartItemKey = `cartItem_${product.Id}`;
        const existingItem = localStorage.getItem(cartItemKey);

        if (existingItem) {
          // Item already exists in local storage, update its quantity
          const existingItemDetails = JSON.parse(existingItem);
          existingItemDetails.Quantity += quantity;
          localStorage.setItem(cartItemKey, JSON.stringify(existingItemDetails));
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
    <>
      <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Transition show={modalOpen} as={React.Fragment}>
          <div className="inline-block lg:py-0 py-24 md:w-3/4 w-full overflow-y-auto h-full align-middle transition-all transform">
            <div className="grid bg-white lg:grid-cols-2 gap-2 overflow-hidden shadow-xl rounded-2xl">
              <div className="p-4 md:h-96 h-72">
                <img
                  src={BaseUrl + `api/Master/LoadItemImage?ImageName=${product.ItemImage}`}
                  className="w-full h-full object-contain"
                  alt={product.ItemName}
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
      <Login modalOpen={loginModalOpen} setModalOpen={setLoginModalOpen} />
    </>
  );
};

export default React.memo(ProductModal1);
