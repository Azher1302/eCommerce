import React, { useState,useEffect } from 'react'; // Import useState hook
import Layout from '../layout/Layout';
import OrderSummary from '../components/OrderSummary';
import { BiMap } from 'react-icons/bi';
import { MdCloudDownload } from 'react-icons/md';
import Checkout from './Checkout';

function OrderScreen() {
  // Define state for userData
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserData = JSON.parse(localStorage.getItem('orderData')) || {};
    setUserData(storedUserData);
    console.log(userData);
  }, []);

  const OrderInfo = [
    {
      name: ' 01. Personal Details',
      details: [
        {
          title: 'Full Name',
          sub: userData.fullname, // Access userData with optional chaining
        },
        {
          title: 'Email',
          sub: userData.email,
        },
        {
          title: 'Phone',
          sub: '+255 754 661 424',
        },
      ],
    },
    {
      name: '02. Shipping Details',
      details: [
        {
          title: 'Street Address',
          sub: "Njiro Container Bolck 'D'",
        },
        {
          title: 'City',
          sub: 'Arusha',
        },
        {
          title: 'Country',
          sub: 'Tanzania',
        },
        {
          title: 'ZIP',
          sub: '457143',
        },
        {
          title: 'Shipping By',
          sub: 'FedEx',
        },
      ],
    },
    {
      name: '03. Payment Details',
      details: [
        {
          title: 'Payment Method',
          sub: 'Stripe',
        },
        {
          title: 'Card No',
          sub: '456 ************** 674',
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className="bg-deepGray">
        <div className="min-h-screen container mx-auto px-4">
          <div className="lg:grid grid-cols-10 gap-10 items-start py-12">
            <div className="col-span-6 lg:mb-0 mb-10">
              <form className="flex flex-col gap-12">
                {OrderInfo.map((o, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <h2 className="font-semibold text-lg mb-3">{o.name}</h2>
                    {o.details.map((d, index) => (
                      <div
                        key={index}
                        className="flex items-center border-b border-gray-200 py-3 justify-between w-full text-gray-500"
                      >
                        {d.title}
                        <span className="font-semibold text-black">
                          {d.sub}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="flex flex-col gap-6">
                  <div className="grid sm:grid-cols-2 gap-4 ">
                    <a
                      rel="noopener noreferrer"
                      href="https://www.fedex.com/en-us/home.html"
                      target="_blank"
                      className="w-full flex-rows gap-3 p-3 rounded text-black border-2 border-main"
                    >
                      <BiMap /> Tracking Link
                    </a>
                    <button
                      type="button"
                      className="w-full  flex-rows gap-3 p-3 hover:bg-subMain transitions rounded text-white bg-main"
                    >
                      Download Recipt <MdCloudDownload />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="sticky flex-colo gap-4 p-6 rounded-md top-28 col-span-4 bg-white border  border-text">
              <OrderSummary order={true} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OrderScreen;
