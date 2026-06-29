import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import bookingData from "../data/booking.json";
import pasienData from "../data/pasien.json";

import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import {
  FaShoppingCart,
  FaTruck,
  FaTimesCircle,
  FaDollarSign,
  FaUsers,
  FaCalendarCheck,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";

// THEME TOKENS — matches GuestDashboard.jsx
const ACCENT = "#B85C7A"; // deep dusty rose
const INK = "#2E2228";
const SAGE = "#A9748C"; // muted mauve
const AMBER = "#8C4A63"; // deeper berry-rose
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState("today");
  const pieData = [
    { name: "Facial Treatment", value: 81 },
    { name: "Skin Consultation", value: 22 },
    { name: "Beauty Revenue", value: 62 },
  ];

  const lineData = [
    { name: "Sunday", value: 100 },
    { name: "Monday", value: 200 },
    { name: "Tuesday", value: 350 },
    { name: "Wednesday", value: 200 },
    { name: "Thursday", value: 150 },
    { name: "Friday", value: 250 },
    { name: "Saturday", value: 400 },
  ];

  const overviewData = [
    { name: "New Patient", value: 45, fill: ACCENT },
    { name: "In Treatment", value: 30, fill: SAGE },
    { name: "Recovered", value: 25, fill: CARD_TINT },
  ];

  const treatmentData = [
    { name: "Rhinoplasty", value: 45, fill: ACCENT },
    { name: "Rhytidectomy", value: 35, fill: SAGE },
    { name: "Blepharoplasty", value: 20, fill: CARD_TINT },
  ];

  // NEW: revenue by treatment — common widget on a clinic admin dashboard
  const revenueData = [
    { name: "Facial", value: 42 },
    { name: "Laser", value: 35 },
    { name: "Consult", value: 18 },
    { name: "Filler", value: 27 },
    { name: "Peeling", value: 14 },
  ];

  const COLORS = [ACCENT, SAGE, CARD_TINT];

  const cards = [
    {
      icon: FaShoppingCart,
      value: "300",
      label: "Beauty Orders",
      to: "/booking",
    },
    {
      icon: FaTruck,
      value: "196",
      label: "Treatment Completed",
      to: "/booking",
    },
    {
      icon: FaTimesCircle,
      value: "50",
      label: "Canceled Booking",
      to: "/booking",
    },
    {
      icon: FaDollarSign,
      value: "Rp.140",
      label: "Clinic Revenue",
      to: "/booking",
    },
    {
      icon: FaUsers,
      value: "320",
      label: "Beauty Patients",
      to: "/pasien",
    },
  ];

  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleSaveReport = () => {
    showToast("Report berhasil di-download! \uD83D\uDCC4");
  };

  const timeData = {
    today: { lineData, revenueData },
    week: {
      lineData: [
        { name: "W1", value: 800 }, { name: "W2", value: 1200 }, { name: "W3", value: 950 }, { name: "W4", value: 1400 },
      ],
      revenueData: [
        { name: "Facial", value: 320 }, { name: "Laser", value: 280 }, { name: "Consult", value: 150 }, { name: "Filler", value: 210 }, { name: "Peeling", value: 98 },
      ],
    },
    month: {
      lineData: [
        { name: "Jan", value: 3200 }, { name: "Feb", value: 2800 }, { name: "Mar", value: 4100 }, { name: "Apr", value: 3800 }, { name: "May", value: 4500 }, { name: "Jun", value: 5100 },
      ],
      revenueData: [
        { name: "Facial", value: 1250 }, { name: "Laser", value: 980 }, { name: "Consult", value: 620 }, { name: "Filler", value: 840 }, { name: "Peeling", value: 410 },
      ],
    },
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ background: BG, fontFamily: "Inter, sans-serif", color: INK }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes toast-in {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-toast { animation: toast-in 0.3s ease-out; }
      `}</style>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] animate-toast px-6 py-3.5 rounded-full text-white text-sm font-medium shadow-xl" style={{ background: INK }}>
          {toast}
        </div>
      )}

      {/* <Sidebar /> */}

      <div className="flex-1">
        {/* <Header /> */}

        <div className="p-6 md:p-8">
          <PageHeader />

          <p
            className="text-xs font-medium tracking-[0.2em] uppercase mt-6 mb-1"
            style={{ color: SAGE }}
          >
            Ringkasan klinik
          </p>
          <h1
            className="text-2xl md:text-3xl font-semibold mb-6"
            style={{ fontFamily: "Fraunces, serif", color: INK }}
          >
            Performa hari ini
          </h1>

          {/* CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cards.map(({ icon: Icon, value, label, to }) => (
              <div
                key={label}
                onClick={() => navigate(to)}
                className="p-4 rounded-2xl flex items-center gap-4 bg-white transition-transform hover:-translate-y-0.5 cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") navigate(to); }}
                style={{
                  boxShadow: "0 1px 3px rgba(46,34,40,0.06)",
                  border: `1px solid ${CARD_TINT}`,
                }}
              >
                <div
                  className="p-3 rounded-full"
                  style={{ background: BG_ALT }}
                >
                  <Icon style={{ color: ACCENT }} />
                </div>
                <div>
                  <h2
                    className="font-semibold text-lg"
                    style={{ fontFamily: "Fraunces, serif", color: INK }}
                  >
                    {value}
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: SAGE }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CHART SECTION */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* PIE CHART */}
            <div
              className="p-5 rounded-2xl bg-white"
              style={{
                boxShadow: "0 1px 3px rgba(46,34,40,0.06)",
                border: `1px solid ${CARD_TINT}`,
              }}
            >
              <h2
                className="font-semibold"
                style={{ fontFamily: "Fraunces, serif", color: INK }}
              >
                Beauty Service Chart
              </h2>

              <div className="flex justify-around mt-2">
                {pieData.map((entry, index) => (
                  <div key={index} className="text-center">
                    <PieChart width={120} height={120}>
                      <Pie
                        data={[entry]}
                        dataKey="value"
                        innerRadius={30}
                        outerRadius={50}
                        fill={COLORS[index]}
                      />
                    </PieChart>
                    <p
                      className="text-sm mt-2 font-semibold"
                      style={{ color: ACCENT }}
                    >
                      {entry.value}%
                    </p>
                    <p className="text-xs" style={{ color: SAGE }}>
                      {entry.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* LINE CHART */}
            <div
              className="p-5 rounded-2xl bg-white"
              style={{
                boxShadow: "0 1px 3px rgba(46,34,40,0.06)",
                border: `1px solid ${CARD_TINT}`,
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2
                    className="font-semibold"
                    style={{ fontFamily: "Fraunces, serif", color: INK }}
                  >
                    Patient Visit Trend
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: SAGE }}>
                    Weekly beauty clinic performance
                  </p>
                </div>

                <button
                  onClick={handleSaveReport}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:opacity-80 active:scale-95"
                  style={{
                    border: `1px solid ${CARD_TINT}`,
                    color: AMBER,
                  }}
                >
                  Save Report
                </button>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={timeData[timeFilter].lineData}>
                  <XAxis dataKey="name" tick={{ fill: SAGE, fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: `1px solid ${CARD_TINT}`,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={ACCENT}
                    strokeWidth={3}
                    dot={{ fill: ACCENT, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Patient Overview */}
            <div
              className="p-6 rounded-2xl bg-white"
              style={{
                boxShadow: "0 1px 3px rgba(46,34,40,0.06)",
                border: `1px solid ${CARD_TINT}`,
              }}
            >
              <div className="flex justify-between mb-4">
                <h2
                  className="font-semibold"
                  style={{ fontFamily: "Fraunces, serif", color: INK }}
                >
                  Patient Overview
                </h2>
                <button
                  onClick={() => setTimeFilter("month")}
                  className="text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:opacity-80 active:scale-95"
                  style={{ background: timeFilter === "month" ? ACCENT : BG_ALT, color: timeFilter === "month" ? "#fff" : AMBER }}
                >
                  Monthly
                </button>
              </div>

              <div className="flex justify-center">
                <RadialBarChart
                  width={200}
                  height={200}
                  innerRadius="30%"
                  outerRadius="100%"
                  data={overviewData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    tick={false}
                  />
                  <RadialBar dataKey="value" cornerRadius={20} />
                </RadialBarChart>
              </div>

              <div className="mt-2">
                <p className="text-sm" style={{ color: SAGE }}>
                  Total Patient
                </p>
                <h2
                  className="text-xl font-semibold"
                  style={{ fontFamily: "Fraunces, serif", color: INK }}
                >
                  3,245
                </h2>
              </div>
            </div>

            {/* patient by treatment */}
            <div
              className="p-6 rounded-2xl bg-white"
              style={{
                boxShadow: "0 1px 3px rgba(46,34,40,0.06)",
                border: `1px solid ${CARD_TINT}`,
              }}
            >
              <div className="flex justify-between mb-4">
                <h2
                  className="font-semibold"
                  style={{ fontFamily: "Fraunces, serif", color: INK }}
                >
                  Patient by Treatment
                </h2>
                <button
                  onClick={() => setTimeFilter("today")}
                  className="text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:opacity-80 active:scale-95"
                  style={{ background: timeFilter === "today" ? ACCENT : BG_ALT, color: timeFilter === "today" ? "#fff" : AMBER }}
                >
                  Today
                </button>
              </div>

              <div className="flex justify-center">
                <RadialBarChart
                  width={200}
                  height={200}
                  innerRadius="40%"
                  outerRadius="100%"
                  data={treatmentData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    tick={false}
                  />
                  <RadialBar dataKey="value" cornerRadius={20} />
                </RadialBarChart>
              </div>

              <div className="mt-4 space-y-2">
                {treatmentData.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span style={{ color: SAGE }}>{item.name}</span>
                    <span className="font-medium" style={{ color: INK }}>
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* NEW: Revenue by Treatment — bar chart */}
            <div
              className="p-5 rounded-2xl bg-white md:col-span-2"
              style={{
                boxShadow: "0 1px 3px rgba(46,34,40,0.06)",
                border: `1px solid ${CARD_TINT}`,
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2
                    className="font-semibold"
                    style={{ fontFamily: "Fraunces, serif", color: INK }}
                  >
                    Revenue by Treatment
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: SAGE }}>
                    Kontribusi pendapatan per jenis perawatan (juta Rp)
                  </p>
                </div>
                <button
                  onClick={() => setTimeFilter("month")}
                  className="text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:opacity-80 active:scale-95"
                  style={{ background: timeFilter === "month" ? ACCENT : BG_ALT, color: timeFilter === "month" ? "#fff" : AMBER }}
                >
                  This Month
                </button>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={timeData[timeFilter].revenueData}>
                  <CartesianGrid
                    vertical={false}
                    stroke={CARD_TINT}
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: SAGE, fontSize: 11 }}
                    axisLine={{ stroke: CARD_TINT }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: SAGE, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: `1px solid ${CARD_TINT}`,
                      fontSize: 12,
                    }}
                    formatter={(val) => [`Rp ${val} jt`, "Revenue"]}
                  />
                  <Bar dataKey="value" fill={ACCENT} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Recent Bookings */}
            <div
              className="p-6 rounded-2xl bg-white"
              style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Recent Bookings</h2>
                  <p className="text-xs mt-0.5" style={{ color: SAGE }}>5 booking terbaru</p>
                </div>
                <Link to="/booking" className="text-xs font-medium flex items-center gap-1 transition-colors hover:opacity-70" style={{ color: ACCENT }}>
                  Lihat semua <FaArrowRight size={10} />
                </Link>
              </div>
              <div className="space-y-0">
                {bookingData.slice(0, 5).map((b, i) => (
                  <Link
                    key={b.bookingId}
                    to={`/Booking/${b.bookingId}`}
                    className="flex items-center justify-between py-3 transition-colors hover:bg-stone-50 rounded-xl px-3 -mx-3"
                    style={{ borderBottom: i < 4 ? `1px solid ${CARD_TINT}` : "none" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: BG_ALT }}>
                        <FaCalendarCheck size={13} style={{ color: ACCENT }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: INK }}>{b.patientName}</p>
                        <p className="text-xs" style={{ color: SAGE }}>{b.treatmentType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{
                        background: b.status === "Completed" ? "#D4EDDA" : b.status === "Cancelled" ? "#FDECEC" : b.status === "Scheduled" ? BG_ALT : "#FFF3E0",
                        color: b.status === "Completed" ? "#2D6A4F" : b.status === "Cancelled" ? "#D32F2F" : b.status === "Scheduled" ? ACCENT : AMBER
                      }}>{b.status}</span>
                      <p className="text-xs mt-1" style={{ color: SAGE }}>{b.dateTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Patients */}
            <div
              className="p-6 rounded-2xl bg-white"
              style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Recent Patients</h2>
                  <p className="text-xs mt-0.5" style={{ color: SAGE }}>5 pasien terbaru</p>
                </div>
                <Link to="/pasien" className="text-xs font-medium flex items-center gap-1 transition-colors hover:opacity-70" style={{ color: ACCENT }}>
                  Lihat semua <FaArrowRight size={10} />
                </Link>
              </div>
              <div className="space-y-0">
                {pasienData.slice(0, 5).map((p, i) => (
                  <Link
                    key={p.patientId}
                    to={`/Pasien/${p.patientId}`}
                    className="flex items-center justify-between py-3 transition-colors hover:bg-stone-50 rounded-xl px-3 -mx-3"
                    style={{ borderBottom: i < 4 ? `1px solid ${CARD_TINT}` : "none" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${ACCENT}, ${AMBER})`, color: "#fff" }}
                      >
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: INK }}>{p.name}</p>
                        <p className="text-xs" style={{ color: SAGE }}>{p.age} thn · {p.gender}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{
                        background: p.membershipStatus === "Platinum" ? BG_ALT : p.membershipStatus === "Gold" ? "#FFF8E1" : p.membershipStatus === "Silver" ? "#F0F0F0" : BG,
                        color: p.membershipStatus === "Platinum" ? ACCENT : p.membershipStatus === "Gold" ? AMBER : p.membershipStatus === "Silver" ? "#6B7280" : SAGE
                      }}>{p.membershipStatus}</span>
                      <p className="text-xs mt-1 flex items-center gap-1 justify-end" style={{ color: SAGE }}>
                        <FaClock size={9} /> {p.lastVisit}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;