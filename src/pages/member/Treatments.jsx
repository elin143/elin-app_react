import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import {
  FaSpa,
  FaSearch,
  FaClock,
  FaStar,
  FaGem,
  FaHeart,
  FaShieldAlt,
  FaMagic,
  FaLeaf,
  FaSyringe,
  FaUserMd,
  FaCalendarCheck,
  FaTags,
  FaCheckCircle,
} from "react-icons/fa";

// THEME TOKENS
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const allTreatments = [
  {
    id: 1, name: "Premium Hydrafacial", category: "Facial",
    desc: "Deep cleansing and hydration for glowing skin. Removes impurities and infuses antioxidants.",
    price: "Rp 850K", duration: "60 min", rating: 4.9, reviews: 234,
    icon: FaSpa, popular: true, tag: "Best Seller",
  },
  {
    id: 2, name: "Laser Rejuvenation", category: "Laser",
    desc: "Advanced laser therapy to reduce wrinkles, scars, and hyperpigmentation.",
    price: "Rp 1.2M", duration: "45 min", rating: 4.8, reviews: 189,
    icon: FaMagic, popular: false, tag: "Premium",
  },
  {
    id: 3, name: "Gold Radiance Facial", category: "Facial",
    desc: "24K gold-infused facial therapy for ultimate radiance and anti-aging benefits.",
    price: "Rp 2.5M", duration: "90 min", rating: 4.9, reviews: 512,
    icon: FaGem, popular: true, tag: "Luxury",
  },
  {
    id: 4, name: "Acne Clear Program", category: "Acne",
    desc: "Comprehensive acne treatment with extraction, LED therapy, and calming mask.",
    price: "Rp 650K", duration: "50 min", rating: 4.7, reviews: 156,
    icon: FaShieldAlt, popular: false, tag: null,
  },
  {
    id: 5, name: "Botox Injection", category: "Injectables",
    desc: "Precision botox for wrinkle reduction. Performed by certified aesthetic doctors.",
    price: "Rp 1.8M", duration: "30 min", rating: 4.8, reviews: 98,
    icon: FaSyringe, popular: false, tag: "Medical",
  },
  {
    id: 6, name: "Organic Herbal Facial", category: "Facial",
    desc: "All-natural herbal facial using organic ingredients. Perfect for sensitive skin.",
    price: "Rp 450K", duration: "60 min", rating: 4.6, reviews: 87,
    icon: FaLeaf, popular: false, tag: "Natural",
  },
  {
    id: 7, name: "Skin Booster Injection", category: "Injectables",
    desc: "Hyaluronic acid microinjections for deep hydration and plump, dewy skin.",
    price: "Rp 1.5M", duration: "40 min", rating: 4.8, reviews: 203,
    icon: FaSyringe, popular: false, tag: "Hydration",
  },
  {
    id: 8, name: "Diamond Microdermabrasion", category: "Exfoliation",
    desc: "Diamond-tip exfoliation removes dead skin cells for a smooth, bright complexion.",
    price: "Rp 750K", duration: "45 min", rating: 4.7, reviews: 145,
    icon: FaGem, popular: false, tag: null,
  },
  {
    id: 9, name: "Anti-Aging Collagen", category: "Anti-Aging",
    desc: "Collagen-boosting treatment with peptide serum and LED light therapy.",
    price: "Rp 1.1M", duration: "75 min", rating: 4.9, reviews: 321,
    icon: FaHeart, popular: true, tag: "Popular",
  },
  {
    id: 10, name: "Chemical Peel Deluxe", category: "Exfoliation",
    desc: "Medical-grade chemical peel to resurface skin and treat hyperpigmentation.",
    price: "Rp 950K", duration: "40 min", rating: 4.6, reviews: 112,
    icon: FaMagic, popular: false, tag: "Medical",
  },
  {
    id: 11, name: "PRP Vampire Facial", category: "Facial",
    desc: "Platelet-rich plasma facial using your own blood for natural skin rejuvenation.",
    price: "Rp 2M", duration: "75 min", rating: 4.9, reviews: 278,
    icon: FaSyringe, popular: true, tag: "Trending",
  },
  {
    id: 12, name: "Thread Lift", category: "Lifting",
    desc: "Non-surgical facelift using PDO threads for natural-looking lifting results.",
    price: "Rp 3.5M", duration: "90 min", rating: 4.8, reviews: 167,
    icon: FaUserMd, popular: false, tag: "Premium",
  },
];

const categories = ["All", "Facial", "Laser", "Acne", "Injectables", "Exfoliation", "Anti-Aging", "Lifting"];

