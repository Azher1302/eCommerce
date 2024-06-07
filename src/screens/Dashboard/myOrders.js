import React, { useEffect, useState } from 'react';
import Table from '../../components/OrderConfirmation';
import SideBar from './SideBar';

function MyOrders() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    // Retrieve user information from local storage
    const storedUser = JSON.parse(localStorage.getItem('userData')) || null;
    setUser(storedUser);
  }, []);

  const handleDeleteAll = () => {
    // Delete all cart items from local storage
    localStorage.removeItem('cartItems');
    setCartItems([]);
  };

  return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-xl font-bold">Order History</h2>
          <button onClick={handleDeleteAll} className="bg-flash font-medium text-white py-2 px-6 rounded">
            Delete All
          </button>
        </div>

        {user && (
          <div>
            <h3>User Information:</h3>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            {/* Display other user information as needed */}
          </div>
        )}

        <Table data={cartItems} />
      </div>
    
  );
}

export default MyOrders;
