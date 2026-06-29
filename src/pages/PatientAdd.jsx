import { useState, useRef, useEffect } from "react";
import {
  FaTimes,
  FaUserPlus,
  FaUser,
  FaCalendar,
  FaPhone,
  FaEnvelope,
  FaNotesMedical,
  FaAllergies,
  FaCrown,
} from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// THEME TOKENS
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const membershipOptions = ["Regular", "Silver", "Gold", "Platinum"];

export default function PatientAdd({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    treatmentHistory: "",
    allergiesSkinType: "",
    membershipStatus: "Regular",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama pasien wajib diisi";
    if (!form.age || form.age < 1) e.age = "Umur harus diisi dengan benar";
    if (!form.gender) e.gender = "Pilih jenis kelamin";
    if (!form.phone.trim()) e.phone = "Nomor telepon wajib diisi";
    if (!form.email.trim()) e.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Format email tidak valid";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);

    const newPatient = {
      patientId: `PT-${String(Math.floor(Math.random() * 900) + 100)}`,
      ...form,
      age: Number(form.age),
      lastVisit: new Date().toISOString().split("T")[0],
    };

    onSuccess?.(newPatient);
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(43,36,32,0.55)" }}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden ${shake ? "animate-shake" : ""}`}
        style={{ background: BG }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-6px); }
            40% { transform: translateX(6px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
          }
          .animate-shake { animation: shake 0.5s ease; }
        `}</style>

        {/* Header */}
        <div className="p-6 pb-4" style={{ borderBottom: `1px solid ${CARD_TINT}` }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] uppercase" style={{ color: SAGE }}>
                Patient Registration
              </p>
              <h2 className="text-2xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>
                Add New Patient
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
              style={{ background: CARD_TINT, color: ACCENT }}
              aria-label="Tutup"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-5">
            {/* Name */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
                Nama Pasien <span style={{ color: ACCENT }}>*</span>
              </label>
              <div
                className={`flex items-center gap-2 rounded-xl px-4 py-3 bg-white transition-all duration-200 ${
                  errors.name ? "ring-2 ring-red-300" : "focus-within:ring-2"
                }`}
                style={{
                  border: `1px solid ${errors.name ? "#FCA5A5" : "#E7D6DD"}`,
                  "--tw-ring-color": errors.name ? undefined : ACCENT,
                }}
              >
                <FaUser size={14} style={{ color: SAGE }} />
                <input
                  ref={nameRef}
                  type="text"
                  placeholder="Nama lengkap"
                  value={form.name}
                  onChange={handleChange("name")}
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Age */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
                Umur <span style={{ color: ACCENT }}>*</span>
              </label>
              <div
                className={`flex items-center gap-2 rounded-xl px-4 py-3 bg-white transition-all duration-200 ${
                  errors.age ? "ring-2 ring-red-300" : "focus-within:ring-2"
                }`}
                style={{
                  border: `1px solid ${errors.age ? "#FCA5A5" : "#E7D6DD"}`,
                  "--tw-ring-color": errors.age ? undefined : ACCENT,
                }}
              >
                <FaCalendar size={14} style={{ color: SAGE }} />
                <input
                  type="number"
                  placeholder="Umur"
                  value={form.age}
                  onChange={handleChange("age")}
                  min="1"
                  max="120"
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
              {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
            </div>

            {/* Gender */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
                Jenis Kelamin <span style={{ color: ACCENT }}>*</span>
              </label>
              <div
                className={`flex items-center gap-2 rounded-xl px-4 py-3 bg-white transition-all duration-200 ${
                  errors.gender ? "ring-2 ring-red-300" : "focus-within:ring-2"
                }`}
                style={{
                  border: `1px solid ${errors.gender ? "#FCA5A5" : "#E7D6DD"}`,
                  "--tw-ring-color": errors.gender ? undefined : ACCENT,
                }}
              >
                <FaUser size={14} style={{ color: SAGE }} />
                <select
                  value={form.gender}
                  onChange={handleChange("gender")}
                  className="w-full outline-none text-sm bg-transparent cursor-pointer"
                >
                  <option value="">Pilih gender...</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
              {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender}</p>}
            </div>

            {/* Membership */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
                Membership
              </label>
              <div
                className="flex items-center gap-2 rounded-xl px-4 py-3 bg-white transition-all duration-200 focus-within:ring-2"
                style={{ border: `1px solid #E7D6DD`, "--tw-ring-color": ACCENT }}
              >
                <FaCrown size={14} style={{ color: SAGE }} />
                <select
                  value={form.membershipStatus}
                  onChange={handleChange("membershipStatus")}
                  className="w-full outline-none text-sm bg-transparent cursor-pointer"
                >
                  {membershipOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
                Telepon <span style={{ color: ACCENT }}>*</span>
              </label>
              <div
                className={`flex items-center gap-2 rounded-xl px-4 py-3 bg-white transition-all duration-200 ${
                  errors.phone ? "ring-2 ring-red-300" : "focus-within:ring-2"
                }`}
                style={{
                  border: `1px solid ${errors.phone ? "#FCA5A5" : "#E7D6DD"}`,
                  "--tw-ring-color": errors.phone ? undefined : ACCENT,
                }}
              >
                <FaPhone size={14} style={{ color: SAGE }} />
                <input
                  type="text"
                  placeholder="0812-xxxx-xxxx"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
                Email <span style={{ color: ACCENT }}>*</span>
              </label>
              <div
                className={`flex items-center gap-2 rounded-xl px-4 py-3 bg-white transition-all duration-200 ${
                  errors.email ? "ring-2 ring-red-300" : "focus-within:ring-2"
                }`}
                style={{
                  border: `1px solid ${errors.email ? "#FCA5A5" : "#E7D6DD"}`,
                  "--tw-ring-color": errors.email ? undefined : ACCENT,
                }}
              >
                <FaEnvelope size={14} style={{ color: SAGE }} />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Treatment History */}
            <div className="col-span-2">
              <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
                Riwayat Treatment
              </label>
              <div className="flex items-start gap-2 rounded-xl px-4 py-3 bg-white" style={{ border: `1px solid #E7D6DD` }}>
                <FaNotesMedical size={14} style={{ color: SAGE, marginTop: 3 }} />
                <textarea
                  rows={2}
                  placeholder="Contoh: Brightening Facial, Acne Treatment"
                  value={form.treatmentHistory}
                  onChange={handleChange("treatmentHistory")}
                  className="w-full outline-none text-sm bg-transparent resize-none"
                />
              </div>
            </div>

            {/* Allergies / Skin Type */}
            <div className="col-span-2">
              <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
                Alergi / Tipe Kulit
              </label>
              <div className="flex items-start gap-2 rounded-xl px-4 py-3 bg-white" style={{ border: `1px solid #E7D6DD` }}>
                <FaAllergies size={14} style={{ color: SAGE, marginTop: 3 }} />
                <textarea
                  rows={2}
                  placeholder="Contoh: Oily Skin, No Allergies"
                  value={form.allergiesSkinType}
                  onChange={handleChange("allergiesSkinType")}
                  className="w-full outline-none text-sm bg-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: ACCENT }}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-xl" />
              ) : (
                <>
                  <FaUserPlus size={14} />
                  Simpan Pasien
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-full font-medium transition-all duration-300 hover:bg-white"
              style={{ border: `1px solid #E3B9C8`, color: INK }}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
