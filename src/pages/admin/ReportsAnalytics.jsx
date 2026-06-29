import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  FaChartBar, FaChartPie, FaChartLine, FaDownload, FaCalendarCheck,
  FaDollarSign, FaUsers, FaBox, FaSpa,
} from "react-icons/fa";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const monthlyRevenue = [
  { name: "Jan", value: 45 }, { name: "Feb", value: 38 }, { name: "Mar", value: 52 },
  { name: "Apr", value: 48 }, { name: "May", value: 55 }, { name: "Jun", value: 62 },
];

const treatmentPopularity = [
  { name: "Hydrafacial", value: 128 }, { name: "Acne Treatment", value: 95 },
  { name: "Laser", value: 82 }, { name: "Facial", value: 74 }, { name: "Botox", value: 45 },
];

const customerGrowth = [
  { name: "Jan", value: 120 }, { name: "Feb", value: 145 }, { name: "Mar", value: 168 },
  { name: "Apr", value: 190 }, { name: "May", value: 215 }, { name: "Jun", value: 245 },
];

const revenueByCategory = [
  { name: "Facial", value: 35 }, { name: "Treatment", value: 25 },
  { name: "Injectable", value: 20 }, { name: "Laser", value: 15 }, { name: "Product", value: 5 },
];

const COLORS = [ACCENT, AMBER, SAGE, "#E8B44F", "#9CA3AF"];

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

