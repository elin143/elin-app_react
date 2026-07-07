import { useState, useEffect } from "react"; // Tambahkan useEffect jika dibutuhkan di masa depan
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import pasienData from "../../data/pasien.json";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCrown,
  FaSave,
  FaEdit,
  FaTimes,
  FaVenusMars,
  FaBirthdayCake,
  FaAllergies,
  FaHistory,
} from "react-icons/fa";

// THEME TOKENS
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

export default function MyProfile() {
  const navigate = useNavigate();
  
  // 1. Ambil data user yang sedang login dari localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  // 2. Cari data pasien di json yang cocok dengan user yang sedang login
  // Kita gunakan .find() bukan indeks statis [0]
  const patient = pasienData.find(
    (p) => p.patientId === user.patientId || p.email === user.email
  ) || {
    // Jalur alternatif (Fallback) jika data tidak ditemukan di JSON
    name: user.username || "Guest",
    age: "",
    gender: "-",
    phone: "-",
    email: user.email || "-",
    allergiesSkinType: "-",
    treatmentHistory: "",
    membershipStatus: "Regular",
    patientId: "NEW"
  };

  const memberTier = JSON.parse(localStorage.getItem("memberTier") || "null");
  const currentTier = memberTier?.tier || user?.tier || "Regular";
  
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

  // 3. Masukkan data 'patient' hasil pencarian ke dalam state form
  const [form, setForm] = useState({
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    phone: patient.phone,
    email: patient.email,
    allergiesSkinType: patient.allergiesSkinType,
    treatmentHistory: patient.treatmentHistory,
    membershipStatus: patient.membershipStatus,
  });

  // ... sisa kode HTML/JSX di bawahnya tetap sama ...

  // Efek pendukung jika seandainya data user di localstorage berubah di tengah jalan
  useEffect(() => {
    setForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      allergiesSkinType: patient.allergiesSkinType,
      treatmentHistory: patient.treatmentHistory,
      membershipStatus: patient.membershipStatus,
    });
  }, [patient.name]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      // 4. (Opsional) Jika ingin perubahan tersimpan di session login saat ini
      const updatedUser = { ...user, username: form.name, email: form.email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setSaving(false);
      setEditing(false);
      showToast("Profile berhasil disimpan! ✅");
    }, 1200);
  };

  const getMembershipIcon = () => {
    switch (currentTier) {
      case "Platinum": return <FaCrown color="#E8B44F" />;
      case "Gold": return <FaCrown color="#E8B44F" />;
      case "Silver": return <FaCrown color="#9CA3AF" />;
      default: return <FaCrown color={SAGE} />;
    }
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes toast-in {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-toast { animation: toast-in 0.3s ease-out; }
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
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium w-fit" style={{ background: BG_ALT, color: ACCENT }}>
                <FaUser size={11} />
                {user.username || "Member"}
              </div>
              <h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>
                My Profile
              </h1>
            </div>
          }
          breadcrumb={[
            { label: "Member", to: "/Member" },
            { label: "Profile" },
          ]}
        >
          <button
            onClick={() => setEditing(!editing)}
            className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            style={{
              background: editing ? "#FFFFFF" : ACCENT,
              color: editing ? ACCENT : "#FFFFFF",
              border: editing ? `1px solid ${ACCENT}` : "none",
            }}
          >
            {editing ? (
              <>
                <FaTimes className="inline mr-1.5" size={12} />
                Cancel Edit
              </>
            ) : (
              <>
                <FaEdit className="inline mr-1.5" size={12} />
                Edit Profile
              </>
            )}
          </button>
        </PageHeader>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT — Avatar + Membership Card */}
        <div className="space-y-6">
          {/* Avatar Card */}
          <div
            className="rounded-3xl p-8 text-center"
            style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #8C4A63)`, color: "#FFFFFF" }}
            >
              {form.name ? form.name.charAt(0) : "?"}
            </div>
            <h2 className="text-xl font-semibold" style={{ color: INK }}>{form.name}</h2>
            <div className="flex items-center justify-center gap-1.5 mt-1.5 px-3 py-1 rounded-full mx-auto w-fit" style={{ background: BG_ALT }}>
              {getMembershipIcon()}
              <span className="text-xs font-medium" style={{ color: ACCENT }}>{currentTier} Member</span>
            </div>
            <p className="text-xs mt-2" style={{ color: SAGE }}>Patient ID: {patient.patientId}</p>
          </div>

          {/* Membership Info */}
          <div
            className="rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            style={{ background: `linear-gradient(135deg, ${ACCENT}, #8C4A63)`, color: "#FFFFFF" }}
            onClick={() => navigate("/Member/benefits")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") navigate("/Member/benefits"); }}
          >
            <FaCrown className="text-2xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Membership</h3>
            <div className="space-y-3 text-sm opacity-90">
              <div className="flex justify-between pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
                <span>Tier</span>
                <span className="font-semibold">{currentTier}</span>
              </div>
              <div className="flex justify-between pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
                <span>Last Visit</span>
                <span className="font-semibold">{patient.lastVisit || "-"}</span>
              </div>
              <div className="flex justify-between pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
                <span>Treatments</span>
                <span className="font-semibold">{patient.treatmentHistory ? patient.treatmentHistory.split(",").length : 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Reward Points</span>
                <span className="font-semibold">1,250 ✨</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Profile Form */}
        <div
          className="lg:col-span-2 rounded-3xl p-8"
          style={{ background: "#FFFFFF", border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}
        >
          <h3 className="text-xl font-semibold mb-6" style={{ color: INK }}>Personal Information</h3>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                <FaUser className="inline mr-1" size={10} /> Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!editing}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all"
                style={{
                  border: `1px solid ${CARD_TINT}`,
                  color: INK,
                  background: editing ? "#FFFFFF" : BG,
                  cursor: editing ? "text" : "default",
                }}
                placeholder="Your full name"
              />
            </div>

            {/* Age */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                <FaBirthdayCake className="inline mr-1" size={10} /> Age
              </label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                disabled={!editing}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all"
                style={{
                  border: `1px solid ${CARD_TINT}`,
                  color: INK,
                  background: editing ? "#FFFFFF" : BG,
                  cursor: editing ? "text" : "default",
                }}
                placeholder="Your age"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                <FaVenusMars className="inline mr-1" size={10} /> Gender
              </label>
              {editing ? (
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all"
                  style={{ border: `1px solid ${CARD_TINT}`, color: INK, background: "#FFFFFF", cursor: "pointer" }}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              ) : (
                <input
                  value={form.gender}
                  disabled
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                  style={{ border: `1px solid ${CARD_TINT}`, color: INK, background: BG }}
                />
              )}
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
                disabled={!editing}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all"
                style={{
                  border: `1px solid ${CARD_TINT}`,
                  color: INK,
                  background: editing ? "#FFFFFF" : BG,
                  cursor: editing ? "text" : "default",
                }}
                placeholder="Phone number"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                <FaEnvelope className="inline mr-1" size={10} /> Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={!editing}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all"
                style={{
                  border: `1px solid ${CARD_TINT}`,
                  color: INK,
                  background: editing ? "#FFFFFF" : BG,
                  cursor: editing ? "text" : "default",
                }}
                placeholder="your@email.com"
              />
            </div>

            {/* Skin Type / Allergies */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                <FaAllergies className="inline mr-1" size={10} /> Skin Type & Allergies
              </label>
              <input
                name="allergiesSkinType"
                value={form.allergiesSkinType}
                onChange={handleChange}
                disabled={!editing}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all"
                style={{
                  border: `1px solid ${CARD_TINT}`,
                  color: INK,
                  background: editing ? "#FFFFFF" : BG,
                  cursor: editing ? "text" : "default",
                }}
                placeholder="e.g. Oily Skin, No Allergies"
              />
            </div>

            {/* Treatment History */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>
                <FaHistory className="inline mr-1" size={10} /> Treatment History
              </label>
              <textarea
                name="treatmentHistory"
                value={form.treatmentHistory}
                onChange={handleChange}
                disabled={!editing}
                rows={3}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all resize-none"
                style={{
                  border: `1px solid ${CARD_TINT}`,
                  color: INK,
                  background: editing ? "#FFFFFF" : BG,
                  cursor: editing ? "text" : "default",
                }}
                placeholder="List of treatments you've had..."
              />
            </div>
          </div>

          {/* SAVE BUTTON */}
          {editing && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-3.5 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-60 disabled:cursor-wait"
                style={{ background: ACCENT }}
              >
                {saving ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 align-middle" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="inline mr-1.5" size={12} />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}