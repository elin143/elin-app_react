import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  FaCrown, FaStar, FaGift, FaUser, FaEdit, FaTrash, FaPlus, FaCheckCircle,
  FaTimes, FaSave, FaSearch, FaGem,
} from "react-icons/fa";

const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const mockTiers = [
  { tier: "Platinum", icon: FaGem, color: ACCENT, pointsReq: 5000, discount: "25%", benefits: ["Priority booking", "Free consultation", "Birthday gift","Exclusive events","Dedicated therapist","Double points weekend"], members: 8 },
  { tier: "Gold", icon: FaCrown, color: "#E8B44F", pointsReq: 2500, discount: "15%", benefits: ["Priority booking","Free consultation","Birthday gift","Exclusive events"], members: 12 },
  { tier: "Silver", icon: FaStar, color: "#9CA3AF", pointsReq: 1000, discount: "10%", benefits: ["Priority booking","Free consultation"], members: 10 },
  { tier: "Regular", icon: FaUser, color: SAGE, pointsReq: 0, discount: "5%", benefits: ["Basic booking"], members: 7 },
];

const mockMembers = [
  { id: "MB-001", name: "Citra Lestari", tier: "Platinum", points: 5200, join: "2025-06-15", expiry: "2027-06-15" },
  { id: "MB-002", name: "Gita Permata", tier: "Platinum", points: 4800, join: "2025-08-20", expiry: "2027-08-20" },
  { id: "MB-003", name: "Andi Saputra", tier: "Gold", points: 3200, join: "2025-10-01", expiry: "2027-10-01" },
  { id: "MB-004", name: "Dewi Anggraini", tier: "Gold", points: 2100, join: "2026-01-12", expiry: "2028-01-12" },
  { id: "MB-005", name: "Budi Santoso", tier: "Silver", points: 1400, join: "2026-02-28", expiry: "2028-02-28" },
  { id: "MB-006", name: "Hendra Wijaya", tier: "Regular", points: 450, join: "2026-03-15", expiry: "2028-03-15" },
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

export default function MembershipLoyalty() {
  const [tiers, setTiers] = useState(mockTiers);
  const [members, setMembers] = useState(mockMembers);
  const [activeTab, setActiveTab] = useState("tiers");
  const [toast, setToast] = useState(null);
  const [editTierModal, setEditTierModal] = useState(null);
  const [addTierModal, setAddTierModal] = useState(false);
  const [changeTierModal, setChangeTierModal] = useState(null);
  const [pointRules] = useState([
    { action: "Booking Treatment", pts: "+100 pts", desc: "Every completed treatment booking" },
    { action: "Product Purchase", pts: "+5 pts / Rp 10.000", desc: "Every skincare product purchase" },
    { action: "Referral Bonus", pts: "+500 pts", desc: "When referred friend completes booking" },
    { action: "Birthday Bonus", pts: "+300 pts", desc: "Annual birthday reward" },
    { action: "Review Product", pts: "+50 pts", desc: "Submit a verified product review" },
    { action: "Social Share", pts: "+25 pts", desc: "Share treatment result on social media" },
  ]);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleEditTier = (updated) => {
    setTiers((prev) => prev.map((t) => (t.tier === updated.tier ? updated : t)));
    setEditTierModal(null);
    showToast(`Tier ${updated.tier} berhasil diperbarui! ✅`);
  };

  const handleAddTier = (newTier) => {
    setTiers((prev) => [...prev, { ...newTier, members: 0 }]);
    setAddTierModal(false);
    showToast(`Tier ${newTier.tier} berhasil ditambahkan! 🎉`);
  };

  const handleChangeTier = (member, newTier) => {
    setMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, tier: newTier } : m)));
    setChangeTierModal(null);
    showToast(`${member.name} diubah ke ${newTier}! ✅`);
  };

  const handleSaveRules = () => {
    showToast(`Point rules disimpan! ${pointRules.length} rules aktif ✅`);
  };

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
        <PageHeader title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Membership & Loyalty</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Membership Management</h1></div>} breadcrumb={[{ label: "Dashboard", to: "/Dashboard" }, { label: "Membership" }]}>
          <div className="flex gap-2">
            <button onClick={() => setActiveTab("tiers")} className="px-5 py-2.5 rounded-full text-sm font-medium transition-all" style={{ background: activeTab === "tiers" ? ACCENT : "white", color: activeTab === "tiers" ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}>Tiers</button>
            <button onClick={() => setActiveTab("members")} className="px-5 py-2.5 rounded-full text-sm font-medium transition-all" style={{ background: activeTab === "members" ? ACCENT : "white", color: activeTab === "members" ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}>Members</button>
          </div>
        </PageHeader>
      </div>

      {activeTab === "tiers" && (
        <>
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            {tiers.map((t) => (
              <div key={t.tier} className="rounded-2xl p-6 bg-white text-center transition-transform hover:-translate-y-1 cursor-pointer" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }} onClick={() => setEditTierModal(t)}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: `linear-gradient(135deg, ${t.color}20, ${t.color}40)`, color: t.color }}>
                  <t.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>{t.tier}</h3>
                <p className="text-xs mt-1" style={{ color: SAGE }}>{t.members} members</p>
                <div className="mt-4 space-y-2 text-left">
                  <div className="flex justify-between text-xs"><span style={{ color: SAGE }}>Discount</span><span className="font-bold" style={{ color: t.color }}>{t.discount}</span></div>
                  <div className="flex justify-between text-xs"><span style={{ color: SAGE }}>Points Req.</span><span className="font-bold" style={{ color: INK }}>{t.pointsReq.toLocaleString()}</span></div>
                  <div className="pt-2" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
                    {t.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs py-0.5" style={{ color: INK }}><FaCheckCircle size={9} style={{ color: "#2D6A4F" }} />{b}</div>
                    ))}
                  </div>
                </div>
                <button className="mt-4 w-full py-2 rounded-full text-xs font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }} onClick={(e) => { e.stopPropagation(); setEditTierModal(t); }}><FaEdit className="inline mr-1" size={10} />Edit Tier</button>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] p-8" style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Point Earning Rules</h2>
              <button onClick={() => setAddTierModal(true)} className="px-4 py-2 rounded-full text-xs font-medium transition-all hover:bg-white" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaPlus className="inline mr-1" size={10} />Add Tier</button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {pointRules.map((r, i) => (
                <div key={i} className="rounded-2xl p-4 bg-white" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
                  <p className="font-semibold text-sm" style={{ color: INK }}>{r.action}</p>
                  <p className="text-lg font-bold mt-1" style={{ color: ACCENT }}>{r.pts}</p>
                  <p className="text-xs mt-1" style={{ color: SAGE }}>{r.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <RippleButton onClick={handleSaveRules} className="px-6 py-3 rounded-full text-sm"><FaSave className="inline mr-1.5" size={12} />Save Rules</RippleButton>
            </div>
          </div>
        </>
      )}

      {activeTab === "members" && (
        <div className="rounded-[2rem] p-8" style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
          <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${CARD_TINT}` }}>
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr style={{ background: BG_ALT }}>
                  {["Member ID","Name","Tier","Points","Join Date","Expiry","Actions"].map(h => (
                    <th key={h} className="p-4 text-xs font-semibold uppercase tracking-[0.12em] text-left" style={{ color: SAGE }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id} className="border-b transition-all duration-200 hover:bg-white" style={{ borderColor: CARD_TINT }}>
                    <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: BG_ALT, color: ACCENT }}>#{m.id}</span></td>
                    <td className="p-4 text-sm font-semibold" style={{ color: INK }}>{m.name}</td>
                    <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: m.tier === "Platinum" ? BG_ALT : "#FFF8E1", color: m.tier === "Platinum" ? ACCENT : AMBER }}><FaCrown className="inline mr-1" size={9} />{m.tier}</span></td>
                    <td className="p-4 text-sm font-bold" style={{ color: ACCENT }}>{m.points.toLocaleString()} pts</td>
                    <td className="p-4 text-xs" style={{ color: SAGE }}>{m.join}</td>
                    <td className="p-4 text-xs" style={{ color: SAGE }}>{m.expiry}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setChangeTierModal(m)} className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105" style={{ background: BG_ALT, color: ACCENT }}><FaEdit size={10} className="mr-1 inline" />Change Tier</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs" style={{ color: SAGE }}>Menampilkan {members.length} members</div>
        </div>
      )}
      {/* EDIT TIER MODAL */}
      {editTierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setEditTierModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-lg w-full" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Edit Membership Tier</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>{editTierModal.tier}</h3></div>
              <button onClick={() => setEditTierModal(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <TierForm tier={editTierModal} onSave={handleEditTier} onClose={() => setEditTierModal(null)} submitLabel="Simpan Perubahan" />
          </div>
        </div>
      )}

      {/* ADD TIER MODAL */}
      {addTierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setAddTierModal(false)}>
          <div className="animate-fade rounded-3xl p-8 max-w-lg w-full" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Add Membership Tier</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>Tier Baru</h3></div>
              <button onClick={() => setAddTierModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <TierForm
              tier={{ tier: "", pointsReq: 0, discount: "0%", benefits: [], color: ACCENT, icon: FaStar }}
              onSave={handleAddTier}
              onClose={() => setAddTierModal(false)}
              submitLabel="Tambah Tier"
              isNew
            />
          </div>
        </div>
      )}

      {/* CHANGE TIER MODAL */}
      {changeTierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setChangeTierModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-md w-full mx-4" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: BG_ALT, color: ACCENT }}><FaCrown size={24} /></div>
              <h3 className="text-xl font-semibold mb-1" style={{ color: INK }}>Ubah Tier</h3>
              <p className="text-sm" style={{ color: SAGE }}>{changeTierModal.name} — saat ini <strong>{changeTierModal.tier}</strong></p>
            </div>
            <div className="space-y-3">
              {tiers.map((t) => (
                <button key={t.tier} onClick={() => handleChangeTier(changeTierModal, t.tier)}
                  className="w-full p-4 rounded-xl text-left transition-all hover:-translate-y-0.5 flex items-center gap-4"
                  style={{ border: `1px solid ${CARD_TINT}`, background: changeTierModal.tier === t.tier ? BG_ALT : "white" }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${t.color}20, ${t.color}40)`, color: t.color }}>
                    <t.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm" style={{ color: INK }}>{t.tier}</p>
                    <p className="text-xs" style={{ color: SAGE }}>{t.discount} discount • {t.pointsReq.toLocaleString()} pts</p>
                  </div>
                  {changeTierModal.tier === t.tier && <FaCheckCircle size={16} style={{ color: "#2D6A4F" }} />}
                </button>
              ))}
            </div>
            <button onClick={() => setChangeTierModal(null)} className="mt-4 w-full py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>Batal</button>
          </div>
        </div>
      )}
    </div>
  );
}

function TierForm({ tier, onSave, onClose, submitLabel, isNew }) {
  const [form, setForm] = useState({
    tier: tier.tier || "",
    pointsReq: String(tier.pointsReq || ""),
    discount: tier.discount || "0%",
    benefits: tier.benefits?.join(", ") || "",
  });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...tier,
      tier: form.tier,
      pointsReq: Number(form.pointsReq) || 0,
      discount: form.discount,
      benefits: form.benefits.split(",").map(b => b.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Tier Name *</label>
        <input name="tier" value={form.tier} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. Diamond" />
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Points Required *</label>
        <input name="pointsReq" type="number" value={form.pointsReq} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. 10000" />
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Discount % *</label>
        <input name="discount" value={form.discount} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. 20%" />
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Benefits (comma separated)</label>
        <textarea name="benefits" value={form.benefits} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2 resize-none" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="Priority booking, Free consultation, Birthday gift" />
      </div>
      <div className="flex gap-3 pt-4" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes className="inline mr-1.5" size={11} />Cancel</button>
        <RippleButton type="submit" className="flex-1 py-3 rounded-full text-sm"><FaSave className="inline mr-1.5" size={12} />{submitLabel || "Simpan"}</RippleButton>
      </div>
    </form>
  );
}
