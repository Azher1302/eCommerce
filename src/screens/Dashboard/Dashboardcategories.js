import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DashboardCategories() {
  const [tableData, setTableData] = useState(() => {
    const storedData = localStorage.getItem('tableData');
    return storedData ? JSON.parse(storedData) : {};
  });
  const [newRowItemCode, setNewRowItemCode] = useState('');
  const [newRowItemType, setNewRowItemType] = useState('');
  const [newRowGST, setNewRowGST] = useState('');
  const [newRowHSN, setNewRowHSN] = useState('');

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  const getToken = () => {
    // Implement this function to get the token from your application's authentication mechanism
    // Example: return localStorage.getItem('accessToken');
    // Ensure you handle token retrieval and storage securely in your application
    return 'your_access_token_here'; // Replace this with your actual token retrieval logic
  };

  const handleCreateOrUpdateData = async () => {
    try {
      const token = getToken(); // Fetch the token

      const response = await axios.post(
        'https://api.onlineshop.initstore.com/api/Master/ItemMasterCreate_or_Update',
        Object.values(tableData), // Pass only values of the object
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      toast.success('Changes saved');
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized: Please log in to continue');
      } else {
        toast.error('Failed to save changes');
      }
    }
  };

  const handleNewRowSubmit = e => {
    e.preventDefault();
    const newRowId = Object.keys(tableData).length === 0 ? 0 : Math.max(...Object.keys(tableData)) + 1;
    const newRow = { 
      id: newRowId,
      itemtype: newRowItemType, 
      itemcode: newRowItemCode,
      gst: newRowGST,
      hsn: newRowHSN,
    };
    setTableData({...tableData, [newRowId]: newRow});
    setNewRowItemType('');
    setNewRowItemCode('');
    setNewRowGST('');
    setNewRowHSN('');
  };

  return (
    <div className="p-6 bg-navy-900 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-6 text-center text-green">Admin Page</h1>
      <form className="mt-8" onSubmit={handleNewRowSubmit}>
        <input
          type="text"
          placeholder="Item Type" 
          value={newRowItemType}
          onChange={e => setNewRowItemType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Item Code "
          value={newRowItemCode}
          onChange={e => setNewRowItemCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          placeholder="GST "
          value={newRowGST}
          onChange={e => setNewRowGST(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          placeholder="HSN "
          value={newRowHSN}
          onChange={e => setNewRowHSN(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
          type="submit"
          className="bg-white-500 hover:bg-white-600 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      <div className="mt-8">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleCreateOrUpdateData}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export const TableExample1 = () => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    1
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">Jone Doe</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    jonne62@gmail.com
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-green-500 hover:text-green-700" href="#">
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-red-500 hover:text-red-700" href="#">
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    2
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">Jone Doe</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    jonne62@gmail.com
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-green-300 hover:text-green-700" href="#">
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-red-500 hover:text-red-700" href="#">
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    3
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">Jone Doe</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    jonne62@gmail.com
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-green-500 hover:text-green-700" href="#">
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-red-500 hover:text-red-700" href="#">
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    4
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    Mary Poppins
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    marypoppins@gmail.com
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-green-300 hover:text-green-700" href="#">
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a className="text-red-500 hover:text-red-700" href="#">
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default DashboardCategories;
