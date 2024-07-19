import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Account() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        </div>
      </header>
      <div className="flex-grow container mx-auto p-6">
        <div className="flex flex-wrap md:flex-nowrap -mx-4">
          <aside className="w-full md:w-1/4 px-4 mb-6 md:mb-0">
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <div className="p-4 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800">Navigation</h2>
              </div>
              <nav className="p-4 space-y-2">
                <NavLink
                  to="/UserProfile"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'
                    }`
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/table"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'
                    }`
                  }
                >
                  My Orders
                </NavLink>
                <NavLink
                  to="/Address"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'
                    }`
                  }
                >
                  Address
                </NavLink>
              </nav>
            </div>
          </aside>
          <main className="w-full md:flex-1 px-4">
            <div className="bg-white shadow-md rounded-md p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Account;
