import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { FaRupeeSign } from 'react-icons/fa'; // Import the rupee icon
import ProductModal from './Modals/ProductModal';
import { Transition } from '@headlessui/react';
import { BaseUrl } from '../Config/config';

function OrderSummary({ order, cartDrawerOpen, closeCartDrawer }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setItems(storedItems);
  }, []);

  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const handleAddToCart = (product) => {
    const updatedItems = [...items, { ...product, quantity: 1 }];
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
    setModalOpen(false);
    setProduct(null);
  };

  const handleQuantityChange = (index, change) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += change;
    if (updatedItems[index].quantity < 1) {
      updatedItems[index].quantity = 1;
    }
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const subtotal = items.length ? items.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
  const totalGST = items.length ? items.reduce((total, item) => total + (item.GST * item.price * item.quantity / 100), 0) : 0;

  const shipping = 45;
  const discount = 23;
  const total = items.length ? subtotal + totalGST + shipping - discount : 0;

  return (
    <>
      <Transition show={modalOpen} as={React.Fragment}>
        <ProductModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={product}
          handleAddToCart={handleAddToCart}
        />
      </Transition>
      <h2 className="font-semibold text-lg">Order Summary</h2>
      <div className="overflow-y-scroll flex-grow scrollbar-hide w-full h-72">
        {items.length ? (
          items.map((p, i) => (
            <div key={i} className="grid grid-cols-8 gap-2 my-6 items-center">
              <div className="col-span-2 bg-deepGray rounded p-2 h-24">
                <img
                  alt={p.title}
                  src={ BaseUrl + `api/Master/LoadItemImage?ImageName=${p.image}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="col-span-4 flex flex-col text-sm gap-2">
                <h3 className="font-medium truncate">{p.title}</h3>
                <div className="flex items-center">
                  <h2 className="font-bold flex items-center">
                    <FaRupeeSign /> <span className="ml-1">{p.price}</span>
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(i, -1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    -
                  </button>
                  <span>Quantity: {p.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(i, 1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-span-1 flex-col">
                {order ? (
                  <button
                    onClick={() => {
                      setProduct(p);
                      setModalOpen(true);
                    }}
                    className="flex-col text-white p-2 text-lg bg-main rounded"
                  >
                    <AiFillEye />
                  </button>
                ) : (
                  <button
                    onClick={() => handleDelete(i)}
                    className="flex-col p-2 text-lg bg-flash rounded text-white hover:bg-main hover:text-white"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products in cart</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500">
        Subtotal
        <span className="text-gray-800 font-bold flex items-center">
          <FaRupeeSign /> {subtotal.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500">
        Tax (GST)
        <span className="text-gray-800 font-bold flex items-center">
          <FaRupeeSign /> {totalGST.toFixed(2)}
        </span>
      </div>
      {/* <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500">
        Shipping
        <span className="text-gray-800 font-bold flex items-center">
          <FaRupeeSign /> {shipping.toFixed(2)}
        </span>
      </div> */}
      {/* <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500">
        Discount
        <span className="text-gray-800 font-bold flex items-center">
          <FaRupeeSign /> {discount.toFixed(2)}
        </span>
      </div> */}
      <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500">
        Total
        <span className="text-gray-800 font-bold flex items-center">
          <FaRupeeSign /> {total.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500 mt-4">
        <span className="align-middle font-medium">Total Payment</span>
        <span className="rounded-md font-bold py-2 px-3 bg-white text-subMain flex items-center">
          <FaRupeeSign /> {total.toFixed(2)}
        </span>
      </div>
    </>
  );
}

export default OrderSummary;
