import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import pasienData from "../../data/pasien.json";
import {
  FaStar,
  FaGift,
  FaTrophy,
  FaGem,
  FaCrown,
  FaMedal,
  FaAward,
  FaGrinStars,
  FaFire,
  FaLock,
  FaCheckCircle,
  FaShoppingBag,
} from "react-icons/fa";

// THEME TOKENS
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const rewardTiers = [
  { min: 0, label: "Bronze", icon: FaMedal, color: "#CD7F32", bg: "#FFF3E0" },
  { min: 500, label: "Silver", icon: FaStar, color: "#9CA3AF", bg: "#F5F5F5" },
  { min: 1000, label: "Gold", icon: FaTrophy, color: "#E8B44F", bg: "#FFFDE7" },
  { min: 2500, label: "Platinum", icon: FaCrown, color: "#E8B44F", bg: "#F3E5F5" },
  { min: 5000, label: "Diamond", icon: FaGem, color: "#5C6BC0", bg: "#E8EAF6" },
];

const redeemableRewards = [
  { id: 1, name: "Free Basic Facial", points: 200, icon: FaStar, category: "Treatment", popular: true },
  { id: 2, name: "Rp 100K Voucher", points: 350, icon: FaShoppingBag, category: "Voucher" },
  { id: 3, name: "Free Acne Treatment", points: 500, icon: FaFire, category: "Treatment" },
  { id: 4, name: "Rp 250K Voucher", points: 800, icon: FaShoppingBag, category: "Voucher", popular: true },
  { id: 5, name: "Premium Facial Package", points: 1200, icon: FaGem, category: "Treatment" },
  { id: 6, name: "Free Laser Session", points: 1500, icon: FaGrinStars, category: "Treatment" },
  { id: 7, name: "Rp 500K Voucher", points: 1800, icon: FaShoppingBag, category: "Voucher" },
  { id: 8, name: "Luxury Spa Day", points: 3000, icon: FaCrown, category: "Experience" },
  { id: 9, name: "Annual VIP Membership", points: 5000, icon: FaAward, category: "Membership", premium: true },
];

const recentActivity = [
  { action: "Completed Booking", desc: "Hydrafacial Treatment", pts: "+50", date: "2 days ago" },
  { action: "Referral Bonus", desc: "Referred Sarah A.", pts: "+100", date: "5 days ago" },
  { action: "Birthday Bonus", desc: "Happy Birthday! 🎂", pts: "+200", date: "1 week ago" },
  { action: "Redeemed", desc: "Rp 250K Voucher", pts: "-800", date: "2 weeks ago" },
  { action: "Review Submitted", desc: "5-star review", pts: "+25", date: "3 weeks ago" },
];

