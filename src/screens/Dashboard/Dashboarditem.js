import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteForever } from "react-icons/md";
import { BaseUrl } from '../../Config/config';
import { useNavigate } from 'react-router-dom';

function DashboardItem() {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenAdmin = localStorage.getItem('token admin');
    if (!tokenAdmin) {
      navigate('/AdminLogin');
    }
  }, [navigate]);

  const [tableData, setTableData] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('tableData');
    const storedToken = localStorage.getItem('token admin');
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
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  useEffect(() => {
    const fetchItemTypes = async () => {
      try {
        const response = await fetch(`${BaseUrl}api/Master/GetItemMaster?type=0`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch item types');
        }
        const data = await response.json();
        setItemTypes(data);
      } catch (error) {
        console.error('Error fetching item types:', error);
      }
    };

    if (token) {
      fetchItemTypes();
    }
  }, [token]);

  const [newRowItemName, setNewRowItemName] = useState('');
  const [newRowItemDescription, setNewRowItemDescription] = useState('');
  const [newRowGst, setNewRowGst] = useState('');
  const [newRowCess, setNewRowCess] = useState('');
  const [newRowHsnCode, setNewRowHsnCode] = useState('');
  const [newRowBatchNum, setNewRowBatchNum] = useState('');
  const [newRowBarCode, setNewRowBarCode] = useState('');
  const [newRowCatNumber, setNewRowCatNumber] = useState('');
  const [newRowItemCode, setNewRowItemCode] = useState('');
  const [newRowSerialNumber, setNewRowSerialNumber] = useState('');
  const [newRowManufactureDate, setNewRowManufactureDate] = useState('');
  const [newRowExpiryDate, setNewRowExpiryDate] = useState('');
  const [newRowRate, setNewRowRate] = useState('');
  const [newRowUnit, setNewRowUnit] = useState('');
  const [selectedItemType, setSelectedItemType] = useState('');
  const [newRowWarrantyPeriod, setNewRowWarrantyPeriod] = useState('');

  const handleCreateOrUpdateData = async () => {
    const token = localStorage.getItem('token admin');
    const updatedTableData = [];

    for (let row of tableData) {
      try {
        const response = await fetch(`${BaseUrl}api/Master/Add_or_Update_Item`, {
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
        toast.success(`Row with ID ${row.ID} saved successfully`);
      } catch (error) {
        console.error('Error:', error);
        toast.error(`Failed to save row with ID ${row.ID}`);
      }
    }

    setTableData(updatedTableData);
  };

  const handleNewRowSubmit = e => {
    e.preventDefault();
    const newRowId = tableData.length === 0 ? 0 : Math.max(...tableData.map(row => row.ID)) + 1;
    const newRow = {
      ID: newRowId,
      ItemName: newRowItemName,
      ItemDescription: newRowItemDescription,
      GST: Number(newRowGst),
      Cess: Number(newRowCess),
      HSNCode: newRowHsnCode,
      BatchNum: Number(newRowBatchNum),
      BarCode: newRowBarCode,
      CAT_Number: newRowCatNumber,
      ItemCode: newRowItemCode,
      SerialNumber: newRowSerialNumber,
      ManufactureDate: newRowManufactureDate,
      ExpiryDate: newRowExpiryDate,
      Rate: Number(newRowRate),
      Unit: Number(newRowUnit),
      ItemType: Number(selectedItemType),
      WarrantyPeriod: Number(newRowWarrantyPeriod),
      Status: 1
    };
    setTableData([...tableData, newRow]);

    // Clear the form inputs after submission
    setNewRowItemName('');
    setNewRowItemDescription('');
    setNewRowGst('');
    setNewRowCess('');
    setNewRowHsnCode('');
    setNewRowBatchNum('');
    setNewRowBarCode('');
    setNewRowCatNumber('');
    setNewRowItemCode('');
    setNewRowSerialNumber('');
    setNewRowManufactureDate('');
    setNewRowExpiryDate('');
    setNewRowRate('');
    setNewRowUnit('');
    setSelectedItemType('');
    setNewRowWarrantyPeriod('');
  };

  const handleEditRow = (id, field, value) => {
    const updatedData = tableData.map(row =>
      row.ID === id ? { ...row, [field]: value } : row
    );
    setTableData(updatedData);
  };

  const handleDeleteRow = id => {
    const updatedData = tableData.filter(row => row.ID !== id);
    setTableData(updatedData);
    toast.success('Row deleted');
  };

  const handleToggleStatus = id => {
    const updatedData = tableData.map(row =>
      row.ID === id ? { ...row, Status: row.Status === 0 ? 1 : 0 } : row
    );
    setTableData(updatedData);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen text-black bg-gray-100">
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Admin Page</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8" onSubmit={handleNewRowSubmit}>
  <input
    type="text"
    placeholder="Item Name"
    value={newRowItemName}
    onChange={e => setNewRowItemName(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <input
    type="text"
    placeholder="Item Description"
    value={newRowItemDescription}
    onChange={e => setNewRowItemDescription(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <input
    type="number"
    placeholder="GST"
    value={newRowGst}
    onChange={e => setNewRowGst(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <input
    type="number"
    placeholder="CESS"
    value={newRowCess}
    onChange={e => setNewRowCess(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <input
    type="text"
    placeholder="HSN Code"
    value={newRowHsnCode}
    onChange={e => setNewRowHsnCode(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <input
    type="number"
    placeholder="Batch Number"
    value={newRowBatchNum}
    onChange={e => setNewRowBatchNum(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <input
    type="text"
    placeholder="Bar Code"
    value={newRowBarCode}
    onChange={e => setNewRowBarCode(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <input
    type="text"
    placeholder="Catalog Number"
    value={newRowCatNumber}
    onChange={e => setNewRowCatNumber(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <input
    type="text"
    placeholder="Item Code"
    value={newRowItemCode}
    onChange={e => setNewRowItemCode(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <input
    type="text"
    placeholder="Serial Number"
    value={newRowSerialNumber}
    onChange={e => setNewRowSerialNumber(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <div className="w-full p-2 border border-gray-300 rounded mb-2 flex flex-col">
    <label className="text-gray-700 mb-1">Manufacture Date</label>
    <input
      type="date"
      value={newRowManufactureDate}
      onChange={e => setNewRowManufactureDate(e.target.value)}
      className="p-2 border border-gray-300 rounded"
    />
  </div>
  <div className="w-full p-2 border border-gray-300 rounded mb-2 flex flex-col">
    <label className="text-gray-700 mb-1">Expiry Date</label>
    <input
      type="date"
      value={newRowExpiryDate}
      onChange={e => setNewRowExpiryDate(e.target.value)}
      className="p-2 border border-gray-300 rounded"
    />
  </div>
  <input
    type="number"
    placeholder="Rate"
    value={newRowRate}
    onChange={e => setNewRowRate(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <input
    type="number"
    placeholder="Unit"
    value={newRowUnit}
    onChange={e => setNewRowUnit(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <select
    value={selectedItemType}
    onChange={e => setSelectedItemType(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  >
    <option value="">Select Item Type</option>
    {itemTypes.map(item => (
      <option key={item.Id} value={item.Id}>
        {item.ItemType}, {item.Id}
      </option>
    ))}
  </select>
  <input
    type="number"
    placeholder="Warranty Period"
    value={newRowWarrantyPeriod}
    onChange={e => setNewRowWarrantyPeriod(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded mb-2"
  />
  <button
    type="submit"
    className="bg-blue-600 text-white p-2 rounded w-full mt-2 col-span-1 md:col-span-2 lg:col-span-3"
  >
    Add Row
  </button>
</form>


      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Data Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white text-black rounded-md shadow-md">
            <thead>
              <tr>
                <th className="p-2 border">Item Name</th>
                <th className="p-2 border">Item Description</th>
                <th className="p-2 border">GST</th>
                <th className="p-2 border">CESS</th>
                <th className="p-2 border">HSN Code</th>
                <th className="p-2 border">Batch Number</th>
                <th className="p-2 border">Bar Code</th>
                <th className="p-2 border">Catalog Number</th>
                <th className="p-2 border">Item Code</th>
                <th className="p-2 border">Serial Number</th>
                <th className="p-2 border">Manufacture Date</th>
                <th className="p-2 border">Expiry Date</th>
                <th className="p-2 border">Rate</th>
                <th className="p-2 border">Unit</th>
                <th className="p-2 border">Item Type</th>
                <th className="p-2 border">Warranty Period</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(row => {
                const itemType = itemTypes.find(item => item.Id === row.ItemType);
                return (
                  <tr key={row.ID}>
                    <td className="p-2 border">{row.ItemName}</td>
                    <td className="p-2 border">{row.ItemDescription}</td>
                    <td className="p-2 border">{row.GST}</td>
                    <td className="p-2 border">{row.Cess}</td>
                    <td className="p-2 border">{row.HSNCode}</td>
                    <td className="p-2 border">{row.BatchNum}</td>
                    <td className="p-2 border">{row.BarCode}</td>
                    <td className="p-2 border">{row.CAT_Number}</td>
                    <td className="p-2 border">{row.ItemCode}</td>
                    <td className="p-2 border">{row.SerialNumber}</td>
                    <td className="p-2 border">{row.ManufactureDate}</td>
                    <td className="p-2 border">{row.ExpiryDate}</td>
                    <td className="p-2 border">{row.Rate}</td>
                    <td className="p-2 border">{row.Unit}</td>
                    <td className="p-2 border">{itemType ? `${itemType.ItemType}, ${itemType.Id}` : 'Unknown'}</td>
                    <td className="p-2 border">{row.WarrantyPeriod}</td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleDeleteRow(row.ID)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdDeleteForever size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleCreateOrUpdateData}
          className="bg-blue-600 text-white p-2 rounded mt-4 w-full"
        >
          Save Table
        </button>
      </div>
    </div>
  );
}

export default DashboardItem;
