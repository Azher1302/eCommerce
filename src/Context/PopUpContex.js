import React, { useState, useMemo, createContext } from 'react';

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
    </SidebarContext.Provider>
  );
};