export default function Rewards() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const patient = pasienData[0];
  const currentPoints = 1250;
  const [toast, setToast] = useState(null);
  const [redeemModal, setRedeemModal] = useState(null);
  const [points, setPoints] = useState(currentPoints);

  const currentTier = rewardTiers.filter((t) => points >= t.min).pop() || rewardTiers[0];
  const nextTier = rewardTiers[rewardTiers.indexOf(currentTier) + 1];
  const progress = nextTier ? Math.round(((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100) : 100;

  const TierIcon = currentTier.icon;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleRedeem = (reward) => {
    if (points >= reward.points) {
      setPoints((prev) => prev - reward.points);
      setRedeemModal(null);
      showToast(`${reward.name} berhasil ditukarkan! 🎉`);
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
                <FaStar size={11} />
                {currentTier.label} Tier · {user.username || "Member"}
              </div>
              <h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>
                Rewards & Points
              </h1>
            </div>
          }
          breadcrumb={[
            { label: "Member", to: "/Member" },
            { label: "Rewards" },
          ]}
        />
      </div>

      {/* POINTS HERO */}
      <div
        className="rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden mb-8"
        style={{ background: `linear-gradient(135deg, ${ACCENT}, #8C4A63)` }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TierIcon className="text-xl" />
              <span className="text-xs uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full">{currentTier.label} Tier</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold flex items-center gap-3 mt-3">
              <FaStar style={{ color: "#FFD700" }} />
              {points.toLocaleString()}
            </h2>
            <p className="mt-2 opacity-80">Reward Points</p>
          </div>
          <div className="min-w-[200px]">
            <p className="text-sm opacity-80 mb-1.5">Progress to {nextTier?.label || "Max"}</p>
            <div className="w-full h-2.5 rounded-full bg-white/30 mb-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs opacity-60">
              {nextTier ? `${points - currentTier.min} / ${nextTier.min - currentTier.min} pts to ${nextTier.label}` : "Max tier reached! 🏆"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* REDEEMABLE REWARDS */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Fraunces, serif", color: INK }}>
            Redeem <span style={{ color: ACCENT }}>Rewards</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {redeemableRewards.map((r) => {
              const canAfford = points >= r.points;
              return (
                <div
                  key={r.id}
                  className={`rounded-2xl p-6 bg-white transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${
                    !canAfford && !r.premium ? "opacity-60" : ""
                  }`}
                  style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}
                >
                  {r.popular && (
                    <span
                      className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold text-white"
                      style={{ background: ACCENT }}
                    >
                      Popular
                    </span>
                  )}
                  {r.premium && (
                    <span
                      className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold"
                      style={{ background: BG_ALT, color: ACCENT }}
                    >
                      Premium
                    </span>
                  )}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: BG_ALT }}>
                      <r.icon style={{ color: ACCENT, fontSize: "1.3rem" }} />
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: ACCENT }}>
                      <FaStar size={11} color="#E8B44F" />
                      {r.points}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1" style={{ color: INK }}>{r.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: BG, color: SAGE }}>
                    {r.category}
                  </span>
                  <button
                    onClick={() => setRedeemModal(r)}
                    disabled={!canAfford}
                    className={`mt-4 w-full py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      canAfford
                        ? "hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                        : "cursor-not-allowed"
                    }`}
                    style={{
                      background: canAfford ? ACCENT : BG_ALT,
                      color: canAfford ? "#FFFFFF" : SAGE,
                    }}
                  >
                    {canAfford ? (
                      <><FaGift className="inline mr-1.5" size={11} />Redeem</>
                    ) : (
                      <><FaLock className="inline mr-1.5" size={11} />Not Enough Points</>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div>
          <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Fraunces, serif", color: INK }}>
            Recent <span style={{ color: ACCENT }}>Activity</span>
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{ background: "#FFFFFF", border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}
          >
            {recentActivity.map((a, i) => (
              <div
                key={i}
                className="flex justify-between items-start py-3.5"
                style={{ borderBottom: i < recentActivity.length - 1 ? `1px solid ${CARD_TINT}` : "none" }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: INK }}>{a.action}</p>
                  <p className="text-xs" style={{ color: SAGE }}>{a.desc}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: SAGE, opacity: 0.7 }}>{a.date}</p>
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: a.pts.startsWith("+") ? "#2D6A4F" : "#C0392B" }}
                >
                  {a.pts}
                </span>
              </div>
            ))}
          </div>

          {/* HOW TO EARN */}
          <div
            className="rounded-2xl p-6 mt-5"
            style={{ background: BG, border: `1px solid ${CARD_TINT}` }}
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: INK }}>
              <FaGrinStars style={{ color: "#E8B44F" }} />
              How to Earn Points
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: SAGE }}>
              <li className="flex items-center gap-2 cursor-pointer transition-colors" style={{ color: SAGE }} onMouseEnter={(e) => e.currentTarget.style.color = INK} onMouseLeave={(e) => e.currentTarget.style.color = SAGE} onClick={() => showToast("Pergi ke Treatments untuk booking treatment & dapatkan +50 pts! 💆‍♀️")}><FaCheckCircle size={10} style={{ color: "#2D6A4F" }} /> Book a treatment: +50 pts</li>
              <li className="flex items-center gap-2 cursor-pointer transition-colors" style={{ color: SAGE }} onMouseEnter={(e) => e.currentTarget.style.color = INK} onMouseLeave={(e) => e.currentTarget.style.color = SAGE} onClick={() => showToast("Ajak temanmu daftar jadi member dan dapatkan +100 pts per referral! 👥")}><FaCheckCircle size={10} style={{ color: "#2D6A4F" }} /> Refer a friend: +100 pts</li>
              <li className="flex items-center gap-2 cursor-pointer transition-colors" style={{ color: SAGE }} onMouseEnter={(e) => e.currentTarget.style.color = INK} onMouseLeave={(e) => e.currentTarget.style.color = SAGE} onClick={() => showToast("Tulis review setelah treatment untuk dapatkan +25 pts! ⭐")}><FaCheckCircle size={10} style={{ color: "#2D6A4F" }} /> Write a review: +25 pts</li>
              <li className="flex items-center gap-2 cursor-pointer transition-colors" style={{ color: SAGE }} onMouseEnter={(e) => e.currentTarget.style.color = INK} onMouseLeave={(e) => e.currentTarget.style.color = SAGE} onClick={() => showToast("Bonus ulang tahun otomatis dikirim saat hari H! 🎂")}><FaCheckCircle size={10} style={{ color: "#2D6A4F" }} /> Birthday bonus: +200 pts</li>
              <li className="flex items-center gap-2 cursor-pointer transition-colors" style={{ color: SAGE }} onMouseEnter={(e) => e.currentTarget.style.color = INK} onMouseLeave={(e) => e.currentTarget.style.color = SAGE} onClick={() => showToast("Share treatment kamu di Instagram & tag @beautycare untuk +15 pts! 📸")}><FaCheckCircle size={10} style={{ color: "#2D6A4F" }} /> Social media share: +15 pts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* REDEEM MODAL */}
      {redeemModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }}
          onClick={() => setRedeemModal(null)}
        >
          <div
            className="animate-fade rounded-3xl p-8 max-w-md w-full mx-4 text-center"
            style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: BG_ALT }}
            >
              <redeemModal.icon style={{ color: ACCENT, fontSize: "1.6rem" }} />
            </div>
            <h3 className="text-xl font-semibold mb-1" style={{ color: INK }}>{redeemModal.name}</h3>
            <p className="text-sm mb-2" style={{ color: SAGE }}>
              Redeem for <strong style={{ color: ACCENT }}>{redeemModal.points} points</strong>
            </p>
            <p className="text-xs mb-6" style={{ color: SAGE }}>
              Your balance: <strong>{points} pts</strong> → After redeem: <strong>{points - redeemModal.points} pts</strong>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setRedeemModal(null)}
                className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50"
                style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleRedeem(redeemModal)}
                className="flex-1 py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: ACCENT }}
              >
                Confirm Redeem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
