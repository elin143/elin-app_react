import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { supabase } from "../services/supabaseClient";
import PatientTimeline from "./PatientTimeline";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaUser,
  FaUserPlus,
  FaUsers,
  FaCrown,
  FaHistory,
  FaPhone,
  FaEnvelope,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";

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

// ── Edit Patient Modal ──
function EditPatient({ patient, onClose, onSave }) {
  const [form, setForm] = useState({
    ...patient,
    age: String(patient.age || ""),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      age: Number(form.age),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="animate-fade rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6" style={{ borderBottom: `1px solid ${CARD_TINT}` }}>
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Edit Patient</p>
            <h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>
              #{patient.patientId || patient.id} — {patient.name}
            </h3>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>
            <FaTimes size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Patient ID</label>
              <input value={form.patientId || form.id || ""} disabled className="w-full px-4 py-3 rounded-xl outline-none text-sm" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE, background: BG }} />
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}><FaUser className="inline mr-1" size={10} /> Full Name</label>
              <input name="name" value={form.name || ""} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="Full name" />
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Age</label>
              <input name="age" type="number" value={form.age || ""} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="Age" />
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Gender</label>
              <select name="gender" value={form.gender || "Female"} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, background: "#FFFFFF" }}>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}><FaPhone className="inline mr-1" size={10} /> Phone</label>
              <input name="phone" value={form.phone || ""} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="Phone number" />
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}><FaEnvelope className="inline mr-1" size={10} /> Email</label>
              <input name="email" type="email" value={form.email || ""} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="your@email.com" />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Skin Type & Allergies</label>
              <input name="allergiesSkinType" value={form.allergiesSkinType || ""} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. Oily Skin, No Allergies" />
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}><FaCrown className="inline mr-1" size={10} /> Membership Status</label>
              <select name="membershipStatus" value={form.membershipStatus || "Regular"} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, background: "#FFFFFF" }}>
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Regular">Regular</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Last Visit</label>
              <input name="lastVisit" type="date" value={form.lastVisit || ""} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} />
            </div>
          </div>

          <div className="flex gap-3 mt-8 pt-6 justify-end" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes className="inline mr-1.5" size={11} />Cancel</button>
            <RippleButton type="submit" className="px-6 py-3 rounded-full text-sm"><FaSave className="inline mr-1.5" size={12} />Simpan Perubahan</RippleButton>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Tambah Patient Modal Lokal ──
