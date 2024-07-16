// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { MdDeleteForever } from "react-icons/md";
// import { BaseUrl } from '../../Config/config';
// import { useNavigate } from 'react-router-dom';

// function DashboardItem() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const tokenAdmin = localStorage.getItem('tokenadmin');
//     if (!tokenAdmin) {
//       navigate('/AdminLogin');
//     }
//   }, [navigate]);

//   const [tableData, setTableData] = useState([]);
//   const [itemTypes, setItemTypes] = useState([]);
//   const [token, setToken] = useState('');

//   useEffect(() => {
//     const storedData = localStorage.getItem('tableData');
//     const storedToken = localStorage.getItem('tokenadmin');
//     if (storedData) {
//       try {
//         const parsedData = JSON.parse(storedData);
//         if (Array.isArray(parsedData)) {
//           setTableData(parsedData);
//         }
//       } catch (error) {
//         console.error('Failed to parse stored data:', error);
//       }
//     }
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('tableData', JSON.stringify(tableData));
//   }, [tableData]);

//   useEffect(() => {
//     const fetchItemTypes = async () => {
//       try {
//         const response = await fetch(`${BaseUrl}api/Master/GetItemMaster?type=0`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch item types');
//         }
//         const data = await response.json();
//         setItemTypes(data);
//       } catch (error) {
//         console.error('Error fetching item types:', error);
//       }
//     };

//     if (token) {
//       fetchItemTypes();
//     }
//   }, [token]);

//   const [newRowItemName, setNewRowItemName] = useState('');
//   const [newRowItemDescription, setNewRowItemDescription] = useState('');
//   const [newRowGst, setNewRowGst] = useState('');
//   const [newRowCess, setNewRowCess] = useState('');
//   const [newRowHsnCode, setNewRowHsnCode] = useState('');
//   const [newRowBatchNum, setNewRowBatchNum] = useState('');
//   const [newRowBarCode, setNewRowBarCode] = useState('');
//   const [newRowCatNumber, setNewRowCatNumber] = useState('');
//   const [newRowItemCode, setNewRowItemCode] = useState('');
//   const [newRowSerialNumber, setNewRowSerialNumber] = useState('');
//   const [newRowManufactureDate, setNewRowManufactureDate] = useState('');
//   const [newRowExpiryDate, setNewRowExpiryDate] = useState('');
//   const [newRowRate, setNewRowRate] = useState('');
//   const [newRowUnit, setNewRowUnit] = useState('');
//   const [selectedItemType, setSelectedItemType] = useState('');
//   const [newRowWarrantyPeriod, setNewRowWarrantyPeriod] = useState('');

//   const handleCreateOrUpdateData = async () => {
//     const token = localStorage.getItem('tokenadmin');
//     const updatedTableData = [];

//     for (let row of tableData) {
//       try {
//         const response = await fetch(`${BaseUrl}api/Master/Add_or_Update_Item`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify(row),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const result = await response.json();
//         console.log('Success:', result);
//         updatedTableData.push(row);
//         toast.success(`Row with ID ${row.ID} saved successfully`);
//       } catch (error) {
//         console.error('Error:', error);
//         toast.error(`Failed to save row with ID ${row.ID}`);
//       }
//     }

//     setTableData(updatedTableData);
//   };

//   const handleNewRowSubmit = e => {
//     e.preventDefault();
//     const newRowId = tableData.length === 0 ? 0 : Math.max(...tableData.map(row => row.ID)) + 1;
//     const newRow = {
//       ID: newRowId,
//       ItemName: newRowItemName,
//       ItemDescription: newRowItemDescription,
//       GST: Number(newRowGst),
//       Cess: Number(newRowCess),
//       HSNCode: newRowHsnCode,
//       BatchNum: Number(newRowBatchNum),
//       BarCode: newRowBarCode,
//       CAT_Number: newRowCatNumber,
//       ItemCode: newRowItemCode,
//       SerialNumber: newRowSerialNumber,
//       ManufactureDate: newRowManufactureDate,
//       ExpiryDate: newRowExpiryDate,
//       Rate: Number(newRowRate),
//       Unit: Number(newRowUnit),
//       ItemType: Number(selectedItemType),
//       WarrantyPeriod: Number(newRowWarrantyPeriod),
//       Status: 1
//     };
//     setTableData([...tableData, newRow]);

//     // Clear the form inputs after submission
//     setNewRowItemName('');
//     setNewRowItemDescription('');
//     setNewRowGst('');
//     setNewRowCess('');
//     setNewRowHsnCode('');
//     setNewRowBatchNum('');
//     setNewRowBarCode('');
//     setNewRowCatNumber('');
//     setNewRowItemCode('');
//     setNewRowSerialNumber('');
//     setNewRowManufactureDate('');
//     setNewRowExpiryDate('');
//     setNewRowRate('');
//     setNewRowUnit('');
//     setSelectedItemType('');
//     setNewRowWarrantyPeriod('');
//   };

