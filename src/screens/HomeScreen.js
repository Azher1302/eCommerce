import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
import FlashDeal from '../components/Home/FlashDeal';
import PopularProducts from '../components/Home/PopularProducts';
import Promos from '../components/Promos';
import Layout from '../layout/Layout';
import SearchBar from './SearchBar';
import { BsGridFill } from 'react-icons/bs';
import Titles from '../components/Titles';
import Filter from '../components/Filter';
import ProductModal1 from '../components/Modals/ProductModal1'; // Adjust the import path as needed

const HomeScreen = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

  useEffect(() => {
    // Storing arbitrary data in local storage under the 'ecommerce' key
    const ecommerceData = { admin: true, message: "Welcome to the ecommerce site" };
    localStorage.setItem('ecommerce', JSON.stringify(ecommerceData));

    // Example: Storing the admin token (replace 'your_admin_token' with your actual token)
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhOTA0YjM2Mi0xNGE5LTQyM2QtYjIyNi01NjBhMDFkOTYwOTAiLCJNb2JpbGUiOiIwIiwiVXNlcl9JZCI6IjIiLCJVc2VyX1R5cGUiOiIyIiwiZXhwIjoxNzI4MDE4ODk4LCJpc3MiOiJJbml0U291bHV0aW9ucyIsImF1ZCI6IkluaXRTb3VsdXRpb25zIn0.HtL4k7qjmnnQKQzl9I0RTCDtMSX85iCXjNeD0V92U8M';
    localStorage.setItem('adminToken1', adminToken);

    // Check for 'admin' in the local storage under the 'ecommerce' key and for adminToken
    const storedData = JSON.parse(localStorage.getItem('ecommerce'));
    const storedToken = localStorage.getItem('adminToken1');
    if (!storedData || !storedData.admin || !storedToken) {
      navigate('/');
    }

    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.onlineshop.initstore.com/api/Master/Get_All_Items');
        // Filter out products with Status = 2
        const availableProducts = response.data.filter(product => product.Status !== 2);
        setProducts(availableProducts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleSearch = (query) => {
    if (query) {
      const filteredResults = products.filter(product =>
        product.ItemName.toLowerCase().includes(query.toLowerCase()) &&
        product.Status !== 2 // Ensure that status is not 2
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]); // Clear search results if query is empty
    }
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Banner />
        <SearchBar onSearch={handleSearch} />
        {loading && <p className="text-center text-lg">Loading...</p>}
        {error && <p className="text-center text-lg text-red-500">Error: {error.message}</p>}
        <div style={{ paddingBottom: '1rem' }}>
          <Categories />
        </div>
        <Titles title={selectedCategory ? selectedCategory.ItemType : "Products"} Icon={BsGridFill} />

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {searchResults.map(product => (
              <div
                key={product.Id}
                className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
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
        ) : (
          <>
          <Filter total={products.length} onFilter={handleFilter} />
            <PopularProducts />
            <Promos />
            {/* <FlashDeal /> */}
          </>
        )}
        {/* <Filter total={products.length} onFilter={handleFilter} /> */}

        {selectedProduct && (
          <ProductModal1
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            product={selectedProduct}
            isOpen={modalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </Layout>
  );
};

export default HomeScreen;