export default function Treatments() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const memberTier = JSON.parse(localStorage.getItem("memberTier") || "null");
  const currentTier = memberTier?.tier || user?.tier || "Regular";
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [toast, setToast] = useState(null);
  const [selected, setSelected] = useState(null);
  const [claimedPromos, setClaimedPromos] = useState(() => JSON.parse(localStorage.getItem("claimedPromos") || "[]"));

  // Refresh claimed promos when tab becomes active
  useEffect(() => {
    setClaimedPromos(JSON.parse(localStorage.getItem("claimedPromos") || "[]"));
  }, []);

  // Find matching promo for a treatment name
  const getPromoFor = (treatmentName) => {
    return claimedPromos.find(cp =>
      treatmentName.toLowerCase().includes(cp.title.toLowerCase()) ||
      cp.title.toLowerCase().includes(treatmentName.toLowerCase())
    );
  };

  // Calculate discounted price string from promo
  const getDiscountedPrice = (priceStr, promo) => {
    if (!promo) return null;
    // Parse price with K/M suffix: "Rp 850K" → 850000, "Rp 1.2M" → 1200000
    let num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    if (priceStr.includes("M")) num *= 1000000;
    else if (priceStr.includes("K")) num *= 1000;
    const discount = parseInt((promo.discount || "0").replace("%", ""));
    const discounted = Math.round(num * (1 - discount / 100));
    // Format: ≥ 1M use "M", else use "K"
    if (discounted >= 1000000) return `Rp ${(discounted / 1000000).toFixed(1)}M`;
    return `Rp ${(discounted / 1000).toFixed(0)}K`;
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleBook = (t) => {
    showToast(`Booking ${t.name} berhasil! Mengarahkan ke appointment... 📅`);
    setTimeout(() => navigate("/Member/appointments"), 1200);
  };

  const filtered = allTreatments.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "All" || t.category === cat;
    return matchSearch && matchCat;
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
                <FaSpa size={11} />
                {currentTier} Member Pricing
              </div>
              <h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>
                Beauty Treatments
              </h1>
            </div>
          }
          breadcrumb={[
            { label: "Member", to: "/Member" },
            { label: "Treatments" },
          ]}
        />
      </div>

      {/* SEARCH + CATEGORIES */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div
          className="flex items-center gap-3 bg-white px-4 py-3 rounded-full flex-1"
          style={{ border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.04)" }}
        >
          <FaSearch style={{ color: SAGE }} />
          <input
            type="text"
            placeholder="Search treatments or browse by category..."
            className="w-full outline-none text-sm bg-transparent"
            style={{ color: INK }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: cat === c ? ACCENT : "#FFFFFF",
                color: cat === c ? "#FFFFFF" : SAGE,
                border: `1px solid ${cat === c ? "transparent" : CARD_TINT}`,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* TREATMENT GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16 rounded-2xl" style={{ background: BG }}>
            <FaSpa style={{ color: SAGE, fontSize: "3rem" }} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold" style={{ color: INK }}>No treatments found</p>
            <p className="text-sm" style={{ color: SAGE }}>Try adjusting search or category filter</p>
          </div>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl p-6 bg-white transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
              style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}
            >
              {/* POPULAR / TAG */}
              {(t.popular || t.tag) && (
                <div className="absolute top-4 right-4 flex gap-1.5">
                  {t.popular && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold text-white" style={{ background: ACCENT }}>
                      <FaStar className="inline mr-0.5" size={8} /> Popular
                    </span>
                  )}
                  {t.tag && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold" style={{ background: BG_ALT, color: ACCENT }}>
                      {t.tag}
                    </span>
                  )}
                </div>
              )}

              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: BG_ALT }}>
                <t.icon style={{ color: ACCENT, fontSize: "1.3rem" }} />
              </div>

              <span className="text-xs px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: BG, color: SAGE }}>
                {t.category}
              </span>
              <h3 className="text-lg font-semibold mb-2" style={{ color: INK }}>{t.name}</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: SAGE }}>{t.desc}</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  {(() => { const promo = getPromoFor(t.name); return promo ? (
                    <>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mb-1" style={{ background: "#D4EDDA", color: "#2D6A4F" }}>
                        <FaCheckCircle size={9} /> {promo.discount} OFF
                      </span>
                      <p className="text-xs line-through" style={{ color: SAGE }}>{t.price}</p>
                      <p className="text-xl font-bold" style={{ fontFamily: "Fraunces, serif", color: "#2D6A4F" }}>{getDiscountedPrice(t.price, promo)}</p>
                    </>
                  ) : (
                    <p className="text-xl font-bold" style={{ fontFamily: "Fraunces, serif", color: ACCENT }}>{t.price}</p>
                  ); })()}
                  <div className="flex items-center gap-1 text-xs" style={{ color: SAGE }}>
                    <FaClock size={9} /> {t.duration}
                    <span className="mx-1">•</span>
                    <FaStar size={9} style={{ color: "#E8B44F" }} /> {t.rating}
                    <span className="opacity-60">({t.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Claimed Promo Banner */}
              {(() => { const promo = getPromoFor(t.name); return promo && (
                <div className="mb-3 p-2 rounded-xl text-xs" style={{ background: "#E8F5E9", color: "#2D6A4F" }}>
                  <FaTags className="inline mr-1" size={9} />Promo <strong>{promo.code}</strong> applied!
                </div>
              ); })()}

              <div className="flex gap-2">
                <button
                  onClick={() => handleBook(t)}
                  className="flex-1 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                  style={{ background: ACCENT }}
                >
                  <FaCalendarCheck className="inline mr-1.5" size={11} />
                  Book Now
                </button>
                <button
                  onClick={() => setSelected(selected?.id === t.id ? null : t)}
                  className="px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-50"
                  style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}
                >
                  {selected?.id === t.id ? "Less" : "Info"}
                </button>
              </div>

              {/* EXPANDED INFO */}
              {selected?.id === t.id && (
                <div
                  className="mt-4 p-4 rounded-xl animate-fade"
                  style={{ background: BG, border: `1px solid ${CARD_TINT}` }}
                >
                  <p className="text-xs font-medium mb-2" style={{ color: INK }}>What's included:</p>
                  <ul className="space-y-1.5 text-xs" style={{ color: SAGE }}>
                    <li>• Consultation with specialist</li>
                    <li>• Full {t.duration} treatment session</li>
                    <li>• Aftercare product samples</li>
                    <li>• 7-day follow-up check</li>
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
