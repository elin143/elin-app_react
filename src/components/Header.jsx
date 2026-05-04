import { FaBell, FaEnvelope, FaCog } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between bg-gradient-to-r from-white via-pink-50 to-rose-50 px-6 py-4 shadow-md border-b border-pink-100">
        
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search beauty treatments, patients..."
          onClick={() => setOpen(true)}
          className="border border-pink-200 bg-white/80 px-5 py-3 rounded-2xl w-1/3 outline-none font-[Poppins] text-sm placeholder:text-pink-300 focus:ring-2 focus:ring-pink-200 shadow-sm"
        />

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          
          <div className="relative cursor-pointer hover:scale-110 transition-all duration-300">
            <FaBell className="text-pink-400 text-xl" />
            <span className="absolute -top-2 -right-2 bg-pink-400 text-white text-xs px-1.5 rounded-full shadow">
              50
            </span>
          </div>

          <FaEnvelope className="text-rose-300 text-xl cursor-pointer hover:text-pink-400 hover:scale-110 transition-all duration-300" />
          <FaCog className="text-pink-300 text-xl cursor-pointer hover:text-pink-400 hover:rotate-90 transition-all duration-300" />

          <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-2xl shadow-sm border border-pink-100 hover:shadow-md transition-all duration-300">
            <img
              src="https://i.pravatar.cc/40"
              className="w-10 h-10 rounded-full border-2 border-pink-200"
            />
            <span className="text-sm font-semibold text-pink-500 font-[Poppins]">
              Hi, Elin! ✨
            </span>
          </div>
        </div>
      </div>

      {/* MODAL SEARCH */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-pink-100/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-gradient-to-b from-white to-pink-50 p-8 rounded-3xl w-[400px] shadow-2xl border border-pink-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-pink-400 text-center font-serif italic">
              Beauty Search ✨
            </h2>

            <input
              type="text"
              placeholder="Type treatment, skincare, or patient..."
              className="border border-pink-200 w-full px-4 py-3 rounded-2xl outline-none font-[Poppins] placeholder:text-pink-300 focus:ring-2 focus:ring-pink-200"
            />

            <button
              onClick={() => setOpen(false)}
              className="mt-5 bg-gradient-to-r from-pink-300 to-rose-300 text-white px-4 py-3 rounded-2xl w-full font-semibold hover:scale-105 transition-all duration-300 shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;