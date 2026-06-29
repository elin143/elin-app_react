import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import pasienData from "../data/pasien.json";
import PatientAdd from "./PatientAdd";
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
    age: String(patient.age),
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
        {/* Header */}
        <div
          className="flex items-center justify-between p-6"
          style={{ borderBottom: `1px solid ${CARD_TINT}` }}
        >
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>
              Edit Patient
            </p>
            <h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>
              #{patient.patientId} — {patient.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-50"
            style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}
            aria-label="Tutup"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Patient ID — read only */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                Patient ID
              </label>
              <input
                value={form.patientId}
                disabled
                className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                style={{ border: `1px solid ${CARD_TINT}`, color: SAGE, background: BG }}
              />
            </div>

            {/* Name */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                <FaUser className="inline mr-1" size={10} /> Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2"
                style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }}
                placeholder="Full name"
              />
            </div>

            {/* Age */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                Age
              </label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2"
                style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }}
                placeholder="Age"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2"
                style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, background: "#FFFFFF" }}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                <FaPhone className="inline mr-1" size={10} /> Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2"
                style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }}
                placeholder="Phone number"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                <FaEnvelope className="inline mr-1" size={10} /> Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2"
                style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }}
                placeholder="your@email.com"
              />
            </div>

            {/* Skin Type / Allergies */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                Skin Type & Allergies
              </label>
              <input
                name="allergiesSkinType"
                value={form.allergiesSkinType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2"
                style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }}
                placeholder="e.g. Oily Skin, No Allergies"
              />
            </div>

            {/* Treatment History */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                Treatment History
              </label>
              <input
                name="treatmentHistory"
                value={form.treatmentHistory}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2"
                style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }}
                placeholder="e.g. Brightening Facial, Acne Treatment"
              />
            </div>

            {/* Membership Status */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                <FaCrown className="inline mr-1" size={10} /> Membership Status
              </label>
              <select
                name="membershipStatus"
                value={form.membershipStatus}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2"
                style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, background: "#FFFFFF" }}
              >
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Regular">Regular</option>
              </select>
            </div>

            {/* Last Visit */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                Last Visit
              </label>
              <input
                name="lastVisit"
                value={form.lastVisit}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2"
                style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }}
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 justify-end" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50"
              style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}
            >
              <FaTimes className="inline mr-1.5" size={11} />
              Cancel
            </button>
            <RippleButton
              type="submit"
              className="px-6 py-3 rounded-full text-sm"
            >
              <FaSave className="inline mr-1.5" size={12} />
              Simpan Perubahan
            </RippleButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Pasien() {
  const [search, setSearch] = useState("");
  const [membershipFilter, setMembershipFilter] = useState("All");
  const [patients, setPatients] = useState(pasienData);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleEditSave = (updated) => {
    setPatients((prev) => prev.map((p) => (p.patientId === updated.patientId ? updated : p)));
    setEditModal(null);
    showToast(`Pasien ${updated.name} berhasil diperbarui! ✅`);
  };

  // Stats
  const total = patients.length;
  const platinum = patients.filter((p) => p.membershipStatus === "Platinum").length;
  const gold = patients.filter((p) => p.membershipStatus === "Gold").length;
  const silver = patients.filter((p) => p.membershipStatus === "Silver").length;
  const regular = patients.filter((p) => p.membershipStatus === "Regular").length;

  const memberships = ["All", "Platinum", "Gold", "Silver", "Regular"];

  // Filter
  const filtered = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search) ||
      p.treatmentHistory.toLowerCase().includes(search.toLowerCase());
    const matchesMembership = membershipFilter === "All" || p.membershipStatus === membershipFilter;
    return matchesSearch && matchesMembership;
  });

  const membershipBadgeStyle = (status) => {
    switch (status) {
      case "Platinum":
        return { bg: BG_ALT, color: ACCENT, border: ACCENT };
      case "Gold":
        return { bg: "#FFF8E1", color: AMBER, border: AMBER };
      case "Silver":
        return { bg: "#F0F0F0", color: "#6B7280", border: "#D1D5DB" };
      case "Regular":
        return { bg: BG, color: SAGE, border: CARD_TINT };
      default:
        return { bg: BG, color: SAGE, border: CARD_TINT };
    }
  };

  const genderStyle = (g) => (g === "Female" ? { color: ACCENT } : { color: SAGE });

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes ripple { to { transform: scale(8); opacity: 0; } }
        @keyframes toast-in {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-ripple { animation: ripple 0.6s ease-out forwards; }
        .animate-toast { animation: toast-in 0.3s ease-out; }
        .animate-fade { animation: fade-in 0.2s ease-out; }
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

      {/* PAGE HEADER */}
      <div
        className="rounded-[2rem] p-8 mb-6"
        style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}
      >
        <PageHeader
          title={
            <div className="space-y-1.5">
              <p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>
                Patient Management
              </p>
              <h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>
                Patient List
              </h1>
            </div>
          }
          breadcrumb={[
            { label: "Dashboard", to: "/Dashboard" },
            { label: "Patients" },
          ]}
        >
          <RippleButton
            onClick={() => setShowPatientModal(true)}
            className="px-6 py-3 rounded-full text-sm"
          >
            <FaUserPlus className="inline mr-2" size={13} />
            Add Patient
          </RippleButton>
        </PageHeader>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { icon: FaUsers, value: total, label: "Total Pasien", color: ACCENT, filter: "All" },
          { icon: FaCrown, value: platinum, label: "Platinum", color: ACCENT, filter: "Platinum" },
          { icon: FaCrown, value: gold, label: "Gold", color: AMBER, filter: "Gold" },
          { icon: FaCrown, value: silver, label: "Silver", color: "#6B7280", filter: "Silver" },
          { icon: FaUsers, value: regular, label: "Regular", color: SAGE, filter: "Regular" },
        ].map(({ icon: Icon, value, label, color, filter }) => (
          <div
            key={label}
            onClick={() => setMembershipFilter(filter)}
            className="rounded-2xl p-5 bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") setMembershipFilter(filter); }}
            style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}
          >
            <Icon className="text-xl mb-2" style={{ color }} />
            <h3 className="text-2xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>
              {value}
            </h3>
            <p className="text-xs mt-1" style={{ color: SAGE }}>{label}</p>
          </div>
        ))}
      </div>

      {/* TABLE SECTION */}
      <div
        className="rounded-[2rem] p-8"
        style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2" size={14} style={{ color: SAGE }} />
            <input
              type="text"
              placeholder="Cari pasien, ID, treatment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Cari pasien"
              className="w-full pl-10 pr-4 py-3 rounded-full outline-none text-sm bg-white transition-all focus:ring-2"
              style={{ border: `1px solid #E7D6DD`, "--tw-ring-color": ACCENT }}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <FaFilter size={13} style={{ color: SAGE }} className="flex-shrink-0" />
            {memberships.map((m) => (
              <button
                key={m}
                onClick={() => setMembershipFilter(m)}
                className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap"
                style={{
                  background: membershipFilter === m ? ACCENT : "white",
                  color: membershipFilter === m ? "white" : SAGE,
                  border: `1px solid ${membershipFilter === m ? ACCENT : CARD_TINT}`,
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${CARD_TINT}` }}>
          <table className="w-full border-collapse min-w-[1300px]">
            <thead>
              <tr style={{ background: BG_ALT }}>
                {["Patient ID", "Name", "Age", "Gender", "Contact", "Treatment History", "Skin / Allergies", "Membership", "Last Visit", "Actions"].map(
                  (h) => (
                    <th key={h} className="p-4 text-xs font-semibold uppercase tracking-[0.12em] text-left" style={{ color: SAGE }}>
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const mBadge = membershipBadgeStyle(item.membershipStatus);
                return (
                  <tr key={item.patientId} className="border-b transition-all duration-200 hover:bg-white" style={{ borderColor: CARD_TINT }}>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: BG_ALT, color: ACCENT }}>
                        #{item.patientId}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link to={`/Pasien/${item.patientId}`} className="font-semibold text-sm transition-colors hover:opacity-70" style={{ color: INK }}>
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-4 text-sm font-medium" style={{ color: INK }}>{item.age}</td>
                    <td className="p-4 text-sm font-medium" style={genderStyle(item.gender)}>{item.gender}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: ACCENT }}>
                          <FaPhone size={10} />{item.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: SAGE }}>
                          <FaEnvelope size={10} />{item.email}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm" style={{ color: INK }}>{item.treatmentHistory}</td>
                    <td className="p-4 text-xs italic" style={{ color: SAGE }}>{item.allergiesSkinType}</td>
                    <td className="p-4">
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                        style={{ background: mBadge.bg, color: mBadge.color, border: `1px solid ${mBadge.border}` }}
                      >
                        {item.membershipStatus}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-medium" style={{ color: SAGE }}>{item.lastVisit}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditModal(item)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white"
                          style={{ color: ACCENT, border: `1px solid ${CARD_TINT}` }}
                          title="Edit"
                          aria-label={`Edit pasien ${item.name}`}
                        >
                          <FaEdit size={13} />
                        </button>
                        <button
                          onClick={() => setSelectedPatient(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
                          style={{ background: BG_ALT, color: ACCENT }}
                          title="View Timeline"
                          aria-label="Lihat timeline pasien"
                        >
                          <FaHistory size={11} />Timeline
                        </button>
                        <Link
                          to={`/Pasien/${item.patientId}`}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white"
                          style={{ color: SAGE, border: `1px solid ${CARD_TINT}` }}
                          title="Detail"
                          aria-label={`Detail pasien ${item.name}`}
                        >
                          <FaEye size={13} />
                        </Link>
                        <button
                          onClick={() => setDeleteModal(item)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-50"
                          style={{ color: "#D32F2F", border: `1px solid ${CARD_TINT}` }}
                          aria-label={`Hapus pasien ${item.name}`}
                          title="Delete"
                        >
                          <FaTrash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center text-xs" style={{ color: SAGE }}>
          <span>Menampilkan {filtered.length} dari {patients.length} pasien</span>
          <span>{membershipFilter !== "All" && `Filter: ${membershipFilter}`}</span>
        </div>
      </div>

      {/* EDIT PATIENT MODAL */}
      {editModal && (
        <EditPatient
          patient={editModal}
          onClose={() => setEditModal(null)}
          onSave={handleEditSave}
        />
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setDeleteModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-md w-full mx-4" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FDECEC" }}>
                <FaTrash size={28} style={{ color: "#D32F2F" }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: INK }}>Hapus Pasien</h3>
              <p className="text-sm" style={{ color: SAGE }}>Yakin hapus pasien <strong>{deleteModal.name}</strong> (#{deleteModal.patientId})? Tindakan ini tidak bisa dibatalkan.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>Batal</button>
              <button onClick={() => { setPatients((prev) => prev.filter((p) => p.patientId !== deleteModal.patientId)); showToast(`Pasien ${deleteModal.name} berhasil dihapus!`); setDeleteModal(null); }} className="flex-1 py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95" style={{ background: "#D32F2F" }}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PATIENT MODAL */}
      {showPatientModal && (
        <PatientAdd
          onClose={() => setShowPatientModal(false)}
          onSuccess={(newPatient) => {
            setPatients((prev) => [newPatient, ...prev]);
            showToast(`Pasien ${newPatient.name} (#${newPatient.patientId}) berhasil ditambahkan! \u2705`);
          }}
        />
      )}

      {/* TIMELINE MODAL */}
      {selectedPatient && (
        <PatientTimeline patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
      )}
    </div>
  );
}
