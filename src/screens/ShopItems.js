import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../Config/config';
import ProductModal from '../components/Modals/ProductModal';
import { FaShoppingBag } from 'react-icons/fa'; // Import FontAwesome shopping bag icon

const ShopItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState();
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
                            onClick={() => {
                                setProduct(item);
                                setModalOpen(true);
                            }}
                            className="bg-deepGray cursor-pointer rounded w-full h-72 p-10 relative"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.Rate}
                                className="w-full h-64 object-cover object-center"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{item.Rate}</h2>
                            <p className="text-sm text-gray-600 mt-2">Description: {item.ItemDescription}</p>
                            <p className="text-sm text-gray-600">Expiration Date: {item.ExpiryDate}</p>
                            <p className="text-sm text-gray-600">Manufacture Date: {item.ManufactureDate}</p>
                            <p className="text-sm text-gray-600">Item Type: {item.ItemType}</p>
                            <p className="text-sm text-gray-600">HSN Code: {item.HSNCode}</p>
                            <p className="text-sm text-gray-600">Batch Number: {item.BatchNumber}</p>
                            
                            <button
                                className="w-8 h-8 text-sm flex-colo transitions hover:bg-subMain rounded-md bg-main text-white"
                                onClick={() => openModal(item)} // Pass the item to openModal function
                            >
                                <FaShoppingBag />
                            </button>
                        </div>
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-25 transition duration-300"></div>
                    </div>
                ))}
            </div>

            {/* ProductModal component */}
            {selectedProduct && (
                <ProductModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    product={selectedProduct}
                />
            )}
        </div>
    );
};

export default ShopItems;
