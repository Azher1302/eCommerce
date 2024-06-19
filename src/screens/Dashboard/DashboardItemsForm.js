import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardItemsForm({ handleNewRowSubmit }) {

  
  const navigate = useNavigate();

  useEffect(() => {
      const tokenadmin = localStorage.getItem('token admin');
      if (!tokenadmin) {
          navigate('/AdminLogin');
      }
  }, [navigate]);

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
  const [newRowStatus, setNewRowStatus] = useState('');
  const [newRowUnit, setNewRowUnit] = useState('');
  const [newRowItemType, setNewRowItemType] = useState('');
  const [newRowWarrantyPeriod, setNewRowWarrantyPeriod] = useState('');
  const [newRowCreatedBy, setNewRowCreatedBy] = useState('');
  const [newRowSysTime, setNewRowSysTime] = useState('');
  const [newRowModifiedBy, setNewRowModifiedBy] = useState('');
  const [newRowModifiedAt, setNewRowModifiedAt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewRowSubmit({
      ItemName: newRowItemName,
      ItemDescription: newRowItemDescription,
      GST: newRowGst,
      Cess: newRowCess,
      HSNCode: newRowHsnCode,
      BatchNum: newRowBatchNum,
      BarCode: newRowBarCode,
      CAT_Number: newRowCatNumber,
      ItemCode: newRowItemCode,
      SerialNumber: newRowSerialNumber,
      ManufactureDate: newRowManufactureDate,
      ExpiryDate: newRowExpiryDate,
      Rate: newRowRate,
      Status: newRowStatus,
      Unit: newRowUnit,
      ItemType: newRowItemType,
      WarrantyPeriod: newRowWarrantyPeriod,
      CreatedBy: newRowCreatedBy,
      SysTime: newRowSysTime,
      ModifiedBy: newRowModifiedBy,
      ModifiedAt: newRowModifiedAt,
    });
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
    setNewRowRate('');
    setNewRowStatus('');
    setNewRowUnit('');
    setNewRowItemType('');
    setNewRowExpiryDate('');
    setNewRowWarrantyPeriod('');
    setNewRowCreatedBy('');
    setNewRowSysTime('');
    setNewRowModifiedBy('');
    setNewRowModifiedAt('');
  };

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <input type="text" placeholder="Item Name" value={newRowItemName} onChange={(e) => setNewRowItemName(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="Item Description" value={newRowItemDescription} onChange={(e) => setNewRowItemDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="number" placeholder="GST" value={newRowGst} onChange={(e) => setNewRowGst(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="number" placeholder="CESS" value={newRowCess} onChange={(e) => setNewRowCess(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="HSN Code" value={newRowHsnCode} onChange={(e) => setNewRowHsnCode(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="Batch Number" value={newRowBatchNum} onChange={(e) => setNewRowBatchNum(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="Bar Code" value={newRowBarCode} onChange={(e) => setNewRowBarCode(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="Catalog Number" value={newRowCatNumber} onChange={(e) => setNewRowCatNumber(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="Item Code" value={newRowItemCode} onChange={(e) => setNewRowItemCode(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="Serial Number" value={newRowSerialNumber} onChange={(e) => setNewRowSerialNumber(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="Manufacture Date" value={newRowManufactureDate} onChange={(e) => setNewRowManufactureDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="Expiry Date" value={newRowExpiryDate} onChange={(e) => setNewRowExpiryDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="number" placeholder="Rate" value={newRowRate} onChange={(e) => setNewRowRate(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="number" placeholder="Status" value={newRowStatus} onChange={(e) => setNewRowStatus(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="number" placeholder="Unit" value={newRowUnit} onChange={(e) => setNewRowUnit(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="number" placeholder="Item Type" value={newRowItemType} onChange={(e) => setNewRowItemType(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="Warranty Period" value={newRowWarrantyPeriod} onChange={(e) => setNewRowWarrantyPeriod(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="Created By" value={newRowCreatedBy} onChange={(e) => setNewRowCreatedBy(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="System Time" value={newRowSysTime} onChange={(e) => setNewRowSysTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="Modified By" value={newRowModifiedBy} onChange={(e) => setNewRowModifiedBy(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <input type="text" placeholder="Modified At" value={newRowModifiedAt} onChange={(e) => setNewRowModifiedAt(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
}

export default DashboardItemsForm;
