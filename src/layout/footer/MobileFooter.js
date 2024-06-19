import React, { useContext } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { CgMenuBoxed } from 'react-icons/cg';
import { BsCart4 } from 'react-icons/bs';
import { IoHome } from "react-icons/io5";
import MobileDrawer from '../../components/Drawer/MobileDrawer';
import { SidebarContext } from '../../Context/PopUpContex';
import { NavLink } from 'react-router-dom';
import Cart from '../../components/Drawer/Cart';
import { FaUser } from "react-icons/fa";
import './footermobile.css';

const MobileFooter = () => {
  const {
    toggleMobileDrawer,
    mobileDrawerOpen,
    toggleCartDrawer,
    cartDrawerOpen,
  } = useContext(SidebarContext);

  const active = 'bg-white text-main shadow-md';
  const inActive = 'transition text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3';
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
          <NavLink to="/" className={`${inActive} relative`}>
            <div className="tooltip">
              <IoHome />
              <span className="tooltip-text text-sm">Home</span>
            </div>
          </NavLink>
          <NavLink to="/LoginMobile" className={`${inActive} relative`}>
            <div className="tooltip">
              <FaUser />
              <span className="tooltip-text text-sm">Login</span>
            </div>
          </NavLink>
          <NavLink to="/shop" className={`${inActive} relative`}>
            <div className="tooltip">
              <FiShoppingBag />
              <span className="tooltip-text text-subMain text-sm">Shop</span>
            </div>
          </NavLink>
          <button onClick={toggleCartDrawer} className={`${inActive} relative`}>
            <div className="tooltip">
              <BsCart4 />
              <span className="tooltip-text text-sm text-ellipsis text-transparent">Cart</span>
            </div>
          </button>
          <button onClick={toggleMobileDrawer} className={inActive}>
            <div className="tooltip">
              <CgMenuBoxed />
              <span className="tooltip-text text-sm">Menu</span>
            </div>
          </button>
        </div>
      </footer>
    </>
  );
};

export default MobileFooter;
