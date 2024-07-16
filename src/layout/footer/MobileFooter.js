import React, { useContext, useState, useEffect } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { CgMenuBoxed } from 'react-icons/cg';
import { BsCart4 } from 'react-icons/bs';
import { IoHome } from 'react-icons/io5';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import MobileDrawer from '../../components/Drawer/MobileDrawer';
import { SidebarContext } from '../../Context/PopUpContex';
import { NavLink } from 'react-router-dom';
import Cart from '../../components/Drawer/Cart';
import './footermobile.css';

const MobileFooter = () => {
  const {
    toggleMobileDrawer,
    mobileDrawerOpen,
    toggleCartDrawer,
    cartDrawerOpen,
  } = useContext(SidebarContext);
  
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateCartItemCount = () => {
      const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItemCount(storedItems.length);
    };

    const checkToken = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    updateCartItemCount();
    checkToken();

    const handleStorageChange = () => {
      updateCartItemCount();
      checkToken();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const active = 'bg-white text-main shadow-md';
  const inActive = 'transition text-xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-2 py-2';
  const Hover = ({ isActive }) => isActive ? `${active} ${inActive}` : inActive;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="flex flex-col h-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-scroll flex-grow scrollbar-hide w-full">
        <MobileDrawer
          mobileDrawerOpen={mobileDrawerOpen}
          toggleMobileDrawer={toggleMobileDrawer}
        />
        <Cart
          cartDrawerOpen={cartDrawerOpen}
          closeCartDrawer={toggleCartDrawer}
        />
      </div>
      <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
        <div className="bg-main rounded-md flex items-center justify-between w-full p-2 shadow-lg">
          <NavLink to="/" className={`${inActive} relative`}>
            <div className="tooltip flex flex-col items-center">
              <IoHome size={24} />
              <span className="tooltip-text text-sm">Home</span>
            </div>
          </NavLink>
          {isLoggedIn ? (
            <button onClick={handleLogout} className={`${inActive} relative`}>
              <div className="tooltip flex flex-col items-center">
                <FaSignOutAlt size={24} />
                <span className="tooltip-text text-sm">Logout</span>
              </div>
            </button>
          ) : (
            <NavLink to="/LoginMobile" className={`${inActive} relative`}>
              <div className="tooltip flex flex-col items-center">
                <FaUser size={24} />
                <span className="tooltip-text text-sm">Login</span>
              </div>
            </NavLink>
          )}
          <NavLink to="/shop" className={`${inActive} relative`}>
            <div className="tooltip flex flex-col items-center">
              <FiShoppingBag size={24} />
              <span className="tooltip-text text-sm">Shop</span>
            </div>
          </NavLink>
          <button onClick={toggleCartDrawer} className={`${inActive} relative`}>
            <div className="tooltip flex flex-col items-center">
              <BsCart4 size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <span className="tooltip-text text-sm">Cart</span>
            </div>
          </button>
          <button onClick={toggleMobileDrawer} className={inActive}>
            <div className="tooltip flex flex-col items-center">
              <CgMenuBoxed size={24} />
              <span className="tooltip-text text-sm">Menu</span>
            </div>
          </button>
        </div>
      </footer>
    </>
  );
};

export default MobileFooter;
