import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { FaHome } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Home1() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const tokenadmin = localStorage.getItem('tokenadmin');
        if (!tokenadmin) {
            navigate('/AdminLogin');
        }
    }, [navigate]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <main className='bg-white min-h-screen flex flex-col'>
            <div className='bg-gray-800 text-white py-6'>
                <div className='container mx-auto px-4'>
                    <h1 className='text-3xl font-semibold'>Welcome to Your Dashboard</h1>
                    <p className='mt-2'>Explore your business insights and stay updated.</p>
                </div>
            </div>

            <div className='container mx-auto px-4 mt-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div className='bg-gray-100 p-6 rounded-lg flex items-center justify-between'>
                        <div>
                            <Link to={'/Dashboardproducts'}>
                                <button>
                                    <h3 className='text-lg font-semibold'>Item Type</h3>
                                </button>
                            </Link>
                        </div>
                        <BsFillArchiveFill className='text-3xl text-gray-600' />
                    </div>
                    <div className='bg-gray-100 p-6 rounded-lg flex items-center justify-between'>
                        <div>
                            <Link to={'/Dashboarditem'}>
                                <button>
                                    <h3 className='text-lg font-semibold'>Products</h3>
                                </button>
                            </Link>
                        </div>
                        <BsPeopleFill className='text-3xl text-gray-600' />
                    </div>
                    <div className='bg-gray-100 p-6 rounded-lg flex items-center justify-between'>
                        <div>
                            <Link to={'/AllProductShow'}>
                                <button>
                                    <h3 className='text-lg font-semibold'>All Products</h3>
                                </button>
                            </Link>
                        </div>
                        <BsFillBellFill className='text-3xl text-gray-600' />
                    </div>
                    <div className='bg-gray-100 p-6 rounded-lg flex items-center justify-between'>
                        <div>
                            <Link to={'/AllItemShow'}>
                                <button>
                                    <h3 className='text-lg font-semibold'>All Item</h3>
                                </button>
                            </Link>
                        </div>
                        <BsFillBellFill className='text-3xl text-gray-600' />
                    </div>
                    <div className='bg-gray-100 p-6 rounded-lg flex items-center justify-between'>
                        <div>
                            <Link to={'/Table'}>
                                <button>
                                    <h3 className='text-lg font-semibold'>User Order</h3>
                                </button>
                            </Link>
                        </div>
                        <BsFillBellFill className='text-3xl text-gray-600' />
                    </div>
                    <div className='relative'>
                        <button
                            onClick={toggleDropdown}
                            className='bg-gray-100 p-6 rounded-lg flex items-center justify-between w-full'
                        >
                            <div>
                                <h3 className='text-lg font-semibold'>Master</h3>
                            </div>
                            <BsFillBellFill className='text-3xl text-gray-600' />
                        </button>
                        {dropdownOpen && (
                            <div className='absolute z-10 bg-gray-100 shadow-lg rounded-lg mt-2 w-full'>
                                <Link to={'/Master1'} className='block p-4 hover:bg-gray-200'>
                                    <h3 className='text-lg font-semibold'>Party</h3>
                                </Link>
                             
                            </div>
                        )}
                    </div>
                    <div className='bg-gray-100 p-6 rounded-lg flex items-center justify-between'>
                        <Link to={'/'}>
                            <button>
                                <h3 className='text-lg font-semibold'>Go to Home</h3>
                            </button>
                        </Link>
                        <FaHome className='text-3xl text-gray-600' />
                    </div>
                    <div className='bg-gray-100 p-6 rounded-lg flex items-center justify-between'>
                        <Link to={'/AdminDashboard'}>
                            <button>
                                <h3 className='text-lg font-semibold'>Back</h3>
                            </button>
                        </Link>
                        <IoIosArrowBack className='text-3xl text-gray-600' />
                    </div>
                </div>
            </div>

            {/* <div className='container mx-auto px-4 mt-8'> */}
                {/* <h2 className='text-xl font-semibold mb-4'>Sales Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer> */}

                {/* <h2 className='text-xl font-semibold mb-4 mt-8'>Revenue Breakdown</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={revenueData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Revenue" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer> */}
            {/* </div> */}
        </main>
    );
}

// Sample data for charts
// const salesData = [
//     { name: 'Jan', Sales: 1000 },
//     { name: 'Feb', Sales: 3000 },
//     { name: 'Mar', Sales: 6000 },
//     { name: 'Apr', Sales: 8000 },
//     { name: 'May', Sales: 7000 },
//     { name: 'Jun', Sales: 9000 },
// ];

export default Home1;
