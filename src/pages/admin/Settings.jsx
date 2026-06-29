import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  FaSave, FaCog, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaClock, FaGlobe, FaImage,
} from "react-icons/fa";

const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

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

export default function Settings() {
  const [form, setForm] = useState({
    clinicName: "BeautyCare Clinic",
    slogan: "Elegant Beauty Clinic",
    address: "Jl. Kecantikan No. 123, Jakarta Selatan 12950",
    phone: "+62 21 1234 5678",
    email: "info@beautycare.id",
    website: "https://beautycare.id",
    workingHours: "Senin - Sabtu: 09.00 - 20.00 | Minggu: 10.00 - 17.00",
    timezone: "Asia/Jakarta (WIB)",
    bookingLimit: "50",
    notificationEmail: "admin@beautycare.id",
  });
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    showToast("Pengaturan klinik berhasil disimpan! ✅");
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
        <PageHeader title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Settings</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Clinic Configuration</h1></div>} breadcrumb={[{ label: "Dashboard", to: "/Dashboard" }, { label: "Settings" }]}>
          <RippleButton onClick={handleSave} className="px-6 py-3 rounded-full text-sm"><FaSave className="inline mr-1.5" size={12} />Save Settings</RippleButton>
        </PageHeader>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-[2rem] p-8" style={{ background: "#FFFFFF", border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
          <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: "Fraunces, serif", color: INK }}><FaCog className="inline mr-2" size={18} style={{ color: ACCENT }} />General Settings</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { label: "Clinic Name", name: "clinicName", icon: FaCog },
              { label: "Slogan", name: "slogan", icon: FaCog },
              { label: "Phone", name: "phone", icon: FaPhone },
              { label: "Email", name: "email", icon: FaEnvelope },
              { label: "Website", name: "website", icon: FaGlobe },
              { label: "Working Hours", name: "workingHours", icon: FaClock },
              { label: "Timezone", name: "timezone", icon: FaGlobe },
              { label: "Booking Limit (per day)", name: "bookingLimit", icon: FaCog, type: "number" },
              { label: "Notification Email", name: "notificationEmail", icon: FaEnvelope },
            ].map(({ label, name, icon: Icon, type }) => (
              <div key={name} className={name === "address" ? "md:col-span-2" : ""}>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}><Icon className="inline mr-1" size={10} />{label}</label>
                <input name={name} type={type || "text"} value={form[name]} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}><FaMapMarkerAlt className="inline mr-1" size={10} />Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} rows={2} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2 resize-none" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] p-6 text-center" style={{ background: "#FFFFFF", border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: INK }}>Clinic Logo</h3>
            <div className="w-32 h-32 rounded-2xl mx-auto flex items-center justify-center" style={{ background: BG, border: `1px dashed ${CARD_TINT}` }}>
              <div className="text-center"><FaImage size={28} style={{ color: SAGE }} /><p className="text-xs mt-1" style={{ color: SAGE }}>Upload Logo</p></div>
            </div>
            <button onClick={() => showToast("Upload logo — coming soon!")} className="mt-4 px-5 py-2 rounded-full text-xs font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>Change Logo</button>
          </div>

          <div className="rounded-[2rem] p-6" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${AMBER})`, color: "#FFFFFF" }}>
            <h3 className="font-semibold mb-3">System Info</h3>
            <div className="space-y-2 text-sm opacity-90">
              {[{l:"Version",v:"v2.1.0"},{l:"Last Backup",v:"June 26, 2026"},{l:"Storage Used",v:"2.4 GB / 10 GB"},{l:"Active Users",v:"3 Admins"}].map(({l,v})=>(
                <div key={l} className="flex justify-between"><span>{l}</span><span className="font-semibold">{v}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
