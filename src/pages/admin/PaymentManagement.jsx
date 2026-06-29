import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  FaMoneyBillWave, FaSearch, FaFilter, FaEye, FaFileInvoiceDollar,
  FaCreditCard, FaClock, FaDollarSign,
  FaTimes, FaDownload, FaCheckCircle, FaShoppingBag,
} from "react-icons/fa";

const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const mockPayments = [
  { id: "INV-001", invoiceNo: "INV-20260401-001", customer: "Citra Lestari", treatment: "Hydrafacial", amount: 550000, method: "Transfer Bank", date: "2026-04-03", status: "Paid" },
  { id: "INV-002", invoiceNo: "INV-20260401-002", customer: "Andi Saputra", treatment: "Acne Treatment", amount: 450000, method: "QRIS", date: "2026-04-01", status: "Paid" },
  { id: "INV-003", invoiceNo: "INV-20260401-003", customer: "Gita Permata", treatment: "Glass Skin Facial", amount: 750000, method: "Cash", date: "2026-04-07", status: "Paid" },
  { id: "INV-004", invoiceNo: "INV-20260401-004", customer: "Dewi Anggraini", treatment: "Laser Rejuvenation", amount: 1200000, method: "Transfer Bank", date: "2026-04-04", status: "Pending" },
  { id: "INV-005", invoiceNo: "INV-20260401-005", customer: "Tina Melati", treatment: "Skin Tightening", amount: 1500000, method: "Credit Card", date: "2026-04-20", status: "Paid" },
  { id: "INV-006", invoiceNo: "INV-20260401-006", customer: "Maya Putri", treatment: "Facial Detox", amount: 650000, method: "QRIS", date: "2026-04-13", status: "Refunded" },
  { id: "INV-007", invoiceNo: "INV-20260401-007", customer: "Budi Santoso", treatment: "Botox Injection", amount: 2500000, method: "Credit Card", date: "2026-04-02", status: "Pending" },
  { id: "INV-008", invoiceNo: "INV-20260401-008", customer: "Intan Sari", treatment: "Whitening Injection", amount: 1800000, method: "Transfer Bank", date: "2026-04-09", status: "Paid" },
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

export default function PaymentManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [payments, setPayments] = useState(() => {
    const shopOrders = JSON.parse(localStorage.getItem("shopOrders") || "[]");
    return [...shopOrders, ...mockPayments];
  });
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [viewModal, setViewModal] = useState(null);
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const statuses = ["All", "Paid", "Pending", "Refunded"];
  const totalRevenue = payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === "Pending").reduce((s, p) => s + p.amount, 0);

  const filtered = payments.filter((p) => {
    const matchesSearch = p.customer.toLowerCase().includes(search.toLowerCase()) || p.invoiceNo.toLowerCase().includes(search.toLowerCase()) || (p.treatment || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    const matchesSource = sourceFilter === "All" || p.source === sourceFilter || (sourceFilter === "Treatment" && p.source !== "shop");
    const matchesDate = (!dateFrom || p.date >= dateFrom) && (!dateTo || p.date <= dateTo);
    return matchesSearch && matchesStatus && matchesSource && matchesDate;
  });

  const markAsPaid = (p) => {
    const updated = { ...p, status: "Paid" };
    setPayments((prev) => prev.map((x) => x.id === p.id ? updated : x));
    if (p.source === "shop") {
      const shopOrders = JSON.parse(localStorage.getItem("shopOrders") || "[]");
      localStorage.setItem("shopOrders", JSON.stringify(shopOrders.map((o) => o.id === p.id ? updated : o)));
    }
    showToast(`Invoice ${p.invoiceNo} ditandai Paid! ✅`);
  };

  const printInvoice = (p) => {
    const w = window.open("", "_blank", "width=800,height=900");
    if (!w) { showToast("Pop-up diblokir! Izinkan pop-up untuk cetak invoice."); return; }
    const st = statusStyle(p.status);
    w.document.write(`
      <html><head><title>Invoice ${p.invoiceNo}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Inter',sans-serif; color:#2E2228; padding:40px; max-width:700px; margin:auto; }
        .header { text-align:center; border-bottom:2px solid #B85C7A; padding-bottom:20px; margin-bottom:24px; }
        .header h1 { font-size:28px; color:#B85C7A; }
        .header p { font-size:13px; color:#A9748C; margin-top:4px; }
        .amount { text-align:center; background:#FDF6F8; padding:20px; border-radius:16px; margin-bottom:24px; }
        .amount h2 { font-size:32px; color:#B85C7A; }
        .row { display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #F1D3DD; font-size:14px; }
        .row .label { color:#A9748C; }
        .row .val { font-weight:600; }
        .status { display:inline-block; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:700; }
        .footer { text-align:center; margin-top:32px; font-size:12px; color:#A9748C; }
        @media print { body { padding:20px; } }
      </style></head>
      <body>
        <div class="header">
          <h1>BeautyCare Clinic</h1>
          <p>Elegant Beauty Clinic · Jl. Kecantikan No. 123, Jakarta</p>
          <p style="margin-top:8px;font-weight:600;">INVOICE</p>
        </div>
        <div class="amount"><h2>${formatRp(p.amount)}</h2></div>
        <div class="row"><span class="label">Invoice Number</span><span class="val">${p.invoiceNo}</span></div>
        <div class="row"><span class="label">Customer</span><span class="val">${p.customer}</span></div>
        <div class="row"><span class="label">Description</span><span class="val">${p.treatment}</span></div>
        <div class="row"><span class="label">Payment Method</span><span class="val">${p.method}</span></div>
        <div class="row"><span class="label">Date</span><span class="val">${p.date}</span></div>
        <div class="row"><span class="label">Status</span><span class="val"><span class="status" style="background:${st.bg};color:${st.color}">${p.status}</span></span></div>
        <div class="footer"><p>Terima kasih telah menggunakan BeautyCare Clinic</p><p>info@beautycare.id · +62 21 1234 5678</p></div>
        <script>window.onload=function(){window.print();setTimeout(function(){window.close();},500);};</script>
      </body></html>
    `);
    w.document.close();
  };

  const formatRp = (n) => "Rp " + n.toLocaleString("id-ID");

  const statusStyle = (s) => {
    switch (s) {
      case "Paid": return { bg: "#D4EDDA", color: "#2D6A4F" };
      case "Pending": return { bg: "#FFF3E0", color: AMBER };
      case "Refunded": return { bg: "#FDECEC", color: "#D32F2F" };
      default: return { bg: BG, color: SAGE };
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
      {toast && (<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] animate-toast px-6 py-3.5 rounded-full text-white text-sm font-medium shadow-xl" style={{ background: INK }}>{toast}</div>)}

      <div className="rounded-[2rem] p-8 mb-6" style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
        <PageHeader title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Payment Management</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Transactions & Invoices</h1></div>} breadcrumb={[{ label: "Dashboard", to: "/Dashboard" }, { label: "Payments" }]} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[{ icon: FaFileInvoiceDollar, value: payments.length, label: "Total Invoices", color: ACCENT },
          { icon: FaDollarSign, value: formatRp(totalRevenue), label: "Total Revenue", color: "#2D6A4F" },
          { icon: FaClock, value: formatRp(pendingAmount), label: "Pending", color: AMBER },
          { icon: FaCreditCard, value: [...new Set(payments.map(p => p.method))].length, label: "Payment Methods", color: SAGE },
        ].map(({ icon: Icon, value, label, color }) => (
          <div key={label} className="rounded-2xl p-5 bg-white" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
            <Icon className="text-xl mb-2" style={{ color }} />
            <h3 className="text-lg font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>{value}</h3>
            <p className="text-xs mt-1" style={{ color: SAGE }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[2rem] p-8" style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2" size={14} style={{ color: SAGE }} />
            <input type="text" placeholder="Cari invoice, customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-full outline-none text-sm bg-white transition-all focus:ring-2" style={{ border: "1px solid #E7D6DD", "--tw-ring-color": ACCENT }} />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <FaFilter size={13} style={{ color: SAGE }} className="flex-shrink-0" />
            {statuses.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap" style={{ background: statusFilter === s ? ACCENT : "white", color: statusFilter === s ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}>{s}</button>
            ))}
            <span className="mx-1" style={{ color: CARD_TINT }}>|</span>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="px-3 py-2 rounded-full text-xs outline-none bg-white transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, width: 130 }} title="Dari tanggal" />
            <span style={{ color: SAGE, fontSize: 11 }}>→</span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="px-3 py-2 rounded-full text-xs outline-none bg-white transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, width: 130 }} title="Sampai tanggal" />
            {(dateFrom || dateTo) && (
              <button onClick={() => { setDateFrom(""); setDateTo(""); }} className="px-3 py-2 rounded-full text-xs font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: "#D32F2F" }}><FaTimes size={9} className="mr-1 inline" />Reset</button>
            )}
            <span className="mx-1" style={{ color: CARD_TINT }}>|</span>
            {["All","Shop","Treatment"].map((s) => (
              <button key={s} onClick={() => setSourceFilter(s)} className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap" style={{ background: sourceFilter === s ? ACCENT : "white", color: sourceFilter === s ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}>
                {s === "Shop" ? <><FaShoppingBag className="inline mr-1" size={9} />Shop</> : s === "Treatment" ? "Treatment" : "All"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${CARD_TINT}` }}>
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr style={{ background: BG_ALT }}>
                {["Invoice #","Customer","Treatment","Amount","Method","Date","Status","Actions"].map(h => (
                  <th key={h} className="p-4 text-xs font-semibold uppercase tracking-[0.12em] text-left" style={{ color: SAGE }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const st = statusStyle(p.status);
                return (
                  <tr key={p.id} className="border-b transition-all duration-200 hover:bg-white" style={{ borderColor: CARD_TINT }}>
                    <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: BG_ALT, color: ACCENT }}>{p.invoiceNo}</span></td>
                    <td className="p-4 text-sm font-semibold" style={{ color: INK }}>{p.customer}</td>
                    <td className="p-4 text-sm max-w-[200px] truncate" style={{ color: INK }}>
                      {p.source === "shop" && <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold mr-1.5" style={{ background: BG_ALT, color: ACCENT }}><FaShoppingBag size={8} />Shop</span>}
                      {p.treatment}
                    </td>
                    <td className="p-4 text-sm font-bold" style={{ color: ACCENT }}>{formatRp(p.amount)}</td>
                    <td className="p-4 text-xs" style={{ color: SAGE }}>{p.method}</td>
                    <td className="p-4 text-xs" style={{ color: SAGE }}>{p.date}</td>
                    <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: st.bg, color: st.color }}>{p.status}</span></td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setViewModal(p)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ color: ACCENT, border: `1px solid ${CARD_TINT}` }} title="View Invoice"><FaEye size={13} /></button>
                        {p.status === "Pending" && (
                          <button onClick={() => markAsPaid(p)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-green-50" style={{ color: "#2D6A4F", border: `1px solid ${CARD_TINT}` }} title="Mark as Paid"><FaCheckCircle size={13} /></button>
                        )}
                        <button onClick={() => printInvoice(p)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ color: SAGE, border: `1px solid ${CARD_TINT}` }} title="Download PDF"><FaDownload size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs" style={{ color: SAGE }}>Menampilkan {filtered.length} dari {payments.length} transaksi</div>
      </div>

      {/* VIEW MODAL */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setViewModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-lg w-full" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Invoice Detail</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>{viewModal.invoiceNo}</h3></div>
              <button onClick={() => setViewModal(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl text-center" style={{ background: BG }}>
                <FaFileInvoiceDollar size={32} style={{ color: ACCENT }} className="mx-auto mb-2" />
                <h2 className="text-2xl font-bold" style={{ color: ACCENT }}>{formatRp(viewModal.amount)}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{l:"Customer",v:viewModal.customer},{l:"Treatment",v:viewModal.treatment},{l:"Payment Method",v:viewModal.method},{l:"Date",v:viewModal.date}].map(({l,v})=>(
                  <div key={l}><p className="text-xs font-medium mb-0.5" style={{color:SAGE}}>{l}</p><p className="text-sm font-semibold" style={{color:INK}}>{v}</p></div>
                ))}
                <div className="col-span-2"><p className="text-xs font-medium mb-0.5" style={{color:SAGE}}>Status</p><span className="px-3 py-1 rounded-full text-xs font-bold" style={{background:statusStyle(viewModal.status).bg,color:statusStyle(viewModal.status).color}}>{viewModal.status}</span></div>
              </div>
              <RippleButton onClick={() => { printInvoice(viewModal); setViewModal(null); }} className="w-full py-3 rounded-full text-sm"><FaDownload className="inline mr-1.5" size={12} />Print Invoice PDF</RippleButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
