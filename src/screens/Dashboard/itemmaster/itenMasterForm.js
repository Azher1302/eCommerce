import React, { useState } from 'react';

const ItemMasterForm = ({ addItem }) => {
  const [item, setItem] = useState({
    ItemType: '',
    HSNCode: '',
    GST: '',
    Code: '',
    Status: '',
    SysTime: '', // Corrected from 'Systime' to 'SysTime'
    CreatedBy: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(item);
    setItem({
      ItemType: '',
      HSNCode: '',
      GST: '',
      Code: '',
      Status: '',
      SysTime: '', // Corrected from 'Systime' to 'SysTime'
      CreatedBy: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-4">
      <input type="text" name="ItemType" value={item.ItemType} onChange={handleChange} placeholder="Item Type" className="mb-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input type="text" name="HSNCode" value={item.HSNCode} onChange={handleChange} placeholder="HSN Code" className="mb-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input type="text" name="GST" value={item.GST} onChange={handleChange} placeholder="GST" className="mb-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input type="text" name="Code" value={item.Code} onChange={handleChange} placeholder="Code" className="mb-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input type="text" name="Status" value={item.Status} onChange={handleChange} placeholder="Status" className="mb-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input type="text" name="SysTime" value={item.SysTime} onChange={handleChange} placeholder="SysTime" className="mb-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input type="text" name="CreatedBy" value={item.CreatedBy} onChange={handleChange} placeholder="Created By" className="mb-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Add Item</button>
      {/* <button type="submit" onChange={fetchdata}  className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">save change</button> */}

    </form>
  );
};

export default ItemMasterForm;
