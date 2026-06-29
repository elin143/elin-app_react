import {
  FaHome, FaClipboardList, FaFileAlt,
  FaStethoscope, FaSpa, FaBox, FaCrown, FaGift,
  FaEnvelope, FaStar, FaMoneyBillWave, FaChartBar,
  FaBell, FaCog,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// THEME TOKENS — matches GuestDashboard.jsx / Dashboard.jsx
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const Sidebar = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-2xl p-4 space-x-3 transition-all duration-300 font-[Poppins] text-sm
    ${
      isActive
        ? "font-semibold shadow-sm scale-[1.03]"
        : "font-medium hover:scale-[1.02]"
    }`;

  const menuStyle = ({ isActive }) =>
    isActive
      ? {
          color: ACCENT,
          background: `linear-gradient(to right, ${CARD_TINT}, ${BG_ALT})`,
        }
      : { color: SAGE };

  const handleAddTreatment = () => {
    showToast("Fitur tambah treatment akan segera hadir! \u2728");
  };

  // ── Poll pending shop orders from localStorage ──
  const [pendingShopOrders, setPendingShopOrders] = useState(0);
  useEffect(() => {
    const checkOrders = () => {
      const orders = JSON.parse(localStorage.getItem("shopOrders") || "[]");
      setPendingShopOrders(orders.filter(o => o.status === "Pending").length);
    };
    checkOrders();
    const interval = setInterval(checkOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* TOAST */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] px-6 py-3.5 rounded-full text-white text-sm font-medium shadow-xl animate-toast"
          style={{ background: INK }}
        >
          {toast}
        </div>
      )}

      <div
        className="w-64 h-screen p-6 font-[Poppins] flex flex-col overflow-y-auto"
        style={{
          background: `linear-gradient(to bottom, #FFFFFF, ${BG_ALT})`,
          borderRight: `1px solid ${CARD_TINT}`,
          boxShadow: "4px 0 20px rgba(46,34,40,0.05)",
        }}
      >
        {/* LOGO — clickable to home */}
        <div
          className="mb-8 text-center pb-6 cursor-pointer hover:opacity-80 transition-opacity"
          style={{ borderBottom: `1px solid ${CARD_TINT}` }}
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") navigate("/"); }}
          aria-label="Go to home"
        >
          <h1
            className="text-4xl italic tracking-wide drop-shadow-sm"
            style={{ fontFamily: "Fraunces, serif", color: INK, fontWeight: 600 }}
          >
            Beauty<span style={{ color: ACCENT }}>.</span>
          </h1>
          <p
            className="text-sm mt-2 font-light tracking-wide"
            style={{ color: SAGE }}
          >
            Elegant Beauty Clinic Dashboard
          </p>
        </div>

        {/* MENU */}
        <ul className="space-y-4 flex-1">
          <li>
            <NavLink to="/Dashboard" className={menuClass} style={menuStyle}>
              <FaHome className="text-lg" /> <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/booking" className={menuClass} style={menuStyle}>
              <FaClipboardList className="text-lg" /> <span>Booking</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/pasien" className={menuClass} style={menuStyle}>
              <FaFileAlt className="text-lg" /> <span>Patients</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/medical-records" className={menuClass} style={menuStyle}>
              <FaStethoscope className="text-lg" /> <span>Medical Records</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/treatments-admin" className={menuClass} style={menuStyle}>
              <FaSpa className="text-lg" /> <span>Treatments</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/products" className={menuClass} style={menuStyle}>
              <FaBox className="text-lg" /> <span>Products</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/membership" className={menuClass} style={menuStyle}>
              <FaCrown className="text-lg" /> <span>Membership</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/promotions" className={menuClass} style={menuStyle}>
              <FaGift className="text-lg" /> <span>Promotions</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/communications" className={menuClass} style={menuStyle}>
              <FaEnvelope className="text-lg" /> <span>Communications</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/feedback" className={menuClass} style={menuStyle}>
              <FaStar className="text-lg" /> <span>Feedback</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/payments" className={menuClass} style={menuStyle}>
              <FaMoneyBillWave className="text-lg" /> <span>Payments</span>
              {pendingShopOrders > 0 && (
                <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse" style={{ background: "#D32F2F", color: "#fff" }}>{pendingShopOrders}</span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/reports" className={menuClass} style={menuStyle}>
              <FaChartBar className="text-lg" /> <span>Reports</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/notifications" className={menuClass} style={menuStyle}>
              <FaBell className="text-lg" /> <span>Notifications</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" className={menuClass} style={menuStyle}>
              <FaCog className="text-lg" /> <span>Settings</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/Components" className={menuClass} style={menuStyle}>
              <FaFileAlt className="text-lg" /> <span>Components</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/CustomerSegmen" className={menuClass} style={menuStyle}>
              <FaFileAlt className="text-lg" /> <span>Customer Segment</span>
            </NavLink>
          </li>
        </ul>

        <div className="mt-10">
          <p
            className="text-xs mb-3 uppercase tracking-[0.2em] font-semibold"
            style={{ color: SAGE }}
          >
            System Pages
          </p>

          <ul className="space-y-3">
            <li>
              <NavLink to="/error-400" className={menuClass} style={menuStyle}>
                <span>Error 400</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/error-401" className={menuClass} style={menuStyle}>
                <span>Error 401</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/error-403" className={menuClass} style={menuStyle}>
                <span>Error 403</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* CARD */}
        <div
          className="mt-12 text-white p-5 rounded-3xl shadow-lg backdrop-blur-md"
          style={{
            background: `linear-gradient(to bottom right, ${ACCENT}, ${AMBER})`,
          }}
        >
          <p className="text-sm mb-4 leading-relaxed font-light">
            Manage your beauty services and treatment menus with elegance and ease
          </p>
          <button
            onClick={handleAddTreatment}
            className="w-full px-3 py-2 rounded-2xl font-semibold transition-all duration-300 shadow-sm hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
            style={{ background: "#FFFFFF", color: ACCENT }}
          >
            + Add Treatment
          </button>
        </div>
      </div>

      <style>{`
        @keyframes toast-in {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-toast { animation: toast-in 0.3s ease-out; }
      `}</style>
    </>
  );
};

export default Sidebar;
