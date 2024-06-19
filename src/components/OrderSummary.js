import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import ProductModal from './Modals/ProductModal';
import { Transition } from '@headlessui/react'; // Ensure this import is present

function OrderSummary({ order, cartDrawerOpen, closeCartDrawer }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [items, setItems] = useState([]);

  const Totals = [
    {
      name: 'Subtotal',
      cost: items.reduce((total, item) => total + item.price * item.quantity, 0),
    },
    {
      name: 'Tax',
      cost: 5, // Update with your tax value
    },
    {
      name: 'Shipping',
      cost: 45, // Update with your shipping cost
    },
    {
      name: 'Discount',
      cost: 23, // Update with your discount value
    },
  ];

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
        {items.map((p, i) => (
          <div key={i} className="grid grid-cols-8 gap-2 my-6 items-center">
            <div className="col-span-2 bg-deepGray rounded p-2 h-24">
              <img
                alt={p.title}
                src={`/images/${p.image}`}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="col-span-4 flex flex-col text-sm gap-2">
              <h3 className="font-medium truncate">{p.title}</h3>
              <h2 className=" font-bold">${p.price}</h2>
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
            <div className="col-span-1 flex-colo">
              {order ? (
                <button
                  onClick={() => {
                    setProduct(p);
                    setModalOpen(true);
                  }}
                  className="flex-colo text-white p-2 text-lg bg-main rounded"
                >
                  <AiFillEye />
                </button>
              ) : (
                <button
                  onClick={() => handleDelete(i)}
                  className="flex-colo p-2 text-lg bg-flash rounded text-white hover:bg-main hover:text-white"
                >
                  <MdDelete />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {Totals.map((t, i) => (
        <div
          key={i}
          className="flex items-center justify-between text-sm w-full font-semibold text-gray-500"
        >
          {t.name}
          <span className=" text-gray-800 font-bold">${t.cost.toFixed(2)}</span>
        </div>
      ))}
      <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500">
        Total
        <span className="text-gray-800 font-bold">
          ${(
            Totals.reduce((total, item) => total + item.cost, 0) -
            Totals.find((t) => t.name === 'Discount').cost
          ).toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500 mt-4">
        <span className="align-middle font-medium">Total Payment</span>
        <span className="rounded-md font-bold py-2 px-3 bg-white text-subMain">
          ${(
            Totals.reduce((total, item) => total + item.cost, 0) -
            Totals.find((t) => t.name === 'Discount').cost
          ).toFixed(2)}
        </span>
      </div>
    </>
  );
}

export default OrderSummary;
