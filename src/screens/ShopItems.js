import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingBag, FaRupeeSign } from 'react-icons/fa';
import ProductModal1 from '../components/Modals/ProductModal1';
import { BaseUrl } from '../Config/config';
// import '../components/Products1.css'; // Ensure the CSS file path is correct

const ShopItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

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
            } catch (error) {
                setError(error);
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleAddToCart = (productId) => {
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

    // Filter items to only show those with Status 0
    const filteredItems = items.filter(item => item.Status === 0);

    return (
        <div className="shop-items mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map(item => (
                    <div
                        key={item.Id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden relative group transition-transform duration-300 hover:scale-105"
                        onClick={() => openModal(item)}
                    >
                        <div className="relative cursor-pointer w-full h-60 p-2 bg-white rounded-lg group-hover:bg-opacity-70 transition-all">
                            <img
                                src={item.ItemImageUrl}
                                alt={item.ItemName}
                                className="w-full h-48 object-cover object-center rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                View Details
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-black mb-2">Description: {item.ItemDescription}</p>
                            <p className="text-sm text-black mb-2">Item Type: {item.ItemType}</p>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center text-lg font-black text-black">
                                    <FaRupeeSign className="mr-1" />
                                    {item.Rate}
                                </div>
                                <button
                                    className="bg-blue-500 text-white rounded-md p-2 transition-colors duration-300 hover:bg-blue-400 flex items-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(item.Id);
                                    }}
                                >
                                    <FaShoppingBag className="mr-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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

export default ShopItems;