function LocalPatientAdd({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Female",
    phone: "",
    email: "",
    allergiesSkinType: "",
    membershipStatus: "Regular",
    lastVisit: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name,
      age: form.age ? Number(form.age) : null,
      gender: form.gender,
      phone: form.phone,
      email: form.email,
      skin_type_allergies: form.allergiesSkinType || null,
      membership_status: form.membershipStatus || "Regular",
      last_visit: form.lastVisit || null,
    };

    const { data, error } = await supabase
      .from("patients")
      .insert([payload])
      .select();

    setLoading(false);

    if (!error) {
      if (data && data.length > 0) {
        onSuccess(data[0]);
      }
      onClose();
    } else {
      console.error("Insert error:", error);
      alert(`Gagal menambah pasien: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-fade" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: "Fraunces, serif" }}>Add New Patient</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><FaTimes size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block"><FaUser className="inline mr-1" size={10} /> Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:ring-2 focus:ring-[#B85C7A]" placeholder="John Doe" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Age</label>
              <input name="age" type="number" value={form.age} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:ring-2 focus:ring-[#B85C7A]" placeholder="25" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm bg-white focus:ring-2 focus:ring-[#B85C7A]">
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block"><FaPhone className="inline mr-1" size={10} /> Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:ring-2 focus:ring-[#B85C7A]" placeholder="08123456789" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block"><FaEnvelope className="inline mr-1" size={10} /> Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:ring-2 focus:ring-[#B85C7A]" placeholder="example@mail.com" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Skin Type & Allergies</label>
              <input name="allergiesSkinType" value={form.allergiesSkinType} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:ring-2 focus:ring-[#B85C7A]" placeholder="e.g. Oily Skin, Dust Allergy" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block"><FaCrown className="inline mr-1" size={10} /> Membership Status</label>
              <select name="membershipStatus" value={form.membershipStatus} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm bg-white focus:ring-2 focus:ring-[#B85C7A]">
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Regular">Regular</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Last Visit</label>
              <input name="lastVisit" type="date" value={form.lastVisit} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:ring-2 focus:ring-[#B85C7A]" />
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-100 justify-end">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-full text-sm font-medium text-white shadow-md transition-all active:scale-95 disabled:opacity-50" style={{ background: "#B85C7A" }}>
              <FaSave className="inline mr-1.5" size={12} />
              {loading ? "Saving..." : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Pasien() {
  const [search, setSearch] = useState("");
  const [membershipFilter, setMembershipFilter] = useState("All");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const total = patients.length;
  const platinum = patients.filter((p) => p.membershipStatus === "Platinum").length;
  const gold = patients.filter((p) => p.membershipStatus === "Gold").length;
  const silver = patients.filter((p) => p.membershipStatus === "Silver").length;
  const regular = patients.filter((p) => p.membershipStatus === "Regular").length;

  const memberships = ["All", "Platinum", "Gold", "Silver", "Regular"];

  const fetchPatients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const mappedData = data.map((item) => ({
        patientId: item.id,
        name: item.name,
        age: item.age,
        gender: item.gender,
        phone: item.phone,
        email: item.email,
        allergiesSkinType: item.skin_type_allergies,
        membershipStatus: item.membership_status || "Regular",
        lastVisit: item.last_visit,
      }));
      setPatients(mappedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleEditSave = async (updated) => {
    const payload = {
      name: updated.name,
      age: updated.age,
      gender: updated.gender,
      phone: updated.phone,
      email: updated.email,
      skin_type_allergies: updated.allergiesSkinType,
      membership_status: updated.membershipStatus,
      last_visit: updated.lastVisit || null,
    };

    const { error } = await supabase
      .from("patients")
      .update(payload)
      .eq("id", updated.patientId);

    if (!error) {
      setPatients((prev) => prev.map((p) => (p.patientId === updated.patientId ? updated : p)));
      setEditModal(null);
      showToast("Berhasil memperbarui data pasien ✅");
    } else {
      showToast(`Gagal: ${error.message} ❌`);
    }
  };

  const handleDelete = async (id, name) => {
    const { error } = await supabase.from("patients").delete().eq("id", id);
    if (!error) {
      setPatients((prev) => prev.filter((p) => p.patientId !== id));
      setDeleteModal(null);
      showToast(`Pasien ${name} berhasil dihapus! ✅`);
    } else {
      showToast("Gagal menghapus data ❌");
    }
  };

  const filtered = patients.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.name?.toLowerCase().includes(q) ||
        p.patientId?.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q) ||
        p.phone?.includes(search)) &&
      (membershipFilter === "All" || p.membershipStatus === membershipFilter)
    );
  });

  const membershipBadgeStyle = (status) => {
    switch (status) {
      case "Platinum": return { bg: BG_ALT, color: ACCENT, border: ACCENT };
      case "Gold": return { bg: "#FFF8E1", color: AMBER, border: AMBER };
      case "Silver": return { bg: "#F0F0F0", color: "#6B7280", border: "#D1D5DB" };
      default: return { bg: BG, color: SAGE, border: CARD_TINT };
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

      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] animate-toast px-6 py-3.5 rounded-full text-white text-sm font-medium shadow-xl" style={{ background: INK }}>{toast}</div>}

      <div className="rounded-[2rem] p-8 mb-6" style={{ background: BG, border: `1px solid ${CARD_TINT}` }}>
        <PageHeader title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Patient Management</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Patient List</h1></div>} breadcrumb={[{ label: "Dashboard", to: "/Dashboard" }, { label: "Patients" }]}>
          <RippleButton onClick={() => setShowPatientModal(true)} className="px-6 py-3 rounded-full text-sm"><FaUserPlus className="inline mr-2" size={13} />Add Patient</RippleButton>
        </PageHeader>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { icon: FaUsers, value: total, label: "Total Pasien", color: ACCENT, filter: "All" },
          { icon: FaCrown, value: platinum, label: "Platinum", color: ACCENT, filter: "Platinum" },
          { icon: FaCrown, value: gold, label: "Gold", color: AMBER, filter: "Gold" },
          { icon: FaCrown, value: silver, label: "Silver", color: "#6B7280", filter: "Silver" },
          { icon: FaUsers, value: regular, label: "Regular", color: SAGE, filter: "Regular" },
        ].map(({ icon: Icon, value, label, color, filter }) => (
          <div key={label} onClick={() => setMembershipFilter(filter)} className="rounded-2xl p-5 bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
            <Icon className="text-xl mb-2" style={{ color }} />
            <h3 className="text-2xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>{loading ? "..." : value}</h3>
            <p className="text-xs mt-1" style={{ color: SAGE }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[2rem] p-8" style={{ background: BG, border: `1px solid ${CARD_TINT}` }}>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2" size={14} style={{ color: SAGE }} />
            <input type="text" placeholder="Cari pasien, ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-full outline-none text-sm bg-white border border-[#E7D6DD] focus:ring-2 focus:ring-[#B85C7A]" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <FaFilter size={13} style={{ color: SAGE }} />
            {memberships.map((m) => (
              <button key={m} onClick={() => setMembershipFilter(m)} className="px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200" style={{ background: membershipFilter === m ? ACCENT : "white", color: membershipFilter === m ? "white" : SAGE, borderColor: membershipFilter === m ? ACCENT : CARD_TINT }}>{m}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${CARD_TINT}` }}>
          <table className="w-full border-collapse min-w-[1100px]">
            <thead>
              <tr style={{ background: BG_ALT }}>
                {["Patient ID", "Name", "Age", "Gender", "Contact", "Skin / Allergies", "Membership", "Last Visit", "Actions"].map((h) => (<th key={h} className="p-4 text-xs font-semibold uppercase tracking-[0.12em] text-left" style={{ color: SAGE }}>{h}</th>))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} className="p-8 text-center text-sm" style={{ color: SAGE }}>Memuat data pasien...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={9} className="p-8 text-center text-sm" style={{ color: SAGE }}>Tidak ada data pasien yang cocok.</td></tr>
              ) : (
                filtered.map((item) => {
                  const mBadge = membershipBadgeStyle(item.membershipStatus);
                  return (
                    <tr key={item.patientId} className="border-b bg-white/50 hover:bg-white" style={{ borderColor: CARD_TINT }}>
                      <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: BG_ALT, color: ACCENT }}>#{item.patientId ? item.patientId.substring(0, 8) + "..." : "N/A"}</span></td>
                      <td className="p-4"><Link to={`/Pasien/${item.patientId}`} className="font-semibold text-sm hover:opacity-70" style={{ color: INK }}>{item.name}</Link></td>
                      <td className="p-4 text-sm font-medium" style={{ color: INK }}>{item.age}</td>
                      <td className="p-4 text-sm font-medium" style={{ color: item.gender === "Female" ? ACCENT : SAGE }}>{item.gender}</td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs" style={{ color: ACCENT }}><FaPhone size={10} />{item.phone}</div>
                          <div className="flex items-center gap-1.5 text-xs" style={{ color: SAGE }}><FaEnvelope size={10} />{item.email}</div>
                        </div>
                      </td>
                      <td className="p-4 text-xs italic" style={{ color: SAGE }}>{item.allergiesSkinType}</td>
                      <td className="p-4"><span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider" style={{ background: mBadge.bg, color: mBadge.color, border: `1px solid ${mBadge.border}` }}>{item.membershipStatus}</span></td>
                      <td className="p-4 text-xs font-medium" style={{ color: SAGE }}>{item.lastVisit || "-"}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditModal(item)} className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200" style={{ color: ACCENT }}><FaEdit size={13} /></button>
                          <button onClick={() => setSelectedPatient(item)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: BG_ALT, color: ACCENT }}><FaHistory size={11} />Timeline</button>
                          <Link to={`/Pasien/${item.patientId}`} className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200" style={{ color: SAGE }}><FaEye size={13} /></Link>
                          <button onClick={() => setDeleteModal(item)} className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-red-600"><FaTrash size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editModal && <EditPatient patient={editModal} onClose={() => setEditModal(null)} onSave={handleEditSave} />}

      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setDeleteModal(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-50"><FaTrash size={28} className="text-red-600" /></div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: INK }}>Hapus Pasien</h3>
              <p className="text-sm text-gray-500">Yakin hapus pasien <strong>{deleteModal.name}</strong>?</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-3 rounded-full text-sm font-medium border border-gray-200 text-gray-500">Batal</button>
              <button onClick={() => handleDelete(deleteModal.patientId, deleteModal.name)} className="flex-1 py-3 rounded-full text-sm font-medium text-white bg-red-600">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {showPatientModal && (
        <LocalPatientAdd
          onClose={() => setShowPatientModal(false)}
          onSuccess={(newPatient) => {
            const mappedNewPatient = {
              patientId: newPatient.id,
              name: newPatient.name,
              age: newPatient.age,
              gender: newPatient.gender,
              phone: newPatient.phone,
              email: newPatient.email,
              allergiesSkinType: newPatient.skin_type_allergies,
              membershipStatus: newPatient.membership_status || "Regular",
              lastVisit: newPatient.last_visit,
            };
            setPatients((prev) => [mappedNewPatient, ...prev]);
            showToast(`Pasien ${mappedNewPatient.name} berhasil ditambahkan! ✅`);
          }}
        />
      )}

      {selectedPatient && <PatientTimeline patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
    </div>
  );
}