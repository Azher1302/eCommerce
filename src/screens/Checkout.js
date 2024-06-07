import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Payments from '../components/Payments';
import Layout from '../layout/Layout';
import { AiFillBackward } from 'react-icons/ai';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import OrderSummary from '../components/OrderSummary';
import Table from '../components/Table';
import { Link, useNavigate } from 'react-router-dom';
import { CircleLoader } from 'react-spinners'; // Import spinner component from react-spinners

function Checkout() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    setFirstName(storedUserData.firstName || '');
    setLastName(storedUserData.lastName || '');
    setEmail(storedUserData.email || '');
    setPhoneNumber(storedUserData.phoneNumber || '');
    setStreetAddress(storedUserData.streetAddress || '');
    setCity(storedUserData.city || '');
    setCountry(storedUserData.country || '');
    setZip(storedUserData.zip || '');
    setCartItems(storedCartItems);
  }, []);

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when order is confirmed

    const orderData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      city,
      country,
      zip,
      cartItems,
    };
    localStorage.setItem('orderData', JSON.stringify(orderData));
    console.log(orderData);

    // Provide feedback to the user
    alert('Your order has been confirmed!');

    // Clear the form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setStreetAddress('');
    setCity('');
    setCountry('');
    setZip('');
    setCartItems([]);

    // Simulate a delay before navigating to the table page
    setTimeout(() => {
      setLoading(false); // Set loading to false after delay
      navigate('/Table'); // Navigate to the table page
    }, 2000); // 2-second delay
  };

  return (
    <Layout>
      <div className="bg-deepGray">
        <div className="min-h-screen container mx-auto px-2">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <CircleLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="lg:grid grid-cols-10 gap-10 items-start py-12">
              <div className="col-span-6 lg:mb-0 mb-10">
                <form className="flex flex-col gap-12" onSubmit={handleConfirmOrder}>
                  <div className="flex flex-col gap-6">
                    <h2 className="font-semibold text-lg">01. Personal Details</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        placeHolder="John"
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <Input
                        type="text"
                        placeHolder="Doe"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        type="email"
                        placeHolder="user@gmail.com"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Input
                        type="number"
                        placeHolder="0754661424"
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* shipping */}
                  <div className="flex flex-col gap-6">
                    <h2 className="font-semibold text-lg">02. Shipping Details</h2>
                    <Input
                      type="text"
                      placeHolder="Njiro, block D"
                      label="Street Address"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        placeHolder="Arusha"
                        label="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <Input
                        type="text"
                        placeHolder="Tanzania"
                        label="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                      <Input
                        type="text"
                        placeHolder="23456"
                        label="ZIP"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* payments */}
                  <div className="flex flex-col gap-6">
                    <h2 className="font-semibold text-lg">03. Payment Details</h2>
                    <Payments />
                  </div>
                  {/* buttons */}
                  <div className="flex flex-col gap-6">
                    <h2 className="font-semibold text-lg">04. Place An Order</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Link
                        to="/shop"
                        className="w-full flex-rows gap-3 p-3 rounded text-black border-2 border-main"
                      >
                       <AiFillBackward /> Continue Shopping
</Link>
<div className="sticky flex-colo gap-4 sm:p-6 py-6 px-4 rounded-md top-28 col-span-4 bg-white border border-text">
<button
                       type="submit"
                       className="w-full flex-rows gap-3 p-3 hover:bg-subMain transitions rounded text-white bg-main"
                     >
Confirm Order <IoIosCheckmarkCircle />
</button>
</div>
</div>
</div>
</form>
</div>
<div className="sticky flex-colo gap-4 sm:p-6 py-6 px-4 rounded-md top-28 col-span-4 bg-white border border-text">
<OrderSummary order={false} cartItems={cartItems} />
</div>
</div>
)}
</div>
</div>
</Layout>
);
}

export default Checkout;