import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import bookingData from "../../data/booking.json";
import {
  FaCalendarCheck,
  FaSearch,
  FaTimes,
  FaClock,
  FaCheckCircle,
  FaBan,
  FaSyncAlt,
} from "react-icons/fa";

// THEME TOKENS
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const userAppointments = bookingData.slice(0, 8);

const statusColors = {
  Scheduled: { bg: "#FFF3E0", color: "#E67E22", icon: FaClock },
  Completed: { bg: "#D4EDDA", color: "#2D6A4F", icon: FaCheckCircle },
  Cancelled: { bg: "#FCE4E4", color: "#C0392B", icon: FaBan },
  Rescheduled: { bg: "#E8EAF6", color: "#5C6BC0", icon: FaSyncAlt },
};

export default function MyAppointments() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [appointments, setAppointments] = useState(userAppointments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [toast, setToast] = useState(null);
  const [cancelModal, setCancelModal] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleCancel = (id) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.bookingId === id ? { ...a, status: "Cancelled", paymentStatus: "Refunded" } : a
      )
    );
    setCancelModal(null);
    showToast(`Booking ${id} berhasil dibatalkan.`);
  };

  const handleReschedule = (id) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.bookingId === id ? { ...a, status: "Rescheduled" } : a
      )
    );
    showToast(`Booking ${id} berhasil dijadwalkan ulang! 📅`);
  };

  const statuses = ["All", "Scheduled", "Completed", "Cancelled", "Rescheduled"];

  const filtered = appointments.filter((a) => {
    const matchSearch =
      a.treatmentType.toLowerCase().includes(search.toLowerCase()) ||
      a.therapistDoctor.toLowerCase().includes(search.toLowerCase()) ||
      a.bookingId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes toast-in {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-toast { animation: toast-in 0.3s ease-out; }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
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
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium w-fit" style={{ background: BG_ALT, color: ACCENT }}>
                <FaCalendarCheck size={11} />
                {user.username || "Member"}'s Appointments
              </div>
              <h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>
                My Appointments
              </h1>
            </div>
          }
          breadcrumb={[
            { label: "Member", to: "/Member" },
            { label: "Appointments" },
          ]}
        />
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: appointments.length, icon: FaCalendarCheck, filter: "All" },
          { label: "Scheduled", value: appointments.filter((a) => a.status === "Scheduled").length, icon: FaClock, filter: "Scheduled" },
          { label: "Completed", value: appointments.filter((a) => a.status === "Completed").length, icon: FaCheckCircle, filter: "Completed" },
          { label: "Cancelled", value: appointments.filter((a) => a.status === "Cancelled").length, icon: FaBan, filter: "Cancelled" },
        ].map(({ label, value, icon: Icon, filter }) => (
          <div
            key={label}
            onClick={() => setStatusFilter(filter)}
            className="rounded-2xl p-5 bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") setStatusFilter(filter); }}
            style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: BG_ALT }}>
                <Icon style={{ color: ACCENT }} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>{value}</h3>
                <p className="text-xs" style={{ color: SAGE }}>{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div
          className="flex items-center gap-3 bg-white px-4 py-3 rounded-full flex-1"
          style={{ border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.04)" }}
        >
          <FaSearch style={{ color: SAGE }} />
          <input
            type="text"
            placeholder="Search by treatment, doctor, or booking ID..."
            className="w-full outline-none text-sm bg-transparent"
            style={{ color: INK }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: statusFilter === s ? ACCENT : "#FFFFFF",
                color: statusFilter === s ? "#FFFFFF" : SAGE,
                border: `1px solid ${statusFilter === s ? "transparent" : CARD_TINT}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* APPOINTMENT LIST */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl" style={{ background: BG }}>
            <FaCalendarCheck style={{ color: SAGE, fontSize: "3rem" }} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold" style={{ color: INK }}>No appointments found</p>
            <p className="text-sm" style={{ color: SAGE }}>Try adjusting your search or filter</p>
          </div>
        ) : (
          filtered.map((a) => {
            const StatusIcon = statusColors[a.status]?.icon || FaClock;
            const statusStyle = statusColors[a.status] || statusColors.Scheduled;
            const isScheduled = a.status === "Scheduled";

            return (
              <div
                key={a.bookingId}
                className="rounded-2xl p-6 bg-white transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  {/* LEFT */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono px-2 py-1 rounded-lg" style={{ background: BG_ALT, color: SAGE }}>
                        {a.bookingId}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium"
                        style={{ background: statusStyle.bg, color: statusStyle.color }}
                      >
                        <StatusIcon size={10} />
                        {a.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: INK }}>{a.treatmentType}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm" style={{ color: SAGE }}>
                      <span>👨‍⚕️ {a.therapistDoctor}</span>
                      <span>📅 {a.dateTime}</span>
                      <span>
                        💳 <span style={{ color: a.paymentStatus === "Paid" ? "#2D6A4F" : a.paymentStatus === "Refunded" ? "#C0392B" : "#E67E22" }}>{a.paymentStatus}</span>
                      </span>
                    </div>
                  </div>

                  {/* RIGHT - ACTIONS */}
                  {isScheduled && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleReschedule(a.bookingId)}
                        className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                        style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}
                      >
                        <FaSyncAlt className="inline mr-1.5" size={11} />
                        Reschedule
                      </button>
                      <button
                        onClick={() => setCancelModal(a.bookingId)}
                        className="px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                        style={{ background: ACCENT }}
                      >
                        <FaTimes className="inline mr-1.5" size={11} />
                        Cancel
                      </button>
                    </div>
                  )}
                  {a.status === "Completed" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate("/Member/treatments")}
                        className="px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                        style={{ background: ACCENT }}
                      >
                        <FaSyncAlt className="inline mr-1.5" size={11} />
                        Book Again
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CANCEL MODAL */}
      {cancelModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }}
          onClick={() => setCancelModal(null)}
        >
          <div
            className="animate-fade rounded-3xl p-8 max-w-md w-full mx-4"
            style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#FCE4E4" }}
              >
                <FaBan size={28} style={{ color: "#C0392B" }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: INK }}>Cancel Appointment</h3>
              <p className="text-sm" style={{ color: SAGE }}>
                Are you sure you want to cancel booking <strong>{cancelModal}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelModal(null)}
                className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50"
                style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}
              >
                Keep It
              </button>
              <button
                onClick={() => handleCancel(cancelModal)}
                className="flex-1 py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: "#C0392B" }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
