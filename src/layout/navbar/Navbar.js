import React, { useContext, useState, useEffect } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from '../../components/Modals/Login';
import { SidebarContext } from '../../Context/PopUpContex';
import Cart from '../../components/Drawer/Cart';
import { toast } from 'react-hot-toast';
import './Navbar.css';
import { BaseUrl } from '../../Config/config';
import { MdAccountCircle } from "react-icons/md";

const Navbar = () => {
  const { toggleCartDrawer, cartDrawerOpen } = useContext(SidebarContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // State to control logout confirmation modal
  const navigate = useNavigate();

  const updateCartItemCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('https://api.onlineshop.initstore.com/api/User/GetUserCart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCartItemCount(response.data.length);
      } else {
        setCartItemCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BaseUrl}api/Master/Get_All_Items`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    updateCartItemCount();
    checkLoginStatus();
    fetchProducts();

    const handleStorageChange = () => {
      updateCartItemCount();
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredProducts(
        products.filter(product =>
          product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products]);

  const getNavLinkClass = ({ isActive }) => (isActive ? 'text-main' : 'hover:text-main');

  const handleLogout = () => {
    // Close mobile menu if open
    setMobileMenuOpen(false);
    setShowLogoutConfirmation(true); // Show logout confirmation modal
  };

  const confirmLogout = () => {
    // Perform logout actions
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setModalOpen(false);
    toast.success('You have logged out successfully.');
    setShowLogoutConfirmation(false); // Hide logout confirmation modal
    setCartItemCount(0); // Reset cart item count
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false); // Hide logout confirmation modal
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const UserProfile = () => {
    navigate('/Account');
  };

  return (
    <>
      <Login modalOpen={modalOpen} setModalOpen={setModalOpen} checkLoginStatus={checkLoginStatus} />
      <Cart cartDrawerOpen={cartDrawerOpen} closeCartDrawer={toggleCartDrawer} />
      <div className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link to="/">
            <img src="/images/initlogo1.png" alt="logo" className="w-24 object-contain" />
          </Link>
          
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-xl transitions scale-hover">
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <button onClick={toggleCartDrawer} className="relative">
              <FaShoppingCart className="w-6 h-6 transitions scale-hover" />
              {cartItemCount > 0 && (
                <div className="px-2 py-1 rounded-full text-xs bg-red-500 text-white absolute -top-2 -right-2 cart-badge">
                  {cartItemCount}
                </div>
              )}
            </button>
          </div>

          <div className="hidden lg:flex gap-6 items-center w-full justify-end">
            <div className="flex gap-6 items-center">
              <NavLink className={getNavLinkClass} to="/shop">
                Shop
              </NavLink>
              {/* <NavLink to="/Categories" className={getNavLinkClass}>
                Categories
              </NavLink> */}
              <NavLink to="/about-us" className={getNavLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact-us" className={getNavLinkClass}>
                Contact
              </NavLink>
              {!isLoggedIn ? (
                <button onClick={() => setModalOpen(!modalOpen)} className="hover:text-main">
                  Login
                </button>
              ) : (
                <button onClick={handleLogout} className="hover:text-main">
                  Logout
                </button>
              )}
              <button onClick={UserProfile} className="hover:text-main relative">
                <MdAccountCircle className="w-6 h-6 scale-hover" />
              </button>
              <button onClick={toggleCartDrawer} className="hover:text-main relative">
                <FaShoppingCart className="w-6 h-6 scale-hover" />
                {cartItemCount > 0 && (
                  <div className="px-2 py-1 rounded-full text-xs bg-red-500 text-white absolute -top-2 -right-2 cart-badge">
                    {cartItemCount}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-md menu-slide-in">
            <div className="flex flex-col items-start px-4 py-2 space-y-2">
              <NavLink className={getNavLinkClass} to="/shop" onClick={() => setMobileMenuOpen(false)}>
                Shop
              </NavLink>
              <NavLink className={getNavLinkClass} to="/table" onClick={() => setMobileMenuOpen(false)}>
                My Order
              </NavLink>
              <NavLink className={getNavLinkClass} to="/Account" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </NavLink>
              <NavLink to="/about-us" className={getNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
                About
              </NavLink>
              <NavLink to="/contact-us" className={getNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
                Contact
              </NavLink>
              {!isLoggedIn ? (
                <button onClick={() => { setModalOpen(!modalOpen); setMobileMenuOpen(false); }} className="hover:text-main">
                  Login
                </button>
              ) : (
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="hover:text-main">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <div className="bg-white shadow-md">
          <div className="container mx-auto py-4 px-4">
            <h2 className="text-xl font-semibold mb-4">Search Results:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white p-4 rounded shadow-md">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <p className="text-lg font-semibold mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end">
              <button
                onClick={confirmLogout}
                className="bg-main text-white px-4 py-2 rounded-md mr-2 hover:bg-subMain"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

