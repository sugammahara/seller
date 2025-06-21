import { Navigate, Outlet, useLocation, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";

const AdminLayout = () => {
  const { admin } = useStateContext();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait a tick to let admin state initialize
    setLoading(false);
  }, []);

 

  if (loading) return null; // or a spinner

  

  
  const SidebarItem = ({ to, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-md text-white ${
          isActive ? "bg-blue-600" : "hover:bg-blue-700"
        }`
      }
    >
      {label}
    </NavLink>
  );
  const logout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <h2 className="text-white text-xl mb-6 font-bold">Admin Panel</h2>
        
        <SidebarItem to="/admin/products" label="All Products" />
        <SidebarItem to="/admin/bids" label="Bid Requests" />
        <SidebarItem to="/admin/gallery" label="Gallery" />
        <SidebarItem to="/admin/messages" label="Messages" />
        <SidebarItem to="/admin/offers" label="Offers" />
        <SidebarItem to="/admin/reviews" label="Reviews" />
        <SidebarItem to="/admin/auths" label="Auths" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, Admin</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 bg-gray-50 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
