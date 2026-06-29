import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import pasien from "../../data/pasien.json";
import {
  FaCrown,
  FaGift,
  FaCalendarCheck,
  FaSpa,
  FaClock,
  FaUser,
  FaStar,
  FaGem,
  FaShieldAlt,
  FaHeart,
  FaRegSmile,
  FaChartLine,
  FaMedal,
  FaTrophy,
  FaAward,
} from "react-icons/fa";

// THEME TOKENS
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  // Read tier from localStorage (saved during register or login)
  const memberTier = JSON.parse(localStorage.getItem("memberTier") || "null");
  const currentTier = memberTier?.tier || user?.tier || "Regular";
  // Still use pasien[0] for other patient data (name, email, phone, etc.)
  const patient = pasien[0];

  const [timeLeft, setTimeLeft] = useState("");
  const [currentGreeting, setCurrentGreeting] = useState(() => {
    const h = new Date().getHours();
    return h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening";
  });
  const [toast, setToast] = useState(null);

  const currentHour = new Date().getHours();
  const showFlashSale = currentHour >= 18 && currentHour <= 23;

  const promoByMembership = {
    Regular: [
      { title: "Facial Treatment", discount: "5%", icon: FaSpa },
    ],
    Silver: [
      { title: "Facial Treatment", discount: "10%", icon: FaSpa },
      { title: "Skin Consultation", discount: "15%", icon: FaUser },
    ],
    Gold: [
      { title: "Laser Treatment", discount: "20%", icon: FaGem },
      { title: "Acne Treatment", discount: "25%", icon: FaShieldAlt },
      { title: "Skin Booster", discount: "15%", icon: FaRegSmile },
    ],
    Platinum: [
      { title: "Premium Facial", discount: "50%", icon: FaAward },
      { title: "Skin Booster Package", discount: "40%", icon: FaGift },
      { title: "Free Consultation", discount: "100%", icon: FaHeart },
    ],
  };

  const memberPromos = promoByMembership[currentTier] || promoByMembership["Regular"];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setCurrentGreeting("Good Morning");
    else if (hour < 18) setCurrentGreeting("Good Afternoon");
    else setCurrentGreeting("Good Evening");

    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const diff = end - now;
      if (diff <= 0) { setTimeLeft("Expired"); return; }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // ── Claim promo & redirect ──
  const handleClaimPromo = (promo) => {
    const code = `BEAUTY${(promo.discount || "0").replace("%", "")}`;
    const newPromo = { ...promo, code, claimedAt: new Date().toISOString(), tier: currentTier };
    const existing = JSON.parse(localStorage.getItem("claimedPromos") || "[]");
    localStorage.setItem("claimedPromos", JSON.stringify([...existing, newPromo]));
    showToast(`Promo ${promo.title} diklaim! Kode: ${code} 🎁`);
    setTimeout(() => navigate("/Member/treatments"), 800);
  };

  const getMembershipIcon = () => {
    switch (currentTier) {
      case "Platinum": return <FaCrown color="#E8B44F" />;
      case "Gold": return <FaTrophy color="#E8B44F" />;
      case "Silver": return <FaMedal color="#9CA3AF" />;
      default: return <FaStar color={SAGE} />;
    }
  };

  const getMembershipColor = () => {
    switch (currentTier) {
      case "Platinum": return "from-purple-500 via-pink-500 to-rose-500";
      case "Gold": return "from-yellow-400 via-yellow-500 to-amber-500";
      case "Silver": return "from-gray-300 via-gray-400 to-gray-500";
      default: return "from-pink-400 to-pink-600";
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
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ background: BG_ALT, color: ACCENT }}>
                  <FaCrown size={11} />
                  {currentTier} Member
                </div>
              </div>
              <h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>
                {currentGreeting},{" "}
                <span style={{ color: ACCENT }}>{user.username || "Member"}</span>
              </h1>
            </div>
          }
          breadcrumb={[
            { label: "Member", to: "/Member" },
            { label: "Dashboard" },
          ]}
        >
          <button
            onClick={() => navigate("/Member/appointments")}
            className="px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            style={{ background: ACCENT }}
          >
            <FaCalendarCheck className="inline mr-2" size={13} />
            Book Appointment
          </button>
        </PageHeader>
      </div>

      {/* MEMBERSHIP CARD */}
      <section className="mb-8">
        <div
          className={`rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden bg-gradient-to-br ${getMembershipColor()} cursor-pointer transition-all duration-300 hover:scale-[1.01]`}
          onClick={() => navigate("/Member/benefits")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") navigate("/Member/benefits"); }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-[0.25em] opacity-80">Membership</span>
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Active</span>
              </div>
              <h2 className="text-4xl font-bold flex items-center gap-3 mt-2">
                {getMembershipIcon()}
                {currentTier}
              </h2>
              <div className="mt-4 space-y-1">
                <p className="opacity-90 flex items-center gap-2"><FaUser className="text-sm" /> Patient ID: {patient.patientId}</p>
                <p className="opacity-90 flex items-center gap-2"><FaCalendarCheck className="text-sm" /> Last Visit: {patient.lastVisit}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
              <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl cursor-pointer hover:bg-white/30 transition-all" onClick={(e) => { e.stopPropagation(); navigate("/Member/rewards"); }} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); navigate("/Member/rewards"); } }}>
                <FaGift className="text-2xl" />
                <div>
                  <p className="text-sm opacity-80">Reward Points</p>
                  <p className="text-2xl font-bold">1,250</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        {[
          { icon: FaGift, value: "1,250", label: "Reward Points", color: ACCENT, bar: 75, to: "/Member/rewards" },
          { icon: FaSpa, value: patient.treatmentHistory.split(",").length, label: "Treatments Done", color: ACCENT, to: "/Member/treatments" },
          { icon: FaCalendarCheck, value: "Active", label: "Membership", color: "#2D6A4F", dot: true, to: "/Member/benefits" },
          { icon: FaChartLine, value: currentTier, label: "Beauty Level", color: ACCENT, to: "/Member/profile" },
        ].map(({ icon: Icon, value, label, color, bar, dot, to }, i) => (
          <div
            key={i}
            onClick={() => navigate(to)}
            className="rounded-2xl p-6 bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") navigate(to); }}
            style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: BG_ALT }}>
              <Icon style={{ color }} />
            </div>
            <h3 className="text-2xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>{value}</h3>
            <p className="text-xs mt-1" style={{ color: SAGE }}>{label}</p>
            {bar && <div className="mt-2 w-full h-1 rounded-full" style={{ background: CARD_TINT }}><div className="h-1 rounded-full" style={{ background: ACCENT, width: `${bar}%` }} /></div>}
            {dot && (
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs" style={{ background: "#D4EDDA", color: "#2D6A4F" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#2D6A4F" }} /> Active
              </div>
            )}
          </div>
        ))}
      </section>

      {/* FLASH SALE */}
      {showFlashSale && (
        <section className="mb-8">
          <div className="rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, #ff6b81, ${ACCENT})` }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2"><FaClock className="text-2xl animate-pulse" /><span className="text-xs uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full">Flash Sale</span></div>
                <h2 className="text-3xl font-bold">Premium Facial Package</h2>
                <p className="mt-2 opacity-90">Limited time offer for members</p>
                <h3 className="text-5xl md:text-6xl font-bold mt-4">70% OFF</h3>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm px-8 py-6 rounded-2xl min-w-[200px]">
                <FaClock className="text-4xl mx-auto mb-3 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-bold">{timeLeft}</h3>
                <p className="text-sm opacity-80">Ends Today</p>
                <button onClick={() => { showToast("Promo berhasil diklaim! Kode: FLASH70 🎉"); }} className="mt-4 px-6 py-2 bg-white rounded-full font-semibold hover:scale-105 transition-all active:scale-95" style={{ color: ACCENT }}>
                  Claim Now →
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MEMBER BENEFITS */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>
              Exclusive <span style={{ color: ACCENT }}>Benefits</span>
            </h2>
            <p className="text-sm" style={{ color: SAGE }}>Special perks for {currentTier} members</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {memberPromos.map((promo, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 bg-white transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
              style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl" style={{ color: ACCENT }}><promo.icon /></span>
                <span className="text-xs px-3 py-1 rounded-full" style={{ background: BG_ALT, color: ACCENT }}>{currentTier} Exclusive</span>
              </div>
              <h3 className="font-semibold text-lg" style={{ color: INK }}>{promo.title}</h3>
              <p className="text-4xl font-bold mt-4" style={{ fontFamily: "Fraunces, serif", color: ACCENT }}>{promo.discount}</p>
              <p className="text-sm" style={{ color: SAGE }}>Discount</p>
              <button
                onClick={() => handleClaimPromo(promo)}
                className="mt-5 w-full py-3 rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                style={{ background: ACCENT }}
              >
                Claim & Book
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PROFILE SECTION */}
      <section
        className="rounded-2xl p-8 mb-8"
        style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>
              Member <span style={{ color: ACCENT }}>Profile</span>
            </h2>
            <p className="text-sm" style={{ color: SAGE }}>Your personal information</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { label: "Full Name", value: patient.name },
              { label: "Email Address", value: patient.email },
              { label: "Phone Number", value: patient.phone },
            ].map(({ label, value }) => (
              <div key={label} className="pb-4" style={{ borderBottom: `1px solid ${CARD_TINT}` }}>
                <p className="text-sm" style={{ color: SAGE }}>{label}</p>
                <p className="font-semibold text-lg" style={{ color: INK }}>{value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="pb-4" style={{ borderBottom: `1px solid ${CARD_TINT}` }}>
              <p className="text-sm" style={{ color: SAGE }}>Skin Type</p>
              <p className="font-semibold text-lg" style={{ color: INK }}>{patient.allergiesSkinType}</p>
            </div>
            <div className="pb-4" style={{ borderBottom: `1px solid ${CARD_TINT}` }}>
              <p className="text-sm" style={{ color: SAGE }}>Membership Level</p>
              <div className="flex items-center gap-2 mt-1">
                {getMembershipIcon()}
                <p className="font-semibold text-lg" style={{ color: INK }}>{currentTier}</p>
              </div>
            </div>
            <div className="pb-4" style={{ borderBottom: `1px solid ${CARD_TINT}` }}>
              <p className="text-sm" style={{ color: SAGE }}>Treatment History</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {patient.treatmentHistory.split(",").map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-sm"
                    style={{ background: BG_ALT, color: ACCENT }}
                    onClick={() => { navigate("/Member/treatments"); showToast(`Cari treatment serupa: ${t.trim()} 💆‍♀️`); }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") { navigate("/Member/treatments"); showToast(`Cari treatment serupa: ${t.trim()} 💆‍♀️`); } }}
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
