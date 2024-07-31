import React, { useState, useEffect } from 'react';
import { IoBagCheckOutline, IoClose } from 'react-icons/io5';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { BaseUrl } from '../../Config/config';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import MainDrawer from './MainDrawer';
import toast, { Toaster } from 'react-hot-toast';

function Cart({ cartDrawerOpen, closeCartDrawer }) {
  const [items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('You are not logged in!');
        return;
      }

      try {
        const response = await fetch(`${BaseUrl}api/User/GetUserCart`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }

        const data = await response.json();
        const updatedData = data.map((item, index) => ({ ...item, SequentialId: index + 1 }));
        setItems(updatedData);
        localStorage.setItem('cartItems', JSON.stringify(updatedData)); // Save cart items to local storage
        updateTotalQuantity(updatedData);
      } catch (error) {
        console.error('Error fetching items:', error);
        toast.error('Failed to fetch items');
      }
    };

    fetchCartItems();
  }, []);

  const updateTotalQuantity = (items) => {
    const total = items.reduce((sum, item) => sum + (item.Quantity || 0), 0);
    setTotalQuantity(total);
  };

  const handleIncrement = async (index) => {
    const updatedItems = [...items];
    if (updatedItems[index]) {
      const newQuantity = updatedItems[index].Quantity + 1;
      const success = await updateItemQuantity(updatedItems[index].id, newQuantity);
      if (success) {
        window.location.reload();
        updatedItems[index].Quantity = newQuantity;
        setItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update cart items in local storage
        updateTotalQuantity(updatedItems);
      }
    }
  };

  const handleDecrement = async (index) => {
    const updatedItems = [...items];
    if (updatedItems[index] && updatedItems[index].Quantity > 1) {
      const newQuantity = updatedItems[index].Quantity - 1;
      const success = await updateItemQuantity(updatedItems[index].id, newQuantity);
      if (success) {
        window.location.reload();
        updatedItems[index].Quantity = newQuantity;
        setItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update cart items in local storage
        updateTotalQuantity(updatedItems);
      }
    }
  };

  const updateItemQuantity = async (id, quantity) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${BaseUrl}api/User/AddorRemoveFromCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Id: id, Quantity: quantity }),
      });

      if (response.ok) {
        return true;
      } else {
        toast.error('Failed to update item quantity');
        return false;
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      toast.error('Failed to update item quantity');
      return false;
    }
  };

  const handleDelete = async (index) => {
    const token = localStorage.getItem('token');
    const item = items[index];

    if (!item || !token) {
      toast.error('Failed to remove item from cart');
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}api/User/RemoveItemFromCart?Id=${item.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update cart items in local storage

        updateTotalQuantity(updatedItems);
        toast.success('Item removed from cart successfully');
        closeCartDrawer();
        window.location.reload();
      } else {
        toast.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const handleProceedToCheckout = () => {
    closeCartDrawer();

    if (items.length === 0) {
      toast.error('No product in the cart');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You are not logged in!');
      return;
    }

    navigate('/checkout');
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
            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className="grid grid-cols-8 gap-2 my-6 items-center">
                  <div className="col-span-2 bg-deepGray rounded p-2 h-24">
                    <img
                      alt={item.ItemName}
                      src={item.ItemImage ? `${BaseUrl}api/Master/LoadItemImage?ImageName=${item.ItemImage}` : '/default-image.png'}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="col-span-5 flex flex-col text-sm gap-2">
                    <h3 className="font-medium truncate">{item.ItemName}</h3>
                    <h2 className="font-bold flex items-center">
                      <FaRupeeSign /> <span className="ml-1">{item.Amount}</span>
                    </h2>
                    <p>{item.ItemDescription}</p>
                    <div className="grid grid-cols-3 text-xs gap-1 border border-main w-32">
                      <button
                        onClick={() => handleDecrement(index)}
                        disabled={item.Quantity === 1}
                        className="flex-colo py-1 hover:bg-main hover:text-white"
                      >
                        <FiMinus />
                      </button>
                      <p className="flex-colo py-1">{item.Quantity}</p>
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
              ))
            ) : (
              <p className="text-center my-4">No items in the cart</p>
            )}
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="w-full hover:bg-subMain transitions py-3 px-3 bg-main flex items-center justify-between text-sm sm:text-base text-white"
          >
            <span className="align-middle font-medium">Proceed To Checkout</span>
            <span className="rounded-md font-bold py-2 px-3 bg-white text-subMain">
              <FaRupeeSign /> {items.reduce((total, item) => total + (item.Amount || 0), 0)}
            </span>
          </button>
        </div>
      </MainDrawer>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default Cart;
