import { useState, useRef, useEffect } from "react";
import { FaTimes, FaCalendarPlus, FaUser, FaClock, FaStethoscope, FaComment } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { supabase } from "../services/supabaseClient";

// THEME TOKENS
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const treatmentOptions = [
  "Brightening Facial",
  "Acne Treatment",
  "Laser Rejuvenation",
  "Hydrafacial",
  "Botox Injection",
  "Chemical Peeling",
  "Skin Booster",
  "Microneedling",
  "Whitening Injection",
  "Anti Aging Facial",
  "PRP Facial",
  "Scar Removal Laser",
  "Facial Detox",
  "Jawline Filler",
  "Glowing Facial",
  "Nose Thread Lift",
  "Acne Scar Laser",
  "Premium Hydrafacial",
  "Botox Forehead",
  "Skin Tightening",
];

const doctorOptions = [
  "Dr. Amanda Putri",
  "Dr. Citra Maharani",
  "Dr. Kevin Hartono",
  "Dr. Rizky Ananda",
  "Dr. Sarah Wijaya",
  "Dr. Jessica Lim",
];

export default function BookingAdd({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    patientName: "",
    treatmentType: "",
    therapistDoctor: "",
    dateTime: "",
    notes: "",
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
    if (!form.patientName.trim()) e.patientName = "Nama pasien wajib diisi";
    if (!form.treatmentType) e.treatmentType = "Pilih jenis treatment";
    if (!form.therapistDoctor) e.therapistDoctor = "Pilih dokter/therapist";
    if (!form.dateTime) e.dateTime = "Pilih tanggal & waktu";
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

    // Menyesuaikan payload HANYA dengan kolom yang ada di tabel 'bookings' Supabase Anda
    const payload = {
      patient_name: form.patientName,
      treatment_type: form.treatmentType,
      doctor_therapist: form.therapistDoctor,
      date_time: form.dateTime,
      status: "Scheduled",
      payment_status: "Pending",
      // Catatan: Kolom 'notes' dihapus dari payload karena tidak ada di schema database Anda
    };

    const { data, error } = await supabase
      .from("bookings")
      .insert([payload])
      .select();

    setLoading(false);

    if (!error && data && data.length > 0) {
      onSuccess?.();
      onClose?.();
    } else {
      console.error("Gagal menyimpan booking baru:", error);
      alert(`Terjadi kesalahan sistem: ${error?.message || "Gagal menyimpan ke database"}`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(43,36,32,0.55)" }}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden ${shake ? "animate-shake" : ""}`}
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
                Appointment
              </p>
              <h2 className="text-2xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>
                New Booking
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
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Patient Name */}
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
              Nama Pasien
            </label>
            <div
              className={`flex items-center gap-2 rounded-xl px-4 py-3 bg-white transition-all duration-200 ${
                errors.patientName ? "ring-2 ring-red-300" : "focus-within:ring-2"
              }`}
              style={{
                border: `1px solid ${errors.patientName ? "#FCA5A5" : "#E7D6DD"}`,
                "--tw-ring-color": errors.patientName ? undefined : ACCENT,
              }}
            >
              <FaUser size={14} style={{ color: SAGE }} />
              <input
                ref={nameRef}
                type="text"
                placeholder="Nama lengkap pasien"
                value={form.patientName}
                onChange={handleChange("patientName")}
                className="w-full outline-none text-sm bg-transparent"
              />
            </div>
            {errors.patientName && <p className="text-red-400 text-xs mt-1">{errors.patientName}</p>}
          </div>

          {/* Treatment Type */}
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
              Jenis Treatment
            </label>
            <div
              className={`flex items-center gap-2 rounded-xl px-4 py-3 bg-white transition-all duration-200 ${
                errors.treatmentType ? "ring-2 ring-red-300" : "focus-within:ring-2"
              }`}
              style={{
                border: `1px solid ${errors.treatmentType ? "#FCA5A5" : "#E7D6DD"}`,
                "--tw-ring-color": errors.treatmentType ? undefined : ACCENT,
              }}
            >
              <FaStethoscope size={14} style={{ color: SAGE }} />
              <select
                value={form.treatmentType}
                onChange={handleChange("treatmentType")}
                className="w-full outline-none text-sm bg-transparent cursor-pointer"
              >
                <option value="">Pilih treatment...</option>
                {treatmentOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            {errors.treatmentType && <p className="text-red-400 text-xs mt-1">{errors.treatmentType}</p>}
          </div>

          {/* Doctor */}
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
              Dokter / Therapist
            </label>
            <div
              className={`flex items-center gap-2 rounded-xl px-4 py-3 bg-white transition-all duration-200 ${
                errors.therapistDoctor ? "ring-2 ring-red-300" : "focus-within:ring-2"
              }`}
              style={{
                border: `1px solid ${errors.therapistDoctor ? "#FCA5A5" : "#E7D6DD"}`,
                "--tw-ring-color": errors.therapistDoctor ? undefined : ACCENT,
              }}
            >
              <FaUser size={14} style={{ color: SAGE }} />
              <select
                value={form.therapistDoctor}
                onChange={handleChange("therapistDoctor")}
                className="w-full outline-none text-sm bg-transparent cursor-pointer"
              >
                <option value="">Pilih dokter...</option>
                {doctorOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            {errors.therapistDoctor && <p className="text-red-400 text-xs mt-1">{errors.therapistDoctor}</p>}
          </div>

          {/* Date & Time */}
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
              Tanggal & Waktu
            </label>
            <div
              className={`flex items-center gap-2 rounded-xl px-4 py-3 bg-white transition-all duration-200 ${
                errors.dateTime ? "ring-2 ring-red-300" : "focus-within:ring-2"
              }`}
              style={{
                border: `1px solid ${errors.dateTime ? "#FCA5A5" : "#E7D6DD"}`,
                "--tw-ring-color": errors.dateTime ? undefined : ACCENT,
              }}
            >
              <FaClock size={14} style={{ color: SAGE }} />
              <input
                type="datetime-local"
                value={form.dateTime}
                onChange={handleChange("dateTime")}
                className="w-full outline-none text-sm bg-transparent cursor-pointer"
              />
            </div>
            {errors.dateTime && <p className="text-red-400 text-xs mt-1">{errors.dateTime}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: INK }}>
              Catatan (opsional)
            </label>
            <div className="flex items-start gap-2 rounded-xl px-4 py-3 bg-white" style={{ border: `1px solid #E7D6DD` }}>
              <FaComment size={14} style={{ color: SAGE, marginTop: 3 }} />
              <textarea
                rows={3}
                placeholder="Kondisi khusus, preferensi, atau catatan tambahan..."
                value={form.notes}
                onChange={handleChange("notes")}
                className="w-full outline-none text-sm bg-transparent resize-none"
              />
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
                  <FaCalendarPlus size={14} />
                  Simpan Booking
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