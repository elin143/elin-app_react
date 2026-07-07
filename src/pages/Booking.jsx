import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import BookingAdd from "./BookingAdd";
import { supabase } from "../services/supabaseClient"; // Menggunakan client yang sudah ada
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaDollarSign,
  FaClipboardList,
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

const treatmentOptions = ["Brightening Facial","Acne Treatment","Laser Rejuvenation","Hydrafacial","Botox Injection","Chemical Peeling","Skin Booster","Microneedling","Whitening Injection","Anti Aging Facial","PRP Facial","Scar Removal Laser","Facial Detox","Jawline Filler","Glowing Facial","Nose Thread Lift","Premium Hydrafacial","Botox Forehead","Skin Tightening","Glass Skin Facial"];
const doctorOptions = ["Dr. Amanda Putri","Dr. Citra Maharani","Dr. Kevin Hartono","Dr. Rizky Ananda","Dr. Sarah Wijaya","Dr. Jessica Lim"];

// ── Edit Form Component ──
function EditForm({ booking, onSave, onCancel }) {
  const [form, setForm] = useState({ ...booking });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: SAGE }}>Patient Name</label>
          <input name="patientName" value={form.patientName || ""} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl outline-none text-sm bg-white" style={{ border: `1px solid ${CARD_TINT}`, color: INK }} />
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: SAGE }}>Date & Time</label>
          <input name="dateTime" value={form.dateTime || ""} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl outline-none text-sm bg-white" style={{ border: `1px solid ${CARD_TINT}`, color: INK }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: SAGE }}>Treatment Type</label>
          <select name="treatmentType" value={form.treatmentType || ""} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl outline-none text-sm bg-white" style={{ border: `1px solid ${CARD_TINT}`, color: INK }}>
            {treatmentOptions.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: SAGE }}>Doctor</label>
          <select name="therapistDoctor" value={form.therapistDoctor || ""} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl outline-none text-sm bg-white" style={{ border: `1px solid ${CARD_TINT}`, color: INK }}>
            {doctorOptions.map((d) => (<option key={d} value={d}>{d}</option>))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: SAGE }}>Status</label>
          <select name="status" value={form.status || "Scheduled"} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl outline-none text-sm bg-white" style={{ border: `1px solid ${CARD_TINT}`, color: INK }}>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Rescheduled">Rescheduled</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: SAGE }}>Payment Status</label>
          <select name="paymentStatus" value={form.paymentStatus || "Pending"} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl outline-none text-sm bg-white" style={{ border: `1px solid ${CARD_TINT}`, color: INK }}>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-3">
        <button type="button" onClick={onCancel} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>Batal</button>
        <button type="submit" className="flex-1 py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95" style={{ background: ACCENT }}>
          <FaSave className="inline mr-1.5" size={12} />
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
}

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

