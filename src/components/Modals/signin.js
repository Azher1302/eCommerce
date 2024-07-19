// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BaseUrl } from '../../Config/config';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import Cookies from 'universal-cookie';
// import { toast, ToastContainer } from 'react-toastify';
// import { CSSTransition } from 'react-transition-group';
// import 'react-toastify/dist/ReactToastify.css';
// import Login from './Login';
// import './signin.css';

// const SignIn = () => {
//   const [formData, setFormData] = useState({
//     Name: '',
//     Email: '',
//     UserName: '',
//     Password: '',
//     Mobile: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const navigate = useNavigate();
//   const cookies = new Cookies();

//   const checkEmailExists = async (Email) => {
//     try {
//       const response = await axios.get(`${BaseUrl}api/User/CheckEmail?UserId=0`, { Email });
//       return response.data.exists;
//     } catch (error) {
//       console.error("Error checking email:", error);
//       return false;
//     }
//   };

//   const checkMobileExists = async (Mobile) => {
//     try {
//       const response = await axios.get(`${BaseUrl}api/User/CheckMobile?UserId=0`, { Mobile });
//       return response.data.exists;
//     } catch (error) {
//       console.error("Error checking mobile:", error);
//       return false;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const emailExists = await checkEmailExists(formData.Email);
//     const mobileExists = await checkMobileExists(formData.Mobile);

//     if (emailExists) {
//       toast.error('Email is already registered!', {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 3000,
//         hideProgressBar: true,
//       });
//       return;
//     }

//     if (mobileExists) {
//       toast.error('Mobile number is already registered!', {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 3000,
//         hideProgressBar: true,
//       });
//       return;
//     }

//     try {
//       const response = await axios.post(`${BaseUrl}api/User/Add_or_Update_User`, formData);

//       if (response.data.Status !== 200) {
//         throw new Error(response.data.Message);
//       }

//       toast.success('Form submitted successfully!', {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 3000,
//         hideProgressBar: true,
//       });

//       setFormData({
//         Name: '',
//         Email: '',
//         UserName: '',
//         Password: '',
//         Mobile: '',
//       });

//       navigate('/userprofile');
//     } catch (err) {
//       toast.error(`Error: ${err.message}`, {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 3000,
//         hideProgressBar: true,
//       });
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="blur-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="form-container">
//         <div>
//           <h2 className="text-center">Sign in to your account</h2>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name</label>
//             <input
//               id="name"
//               name="Name"
//               type="text"
//               required
//               placeholder="Name *"
//               value={formData.Name}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="email-address">Email address</label>
//             <input
//               id="email-address"
//               name="Email"
//               type="email"
//               required
//               placeholder="Email address *"
//               value={formData.Email}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="phone-number">Phone Number</label>
//             <input
//               id="phone-number"
//               name="Mobile"
//               type="number"
//               required
//               placeholder="Phone Number *"
//               value={formData.Mobile}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="username">Username</label>
//             <input
//               id="username"
//               name="UserName"
//               type="text"
//               required
//               placeholder="Username *"
//               value={formData.UserName}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="password">Password</label>
//             <div className="password-input-container">
//               <input
//                 id="password"
//                 name="Password"
//                 type={showPassword ? 'text' : 'password'}
//                 required
//                 placeholder="Password *"
//                 value={formData.Password}
//                 onChange={handleChange}
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 className="password-toggle-icon"
//               >
//                 {showPassword ? <FiEyeOff /> : <FiEye />}
//               </span>
//             </div>
//           </div>
//           <button type="submit">Sign in</button>
//           <p className="text-center mt-2">
//             Do you have an account?{' '}
//             <span onClick={() => setModalOpen(!modalOpen)} className="text-blue-500 cursor-pointer">
//               Login
//             </span>
//           </p>
//         </form>
//       </div>
//       <ToastContainer /> {/* ToastContainer for toast notifications */}
  
//         <Login modalOpen={modalOpen} setModalOpen={setModalOpen} /> {/* Login Modal */}

//     </div>
//   );
// };

// export default SignIn;














import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../Config/config';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import './signin.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    UserName: '',
    Password: '',
    Mobile: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`${BaseUrl}api/User/CheckEmail`, {
        params: { Email: email }
      });
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const checkMobileExists = async (mobile) => {
    try {
      const response = await axios.get(`${BaseUrl}api/User/CheckMobile`, {
        params: { Mobile: mobile }
      });
      return response.data.exists;
    } catch (error) {
      console.error("Error checking mobile:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailExists = await checkEmailExists(formData.Email);
    const mobileExists = await checkMobileExists(formData.Mobile);

    if (emailExists) {
      toast.error('Email is already registered!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    if (mobileExists) {
      toast.error('Mobile number is already registered!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    try {
      const response = await axios.post(`${BaseUrl}api/User/Add_or_Update_User`, formData);

      if (response.data.Status !== 200) {
        throw new Error(response.data.Message);
      }

      toast.success('Form submitted successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });

      setFormData({
        Name: '',
        Email: '',
        UserName: '',
        Password: '',
        Mobile: '',
      });

      navigate('/userprofile');
    } catch (err) {
      toast.error(`Error: ${err.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="blur-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="form-container">
        <div>
          <h2 className="text-center">Sign in to your account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              name="Name"
              type="text"
              required
              placeholder="Name *"
              value={formData.Name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email-address">Email address *</label>
            <input
              id="email-address"
              name="Email"
              type="email"
              required
              placeholder="Email address *"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone-number">Phone Number *</label>
            <input
              id="phone-number"
              name="Mobile"
              type="text"  // Changed to text to allow leading zeros
              required
              placeholder="Phone Number *"
              value={formData.Mobile}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="username">Username *</label>
            <input
              id="username"
              name="UserName"
              type="text"
              required
              placeholder="Username *"
              value={formData.UserName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password *</label>
            <div className="password-input-container">
              <input
                id="password"
                name="Password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password *"
                value={formData.Password}
                onChange={handleChange}
              />
              <span
                onClick={togglePasswordVisibility}
                className="password-toggle-icon"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>
          <button type="submit">Sign in</button>
          <p className="text-center mt-2">
            Do you have an account?{' '}
            <span onClick={() => setModalOpen(!modalOpen)} className="text-blue-500 cursor-pointer">
              Login
            </span>
          </p>
        </form>
      </div>
      <ToastContainer /> {/* ToastContainer for toast notifications */}
      <Login modalOpen={modalOpen} setModalOpen={setModalOpen} /> {/* Login Modal */}
    </div>
  );
};

export default SignIn;
