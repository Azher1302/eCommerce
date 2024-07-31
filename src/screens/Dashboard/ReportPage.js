// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import Header from './Header'; // Assuming Header is in the same directory

// const ReportPage = () => {
//   const [dataA, setDataA] = useState([]);
//   const [dataB, setDataB] = useState([]);
//   const [dataC, setDataC] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem('tokenadmin');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data from multiple APIs
//         const [responseA, responseB, responseC] = await Promise.all([
//           axios.get('https://api.onlineshop.initstore.com/api/User/GetCheckOutOrders', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
            
//           }),
//           axios.get('https://api.onlineshop.initstore.com/api/Master/GetItemMaster?type=0'),
//           axios.get('https://api.onlineshop.initstore.com/api/Master/Get_All_Items'),
//         ]);

//         // Set data to state
//         setDataA(responseA.data);
//         setDataB(responseB.data);
//         setDataC(responseC.data);
//       } catch (error) {
//         // Handle errors
//         setError('There was an error fetching the data!');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div>
//       {/* <Header /> */}
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-6">Comprehensive Report</h1>

//         {/* Section for Data A */}
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-4">Data A (Count: {dataA.length})</h2>
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Field 1</th>
//                 <th className="py-2 px-4 border-b">Field 2</th>
//                 {/* Add more fields if needed */}
//               </tr>
//             </thead>
//             <tbody>
//               {dataA.length > 0 ? (
//                 dataA.map((item, index) => (
//                   <tr key={index} className="hover:bg-gray-100">
//                     <td className="py-2 px-4 border-b">{item.field1}</td>
//                     <td className="py-2 px-4 border-b">{item.field2}</td>
//                     {/* Add more fields if needed */}
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="2" className="py-2 px-4 border-b text-center">No data available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </section>

//         {/* Section for Data B */}
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-4">Data B (Count: {dataB.length})</h2>
//           <ul>
//             {dataB.length > 0 ? (
//               dataB.map((item, index) => (
//                 <li key={index} className="mb-2">
//                   {item.someField}
//                 </li>
//               ))
//             ) : (
//               <li>No data available</li>
//             )}
//           </ul>
//         </section>

//         {/* Section for Data C */}
//         <section>
//           <h2 className="text-xl font-semibold mb-4">Data C (Count: {dataC.length})</h2>
//           <div className="bg-gray-100 p-4 rounded-md">
//             {dataC.someInformation || 'No data available'}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ReportPage;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../Config/config';
// import Header from './Header'; // Uncomment if you have a Header component

const ReportPage = () => {
  const [productCount, setProductCount] = useState(0);
  const [additionalData, setAdditionalData] = useState(null);
  const [loadingProductCount, setLoadingProductCount] = useState(true);
  const [loadingAdditionalData, setLoadingAdditionalData] = useState(true);
  const [errorProductCount, setErrorProductCount] = useState(null);
  const [errorAdditionalData, setErrorAdditionalData] = useState(null);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get(BaseUrl + 'api/Master/Get_All_Items', {
          headers: {
            'Content-Type': 'application/json',
            // Use the token for authentication if required
          },
        });

        // Set the product count to state
        setProductCount(response.data.length); // Assuming the response data is an array
      } catch (error) {
        // Handle errors
        setErrorProductCount('There was an error fetching the product count!');
        console.error(error);
      } finally {
        setLoadingProductCount(false);
      }
    };

    fetchProductCount();
  }, []);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        // Fetch data from the second API
        const response = await axios.get('https://api.onlineshop.initstore.com/api/Master/GetItemMaster?type=0', {
          headers: {
            'Content-Type': 'application/json',
            // Use the token for authentication if required
          },
        });

        // Set the additional data to state
        setAdditionalData(response.data.length);
      } catch (error) {
        // Handle errors
        setErrorAdditionalData('There was an error fetching the additional data!');
        console.error(error);
      } finally {
        setLoadingAdditionalData(false);
      }
    };

    fetchAdditionalData();
  }, []);

  if (loadingProductCount || loadingAdditionalData) return <p className="text-center text-gray-500">Loading...</p>;
  if (errorProductCount) return <p className="text-center text-red-500">Error: {errorProductCount}</p>;
  if (errorAdditionalData) return <p className="text-center text-red-500">Error: {errorAdditionalData}</p>;

  return (
    <div>
      {/* <Header /> */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Product Report</h1>
        {/* Display the product count */}
        <p className="text-xl font-semibold">
          Total Number of Products: {productCount}
        </p>
        {/* Display additional data if available */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Item Report</h2>
          <p className="text-xl font-semibold">
          Total Number of Products: {additionalData}
        </p>
        <p className="text-xl font-semibold">
          Total Number of Products: {productCount}
        </p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
