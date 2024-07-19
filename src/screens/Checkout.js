import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillBackward } from 'react-icons/ai';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import CircleLoader from 'react-spinners/CircleLoader';
import toast from 'react-hot-toast';
import Layout from '../layout/Layout';
import OrderSummary from '../components/OrderSummary';
import Modal from './Modal'; // Adjust the import path as per your file structure

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
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const userData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      city,
      country,
      zip,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [firstName, lastName, email, phoneNumber, streetAddress, city, country, zip]);

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error('There are no items in the cart');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (paymentMethod === 'Card' && (!cardNumber || !expiryDate || !cvv)) {
      toast.error('Please fill out all payment details');
      return;
    }
    
    setShowConfirmationModal(true);
  };

  const handleConfirm = () => {
    setLoading(true);

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
      paymentMethod,
      cardNumber: paymentMethod === 'Card' ? cardNumber : null,
      expiryDate: paymentMethod === 'Card' ? expiryDate : null,
      cvv: paymentMethod === 'Card' ? cvv : null,
    };

    localStorage.setItem('orderData', JSON.stringify(orderData));
    console.log(orderData);

    toast.success('Your order has been confirmed!');

    localStorage.removeItem('cartItems');

    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setStreetAddress('');
    setCity('');
    setCountry('');
    setZip('');
    setCartItems([]);
    setPaymentMethod('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');

    setTimeout(() => {
      setLoading(false);
      navigate('/Table');
    }, 2000);
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  // Phone number validation
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^[89]\d{0,9}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  // Country options
  const countryOptions = [
    "United States", "Canada", "United Kingdom", "Australia", "Germany",
    "France", "Italy", "Spain", "India", "China", "Japan", "South Korea",
    "Brazil", "Mexico", "Argentina", "South Africa", "Nigeria", "Egypt",
    "Saudi Arabia", "United Arab Emirates", "Russia"
  ];

  return (
    <Layout>
      <div className="bg-deepGray">
        <div className="min-h-screen container mx-auto px-4">
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
                      <div className="flex flex-col">
                        <label className="text-sm font-semibold">First Name</label>
                        <input
                          type="text"
                          placeholder="First name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-semibold">Last Name</label>
                        <input
                          type="text"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-sm font-semibold">Email</label>
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-semibold">Phone Number</label>
                        <input
                          type="text"
                          placeholder="Phone number"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          className="p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h2 className="font-semibold text-lg">02. Shipping Details</h2>
                    <div className="flex flex-col">
                      <label className="text-sm font-semibold">Street Address</label>
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-sm font-semibold">City</label>
                        <input
                          type="text"
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-semibold">Country</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="p-2 border border-gray-300 rounded"
                        >
                          {countryOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-semibold">Zip Code</label>
                        <input
                          type="text"
                          placeholder="Zip Code"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          className="p-2 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h2 className="font-semibold text-lg">03. Payment Details</h2>
                    <div className="grid gap-4">
                      <label className="font-semibold">Select Payment Method:</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                      >
                        <option value="">Select Payment Method</option>
                        <option value="Google Pay">Google Pay</option>
                        <option value="Card">Credit/Debit Card</option>
                        <option value="Cash">Cash on Delivery</option>
                      </select>

                      {paymentMethod === 'Card' && (
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold">Card Number</label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="p-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              className="p-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold">CVV</label>
                            <input
                              type="text"
                              placeholder="CVV"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              className="p-2 border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h2 className="font-semibold text-lg">04. Place An Order</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Link to="/shop" className="w-full flex items-center justify-center gap-3 p-3 rounded text-black border-2 border-main">
                        <AiFillBackward /> Continue Shopping
                      </Link>
                      <button type="submit" className="w-full flex items-center justify-center gap-3 p-3 hover:bg-subMain transitions rounded text-white bg-main">
                        Confirm Order <IoIosCheckmarkCircle />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="sticky flex flex-col gap-4 sm:p-6 py-6 px-4 rounded-md top-28 col-span-4 bg-white border border-text">
                <OrderSummary order={false} cartItems={cartItems} />
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        <Modal isOpen={showConfirmationModal} onClose={handleCancel} onConfirm={handleConfirm} />
        
      </div>
    </Layout>
  );
}

export default Checkout;
