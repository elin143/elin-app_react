import { FaBell, FaEnvelope, FaCog, FaSearch, FaUser, FaSignOutAlt, FaCrown, FaCalendarPlus } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// THEME TOKENS
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

// ── Ripple Button ──
function RippleButton({ children, onClick, variant, className, style: extraStyle, type }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    onClick?.(e);
  };

  const isPrimary = variant !== "outline";

  return (
    <button
      type={type || "button"}
      onClick={handleClick}
      className={`relative overflow-hidden font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isPrimary
          ? "text-white hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          : "border hover:bg-white active:bg-stone-50"
      } ${className || ""}`}
      style={{
        background: isPrimary ? ACCENT : "transparent",
        borderColor: !isPrimary ? "#E3B9C8" : undefined,
        color: !isPrimary ? INK : undefined,
        "--tw-ring-color": ACCENT,
        ...(extraStyle || {}),
      }}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full animate-ripple"
          style={{
            left: r.x - 20,
            top: r.y - 20,
            width: 40,
            height: 40,
            background: isPrimary ? "rgba(255,255,255,0.35)" : "rgba(184,92,122,0.15)",
          }}
        />
      ))}
      {children}
    </button>
  );
}

// ── Dropdown Panel ──
function Dropdown({ open, onClose, title, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-72 rounded-2xl shadow-xl z-50 p-5"
      style={{ background: BG, border: `1px solid ${CARD_TINT}` }}
    >
      <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: SAGE }}>
        {title}
      </p>
      {children}
    </div>
  );
}

