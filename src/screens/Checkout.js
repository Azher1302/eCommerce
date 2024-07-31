import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillBackward } from 'react-icons/ai';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import CircleLoader from 'react-spinners/CircleLoader';
import toast from 'react-hot-toast';
import axios from 'axios';
import Layout from '../layout/Layout';
import OrderSummary from '../components/OrderSummary';
import Modal from './Modal';
import { BaseUrl } from '../Config/config';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!token) {
        toast.error('You are not logged in!');
        return;
      }

      try {
        const response = await fetch(`${BaseUrl}api/User/GetUserAdresses`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch addresses');
        }

        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        toast.error('Failed to fetch addresses');
      }
    };

    const fetchCartItems = async () => {
      if (!token) {
        toast.error('You are not logged in!');
        return;
      }

      try {
        const response = await fetch(`${BaseUrl}api/User/GetUserCart`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        setCartItems(data.map((item, index) => ({ ...item, SequentialId: index + 1 })));
      } catch (error) {
        console.error('Error fetching cart items:', error);
        toast.error('Failed to fetch cart items');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BaseUrl}api/Master/GetItemMaster?type=0`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories');
      }
    };

    fetchAddresses();
    fetchCartItems();
    fetchCategories();
  }, [token]);

  const handleAddressChange = (e) => {
    setSelectedAddressId(e.target.value);
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (!selectedAddressId) {
      toast.error('Please select an address.');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    if (paymentMethod === 'Card') {
      if (!cardNumber || !expiryDate || !cvv) {
        toast.error('Please provide all card details.');
        return;
      }

      // Add basic card validation
      const cardNumberRegex = /^\d{16}$/; // Simplified validation for a 16-digit card number
      const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
      const cvvRegex = /^\d{3,4}$/; // CVV should be 3 or 4 digits

      if (!cardNumberRegex.test(cardNumber.replace(/\s/g, ''))) {
        toast.error('Invalid card number.');
        return;
      }

      if (!expiryDateRegex.test(expiryDate)) {
        toast.error('Invalid expiry date.');
        return;
      }

      if (!cvvRegex.test(cvv)) {
        toast.error('Invalid CVV.');
        return;
      }
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty!', {
        duration: 1800, // Duration in milliseconds ( seconds)
      });
      
      return;
    }

    setShowConfirmationModal(true);
  };

  const handleModalConfirm = async () => {
    setLoading(true);
    setShowConfirmationModal(false);

    // Calculate amounts
    const amount = cartItems.reduce((sum, item) => sum + (item.Amount * item.Quantity), 0);
    const taxAmount = cartItems.reduce((sum, item) => sum + (item.TaxAmt || 0), 0);
    const total = amount + taxAmount;

    // Create order data
    const orderData = {
      Amount: amount,
      Discount: 0,
      Date: new Date().toISOString().split('T')[0], // Ensure this matches the desired date format
      TaxAmt: taxAmount,
      Cess: 0,
      AddressId: selectedAddressId, // Use the selected address ID
      TxnType: 1, // Ensure this matches your API requirement
      PayMode: paymentMethod === 'Card' ? 1 : (paymentMethod === 'Cash' ? 2 : 3), // Correct payment mode
      RoundOff: 0,
      PayType: paymentMethod === 'Card' ? 1 : (paymentMethod === 'Cash' ? 2 : 3), // Correct payment type
      Total: total,
      Remarks: 'string',
      Items: cartItems.map(item => ({
        ItemId: item.ItemId,
        Description: item.ItemDescription || 'string',
        Rate: item.Amount,
        TaxPercent: item.GST || 0,
        TaxAmt: (item.Amount * item.Quantity * (item.GST || 0)) / 100,
        Cess: 0,
        StockType: 1,
        Quantity: item.Quantity,
      })),
    };

    try {
      await axios.post(`${BaseUrl}api/User/CartCheckout`, orderData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Your order has been confirmed!');

      // Clear form data
      setCartItems([]);
      setPaymentMethod('');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');

      // Redirect after successful confirmation
      setTimeout(() => {
        setLoading(false);
        navigate('/Table');
      }, 2000);
    } catch (error) {
      toast.error('Error confirming order. Please try again.');
      console.error('Error confirming order:', error);
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setShowConfirmationModal(false);
  };

  const addAddress = () => {
    navigate('/Address');
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <CircleLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="lg:grid grid-cols-10 gap-10 items-start">
              <div className="col-span-6">
                <form className="flex flex-col gap-8" onSubmit={handleConfirm}>
                  <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
                    <h2 className="text-xl font-semibold mb-4">02. Address Selection</h2>
                    {addresses.length === 0 ? (
                      <div className="text-center">
                        <p className="mb-4 text-lg font-semibold text-red-600">No addresses found. Please add an address.</p>
                        <button
                          onClick={addAddress}
                          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150"
                        >
                          Add Address
                        </button>
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="address-select" className="block text-sm font-medium">Select Address:</label>
                        <select
                          id="address-select"
                          value={selectedAddressId}
                          onChange={handleAddressChange}
                          className="p-3 border border-gray-300 rounded-md w-full"
                        >
                          <option value="">Select Address</option>
                          {addresses.map((address) => (
                            <option key={address.id} value={address.id}>
                              {address.FirstName} {address.LastName}, {address.PhoneNumber}, {address.State}, {address.Country}, {address.City}, {address.Zip}
                            </option>
                          ))}
                        </select><br />
                        <button
                          onClick={addAddress}
                          className="bg-gradient-to-r from-main to-subMain hover:from-subMain hover:to-main transition duration-300 ease-in-out lg:py-3 py-0 px-6 font-semibold rounded-md text-xs lg:text-sm shadow-lg transform hover:scale-105"
                        >
                          Add Address
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="bg-white shadow-lg p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">01. Payment Details *</h2>
                    <div className="space-y-4">
                      <label className="block text-sm font-medium">Select Payment Method:</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="p-3 border border-gray-300 rounded-md w-full"
                      >
                        <option value="">Select Payment Method</option>
                        <option value="Google Pay">Google Pay</option>
                        <option value="Card">Credit/Debit Card</option>
                        <option value="Cash">Cash on Delivery</option>
                      </select>

                      {paymentMethod === 'Card' && (
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          <div className="flex flex-col">
                            <label className="text-sm font-medium">Card Number</label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="p-3 border border-gray-300 rounded-md w-full"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-medium">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              className="p-3 border border-gray-300 rounded-md w-full"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-medium">CVV</label>
                            <input
                              type="text"
                              placeholder="CVV"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              className="p-3 border border-gray-300 rounded-md w-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
                    <h2 className="text-xl font-semibold mb-4">03. Place An Order</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/shop" className="w-full sm:w-auto flex items-center justify-center gap-3 p-3 rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition">
                        <AiFillBackward /> Continue Shopping
                      </Link>
                      <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-3 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                        Confirm Order <IoIosCheckmarkCircle />
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-span-4 sticky top-28">
                <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
                  <OrderSummary order={true} cartItems={cartItems} closeCartDrawer={() => {}} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        <Modal
          isOpen={showConfirmationModal}
          onClose={handleModalCancel}
          onConfirm={handleModalConfirm}
        />
      </div>
    </Layout>
  );
};

export default Checkout;





// ^.^ //orginal









// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AiFillBackward } from 'react-icons/ai';
// import { IoIosCheckmarkCircle } from 'react-icons/io';
// import CircleLoader from 'react-spinners/CircleLoader';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import Layout from '../layout/Layout';
// import OrderSummary from '../components/OrderSummary';
// import Modal from './Modal';
// import { BaseUrl } from '../Config/config';

// const Checkout = () => {
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState('');
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       if (!token) {
//         toast.error('You are not logged in!');
//         return;
//       }

//       try {
//         const response = await fetch(`${BaseUrl}api/User/GetUserAdresses`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch addresses');
//         }

//         const data = await response.json();
//         setAddresses(data);
//       } catch (error) {
//         console.error('Error fetching addresses:', error);
//         toast.error('Failed to fetch addresses');
//       }
//     };

//     const fetchCartItems = async () => {
//       if (!token) {
//         toast.error('You are not logged in!');
//         return;
//       }

//       try {
//         const response = await fetch(`${BaseUrl}api/User/GetUserCart`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch cart items');
//         }

//         const data = await response.json();
//         setCartItems(data.map((item, index) => ({ ...item, SequentialId: index + 1 })));
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//         toast.error('Failed to fetch cart items');
//       }
//     };

//     fetchAddresses();
//     fetchCartItems();
//   }, [token]);

//   const handleAddressChange = (e) => {
//     setSelectedAddressId(e.target.value);
//   };

//   const handleConfirm = (e) => {
//     e.preventDefault();

//     if (!selectedAddressId) {
//       toast.error('Please select an address.');
//       return;
//     }

//     if (!paymentMethod) {
//       toast.error('Please select a payment method.');
//       return;
//     }

//     if (paymentMethod === 'Card') {
//       if (!cardNumber || !expiryDate || !cvv) {
//         toast.error('Please provide all card details.');
//         return;
//       }

//       // Add basic card validation
//       const cardNumberRegex = /^\d{16}$/; // Simplified validation for a 16-digit card number
//       const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
//       const cvvRegex = /^\d{3,4}$/; // CVV should be 3 or 4 digits

//       if (!cardNumberRegex.test(cardNumber.replace(/\s/g, ''))) {
//         toast.error('Invalid card number.');
//         return;
//       }

//       if (!expiryDateRegex.test(expiryDate)) {
//         toast.error('Invalid expiry date.');
//         return;
//       }

//       if (!cvvRegex.test(cvv)) {
//         toast.error('Invalid CVV.');
//         return;
//       }
//     }

//     if (cartItems.length === 0) {
//       toast.error('Your cart is empty!', {
//         duration: 1800, // Duration in milliseconds ( seconds)
//       });
      
//       return;
//     }

//     setShowConfirmationModal(true);
//   };

//   const handleModalConfirm = async () => {
//     setLoading(true);
//     setShowConfirmationModal(false);

//     // Calculate amounts
//     const amount = cartItems.reduce((sum, item) => sum + (item.Amount * item.Quantity), 0);
//     const taxAmount = cartItems.reduce((sum, item) => sum + (item.TaxAmt || 0), 0);
//     const total = amount + taxAmount;

//     // Create order data
//     const orderData = {
//       Amount: amount,
//       Discount: 0,
//       Date: new Date().toISOString().split('T')[0], // Ensure this matches the desired date format
//       TaxAmt: taxAmount,
//       Cess: 0,
//       AddressId: selectedAddressId, // Use the selected address ID
//       TxnType: 1, // Ensure this matches your API requirement
//       PayMode: paymentMethod === 'Card' ? 1 : (paymentMethod === 'Cash' ? 2 : 3), // Correct payment mode
//       RoundOff: 0,
//       PayType: paymentMethod === 'Card' ? 1 : (paymentMethod === 'Cash' ? 2 : 3), // Correct payment type
//       Total: total,
//       Remarks: 'string',
//       Items: cartItems.map(item => ({
//         ItemId: item.ItemId,
//         Description: item.ItemDescription || 'string',
//         Rate: item.Amount,
//         TaxPercent: item.GST || 0,
//         TaxAmt: (item.Amount * item.Quantity * (item.GST || 0)) / 100,
//         Cess: 0,
//         StockType: 1,
//         Quantity: item.Quantity,
//       })),
//     };

//     try {
//       await axios.post(`${BaseUrl}api/User/CartCheckout`, orderData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success('Your order has been confirmed!');

//       // Clear form data
//       setCartItems([]);
//       setPaymentMethod('');
//       setCardNumber('');
//       setExpiryDate('');
//       setCvv('');

//       // Redirect after successful confirmation
//       setTimeout(() => {
//         setLoading(false);
//         navigate('/Table');
//       }, 2000);
//     } catch (error) {
//       toast.error('Error confirming order. Please try again.');
//       console.error('Error confirming order:', error);
//       setLoading(false);
//     }
//   };

//   const handleModalCancel = () => {
//     setShowConfirmationModal(false);
//   };

//   const addAddress = () => {
//     navigate('/Address');
//   };

//   return (
//     <Layout>
//       <div className="bg-gray-100 min-h-screen">
//         <div className="container mx-auto px-4 py-8">
//           {loading ? (
//             <div className="flex justify-center items-center min-h-screen">
//               <CircleLoader color="#36d7b7" size={100} />
//             </div>
//           ) : (
//             <div className="lg:grid grid-cols-10 gap-10 items-start">
//               <div className="col-span-6">
//                 <form className="flex flex-col gap-8" onSubmit={handleConfirm}>
//                   <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
//                     <h2 className="text-xl font-semibold mb-4">02. Address Selection</h2>
//                     {addresses.length === 0 ? (
//                       <div className="text-center">
//                         <p className="mb-4 text-lg font-semibold text-red-600">No addresses found. Please add an address.</p>
//                         <button
//                           onClick={addAddress}
//                           className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150"
//                         >
//                           Add Address
//                         </button>
//                       </div>
//                     ) : (
//                       <div>
//                         <label htmlFor="address-select" className="block text-sm font-medium">Select Address:</label>
//                         <select
//                           id="address-select"
//                           value={selectedAddressId}
//                           onChange={handleAddressChange}
//                           className="p-3 border border-gray-300 rounded-md w-full"
//                         >
//                           <option value="">Select Address</option>
//                           {addresses.map((address) => (
//                             <option key={address.id} value={address.id}>
//                               {address.FirstName} {address.LastName}, {address.PhoneNumber}, {address.State}, {address.Country}, {address.City}, {address.Zip}
//                             </option>
//                           ))}
//                         </select><br />
//                         <button
//                           onClick={addAddress}
//                           className="bg-gradient-to-r from-main to-subMain hover:from-subMain hover:to-main transition duration-300 ease-in-out lg:py-3 py-0 px-6 font-semibold rounded-md text-xs lg:text-sm shadow-lg transform hover:scale-105"
//                         >
//                           Add Address
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <div className="bg-white shadow-lg p-6 rounded-lg">
//                     <h2 className="text-xl font-semibold mb-4">01. Payment Details *</h2>
//                     <div className="space-y-4">
//                       <label className="block text-sm font-medium">Select Payment Method:</label>
//                       <select
//                         value={paymentMethod}
//                         onChange={(e) => setPaymentMethod(e.target.value)}
//                         className="p-3 border border-gray-300 rounded-md w-full"
//                       >
//                         <option value="">Select Payment Method</option>
//                         <option value="Google Pay">Google Pay</option>
//                         <option value="Card">Credit/Debit Card</option>
//                         <option value="Cash">Cash on Delivery</option>
//                       </select>

//                       {paymentMethod === 'Card' && (
//                         <div className="grid sm:grid-cols-2 gap-4 mt-4">
//                           <div className="flex flex-col">
//                             <label className="text-sm font-medium">Card Number</label>
//                             <input
//                               type="text"
//                               placeholder="1234 5678 9012 3456"
//                               value={cardNumber}
//                               onChange={(e) => setCardNumber(e.target.value)}
//                               className="p-3 border border-gray-300 rounded-md w-full"
//                             />
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-sm font-medium">Expiry Date</label>
//                             <input
//                               type="text"
//                               placeholder="MM/YY"
//                               value={expiryDate}
//                               onChange={(e) => setExpiryDate(e.target.value)}
//                               className="p-3 border border-gray-300 rounded-md w-full"
//                             />
//                           </div>
//                           <div className="flex flex-col">
//                             <label className="text-sm font-medium">CVV</label>
//                             <input
//                               type="text"
//                               placeholder="CVV"
//                               value={cvv}
//                               onChange={(e) => setCvv(e.target.value)}
//                               className="p-3 border border-gray-300 rounded-md w-full"
//                             />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
//                     <h2 className="text-xl font-semibold mb-4">03. Place An Order</h2>
//                     <div className="flex flex-col sm:flex-row gap-4">
//                       <Link to="/shop" className="w-full sm:w-auto flex items-center justify-center gap-3 p-3 rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition">
//                         <AiFillBackward /> Continue Shopping
//                       </Link>
//                       <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-3 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
//                         Confirm Order <IoIosCheckmarkCircle />
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>

//               <div className="col-span-4 sticky top-28">
//                 <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
//                   <OrderSummary order={true} cartItems={cartItems} closeCartDrawer={() => {}} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Confirmation Modal */}
//         <Modal
//           isOpen={showConfirmationModal}
//           onClose={handleModalCancel}
//           onConfirm={handleModalConfirm}
//         />
//       </div>
//     </Layout>
//   );
// };

// export default Checkout;
