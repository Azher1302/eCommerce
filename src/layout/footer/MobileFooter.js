import React, { useContext } from 'react';
import { FiShoppingBag, FiUserCheck } from 'react-icons/fi';
import { CgMenuBoxed } from 'react-icons/cg';
import { BsCart4 } from 'react-icons/bs';
import MobileDrawer from '../../components/Drawer/MobileDrawer';
import { SidebarContext } from '../../Context/PopUpContex';
import { NavLink } from 'react-router-dom';
import Cart from '../../components/Drawer/Cart';

const MobileFooter = () => {
  const {
    toggleMobileDrawer,
    mobileDrawerOpen,
    toggleCartDrawer,
    cartDrawerOpen,
  } = useContext(SidebarContext);

  const active = 'bg-white text-main shadow-md';
  const inActive = 'transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3';
  const Hover = ({ isActive }) => isActive ? `${active} ${inActive}` : inActive;

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
        <div className="bg-main rounded-md flex items-center justify-between w-full p-1 shadow-lg">
          <NavLink to="/LoginMobile" className={Hover}>
            <FiUserCheck />
          </NavLink>
          <NavLink to="/shop" className={Hover}>
            <FiShoppingBag />
          </NavLink>
          <button onClick={toggleCartDrawer} className={`${inActive} relative`}>
            <div className="px-2 py-1 rounded-full text-xs bg-flash text-white absolute -top-3 right-0">
               {/* Example item count */}
            </div>
            <BsCart4 />
          </button>
          <button onClick={toggleMobileDrawer} className={inActive}>
            <CgMenuBoxed />
          </button>
        </div>
      </footer>
    </>
  );
};

export default MobileFooter;