//   const handleEditRow = (id, field, value) => {
//     const updatedData = tableData.map(row =>
//       row.ID === id ? { ...row, [field]: value } : row
//     );
//     setTableData(updatedData);
//   };

//   const handleDeleteRow = id => {
//     const updatedData = tableData.filter(row => row.ID !== id);
//     setTableData(updatedData);
//     toast.success('Row deleted');
//   };

//   const handleToggleStatus = id => {
//     const updatedData = tableData.map(row =>
//       row.ID === id ? { ...row, Status: row.Status === 0 ? 1 : 0 } : row
//     );
//     setTableData(updatedData);
//   };

//   return (
//     <div className="container mx-auto p-6 min-h-screen text-black bg-gray-100">
//       <ToastContainer />
//       <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Admin Page</h1>
//       <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8" onSubmit={handleNewRowSubmit}>
//   <input
//     type="text"
//     placeholder="Item Name"
//     value={newRowItemName}
//     onChange={e => setNewRowItemName(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <input
//     type="text"
//     placeholder="Item Description"
//     value={newRowItemDescription}
//     onChange={e => setNewRowItemDescription(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <input
//     type="number"
//     placeholder="GST"
//     value={newRowGst}
//     onChange={e => setNewRowGst(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <input
//     type="number"
//     placeholder="CESS"
//     value={newRowCess}
//     onChange={e => setNewRowCess(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <input
//     type="text"
//     placeholder="HSN Code"
//     value={newRowHsnCode}
//     onChange={e => setNewRowHsnCode(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <input
//     type="number"
//     placeholder="Batch Number"
//     value={newRowBatchNum}
//     onChange={e => setNewRowBatchNum(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <input
//     type="text"
//     placeholder="Bar Code"
//     value={newRowBarCode}
//     onChange={e => setNewRowBarCode(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <input
//     type="text"
//     placeholder="Catalog Number"
//     value={newRowCatNumber}
//     onChange={e => setNewRowCatNumber(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <input
//     type="text"
//     placeholder="Item Code"
//     value={newRowItemCode}
//     onChange={e => setNewRowItemCode(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <input
//     type="text"
//     placeholder="Serial Number"
//     value={newRowSerialNumber}
//     onChange={e => setNewRowSerialNumber(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <div className="w-full p-2 border border-gray-300 rounded mb-2 flex flex-col">
//     <label className="text-gray-700 mb-1">Manufacture Date</label>
//     <input
//       type="date"
//       value={newRowManufactureDate}
//       onChange={e => setNewRowManufactureDate(e.target.value)}
//       className="p-2 border border-gray-300 rounded"
//     />
//   </div>
//   <div className="w-full p-2 border border-gray-300 rounded mb-2 flex flex-col">
//     <label className="text-gray-700 mb-1">Expiry Date</label>
//     <input
//       type="date"
//       value={newRowExpiryDate}
//       onChange={e => setNewRowExpiryDate(e.target.value)}
//       className="p-2 border border-gray-300 rounded"
//     />
//   </div>
//   <input
//     type="number"
//     placeholder="Rate"
//     value={newRowRate}
//     onChange={e => setNewRowRate(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <input
//     type="number"
//     placeholder="Unit"
//     value={newRowUnit}
//     onChange={e => setNewRowUnit(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <select
//     value={selectedItemType}
//     onChange={e => setSelectedItemType(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   >
//     <option value="">Select Item Type</option>
//     {itemTypes.map(item => (
//       <option key={item.Id} value={item.Id}>
//         {item.ItemType}, {item.Id}
//       </option>
//     ))}
//   </select>
//   <input
//     type="number"
//     placeholder="Warranty Period"
//     value={newRowWarrantyPeriod}
//     onChange={e => setNewRowWarrantyPeriod(e.target.value)}
//     className="w-full p-2 border border-gray-300 rounded mb-2"
//   />
//   <button
//     type="submit"
//     className="bg-blue-600 text-white p-2 rounded w-full mt-2 col-span-1 md:col-span-2 lg:col-span-3"
//   >
//     Add Row
//   </button>
// </form>