export default function Booking() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // 1. READ: AMBIL DATA DARI SUPABASE
  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const mappedBookings = data.map((b) => ({
        bookingId: b.booking_id,
        patientId: b.patient_id,
        treatmentId: b.treatment_id,
        patientName: b.patient_name,
        treatmentType: b.treatment_type,
        therapistDoctor: b.doctor_therapist,
        dateTime: b.date_time ? new Date(b.date_time).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) : "",
        status: b.status,
        paymentStatus: b.payment_status,
      }));
      setBookings(mappedBookings);
    } else if (error) {
      console.error("Fetch Error:", error);
      showToast("Gagal memuat data dari database ❌");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 2. UPDATE: SIMPAN PERUBAHAN KE SUPABASE
  const handleEditSave = async (updated) => {
    const payload = {
      patient_name: updated.patientName,
      treatment_type: updated.treatmentType,
      doctor_therapist: updated.therapistDoctor,
      status: updated.status,
      payment_status: updated.paymentStatus,
      // Jika format input tanggal diganti manual, pastikan dikonversi kembali ke ISO string di sini jika diperlukan
    };

    const { error } = await supabase
      .from("bookings")
      .update(payload)
      .eq("booking_id", updated.bookingId);

    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.bookingId === updated.bookingId ? updated : b))
      );
      setEditModal(null);
      showToast(`Booking #${updated.bookingId.substring(0,8)}... berhasil diperbarui! ✅`);
    } else {
      console.error("Update Error:", error);
      showToast(`Gagal memperbarui: ${error.message} ❌`);
    }
  };

  // 3. DELETE: HAPUS JADWAL DARI SUPABASE
  const handleDeleteBooking = async (id) => {
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("booking_id", id);

    if (!error) {
      setBookings((prev) => prev.filter((b) => b.bookingId !== id));
      setDeleteModal(null);
      showToast(`Booking berhasil dihapus! ✅`);
    } else {
      console.error("Delete Error:", error);
      showToast("Gagal menghapus data dari database ❌");
    }
  };

  // Stats
  const total = bookings.length;
  const completed = bookings.filter((b) => b.status === "Completed").length;
  const scheduled = bookings.filter((b) => b.status === "Scheduled").length;
  const cancelled = bookings.filter((b) => b.status === "Cancelled").length;
  const paidCount = bookings.filter((b) => b.paymentStatus === "Paid").length;

  const statuses = ["All", "Scheduled", "Completed", "Cancelled", "Rescheduled"];

  // Filter
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      (b.patientName?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (b.treatmentType?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (b.therapistDoctor?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (b.bookingId?.toLowerCase() || "").includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadgeStyle = (status) => {
    switch (status) {
      case "Completed":
        return { bg: "#D4EDDA", color: "#2D6A4F" };
      case "Scheduled":
        return { bg: BG_ALT, color: ACCENT };
      case "Cancelled":
        return { bg: "#FDECEC", color: "#D32F2F" };
      case "Rescheduled":
        return { bg: "#FFF3E0", color: AMBER };
      default:
        return { bg: CARD_TINT, color: SAGE };
    }
  };

  const paymentBadgeStyle = (status) => {
    switch (status) {
      case "Paid":
        return { bg: "#D4EDDA", color: "#2D6A4F" };
      case "Pending":
        return { bg: "#FFF3E0", color: AMBER };
      case "Refunded":
        return { bg: "#FDECEC", color: "#D32F2F" };
      default:
        return { bg: CARD_TINT, color: SAGE };
    }
  };

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
                Appointment Management
              </p>
              <h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>
                Booking List
              </h1>
            </div>
          }
          breadcrumb={[
            { label: "Dashboard", to: "/Dashboard" },
            { label: "Booking" },
          ]}
        >
          <RippleButton
            onClick={() => setShowBookingModal(true)}
            className="px-6 py-3 rounded-full text-sm"
          >
            <FaCalendarCheck className="inline mr-2" size={13} />
            New Booking
          </RippleButton>
        </PageHeader>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { icon: FaClipboardList, value: total, label: "Total Booking", color: ACCENT, filter: "All" },
          { icon: FaCheckCircle, value: completed, label: "Completed", color: "#2D6A4F", filter: "Completed" },
          { icon: FaClock, value: scheduled, label: "Scheduled", color: AMBER, filter: "Scheduled" },
          { icon: FaTimesCircle, value: cancelled, label: "Cancelled", color: "#D32F2F", filter: "Cancelled" },
          { icon: FaDollarSign, value: paidCount, label: "Paid", color: "#2D6A4F", filter: "All" },
        ].map(({ icon: Icon, value, label, color, filter }) => (
          <div
            key={label}
            onClick={() => setStatusFilter(filter)}
            className="rounded-2xl p-5 bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") setStatusFilter(filter); }}
            style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}
          >
            <Icon className="text-xl mb-2" style={{ color }} />
            <h3 className="text-2xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>
              {loading ? "..." : value}
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
              placeholder="Cari booking, pasien, treatment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Cari booking"
              className="w-full pl-10 pr-4 py-3 rounded-full outline-none text-sm bg-white transition-all focus:ring-2"
              style={{ border: `1px solid #E7D6DD`, "--tw-ring-color": ACCENT }}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <FaFilter size={13} style={{ color: SAGE }} className="flex-shrink-0" />
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap"
                style={{
                  background: statusFilter === s ? ACCENT : "white",
                  color: statusFilter === s ? "white" : SAGE,
                  border: `1px solid ${statusFilter === s ? ACCENT : CARD_TINT}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${CARD_TINT}` }}>
          <table className="w-full border-collapse min-w-[1100px]">
            <thead>
              <tr style={{ background: BG_ALT }}>
                {["Booking ID", "Patient", "Treatment", "Doctor", "Date & Time", "Status", "Payment", "Actions"].map(
                  (h) => (
                    <th key={h} className="p-4 text-xs font-semibold uppercase tracking-[0.12em] text-left" style={{ color: SAGE }}>
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="p-8 text-center text-sm" style={{ color: SAGE }}>Memuat data booking...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="p-8 text-center text-sm" style={{ color: SAGE }}>Tidak ada jadwal booking yang ditemukan.</td></tr>
              ) : (
                filtered.map((b) => {
                  const sBadge = statusBadgeStyle(b.status);
                  const pBadge = paymentBadgeStyle(b.paymentStatus);
                  return (
                    <tr key={b.bookingId} className="border-b transition-all duration-200 hover:bg-white" style={{ borderColor: CARD_TINT }}>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: BG_ALT, color: ACCENT }}>
                          #{b.bookingId ? b.bookingId.substring(0, 8) + "..." : "N/A"}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link to={`/Booking/${b.bookingId}`} className="font-semibold text-sm transition-colors hover:opacity-70" style={{ color: INK }}>
                          {b.patientName}
                        </Link>
                      </td>
                      <td className="p-4 text-sm font-medium" style={{ color: INK }}>{b.treatmentType}</td>
                      <td className="p-4 text-sm" style={{ color: SAGE }}>{b.therapistDoctor}</td>
                      <td className="p-4 text-xs font-medium" style={{ color: SAGE }}>{b.dateTime}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider" style={{ background: sBadge.bg, color: sBadge.color }}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider" style={{ background: pBadge.bg, color: pBadge.color }}>
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => navigate(`/Booking/${b.bookingId}`)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ color: SAGE, border: `1px solid ${CARD_TINT}` }} aria-label="View" title="View">
                            <FaEye size={13} />
                          </button>
                          <button onClick={() => setEditModal(b)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ color: AMBER, border: `1px solid ${CARD_TINT}` }} aria-label="Edit" title="Edit">
                            <FaEdit size={13} />
                          </button>
                          <button onClick={() => setDeleteModal(b)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-50" style={{ color: "#D32F2F", border: `1px solid ${CARD_TINT}` }} aria-label="Delete" title="Delete">
                            <FaTrash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center text-xs" style={{ color: SAGE }}>
          <span>Menampilkan {filtered.length} dari {bookings.length} booking</span>
          <span>{statusFilter !== "All" && `Filter: ${statusFilter}`}</span>
        </div>
      </div>

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setDeleteModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-md w-full mx-4" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FDECEC" }}>
                <FaTrash size={28} style={{ color: "#D32F2F" }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: INK }}>Hapus Booking</h3>
              <p className="text-sm" style={{ color: SAGE }}>Yakin hapus booking <strong>#{deleteModal.bookingId.substring(0,8)}...</strong> — <em>{deleteModal.patientName}</em>? Tindakan ini tidak bisa dibatalkan.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>Batal</button>
              <button onClick={() => handleDeleteBooking(deleteModal.bookingId)} className="flex-1 py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95" style={{ background: "#D32F2F" }}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setEditModal(null)}>
          <div className="animate-fade rounded-3xl p-8 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase mb-1" style={{ color: SAGE }}>Edit Booking</p>
                <h3 className="text-2xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>#{editModal.bookingId.substring(0,8)}...</h3>
              </div>
              <button onClick={() => setEditModal(null)} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }} aria-label="Tutup"><FaTimes size={16} /></button>
            </div>
            <EditForm booking={editModal} onSave={handleEditSave} onCancel={() => setEditModal(null)} />
          </div>
        </div>
      )}

      {/* NEW BOOKING MODAL */}
      {showBookingModal && (
        <BookingAdd
          onClose={() => setShowBookingModal(false)}
          onSuccess={() => {
            fetchBookings(); // Ambil ulang data segar dari Supabase setelah booking sukses dibuat
            showToast("Booking baru berhasil dibuat! ✅");
          }}
        />
      )}
    </div>
  );
}