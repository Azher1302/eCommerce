import React from 'react';
import Layout from '../../layout/Layout';
import { NavLink } from 'react-router-dom';
import { BsGridFill } from 'react-icons/bs';
import { FaRegListAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';

function SideBar({ children }) {
  const SideLink = [
    {
      name: 'Dashboard',
      link: '/Dashboard1',
      icon: BsGridFill,
    },
  
    {
      name: 'Orders',
      link: '/Orders',
      icon: FaRegListAlt,
    },
    {
      name: 'Update Profile',
      link: '/profile',
      icon: FiSettings,
    },
    {
      name: 'Change Password',
      link: '/password',
      icon: RiLockPasswordLine,
    },
  ];
  const active = ' bg-main text-white';
  const hover = 'hover:text-main hover:bg-deepGray';
  const inActive =
    'rounded font-medium text-sm transitions flex gap-3 items-center p-4';
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;
  return (
    <Layout>
      <div className="bg-deepGray">
        <div className="min-h-screen container mx-auto px-2">
          <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
            <div className="sticky col-span-2 bg-white p-6 rounded-md xl:mb-0 mb-5">
              {SideLink.map((item, i) => (
                <NavLink key={i} className={Hover} to={item.link}>
                  <item.icon /> <p>{item.name}</p>
                </NavLink>
              ))}
            </div>
            <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="10"
              data-aos-duration="1000"
              className="col-span-6 rounded-md bg-white p-6"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SideBar;
