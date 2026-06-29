import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import {
  FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaSave, FaTimes,
  FaStethoscope, FaCalendarCheck, FaNotesMedical,
  FaCamera, FaFileMedical, FaPlus,
} from "react-icons/fa";

const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const mockRecords = [
  { id: "MR-001", patientId: "PT-001", patientName: "Andi Saputra", diagnosis: "Acne Vulgaris Grade 2", doctor: "Dr. Sarah", date: "2026-04-01", treatment: "Acne Treatment", notes: "Responding well to treatment. Continue with salicylic acid peels.", beforeImg: "", afterImg: "" },
  { id: "MR-002", patientId: "PT-003", patientName: "Citra Lestari", diagnosis: "Dehydrated Skin", doctor: "Dr. Maya", date: "2026-04-03", treatment: "Hydrafacial", notes: "Skin hydration improved 40%. Recommend maintenance every 2 weeks.", beforeImg: "", afterImg: "" },
  { id: "MR-003", patientId: "PT-007", patientName: "Gita Permata", diagnosis: "Hyperpigmentation", doctor: "Dr. Sarah", date: "2026-04-07", treatment: "Glass Skin Facial", notes: "Visible reduction in dark spots. Prescribed vitamin C serum.", beforeImg: "", afterImg: "" },
  { id: "MR-004", patientId: "PT-004", patientName: "Dewi Anggraini", diagnosis: "Sun Damage Level 2", doctor: "Dr. Rina", date: "2026-04-04", treatment: "Laser Rejuvenation", notes: "Significant improvement after 3 sessions. SPF 50 mandatory.", beforeImg: "", afterImg: "" },
  { id: "MR-005", patientId: "PT-009", patientName: "Intan Sari", diagnosis: "Skin Dullness", doctor: "Dr. Maya", date: "2026-04-09", treatment: "Whitening Injection", notes: "Brightness score improved from 4 to 7. Continue glutathione.", beforeImg: "", afterImg: "" },
  { id: "MR-006", patientId: "PT-013", patientName: "Maya Putri", diagnosis: "Mild Rosacea", doctor: "Dr. Rina", date: "2026-04-13", treatment: "Facial Detox", notes: "Redness reduced. Avoid spicy food and alcohol triggers.", beforeImg: "", afterImg: "" },
  { id: "MR-007", patientId: "PT-020", patientName: "Tina Melati", diagnosis: "Early Aging Signs", doctor: "Dr. Sarah", date: "2026-04-20", treatment: "Skin Tightening", notes: "Fine lines around eyes reduced. Recommend collagen booster.", beforeImg: "", afterImg: "" },
  { id: "MR-008", patientId: "PT-022", patientName: "Vina Oktaviani", diagnosis: "Lip Volume Loss", doctor: "Dr. Maya", date: "2026-04-22", treatment: "Lip Filler", notes: "Satisfactory result. Follow up in 6 months.", beforeImg: "", afterImg: "" },
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

export default function MedicalRecords() {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState(mockRecords);
  const [deleteModal, setDeleteModal] = useState(null);
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleEditSave = (updated) => {
    setRecords((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setEditModal(null);
    showToast(`Record #${updated.id} berhasil diperbarui! ✅`);
  };

  const handleAddRecord = (newRecord) => {
    const id = `MR-${String(records.length + 1).padStart(3, "0")}`;
    setRecords((prev) => [{ ...newRecord, id }, ...prev]);
    setAddModal(false);
    showToast(`Rekam medis ${newRecord.patientName} berhasil ditambahkan! 📋`);
  };
  const filtered = records.filter((r) =>
    r.patientName.toLowerCase().includes(search.toLowerCase()) ||
    r.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
    r.doctor.toLowerCase().includes(search.toLowerCase()) ||
    r.treatment.toLowerCase().includes(search.toLowerCase())
  );

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
        <PageHeader
          title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Medical Records</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Patient Medical Records</h1></div>}
          breadcrumb={[{ label: "Dashboard", to: "/Dashboard" }, { label: "Medical Records" }]}
        >
          <RippleButton onClick={() => setAddModal(true)} className="px-6 py-3 rounded-full text-sm"><FaPlus className="inline mr-2" size={13} />Add Record</RippleButton>
        </PageHeader>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[{ icon: FaFileMedical, value: records.length, label: "Total Records", color: ACCENT },
          { icon: FaStethoscope, value: [...new Set(records.map(r => r.doctor))].length, label: "Doctors", color: AMBER },
          { icon: FaNotesMedical, value: [...new Set(records.map(r => r.diagnosis))].length, label: "Diagnoses", color: SAGE },
          { icon: FaCalendarCheck, value: records.filter(r => r.date > "2026-04-10").length, label: "This Month", color: ACCENT },
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
            <input type="text" placeholder="Cari pasien, diagnosis, dokter..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-full outline-none text-sm bg-white transition-all focus:ring-2" style={{ border: "1px solid #E7D6DD", "--tw-ring-color": ACCENT }} />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter size={13} style={{ color: SAGE }} />
            {["All","Acne","Skin","Aging","Pigmentation"].map(f => (
              <button key={f} onClick={() => setSearch(f === "All" ? "" : f)} className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200" style={{ background: search === f || (f === "All" && !search) ? ACCENT : "white", color: search === f || (f === "All" && !search) ? "white": SAGE, border: `1px solid ${CARD_TINT}` }}>{f}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${CARD_TINT}` }}>
          <table className="w-full border-collapse min-w-[1100px]">
            <thead>
              <tr style={{ background: BG_ALT }}>
                {["Record ID","Patient","Diagnosis","Doctor","Date","Treatment","Notes","Actions"].map(h => (
                  <th key={h} className="p-4 text-xs font-semibold uppercase tracking-[0.12em] text-left" style={{ color: SAGE }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b transition-all duration-200 hover:bg-white" style={{ borderColor: CARD_TINT }}>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: BG_ALT, color: ACCENT }}>#{r.id}</span></td>
                  <td className="p-4">
                    <Link to={`/Pasien/${r.patientId}`} className="font-semibold text-sm transition-colors hover:opacity-70" style={{ color: INK }}>{r.patientName}</Link>
                  </td>
                  <td className="p-4 text-sm" style={{ color: INK }}>{r.diagnosis}</td>
                  <td className="p-4 text-sm font-medium" style={{ color: ACCENT }}>{r.doctor}</td>
                  <td className="p-4 text-xs" style={{ color: SAGE }}>{r.date}</td>
                  <td className="p-4 text-sm" style={{ color: INK }}>{r.treatment}</td>
                  <td className="p-4 text-xs max-w-[200px] truncate" style={{ color: SAGE }}>{r.notes}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setViewModal(r)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ color: ACCENT, border: `1px solid ${CARD_TINT}` }} title="View" aria-label="Lihat detail"><FaEye size={13} /></button>
                      <button onClick={() => setEditModal(r)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ color: SAGE, border: `1px solid ${CARD_TINT}` }} title="Edit" aria-label="Edit"><FaEdit size={13} /></button>
                      <button onClick={() => setDeleteModal(r)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-50" style={{ color: "#D32F2F", border: `1px solid ${CARD_TINT}` }} title="Delete" aria-label="Hapus"><FaTrash size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs" style={{ color: SAGE }}>Menampilkan {filtered.length} dari {records.length} rekam medis</div>
      </div>

      {/* VIEW MODAL */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setViewModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Medical Record</p>
                <h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>#{viewModal.id}</h3>
              </div>
              <button onClick={() => setViewModal(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[{ l: "Patient", v: viewModal.patientName, to: `/Pasien/${viewModal.patientId}` },
                { l: "Doctor", v: viewModal.doctor },
                { l: "Date", v: viewModal.date },
                { l: "Treatment", v: viewModal.treatment },
              ].map(({ l, v, to }) => (
                <div key={l}><p className="text-xs font-medium mb-0.5" style={{ color: SAGE }}>{l}</p>
                  {to ? <Link to={to} className="text-sm font-semibold hover:opacity-70" style={{ color: ACCENT }}>{v}</Link> : <p className="text-sm font-semibold" style={{ color: INK }}>{v}</p>}
                </div>
              ))}
              <div className="md:col-span-2"><p className="text-xs font-medium mb-0.5" style={{ color: SAGE }}>Diagnosis</p><p className="text-sm font-semibold" style={{ color: INK }}>{viewModal.diagnosis}</p></div>
              <div className="md:col-span-2"><p className="text-xs font-medium mb-0.5" style={{ color: SAGE }}>Notes</p><p className="text-sm" style={{ color: INK }}>{viewModal.notes}</p></div>
              <div className="md:col-span-2">
                <p className="text-xs font-medium mb-2" style={{ color: SAGE }}>Before / After Documentation</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl p-8 text-center" style={{ background: BG, border: `1px dashed ${CARD_TINT}` }}>
                    <FaCamera size={24} style={{ color: SAGE }} /><p className="text-xs mt-2" style={{ color: SAGE }}>Before Photo</p>
                  </div>
                  <div className="rounded-xl p-8 text-center" style={{ background: BG, border: `1px dashed ${CARD_TINT}` }}>
                    <FaCamera size={24} style={{ color: SAGE }} /><p className="text-xs mt-2" style={{ color: SAGE }}>After Photo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setAddModal(false)}>
          <div className="animate-fade rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Add Medical Record</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>Rekam Medis Baru</h3></div>
              <button onClick={() => setAddModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <RecordForm
              record={{ patientId: "", patientName: "", diagnosis: "", doctor: "", date: new Date().toISOString().split("T")[0], treatment: "", notes: "" }}
              onSave={handleAddRecord}
              onClose={() => setAddModal(false)}
              submitLabel="Tambah Record"
            />
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setEditModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Edit Medical Record</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>#{editModal.id}</h3></div>
              <button onClick={() => setEditModal(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <RecordForm record={editModal} onSave={handleEditSave} onClose={() => setEditModal(null)} submitLabel="Simpan Perubahan" />
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setDeleteModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-md w-full mx-4" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FDECEC" }}><FaTrash size={28} style={{ color: "#D32F2F" }} /></div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: INK }}>Hapus Rekam Medis</h3>
              <p className="text-sm" style={{ color: SAGE }}>Yakin hapus record <strong>#{deleteModal.id}</strong> milik {deleteModal.patientName}?</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>Batal</button>
              <button onClick={() => { setRecords((prev) => prev.filter((r) => r.id !== deleteModal.id)); showToast(`Record #${deleteModal.id} berhasil dihapus!`); setDeleteModal(null); }} className="flex-1 py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95" style={{ background: "#D32F2F" }}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RecordForm({ record, onSave, onClose, submitLabel }) {
  const [form, setForm] = useState({
    patientId: record.patientId || "",
    patientName: record.patientName || "",
    diagnosis: record.diagnosis || "",
    doctor: record.doctor || "",
    date: record.date || "",
    treatment: record.treatment || "",
    notes: record.notes || "",
  });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...record, ...form });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Patient Name *</label>
          <input name="patientName" value={form.patientName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. Andi Saputra" />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Patient ID</label>
          <input name="patientId" value={form.patientId} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. PT-001" />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Doctor *</label>
          <select name="doctor" value={form.doctor} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, background: "#FFFFFF" }}>
            <option value="">Select Doctor</option>
            {["Dr. Sarah", "Dr. Maya", "Dr. Rina", "Dr. Anita", "Dr. Dewi"].map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Date *</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Diagnosis *</label>
          <input name="diagnosis" value={form.diagnosis} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. Acne Vulgaris Grade 2" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Treatment *</label>
          <input name="treatment" value={form.treatment} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. Acne Treatment" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2 resize-none" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="Catatan dokter..." />
        </div>
      </div>
      <div className="flex gap-3 pt-4" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes className="inline mr-1.5" size={11} />Cancel</button>
        <RippleButton type="submit" className="flex-1 py-3 rounded-full text-sm"><FaSave className="inline mr-1.5" size={12} />{submitLabel || "Simpan"}</RippleButton>
      </div>
    </form>
  );
}
