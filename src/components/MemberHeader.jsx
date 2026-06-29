import { FaBell, FaSignOutAlt, FaCrown, FaUser } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// THEME TOKENS
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const MemberHeader = () => {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const notifRef = useRef(null);

  const [user] = useState(() => JSON.parse(localStorage.getItem("user") || "{}"));

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    showToast("Berhasil logout. Sampai jumpa! \uD83D\uDC4B");
    setTimeout(() => navigate("/"), 800);
  };

  // Close notification on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const notifications = [
    { text: "Promo Facial Treatment 20% off!", time: "Baru saja", unread: true },
    { text: "Appointment kamu besok pukul 10:00", time: "1 jam lalu", unread: true },
    { text: "Reward points kamu sudah mencapai 1,250!", time: "Kemarin", unread: false },
  ];

  return (
    <>
      <style>{`
        @keyframes toast-in {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-toast { animation: toast-in 0.3s ease-out; }
      `}</style>

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
        className="flex items-center justify-between px-8 py-5 border-b relative"
        style={{ background: BG, borderColor: CARD_TINT }}
      >
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <div
            className="cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
            onClick={() => navigate("/Member")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") navigate("/Member"); }}
            aria-label="Go to member dashboard"
          >
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: SAGE }}>
              Member Portal
            </p>
            <h2
              className="text-xl font-semibold whitespace-nowrap"
              style={{ fontFamily: "Fraunces, serif", color: INK }}
            >
              Beauty Dashboard
            </h2>
          </div>

          {/* Membership Badge */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{ background: BG_ALT, color: ACCENT }}
          >
            <FaCrown size={12} />
            Premium Member
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {/* Notification */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative cursor-pointer transition hover:scale-105 p-1"
              aria-label="Notifications"
            >
              <FaBell className="text-xl" style={{ color: SAGE }} />
              <span
                className="absolute -top-1.5 -right-1.5 text-white text-[10px] px-1.5 rounded-full font-bold"
                style={{ background: ACCENT }}
              >
                3
              </span>
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-72 rounded-2xl shadow-xl z-50 p-5"
                style={{ background: BG, border: `1px solid ${CARD_TINT}` }}
              >
                <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: SAGE }}>
                  Notifikasi
                </p>
                <div className="space-y-3">
                  {notifications.map((n, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl cursor-pointer transition-colors hover:bg-white ${
                        n.unread ? "" : "opacity-60"
                      }`}
                      style={{ background: n.unread ? BG_ALT : "transparent" }}
                    >
                      <p className="text-sm font-medium" style={{ color: INK }}>{n.text}</p>
                      <p className="text-xs mt-0.5" style={{ color: SAGE }}>{n.time}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setNotifOpen(false)}
                  className="mt-3 w-full py-2 rounded-full text-xs font-medium transition-colors hover:bg-white"
                  style={{ color: SAGE, border: `1px solid ${CARD_TINT}` }}
                >
                  Tutup
                </button>
              </div>
            )}
          </div>

          {/* User & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 bg-white px-4 py-2 rounded-full" style={{ border: `1px solid ${CARD_TINT}` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: BG_ALT, color: ACCENT }}>
                {user.username?.charAt(0)?.toUpperCase() || "M"}
              </div>
              <div>
                <p className="text-xs" style={{ color: SAGE }}>Hi, Member</p>
                <p className="text-sm font-medium" style={{ color: INK }}>{user.username || "User"}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              style={{ background: ACCENT, color: "white" }}
            >
              <FaSignOutAlt size={13} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberHeader;
