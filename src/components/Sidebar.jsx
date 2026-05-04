import { FaHome, FaClipboardList, FaFileAlt } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
      const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-2xl p-4 space-x-3 transition-all duration-300 font-[Poppins]
        ${isActive ? 
            "text-pink-500 bg-gradient-to-r from-pink-100 to-rose-100 font-bold shadow-sm scale-105" : 
            "text-gray-500 hover:text-pink-500 hover:bg-pink-50 hover:font-bold hover:scale-105"
        }`
  return (
    
    <div className="w-64 bg-gradient-to-b from-white via-pink-50 to-rose-50 min-h-screen shadow-xl p-6 border-r border-pink-100 font-[Poppins]">

      {/* LOGO */}
      <div className="mb-8 text-center border-b border-pink-100 pb-6">
        <h1 className="text-4xl font-extrabold tracking-wide text-pink-400 font-serif italic drop-shadow-sm">
          Beauty<span className="text-rose-300">.</span>
        </h1>
        <p className="text-pink-300 text-sm mt-2 font-light tracking-wide">
          Elegant Beauty Clinic Dashboard
        </p>
      </div>

      {/* MENU */}
      <ul className="space-y-4">
        
        <li>
          <NavLink
          onClick={() => setActive("dashboard")}
          to="/"
          className={menuClass}
        >
          <FaHome className="text-lg" /> <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
          onClick={() => setActive("order")}
          to="/Booking"
          className={menuClass}
        >
          <FaClipboardList className="text-lg" /> <span>Treatment List</span>
          </NavLink>
        </li>

        <li>
          <NavLink
          onClick={() => setActive("detail")}
          to="/Pasien"
          className={menuClass}
        >
          <FaFileAlt className="text-lg" /> <span>Patients</span>
          </NavLink>
        </li>

      </ul>

      <div className="mt-10">
        <p className="text-pink-300 text-xs mb-3 uppercase tracking-[0.2em] font-semibold">
          System Pages
        </p>

        <ul className="space-y-3">
          <li>
            <NavLink to="/error-400" className={menuClass}>
             <span>Error 400</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/error-401" className={menuClass}>
             <span>Error 401</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/error-403" className={menuClass}>
             <span>Error 403</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* CARD */}
      <div className="mt-12 bg-gradient-to-br from-pink-300 via-pink-200 to-rose-300 text-white p-5 rounded-3xl shadow-lg backdrop-blur-md">
        <p className="text-sm mb-4 leading-relaxed font-light">
          Manage your beauty services and treatment menus with elegance and ease 
        </p>
        <button className="w-full bg-white text-pink-400 px-3 py-2 rounded-2xl font-bold hover:bg-pink-50 transition-all duration-300 shadow-sm">
          + Add Treatment
        </button>
      </div>

    </div>
  );
};

export default Sidebar;