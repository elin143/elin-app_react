import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import {
  FaCrown,
  FaGift,
  FaSpa,
  FaGem,
  FaShieldAlt,
  FaHeart,
  FaAward,
  FaStar,
  FaMedal,
  FaTrophy,
  FaUser,
  FaTags,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";

// THEME TOKENS
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const allBenefits = {
  Silver: {
    color: "from-gray-300 via-gray-400 to-gray-500",
    icon: FaMedal,
    acc: "#9CA3AF",
    promos: [
      { title: "Facial Treatment", discount: "10%", icon: FaSpa },
      { title: "Skin Consultation", discount: "15%", icon: FaUser },
    ],
    perks: [
      "Basic priority booking",
      "Monthly newsletter",
      "Birthday discount 10%",
      "Free parking",
    ],
    nextTier: "Gold",
  },
  Gold: {
    color: "from-yellow-400 via-yellow-500 to-amber-500",
    icon: FaTrophy,
    acc: "#E8B44F",
    promos: [
      { title: "Laser Treatment", discount: "20%", icon: FaGem },
      { title: "Acne Treatment", discount: "25%", icon: FaShieldAlt },
      { title: "Skin Booster", discount: "15%", icon: FaSpa },
    ],
    perks: [
      "Priority booking + queue skip",
      "Free annual skin check",
      "Exclusive member events",
      "Birthday gift package",
      "Free parking VIP",
      "Monthly newsletter premium",
    ],
    nextTier: "Platinum",
  },
  Platinum: {
    color: "from-purple-500 via-pink-500 to-rose-500",
    icon: FaCrown,
    acc: "#E8B44F",
    promos: [
      { title: "Premium Facial", discount: "50%", icon: FaAward },
      { title: "Skin Booster Package", discount: "40%", icon: FaGift },
      { title: "Free Consultation", discount: "100%", icon: FaHeart },
    ],
    perks: [
      "VIP concierge service 24/7",
      "All-inclusive annual checkup",
      "Unlimited priority booking",
      "Exclusive Platinum events",
      "Luxury birthday experience",
      "Personal beauty advisor",
      "Free parking VIP",
      "Monthly newsletter platinum",
      "Partner shop discounts",
    ],
    nextTier: null,
  },
  Regular: {
    color: "from-pink-400 to-pink-600",
    icon: FaStar,
    acc: SAGE,
    promos: [
      { title: "Welcome Facial", discount: "5%", icon: FaSpa },
    ],
    perks: [
      "Standard booking",
      "Monthly newsletter",
    ],
    nextTier: "Silver",
  },
};

export default function Benefits() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const memberTier = JSON.parse(localStorage.getItem("memberTier") || "null");
  const tier = memberTier?.tier || user?.tier || "Regular";
  const ben = allBenefits[tier] || allBenefits.Regular;
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("my");
  const [claimedPromos, setClaimedPromos] = useState(() => JSON.parse(localStorage.getItem("claimedPromos") || "[]"));

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // ── Claim promo & redirect ──
  const handleClaimPromo = (promo, isMyTier = true) => {
    if (!isMyTier) {
      showToast(`Upgrade ke ${promo.tierName || tier} untuk unlock promo ini! ⬆️`);
      return;
    }

    const code = `BEAUTY${(promo.discount || "0").replace("%", "")}`;
    const newPromo = { ...promo, code, claimedAt: new Date().toISOString(), tier };

    const updated = [...claimedPromos, newPromo];
    setClaimedPromos(updated);
    localStorage.setItem("claimedPromos", JSON.stringify(updated));

    showToast(`Promo ${promo.title} diklaim! Kode: ${code} 🎁`);

    // Redirect ke Treatments setelah claim
    setTimeout(() => navigate("/Member/treatments"), 800);
  };

  const renderOtherTier = (tierName) => {
    const other = allBenefits[tierName] || allBenefits.Regular;
    const OtherIcon = other.icon;
    return (
      <>
        <div
          className={`rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden mb-8 bg-gradient-to-br ${other.color}`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 text-center">
            <OtherIcon className="text-5xl mx-auto mb-4" />
            <h2 className="text-4xl font-bold">{tierName} Tier</h2>
            <p className="mt-2 opacity-80">Explore benefits available for {tierName} members</p>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Fraunces, serif", color: INK }}>
            <span style={{ color: ACCENT }}>{tierName}</span> Perks
          </h2>
          <div
            className="rounded-2xl p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{ background: BG, border: `1px solid ${CARD_TINT}` }}
          >
            {other.perks.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: BG_ALT }}>
                  <FaStar size={12} style={{ color: ACCENT }} />
                </div>
                <span className="text-sm font-medium" style={{ color: INK }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {other.promos.map((promo, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 bg-white transition-all duration-300 hover:-translate-y-1.5"
              style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl" style={{ color: ACCENT }}><promo.icon /></span>
                <span className="text-xs px-3 py-1 rounded-full" style={{ background: BG_ALT, color: ACCENT }}>
                  {tierName}
                </span>
              </div>
              <h3 className="font-semibold text-lg" style={{ color: INK }}>{promo.title}</h3>
              <p className="text-4xl font-bold mt-4" style={{ fontFamily: "Fraunces, serif", color: ACCENT }}>
                {promo.discount}
              </p>
              <p className="text-sm" style={{ color: SAGE }}>Discount</p>
              <button
                onClick={() => { setActiveTab("my"); showToast(`Saat ini tier kamu: ${tier}. Upgrade ke ${tierName} untuk unlock promo ini! ⬆️`); }}
                className="mt-5 w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                style={{ border: `1px solid ${ACCENT}`, color: ACCENT, background: "#FFFFFF" }}
              >
                Upgrade to Claim
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };

  const TierIcon = ben.icon;

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
                <FaGift size={11} />
                {tier} Member Benefits
              </div>
              <h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>
                Exclusive Benefits
              </h1>
            </div>
          }
          breadcrumb={[
            { label: "Member", to: "/Member" },
            { label: "Benefits" },
          ]}
        />
      </div>

      {/* TIER TABS */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {["my", "Silver", "Gold", "Platinum"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: activeTab === t ? ACCENT : "#FFFFFF",
              color: activeTab === t ? "#FFFFFF" : SAGE,
              border: `1px solid ${activeTab === t ? "transparent" : CARD_TINT}`,
            }}
          >
            {t === "my" ? "My Benefits" : t}
          </button>
        ))}
      </div>

      {/* DISPLAY LOGIC */}
      {activeTab === "my" ? (
        <>
          {/* MY TIER HERO */}
          <div
            className={`rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden mb-8 bg-gradient-to-br ${ben.color}`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-[0.25em] opacity-80">Your Tier</span>
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Active</span>
                </div>
                <h2 className="text-4xl font-bold flex items-center gap-3 mt-2">
                  <TierIcon />
                  {tier}
                </h2>
                {ben.nextTier && (
                  <p
                    className="mt-3 text-sm opacity-80 cursor-pointer hover:opacity-100 hover:underline transition-all"
                    onClick={() => setActiveTab(ben.nextTier)}
                  >
                    Upgrade to <strong>{ben.nextTier}</strong> for more exclusive perks →
                  </p>
                )}
              </div>
              <div className="mt-4 md:mt-0">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl flex items-center gap-3">
                  <FaGift className="text-2xl" />
                  <div>
                    <p className="text-sm opacity-80">Available Promos</p>
                    <p className="text-2xl font-bold">{ben.promos.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PERKS GRID */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Fraunces, serif", color: INK }}>
              Your <span style={{ color: ACCENT }}>Perks</span>
            </h2>
            <div
              className="rounded-2xl p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              style={{ background: BG, border: `1px solid ${CARD_TINT}` }}
            >
              {ben.perks.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: BG_ALT }}
                  >
                    <FaStar size={12} style={{ color: ACCENT }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: INK }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CLAIMED PROMOS */}
          {claimedPromos.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Fraunces, serif", color: INK }}>
                Claimed <span style={{ color: "#2D6A4F" }}>Promos</span>
              </h2>
              <div className="rounded-2xl p-6" style={{ background: "#D4EDDA", border: `1px solid #C8E6C9` }}>
                <div className="grid md:grid-cols-2 gap-3">
                  {claimedPromos.map((cp, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#E8F5E9" }}>
                        <FaCheckCircle size={16} style={{ color: "#2D6A4F" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold" style={{ color: INK }}>{cp.title}</p>
                        <p className="text-xs" style={{ color: "#2D6A4F" }}>{cp.discount} OFF · Kode: <strong>{cp.code}</strong></p>
                      </div>
                      <button
                        onClick={() => navigate("/Member/treatments")}
                        className="px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                        style={{ background: ACCENT, color: "#fff" }}
                      >
                        <FaCalendarCheck className="inline mr-1" size={9} />Book
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MY PROMOS */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Fraunces, serif", color: INK }}>
              Available <span style={{ color: ACCENT }}>Promos</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {ben.promos.map((promo, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-7 bg-white transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
                  style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl" style={{ color: ACCENT }}><promo.icon /></span>
                    <span className="text-xs px-3 py-1 rounded-full" style={{ background: BG_ALT, color: ACCENT }}>
                      {tier} Exclusive
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg" style={{ color: INK }}>{promo.title}</h3>
                  <p className="text-4xl font-bold mt-4" style={{ fontFamily: "Fraunces, serif", color: ACCENT }}>
                    {promo.discount}
                  </p>
                  <p className="text-sm" style={{ color: SAGE }}>Discount</p>
                  <button
                    onClick={() => handleClaimPromo(promo)}
                    className="mt-5 w-full py-3 rounded-full text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                    style={{ background: ACCENT }}
                  >
                    <FaTags className="inline mr-1.5" size={11} />
                    Claim & Book
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        renderOtherTier(activeTab)
      )}
    </div>
  );
}
