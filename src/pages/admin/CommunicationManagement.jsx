import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  FaEnvelope, FaBell, FaSearch, FaFilter, FaPaperPlane, FaPlus,
  FaUsers, FaCheckCircle, FaClock, FaTimes,
} from "react-icons/fa";

const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const mockMessages = [
  { id: "MSG-001", type: "Reminder", subject: "Reminder: Facial Appointment Tomorrow", recipients: "All Scheduled", segment: "Booking", sentDate: "2026-06-26", status: "Sent", opened: 34 },
  { id: "MSG-002", type: "Promo", subject: "Flash Sale: 50% Off Facial Treatments!", recipients: "All Members", segment: "Promo", sentDate: "2026-06-25", status: "Sent", opened: 156 },
  { id: "MSG-003", type: "Birthday", subject: "Happy Birthday! Special Gift Inside 🎂", recipients: "Birthday This Month", segment: "Loyalty", sentDate: "2026-06-24", status: "Sent", opened: 12 },
  { id: "MSG-004", type: "Follow Up", subject: "How was your treatment? Leave a review!", recipients: "Recently Completed", segment: "Feedback", sentDate: "2026-06-23", status: "Sent", opened: 45 },
  { id: "MSG-005", type: "Announcement", subject: "New Treatment: Glass Skin Facial Launching!", recipients: "All Customers", segment: "Marketing", sentDate: "2026-06-22", status: "Sent", opened: 230 },
  { id: "MSG-006", type: "Reminder", subject: "Membership Expiring Soon — Renew Now", recipients: "Expiring This Month", segment: "Membership", sentDate: "2026-06-27", status: "Scheduled", opened: 0 },
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

export default function CommunicationManagement() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [messages, setMessages] = useState(mockMessages);
  const [newMsgModal, setNewMsgModal] = useState(false);
  const [detailModal, setDetailModal] = useState(null);
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const types = ["All", "Reminder", "Promo", "Birthday", "Follow Up", "Announcement"];
  const totalOpened = messages.reduce((s, m) => s + m.opened, 0);

  const handleSendMessage = (msg) => {
    const id = `MSG-${String(messages.length + 1).padStart(3, "0")}`;
    setMessages((prev) => [{ ...msg, id, sentDate: new Date().toISOString().split("T")[0], status: "Sent", opened: 0 }, ...prev]);
    setNewMsgModal(false);
    showToast(`Pesan "${msg.subject}" berhasil dikirim! ✉️`);
  };

  const filtered = messages.filter((m) => {
    const matchesSearch = m.subject.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || m.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const typeStyle = (t) => {
    switch (t) {
      case "Reminder": return { bg: "#FFF3E0", color: AMBER };
      case "Promo": return { bg: BG_ALT, color: ACCENT };
      case "Birthday": return { bg: "#FFF8E1", color: "#E8B44F" };
      case "Follow Up": return { bg: "#D4EDDA", color: "#2D6A4F" };
      case "Announcement": return { bg: "#E3F2FD", color: "#1565C0" };
      default: return { bg: BG, color: SAGE };
    }
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
        <PageHeader title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Communication</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Message Center</h1></div>} breadcrumb={[{ label: "Dashboard", to: "/Dashboard" }, { label: "Communications" }]}>
          <RippleButton onClick={() => setNewMsgModal(true)} className="px-6 py-3 rounded-full text-sm"><FaPlus className="inline mr-2" size={13} />New Message</RippleButton>
        </PageHeader>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[{ icon: FaEnvelope, value: messages.length, label: "Total Messages", color: ACCENT },
          { icon: FaCheckCircle, value: messages.filter(m => m.status === "Sent").length, label: "Sent", color: "#2D6A4F" },
          { icon: FaClock, value: messages.filter(m => m.status === "Scheduled").length, label: "Scheduled", color: AMBER },
          { icon: FaUsers, value: totalOpened, label: "Total Opened", color: ACCENT },
        ].map(({ icon: Icon, value, label, color }) => (
          <div key={label} className="rounded-2xl p-5 bg-white" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
            <Icon className="text-xl mb-2" style={{ color }} />
            <h3 className="text-2xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>{value}</h3>
            <p className="text-xs mt-1" style={{ color: SAGE }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[2rem] p-8" style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2" size={14} style={{ color: SAGE }} />
            <input type="text" placeholder="Cari subject pesan..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-full outline-none text-sm bg-white transition-all focus:ring-2" style={{ border: "1px solid #E7D6DD", "--tw-ring-color": ACCENT }} />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <FaFilter size={13} style={{ color: SAGE }} className="flex-shrink-0" />
            {types.map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)} className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap" style={{ background: typeFilter === t ? ACCENT : "white", color: typeFilter === t ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}>{t}</button>
            ))}
          </div>
        </div>

        {/* MESSAGE CARDS */}
        <div className="space-y-3">
          {filtered.map((m) => {
            const ts = typeStyle(m.type);
            return (
              <div key={m.id} className="rounded-2xl p-5 bg-white transition-all hover:-translate-y-0.5 cursor-pointer" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }} onClick={() => setDetailModal(m)}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ts.bg }}>
                      {m.type === "Reminder" ? <FaBell size={18} style={{ color: ts.color }} /> :
                       m.type === "Promo" ? <FaPaperPlane size={18} style={{ color: ts.color }} /> :
                       <FaEnvelope size={18} style={{ color: ts.color }} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: ts.bg, color: ts.color }}>{m.type}</span>
                        <span className="text-xs" style={{ color: SAGE }}>{m.sentDate}</span>
                      </div>
                      <h3 className="font-semibold text-sm mb-1" style={{ color: INK }}>{m.subject}</h3>
                      <p className="text-xs" style={{ color: SAGE }}>To: {m.recipients} • Segment: {m.segment}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: m.status === "Sent" ? "#D4EDDA" : "#FFF3E0", color: m.status === "Sent" ? "#2D6A4F" : AMBER }}>{m.status}</span>
                    {m.status === "Sent" && <p className="text-xs mt-1.5" style={{ color: SAGE }}>Opened: <strong style={{ color: ACCENT }}>{m.opened}</strong></p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-xs" style={{ color: SAGE }}>Menampilkan {filtered.length} dari {messages.length} pesan</div>
      </div>
      {/* NEW MESSAGE MODAL */}
      {newMsgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setNewMsgModal(false)}>
          <div className="animate-fade rounded-3xl p-8 max-w-lg w-full" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>New Message</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>Kirim Pesan</h3></div>
              <button onClick={() => setNewMsgModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <MessageForm onSend={handleSendMessage} onClose={() => setNewMsgModal(false)} />
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setDetailModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-lg w-full" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Message Detail</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>{detailModal.subject}</h3></div>
              <button onClick={() => setDetailModal(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[{l:"Type",v:detailModal.type},{l:"Status",v:detailModal.status},{l:"Sent Date",v:detailModal.sentDate},{l:"Segment",v:detailModal.segment},{l:"Recipients",v:detailModal.recipients},{l:"Opened",v:`${detailModal.opened} opens`}].map(({l,v})=>(
                  <div key={l}><p className="text-xs font-medium mb-0.5" style={{color:SAGE}}>{l}</p><p className="text-sm font-semibold" style={{color:INK}}>{v}</p></div>
                ))}
              </div>
              <div className="p-4 rounded-xl" style={{ background: BG, border: `1px dashed ${CARD_TINT}` }}>
                <p className="text-xs font-medium mb-1" style={{ color: SAGE }}>Message Content</p>
                <p className="text-sm" style={{ color: INK }}>Pesan "{detailModal.subject}" telah dikirim ke {detailModal.recipients} melalui segment {detailModal.segment}.</p>
              </div>
              <div className="flex gap-3 pt-4" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
                <button onClick={() => setDetailModal(null)} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>Tutup</button>
                <RippleButton onClick={() => showToast(`Resend ${detailModal.subject} — coming soon!`)} className="flex-1 py-3 rounded-full text-sm"><FaPaperPlane className="inline mr-1.5" size={12} />Resend</RippleButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MessageForm({ onSend, onClose }) {
  const [form, setForm] = useState({ type: "Announcement", subject: "", recipients: "All Customers", segment: "Marketing" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSend(form); };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Subject *</label>
        <input name="subject" value={form.subject} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. Flash Sale: 50% Off!" />
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Type</label>
        <select name="type" value={form.type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, background: "#FFFFFF" }}>
          {["Announcement","Reminder","Promo","Birthday","Follow Up"].map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Recipients</label>
        <select name="recipients" value={form.recipients} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, background: "#FFFFFF" }}>
          {["All Platinum members","All Gold Members","All Silver member","All Members","All Scheduled","Birthday This Month","Recently Completed","Expiring This Month"].map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Segment</label>
        <select name="segment" value={form.segment} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, background: "#FFFFFF" }}>
          {["Marketing","Booking","Promo","Loyalty","Feedback","Membership"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="flex gap-3 pt-4" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes className="inline mr-1.5" size={11} />Cancel</button>
        <RippleButton type="submit" className="flex-1 py-3 rounded-full text-sm"><FaPaperPlane className="inline mr-1.5" size={12} />Kirim Pesan</RippleButton>
      </div>
    </form>
  );
}