//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">Data Table</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full bg-white text-black rounded-md shadow-md">
//             <thead>
//               <tr>
//                 <th className="p-2 border">Item Name</th>
//                 <th className="p-2 border">Item Description</th>
//                 <th className="p-2 border">GST</th>
//                 <th className="p-2 border">CESS</th>
//                 <th className="p-2 border">HSN Code</th>
//                 <th className="p-2 border">Batch Number</th>
//                 <th className="p-2 border">Bar Code</th>
//                 <th className="p-2 border">Catalog Number</th>
//                 <th className="p-2 border">Item Code</th>
//                 <th className="p-2 border">Serial Number</th>
//                 <th className="p-2 border">Manufacture Date</th>
//                 <th className="p-2 border">Expiry Date</th>
//                 <th className="p-2 border">Rate</th>
//                 <th className="p-2 border">Unit</th>
//                 <th className="p-2 border">Item Type</th>
//                 <th className="p-2 border">Warranty Period</th>
//                 <th className="p-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map(row => {
//                 const itemType = itemTypes.find(item => item.Id === row.ItemType);
//                 return (
//                   <tr key={row.ID}>
//                     <td className="p-2 border">{row.ItemName}</td>
//                     <td className="p-2 border">{row.ItemDescription}</td>
//                     <td className="p-2 border">{row.GST}</td>
//                     <td className="p-2 border">{row.Cess}</td>
//                     <td className="p-2 border">{row.HSNCode}</td>
//                     <td className="p-2 border">{row.BatchNum}</td>
//                     <td className="p-2 border">{row.BarCode}</td>
//                     <td className="p-2 border">{row.CAT_Number}</td>
//                     <td className="p-2 border">{row.ItemCode}</td>
//                     <td className="p-2 border">{row.SerialNumber}</td>
//                     <td className="p-2 border">{row.ManufactureDate}</td>
//                     <td className="p-2 border">{row.ExpiryDate}</td>
//                     <td className="p-2 border">{row.Rate}</td>
//                     <td className="p-2 border">{row.Unit}</td>
//                     <td className="p-2 border">{itemType ? `${itemType.ItemType}, ${itemType.Id}` : 'Unknown'}</td>
//                     <td className="p-2 border">{row.WarrantyPeriod}</td>
//                     <td className="p-2 border text-center">
//                       <button
//                         onClick={() => handleDeleteRow(row.ID)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <MdDeleteForever size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//         <button
//           onClick={handleCreateOrUpdateData}
//           className="bg-blue-600 text-white p-2 rounded mt-4 w-full"
//         >
//           Save Table
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DashboardItem;







import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteForever } from "react-icons/md";
import { BaseUrl } from '../../Config/config';
import { useNavigate } from 'react-router-dom';

