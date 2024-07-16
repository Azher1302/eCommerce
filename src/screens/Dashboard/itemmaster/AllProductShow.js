// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Switch from 'react-switch';
// import { MdDeleteForever, MdEdit } from 'react-icons/md';
// import { BaseUrl } from '../../../Config/config';

// function AllProductShow() {
//   const [items, setItems] = useState([]);
//   const [selectedItemType, setSelectedItemType] = useState('');
//   const [showItems, setShowItems] = useState({});
//   const [changesMade, setChangesMade] = useState(false);
//   const [editItem, setEditItem] = useState(null);

//   const [editValues, setEditValues] = useState({
//     Id: '',
//     ItemName: '',
//     ItemDescription: '',
//     GST: '',
//     Cess: '',
//     HSNCode: '',
//     BatchNum: '',
//     BarCode: '',
//     CAT_Number: '',
//     ItemCode: '',
//     SerialNumber: '',
//     ManufactureDate: '',
//     ExpiryDate: '',
//     Rate: '',
//     Unit: '',
//     ItemType: '',
//     WarrantyPeriod: '',
//     model: '',
//     ItemImage: {
//       Id: 0,
//       ItemId: 0,
//       Image: ''
//     }
//   });
//   const [itemTypes, setItemTypes] = useState([]);

//   useEffect(() => {
//     fetchItems();
//     fetchItemTypes();
//   }, []);

//   const fetchItems = async () => {
//     const token = localStorage.getItem('tokenadmin');
//     try {
//       const response = await fetch(`${BaseUrl}api/Master/Get_All_Items`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           // Authorization: `Bearer ${token}`
//         }
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch items');
//       }
//       const data = await response.json();
//       const updatedData = data.map((item, index) => ({
//         ...item,
//         SequentialId: index,
//         ItemImageUrl: item.ItemImage ? `${BaseUrl}api/Master/LoadItemImage?ImageName=${item.ItemImage}` : null
//       }));
//       setItems(updatedData);
//       const initialShowItems = {};
//       updatedData.forEach(item => {
//         initialShowItems[item.Id] = item.Status === 1;
//       });
//       setShowItems(initialShowItems);
//     } catch (error) {
//       console.error('Error fetching items:', error);
//     }
//   };

//   const fetchItemTypes = async () => {
//     const token = localStorage.getItem('tokenadmin');
//     try {
//       const response = await fetch(`${BaseUrl}api/Master/GetItemMaster?type=0`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           // 'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch item types');
//       }
//       const data = await response.json();
//       setItemTypes(data);
//     } catch (error) {
//       console.error('Error fetching item types:', error);
//     }
//   };

//   const toggleItem = async itemId => {
//     const newStatus = !showItems[itemId] ? 1 : 0;
//     const token = localStorage.getItem('tokenadmin');
//     try {
//       const response = await fetch(`${BaseUrl}api/Master/Disable_Enable_Item?itemId=${itemId}&Status=${newStatus}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update item status');
//       }
//       setShowItems(prevState => ({
//         ...prevState,
//         [itemId]: !prevState[itemId]
//       }));
//       setChangesMade(true);
//       toast.success('Item status updated successfully');
//     } catch (error) {
//       console.error('Error updating item status:', error);
//       toast.error('Failed to update item status');
//     }
//   };

//   const handleDelete = itemId => {
//     const updatedItems = items.filter(item => item.Id !== itemId);
//     const reindexedItems = updatedItems.map((item, index) => ({ ...item, SequentialId: index }));
//     setItems(reindexedItems);
//     toast.success('Item deleted successfully');
//   };