// ── MAIN HEADER ──
const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  // Close all dropdowns at once
  const closeAllDropdowns = () => {
    setNotifOpen(false);
    setMsgOpen(false);
    setSettingsOpen(false);
    setProfileOpen(false);
  };

  // Toast
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // Handlers
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    closeAllDropdowns();
    showToast("Berhasil logout. Sampai jumpa! \uD83D\uDC4B");
    navigate("/");
  };

  const handleBookConsultation = () => {
    if (isLoggedIn) {
      navigate("/booking");
    } else {
      showToast("Silakan login terlebih dahulu untuk booking konsultasi.");
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value.trim();
    if (!searchTerm) {
      showToast("Silakan masukkan kata kunci pencarian.");
      return;
    }
    showToast(`Mencari "${searchTerm}"... fitur search coming soon! \uD83D\uDD0D`);
    setSearchOpen(false);
  };

  // Notification items (mock)
  const notifications = [
    { text: "Appointment besok pukul 10:00 WIB", time: "1 jam lalu", unread: true },
    { text: "Promo Facial Treatment 20% off!", time: "3 jam lalu", unread: true },
    { text: "Hasil konsultasi sudah tersedia", time: "Kemarin", unread: false },
  ];

  const messages = [
    { from: "Dr. Amanda", text: "Hasil tes kulitmu sudah keluar...", time: "10m" },
    { from: "Admin Klinik", text: "Booking kamu dikonfirmasi untuk...", time: "1h" },
  ];

  const settingsItems = [
    { label: "Profile Saya", icon: FaUser, action: () => { closeAllDropdowns(); isLoggedIn ? navigate("/Dashboard") : showToast("Silakan login dulu."); } },
    { label: "Membership", icon: FaCrown, action: () => { closeAllDropdowns(); isLoggedIn ? showToast("Kamu sudah menjadi member! \uD83C\uDF1F") : navigate("/login"); } },
    ...(isLoggedIn
      ? [{ label: "Logout", icon: FaSignOutAlt, action: () => handleLogout() }]
      : []),
  ];

  return (
    <>
      <style>{`
        @keyframes ripple { to { transform: scale(8); opacity: 0; } }
        @keyframes toast-in {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-ripple { animation: ripple 0.6s ease-out forwards; }
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

      {/* HEADER */}
      <div
        className="flex items-center justify-between px-8 py-5 border-b relative"
        style={{ background: BG, borderColor: CARD_TINT }}
      >
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <div
            className="cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
            onClick={() => navigate("/")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") navigate("/"); }}
            aria-label="Go to home"
          >
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: SAGE }}>
              BeautyCare CRM
            </p>
            <h2
              className="text-xl font-semibold whitespace-nowrap"
              style={{ fontFamily: "Fraunces, serif", color: INK }}
            >
              Beauty Dashboard
            </h2>
          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari treatment, dokter, appointment..."
            onClick={() => setSearchOpen(true)}
            readOnly
            className="w-[280px] xl:w-[350px] bg-white px-5 py-3 rounded-full outline-none text-sm transition-all focus:scale-[1.01] cursor-pointer hidden sm:block"
            style={{ border: `1px solid #E7D6DD` }}
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {/* Notification */}
          <div className="relative">
            <div
              className="relative cursor-pointer transition hover:scale-105 p-1"
              onClick={() => { setNotifOpen(!notifOpen); setMsgOpen(false); setSettingsOpen(false); setProfileOpen(false); }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") setNotifOpen(!notifOpen); }}
              aria-label="Notifications"
            >
              <FaBell className="text-xl" style={{ color: SAGE }} />
              {isLoggedIn && (
                <span
                  className="absolute -top-1.5 -right-1.5 text-white text-[10px] px-1.5 rounded-full font-bold"
                  style={{ background: ACCENT }}
                >
                  3
                </span>
              )}
            </div>
            <Dropdown open={notifOpen} onClose={() => setNotifOpen(false)} title="Notifikasi">
              {isLoggedIn ? (
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
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-stone-500 mb-3">Login untuk melihat notifikasi</p>
                  <RippleButton onClick={() => { setNotifOpen(false); navigate("/login"); }} className="px-4 py-2 rounded-full text-sm">
                    Login
                  </RippleButton>
                </div>
              )}
            </Dropdown>
          </div>

          {/* Message */}
          <div className="relative">
            <FaEnvelope
              className="text-xl cursor-pointer transition hover:scale-105"
              style={{ color: SAGE }}
              onClick={() => { setMsgOpen(!msgOpen); setNotifOpen(false); setSettingsOpen(false); setProfileOpen(false); }}
            />
            <Dropdown open={msgOpen} onClose={() => setMsgOpen(false)} title="Pesan">
              {isLoggedIn ? (
                <div className="space-y-3">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl cursor-pointer transition-colors hover:bg-white"
                      style={{ background: BG_ALT }}
                    >
                      <p className="text-xs font-semibold" style={{ color: ACCENT }}>{m.from}</p>
                      <p className="text-sm mt-0.5" style={{ color: INK }}>{m.text}</p>
                      <p className="text-xs mt-0.5" style={{ color: SAGE }}>{m.time}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-stone-500 mb-3">Login untuk melihat pesan</p>
                  <RippleButton onClick={() => { setMsgOpen(false); navigate("/login"); }} className="px-4 py-2 rounded-full text-sm">
                    Login
                  </RippleButton>
                </div>
              )}
            </Dropdown>
          </div>

          {/* Settings */}
          <div className="relative">
            <FaCog
              className="text-xl cursor-pointer transition hover:rotate-90"
              style={{ color: SAGE }}
              onClick={() => { setSettingsOpen(!settingsOpen); setNotifOpen(false); setMsgOpen(false); setProfileOpen(false); }}
            />
            <Dropdown open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Pengaturan">
              <div className="space-y-1">
                {settingsItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={item.action}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors hover:bg-white text-left"
                    style={{ color: INK }}
                  >
                    <item.icon size={15} style={{ color: SAGE }} />
                    {item.label}
                  </button>
                ))}
              </div>
            </Dropdown>
          </div>

          {/* LOGIN / LOGGED IN */}
          {isLoggedIn ? (
            <div className="relative">
              <div
                className="flex items-center gap-3 bg-white px-4 py-2 rounded-full cursor-pointer hover:shadow-md transition-all"
                style={{ border: `1px solid #E7D6DD` }}
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); setMsgOpen(false); setSettingsOpen(false); }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") setProfileOpen(!profileOpen); }}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.username || "User"}&background=B85C7A&color=fff&bold=true`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="hidden sm:block">
                  <p className="text-xs" style={{ color: SAGE }}>Welcome Back</p>
                  <p className="text-sm font-medium" style={{ color: INK }}>{user?.username || "User"}</p>
                </div>
              </div>

              <Dropdown open={profileOpen} onClose={() => setProfileOpen(false)} title="Akun">
                <div className="space-y-1">
                  <button
                    onClick={handleBookConsultation}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors hover:bg-white text-left"
                    style={{ color: INK }}
                  >
                    <FaCalendarPlus size={15} style={{ color: ACCENT }} />
                    Book Consultation
                  </button>
                  <hr style={{ borderColor: CARD_TINT, margin: "4px 0" }} />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors hover:bg-red-50 text-left"
                    style={{ color: ACCENT }}
                  >
                    <FaSignOutAlt size={15} />
                    Logout
                  </button>
                </div>
              </Dropdown>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <RippleButton
                variant="outline"
                onClick={handleLogin}
                className="px-5 py-2.5 rounded-full text-sm"
              >
                Login
              </RippleButton>
              <RippleButton
                onClick={handleRegister}
                className="px-5 py-2.5 rounded-full text-sm hidden sm:block"
              >
                Join Membership
              </RippleButton>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          style={{ background: "rgba(43,36,32,0.35)" }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="p-8 rounded-3xl w-[450px] max-w-[90vw] shadow-2xl"
            style={{ background: BG }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: SAGE }}>
              BeautyCare CRM
            </p>
            <h2
              className="text-3xl font-semibold mb-6"
              style={{ color: INK, fontFamily: "Fraunces, serif" }}
            >
              Clinic Search
            </h2>

            <form onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                placeholder="Cari treatments, doctors, patients..."
                className="w-full px-5 py-3 rounded-full outline-none bg-white text-sm"
                style={{ border: `1px solid #E7D6DD` }}
                autoFocus
              />

              <div className="flex gap-3 mt-6">
                <RippleButton type="submit" className="flex-1 py-3 rounded-full">
                  <FaSearch className="inline mr-2" size={13} />
                  Cari
                </RippleButton>
                <RippleButton
                  variant="outline"
                  onClick={() => setSearchOpen(false)}
                  className="flex-1 py-3 rounded-full"
                >
                  Tutup
                </RippleButton>
              </div>
            </form>

            {isLoggedIn && (
              <div className="mt-4 p-3 rounded-xl" style={{ background: BG_ALT }}>
                <p className="text-sm" style={{ color: SAGE }}>
                  <span className="font-semibold">Quick tip:</span> Welcome back, {user?.username}! Your recent searches will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
