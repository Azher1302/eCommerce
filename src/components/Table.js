import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GoEye } from 'react-icons/go';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaSpinner } from 'react-icons/fa';

function Table() {
  const [CartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletedCount, setDeletedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('CartItems')) || [];
    setCartItems(storedCartItems);

    const storedDeletedCount = parseInt(localStorage.getItem('deletedCount'), 10) || 0;
    setDeletedCount(storedDeletedCount);

    setLoading(false);
  }, []);

  const Head = 'text-xs font-semibold px-6 py-4 uppercase bg-gray-800 text-white';
  const Text = 'px-5 text-sm py-3 leading-6 text-gray-700 whitespace-nowrap';
  const Image = 'w-12 h-12 object-cover rounded';

  const Rows = ({ item }) => (
    <tr key={item.id} className="hover:bg-gray-100 transition duration-150">
      <td className={`${Text} font-medium`}>{item.id}</td>
      <td className={`${Text} text-center`}>
        <img src={item.image} alt={item.title} className={Image} />
      </td>
      <td className={`${Text} text-center`}>{item.title}</td>
      <td className={`${Text} text-center`}>${item.price.toFixed(2)}</td>
      <td className={`${Text} text-center`}>{item.quantity}</td>
      <td className={`${Text} text-center`}>${(item.price * item.quantity).toFixed(2)}</td>
      <td className={`${Text} text-center flex justify-center gap-2`}>
        <button
          className="border border-red-500 text-red-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition duration-150"
          onClick={() => handleDelete(item.id)}
        >
          <RiDeleteBinLine />
        </button>
        <Link
          to={`/product/${item.id}`}
          className="border border-blue-500 text-blue-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-500 hover:text-white transition duration-150"
        >
          <GoEye />
        </Link>
      </td>
    </tr>
  );

  const handleDelete = (id) => {
    const updatedCartItems = CartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('CartItems', JSON.stringify(updatedCartItems));

    const newDeletedCount = deletedCount + 1;
    setDeletedCount(newDeletedCount);
    localStorage.setItem('deletedCount', newDeletedCount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <FaSpinner className="animate-spin text-4xl text-main" />
      </div>
    );
  }

  if (CartItems.length === 0) {
    navigate('/shop');
    return null; // Return null to prevent rendering anything else
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-4 md:p-10">
      <div className="max-w-6xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-lg">
        <h2 className="font-semibold text-2xl mb-6 text-center">My Orders</h2>
        <div className="w-full overflow-x-auto">
          <table className="table-auto min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-800">
                <th scope="col" className={`${Head} text-left`}>ID</th>
                <th scope="col" className={`${Head} text-center`}>Image</th>
                <th scope="col" className={`${Head} text-center`}>Title</th>
                <th scope="col" className={`${Head} text-center`}>Price</th>
                <th scope="col" className={`${Head} text-center`}>Quantity</th>
                <th scope="col" className={`${Head} text-center`}>Total</th>
                <th scope="col" className={`${Head} text-center`}>Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {CartItems.map((item) => (
                <Rows key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <NavLink
            to="/"
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-150 inline-block"
          >
            Go to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Table;
