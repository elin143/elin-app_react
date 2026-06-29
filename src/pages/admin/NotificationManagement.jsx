import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  FaBell, FaFilter, FaCheck, FaTimes, FaCalendarCheck,
  FaBox, FaCreditCard, FaCrown, FaUserPlus, FaExclamationTriangle,
} from "react-icons/fa";

const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const mockNotifications = [
  { id: "NOTIF-001", type: "Booking", title: "New Booking: Glass Skin Facial", message: "Gita Permata booked Glass Skin Facial for June 28, 2026.", time: "5 min ago", read: false, icon: FaCalendarCheck, color: ACCENT },
  { id: "NOTIF-002", type: "Payment", title: "Payment Received: Rp 550.000", message: "Citra Lestari completed payment for Hydrafacial.", time: "15 min ago", read: false, icon: FaCreditCard, color: "#2D6A4F" },
  { id: "NOTIF-003", type: "Stock", title: "Low Stock Alert: Acne Clear Toner", message: "Stock remaining: 8 pcs. Reorder recommended.", time: "1 hour ago", read: false, icon: FaExclamationTriangle, color: "#D32F2F" },
  { id: "NOTIF-004", type: "Membership", title: "Membership Upgrade: Citra Lestari", message: "Citra Lestari upgraded to Platinum tier.","time": "2 hours ago", read: true, icon: FaCrown, color: "#E8B44F" },
  { id: "NOTIF-005", type: "Booking", title: "Booking Cancelled: Botox Injection", message: "Budi Santoso cancelled Botox Injection appointment.", time: "3 hours ago", read: true, icon: FaCalendarCheck, color: SAGE },
  { id: "NOTIF-006", type: "New User", title: "New Patient Registered: Rina K.", message: "Rina Kurnia registered as new patient.", time: "5 hours ago", read: true, icon: FaUserPlus, color: ACCENT },
  { id: "NOTIF-007", type: "Stock", title: "Product Restocked: Sunscreen SPF50", message: "Sunscreen Matte SPF50 restocked +40 pcs.", time: "1 day ago", read: true, icon: FaBox, color: "#2D6A4F" },
  { id: "NOTIF-008", type: "Payment", title: "Payment Pending: Rp 2.500.000", message: "Budi Santoso — Botox Injection payment still pending.", time: "1 day ago", read: true, icon: FaCreditCard, color: AMBER },
];

function RippleButton({ children, onClick, variant, className, style: extraStyle, type }) {
  const [ripples, setRipples] = useState([]);
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples((prev) => [...prev, { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.slice(1)), 600);
    onClick?.(e);
  };
  const isPrimary = variant !== "outline";
  return (
    <button type={type || "button"} onClick={handleClick}
      className={`relative overflow-hidden font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isPrimary ? "text-white hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0" : "border hover:bg-white active:bg-stone-50"} ${className || ""}`}
      style={{ background: isPrimary ? ACCENT : "transparent", borderColor: !isPrimary ? "#E3B9C8" : undefined, color: !isPrimary ? INK : undefined, "--tw-ring-color": ACCENT, ...(extraStyle || {}) }}>
      {ripples.map((r) => (<span key={r.id} className="absolute rounded-full animate-ripple" style={{ left: r.x - 20, top: r.y - 20, width: 40, height: 40, background: isPrimary ? "rgba(255,255,255,0.35)" : "rgba(184,92,122,0.15)" }} />))}
      {children}
    </button>
  );
}

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [typeFilter, setTypeFilter] = useState("All");
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const types = ["All", "Booking", "Payment", "Stock", "Membership", "New User"];
  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter((n) => typeFilter === "All" || n.type === typeFilter);

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("Semua notifikasi ditandai terbaca! ✅");
  };

  const deleteNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast("Notifikasi dihapus! 🗑️");
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes ripple { to { transform: scale(8); opacity: 0; } }
        @keyframes toast-in { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-ripple { animation: ripple 0.6s ease-out forwards; }
        .animate-toast { animation: toast-in 0.3s ease-out; }
      `}</style>
      {toast && (<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] animate-toast px-6 py-3.5 rounded-full text-white text-sm font-medium shadow-xl" style={{ background: INK }}>{toast}</div>)}

      <div className="rounded-[2rem] p-8 mb-6" style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
        <PageHeader title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Notifications</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Notification Center</h1></div>} breadcrumb={[{ label: "Dashboard", to: "/Dashboard" }, { label: "Notifications" }]}>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: unreadCount > 0 ? "#FDECEC" : "#D4EDDA", color: unreadCount > 0 ? "#D32F2F" : "#2D6A4F" }}>{unreadCount} unread</span>
            <button onClick={markAllRead} className="px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaCheck className="inline mr-1.5" size={11} />Mark All Read</button>
          </div>
        </PageHeader>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        <FaFilter size={13} style={{ color: SAGE }} className="flex-shrink-0" />
        {types.map((t) => (
          <button key={t} onClick={() => setTypeFilter(t)} className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap" style={{ background: typeFilter === t ? ACCENT : "white", color: typeFilter === t ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}>{t}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((n) => (
          <div key={n.id} className={`rounded-2xl p-5 transition-all duration-200 ${n.read ? "bg-white opacity-80" : "bg-white"}`} style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}`, borderLeft: n.read ? `1px solid ${CARD_TINT}` : `4px solid ${n.color}` }}>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${n.color}18` }}>
                <n.icon size={16} style={{ color: n.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className={`text-sm ${n.read ? "font-medium" : "font-semibold"}`} style={{ color: INK }}>{n.title}</h3>
                  {!n.read && <span className="w-2 h-2 rounded-full" style={{ background: n.color }} />}
                </div>
                <p className="text-xs mb-1.5" style={{ color: SAGE }}>{n.message}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: SAGE }}>{n.time}</span>
                  {!n.read && <button onClick={() => markAsRead(n.id)} className="text-xs font-medium transition-colors hover:opacity-70" style={{ color: ACCENT }}><FaCheck className="inline mr-0.5" size={9} />Mark Read</button>}
                </div>
              </div>
              <button onClick={() => deleteNotif(n.id)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-50 flex-shrink-0" style={{ color: SAGE, border: `1px solid ${CARD_TINT}` }} title="Delete"><FaTimes size={12} /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs" style={{ color: SAGE }}>Menampilkan {filtered.length} dari {notifications.length} notifikasi</div>
    </div>
  );
}
