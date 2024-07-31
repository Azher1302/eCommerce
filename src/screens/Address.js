import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BaseUrl } from '../Config/config';

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    Id: null, // Use null for new addresses
    firstName: '',
    lastName: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('You are not logged in!');
        return;
      }

      try {
        const response = await fetch('https://api.onlineshop.initstore.com/api/User/GetUserAdresses', {
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

    fetchAddresses();
  }, []);

  const handleDelete = async (addressId) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      toast.error('You are not logged in!');
      return;
    }
  
    try {
      const response = await fetch(BaseUrl +  `api/User/DeleteUserAdresses?AddressId=${addressId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Address not found');
        } else {
          toast.error('Failed to delete address');
        }
        return;
      }
  
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.Id !== addressId)
      );
      toast.success('Address deleted successfully');
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Failed to delete address');
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Phone number validation
    if (name === 'phoneNumber') {
      const cleanedValue = value.replace(/\D/g, '');

      const phoneRegex = /^[89][0-9]{0,9}$/;
      if (!phoneRegex.test(cleanedValue)) {
        setPhoneNumberError('Phone number must start with 8 or 9 and be up to 10 digits long');
      } else {
        setPhoneNumberError('');
      }

      setNewAddress((prevAddress) => ({
        ...prevAddress,
        phoneNumber: cleanedValue,
      }));
    } else if (name === 'zip') {
      // Zip code validation
      const zipRegex = /^[0-9]{6}$/;
      if (!zipRegex.test(value)) {
        setZipCodeError('Zip code must be exactly 6 digits long');
      } else {
        setZipCodeError('');
      }

      setNewAddress((prevAddress) => ({
        ...prevAddress,
        zip: value,
      }));
    } else {
      setNewAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value,
      }));
    }
  };

  const handleAddOrUpdateAddress = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('You are not logged in!');
      return;
    }

    // Validate phone number and zip code before submission
    const phoneRegex = /^[89][0-9]{9}$/;
    const zipRegex = /^[0-9]{6}$/;

    if (!phoneRegex.test(newAddress.phoneNumber)) {
      toast.error('Phone number must start with 8 or 9 and be exactly 10 digits long');
      return;
    }

    if (!zipRegex.test(newAddress.zip)) {
      toast.error('Zip code must be exactly 6 digits long');
      return;
    }

    try {
      const response = await fetch('https://api.onlineshop.initstore.com/api/User/AddorUpdateAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Id: newAddress.Id || 0, // Use 0 for new addresses
          Address: `${newAddress.streetAddress}, ${newAddress.city}, ${newAddress.state}, ${newAddress.country}, ${newAddress.zip}`,
          FirstName: newAddress.firstName,
          LastName: newAddress.lastName,
          PhoneNumber: newAddress.phoneNumber,
          City: newAddress.city,
          State: newAddress.state,
          Country: newAddress.country,
          Zip: newAddress.zip,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add/update address');
      }

      const data = await response.json();
      if (isEditing) {
        setAddresses((prevAddresses) =>
          prevAddresses.map((address) =>
            address.Id === data.Id ? data : address
          )
        );
        setIsEditing(false);
        setEditingAddressId(null);
        toast.success('Address updated successfully');
      } else {
        setAddresses((prevAddresses) => [...prevAddresses, data]);
        toast.success('Address added successfully');
      }

      // Reset the form
      setNewAddress({
        Id: null,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        zip: '',
      });
    } catch (error) {
      console.error('Error adding/updating address:', error);
      toast.error('Failed to add/update address');
    }
  };

  const handleEditAddress = (address) => {
    setNewAddress({
      Id: address.Id,
      firstName: address.FirstName,
      lastName: address.LastName,
      phoneNumber: address.PhoneNumber,
      streetAddress: address.Address.split(',')[0] || '',
      city: address.City,
      state: address.State,
      country: address.Country,
      zip: address.Zip,
    });
    setEditingAddressId(address.Id);
    setIsEditing(true);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Address Management</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isEditing ? 'Edit Address' : 'Add New Address'}
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {[
            { name: 'firstName', label: 'First Name', type: 'text' },
            { name: 'lastName', label: 'Last Name', type: 'text' },
            { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
            { name: 'streetAddress', label: 'Street Address', type: 'text' },
            { name: 'city', label: 'City', type: 'text' },
            { name: 'state', label: 'State', type: 'text' },
            { name: 'country', label: 'Country', type: 'text' },
            { name: 'zip', label: 'Pincode', type: 'text' },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor={name}>
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={newAddress[name]}
                onChange={handleInputChange}
                className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${name === 'phoneNumber' && phoneNumberError ? 'border-red-500' : ''} ${name === 'zip' && zipCodeError ? 'border-red-500' : ''}`}
              />
              {name === 'phoneNumber' && phoneNumberError && (
                <p className="text-red-500 text-sm mt-1">{phoneNumberError}</p>
              )}
              {name === 'zip' && zipCodeError && (
                <p className="text-red-500 text-sm mt-1">{zipCodeError}</p>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleAddOrUpdateAddress}
          className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isEditing ? 'Update Address' : 'Add Address'}
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Existing Addresses</h2>
        {addresses.length > 0 ? (
          <div className="grid gap-6">
            {addresses.map((address) => (
              <div key={address.Id} className="bg-white shadow-lg rounded-lg p-6">
                <p><strong>Name:</strong> {address.FirstName} {address.LastName}</p>
                <p><strong>Phone:</strong> {address.PhoneNumber}</p>
                <p><strong>Address:</strong> {address.Address}</p>
                <p><strong>State:</strong> {address.State}</p>
                <p><strong>Pincode:</strong> {address.Zip}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="py-2 px-4 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.Id)}
                    className="py-2 px-4 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No addresses found.</p>
        )}
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Address;
