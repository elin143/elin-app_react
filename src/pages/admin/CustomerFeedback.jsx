import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import {
  FaStar, FaStarHalfAlt, FaSearch, FaFilter, FaEye, FaReply,
  FaUser, FaCheckCircle, FaTimes, FaQuoteLeft,
} from "react-icons/fa";

const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const mockFeedback = [
  { id: "FB-001", patientName: "Citra Lestari", patientId: "PT-003", treatment: "Hydrafacial", rating: 5, review: "Pelayanan sangat memuaskan! Kulit jadi glowing dan segar. Terapisnya ramah dan profesional.", date: "2026-04-05", replied: true, reply: "Terima kasih Citra! Senang mendengar hasilnya memuaskan. Sampai jumpa di treatment berikutnya! 💖" },
  { id: "FB-002", patientName: "Andi Saputra", patientId: "PT-001", treatment: "Acne Treatment", rating: 4, review: "Hasil treatment lumayan bagus, jerawat mulai berkurang setelah 2 sesi. Tapi waiting time agak lama.", date: "2026-04-03", replied: true, reply: "Terima kasih feedback-nya Andi! Kami akan improve waiting time. Keep up the treatment ya!" },
  { id: "FB-003", patientName: "Gita Permata", patientId: "PT-007", treatment: "Glass Skin Facial", rating: 5, review: "BEST FACIAL EVER! Hasilnya langsung kelihatan, pori-pori mengecil dan wajah glowing parah. Will come back! ✨", date: "2026-04-09", replied: false, reply: "" },
  { id: "FB-004", patientName: "Budi Santoso", patientId: "PT-002", treatment: "Botox Injection", rating: 3, review: "Hasil botoxnya ok tapi efeknya cepat hilang. Mungkin next time bisa lebih tahan lama.", date: "2026-04-04", replied: false, reply: "" },
  { id: "FB-005", patientName: "Dewi Anggraini", patientId: "PT-004", treatment: "Laser Rejuvenation", rating: 5, review: "Laser rejuvenation ketiga kali dan hasilnya amazing! Flek hitam berkurang drastis. Dokternya telaten.", date: "2026-04-06", replied: false, reply: "" },
  { id: "FB-006", patientName: "Maya Putri", patientId: "PT-013", treatment: "Facial Detox", rating: 4, review: "Kulit terasa lebih bersih dan detox-nya kerasa banget. Recommended buat yang kulitnya sensitif.", date: "2026-04-15", replied: true, reply: "Thanks Maya! Senang treatment-nya cocok. Jangan lupa jaga skincare routine ya!" },
  { id: "FB-007", patientName: "Tina Melati", patientId: "PT-020", treatment: "Skin Tightening", rating: 2, review: "Kurang puas dengan hasilnya. Setelah 2 minggu belum ada perubahan signifikan. Mohon follow up.", date: "2026-04-22", replied: false, reply: "" },
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

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map((s) => (
      <FaStar key={s} size={13} style={{ color: s <= rating ? "#E8B44F" : CARD_TINT }} />
    ))}
  </div>
);

