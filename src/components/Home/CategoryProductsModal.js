// import React, { useState } from 'react';
// import { Dialog } from '@headlessui/react';
// import { BaseUrl } from '../../Config/config';
// import { FaRupeeSign } from 'react-icons/fa';
// import ProductModal1 from '../Modals/ProductModal1'; // Ensure this path is correct

// const CategoryProductsModal = ({ modalOpen, onClose, products, addToCart }) => {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [productModalOpen, setProductModalOpen] = useState(false);

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     setProductModalOpen(true);
//   };

//   const handleCloseProductModal = () => {
//     setSelectedProduct(null);
//     setProductModalOpen(false);
//   };

//   return (
//     <>
//       <Dialog open={modalOpen} onClose={onClose} className="relative z-10">
//         <Dialog.Overlay 
//           className="fixed inset-0 bg-black opacity-30"
//           onClick={onClose}
//         />

//         <div 
//           className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="bg-white rounded-lg shadow-lg max-w-screen-lg w-full mx-auto p-6 relative overflow-y-auto">
//             <button
//               onClick={onClose}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//             <h2 className="text-2xl font-bold mb-4">Products</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//               {products.map(product => (
//                 <div
//                   key={product.Id}
//                   onClick={() => handleProductClick(product)}
//                   className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
//                 >
//                   <img
//                     src={BaseUrl + `api/Master/LoadItemImage?ImageName=${product.ItemImage}`}
//                     alt={product.ItemName}
//                     className="w-full h-48 object-cover rounded-t-xl"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold text-gray-800">{product.ItemName}</h3>
//                     <div className="flex items-center">
//                       <FaRupeeSign className="text-gray-800" />
//                       <h3 className="text-lg font-semibold text-gray-800 ml-1">{product.Rate}</h3>
//                     </div>
//                     <p className="text-sm text-gray-600 mt-2">{product.ItemDescription}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </Dialog>

//       {/* Render ProductModal1 if a product is selected */}
//       {selectedProduct && (
//         <ProductModal1
//           modalOpen={productModalOpen}
//           setModalOpen={setProductModalOpen}
//           product={selectedProduct}
//           onClose={handleCloseProductModal}
//           addToCart={addToCart}
//         />
//       )}
//     </>
//   );
// };

// export default CategoryProductsModal;


import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { BaseUrl } from '../../Config/config';
import { FaRupeeSign } from 'react-icons/fa';
import ProductModal1 from '../Modals/ProductModal1'; // Ensure this path is correct

const CategoryProductsModal = ({ modalOpen, onClose, products, addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
    setProductModalOpen(false);
  };

  return (
    <>
      <Dialog open={modalOpen} onClose={onClose} className="relative z-10">
        <Dialog.Overlay 
          className="fixed inset-0 bg-black opacity-30"
          onClick={onClose}
        />

        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-screen-lg w-full mx-auto p-6 relative overflow-hidden">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="overflow-y-auto h-80"> {/* Adjust height as needed */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <div
                    key={product.Id}
                    onClick={() => handleProductClick(product)}
                    className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                  >
                    <img
                      src={BaseUrl + `api/Master/LoadItemImage?ImageName=${product.ItemImage}`}
                      alt={product.ItemName}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">{product.ItemName}</h3>
                      <div className="flex items-center">
                        <FaRupeeSign className="text-gray-800" />
                        <h3 className="text-lg font-semibold text-gray-800 ml-1">{product.Rate}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{product.ItemDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Render ProductModal1 if a product is selected */}
      {selectedProduct && (
        <ProductModal1
          modalOpen={productModalOpen}
          setModalOpen={setProductModalOpen}
          product={selectedProduct}
          onClose={handleCloseProductModal}
          addToCart={addToCart} // Pass the addToCart function
        />
      )}
    </>
  );
};

export default CategoryProductsModal;
