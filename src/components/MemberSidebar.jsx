import { FaHome, FaCalendarCheck, FaUser, FaGift, FaSpa, FaStar, FaSignOutAlt, FaCrown, FaShoppingBag } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

// THEME TOKENS
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const MemberSidebar = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    showToast("Berhasil logout. Sampai jumpa! \uD83D\uDC4B");
    setTimeout(() => navigate("/"), 800);
  };

  const [user] = useState(() => JSON.parse(localStorage.getItem("user") || "{}"));
  // Read tier from localStorage (saved during register or login)
  const memberTier = JSON.parse(localStorage.getItem("memberTier") || "null");
  const currentTier = memberTier?.tier || user?.tier || "Regular";

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-2xl p-4 space-x-3 transition-all duration-300 text-sm
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



  return (
    <>
      {/* TOAST */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] animate-toast px-6 py-3.5 rounded-full text-white text-sm font-medium shadow-xl"
          style={{ background: INK }}
        >
          {toast}
        </div>
      )}

      <div
        className="w-64 min-h-screen p-6 flex flex-col"
        style={{
          background: `linear-gradient(to bottom, #FFFFFF, ${BG_ALT})`,
          borderRight: `1px solid ${CARD_TINT}`,
          boxShadow: "4px 0 20px rgba(46,34,40,0.05)",
        }}
      >
        <style>{`
          @keyframes toast-in {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-toast { animation: toast-in 0.3s ease-out; }
        `}</style>

        {/* LOGO */}
        <div
          className="mb-8 text-center pb-6 cursor-pointer hover:opacity-80 transition-opacity"
          style={{ borderBottom: `1px solid ${CARD_TINT}` }}
          onClick={() => navigate("/Member")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") navigate("/Member"); }}
          aria-label="Go to member dashboard"
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <FaCrown size={20} style={{ color: ACCENT }} />
          </div>
          <h1
            className="text-xl font-semibold"
            style={{ fontFamily: "Fraunces, serif", color: INK }}
          >
            Beauty<span style={{ color: ACCENT }}>Member</span>
          </h1>
          <p className="text-xs mt-1.5 font-light" style={{ color: SAGE }}>
            {user.username || "Member"} · {currentTier} Member
          </p>
        </div>

        {/* MENU */}
        <ul className="space-y-3 flex-1">
          {[
            { to: "/Member", icon: FaHome, label: "Dashboard" },
            { to: "/Member/appointments", icon: FaCalendarCheck, label: "My Appointments" },
            { to: "/Member/profile", icon: FaUser, label: "My Profile" },
            { to: "/Member/benefits", icon: FaGift, label: "Benefits" },
            { to: "/Member/treatments", icon: FaSpa, label: "Treatments" },
            { to: "/Member/rewards", icon: FaStar, label: "Rewards" },
            { to: "/Member/shop", icon: FaShoppingBag, label: "Shop" },
          ].map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === "/Member"} className={menuClass} style={menuStyle}>
                <Icon className="text-lg" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* LOGOUT CARD */}
        <div
          className="mt-auto text-white p-5 rounded-3xl shadow-lg"
          style={{
            background: `linear-gradient(to bottom right, ${ACCENT}, ${AMBER})`,
          }}
        >
          <p className="text-sm mb-4 leading-relaxed font-light">
            Enjoy your exclusive membership benefits and premium beauty treatments.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs opacity-80">
              <FaUser size={12} />
              <span>{user.username || "Member"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl font-semibold transition-all duration-300 hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
              style={{ background: "#FFFFFF", color: ACCENT }}
            >
              <FaSignOutAlt size={14} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberSidebar;
