// import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import './adminlogin.css';

// function AdminPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     console.log('Username:', username);
//     console.log('Password:', password);
//   };

//   return (
//     <div className="admin-page">
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <button 
//           className="flex-rows gap-3 text-white py-3 px-8 rounded font-semibold bg-subMain" 
//           type="submit">
//             Login
//         </button>
//       </form>
      
//       {/* NavLink to Admin */}
//       <NavLink className="hover" to="/">
//         Home
//       </NavLink>
      
//       {/* Link to Home1 */}
//       <div className="home1-link">
//         <Link to="/Home1">
//           <button className="flex-rows gap-3 text-white py-3 px-8 rounded font-semibold bg-subMain">
//             DASHBOARD
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default AdminPage;
