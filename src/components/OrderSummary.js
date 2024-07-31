// import React, { useState, useEffect } from 'react';
// import { MdDelete } from 'react-icons/md';
// import { FaRupeeSign } from 'react-icons/fa';
// import ProductModal from './Modals/ProductModal2';
// import { Transition } from '@headlessui/react';
// import { BaseUrl } from '../Config/config';
// import { toast } from 'react-toastify';

// function OrderSummary({ order, cartDrawerOpen, closeCartDrawer }) {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [product, setProduct] = useState(null);
//   const [items, setItems] = useState([]);
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [gstCategories, setGstCategories] = useState([]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await fetch(`${BaseUrl}api/User/GetUserCart`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch items');
//         }

//         const data = await response.json();
//         const updatedData = data.map((item, index) => ({ ...item, SequentialId: index + 1 }));
//         setItems(updatedData);
//       } catch (error) {
//         console.error('Error fetching items:', error);
//         toast.error('Failed to fetch items');
//       }
//     };

//     const fetchGstCategories = async () => {
//       try {
//         const response = await fetch(`${BaseUrl}api/Master/GetItemMaster?type=0`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch GST categories');
//         }

//         const data = await response.json();
//         setGstCategories(data);
//       } catch (error) {
//         console.error('Error fetching GST categories:', error);
//         toast.error('Failed to fetch GST categories');
//       }
//     };

//     fetchItems();
//     fetchGstCategories();
//   }, [token]);

//   const updateLocalStorage = (updatedItems) => {
//     localStorage.setItem('cartItems', JSON.stringify(updatedItems));
//   };

//   const handleDelete = async (index) => {
//     const item = items[index];
//     try {
//       const response = await fetch(`${BaseUrl}api/User/RemoveItemFromCart?Id=${item.id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const updatedItems = [...items];
//         updatedItems.splice(index, 1);
//         setItems(updatedItems);
//         updateLocalStorage(updatedItems);
//         toast.success('Item removed from cart successfully');
//         closeCartDrawer();
//         // Avoid reloading the page
//       } else {
//         toast.error('Failed to remove item from cart');
//       }
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//       toast.error('Failed to remove item from cart');
//     }
//   };

//   const handleAddToCart = (product) => {
//     const updatedItems = [...items, { ...product, quantity: 1 }];
//     setItems(updatedItems);
//     updateLocalStorage(updatedItems);
//     setModalOpen(false);
//     setProduct(null);
//   };

//   const handleQuantityChange = (index, change) => {
//     const updatedItems = [...items];
//     updatedItems[index].quantity += change;
//     if (updatedItems[index].quantity < 1) {
//       updatedItems[index].quantity = 1;
//     }
//     setItems(updatedItems);
//     updateLocalStorage(updatedItems);
//   };

//   // Calculate subtotal for each item
//   const subtotal = items.reduce((total, item) => total + (item.Amount * item.Quantity), 0);

//   // Delivery charge and discount
//   const Delivery = 40;
//   const discount = 23;
//   const GST = items.reduce((total, item) => total + (item.GST * item.Quantity), 0);

//   // Calculate final total
//   const finalTotal = subtotal + Delivery + GST;

//   return (
//     <>
//       <Transition show={modalOpen} as={React.Fragment}>
//         <ProductModal
//           modalOpen={modalOpen}
//           setModalOpen={setModalOpen}
//           product={product}
//           handleAddToCart={handleAddToCart}
//         />
//       </Transition>
//       <h2 className="font-semibold text-lg">Order Summary</h2>
//       <div className="overflow-y-scroll flex-grow scrollbar-hide w-full h-72">
//         {items.length ? (
//           items.map((p, i) => (
//             <div key={i} className="grid grid-cols-8 gap-2 my-6 items-center">
//               <div className="col-span-2 bg-deepGray rounded p-2 h-24">
//                 <img
//                   alt={p.ItemName}
//                   src={p.ItemImage ? `${BaseUrl}api/Master/LoadItemImage?ImageName=${p.ItemImage}` : '/default-image.png'}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <div className="col-span-4 flex flex-col text-sm gap-2">
//                 <h3 className="font-medium truncate">{p.ItemName}</h3>
//                 <div className="flex items-center">
//                   <h2 className="font-bold flex items-center">
//                     <FaRupeeSign /> <span className="ml-1">{p.Amount}</span>
//                   </h2>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span>Quantity: {p.Quantity}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="text-gray-600">GST:</span>
//                   <span className="ml-1">{p.GST.toFixed(2)}</span>
//                 </div>
//               </div>
//               <div className="col-span-1 flex-col">
//                 <button
//                   onClick={() => handleDelete(i)}
//                   className="flex-col p-2 text-lg bg-flash rounded text-white hover:bg-main hover:text-white"
//                 >
//                   <MdDelete />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No products in cart</p>
//         )}
//       </div>
//       <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500">
//         Subtotal
//         <span className="text-gray-800 font-bold flex items-center">
//           <FaRupeeSign /> {subtotal.toFixed(1)}
//         </span>
//       </div>

//       <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500">
//         Delivery Charge
//         <span className="text-gray-800 font-bold flex items-center">
//           <FaRupeeSign /> {Delivery.toFixed(1)}
//         </span>
//       </div>

//       <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500">
//         Tax (GST)
//         <span className="text-gray-800 font-bold flex items-center">
//           <FaRupeeSign /> {GST.toFixed(1)}
//         </span>
//       </div>

//       <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500 mt-4">
//         Total Payment
//         <span className="rounded-md font-bold py-2 px-3 bg-white text-subMain flex items-end">
//           <FaRupeeSign className="mr-0" /> {finalTotal.toFixed(1)}
//         </span>
//       </div>
//     </>
//   );
// }

// export default OrderSummary;





// ^.^ //  orginal 








import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';
import ProductModal from './Modals/ProductModal2';
import { Transition } from '@headlessui/react';
import { BaseUrl } from '../Config/config';
import { toast } from 'react-toastify';

function OrderSummary({ order, cartDrawerOpen, closeCartDrawer }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [items, setItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${BaseUrl}api/User/GetUserCart`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }

        const data = await response.json();
        const updatedData = data.map((item, index) => ({ ...item, SequentialId: index + 1 }));
        setItems(updatedData);
      } catch (error) {
        console.error('Error fetching items:', error);
        toast.error('Failed to fetch items');
      }
    };

    fetchItems();
  }, [token]);

  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleDelete = async (index) => {
    const item = items[index];
    try {
      const response = await fetch(`${BaseUrl}api/User/RemoveItemFromCart?Id=${item.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
        updateLocalStorage(updatedItems);
        toast.success('Item removed from cart successfully');
        closeCartDrawer();
        window.location.reload();
        // Avoid reloading the page
      } else {
        toast.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
   
  };

  const handleAddToCart = (product) => {
    const updatedItems = [...items, { ...product, quantity: 1 }];
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
    setModalOpen(false);
    setProduct(null);
  };

  const handleQuantityChange = (index, change) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += change;
    if (updatedItems[index].quantity < 1) {
      updatedItems[index].quantity = 1;
    }
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  // Calculate subtotal for each item
  const subtotal = items.reduce((total, item) => total + (item.Amount ),0);

  // Delivery charge and discount
  const Delivery = 40;
  const discount = 23;
  const GST =  items.reduce((total, item) => total + item.GST, 0);

  // Calculate final total
  const finalTotal = subtotal + Delivery + GST ;

  return (
    <>
      <Transition show={modalOpen} as={React.Fragment}>
        <ProductModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={product}
          handleAddToCart={handleAddToCart}
        />
      </Transition>
      <h2 className="font-semibold text-lg">Order Summary</h2>
      <div className="overflow-y-scroll flex-grow scrollbar-hide w-full h-72">
        {items.length ? (
          items.map((p, i) => (
            <div key={i} className="grid grid-cols-8 gap-2 my-6 items-center">
              <div className="col-span-2 bg-deepGray rounded p-2 h-24">
                <img
                  alt={p.ItemName}
                  src={p.ItemImage ? `${BaseUrl}api/Master/LoadItemImage?ImageName=${p.ItemImage}` : '/default-image.png'}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="col-span-4 flex flex-col text-sm gap-2">
                <h3 className="font-medium truncate">{p.ItemName}</h3>
                <div className="flex items-center">
                  <h2 className="font-bold flex items-center">
                    <FaRupeeSign /> <span className="ml-1">{p.Amount}</span>
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Quantity: {p.Quantity}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600">GST:</span>
                  <span className="ml-1">{p.GST.toFixed(2)}</span>
                </div>
              </div>
              <div className="col-span-1 flex-col">
                <button
                  onClick={() => handleDelete(i)}
                  className="flex-col p-2 text-lg bg-flash rounded text-white hover:bg-main hover:text-white"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products in cart</p>
        )}
      </div>
      <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500">
        Subtotal
        <span className="text-gray-800 font-bold flex items-center">
          <FaRupeeSign /> {subtotal.toFixed(1)}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500">
        Delivery Charge
        <span className="text-gray-800 font-bold flex items-center">
          <FaRupeeSign /> {Delivery.toFixed(1)}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500">
        Tax (GST)
        <span className="text-gray-800 font-bold flex items-center">
          <FaRupeeSign /> {items.reduce((total, item) => total + item.GST, 0).toFixed(1)}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm w-full font-semibold text-gray-500 mt-4">
        Total Payment
        <span className="rounded-md font-bold py-2 px-3 bg-white text-subMain flex items-end">
          <FaRupeeSign className="mr-0" /> {finalTotal.toFixed(1)}
        </span>
      </div>
    </>
  );
}

export default OrderSummary;
