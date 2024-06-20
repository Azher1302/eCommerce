import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../Config/config';
import { FaShoppingBag, FaRupeeSign } from 'react-icons/fa'; // Import FontAwesome icons
import ProductModal1 from '../components/Modals/ProductModal1';
import '../components/Products1.css'; // Ensure the CSS file path is correct

const ShopItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(BaseUrl + 'api/Master/Get_All_Items', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setItems(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        if (token) {
            fetchItems();
        }
    }, [token]);

    const handleAddToCart = (productId) => {
        // Placeholder function for adding to cart
        console.log(`Added item with ID ${productId} to cart`);
    };

    const openModal = (product) => {
        setSelectedProduct(product); // Set the selected product
        setModalOpen(true); // Open the modal
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <div className="shop-items mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold mb-8">Shop Items</h1>
                <p className="text-lg text-gray-500 mb-6 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Coming soon</p>
            </div>
        );
    }

    return (
        <div className="shop-items mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* <h1 className="text-3xl font-semibold mb-8">Shop Items</h1> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden relative">
                        <div
                            onClick={() => openModal(item)} // Use openModal to open the modal and set the product
                            className="bg-deepGray cursor-pointer rounded w-full h-72 p-10 relative"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.ItemName}
                                className="w-full h-64 object-cover object-center transition-transform duration-300 hover:scale-105"
                            />
                        
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{item.Rate}</h2>
                            <p className="text-sm text-gray-600 mt-2">Description: {item.ItemDescription}</p>
                            <p className="text-sm text-gray-600">Expiration Date: {item.ExpiryDate}</p>
                            <p className="text-sm text-gray-600">Manufacture Date: {item.ManufactureDate}</p>
                            <p className="text-sm text-gray-600">Item Type: {item.ItemType}</p>
                            <p className="text-sm text-gray-600">HSN Code: {item.HSNCode}</p>
                            <p className="text-sm text-gray-600">Batch Number: {item.BatchNumber}</p>
                            
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center text-lg font-black">
                                    <FaRupeeSign className="mr-1" />
                                    {item.Rate}
                                </div>
                                <button
                                    className="bg-main rounded-md transition hover:bg-subMain p-2"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the modal open
                                        handleAddToCart(item.id);
                                    }} // Handle add to cart
                                >
                                    <FaShoppingBag />
                                </button>
                            </div>
                         </div>
                         <div className="absolute inset-0 bg-black opacity-0 hover:opacity-25 transition duration-300"></div>
                          </div>
                     </div>
                ))}
            </div>

            {/* ProductModal component */}
            {selectedProduct && (
                <ProductModal1
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    product={selectedProduct}
                />
            )}
        </div>
    );
};

export default ShopItems;
