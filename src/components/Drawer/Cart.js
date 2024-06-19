import React, { useState, useEffect } from 'react';
import { IoBagCheckOutline, IoClose } from 'react-icons/io5';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import MainDrawer from './MainDrawer';
import toast from 'react-hot-toast';

function Cart({ cartDrawerOpen, closeCartDrawer }) {
  const [items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setItems(storedItems);
    updateTotalQuantity(storedItems);

    // Listen for changes in local storage
    const handleStorageChange = () => {
      const updatedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setItems(updatedItems);
      updateTotalQuantity(updatedItems);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const updateTotalQuantity = (items) => {
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);
  };

  const handleIncrement = (index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += 1;
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
    updateTotalQuantity(updatedItems);
  };

  const handleDecrement = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      setItems(updatedItems);
      updateLocalStorage(updatedItems);
      updateTotalQuantity(updatedItems);
    }
  };

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
    updateTotalQuantity(updatedItems);
    window.location.reload(); 
    
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error('There are no items in the cart');
    } else {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        toast.error('Your are not logged in ! ')
      } else {
        navigate('/checkout');
      }
      closeCartDrawer();
    }
  };

  return (
    <>
      <MainDrawer DrawerOpen={cartDrawerOpen} closeDrawer={closeCartDrawer}>
        <div className="flex flex-col w-full h-full justify-between items-middle bg-white rounded cursor-pointer">
          <div className="w-full flex justify-between items-center relative px-5 py-4 border-b bg-deepest border-deepGray">
            <h2 className="font-semibold text-lg m-0 text-heading flex items-center">
              <span className="text-xl mr-2 mb-1">
                <IoBagCheckOutline />
              </span>
              Shopping Cart
            </h2>
            <button
              onClick={closeCartDrawer}
              className="flex-colo p-2 font-medium text-flash bg-white rounded-full hover:bg-main hover:text-white"
            >
              <IoClose />
            </button>
          </div>

          <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-8 gap-2 my-6 items-center">
                <div className="col-span-2 bg-deepGray rounded p-2 h-24">
                  <img
                    alt={item.title}
                    src={`/images/${item.image}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="col-span-5 flex flex-col text-sm gap-2">
                  <h3 className="font-medium truncate">{item.title}</h3>
                  {item.price}
                  <div className="grid grid-cols-3 text-xs gap-1 border border-main w-32">
                    <button
                      onClick={() => handleDecrement(index)}
                      disabled={item.quantity === 1}
                      className="flex-colo py-1 hover:bg-main hover:text-white"
                    >
                      <FiMinus />
                    </button>
                    <p className="flex-colo py-1">{item.quantity}</p>
                    <button
                      onClick={() => handleIncrement(index)}
                      className="flex-colo py-1 hover:bg-main hover:text-white"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <div className="col-span-1 flex-colo">
                  <button
                    onClick={() => handleDelete(index)}
                    className="flex-colo p-2 text-lg bg-flash rounded text-white hover:bg-main hover:text-white"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="w-full hover:bg-subMain transitions py-3 px-3 bg-main flex items-center justify-between text-sm sm:text-base text-white"
          >
            <span className="align-middle font-medium">Proceed To Checkout</span>
            <span className="rounded-md font-bold py-2 px-3 bg-white text-subMain">
              ${items.reduce((total, item) => total + item.price * item.quantity, 0)}
            </span>
          </button>
        </div>
      </MainDrawer>
    </>
  );
}

export default Cart;