function DashboardItem() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [token, setToken] = useState('');

  const [newRow, setNewRow] = useState({
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
    imageFile: null,
  });

  useEffect(() => {
    const tokenAdmin = localStorage.getItem('tokenadmin');
    if (!tokenAdmin) {
      navigate('/AdminLogin');
    } else {
      setToken(tokenAdmin);
    }

    const storedData = localStorage.getItem('tableData');
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
  }, [navigate]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Strip the prefix "data:image/png;base64," from the base64 string
      const base64String = reader.result.split(',')[1];
      setNewRow((prevRow) => ({
        ...prevRow,
        imageFile: base64String,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  const handleNewRowSubmit = (e) => {
    e.preventDefault();
    const newRowId = tableData.length === 0 ? 0 : Math.max(...tableData.map(row => row.ID)) + 1;
    const rowToAdd = { ...newRow, ID: newRowId, Status: 1 };

    setTableData([...tableData, rowToAdd]);
    setNewRow({
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
      imageFile: null,
    });
  };  

  const handleCreateOrUpdateData = async () => {
    const token = localStorage.getItem('tokenadmin');
    const updatedTableData = [];
  
    for (let row of tableData) {
      try {
        // Construct the payload with ItemImage as an object
        const payload = {
          Id: row.ID || 0,
          ItemName: row.ItemName || '',
          ItemDescription: row.ItemDescription || '',
          GST: row.GST || 0,
          Cess: row.Cess || 0,
          HSNCode: row.HSNCode || '',
          BatchNum: row.BatchNum || 0,
          BarCode: row.BarCode || '',
          CAT_Number: row.CAT_Number || '',
          ItemCode: row.ItemCode || '',
          SerialNumber: row.SerialNumber || '',
          ManufactureDate: row.ManufactureDate || '',
          ExpiryDate: row.ExpiryDate || '',
          Rate: row.Rate || 0,
          Unit: row.Unit || 0,
          ItemType: row.ItemType || 0,
          WarrantyPeriod: row.WarrantyPeriod || 0,
          ItemImage: {
            Id: 0,  // Default value for Id
            ItemId: row.ID || 0,
            Image: row.imageFile || ''
          }
        };
  
        const response = await fetch(`${BaseUrl}api/Master/Add_or_Update_Item`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload),  // Ensure the payload is stringified
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
        console.log('Success:', result);
        updatedTableData.push(result);
        toast.success(`Row with ID ${row.ID} saved successfully`);
      } catch (error) {
        console.error('Error:', error);
        toast.error(`Failed to save row with ID ${row.ID}`);
      }
    }
  
    setTableData(updatedTableData);
  };
  
  
  
  
  
  const handleEditRow = (id, field, value) => {
    const updatedData = tableData.map(row =>
      row.ID === id ? { ...row, [field]: value } : row
    );
    setTableData(updatedData);
  };

  const handleDeleteRow = (id) => {
    const updatedData = tableData.filter(row => row.ID !== id);
    setTableData(updatedData);
    toast.success('Row deleted');
  };

  const handleToggleStatus = (id) => {
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
          name="ItemName"
          placeholder="Item Name"
          value={newRow.ItemName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          name="ItemDescription"
          placeholder="Item Description"
          value={newRow.ItemDescription}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="number"
          name="GST"
          placeholder="GST"
          value={newRow.GST}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="number"
          name="Cess"
          placeholder="CESS"
          value={newRow.Cess}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          name="HSNCode"
          placeholder="HSN Code"
          value={newRow.HSNCode}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="number"
          name="BatchNum"
          placeholder="Batch Number"
          value={newRow.BatchNum}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          name="BarCode"
          placeholder="Bar Code"
          value={newRow.BarCode}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          name="CAT_Number"
          placeholder="CAT Number"
          value={newRow.CAT_Number}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          name="ItemCode"
          placeholder="Item Code"
          value={newRow.ItemCode}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          name="SerialNumber"
          placeholder="Serial Number"
          value={newRow.SerialNumber}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="date"
          name="ManufactureDate"
          placeholder="Manufacture Date"
          value={newRow.ManufactureDate}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="date"
          name="ExpiryDate"
          placeholder="Expiry Date"
          value={newRow.ExpiryDate}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="number"
          name="Rate"
          placeholder="Rate"
          value={newRow.Rate}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="number"
          name="Unit"
          placeholder="Unit"
          value={newRow.Unit}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <select
          name="ItemType"
          value={newRow.ItemType}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        >
          <option value="">Select Item Type</option>
          {itemTypes.map((type) => (
            <option key={type.Id} value={type.Id}>
              {type.ItemType},
              {type.Id}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="WarrantyPeriod"
          placeholder="Warranty Period"
          value={newRow.WarrantyPeriod}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add New Row
        </button>
      </form>
      <table className="w-full mt-8 bg-white border border-gray-300 rounded">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">ID</th>
            <th className="p-2 border border-gray-300">Item Name</th>
            <th className="p-2 border border-gray-300">Item Description</th>
            <th className="p-2 border border-gray-300">GST</th>
            <th className="p-2 border border-gray-300">Cess</th>
            <th className="p-2 border border-gray-300">HSN Code</th>
            <th className="p-2 border border-gray-300">Batch Number</th>
            <th className="p-2 border border-gray-300">Bar Code</th>
            <th className="p-2 border border-gray-300">CAT Number</th>
            <th className="p-2 border border-gray-300">Item Code</th>
            <th className="p-2 border border-gray-300">Serial Number</th>
            <th className="p-2 border border-gray-300">Manufacture Date</th>
            <th className="p-2 border border-gray-300">Expiry Date</th>
            <th className="p-2 border border-gray-300">Rate</th>
            <th className="p-2 border border-gray-300">Unit</th>
            <th className="p-2 border border-gray-300">Item Type</th>
            <th className="p-2 border border-gray-300">Warranty Period</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.ID}>
              <td className="p-2 border border-gray-300">{row.ID}</td>
              <td className="p-2 border border-gray-300">{row.ItemName}</td>
              <td className="p-2 border border-gray-300">{row.ItemDescription}</td>
              <td className="p-2 border border-gray-300">{row.GST}</td>
              <td className="p-2 border border-gray-300">{row.Cess}</td>
              <td className="p-2 border border-gray-300">{row.HSNCode}</td>
              <td className="p-2 border border-gray-300">{row.BatchNum}</td>
              <td className="p-2 border border-gray-300">{row.BarCode}</td>
              <td className="p-2 border border-gray-300">{row.CAT_Number}</td>
              <td className="p-2 border border-gray-300">{row.ItemCode}</td>
              <td className="p-2 border border-gray-300">{row.SerialNumber}</td>
              <td className="p-2 border border-gray-300">{row.ManufactureDate}</td>
              <td className="p-2 border border-gray-300">{row.ExpiryDate}</td>
              <td className="p-2 border border-gray-300">{row.Rate}</td>
              <td className="p-2 border border-gray-300">{row.Unit}</td>
              <td className="p-2 border border-gray-300">{row.ItemType}</td>
              <td className="p-2 border border-gray-300">{row.WarrantyPeriod}</td>
              <td className="p-2 border border-gray-300">{row.Status === 1 ? 'Active' : 'Inactive'}</td>
              <td className="p-2 border border-gray-300">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleToggleStatus(row.ID)}
                >
                  Toggle Status
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteRow(row.ID)}
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6">
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={handleCreateOrUpdateData}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default DashboardItem;