export default function CustomerFeedback() {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [feedback, setFeedback] = useState(mockFeedback);
  const [viewModal, setViewModal] = useState(null);
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const ratings = ["All", "5", "4", "3", "2", "1"];
  const avgRating = (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1);

  const filtered = feedback.filter((f) => {
    const matchesSearch = f.patientName.toLowerCase().includes(search.toLowerCase()) || f.review.toLowerCase().includes(search.toLowerCase());
    const matchesRating = ratingFilter === "All" || f.rating === Number(ratingFilter);
    return matchesSearch && matchesRating;
  });

  const handleReply = (fb) => {
    const reply = prompt(`Balas review dari ${fb.patientName}:`);
    if (reply) {
      setFeedback((prev) => prev.map((f) => f.id === fb.id ? { ...f, replied: true, reply } : f));
      showToast(`Balasan untuk ${fb.patientName} terkirim! ✅`);
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes ripple { to { transform: scale(8); opacity: 0; } }
        @keyframes toast-in { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-ripple { animation: ripple 0.6s ease-out forwards; }
        .animate-toast { animation: toast-in 0.3s ease-out; }
        .animate-fade { animation: fade-in 0.2s ease-out; }
      `}</style>
      {toast && (<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] animate-toast px-6 py-3.5 rounded-full text-white text-sm font-medium shadow-xl" style={{ background: INK }}>{toast}</div>)}

      <div className="rounded-[2rem] p-8 mb-6" style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
        <PageHeader title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Customer Feedback</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Reviews & Ratings</h1></div>} breadcrumb={[{ label: "Dashboard", to: "/Dashboard" }, { label: "Feedback" }]} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[{ icon: FaStar, value: feedback.length, label: "Total Reviews", color: ACCENT },
          { icon: FaStar, value: avgRating, label: "Avg Rating", color: "#E8B44F" },
          { icon: FaCheckCircle, value: feedback.filter(f => f.replied).length, label: "Replied", color: "#2D6A4F" },
          { icon: FaUser, value: feedback.filter(f => !f.replied).length, label: "Need Reply", color: "#D32F2F" },
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
            <input type="text" placeholder="Cari pasien, review..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-full outline-none text-sm bg-white transition-all focus:ring-2" style={{ border: "1px solid #E7D6DD", "--tw-ring-color": ACCENT }} />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <FaFilter size={13} style={{ color: SAGE }} className="flex-shrink-0" />
            {ratings.map((r) => (
              <button key={r} onClick={() => setRatingFilter(r)} className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1" style={{ background: ratingFilter === r ? ACCENT : "white", color: ratingFilter === r ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}>
                {r === "All" ? "All" : <><FaStar size={10} style={{ color: "#E8B44F" }} />{r}</>}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((fb) => (
            <div key={fb.id} className="rounded-2xl p-5 bg-white transition-all hover:-translate-y-0.5" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Link to={`/Pasien/${fb.patientId}`} className="font-semibold text-sm hover:opacity-70" style={{ color: INK }}>{fb.patientName}</Link>
                    <span className="text-xs" style={{ color: SAGE }}>• {fb.treatment}</span>
                    <span className="text-xs" style={{ color: SAGE }}>• {fb.date}</span>
                  </div>
                  <StarRating rating={fb.rating} />
                  <div className="mt-2 flex items-start gap-2">
                    <FaQuoteLeft size={12} style={{ color: CARD_TINT }} className="mt-0.5 flex-shrink-0" />
                    <p className="text-sm" style={{ color: INK }}>{fb.review}</p>
                  </div>
                  {fb.replied && (
                    <div className="mt-3 ml-4 p-3 rounded-xl" style={{ background: BG, border: `1px solid ${CARD_TINT}` }}>
                      <p className="text-xs font-medium mb-0.5" style={{ color: ACCENT }}>💬 Clinic Response:</p>
                      <p className="text-sm" style={{ color: INK }}>{fb.reply}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => setViewModal(fb)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ color: ACCENT, border: `1px solid ${CARD_TINT}` }} title="View"><FaEye size={13} /></button>
                  {!fb.replied && (
                    <button onClick={() => handleReply(fb)} className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105" style={{ background: BG_ALT, color: ACCENT }}><FaReply className="inline mr-1" size={9} />Reply</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs" style={{ color: SAGE }}>Menampilkan {filtered.length} dari {feedback.length} ulasan</div>
      </div>

      {/* VIEW MODAL */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setViewModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-lg w-full" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Review Detail</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>{viewModal.patientName}</h3></div>
              <button onClick={() => setViewModal(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <StarRating rating={viewModal.rating} />
                <span className="text-sm font-semibold" style={{ color: "#E8B44F" }}>{viewModal.rating}/5</span>
              </div>
              <p className="text-sm" style={{ color: INK }}>"{viewModal.review}"</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[{l:"Patient",v:viewModal.patientName,to:`/Pasien/${viewModal.patientId}`},{l:"Treatment",v:viewModal.treatment},{l:"Date",v:viewModal.date},{l:"Status",v:viewModal.replied?"Replied":"Pending",color:viewModal.replied?"#2D6A4F":"#D32F2F"}].map(({l,v,color,to})=>(
                  <div key={l}><p className="font-medium mb-0.5" style={{color:SAGE}}>{l}</p>{to?<Link to={to} className="font-semibold hover:opacity-70" style={{color:ACCENT}}>{v}</Link>:<p className="font-semibold" style={{color:color||INK}}>{v}</p>}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
