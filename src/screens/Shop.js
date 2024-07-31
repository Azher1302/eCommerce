import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Filter from '../components/Filter';
import Layout from '../layout/Layout';
import Promos from '../components/Promos';
import CategoriesShop from '../components/Home/Categories';
import PopularProduct from '../components/Home/PopularProduct';
import SearchBar from './SearchBar';
import ProductModal1 from '../components/Modals/ProductModal1'; // Adjust the import path as needed
import { BaseUrl } from '../Config/config';

function Shop() {
  const maxItemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(maxItemsPerPage);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
  const [hasShownNoProductsToast, setHasShownNoProductsToast] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(BaseUrl + 'api/Master/Get_All_Items', {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setError('Products not found');
        } else {
          setError('Error fetching products');
        }
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + maxItemsPerPage);
  };

  const handleFilter = (category) => {
    if (category === 'All') {
      setFilteredProducts(null); // Show all products
    } else {
      const filtered = products.filter((product) =>
        product.categories.includes(category)
      );
      setFilteredProducts(filtered);
    }
  };

  // const handleSearch = (query) => {
  //   if (query) {
  //     const filteredResults = products.filter(product =>
  //       product.ItemName.toLowerCase().includes(query.toLowerCase()) &&
  //       product.Status !== 2 // Ensure that status is not 2
  //     );
  //     setSearchResults(filteredResults);
  //     if (filteredResults.length === 0) {
  //       toast.error('No products found');
  //     }
  //   } else {
  //     setSearchResults([]); // Clear search results if query is empty
  //   }
  // };

  const handleSearch = (query) => {
    if (query) {
      const filteredResults = products.filter(product =>
        product.ItemName.toLowerCase().includes(query.toLowerCase()) &&
        product.Status !== 2 // Ensure that status is not 2
      );
      setSearchResults(filteredResults);

      if (filteredResults.length === 0 && !hasShownNoProductsToast) {
        toast.error('No products found');
        setHasShownNoProductsToast(true); // Set flag to prevent duplicate toasts
      } else if (filteredResults.length > 0) {
        setHasShownNoProductsToast(false); // Reset flag if products are found
      }
    } else {
      setSearchResults([]); // Clear search results if query is empty
      setHasShownNoProductsToast(false); // Reset flag if search query is cleared
    }
  };





  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const displayedProducts = filteredProducts || products.slice(0, currentPage);

  return (
    <Layout>
      <SearchBar onSearch={handleSearch} />
      <div className="min-h-screen container mx-auto px-4 my-6">
        <CategoriesShop />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {searchResults.map(product => (
            <div
              key={product.Id}
              className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={BaseUrl + `api/Master/LoadItemImage?ImageName=${product.ItemImage}`}
               
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.ItemName}</h3>
                <p className="text-sm">{product.ItemDescription}</p>
              </div>
            </div>
          ))}
        </div>
        <Filter total={products.length} onFilter={handleFilter} />
        <PopularProduct />
        {currentPage < products.length && (
          <div className="w-full flex justify-center my-12">
            <button
              onClick={handleLoadMore}
              className="flex items-center justify-center gap-3 py-3 px-8 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Load More
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-5 w-5 rounded-full bg-white"></span>
              </span>
            </button>
          </div>
        )}
        <Promos />
      </div>
      {selectedProduct && (
        <ProductModal1
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={selectedProduct}
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      )}
      <ToastContainer />
    </Layout>
  );
}

export default Shop;












// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Filter from '../components/Filter';
// import Layout from '../layout/Layout';
// import Promos from '../components/Promos';
// import CategoriesShop from '../components/Home/Categories';
// import PopularProduct from '../components/Home/PopularProduct';
// import SearchBar from './SearchBar';
// import ProductModal1 from '../components/Modals/ProductModal1'; // Adjust the import path as needed
// import { BaseUrl } from '../Config/config';

// function Shop() {
//   const maxItemsPerPage = 10;
//   const [currentPage, setCurrentPage] = useState(maxItemsPerPage);
//   const [filteredProducts, setFilteredProducts] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
//   const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     axios.get(BaseUrl + 'api/Master/Get_All_Items', {
//       // headers: {
//       //   Authorization: `Bearer ${token}`
//       // }
//     })
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         if (error.response && error.response.status === 404) {
//           setError('Products not found');
//         } else {
//           setError('Error fetching products');
//         }
//         console.error('Error fetching products:', error);
//       });
//   }, []);

//   const handleLoadMore = () => {
//     setCurrentPage(currentPage + maxItemsPerPage);
//   };

//   const handleFilter = (category) => {
//     if (category === 'All') {
//       setFilteredProducts(null); // Show all products
//     } else {
//       const filtered = products.filter((product) =>
//         product.categories.includes(category)
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   const handleSearch = (query) => {
//     if (query) {
//       const filteredResults = products.filter(product =>
//         product.ItemName.toLowerCase().includes(query.toLowerCase()) &&
//         product.Status !== 2 // Ensure that status is not 2
//       );
//       setSearchResults(filteredResults);
//       if (filteredResults.length === 0) {
//         toast.error('No products found');
//       }
//     } else {
//       setSearchResults([]); // Clear search results if query is empty
//     }
//   };

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedProduct(null);
//     setModalOpen(false);
//   };

//   const displayedProducts = searchResults.length > 0 ? searchResults : (filteredProducts || products.slice(0, currentPage));

//   return (
//     <Layout>
//       <SearchBar onSearch={handleSearch} />
//       <div className="min-h-screen container mx-auto px-4 my-6">
//         <CategoriesShop />
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {displayedProducts.length > 0 ? (
//             displayedProducts.map(product => (
//               <div
//                 key={product.Id}
//                 className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer"
//                 onClick={() => handleProductClick(product)}
//               >
//                 <img
//                   src={BaseUrl + `api/Master/LoadItemImage?ImageName=${product.ItemImage}`}
//                   alt={product.ItemName}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold">{product.ItemName}</h3>
//                   <p className="text-sm">{product.ItemDescription}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600 mt-6">No products found.</p>
//           )}
//         </div>
//         <Filter total={products.length} onFilter={handleFilter} />
//         <PopularProduct />
//         {currentPage < products.length && (
//           <div className="w-full flex justify-center my-12">
//             <button
//               onClick={handleLoadMore}
//               className="flex items-center justify-center gap-3 py-3 px-8 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
//             >
//               Load More
//               <span className="relative flex h-5 w-5">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//                 <span className="relative inline-flex h-5 w-5 rounded-full bg-white"></span>
//               </span>
//             </button>
//           </div>
//         )}
//         <Promos />
//       </div>
//       {selectedProduct && (
//         <ProductModal1
//           modalOpen={modalOpen}
//           setModalOpen={setModalOpen}
//           product={selectedProduct}
//           isOpen={modalOpen}
//           onClose={handleCloseModal}
//         />
//       )}
//       <ToastContainer />
//     </Layout>
//   );
// }

// export default Shop;
