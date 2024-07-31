import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteForever } from "react-icons/md";
import { BaseUrl } from '../../Config/config';
import { useNavigate } from 'react-router-dom';

function DashboardProducts() {
  
  const navigate = useNavigate();

  useEffect(() => {
      const tokenadmin = localStorage.getItem('tokenadmin');
      if (!tokenadmin) {
          navigate('/AdminLogin');
      }
  }, [navigate]);

  const [tableData, setTableData] = useState([]); // Ensure tableData is initialized as an empty array

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('tableData') || '[]';
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setTableData(parsedData);
        }
      } catch (error) {
        console.error('Failed to parse stored data:', error);
      }
    }
  }, []); // Empty dependency array - runs only once on mount

  // Save data to localStorage whenever tableData changes
  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  const [newRowItemType, setNewRowItemType] = useState('');
  const [newRowHSNCode, setNewRowHSNCode] = useState('');
  const [newRowGST, setNewRowGST] = useState('');
  const [newRowCode, setNewRowCode] = useState('');

  const handleCreateOrUpdateData = async () => {
    const token = localStorage.getItem('tokenadmin');
    const updatedTableData = [];

    for (let row of tableData) {
      try {
        const response = await fetch(
          BaseUrl + 'api/Master/ItemMasterCreate_or_Update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(row),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Success:', result);
        updatedTableData.push(row);
        toast.success(`Row with ID ${row.Id} saved successfully`);
      } catch (error) {
        console.error('Error:', error);
        toast.error(`Failed to save row with ID ${row.Id}`);
      }
      window.location.reload();
    }

    // Update the state with the successfully saved rows
    setTableData(updatedTableData);
  };

  const handleNewRowSubmit = e => {
    e.preventDefault();
    const newRowId = tableData.length === 0 ? 0 : Math.max(...tableData.map(row => row.Id)) + 1;
    const newRow = {
      Id: newRowId,
      ItemType: newRowItemType,
      HSNCode: 0,
      GST: 0,
      Code: newRowCode,
    };
    setTableData([...tableData, newRow]);
    setNewRowItemType('');
    setNewRowHSNCode('');
    setNewRowGST('');
    setNewRowCode('');
  };

  const handleEditRow = (id, field, value) => {
    const updatedData = tableData.map(row =>
      row.Id === id ? { ...row, [field]: value } : row
    );
    setTableData(updatedData);
  };

  const handleDeleteRow = id => {
    const updatedData = tableData.filter(row => row.Id !== id);
    setTableData(updatedData);
    toast.success('Row deleted');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Admin Page</h1>
      <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleNewRowSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Item Type"
            value={newRowItemType}
            onChange={e => setNewRowItemType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="HSN Code"
            value={newRowHSNCode}
            onChange={e => setNewRowHSNCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div> */}
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="GST"
            value={newRowGST}
            onChange={e => setNewRowGST(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div> */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Code"
            value={newRowCode}
            onChange={e => setNewRowCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>
      <table className="w-full border-collapse border border-gray-300 mt-6 bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-600 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">ItemType</th>
            {/* <th className="px-4 py-2">HSNCode</th> */}
            {/* <th className="px-4 py-2">GST</th> */}
            <th className="px-4 py-2">Code</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(row => (
            <tr key={row.Id} className="odd:bg-gray-100 even:bg-gray-200 text-gray-700">
              <td className="border border-gray-300 py-2 px-4">{row.Id}</td>
              <td className="border border-gray-300 py-2 px-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={row.ItemType}
                  onChange={e => handleEditRow(row.Id, 'ItemType', e.target.value)}
                />
              </td>
              <td className="border border-gray-300 py-2 px-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={row.HSNCode}
                  onChange={e => handleEditRow(row.Id, 'HSNCode', e.target.value)}
                />
              </td>
              {/* <td className="border border-gray-300 py-2 px-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={row.GST}
                  onChange={e => handleEditRow(row.Id, 'GST', e.target.value)}
                />
              </td> */}
              <td className="border border-gray-300 py-2 px-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={row.Code}
                  onChange={e => handleEditRow(row.Id, 'Code', e.target.value)}
                />
              </td>
              <td className="border border-gray-300 py-2 px-4 text-center">
                <button
                  onClick={() => handleDeleteRow(row.Id)}
                  className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                >
                  <MdDeleteForever size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-center">
        <button
          onClick={handleCreateOrUpdateData}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default DashboardProducts;
