import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  FaGift, FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaCalendarCheck,
  FaTag, FaPercent, FaBox, FaTimes, FaSave, FaCopy,
} from "react-icons/fa";

const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const mockPromos = [
  { id: "PROMO-001", code: "GLOWUP50", type: "Discount", value: "50%", minPurchase: 200000, treatments: "All Facial", startDate: "2026-06-01", endDate: "2026-07-31", usage: 45, maxUsage: 100, status: "Active" },
  { id: "PROMO-002", code: "NEWYEAR25", type: "Discount", value: "25%", minPurchase: 100000, treatments: "All Treatments", startDate: "2026-01-01", endDate: "2026-01-31", usage: 100, maxUsage: 100, status: "Expired" },
  { id: "PROMO-003", code: "BUNDLE3", type: "Bundle", value: "3 for 2", minPurchase: 500000, treatments: "Facial + Laser + Peeling", startDate: "2026-06-15", endDate: "2026-08-15", usage: 12, maxUsage: 50, status: "Active" },
  { id: "PROMO-004", code: "REFER50", type: "Voucher", value: "Rp 50.000", minPurchase: 300000, treatments: "Any Treatment", startDate: "2026-05-01", endDate: "2026-12-31", usage: 89, maxUsage: 200, status: "Active" },
  { id: "PROMO-005", code: "BDAYGIFT", type: "Voucher", value: "Rp 100.000", minPurchase: 0, treatments: "Any Treatment", startDate: "2026-01-01", endDate: "2026-12-31", usage: 23, maxUsage: 999, status: "Active" },
  { id: "PROMO-006", code: "SUMMER30", type: "Discount", value: "30%", minPurchase: 250000, treatments: "Laser Treatments", startDate: "2026-06-01", endDate: "2026-06-30", usage: 0, maxUsage: 80, status: "Scheduled" },
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

export default function PromotionManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [promos, setPromos] = useState(mockPromos);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const statuses = ["All", "Active", "Scheduled", "Expired"];
  const activeCount = promos.filter(p => p.status === "Active").length;

  const filtered = promos.filter((p) => {
    const matchesSearch = p.code.toLowerCase().includes(search.toLowerCase()) || p.treatments.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditSave = (updated) => {
    setPromos((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditModal(null);
    showToast(`Promo ${updated.code} berhasil diperbarui! ✅`);
  };

  const handleAddPromo = (newPromo) => {
    const id = `PROMO-${String(promos.length + 1).padStart(3, "0")}`;
    setPromos((prev) => [{ ...newPromo, id, usage: 0 }, ...prev]);
    setAddModal(false);
    showToast(`Promo ${newPromo.code} berhasil dibuat! 🎉`);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => showToast(`Kode ${code} disalin! 📋`)).catch(() => showToast(`Kode: ${code}`));
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
        <PageHeader title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Promotion Management</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Promo & Vouchers</h1></div>} breadcrumb={[{ label: "Dashboard", to: "/Dashboard" }, { label: "Promotions" }]}>
          <RippleButton onClick={() => setAddModal(true)} className="px-6 py-3 rounded-full text-sm"><FaPlus className="inline mr-2" size={13} />Create Promo</RippleButton>
        </PageHeader>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[{ icon: FaGift, value: promos.length, label: "Total Promos", color: ACCENT },
          { icon: FaPercent, value: activeCount, label: "Active", color: "#2D6A4F" },
          { icon: FaCalendarCheck, value: promos.filter(p => p.status === "Scheduled").length, label: "Scheduled", color: AMBER },
          { icon: FaTag, value: promos.reduce((s, p) => s + p.usage, 0), label: "Total Usage", color: ACCENT },
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
            <input type="text" placeholder="Cari kode promo, treatment..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-full outline-none text-sm bg-white transition-all focus:ring-2" style={{ border: "1px solid #E7D6DD", "--tw-ring-color": ACCENT }} />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <FaFilter size={13} style={{ color: SAGE }} className="flex-shrink-0" />
            {statuses.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap" style={{ background: statusFilter === s ? ACCENT : "white", color: statusFilter === s ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}>{s}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${CARD_TINT}` }}>
          <table className="w-full border-collapse min-w-[1100px]">
            <thead>
              <tr style={{ background: BG_ALT }}>
                {["Promo Code","Type","Value","Min Purchase","Treatments","Period","Usage","Status","Actions"].map(h => (
                  <th key={h} className="p-4 text-xs font-semibold uppercase tracking-[0.12em] text-left" style={{ color: SAGE }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b transition-all duration-200 hover:bg-white" style={{ borderColor: CARD_TINT }}>
                  <td className="p-4">
                    <button onClick={() => copyCode(p.code)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 cursor-pointer" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${AMBER})`, color: "#FFFFFF" }}>
                      <FaTag size={10} />{p.code} <FaCopy size={9} />
                    </button>
                  </td>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: BG_ALT, color: ACCENT }}>{p.type}</span></td>
                  <td className="p-4 text-sm font-bold" style={{ color: ACCENT }}>{p.value}</td>
                  <td className="p-4 text-sm" style={{ color: INK }}>Rp {p.minPurchase.toLocaleString("id-ID")}</td>
                  <td className="p-4 text-xs max-w-[180px]" style={{ color: SAGE }}>{p.treatments}</td>
                  <td className="p-4 text-xs" style={{ color: SAGE }}>{p.startDate} → {p.endDate}</td>
                  <td className="p-4"><span className="text-sm font-semibold" style={{ color: INK }}>{p.usage}</span><span className="text-xs" style={{ color: SAGE }}>/{p.maxUsage}</span></td>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: p.status === "Active" ? "#D4EDDA" : p.status === "Scheduled" ? "#FFF3E0" : "#F0F0F0", color: p.status === "Active" ? "#2D6A4F" : p.status === "Scheduled" ? AMBER : "#9CA3AF" }}>{p.status}</span></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditModal(p)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ color: ACCENT, border: `1px solid ${CARD_TINT}` }} title="Edit"><FaEdit size={13} /></button>
                      <button onClick={() => setDeleteModal(p)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-50" style={{ color: "#D32F2F", border: `1px solid ${CARD_TINT}` }} title="Delete"><FaTrash size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs" style={{ color: SAGE }}>Menampilkan {filtered.length} dari {promos.length} promo</div>
      </div>

      {/* ADD MODAL */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setAddModal(false)}>
          <div className="animate-fade rounded-3xl p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Create Promo</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>Promo Baru</h3></div>
              <button onClick={() => setAddModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <PromoForm
              promo={{ code: "", type: "Discount", value: "", minPurchase: 0, treatments: "", startDate: "", endDate: "", maxUsage: 100, status: "Active" }}
              onSave={handleAddPromo}
              onClose={() => setAddModal(false)}
              submitLabel="Buat Promo"
            />
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setEditModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Edit Promo</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>{editModal.code}</h3></div>
              <button onClick={() => setEditModal(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <PromoForm promo={editModal} onSave={handleEditSave} onClose={() => setEditModal(null)} submitLabel="Simpan Perubahan" />
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setDeleteModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-md w-full mx-4" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FDECEC" }}><FaTrash size={28} style={{ color: "#D32F2F" }} /></div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: INK }}>Hapus Promo</h3>
              <p className="text-sm" style={{ color: SAGE }}>Yakin hapus promo <strong>{deleteModal.code}</strong>?</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>Batal</button>
              <button onClick={() => { setPromos((prev) => prev.filter((p) => p.id !== deleteModal.id)); showToast(`Promo ${deleteModal.code} dihapus!`); setDeleteModal(null); }} className="flex-1 py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95" style={{ background: "#D32F2F" }}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PromoForm({ promo, onSave, onClose, submitLabel }) {
  const [form, setForm] = useState({
    code: promo.code || "",
    type: promo.type || "Discount",
    value: promo.value || "",
    minPurchase: String(promo.minPurchase || ""),
    treatments: promo.treatments || "",
    startDate: promo.startDate || "",
    endDate: promo.endDate || "",
    maxUsage: String(promo.maxUsage || ""),
    status: promo.status || "Active",
  });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...promo,
      code: form.code,
      type: form.type,
      value: form.value,
      minPurchase: Number(form.minPurchase) || 0,
      treatments: form.treatments,
      startDate: form.startDate,
      endDate: form.endDate,
      maxUsage: Number(form.maxUsage) || 0,
      status: form.status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Promo Code *</label>
          <input name="code" value={form.code} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm uppercase transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. GLOWUP50" />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, background: "#FFFFFF" }}>
            {["Discount","Bundle","Voucher"].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Value *</label>
          <input name="value" value={form.value} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. 50% or Rp 50.000" />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Min Purchase (Rp)</label>
          <input name="minPurchase" type="number" value={form.minPurchase} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. 200000" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Applicable Treatments</label>
          <input name="treatments" value={form.treatments} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. All Facial or All Treatments" />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Start Date</label>
          <input name="startDate" type="date" value={form.startDate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>End Date</label>
          <input name="endDate" type="date" value={form.endDate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Max Usage</label>
          <input name="maxUsage" type="number" value={form.maxUsage} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. 100" />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, background: "#FFFFFF" }}>
            {["Active","Scheduled","Expired"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-3 pt-4" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes className="inline mr-1.5" size={11} />Cancel</button>
        <RippleButton type="submit" className="flex-1 py-3 rounded-full text-sm"><FaSave className="inline mr-1.5" size={12} />{submitLabel || "Simpan"}</RippleButton>
      </div>
    </form>
  );
}
