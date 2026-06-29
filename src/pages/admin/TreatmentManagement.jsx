import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  FaSearch, FaFilter, FaEdit, FaTrash, FaPlus, FaEye,
  FaSpa, FaClock, FaDollarSign, FaLayerGroup, FaCheckCircle, FaTimesCircle, FaSave, FaTimes,
} from "react-icons/fa";

const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const mockTreatments = [
  { id: "TR-001", name: "Brightening Facial", category: "Facial", price: 350000, duration: 60, description: "Menghilangkan noda hitam dan mencerahkan kulit wajah.", status: "Active" },
  { id: "TR-002", name: "Acne Treatment", category: "Treatment", price: 450000, duration: 45, description: "Perawatan jerawat dengan ekstraksi dan masker khusus.", status: "Active" },
  { id: "TR-003", name: "Hydrafacial", category: "Facial", price: 550000, duration: 75, description: "Facial dengan teknologi vortex untuk membersihkan dan melembabkan.", status: "Active" },
  { id: "TR-004", name: "Botox Injection", category: "Injectable", price: 2500000, duration: 30, description: "Mengurangi kerutan dengan botulinum toxin.", status: "Active" },
  { id: "TR-005", name: "Laser Rejuvenation", category: "Laser", price: 1200000, duration: 45, description: "Peremajaan kulit dengan laser fractional.", status: "Active" },
  { id: "TR-006", name: "Chemical Peeling", category: "Treatment", price: 650000, duration: 40, description: "Pengelupasan kulit mati dengan larutan kimia.", status: "Active" },
  { id: "TR-007", name: "Glass Skin Facial", category: "Facial", price: 750000, duration: 90, description: "Rangkaian facial untuk mendapatkan kulit glowing seperti kaca.", status: "Active" },
  { id: "TR-008", name: "Microneedling", category: "Treatment", price: 900000, duration: 50, description: "Merangsang kolagen dengan jarum mikro.", status: "Inactive" },
  { id: "TR-009", name: "Skin Tightening", category: "Laser", price: 1500000, duration: 60, description: "Mengencangkan kulit dengan teknologi RF.", status: "Active" },
  { id: "TR-010", name: "PRP Facial", category: "Facial", price: 2000000, duration: 75, description: "Vampire facial menggunakan plasma darah sendiri.", status: "Active" },
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

export default function TreatmentManagement() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [treatments, setTreatments] = useState(mockTreatments);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const categories = ["All", "Facial", "Treatment", "Injectable", "Laser"];
  const active = treatments.filter(t => t.status === "Active").length;

  const filtered = treatments.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "All" || t.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleEditSave = (updated) => {
    setTreatments((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setEditModal(null);
    showToast(`Treatment ${updated.name} berhasil diperbarui! ✅`);
  };

  const handleAddTreatment = (newTreatment) => {
    const id = `TR-${String(treatments.length + 1).padStart(3, "0")}`;
    setTreatments((prev) => [{ ...newTreatment, id }, ...prev]);
    setAddModal(false);
    showToast(`${newTreatment.name} berhasil ditambahkan! ✨`);
  };

  const formatRp = (n) => "Rp " + n.toLocaleString("id-ID");

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
        <PageHeader title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Treatment Management</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Treatment Catalog</h1></div>} breadcrumb={[{ label: "Dashboard", to: "/Dashboard" }, { label: "Treatments" }]}>
          <RippleButton onClick={() => setAddModal(true)} className="px-6 py-3 rounded-full text-sm"><FaPlus className="inline mr-2" size={13} />Add Treatment</RippleButton>
        </PageHeader>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[{ icon: FaSpa, value: treatments.length, label: "Total Treatments", color: ACCENT },
          { icon: FaCheckCircle, value: active, label: "Active", color: "#2D6A4F" },
          { icon: FaTimesCircle, value: treatments.length - active, label: "Inactive", color: "#D32F2F" },
          { icon: FaLayerGroup, value: [...new Set(treatments.map(t => t.category))].length, label: "Categories", color: AMBER },
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
            <input type="text" placeholder="Cari treatment..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-full outline-none text-sm bg-white transition-all focus:ring-2" style={{ border: "1px solid #E7D6DD", "--tw-ring-color": ACCENT }} />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <FaFilter size={13} style={{ color: SAGE }} className="flex-shrink-0" />
            {categories.map((c) => (
              <button key={c} onClick={() => setCategoryFilter(c)} className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap" style={{ background: categoryFilter === c ? ACCENT : "white", color: categoryFilter === c ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}>{c}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${CARD_TINT}` }}>
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr style={{ background: BG_ALT }}>
                {["ID","Treatment","Category","Price","Duration","Status","Actions"].map(h => (
                  <th key={h} className="p-4 text-xs font-semibold uppercase tracking-[0.12em] text-left" style={{ color: SAGE }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b transition-all duration-200 hover:bg-white" style={{ borderColor: CARD_TINT }}>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: BG_ALT, color: ACCENT }}>#{t.id}</span></td>
                  <td className="p-4"><span className="font-semibold text-sm" style={{ color: INK }}>{t.name}</span><p className="text-xs mt-0.5" style={{ color: SAGE }}>{t.description}</p></td>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: BG_ALT, color: ACCENT }}>{t.category}</span></td>
                  <td className="p-4 text-sm font-semibold" style={{ color: INK }}>{formatRp(t.price)}</td>
                  <td className="p-4 text-sm" style={{ color: INK }}><FaClock className="inline mr-1" size={10} style={{ color: SAGE }} />{t.duration} min</td>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: t.status === "Active" ? "#D4EDDA" : "#FDECEC", color: t.status === "Active" ? "#2D6A4F" : "#D32F2F" }}>{t.status}</span></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditModal(t)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ color: ACCENT, border: `1px solid ${CARD_TINT}` }} title="Edit"><FaEdit size={13} /></button>
                      <button onClick={() => setDeleteModal(t)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-50" style={{ color: "#D32F2F", border: `1px solid ${CARD_TINT}` }} title="Delete"><FaTrash size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs" style={{ color: SAGE }}>Menampilkan {filtered.length} dari {treatments.length} treatment</div>
      </div>

      {/* EDIT MODAL */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setEditModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-lg w-full" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Edit Treatment</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>#{editModal.id}</h3></div>
              <button onClick={() => setEditModal(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <EditForm treatment={editModal} onSave={handleEditSave} onClose={() => setEditModal(null)} />
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setAddModal(false)}>
          <div className="animate-fade rounded-3xl p-8 max-w-lg w-full" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Add Treatment</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>Treatment Baru</h3></div>
              <button onClick={() => setAddModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <EditForm
              treatment={{ name: "", category: "Facial", price: 0, duration: 30, status: "Active", description: "" }}
              onSave={handleAddTreatment}
              onClose={() => setAddModal(false)}
              submitLabel="Tambah Treatment"
            />
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setDeleteModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-md w-full mx-4" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FDECEC" }}><FaTrash size={28} style={{ color: "#D32F2F" }} /></div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: INK }}>Hapus Treatment</h3>
              <p className="text-sm" style={{ color: SAGE }}>Yakin hapus <strong>{deleteModal.name}</strong>?</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>Batal</button>
              <button onClick={() => { setTreatments((prev) => prev.filter((t) => t.id !== deleteModal.id)); showToast(`${deleteModal.name} berhasil dihapus!`); setDeleteModal(null); }} className="flex-1 py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95" style={{ background: "#D32F2F" }}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EditForm({ treatment, onSave, onClose, submitLabel }) {
  const [form, setForm] = useState({ ...treatment, price: String(treatment.price), duration: String(treatment.duration) });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSave({ ...form, price: Number(form.price), duration: Number(form.duration) }); };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {[
        { label: "Treatment Name", name: "name", type: "text", icon: FaSpa },
        { label: "Category", name: "category", type: "select", options: ["Facial","Treatment","Injectable","Laser"] },
        { label: "Price (Rp)", name: "price", type: "number" },
        { label: "Duration (min)", name: "duration", type: "number", icon: FaClock },
        { label: "Status", name: "status", type: "select", options: ["Active","Inactive"] },
      ].map(({ label, name, type, icon: Icon, options }) => (
        <div key={name}>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>{Icon && <Icon className="inline mr-1" size={10} />}{label}</label>
          {type === "select" ? (
            <select name={name} value={form[name]} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, background: "#FFFFFF" }}>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input name={name} type={type} value={form[name]} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} />
          )}
        </div>
      ))}
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2 resize-none" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} />
      </div>
      <div className="flex gap-3 pt-4" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes className="inline mr-1.5" size={11} />Cancel</button>
        <RippleButton type="submit" className="flex-1 py-3 rounded-full text-sm"><FaSave className="inline mr-1.5" size={12} />{submitLabel || "Simpan"}</RippleButton>
      </div>
    </form>
  );
}
