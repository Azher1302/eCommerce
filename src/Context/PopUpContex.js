import React, { useState, useMemo, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import './tailwind.css'; // Import your Tailwind CSS

// Create context
export const SidebarContext = createContext();

export const PopUpProvider = ({ children }) => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleCartDrawer = () => setCartDrawerOpen(!cartDrawerOpen);
  const closeCartDrawer = () => setCartDrawerOpen(false);

  const toggleMobileDrawer = () => setMobileDrawerOpen(!mobileDrawerOpen);
  const closeMobileDrawer = () => setMobileDrawerOpen(false);

  const value = useMemo(
    () => ({
      cartDrawerOpen,
      toggleCartDrawer,
      closeCartDrawer,
      mobileDrawerOpen,
      toggleMobileDrawer,
      closeMobileDrawer,
    }),
    [cartDrawerOpen, mobileDrawerOpen]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {cartDrawerOpen && (
          <motion.div
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4"
          >
            <button
              onClick={closeCartDrawer}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <div className="mt-12">
              {/* Cart content goes here */}
              <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
              {/* Add your cart items here */}
            </div>
          </motion.div>
        )}
       {mobileDrawerOpen && (
          <motion.div
            key="mobile-drawer"
            init ial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4"
          >
            <button
              onClick={closeMobileDrawer}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <div className="mt-12">
              {/* Mobile menu content goes here */}
              <h2 className="text-2xl font-bold mb-4">Menu</h2>
              {/* Add your mobile menu items here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarContext.Provider>
  );
};
