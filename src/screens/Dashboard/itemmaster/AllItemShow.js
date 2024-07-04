import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from 'react-switch';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { IoReload } from 'react-icons/io5';
import { BaseUrl } from '../../../Config/config';

function AllProductShow() {
  const [items, setItems] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState('');
  const [showItems, setShowItems] = useState({});
  const [changesMade, setChangesMade] = useState(false);
  const [editItem, setEditItem] = useState(null); 
  const [editValues, setEditValues] = useState({
    Id: '',
    ItemName: '',
    ItemDescription: '',
    GST: '',
    Cess: '',
    HSNCode: '',
    BatchNum: '',
    BarCode: '',
    CAT_Number: '',
    ItemCode: '',
    SerialNumber: '',
    ManufactureDate: '',
    ExpiryDate: '',
    Rate: '',
    Unit: '',
    ItemType: '',
    WarrantyPeriod: ''
  });
  const [itemTypes, setItemTypes] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const token = localStorage.getItem('tokenadmin');
    try {
      const response = await fetch(`${BaseUrl}api/Master/Get_All_Items`, {
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
      const updatedData = data.map((item, index) => ({ ...item, SequentialId: index }));
      setItems(updatedData);
      const initialShowItems = {};
      updatedData.forEach(item => {
        initialShowItems[item.Id] = item.Status === 1;
      });
      setShowItems(initialShowItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };



  useEffect(() => {
    const fetchItemTypes = async () => {
      const token = localStorage.getItem('tokenadmin');
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

    fetchItemTypes();
  }, []);


  const toggleItem = async itemId => {
    const newStatus = !showItems[itemId] ? 1 : 0;
    const token = localStorage.getItem('tokenadmin');
    try {
      const response = await fetch(`${BaseUrl}api/Master/Disable_Enable_Item?itemId=${itemId}&Status=${newStatus}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to update item status');
      }
      setShowItems(prevState => ({
        ...prevState,
        [itemId]: !prevState[itemId]
      }));
      setChangesMade(true);
      toast.success('Item status updated successfully');
    } catch (error) {
      console.error('Error updating item status:', error);
      toast.error('Failed to update item status');
    }
  };

  const handleDelete = itemId => {
    const updatedItems = items.filter(item => item.Id !== itemId);
    const reindexedItems = updatedItems.map((item, index) => ({ ...item, SequentialId: index }));
    setItems(reindexedItems);
    toast.success('Item deleted successfully');
  };

  const handleEdit = itemId => {
    const item = items.find(item => item.Id === itemId);
    setEditItem(itemId);
    setEditValues({
      Id: item.Id,
      ItemName: item.ItemName,
      ItemDescription: item.ItemDescription,
      GST: item.GST,
      Cess: item.Cess,
      HSNCode: item.HSNCode,
      BatchNum: item.BatchNum,
      BarCode: item.BarCode,
      CAT_Number: item.CAT_Number,
      ItemCode: item.ItemCode,
      SerialNumber: item.SerialNumber,
      ManufactureDate: item.ManufactureDate,
      ExpiryDate: item.ExpiryDate,
      Rate: item.Rate,
      Unit: item.Unit,
      ItemType: item.ItemType,
      WarrantyPeriod: item.WarrantyPeriod
    });
    setSelectedItemType(item.ItemType);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setEditValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem('tokenadmin');
    try {
      const updatedItem = {
        ...editValues,
        ItemType: selectedItemType
      };
  
      const response = await fetch(`${BaseUrl}api/Master/Add_or_Update_Item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedItem)
      });
  
      if (!response.ok) {
        const errorMessage = await response.text(); // Read the error message from the response body
        throw new Error(`Failed to save item changes: ${errorMessage}`);
      }
  
      const updatedItems = items.map(item => (item.Id === editItem ? updatedItem : item));
      setItems(updatedItems);
      setEditItem(null);
      setChangesMade(true);
      toast.success('Item updated successfully');
    } catch (error) {
      console.error('Error saving item changes:', error);
      toast.error('Failed to save item changes');
    }
  };
  
  const handleSaveChanges = async () => {
    const token = localStorage.getItem('tokenadmin');
    try {
      const payload = items.map(item => ({
        ...item,
        enabled: showItems[item.Id]
      }));
      const response = await fetch(`${BaseUrl}api/Master/Add_or_Update_Item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      toast.success('Changes saved successfully');
      setChangesMade(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className="p-6 bg-navy-900 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-6 text-center text-green">All Items</h1>
      <table className="w-full border-collapse border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">Item Description</th>
            <th className="px-4 py-2">GST</th>
            <th className="px-4 py-2">CESS</th>
            <th className="px-4 py-2">HSN Code</th>
            <th className="px-4 py-2">Batch Num</th>
            <th className="px-4 py-2">Bar Code</th>
            <th className="px-4 py-2">CAT Number</th>
            <th className="px-4 py-2">Item Code</th>
            <th className="px-4 py-2">Serial Number</th>
            <th className="px-4 py-2">Manufacture Date</th>
            <th className="px-4 py-2">Expiry Date</th>
            <th className="px-4 py-2">Rate</th>
            <th className="px-4 py-2">Unit</th>
            <th className="px-4 py-2">Item Type</th>
            <th className="px-4 py-2">Warranty Period</th>
            <th className="px-4 py-2">Enable/Disable</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.Id}>
              <td className="border border-gray-300 py-2 px-4">{item.Id}</td>
              <td className="border border-gray-300 py-2 px-4">{item.ItemName}</td>
              <td className="border border-gray-300 py-2 px-4">{item.ItemDescription}</td>
              <td className="border border-gray-300 py-2 px-4">{item.GST}</td>
              <td className="border border-gray-300 py-2 px-4">{item.Cess}</td>
              <td className="border border-gray-300 py-2 px-4">{item.HSNCode}</td>
              <td className="border border-gray-300 py-2 px-4">{item.BatchNum}</td>
              <td className="border border-gray-300 py-2 px-4">{item.BarCode}</td>
              <td className="border border-gray-300 py-2 px-4">{item.CAT_Number}</td>
              <td className="border border-gray-300 py-2 px-4">{item.ItemCode}</td>
              <td className="border border-gray-300 py-2 px-4">{item.SerialNumber}</td>
              <td className="border border-gray-300 py-2 px-4">{item.ManufactureDate}</td>
              <td className="border border-gray-300 py-2 px-4">{item.ExpiryDate}</td>
              <td className="border border-gray-300 py-2 px-4">{item.Rate}</td>
              <td className="border border-gray-300 py-2 px-4">{item.Unit}</td>
              <td className="border border-gray-300 py-2 px-4">{item.ItemType}</td>
              <td className="border border-gray-300 py-2 px-4">{item.WarrantyPeriod}</td>
              <td className="border border-gray-300 py-2 px-4">
                <Switch
                  onChange={() => toggleItem(item.Id)}
                  checked={showItems[item.Id]}
                  className="react-switch"
                  onColor="#4caf50"
                  offColor="#f44336"
                  uncheckedIcon={false}
                  checkedIcon={false}
                />
              </td>
              <td className="border border-gray-300 py-2 px-4">
                <button
                  className="text-blue-500 hover:text-blue-700 focus:outline-none mr-4"
                  onClick={() => handleEdit(item.Id)}
                >
                  <MdEdit size={24} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handleDelete(item.Id)}
                >
                  <MdDeleteForever size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-2xl mb-4">Edit Item</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Item Name</label>
                <input type="text" name="ItemName" value={editValues.ItemName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Item Description</label>
                <input type="text" name="ItemDescription" value={editValues.ItemDescription} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">GST</label>
                <input type="text" name="GST" value={editValues.GST} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Cess</label>
                <input type="text" name="Cess" value={editValues.Cess} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">HSN Code</label>
                <input type="text" name="HSNCode" value={editValues.HSNCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Batch Num</label>
                <input type="text" name="BatchNum" value={editValues.BatchNum} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Bar Code</label>
                <input type="text" name="BarCode" value={editValues.BarCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">CAT Number</label>
                <input type="text" name="CAT_Number" value={editValues.CAT_Number} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Item Code</label>
                <input type="text" name="ItemCode" value={editValues.ItemCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Serial Number</label>
                <input type="text" name="SerialNumber" value={editValues.SerialNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Manufacture Date</label>
                <input type="text" name="ManufactureDate" value={editValues.ManufactureDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Expiry Date</label>
                <input type="text" name="ExpiryDate" value={editValues.ExpiryDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Rate</label>
                <input type="text" name="Rate" value={editValues.Rate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Unit</label>
                <input type="text" name="Unit" value={editValues.Unit} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Item Type</label>
                <select name="ItemType" value={selectedItemType} onChange={e => setSelectedItemType(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                  {itemTypes.map(type => (
                    <option key={type.Id} value={type.Id}>{type.ItemType}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Warranty Period</label>
                <input type="text" name="WarrantyPeriod" value={editValues.WarrantyPeriod} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Model</label>
                <input type="text" name="model" value={editValues.model} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
            </form>
            <div className="flex justify-end">
              <button onClick={() => setEditItem(null)} className="bg-red-500 text-white p-2 rounded mr-2">Cancel</button>
              <button onClick={handleSaveEdit} className="bg-green-500 text-white p-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProductShow;
