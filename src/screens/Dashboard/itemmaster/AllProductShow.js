import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from 'react-switch';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { IoReload } from 'react-icons/io5';
import { BaseUrl } from '../../../Config/config';

function AllProductShow() {
  const [items, setItems] = useState([]);
  const [showItems, setShowItems] = useState({});
  const [changesMade, setChangesMade] = useState(false);
  const [editItem, setEditItem] = useState(null); 
  const [editValues, setEditValues] = useState({
    ItemType: '',
    HSNCode: '',
    GST: '',
    Code: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const token = localStorage.getItem('token admin');
    try {
      const response = await fetch(`${BaseUrl}api/Master/GetItemMaster?type=0`, {
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

  const toggleItem = async itemId => {
    const newStatus = !showItems[itemId] ? 1 : 0;
    const token = localStorage.getItem('token admin');
    try {
      const response = await fetch(`${BaseUrl}api/Master/ItemMasterEnable_or_Disable?Id=${itemId}&Status=${newStatus}`, {
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
      ItemType: item.ItemType,
      HSNCode: item.HSNCode,
      GST: item.GST,
      Code: item.Code
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setEditValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem('token admin');
    try {
      const updatedItem = {
        ...editItem,
        ItemType: editValues.ItemType,
        HSNCode: editValues.HSNCode,
        GST: editValues.GST,
        Code: editValues.Code
      };

      const response = await fetch(`${BaseUrl}api/Master/ItemMasterCreate_or_Update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedItem)
      });

      if (!response.ok) {
        throw new Error('Failed to save item changes');
      }

      const updatedItems = items.map(item => (item.Id === editItem.Id ? updatedItem : item));
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
    const token = localStorage.getItem('token admin');
    try {
      const payload = items.map(item => ({
        ...item,
        enabled: showItems[item.Id]
      }));
      const response = await fetch(`${BaseUrl}api/Master/UpdateItems`, {
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
<tr className="bg-blue-500 text-white">
<th className="bg-gray-700 rounded px-4 py-2">NO</th>
<th className="bg-gray-700 rounded px-4 py-2">ID</th>
<th className="bg-gray-700 rounded px-4 py-2">Item Type</th>
<th className="bg-gray-700 rounded px-4 py-2">HSN Code</th>
<th className="bg-gray-700 rounded px-4 py-2">GST</th>
<th className="bg-gray-700 rounded px-4 py-2">Code</th>
<th className="bg-gray-700 rounded px-4 py-2">Enable/Disable</th>
<th className="bg-gray-700 rounded px-4 py-2">Actions</th>
</tr>
</thead>
<tbody>
{items.map(item => (
<tr key={item.Id}>
<td className="border border-gray-300 py-2 px-4">{item.SequentialId}</td>
<td className="border border-gray-300 py-2 px-4">{item.Id}</td>
<td className="border border-gray-300 py-2 px-4">{item.ItemType}</td>
<td className="border border-gray-300 py-2 px-4">{item.HSNCode}</td>
<td className="border border-gray-300 py-2 px-4">{item.GST}</td>
<td className="border border-gray-300 py-2 px-4">{item.Code}</td>
<td className="border border-gray-300 py-2 px-4 text-center">
<Switch
checked={showItems[item.Id]}
onChange={() => toggleItem(item.Id)}
offColor="#888"
onColor="#0f0"
uncheckedIcon={false}
checkedIcon={false}
/>
</td>
<td className="border border-gray-300 py-2 px-4 text-center">
<button onClick={() => handleEdit(item.Id)} className="ml-2">
<MdEdit />
</button>
<button onClick={() => handleDelete(item.Id)} className="ml-2">
<MdDeleteForever />
</button>
</td>
</tr>
))}
</tbody>
</table>
{editItem && (
<div className="mt-6 p-4 border rounded shadow-md bg-white">
<h2 className="text-xl mb-4">Edit Item</h2>
<div className="mb-4">
<label className="block mb-2">Item Type</label>
<input
           type="text"
           name="ItemType"
           value={editValues.ItemType}
           onChange={handleChange}
           className="border px-4 py-2 w-full"
         />
</div>
<div className="mb-4">
<label className="block mb-2">HSN Code</label>
<input
           type="text"
           name="HSNCode"
           value={editValues.HSNCode}
           onChange={handleChange}
           className="border px-4 py-2 w-full"
         />
</div>
<div className="mb-4">
<label className="block mb-2">GST</label>
<input
           type="text"
           name="GST"
           value={editValues.GST}
           onChange={handleChange}
           className="border px-4 py-2 w-full"
         />
</div>
<div className="mb-4">
<label className="block mb-2">Code</label>
<input
           type="text"
           name="Code"
           value={editValues.Code}
           onChange={handleChange}
           className="border px-4 py-2 w-full"
         />
</div>
<button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
Save
</button>
<button onClick={() => setEditItem(null)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">
Cancel
</button>
</div>
)}
{changesMade && (
<div className="text-center mt-4">
<button onClick={handleSaveChanges} className="bg-green-500 text-white px-4 py-2 rounded-md">
Save Changes
</button>
</div>
)}
</div>
);
}

export default AllProductShow;
