



// orginal  ||^^||











import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from 'react-switch';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { BaseUrl } from '../../../Config/config';

function AllProductShow() {
  const maxItemsPerPage = 10;
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItemType, setSelectedItemType] = useState('');
  const [showItems, setShowItems] = useState({});
  const [changesMade, setChangesMade] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(maxItemsPerPage);
  const [displayCount, setDisplayCount] = useState(10); // Initial number of items to display

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
    WarrantyPeriod: '',
    model: '',
    imageFile: ''
  });
  const [itemTypes, setItemTypes] = useState([]);

  useEffect(() => {
    fetchItems();
    fetchItemTypes();
  }, []);

  const fetchItems = async () => {
    const token = localStorage.getItem('tokenadmin');
    try {
      const response = await fetch(`${BaseUrl}api/Master/Get_All_Items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      const updatedData = data.map((item, index) => ({
        ...item,
        SequentialId: index,
        ItemImageUrl: item.ItemImage ? `${BaseUrl}api/Master/LoadItemImage?ImageName=${item.ItemImage}` : null
      }));
      setItems(updatedData);
      const initialShowItems = {};
      updatedData.forEach(item => {
        initialShowItems[item.Id] = item.Status === 2;
      });
      setShowItems(initialShowItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchItemTypes = async () => {
    const token = localStorage.getItem('tokenadmin');
    try {
      const response = await fetch(`${BaseUrl}api/Master/GetItemMaster?type=0`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
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

  const toggleItem = async (itemId) => {
    const newStatus = showItems[itemId] ? 0 : 2;
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

  const handleDelete = async (itemId) => {
    const token = localStorage.getItem('tokenadmin');
    try {
      const response = await fetch(`${BaseUrl}api/Master/Delete_Item?itemId=${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
  
      setItems(items.filter(item => item.Id !== itemId));
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleEdit = (itemId) => {
    const item = items.find(item => item.Id === itemId);
    setEditItem(itemId);
    setEditValues({
      Id: item.Id || '',
      ItemName: item.ItemName || '',
      ItemDescription: item.ItemDescription || '',
      GST: item.GST || '',
      Cess: item.Cess || '',
      HSNCode: item.HSNCode || '',
      BatchNum: item.BatchNum || '',
      BarCode: item.BarCode || '',
      CAT_Number: item.CAT_Number || '',
      ItemCode: item.ItemCode || '',
      SerialNumber: item.SerialNumber || '',
      ManufactureDate: item.ManufactureDate || '',
      ExpiryDate: item.ExpiryDate || '',
      Rate: item.Rate || '',
      Unit: item.Unit || '',
      ItemType: item.ItemType || '',
      WarrantyPeriod: item.WarrantyPeriod || '',
      model: item.model || '',
      imageFile: item.ItemImage || ''
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setEditValues(prevValues => ({
        ...prevValues,
        imageFile: base64String
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (id) => {
    const updatedEditValues = {
      ...editValues,
      ItemType: selectedItemType,
      model: '1' // Replace with the actual model value or logic to set it
    };
  
    if (editValues.imageFile) {
      updatedEditValues.ItemImage = {
        Id: 0,
        ItemId: updatedEditValues.Id || 0,
        Image: editValues.imageFile
      };
    } else {
      updatedEditValues.ItemImage = {
        Id: 0,
        ItemId: updatedEditValues.Id || 0,
        Image: ''
      };
    }
  
    try {
      const token = localStorage.getItem('tokenadmin');
      const response = await fetch(`${BaseUrl}api/Master/Add_or_Update_Item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedEditValues)
      });
  
      if (response.ok) {
        const updatedItem = await response.json();
        setItems(items.map(item => (item.Id === updatedItem.Id ? updatedItem : item)));
        setEditItem(null);
        toast.success('Item saved successfully');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to save item: ${errorData.errors.$[0]}`);
      }
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error('Failed to save item');
    }
  };

  const handleCancelEdit = () => {
    setEditItem(null);
    setEditValues({
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
      WarrantyPeriod: '',
      model: '',
      imageFile: ''
    });
    setSelectedItemType('');
  };



  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
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
            <th className="px-4 py-2">Batch Number</th>
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
            <th className="px-4 py-2">Model</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.Id}>
              <td className="border px-4 py-2">{item.Id}</td>
              <td className="border px-4 py-2">{item.ItemName}</td>
              <td className="border px-4 py-2">{item.ItemDescription}</td>
              <td className="border px-4 py-2">{item.GST}</td>
              <td className="border px-4 py-2">{item.Cess}</td>
              <td className="border px-4 py-2">{item.HSNCode}</td>
              <td className="border px-4 py-2">{item.BatchNum}</td>
              <td className="border px-4 py-2">{item.BarCode}</td>
              <td className="border px-4 py-2">{item.CAT_Number}</td>
              <td className="border px-4 py-2">{item.ItemCode}</td>
              <td className="border px-4 py-2">{item.SerialNumber}</td>
              <td className="border px-4 py-2">{item.ManufactureDate}</td>
              <td className="border px-4 py-2">{item.ExpiryDate}</td>
              <td className="border px-4 py-2">{item.Rate}</td>
              <td className="border px-4 py-2">{item.Unit}</td>
              <td className="border px-4 py-2">{item.ItemType}</td>
              <td className="border px-4 py-2">{item.WarrantyPeriod}</td>
              <td className="border px-4 py-2">{item.model}</td>
              <td className="border px-4 py-2">
                {item.ItemImageUrl && <img src={item.ItemImageUrl} alt="item" className="w-20 h-20 object-cover" />}
              </td>
              {/* <td className="border px-4 py-2">
                <Switch
                  checked={showItems[item.Id] || false}
                  onChange={() => toggleItem(item.Id)}
                />
              </td> */}
                <td className="border border-gray-300 py-2 px-4 text-center">
                  <button
                   checked={showItems[item.Id] || false}
                    onClick={() => toggleItem(item.Id)}
                    className={`px-4 py-2 rounded-md ${showItems[item.Id] ? 'bg-red-500' : 'bg-green-500'} text-white`}
                  >
                    {showItems[item.Id] ? 'Enable' : 'Disable'}
                  </button>
                </td>
              <td className="justify-center px-4 py-2 flex space-x-2 item-">
                <button onClick={() => handleEdit(item.Id)} className="text-red-500">
                  <MdEdit size={20} />
                </button>
                <button onClick={() => handleDelete(item.Id)} className="text-blue-500">
                  <MdDeleteForever size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length < totalItems && (
        <button onClick={handleShowMore} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Load More
        </button>
      )}
      {editItem !== null && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Edit Item</h2>
          <form>
            <input type="hidden" name="Id" value={editValues.Id} />
            <label>
              Item Name:
              <input
                type="text"
                name="ItemName"
                value={editValues.ItemName}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              Item Description:
              <textarea
                name="ItemDescription"
                value={editValues.ItemDescription}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
  GST:
  <input
    type="text"
    name="GST"
    value={editValues.GST}
    onChange={handleChange}
    className={`border border-gray-300 p-2 w-full ${parseFloat(editValues.GST) > 28 ? 'border-red-500' : ''}`}
  />
  {parseFloat(editValues.GST) > 28 && (
    <p className="text-red-500 text-sm">GST cannot exceed 28%</p>
  )}
</label>

            <label>
              Cess:
              <input
                type="text"
                name="Cess"
                value={editValues.Cess}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              HSN Code:
              <input
                type="text"
                name="HSNCode"
                value={editValues.HSNCode}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              Batch Number:
              <input
                type="text"
                name="BatchNum"
                value={editValues.BatchNum}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              Bar Code:
              <input
                type="text"
                name="BarCode"
                value={editValues.BarCode}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              CAT Number:
              <input
                type="text"
                name="CAT_Number"
                value={editValues.CAT_Number}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              Item Code:
              <input
                type="text"
                name="ItemCode"
                value={editValues.ItemCode}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              Serial Number:
              <input
                type="text"
                name="SerialNumber"
                value={editValues.SerialNumber}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              Manufacture Date:
              <input
                type="date"
                name="ManufactureDate"
                value={editValues.ManufactureDate}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              Expiry Date:
              <input
                type="date"
                name="ExpiryDate"
                value={editValues.ExpiryDate}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              Rate:
              <input
                type="number"
                name="Rate"
                value={editValues.Rate}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              Unit:
              <input
                type="text"
                name="Unit"
                value={editValues.Unit}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              Item Type:
              <select
                name="ItemType"
                value={selectedItemType}
                onChange={(e) => setSelectedItemType(e.target.value)}
                className="border border-gray-300 p-2 w-full"
              >
                <option value="">Select Item Type</option>
                {itemTypes.map(type => (
                  <option key={type.Id} value={type.Id}>{type.ItemType},
                  {type.Id}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Warranty Period:
              <input
                type="text"
                name="WarrantyPeriod"
                value={editValues.WarrantyPeriod}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label>
              Model:
              <input
                type="text"
                name="model"
                value={editValues.model}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <div className="mb-4">
                    <label className="block text-white">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full p-2"
                    />
                    {editValues.imageFile && !editValues.imageFile.startsWith('data:image/') && (
                      <img
                        src={`${BaseUrl}api/Master/LoadItemImage?ImageName=${editValues.imageFile}`}
                        alt="Existing Image"
                        className="mt-2 w-24 h-24 object-cover"
                      />
                    )}
                    {editValues.imageFile && editValues.imageFile.startsWith('data:image/') && (
                      <img
                        src={`data:image/jpeg;base64,${editValues.imageFile}`}
                        alt="Preview"
                        className="mt-2 w-24 h-24 object-cover"
                      />
                    )}
                  </div>
            <div className="mt-4 flex space-x-4">
              <button
                type="button"
                onClick={() => handleSave(editValues.Id)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AllProductShow;
