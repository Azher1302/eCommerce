import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import CategoriesShop from '../components/Home/Categories';
import Filter from '../components/Filter';
import Products from '../components/Products'; // Ensure the path is correct
import Layout from '../layout/Layout';
import Promos from '../components/Promos';
import ShopItems from './ShopItems';
import CategoriesShop from '../components/Home/Categories';
import PopularProduct from '../components/Home/PopularProduct';
import SearchBar from './SearchBar';


function Shop() {
  const maxItemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(maxItemsPerPage);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://api.onlineshop.initstore.com/api/Master/Get_All_Items', {
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

  const handleSearch = (query) => {
    if (query) {
      const filteredResults = products.filter(product =>
        product.ItemName.toLowerCase().includes(query.toLowerCase()) &&
        product.Status !== 2 // Ensure that status is not 2
      );
      setSearchResults(filteredResults);
      if (filteredResults.length === 0) {
        toast.error('No products found');
      }
    } else {
      setSearchResults([]); // Clear search results if query is empty
    }
  };

  const displayedProducts = filteredProducts || products.slice(0, currentPage);

  return (
    <Layout>
      <SearchBar onSearch={handleSearch} />
      <div className="min-h-screen container mx-auto px-4 my-6">
        <CategoriesShop />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {searchResults.map(product => (
            <div key={product.Id} className="bg-white shadow-lg rounded-xl overflow-hidden">
              <img
                src={`https://api.onlineshop.initstore.com/api/Master/LoadItemImage?ImageName=${product.ItemImage}`}
                alt={product.ItemName}
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
      <ToastContainer />
    </Layout>
  );
}

export default Shop;
