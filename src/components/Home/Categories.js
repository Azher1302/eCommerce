// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Titles from '../Titles';
// import { BsGridFill, BsWindowSidebar } from 'react-icons/bs';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper';
// import 'swiper/swiper-bundle.min.css';
// import ProductModal1 from '../Modals/ProductModal1';
// import { BaseUrl } from '../../Config/config';

// const CategoriesShop = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch categories
//         const categoriesResponse = await axios.get(BaseUrl + 'api/Master/GetItemMaster?type=0', {
//           // headers: {
//           //   Authorization: `Bearer ${token}`,
//           // },
//         });

//         // Fetch all products
//         const productsResponse = await axios.get(BaseUrl + 'api/Master/Get_All_Items', {
//           // headers: {
//           //   Authorization: `Bearer ${token}`,
//           // },
//         });

//         setCategories(categoriesResponse.data);
//         setProducts(productsResponse.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
        
//     };

//     fetchData();
//   }, [token]);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleBackToCategories = () => {
//     setSelectedCategory(null);
//   };

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedProduct(null);
//     setModalOpen(false);
//   };

//   if (loading) {
//     return <p className="text-center text-lg">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-lg text-red-500">Error: {error.message}</p>;
//   }

//   // Filter products based on selected category and status
//   const filteredProducts = selectedCategory
//     ? products.filter(product => product.ItemType === selectedCategory.ItemType && product.Status === 0)
//     : products.filter(product => product.Status === 0);

//   // Filter categories based on status
//   const filteredCategories = categories.filter(category => category.Status === 0);

//   return (
//     <div className="container mx-auto my-8 sm:my-12">
//       <Titles title={selectedCategory ? selectedCategory.ItemType : "Categories"} Icon={BsGridFill} />
//       <div className="mt-5 sm:mt-10">
//         {selectedCategory ? (
//           <div>
//             <button
//               onClick={handleBackToCategories}
//               className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 transition duration-300 ease-in-out lg:py-3 py-2 px-6 font-semibold rounded-md text-xs lg:text-sm shadow-lg transform hover:scale-105"
//             >
//               Back to Categories
//             </button>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
//               {filteredProducts.map(product => (
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
//                     <p className="text-sm text-gray-600">{product.ItemDescription}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <Swiper
//             modules={[Autoplay]}
//             autoplay={{ delay: 3000 }}
//             slidesPerView={2}
//             spaceBetween={10}
//             breakpoints={{
//               640: { slidesPerView: 3 },
//               768: { slidesPerView: 4 },
//               1024: { slidesPerView: 5 },
//             }}
//             className="py-20"
//           >
//             {filteredCategories.map(category => (
//               <SwiperSlide key={category.Id} onClick={() => handleCategoryClick(category)}>
//                 <div className="px-4 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//                   <div className="p-2 text-center">
//                     <h3 className="text-sm font-semibold text-white">{category.ItemType}</h3>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}
//       </div>
//       {selectedProduct && (
//         <ProductModal1
//           modalOpen={modalOpen}
//           setModalOpen={setModalOpen}
//           product={selectedProduct}
//           isOpen={modalOpen}
//         />
//       )}
//     </div>
//   );
// };

// export default CategoriesShop;



























import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Titles from '../Titles';
import { BsGridFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import ProductModal1 from '../Modals/ProductModal1';
import { BaseUrl } from '../../Config/config';

const CategoriesShop = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get(BaseUrl + 'api/Master/GetItemMaster?type=0', {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });

        // Fetch all products
        const productsResponse = await axios.get(BaseUrl + 'api/Master/Get_All_Items', {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });

        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error.message}</p>;
  }

  // Filter products based on selected category and status
  const filteredProducts = selectedCategory
    ? products.filter(product => product.ItemType === selectedCategory.ItemType && product.Status === 0)
    : products.filter(product => product.Status === 0);

  // Filter categories based on status
  const filteredCategories = categories.filter(category => category.Status === 0);

  const getSlidesPerView = () => {
    const categoryCount = filteredCategories.length;
    if (categoryCount <= 2) return 2;
    if (categoryCount <= 4) return 3;
    return 5;
  };

  return (
    <div className="container mx-auto my-8 sm:my-12">
      <Titles title={selectedCategory ? selectedCategory.ItemType : "Categories"} Icon={BsGridFill} />
      <div className="mt-5 sm:mt-10">
        {selectedCategory ? (
          <div>
            <button
              onClick={handleBackToCategories}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 transition duration-300 ease-in-out lg:py-3 py-2 px-6 font-semibold rounded-md text-xs lg:text-sm shadow-lg transform hover:scale-105"
            >
              Back to Categories
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {filteredProducts.map(product => (
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
                    <p className="text-sm text-gray-600">{product.ItemDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            slidesPerView={getSlidesPerView()}
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: getSlidesPerView() },
            }}
            className="py-20"
          >
            {filteredCategories.map(category => (
              <SwiperSlide key={category.Id} onClick={() => handleCategoryClick(category)}>
                <div className="px-4 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="p-2 text-center">
                    <h3 className="text-sm font-semibold text-white">{category.ItemType}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {selectedProduct && (
        <ProductModal1
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={selectedProduct}
          isOpen={modalOpen}
        />
      )}
    </div>
  );
};

export default CategoriesShop;
