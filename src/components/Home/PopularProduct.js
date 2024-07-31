import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingBag, FaRupeeSign } from 'react-icons/fa';
import ProductModal1 from '../Modals/ProductModal1';

import { BaseUrl } from '../../Config/config';
import './Products1.css';

const PopularProduct = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showItems, setShowItems] = useState({});

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${BaseUrl}api/Master/Get_All_Items`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                const updatedData = data.map((item, index) => ({
                    ...item,
                    SequentialId: index,
                    ItemImageUrl: item.ItemImage ? `${BaseUrl}api/Master/LoadItemImage?ImageName=${item.ItemImage}` : null
                }));
                setItems(updatedData);
                const initialShowItems = {};
                updatedData.forEach(item => {
                    initialShowItems[item.Id] = item.Status === 1;
                });
                setShowItems(initialShowItems);
            } catch (error) {
                setError(error);
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false); // Ensure loading is set to false after data fetch
            }
        };

        fetchItems();
    }, []);

    const handleAddToCart = (productId) => {
        // Placeholder function for adding to cart
        console.log(`Added item with ID ${productId} to cart`);
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    if (loading) {
        return <p className="text-center text-lg">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-lg text-red-500">Error: {error.message}</p>;
    }

    const filteredItems = items.filter(item => item.Status === 0);

    return (
        <div className="shop-items mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map(item => ( // Limiting the number of displayed items to 8
                    <div
                        key={item.Id} // Use item.Id as the key
                        className="bg-white shadow-lg rounded-lg overflow-hidden relative group transition-transform duration-300 hover:scale-105"
                        onClick={() => openModal(item)}
                    >
                        <div className="relative cursor-pointer w-full h-60 p-2 bg-white rounded-lg group-hover:bg-opacity-70 transition-all">
                            <img
                                src={item.ItemImageUrl} // Use item.ItemImageUrl for image source
                                alt={item.ItemName}
                                className="w-full h-48 object-cover object-center rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                            {/* <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                View Details
                            </div> */}
                        </div>
                        <div className="p-4">
                            <p className="flex items-center justify-between mt-4 font-extrabold">{item.ItemName}</p>
                            {/* <p className="text-sm text-black mb-2">Name: {item.ItemName}</p> */}
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center text-lg font-black text-black">
                                    <FaRupeeSign className="mr-1" />
                                    {item.Rate}
                                </div>
                                <button
                                    className="bg-blue-500 text-white rounded-md p-2 transition-colors duration-300 hover:bg-blue-400 flex items-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(item.Id); // Use item.Id for the productId
                                    }}
                                >
                                    <FaShoppingBag className="mr-1" />
                                </button>
                            </div>
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
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default PopularProduct;
