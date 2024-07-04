import React, { useContext, useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import Login from '../../components/Modals/Login';
import { SidebarContext } from '../../Context/PopUpContex';
import Cart from '../../components/Drawer/Cart';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { toggleCartDrawer, cartDrawerOpen } = useContext(SidebarContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartItemCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const count = cartItems.length; // Count the number of distinct products
      setCartItemCount(count);
    };

    updateCartItemCount();

    // Listen for changes in local storage
    const handleStorageChange = () => {
      updateCartItemCount();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const hover = 'hover:text-main transitions ';
  const Hover = ({ isActive }) => (isActive ? 'text-main' : hover);

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Optionally, you can add more logout logic here, such as redirecting the user
    setModalOpen(false);
    toast.success('You have logged out successfully.');
  };

  return (
    <>
      <Login modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Cart cartDrawerOpen={cartDrawerOpen} closeCartDrawer={toggleCartDrawer} />
      <div className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-4 px-4 gap-10 grid grid-cols-1 lg:grid-cols-7 items-center">
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src="/images/initlogo1.png"
                alt="logo"
                className="w-full object-contain"
              />
            </Link>
          </div>
          <div className="col-span-3">
            <form className="w-full bg-dryGray rounded flex gap-4 justify-between">
              <button
                type="button"
                className="w-12 transitions hover:bg-subMain flex-colo text-sm h-12 rounded bg-main text-white"
              >
                <FaSearch />
              </button>
              <input
                type="text"
                placeholder="Search Your Product from here"
                className="font-semibold text-sm w-11/12 bg-transparent border-none px-2 text-black max-w-screen-xs"
              />
            </form>
          </div>
          <div className="col-span-3 font-bold hidden lg:flex lg:gap-6 xl:gap-10 justify-end items-center">
            <NavLink className={Hover} to="/shop">
              Shop
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About 
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact
            </NavLink>
            <button
              onClick={() => setModalOpen(!modalOpen)}
              className={Hover}
            >
              <h3>Login</h3>
            </button>
            <button onClick={toggleCartDrawer} className={`${hover} relative`}>
              <FaShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <div className="px-2 py-1 rounded-full text-xs bg-red-500 text-white absolute -top-2 -right-2">
                  {cartItemCount}
                </div>
              )}
            </button>
            <button onClick={handleLogout} className={Hover}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
