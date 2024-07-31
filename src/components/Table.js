import React, { useState, useEffect } from 'react';
import { BaseUrl } from '../Config/config';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import dayjs from 'dayjs'; // Import dayjs for date formatting

const Table = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [fetchCount, setFetchCount] = useState(0);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://api.onlineshop.initstore.com/api/User/GetCheckOutOrders', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);

        const currentCount = parseInt(localStorage.getItem('fetchCount') || '0', 10);
        const newCount = currentCount + 1;
        localStorage.setItem('fetchCount', newCount.toString());
        setFetchCount(newCount);

        const timeoutId = setTimeout(() => {
          setOrders([]);
          setShowTable(false);
        }, 2 * 60 * 1000); // 2 minutes

        return () => clearTimeout(timeoutId);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <p className="text-center text-gray-500 text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg font-semibold">Error: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout Orders</h2>
      {showTable ? (
        orders.length > 0 ? (
          <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200 border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.flatMap((order) =>
                order.Items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={item.ItemImage ? `${BaseUrl}api/Master/LoadItemImage?ItemImage=${item.ItemImage}` : '/default-image.png'}
                        alt={item.ItemName}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.ItemName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.Description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {dayjs(order.Date).format('MMM DD, YYYY')} {/* Format date */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      <FaRupeeSign /> {item.Rate ? item.Rate.toFixed(2) : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="mt-6 text-center">
            <NavLink
              to="/"
              className="bg-gradient-to-r from-main to-subMain hover:from-subMain hover:to-main transition duration-300 ease-in-out lg:py-3 py-2 px-6 font-semibold rounded-md text-xs lg:text-sm shadow-lg transform hover:scale-105"
            >
              Go to Home
            </NavLink>
          </div>
        </div>
        
        ) : (
          <p className="text-center text-gray-600 text-lg">No orders available</p>
        )
      ) : (
        <p className="text-center text-gray-600 text-lg">The order details have been cleared.</p>
      )}
      <div className="mt-6 text-center">
        {orders.length === 0 ? (
          <>
            <button 
              onClick={() => navigate('/shop')} 
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              View Products
            </button>
            <NavLink 
              to="/" 
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out mt-4 inline-block"
            >
              Go to Home
            </NavLink>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Table;
