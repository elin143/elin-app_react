import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import {
  FaSearch, FaFilter, FaEdit, FaTrash, FaPlus, FaClock, 
  FaSpa, FaLayerGroup, FaCheckCircle, FaTimesCircle, FaSave, FaTimes,
} from "react-icons/fa";
import { supabase } from "../../services/supabaseClient"; 

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

export default function TreatmentManagement() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [treatments, setTreatments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [toast, setToast] = useState(null);
  
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const categories = ["All", "Facial", "Treatment", "Injectable", "Laser"];

  const fetchTreatments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("treatments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTreatments(data || []);
    } catch (err) {
      console.error("Gagal mengambil data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const active = treatments.filter(t => t.status === "Active").length;

  const filtered = treatments.filter((t) => {
    const matchesSearch = (t.name || "").toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "All" || t.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleEditSave = async (updated) => {
    try {
      // Benar-benar dipastikan hanya kolom yang terdaftar di database yang dikirim
      const { error } = await supabase
        .from("treatments")
        .update({
          name: updated.name,
          category: updated.category,
          price: Number(updated.price),
          duration: Number(updated.duration),
          status: updated.status,
        })
        .eq("id", updated.id);

      if (error) throw error;

      setTreatments((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setEditModal(null);
      showToast(`Treatment ${updated.name} berhasil diperbarui! ✅`);
    } catch (err) {
      alert(`Gagal memperbarui: ${err.message}`);
    }
  };

  const handleAddTreatment = async (newTreatment) => {
    try {
      const payload = {
        name: newTreatment.name,
        category: newTreatment.category,
        price: Number(newTreatment.price),
        duration: Number(newTreatment.duration),
        status: newTreatment.status,
      };

      const { data, error } = await supabase
        .from("treatments")
        .insert([payload])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setTreatments((prev) => [data[0], ...prev]);
      }
      setAddModal(false);
      showToast(`${newTreatment.name} berhasil ditambahkan! ✨`);
    } catch (err) {
      alert(`Gagal menambahkan: ${err.message}`);
    }
  };

  const handleDeleteTreatment = async () => {
    try {
      const { error } = await supabase
        .from("treatments")
        .delete()
        .eq("id", deleteModal.id);

      if (error) throw error;

      setTreatments((prev) => prev.filter((t) => t.id !== deleteModal.id));
      showToast(`${deleteModal.name} berhasil dihapus!`);
      setDeleteModal(null);
    } catch (err) {
      alert(`Gagal menghapus: ${err.message}`);
    }
  };

  const formatRp = (n) => "Rp " + (n || 0).toLocaleString("id-ID");

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
            <h3 className="text-2xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>{loading ? "..." : value}</h3>
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
                {["No","Treatment","Category","Price","Duration","Status","Actions"].map(h => (
                  <th key={h} className="p-4 text-xs font-semibold uppercase tracking-[0.12em] text-left" style={{ color: SAGE }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-sm" style={{ color: SAGE }}>Memuat data katalog treatment...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-sm" style={{ color: SAGE }}>Tidak ada treatment ditemukan</td>
                </tr>
              ) : filtered.map((t, index) => (
                <tr key={t.id} className="border-b transition-all duration-200 hover:bg-white" style={{ borderColor: CARD_TINT }}>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: BG_ALT, color: ACCENT }}>
                      #{String(index + 1).padStart(3, "0")}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-sm" style={{ color: INK }}>{t.name}</span>
                    <p className="text-xs mt-0.5" style={{ color: SAGE }}>Perawatan kecantikan profesional</p>
                  </td>
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
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Edit Treatment</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>{editModal.name}</h3></div>
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
              treatment={{ name: "", category: "Facial", price: 0, duration: 30, status: "Active" }}
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
              <button onClick={handleDeleteTreatment} className="flex-1 py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95" style={{ background: "#D32F2F" }}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EditForm({ treatment, onSave, onClose, submitLabel }) {
  // Hanya simpan state lokal yang diperlukan, hilangkan properti description agar bersih
  const [form, setForm] = useState({ 
    id: treatment.id,
    name: treatment.name || "",
    category: treatment.category || "Facial",
    price: String(treatment.price || 0), 
    duration: String(treatment.duration || 0),
    status: treatment.status || "Active"
  });
  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    // Mengirim object bersih berisi kolom-kolom valid database saja
    onSave({ 
      id: form.id,
      name: form.name,
      category: form.category,
      price: Number(form.price), 
      duration: Number(form.duration),
      status: form.status
    }); 
  };

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
      <div className="flex gap-3 pt-4" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes className="inline mr-1.5" size={11} />Cancel</button>
        <RippleButton type="submit" className="flex-1 py-3 rounded-full text-sm"><FaSave className="inline mr-1.5" size={12} />{submitLabel || "Simpan"}</RippleButton>
      </div>
    </form>
  );
}