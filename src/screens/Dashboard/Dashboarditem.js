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








// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { MdDeleteForever } from "react-icons/md";
// import { BaseUrl } from '../../Config/config';
// import { useNavigate } from 'react-router-dom';

// function DashboardItem() {
//   const navigate = useNavigate();
//   const [tableData, setTableData] = useState([]);
//   const [itemTypes, setItemTypes] = useState([]);
//   const [token, setToken] = useState('');

//   const [newRow, setNewRow] = useState({
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
//     imageFile: null,
//   });

//   useEffect(() => {
//     const tokenAdmin = localStorage.getItem('tokenadmin');
//     if (!tokenAdmin) {
//       navigate('/AdminLogin');
//     } else {
//       setToken(tokenAdmin);
//     }

//     const storedData = localStorage.getItem('tableData');
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
//   }, [navigate]);

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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewRow((prevRow) => ({
//       ...prevRow,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type !== 'image/png') {
//       toast.error('Only PNG files are supported');
//       return;
//     }

//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const base64String = reader.result.split(',')[1];
//       setNewRow((prevRow) => ({
//         ...prevRow,
//         imageFile: base64String,
//       }));
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleNewRowSubmit = (e) => {
//     e.preventDefault();
//     const newRowId = tableData.length === 0 ? 0 : Math.max(...tableData.map(row => row.ID)) + 1;
//     const rowToAdd = { ...newRow, ID: newRowId, Status: 1 };

//     setTableData([...tableData, rowToAdd]);
//     setNewRow({
//       ItemName: '',
//       ItemDescription: '',
//       GST: '',
//       Cess: '',
//       HSNCode: '',
//       BatchNum: '',
//       BarCode: '',
//       CAT_Number: '',
//       ItemCode: '',
//       SerialNumber: '',
//       ManufactureDate: '',
//       ExpiryDate: '',
//       Rate: '',
//       Unit: '',
//       ItemType: '',
//       WarrantyPeriod: '',
//       imageFile: null,
//     });
//   };

//   const handleCreateOrUpdateData = async () => {
//     const token = localStorage.getItem('tokenadmin');
//     const updatedTableData = [];

//     for (let row of tableData) {
//       try {
//         const payload = {
//           Id: row.ID || 0,
//           ItemName: row.ItemName || '',
//           ItemDescription: row.ItemDescription || '',
//           GST: row.GST || 0,
//           Cess: row.Cess || 0,
//           HSNCode: row.HSNCode || '',
//           BatchNum: row.BatchNum || 0,
//           BarCode: row.BarCode || '',
//           CAT_Number: row.CAT_Number || '',
//           ItemCode: row.ItemCode || '',
//           SerialNumber: row.SerialNumber || '',
//           ManufactureDate: row.ManufactureDate || '',
//           ExpiryDate: row.ExpiryDate || '',
//           Rate: row.Rate || 0,
//           Unit: row.Unit || 0,
//           ItemType: row.ItemType || 0,
//           WarrantyPeriod: row.WarrantyPeriod || 0,
//           ItemImage: {
//             Id: 0,
//             ItemId: row.ID || 0,
//             Image: row.imageFile || ''
//           }
//         };

//         const response = await fetch(`${BaseUrl}api/Master/Add_or_Update_Item`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify(payload),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const result = await response.json();
//         console.log('Success:', result);
//         updatedTableData.push(result);
//         toast.success(`Row with ID ${row.ID} saved successfully`);
//       } catch (error) {
//         console.error('Error:', error);
//         toast.error(`Failed to save row with ID ${row.ID}`);
//       }
//     }

//     setTableData(updatedTableData);
//   };

//   const handleEditRow = (id, field, value) => {
//     const updatedData = tableData.map(row =>
//       row.ID === id ? { ...row, [field]: value } : row
//     );
//     setTableData(updatedData);
//   };

//   const handleDeleteRow = (id) => {
//     const updatedData = tableData.filter(row => row.ID !== id);
//     setTableData(updatedData);
//     toast.success('Row deleted');
//   };

//   const handleToggleStatus = (id) => {
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
//         <input
//           type="text"
//           name="ItemName"
//           placeholder="Item Name"
//           value={newRow.ItemName}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="text"
//           name="ItemDescription"
//           placeholder="Item Description"
//           value={newRow.ItemDescription}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="number"
//           name="GST"
//           placeholder="GST"
//           value={newRow.GST}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="number"
//           name="Cess"
//           placeholder="CESS"
//           value={newRow.Cess}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="text"
//           name="HSNCode"
//           placeholder="HSN Code"
//           value={newRow.HSNCode}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="number"
//           name="BatchNum"
//           placeholder="Batch Number"
//           value={newRow.BatchNum}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="text"
//           name="BarCode"
//           placeholder="Bar Code"
//           value={newRow.BarCode}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="text"
//           name="CAT_Number"
//           placeholder="CAT Number"
//           value={newRow.CAT_Number}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="text"
//           name="ItemCode"
//           placeholder="Item Code"
//           value={newRow.ItemCode}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="text"
//           name="SerialNumber"
//           placeholder="Serial Number"
//           value={newRow.SerialNumber}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="date"
//           name="ManufactureDate"
//           placeholder="Manufacture Date"
//           value={newRow.ManufactureDate}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="date"
//           name="ExpiryDate"
//           placeholder="Expiry Date"
//           value={newRow.ExpiryDate}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="number"
//           name="Rate"
//           placeholder="Rate"
//           value={newRow.Rate}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="number"
//           name="Unit"
//           placeholder="Unit"
//           value={newRow.Unit}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <select
//           name="ItemType"
//           value={newRow.ItemType}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         >
//           <option value="">Select Item Type</option>
//           {itemTypes.map((type) => (
//             <option key={type.id} value={type.id}>{type.name}</option>
//           ))}
//         </select>
//         <input
//           type="number"
//           name="WarrantyPeriod"
//           placeholder="Warranty Period"
//           value={newRow.WarrantyPeriod}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <input
//           type="file"
//           name="imageFile"
//           onChange={handleFileChange}
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-700"
//         >
//           Add Row
//         </button>
//       </form>
//       <button
//         onClick={handleCreateOrUpdateData}
//         className="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-700"
//       >
//         Save Data to API
//       </button>
//       <table className="w-full mt-4 border border-collapse border-gray-300">
//         <thead>
//           <tr>
//             <th className="p-2 border border-gray-300">ID</th>
//             <th className="p-2 border border-gray-300">Item Name</th>
//             <th className="p-2 border border-gray-300">Item Description</th>
//             <th className="p-2 border border-gray-300">GST</th>
//             <th className="p-2 border border-gray-300">CESS</th>
//             <th className="p-2 border border-gray-300">HSN Code</th>
//             <th className="p-2 border border-gray-300">Batch Number</th>
//             <th className="p-2 border border-gray-300">Bar Code</th>
//             <th className="p-2 border border-gray-300">CAT Number</th>
//             <th className="p-2 border border-gray-300">Item Code</th>
//             <th className="p-2 border border-gray-300">Serial Number</th>
//             <th className="p-2 border border-gray-300">Manufacture Date</th>
//             <th className="p-2 border border-gray-300">Expiry Date</th>
//             <th className="p-2 border border-gray-300">Rate</th>
//             <th className="p-2 border border-gray-300">Unit</th>
//             <th className="p-2 border border-gray-300">Item Type</th>
//             <th className="p-2 border border-gray-300">Warranty Period</th>
//             <th className="p-2 border border-gray-300">Image</th>
//             <th className="p-2 border border-gray-300">Status</th>
//             <th className="p-2 border border-gray-300">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((row) => (
//             <tr key={row.ID}>
//               <td className="p-2 border border-gray-300">{row.ID}</td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="text"
//                   value={row.ItemName}
//                   onChange={(e) => handleEditRow(row.ID, 'ItemName', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="text"
//                   value={row.ItemDescription}
//                   onChange={(e) => handleEditRow(row.ID, 'ItemDescription', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="number"
//                   value={row.GST}
//                   onChange={(e) => handleEditRow(row.ID, 'GST', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="number"
//                   value={row.Cess}
//                   onChange={(e) => handleEditRow(row.ID, 'Cess', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="text"
//                   value={row.HSNCode}
//                   onChange={(e) => handleEditRow(row.ID, 'HSNCode', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="number"
//                   value={row.BatchNum}
//                   onChange={(e) => handleEditRow(row.ID, 'BatchNum', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="text"
//                   value={row.BarCode}
//                   onChange={(e) => handleEditRow(row.ID, 'BarCode', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="text"
//                   value={row.CAT_Number}
//                   onChange={(e) => handleEditRow(row.ID, 'CAT_Number', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="text"
//                   value={row.ItemCode}
//                   onChange={(e) => handleEditRow(row.ID, 'ItemCode', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="text"
//                   value={row.SerialNumber}
//                   onChange={(e) => handleEditRow(row.ID, 'SerialNumber', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="date"
//                   value={row.ManufactureDate}
//                   onChange={(e) => handleEditRow(row.ID, 'ManufactureDate', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="date"
//                   value={row.ExpiryDate}
//                   onChange={(e) => handleEditRow(row.ID, 'ExpiryDate', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="number"
//                   value={row.Rate}
//                   onChange={(e) => handleEditRow(row.ID, 'Rate', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="number"
//                   value={row.Unit}
//                   onChange={(e) => handleEditRow(row.ID, 'Unit', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <select
//                   value={row.ItemType}
//                   onChange={(e) => handleEditRow(row.ID, 'ItemType', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 >
//                   <option value="">Select Item Type</option>
//                   {itemTypes.map((type) => (
//                     <option key={type.id} value={type.id}>{type.name}</option>
//                   ))}
//                 </select>
//               </td>
//               <td className="p-2 border border-gray-300">
//                 <input
//                   type="number"
//                   value={row.WarrantyPeriod}
//                   onChange={(e) => handleEditRow(row.ID, 'WarrantyPeriod', e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               </td>
//               <td className="p-2 border border-gray-300">
//                 {row.imageFile ? (
//                   <img
//                     src={URL.createObjectURL(row.imageFile)}
//                     alt="Item"
//                     className="w-full h-auto"
//                   />
//                 ) : (
//                   <span>No Image</span>
//                 )}
//               </td>
//               <td className="p-2 border border-gray-300">{row.Status}</td>
//               <td className="p-2 border border-gray-300">
//                 <button
//                   onClick={() => handleDeleteRow(row.ID)}
//                   className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default DashboardItem;
