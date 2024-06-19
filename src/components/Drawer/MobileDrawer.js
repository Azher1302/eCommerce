import React from 'react';
import { IoClose } from 'react-icons/io5';
import { NavLink, Link } from 'react-router-dom';
import MainDrawer from './MainDrawer';
import { CategoriesData } from './../../Data/CategoriesData';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BiPhoneCall, BiHelpCircle } from 'react-icons/bi';
import { MdSecurity } from 'react-icons/md';
import { BsFileEarmarkMedical } from 'react-icons/bs';

function MobileDrawer({ mobileDrawerOpen, toggleMobileDrawer }) {
  const active = 'bg-deepGray';
  const inActive =
    'flex sm:gap-8 gap-4 hover:bg-deepGray items-center py-4 rounded sm:px-8 px-4 text-sm';
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : inActive;

  const Links = [
    {
      link: '/about-us',
      name: 'About Us',
      icon: HiOutlineUserGroup,
    },
    {
      link: '/contact-us',
      name: 'Contact Us',
      icon: BiPhoneCall,
    },
    {
      link: '/faq',
      name: 'FAQ',
      icon: BiHelpCircle,
    },
    {
      link: '/policy',
      name: 'Privacy Policy',
      icon: MdSecurity,
    },
    {
      link: '/terms-condition',
      name: 'Terms Condition',
      icon: BsFileEarmarkMedical,
    },
  ];

  return (
    <MainDrawer DrawerOpen={mobileDrawerOpen} closeDrawer={toggleMobileDrawer}>
      <div className="flex flex-col w-full h-full justify-between items-center bg-white rounded cursor-pointer">
        <div className="w-full flex justify-between items-center h-16 px-6 py-4 bg-main text-white border-b border-gray-100">
          {/* Logo Section */}
          {/* <h2 className="font-semibold font-serif text-lg m-0 text-heading flex items-center">
            <Link onClick={toggleMobileDrawer} to="/">
              <img
                className="w-40 h-40 object-contain"
                src="/images/initlogo1.png"
                alt="logo"
              />
            </Link>
          </h2> */}
          {/* Close Button */}
          <button
            onClick={toggleMobileDrawer}
            className="flex text-xl items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-red-500 p-2 focus:outline-none transition-opacity hover:bg-red-50 hover:text-red-600"
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
        
        <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <div className="flex flex-col gap-10">
            {/* Category Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {CategoriesData.map((c) => (
                <NavLink
                  onClick={toggleMobileDrawer}
                  to={`/category/${c.title}`}
                  key={c._id}
                  className={Hover}
                >
                  <div className="shadow rounded-full p-1 w-6 h-6">
                    <img
                      src={`/images/${c.icon}`}
                      className="w-full h-full object-contain"
                      alt={c.title}
                    />
                  </div>
                  <h2 className="font-semibold">{c.title}</h2>
                </NavLink>
              ))}
            </div>
            <hr />
            {/* Links Section */}
            <div className="pb-12 px-4">
              {Links.map((l, i) => (
                <NavLink
                  onClick={toggleMobileDrawer}
                  key={i}
                  to={l.link}
                  className={Hover}
                >
                  <l.icon className="text-lg mr-2" /> {l.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainDrawer>
  );
}

export default MobileDrawer;
