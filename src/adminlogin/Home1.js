import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { FaHome } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function Home1() {
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
                    {/* <div className='bg-gray-100 p-6 rounded-lg flex items-center justify-between'>
                        <div>
                            <Link to={'/Dashboardcategories'}>
                            <button>
                            <h3 className='text-lg font-semibold'>Categories</h3>
                            </button>
                            </Link>
                        </div>
                        <BsFillGrid3X3GapFill className='text-3xl text-gray-600' />
                    </div> */}
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
                            <Link to={'/AllItemShow'}>
                                <button>
                            <h3 className='text-lg font-semibold'>All Products</h3>
                                </button>
                            </Link>
                        </div>
                        <BsFillBellFill className='text-3xl text-gray-600' />
                    </div>
                    <div className='bg-gray-100 p-6 rounded-lg flex items-center justify-between'>
                        <div>
                            <Link to={'/AllProductShow'}>
                                <button>
                  
                            <h3 className='text-lg font-semibold'> All Item</h3>
                            </button>
                            </Link>
                        </div>
                        <BsFillBellFill className='text-3xl text-gray-600' />
                    </div>
                  
                    <div className='bg-gray-100 p-6 rounded-lg flex items-center justify-between'>
                       
                            <Link to={'/'} className="hover:underline">
                                 <button>
                                <h3 className='text-lg font-semibold'>Go to home</h3>
                         </button>   
                         </Link>
                        
                        <FaHome   className='text-3xl text-gray-600'/>
                    </div>
                    <div className='bg-gray-100 p-6 rounded-lg flex items-center justify-between'>
                       
                            <Link to={'/AdminDashboard'} className="hover:underline">
                                 <button>
                                <h3 className='text-lg font-semibold'>Back</h3>
                        </button>  
                           </Link>
                       
                        <IoIosArrowBack  className='text-3xl text-gray-600'/>
                    </div>
                </div>
            </div>

            <div className='container mx-auto px-4 mt-8'>
                <h2 className='text-xl font-semibold mb-4'>Sales Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={salesData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>

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
            </div>
     
      
        </main>
    );
}

// Sample data for charts
const salesData = [
    { name: 'Jan', Sales: 1000 },
    { name: 'Feb', Sales: 3000 },
    { name: 'Mar', Sales: 6000 },
    { name: 'Apr', Sales: 8000 },
    { name: 'May', Sales: 7000 },
    { name: 'Jun', Sales: 9000 },
];

// const revenueData = [
//     { name: 'Electronics', Revenue: 5000 },
//     { name: 'Clothing', Revenue: 3000 },
//     { name: 'Books', Revenue: 2000 },
//     { name: 'Accessories', Revenue: 4000 },
// ];

export default Home1;
