import React from 'react';
import { MdDeleteForever } from "react-icons/md";

function DashboardItemsTable({
  items,
  editRowId,
  handleEditClick,
  handleSaveClick,
  handleDeleteClick,
  handleCancelClick,
  handleEditChange,
}) {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b-2 border-gray-300">Item Name</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Item Description</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">GST</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">CESS</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">HSN Code</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Batch Number</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Bar Code</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Catalog Number</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Item Code</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Serial Number</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Manufacture Date</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Expiry Date</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Rate</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Unit</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Item Type</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Warranty Period</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Created By</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">System Time</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Modified By</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Modified At</th>
          <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className={editRowId === index ? "bg-gray-100" : ""}>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.ItemName} onChange={(e) => handleEditChange(e, index, "ItemName")} className="w-full" /> : item.ItemName}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.ItemDescription} onChange={(e) => handleEditChange(e, index, "ItemDescription")} className="w-full" /> : item.ItemDescription}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="number" value={item.GST} onChange={(e) => handleEditChange(e, index, "GST")} className="w-full" /> : item.GST}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="number" value={item.Cess} onChange={(e) => handleEditChange(e, index, "Cess")} className="w-full" /> : item.Cess}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.HSNCode} onChange={(e) => handleEditChange(e, index, "HSNCode")} className="w-full" /> : item.HSNCode}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.BatchNum} onChange={(e) => handleEditChange(e, index, "BatchNum")} className="w-full" /> : item.BatchNum}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.BarCode} onChange={(e) => handleEditChange(e, index, "BarCode")} className="w-full" /> : item.BarCode}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.CAT_Number} onChange={(e) => handleEditChange(e, index, "CAT_Number")} className="w-full" /> : item.CAT_Number}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.ItemCode} onChange={(e) => handleEditChange(e, index, "ItemCode")} className="w-full" /> : item.ItemCode}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.SerialNumber} onChange={(e) => handleEditChange(e, index, "SerialNumber")} className="w-full" /> : item.SerialNumber}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.ManufactureDate} onChange={(e) => handleEditChange(e, index, "ManufactureDate")} className="w-full" /> : item.ManufactureDate}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.ExpiryDate} onChange={(e) => handleEditChange(e, index, "ExpiryDate")} className="w-full" /> : item.ExpiryDate}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="number" value={item.Rate} onChange={(e) => handleEditChange(e, index, "Rate")} className="w-full" /> : item.Rate}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="number" value={item.Status} onChange={(e) => handleEditChange(e, index, "Status")} className="w-full" /> : item.Status}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="number" value={item.Unit} onChange={(e) => handleEditChange(e, index, "Unit")} className="w-full" /> : item.Unit}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="number" value={item.ItemType} onChange={(e) => handleEditChange(e, index, "ItemType")} className="w-full" /> : item.ItemType}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.WarrantyPeriod} onChange={(e) => handleEditChange(e, index, "WarrantyPeriod")} className="w-full" /> : item.WarrantyPeriod}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.CreatedBy} onChange={(e) => handleEditChange(e, index, "CreatedBy")} className="w-full" /> : item.CreatedBy}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.SysTime} onChange={(e) => handleEditChange(e, index, "SysTime")} className="w-full" /> : item.SysTime}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.ModifiedBy} onChange={(e) => handleEditChange(e, index, "ModifiedBy")} className="w-full" /> : item.ModifiedBy}</td>
            <td className="py-2 px-4 border-b">{editRowId === index ? <input type="text" value={item.ModifiedAt} onChange={(e) => handleEditChange(e, index, "ModifiedAt")} className="w-full" /> : item.ModifiedAt}</td>
            <td className="py-2 px-4 border-b">
              {editRowId === index ? (
                <>
                  <button onClick={() => handleSaveClick(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                  <button onClick={handleCancelClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditClick(index)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                  <button onClick={() => handleDeleteClick(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DashboardItemsTable;

