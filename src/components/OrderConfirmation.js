import React, { useEffect, useState } from 'react';
import Table from './OrderConfirmation';

function OrderConfirmation() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
    setOrderData(storedOrderData);
  }, []);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  const { userData, cartItems } = orderData;

  return (
    <div className="min-h-screen container mx-auto px-2 py-12">
      <h1 className="text-2xl font-semibold mb-6">Order Confirmation</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Personal Details</h2>
        <p>First Name: {userData.firstName}</p>
        <p>Last Name: {userData.lastName}</p>
        <p>Email: {userData.email}</p>
        <p>Phone Number: {userData.phoneNumber}</p>
        <p>Street Address: {userData.streetAddress}</p>
        <p>City: {userData.city}</p>
        <p>Country: {userData.country}</p>
        <p>ZIP: {userData.zip}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <Table cartItems={cartItems} />
      </div>
    </div>
  );
}

export default OrderConfirmation;