//   const handleEdit = itemId => {
//     const item = items.find(item => item.Id === itemId);
//     setEditItem(itemId);
//     setEditValues({
//       Id: item.Id,
//       ItemName: item.ItemName,
//       ItemDescription: item.ItemDescription,
//       GST: item.GST,
//       Cess: item.Cess,
//       HSNCode: item.HSNCode,
//       BatchNum: item.BatchNum,
//       BarCode: item.BarCode,
//       CAT_Number: item.CAT_Number,
//       ItemCode: item.ItemCode,
//       SerialNumber: item.SerialNumber,
//       ManufactureDate: item.ManufactureDate,
//       ExpiryDate: item.ExpiryDate,
//       Rate: item.Rate,
//       Unit: item.Unit,
//       ItemType: item.ItemType,
//       WarrantyPeriod: item.WarrantyPeriod,
//       model: item.model,
//       ItemImage: item.ItemImage ? item.ItemImage.Image : ''
//     });
//     setSelectedItemType(item.ItemType);
//   };

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setEditValues(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       // Strip the prefix "data:image/png;base64," from the base64 string
//       const base64String = reader.result.split(',')[1];
//       setEditValues((prevRow) => ({
//         ...prevRow,
//         imageFile: base64String,
//       }));
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveEdit = async () => {
//     const token = localStorage.getItem('tokenadmin');
//     try {
//       const updatedItem = {
//         ...editValues,
//         ItemType: parseInt(selectedItemType, 10)
//       };

//       const response = await fetch(`${BaseUrl}api/Master/Add_or_Update_Item`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(updatedItem)
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(`Failed to save item changes: ${errorMessage}`);
//       }

//       const updatedItems = items.map(item => (item.Id === editItem ? updatedItem : item));
//       setItems(updatedItems);
//       setEditItem(null);
//       setChangesMade(true);
//       toast.success('Item updated successfully');
//     } catch (error) {
//       console.error('Error saving item changes:', error);
//       toast.error('Failed to save item changes');
//     }
//   };

//   const handleSaveChanges = async () => {
//     const token = localStorage.getItem('tokenadmin');
//     try {
//       const payload = items.map(item => ({
//         ...item,
//         enabled: showItems[item.Id]
//       }));
//       const response = await fetch(`${BaseUrl}api/Master/Add_or_Update_Item`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save changes');
//       }

//       toast.success('Changes saved successfully');
//       setChangesMade(false);
//     } catch (error) {
//       console.error('Error saving changes:', error);
//     }
//   };

//   return (
//     <div className="p-6 bg-navy-900 min-h-screen">
//       <ToastContainer />
//       <h1 className="text-3xl font-semibold mb-6 text-center text-green">All Items</h1>
//       <table className="w-full border-collapse border border-gray-300 mt-6">
//         <thead>
//           <tr className="bg-gray-700 text-white">
//             <th className="px-4 py-2">ID</th>
//             <th className="px-4 py-2">Item Name</th>
//             <th className="px-4 py-2">Item Description</th>
//             <th className="px-4 py-2">GST</th>
//             <th className="px-4 py-2">CESS</th>
//             <th className="px-4 py-2">HSN Code</th>
//             <th className="px-4 py-2">Batch Num</th>
//             <th className="px-4 py-2">Bar Code</th>
//             <th className="px-4 py-2">CAT Number</th>
//             <th className="px-4 py-2">Item Code</th>
//             <th className="px-4 py-2">Serial Number</th>
//             <th className="px-4 py-2">Manufacture Date</th>
//             <th className="px-4 py-2">Expiry Date</th>
//             <th className="px-4 py-2">Rate</th>
//             <th className="px-4 py-2">Unit</th>
//             <th className="px-4 py-2">Item Type</th>
//             <th className="px-4 py-2">Warranty Period</th>
//             <th className="px-4 py-2">Model</th>
//             <th className="px-4 py-2">Item Image</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map(item => (
//             <tr key={item.Id} className="border-b border-gray-300">
//               <td className="px-4 py-2 text-center">{item.SequentialId + 1}</td>
//               <td className="px-4 py-2 text-center">{item.ItemName}</td>
//               <td className="px-4 py-2 text-center">{item.ItemDescription}</td>
//               <td className="px-4 py-2 text-center">{item.GST}</td>
//               <td className="px-4 py-2 text-center">{item.Cess}</td>
//               <td className="px-4 py-2 text-center">{item.HSNCode}</td>
//               <td className="px-4 py-2 text-center">{item.BatchNum}</td>
//               <td className="px-4 py-2 text-center">{item.BarCode}</td>
//               <td className="px-4 py-2 text-center">{item.CAT_Number}</td>
//               <td className="px-4 py-2 text-center">{item.ItemCode}</td>
//               <td className="px-4 py-2 text-center">{item.SerialNumber}</td>
//               <td className="px-4 py-2 text-center">{item.ManufactureDate}</td>
//               <td className="px-4 py-2 text-center">{item.ExpiryDate}</td>
//               <td className="px-4 py-2 text-center">{item.Rate}</td>
//               <td className="px-4 py-2 text-center">{item.Unit}</td>
//               <td className="px-4 py-2 text-center">{item.ItemType}</td>
//               <td className="px-4 py-2 text-center">{item.WarrantyPeriod}</td>
//               <td className="px-4 py-2 text-center">{item.model}</td>
//               <td className="px-4 py-2 text-center">
//                 {item.ItemImageUrl ? (
//                   <img
//                     src={item.ItemImageUrl}
//                     alt={item.ItemName}
//                     className="w-16 h-16 object-cover"
//                   />
//                 ) : (
//                   <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">No Image</div>
//                 )}
//               </td>
//               <td className="px-4 py-2 text-center">
//                 <button onClick={() => handleEdit(item.Id)} className="text-yellow-500 hover:text-yellow-700 mx-2">
//                   <MdEdit size={20} />
//                 </button>
//                 <button onClick={() => handleDelete(item.Id)} className="text-red-500 hover:text-red-700 mx-2">
//                   <MdDeleteForever size={20} />
//                 </button>
//                 <Switch
//                   checked={showItems[item.Id] || false}
//                   onChange={() => toggleItem(item.Id)}
//                   className="ml-2"
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {changesMade && (
//         <div className="mt-6">
//           <button
//             onClick={handleSaveChanges}
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Save Changes
//           </button>
//         </div>
//       )}

//       {editItem !== null && (
//         <div className="mt-6 p-6 bg-gray-200">
//           <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
//           <form>
//             <label className="block mb-2">
//               Item Name:
//               <input
//                 type="text"
//                 name="ItemName"
//                 value={editValues.ItemName}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               Item Description:
//               <input
//                 type="text"
//                 name="ItemDescription"
//                 value={editValues.ItemDescription}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               GST:
//               <input
//                 type="text"
//                 name="GST"
//                 value={editValues.GST}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               Cess:
//               <input
//                 type="text"
//                 name="Cess"
//                 value={editValues.Cess}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               HSN Code:
//               <input
//                 type="text"
//                 name="HSNCode"
//                 value={editValues.HSNCode}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               Batch Num:
//               <input
//                 type="text"
//                 name="BatchNum"
//                 value={editValues.BatchNum}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               Bar Code:
//               <input
//                 type="text"
//                 name="BarCode"
//                 value={editValues.BarCode}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               CAT Number:
//               <input
//                 type="text"
//                 name="CAT_Number"
//                 value={editValues.CAT_Number}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               Item Code:
//               <input
//                 type="text"
//                 name="ItemCode"
//                 value={editValues.ItemCode}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               Serial Number:
//               <input
//                 type="text"
//                 name="SerialNumber"
//                 value={editValues.SerialNumber}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               Manufacture Date:
//               <input
//                 type="date"
//                 name="ManufactureDate"
//                 value={editValues.ManufactureDate}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               Expiry Date:
//               <input
//                 type="date"
//                 name="ExpiryDate"
//                 value={editValues.ExpiryDate}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               Rate:
//               <input
//                 type="number"
//                 name="Rate"
//                 value={editValues.Rate}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               Unit:
//               <input
//                 type="text"
//                 name="Unit"
//                 value={editValues.Unit}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               Item Type:
//               <select
//                 name="ItemType"
//                 value={selectedItemType}
//                 onChange={e => setSelectedItemType(e.target.value)}
//                 className="w-full p-2 border border-gray-400 rounded"
//               >
//                 <option value="">Select Item Type</option>
//                 {itemTypes.map(itemType => (
//                   <option key={itemType.Id} value={itemType.Id}>
//                     {itemType.ItemType},
//                     {itemType.Id}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <label className="block mb-2">
//               Warranty Period:
//               <input
//                 type="text"
//                 name="WarrantyPeriod"
//                 value={editValues.WarrantyPeriod}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <label className="block mb-2">
//               Model:
//               <input
//                 type="text"
//                 name="model"
//                 value={editValues.model}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-400 rounded"
//               />
//             </label>
//             <div className="mb-4">
//                 <label className="block mb-2">Item Image</label>
//                 <input
//                   type="file"
//                   accept='image/*'
//                   onChange={handleImageUpload}
//                   className="w-full border px-4 py-2 rounded"
//                 />
//               </div>
//             <div className="flex justify-end mt-4">
//               <button
//                 type="button"
//                 onClick={handleSaveChanges}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
//               >
//                 Save
//               </button>
//               <button
//                 type="button"
//                 onClick={handleChange}
//                 className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }
  
// export default AllProductShow;























import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from 'react-switch';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
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
        initialShowItems[item.Id] = item.Status === 1;
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
    // Determine the new status based on the current state
    // If item is currently shown, set status to 0 (disabled); otherwise, set status to 2 (enabled)
    const newStatus = showItems[itemId] ? 0 : 2;
    const token = localStorage.getItem('tokenadmin');
  
    try {
      const response = await fetch(`${BaseUrl}api/Master/Disable_Enable_Item?itemId=${itemId}&Status=${newStatus}`, {
        method: 'GET', // Use GET if API supports it; otherwise, consider using POST
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        // If the response is not ok, throw an error
        throw new Error('Failed to update item status');
      }
  
      // Update the local state to reflect the new visibility status
      setShowItems(prevState => ({
        ...prevState,
        [itemId]: !prevState[itemId] // Toggle the visibility
      }));
  
      // Mark changes as made
      setChangesMade(true);
  
      // Provide feedback to the user
      toast.success('Item status updated successfully');
    } catch (error) {
      // Handle errors and provide feedback to the user
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
      





      Id: item.ID || 0,
          ItemName: item.ItemName || '',
          ItemDescription: item.ItemDescription || '',
          GST: item.GST || 0,
          Cess: item.Cess || 0,
          HSNCode: item.HSNCode || '',
          BatchNum: item.BatchNum || 0,
          BarCode: item.BarCode || '',
          CAT_Number: item.CAT_Number || '',
          ItemCode: item.ItemCode || '',
          SerialNumber: item.SerialNumber || '',
          ManufactureDate: item.ManufactureDate || '',
          ExpiryDate: item.ExpiryDate || '',
          Rate: item.Rate || 0,
          Unit: item.Unit || 0,
          ItemType: item.ItemType || 0,
          WarrantyPeriod: item.WarrantyPeriod || 0,
          ItemImage: {
            Id: 0,  // Default value for Id
            ItemId: item.ID || 0,
            Image: item.imageFile || ''
          }
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
      setEditValues((prevValues) => ({
        ...prevValues,
        imageFile: base64String,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (id) => {
    // Ensure the selected item type is set in editValues
    const updatedEditValues = {
      ...editValues,
      ItemType: selectedItemType,
      model: '1' // Replace with the actual model value or logic to set it
    };
  
    // Ensure ItemImage has a valid Image field
    if (editValues.imageFile) {
      updatedEditValues.ItemImage = {
        Id: 0, // Default value for Id
        ItemId: updatedEditValues.Id || 0,
        Image: editValues.imageFile, // Ensure this is a base64 string
      };
    } else {
      updatedEditValues.ItemImage = {
        Id: 0, // Default value for Id
        ItemId: updatedEditValues.Id || 0,
        Image: '', // Or omit this field if not used
      };
    }
  
    try {
      const token = localStorage.getItem('tokenadmin');
      const response = await fetch(`${BaseUrl}api/Master/Add_or_Update_Item`, {
        method: 'POST', // Assuming the API requires POST method for adding or updating items
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedEditValues), // Convert the updatedEditValues to JSON
      });
  
      if (response.ok) {
        const updatedItem = await response.json();
  
        // Update the item in the state only if it matches the ID
        setItems(items.map(item => (item.Id === updatedItem.Id ? updatedItem : item)));
  
        setEditItem(null); // Clear the edit state
        toast.success('Item saved successfully');
      } else {
        const errorData = await response.json();
        console.error('Error saving item:', errorData.errors);
        toast.error(`Failed to save item: ${errorData.errors.$[0]}`);
      }
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error('Failed to save item');
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
      ItemImage: {
        Id: 0,  // Default value for Id
        ItemId: 0,
        Image:  ''
      }
    });
    setSelectedItemType('');
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
            <th className="px-4 py-2">Model</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="border border-gray-300 text-center">
                <td className="px-4 py-2">{item.SequentialId + 1}</td>
                <td className="px-4 py-2">{item.ItemName}</td>
                <td className="px-4 py-2">{item.ItemDescription}</td>
                <td className="px-4 py-2">{item.GST}</td>
                <td className="px-4 py-2">{item.Cess}</td>
                <td className="px-4 py-2">{item.HSNCode}</td>
                <td className="px-4 py-2">{item.BatchNum}</td>
                <td className="px-4 py-2">{item.BarCode}</td>
                <td className="px-4 py-2">{item.CAT_Number}</td>
                <td className="px-4 py-2">{item.ItemCode}</td>
                <td className="px-4 py-2">{item.SerialNumber}</td>
                <td className="px-4 py-2">{item.ManufactureDate}</td>
                <td className="px-4 py-2">{item.ExpiryDate}</td>
                <td className="px-4 py-2">{item.Rate}</td>
                <td className="px-4 py-2">{item.Unit}</td>
                <td className="px-4 py-2">{item.ItemType}</td>
                <td className="px-4 py-2">{item.WarrantyPeriod}</td>
                <td className="px-4 py-2">{item.model}</td>
                <td className="px-4 py-2">
                <Switch
            checked={showItems[item.Id] || false}
            onChange={() => toggleItem(item.Id)}
            onColor="#86d3f0"
            offColor="#888"
            uncheckedIcon={<div style={{ padding: 2 }} />}
            checkedIcon={<div style={{ padding: 2 }} />}
          />
                </td>
                <td className="px-4 py-2">
                  {item.ItemImageUrl ? (
                    <img src={item.ItemImageUrl} alt="Item" className="h-12 w-12 object-cover" />
                  ) : (
                    <span className="text-red-500">No Image</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(item.Id)}>
                    <MdEdit size={24} />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(item.Id)}>
                    <MdDeleteForever size={24} />
                  </button>
                </td>
              </tr>
              {editItem === item.Id && (
                <tr className="border border-gray-300">
                  <td colSpan="21" className="px-4 py-2">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-700">Item Name</label>
                        <input
                          type="text"
                          name="ItemName"
                          value={editValues.ItemName}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Item Description</label>
                        <input
                          type="text"
                          name="ItemDescription"
                          value={editValues.ItemDescription}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">GST</label>
                        <input
                          type="text"
                          name="GST"
                          value={editValues.GST}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">CESS</label>
                        <input
                          type="text"
                          name="Cess"
                          value={editValues.Cess}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">HSN Code</label>
                        <input
                          type="text"
                          name="HSNCode"
                          value={editValues.HSNCode}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Batch Num</label>
                        <input
                          type="text"
                          name="BatchNum"
                          value={editValues.BatchNum}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Bar Code</label>
                        <input
                          type="text"
                          name="BarCode"
                          value={editValues.BarCode}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">CAT Number</label>
                        <input
                          type="text"
                          name="CAT_Number"
                          value={editValues.CAT_Number}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Item Code</label>
                        <input
                          type="text"
                          name="ItemCode"
                          value={editValues.ItemCode}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Serial Number</label>
                        <input
                          type="text"
                          name="SerialNumber"
                          value={editValues.SerialNumber}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Manufacture Date</label>
                        <input
                          type="text"
                          name="ManufactureDate"
                          value={editValues.ManufactureDate}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Expiry Date</label>
                        <input
                          type="text"
                          name="ExpiryDate"
                          value={editValues.ExpiryDate}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Rate</label>
                        <input
                          type="text"
                          name="Rate"
                          value={editValues.Rate}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Unit</label>
                        <input
                          type="text"
                          name="Unit"
                          value={editValues.Unit}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                      <label className="block mb-2">
               Item Type:
               <select
                name="ItemType"
                value={selectedItemType}
                onChange={e => setSelectedItemType(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded"
              >
                <option value="">Select Item Type</option>
                {itemTypes.map(itemType => (
                  <option key={itemType.Id} value={itemType.Id}>
                    {itemType.ItemType},
                    {itemType.Id}
                  </option>
                ))}
              </select>
            </label>
                      </div>
                      <div>
                        <label className="block text-gray-700">Warranty Period</label>
                        <input
                          type="text"
                          name="WarrantyPeriod"
                          value={editValues.WarrantyPeriod}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Model</label>
                        <input
                          type="text"
                          name="model"
                          value={editValues.model}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Image URL</label>
                        <input
                          type="file"
                          accept='image/*'
                          value={editValues.ItemImageUrl}
                          onChange={handleImageUpload}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div>
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleSave(item.Id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                          onClick={handleChange}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProductShow;