export default function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState({ from: "2026-01", to: "2026-06" });
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleExportCSV = (type) => {
    let csv = "";
    let filename = "";
    if (type === "revenue") {
      csv = "Month,Revenue (Rp M)\n" + monthlyRevenue.map(r => `${r.name},${r.value}`).join("\n");
      filename = "monthly-revenue.csv";
    } else if (type === "customers") {
      csv = "Month,Customers\n" + customerGrowth.map(r => `${r.name},${r.value}`).join("\n");
      filename = "customer-growth.csv";
    } else if (type === "treatments") {
      csv = "Treatment,Bookings\n" + treatmentPopularity.map(r => `${r.name},${r.value}`).join("\n");
      filename = "treatment-popularity.csv";
    } else {
      csv = "Category,Revenue (%)\n" + revenueByCategory.map(r => `${r.name},${r.value}`).join("\n");
      filename = "revenue-by-category.csv";
    }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    showToast(`${filename} berhasil di-export! 📥`);
  };

  const handleExportPDF = () => {
    window.print();
    showToast("Mencetak laporan ke PDF... 📄");
  };

  const filteredMonthlyRevenue = monthlyRevenue.filter(r => {
    const idx = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].indexOf(r.name);
    const monthNum = idx + 1;
    const [fromY, fromM] = (dateRange.from || "2026-01").split("-").map(Number);
    const [toY, toM] = (dateRange.to || "2026-06").split("-").map(Number);
    return (fromY * 12 + fromM) <= (2026 * 12 + monthNum) && (2026 * 12 + monthNum) <= (toY * 12 + toM);
  });

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes ripple { to { transform: scale(8); opacity: 0; } }
        @keyframes toast-in { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-ripple { animation: ripple 0.6s ease-out forwards; }
        .animate-toast { animation: toast-in 0.3s ease-out; }
      `}</style>
      {toast && (<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] animate-toast px-6 py-3.5 rounded-full text-white text-sm font-medium shadow-xl" style={{ background: INK }}>{toast}</div>)}

      <div className="rounded-[2rem] p-8 mb-6" style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
        <PageHeader title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Reports & Analytics</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Business Performance</h1></div>} breadcrumb={[{ label: "Dashboard", to: "/Dashboard" }, { label: "Reports" }]}>
          <div className="flex gap-2">
            <RippleButton onClick={handleExportPDF} className="px-5 py-2.5 rounded-full text-sm"><FaDownload className="inline mr-1.5" size={12} />Export PDF</RippleButton>
            <button onClick={() => handleExportCSV("revenue")} className="px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaDownload className="inline mr-1.5" size={12} />Export CSV</button>
          </div>
        </PageHeader>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[{ icon: FaDollarSign, value: "Rp 62M", label: "Revenue This Month", color: ACCENT, sub: "+12% vs last month" },
          { icon: FaUsers, value: "245", label: "Total Customers", color: AMBER, sub: "+28 new this month" },
          { icon: FaSpa, value: "128", label: "Treatments Done", color: "#2D6A4F", sub: "95% satisfaction rate" },
          { icon: FaBox, value: "Rp 18M", label: "Product Sales", color: SAGE, sub: "+8% vs last month" },
        ].map(({ icon: Icon, value, label, color, sub }) => (
          <div key={label} className="rounded-2xl p-5 bg-white" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
            <Icon className="text-xl mb-2" style={{ color }} />
            <h3 className="text-2xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>{value}</h3>
            <p className="text-xs mt-1" style={{ color: SAGE }}>{label}</p>
            <p className="text-xs mt-1 font-medium" style={{ color }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* DATE FILTER */}
      <div className="rounded-2xl p-5 bg-white mb-6 flex items-center gap-4 flex-wrap" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
        <FaCalendarCheck style={{ color: ACCENT }} size={18} />
        <span className="text-sm font-semibold" style={{ color: INK }}>Periode:</span>
        <input type="month" value={dateRange.from} onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))} className="px-4 py-2.5 rounded-full outline-none text-sm bg-white transition-all focus:ring-2" style={{ border: "1px solid #E7D6DD", "--tw-ring-color": ACCENT, color: INK }} />
        <span className="text-sm" style={{ color: SAGE }}>sampai</span>
        <input type="month" value={dateRange.to} onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))} className="px-4 py-2.5 rounded-full outline-none text-sm bg-white transition-all focus:ring-2" style={{ border: "1px solid #E7D6DD", "--tw-ring-color": ACCENT, color: INK }} />
        <button onClick={() => setDateRange({ from: "2026-01", to: "2026-06" })} className="px-4 py-2.5 rounded-full text-xs font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>Reset</button>
        <span className="text-xs ml-auto" style={{ color: SAGE }}>Menampilkan {filteredMonthlyRevenue.length} bulan</span>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Monthly Revenue */}
        <div className="rounded-2xl p-6 bg-white" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
          <div className="flex items-center gap-2 mb-4"><FaChartBar style={{ color: ACCENT }} /><h3 className="font-semibold" style={{ color: INK }}>Monthly Revenue (Rp Juta)</h3></div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={filteredMonthlyRevenue}><CartesianGrid vertical={false} stroke={CARD_TINT} strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fill: SAGE, fontSize: 11 }} axisLine={{ stroke: CARD_TINT }} tickLine={false} /><YAxis tick={{ fill: SAGE, fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${CARD_TINT}`, fontSize: 12 }} formatter={(val) => [`Rp ${val}M`, "Revenue"]} /><Bar dataKey="value" fill={ACCENT} radius={[8,8,0,0]} /></BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Growth */}
        <div className="rounded-2xl p-6 bg-white" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
          <div className="flex items-center gap-2 mb-4"><FaChartLine style={{ color: AMBER }} /><h3 className="font-semibold" style={{ color: INK }}>Customer Growth</h3></div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={customerGrowth}><CartesianGrid vertical={false} stroke={CARD_TINT} strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fill: SAGE, fontSize: 11 }} axisLine={{ stroke: CARD_TINT }} tickLine={false} /><YAxis tick={{ fill: SAGE, fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${CARD_TINT}`, fontSize: 12 }} /><Line type="monotone" dataKey="value" stroke={ACCENT} strokeWidth={3} dot={{ fill: ACCENT, r: 4 }} /></LineChart>
          </ResponsiveContainer>
        </div>

        {/* Treatment Popularity */}
        <div className="rounded-2xl p-6 bg-white" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
          <div className="flex items-center gap-2 mb-4"><FaSpa style={{ color: SAGE }} /><h3 className="font-semibold" style={{ color: INK }}>Most Popular Treatments</h3></div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={treatmentPopularity}><CartesianGrid horizontal={false} stroke={CARD_TINT} strokeDasharray="3 3" /><XAxis type="number" tick={{ fill: SAGE, fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis type="category" dataKey="name" tick={{ fill: SAGE, fontSize: 11 }} axisLine={false} tickLine={false} width={90} /><Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${CARD_TINT}`, fontSize: 12 }} /><Bar dataKey="value" fill={ACCENT} radius={[0,8,8,0]} /></BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Category */}
        <div className="rounded-2xl p-6 bg-white" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
          <div className="flex items-center gap-2 mb-4"><FaChartPie style={{ color: ACCENT }} /><h3 className="font-semibold" style={{ color: INK }}>Revenue by Category</h3></div>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="60%" height={200}>
              <PieChart><Pie data={revenueByCategory} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={4}>{revenueByCategory.map((_, i) => (<Cell key={i} fill={COLORS[i]} />))}</Pie></PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {revenueByCategory.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} /><span style={{ color: SAGE }}>{item.name}</span><span className="font-semibold" style={{ color: INK }}>{item.value}%</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QUICK REPORT BUTTONS */}
      <div className="rounded-[2rem] p-8" style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
        <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "Fraunces, serif", color: INK }}>Quick Reports</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: FaCalendarCheck, label: "Daily Report", desc: "Ringkasan booking & revenue hari ini", action: () => handleExportCSV("revenue") },
            { icon: FaUsers, label: "Customer Report", desc: "Analisis pertumbuhan pelanggan", action: () => handleExportCSV("customers") },
            { icon: FaSpa, label: "Treatment Report", desc: "Treatment terlaris & revenue per kategori", action: () => handleExportCSV("treatments") },
            { icon: FaDollarSign, label: "Financial Report", desc: "Laporan keuangan bulanan lengkap", action: () => handleExportCSV("categories") },
          ].map(({ icon: Icon, label, desc, action }) => (
            <div key={label} className="rounded-2xl p-5 bg-white text-center cursor-pointer transition-all hover:-translate-y-1" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }} onClick={action}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: BG_ALT }}><Icon size={20} style={{ color: ACCENT }} /></div>
              <h3 className="font-semibold text-sm" style={{ color: INK }}>{label}</h3>
              <p className="text-xs mt-1" style={{ color: SAGE }}>{desc}</p>
              <button className="mt-3 text-xs font-medium transition-colors hover:opacity-70" style={{ color: ACCENT }}><FaDownload className="inline mr-1" size={9} />Generate</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
