import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  FaSearch, FaShoppingBag, FaTimes, FaPlus, FaMinus, FaTrash,
  FaCreditCard, FaFilter, FaStar, FaBox, FaHistory, FaCheckCircle, FaClock,
  FaTags,
} from "react-icons/fa";

const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

const categoryColors = {
  "Serum": { bg: "#FDE8F0", color: ACCENT },
  "Moisturizer": { bg: "#E8F4FD", color: "#1565C0" },
  "Toner": { bg: "#FFF3E0", color: AMBER },
  "Sunscreen": { bg: "#FFF8E1", color: "#E8B44F" },
  "Mask": { bg: "#E8F5E9", color: "#2D6A4F" },
  "Eye Care": { bg: "#F3E5F5", color: "#7B1FA2" },
  "Cleanser": { bg: "#E0F7FA", color: "#00838F" },
};

const products = [
  { id: "PRD-001", name: "Radiance Glow Serum", category: "Serum", brand: "BeautyLab", price: 185000, stock: 45, rating: 4.8, reviews: 124, content: "Vitamin C + Niacinamide", description: "Serum pencerah dengan vitamin C konsentrasi tinggi.", image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee8e39?w=400&h=400&fit=crop" },
  { id: "PRD-002", name: "Hydra Moisturizer SPF30", category: "Moisturizer", brand: "DermaCare", price: 225000, stock: 32, rating: 4.6, reviews: 89, content: "Hyaluronic Acid + SPF30", description: "Pelembab harian dengan perlindungan UV.", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop" },
  { id: "PRD-003", name: "Acne Clear Toner", category: "Toner", brand: "SkinPure", price: 135000, stock: 8, rating: 4.5, reviews: 56, content: "Salicylic Acid 2% + Witch Hazel", description: "Toner anti-jerawat untuk kulit berminyak.", image: "https://images.unsplash.com/photo-1596755389378-c31a2a75f0fb?w=400&h=400&fit=crop" },
  { id: "PRD-004", name: "Collagen Night Cream", category: "Moisturizer", brand: "LuxGlow", price: 350000, stock: 20, rating: 4.9, reviews: 210, content: "Collagen + Retinol", description: "Krim malam anti-aging dengan collagen marine.", image: "https://images.unsplash.com/photo-1601049541289-9b1bcc895e35?w=400&h=400&fit=crop" },
  { id: "PRD-005", name: "Sunscreen Matte SPF50", category: "Sunscreen", brand: "SunGuard", price: 165000, stock: 60, rating: 4.7, reviews: 198, content: "Zinc Oxide + Niacinamide", description: "Sunscreen matte finish tanpa whitecast.", image: "https://images.unsplash.com/photo-1558618665-4e0c28f018e3?w=400&h=400&fit=crop" },
  { id: "PRD-006", name: "Brightening Mask Sheet", category: "Mask", brand: "GlowUp", price: 45000, stock: 120, rating: 4.4, reviews: 345, content: "Glutathione + Aloe Vera", description: "Sheet mask pencerah instan, 1 box 5pcs.", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop" },
  { id: "PRD-007", name: "Eye Cream Retinol", category: "Eye Care", brand: "DermaCare", price: 275000, stock: 15, rating: 4.8, reviews: 67, content: "Retinol + Peptide", description: "Krim mata anti-kerut dengan encapsulated retinol.", image: "https://images.unsplash.com/photo-1608248543803-ba4f8e6d9e3a?w=400&h=400&fit=crop" },
  { id: "PRD-008", name: "Cleansing Balm", category: "Cleanser", brand: "SkinPure", price: 155000, stock: 40, rating: 4.3, reviews: 78, content: "Natural Oil + Vitamin E", description: "Pembersih wajah oil-based untuk double cleansing.", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba41136c?w=400&h=400&fit=crop" },
];

const ProductThumb = ({ product, size }) => {
  const s = size || 64;
  return (
    <div className="rounded-2xl flex-shrink-0 overflow-hidden" style={{ width: s, height: s, background: BG_ALT }}>
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
    </div>
  );
};

const RippleButton = ({ children, onClick, className, type }) => {
  const [ripples, setRipples] = useState([]);
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples((prev) => [...prev, { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.slice(1)), 600);
    onClick?.(e);
  };
  return (
    <button type={type || "button"} onClick={handleClick}
      className={`relative overflow-hidden font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 ${className || ""}`}
      style={{ background: ACCENT }}>
      {ripples.map((r) => (<span key={r.id} className="absolute rounded-full animate-ripple" style={{ left: r.x - 20, top: r.y - 20, width: 40, height: 40, background: "rgba(255,255,255,0.35)" }} />))}
      {children}
    </button>
  );
};

export default function Shop() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeTab, setActiveTab] = useState("shop");
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem("shopOrders") || "[]"));
  const [claimedPromos] = useState(() => JSON.parse(localStorage.getItem("claimedPromos") || "[]"));
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {
    const m = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return m && (categoryFilter === "All" || p.category === categoryFilter);
  });

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  // Apply best matching promo discount
  const bestPromo = claimedPromos.length > 0 ? claimedPromos[claimedPromos.length - 1] : null;
  const promoDiscountPercent = bestPromo ? parseInt((bestPromo.discount || "0").replace("%", "")) : 0;
  const promoDiscountAmount = Math.round(cartTotal * promoDiscountPercent / 100);
  const finalTotal = cartTotal - promoDiscountAmount;

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} ditambahkan ke keranjang! 🛍️`);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i;
      const newQty = i.qty + delta;
      return newQty < 1 ? null : { ...i, qty: newQty };
    }).filter(Boolean));
  };

  const removeFromCart = (id, name) => {
    setCart(prev => prev.filter(i => i.id !== id));
    showToast(`${name} dihapus dari keranjang`);
  };

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const ts = now.getTime();
    const invoiceNo = `INV-SHOP-${dateStr.replace(/-/g,"")}-${String(ts % 10000).padStart(4,"0")}`;

    const order = {
      id: `INV-SHOP-${ts}`,
      invoiceNo,
      customer: user.username || "Member",
      treatment: cart.map(i => `${i.qty}x ${i.name}`).join(", "),
      amount: finalTotal,
      method: "Online Payment",
      date: dateStr,
      status: "Pending",
      source: "shop",
    };

    const existingOrders = JSON.parse(localStorage.getItem("shopOrders") || "[]");
    localStorage.setItem("shopOrders", JSON.stringify([order, ...existingOrders]));

    setShowCheckout(false);
    setCart([]);
    showToast(`Pesanan berhasil! Invoice #${invoiceNo} tercatat ✅`);
  };

  const formatRp = (n) => "Rp " + n.toLocaleString("id-ID");

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes toast-in { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes ripple { to { transform: scale(8); opacity: 0; } }
        .animate-toast { animation: toast-in 0.3s ease-out; }
        .animate-fade { animation: fade-in 0.2s ease-out; }
        .animate-slide { animation: slide-in 0.3s ease-out; }
      `}</style>

      {toast && (<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] animate-toast px-6 py-3.5 rounded-full text-white text-sm font-medium shadow-xl" style={{ background: INK }}>{toast}</div>)}

      {/* FLOATING CART BUTTON */}
      <button onClick={() => setShowCart(true)} className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95" style={{ background: ACCENT }}>
        <FaShoppingBag size={22} color="#fff" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white text-xs font-bold flex items-center justify-center" style={{ color: ACCENT, border: `2px solid ${ACCENT}` }}>{cartCount}</span>
        )}
      </button>

      {/* PAGE HEADER */}
      <div className="rounded-[2rem] p-8 mb-6" style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
        <PageHeader
          title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Member Shop</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Skincare Store</h1></div>}
          breadcrumb={[{ label: "Member", to: "/Member" }, { label: "Shop" }]}
        >
          <button onClick={() => setShowCart(true)} className="px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 relative" style={{ background: ACCENT }}>
            <FaShoppingBag className="inline mr-2" size={13} />Cart ({cartCount})
          </button>
        </PageHeader>
      </div>

      {/* TAB SWITCHER */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setActiveTab("shop")} className="px-5 py-2.5 rounded-full text-sm font-medium transition-all" style={{ background: activeTab === "shop" ? ACCENT : "white", color: activeTab === "shop" ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}><FaShoppingBag className="inline mr-1.5" size={12} />Shop</button>
        <button onClick={() => { setActiveTab("history"); setOrders(JSON.parse(localStorage.getItem("shopOrders") || "[]")); }} className="px-5 py-2.5 rounded-full text-sm font-medium transition-all" style={{ background: activeTab === "history" ? ACCENT : "white", color: activeTab === "history" ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}><FaHistory className="inline mr-1.5" size={12} />Order History</button>
      </div>

      {/* TAB: SHOP */}
      {activeTab === "shop" && (
        <>
      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2" size={14} style={{ color: SAGE }} />
          <input type="text" placeholder="Cari produk skincare..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-full outline-none text-sm bg-white transition-all focus:ring-2" style={{ border: "1px solid #E7D6DD", "--tw-ring-color": ACCENT }} />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <FaFilter size={13} style={{ color: SAGE }} className="flex-shrink-0" />
          {categories.map(c => (
            <button key={c} onClick={() => setCategoryFilter(c)} className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap" style={{ background: categoryFilter === c ? ACCENT : "white", color: categoryFilter === c ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}>{c}</button>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
        {filtered.map(p => {
          const cc = categoryColors[p.category] || { bg: BG_ALT, color: ACCENT };
          const lowStock = p.stock < 10;
          return (
            <div key={p.id} className="rounded-2xl bg-white overflow-hidden group transition-all duration-300 hover:-translate-y-1.5" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
              {/* Image */}
              <div className="relative h-52 overflow-hidden" style={{ background: cc.bg }}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                {lowStock && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold animate-pulse" style={{ background: "#D32F2F", color: "#fff" }}>Low Stock!</span>
                )}
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "white", color: ACCENT, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>{p.category}</span>
              </div>
              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(s => (
                    <FaStar key={s} size={10} style={{ color: s <= Math.round(p.rating) ? "#E8B44F" : CARD_TINT }} />
                  ))}
                  <span className="text-xs ml-1" style={{ color: SAGE }}>({p.reviews})</span>
                </div>
                <h3 className="font-semibold text-sm mb-0.5" style={{ color: INK }}>{p.name}</h3>
                <p className="text-xs mb-3" style={{ color: SAGE }}>{p.brand} · {p.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold" style={{ fontFamily: "Fraunces, serif", color: ACCENT }}>{formatRp(p.price)}</span>
                  <button
                    onClick={() => addToCart(p)}
                    disabled={p.stock === 0}
                    className="px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: ACCENT, color: "#fff" }}
                  >
                    <FaPlus className="inline mr-1" size={9} />Add
                  </button>
                </div>
                <p className="text-xs mt-2" style={{ color: p.stock < 10 ? "#D32F2F" : SAGE }}>{p.stock} in stock</p>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16"><FaBox size={40} style={{ color: CARD_TINT }} className="mx-auto mb-3" /><p style={{ color: SAGE }}>Produk tidak ditemukan</p></div>
        )}
      </div>
        </>
      )}

      {/* TAB: ORDER HISTORY */}
      {activeTab === "history" && (
        <div className="rounded-[2rem] p-8" style={{ background: BG, border: `1px solid ${CARD_TINT}`, boxShadow: "0 1px 3px rgba(46,34,40,0.06)" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "Fraunces, serif", color: INK }}>Riwayat Pesanan</h2>
          {orders.length === 0 ? (
            <div className="text-center py-16"><FaHistory size={40} style={{ color: CARD_TINT }} className="mx-auto mb-3" /><p style={{ color: SAGE }}>Belum ada pesanan</p></div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, i) => {
                const statusColors = order.status === "Paid" ? { bg: "#D4EDDA", color: "#2D6A4F" } : order.status === "Pending" ? { bg: "#FFF3E0", color: AMBER } : { bg: "#FDECEC", color: "#D32F2F" };
                return (
                  <div key={order.id || i} className="rounded-2xl p-5 bg-white" style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: BG_ALT, color: ACCENT }}>{order.invoiceNo}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1" style={{ background: statusColors.bg, color: statusColors.color }}>
                            {order.status === "Paid" ? <FaCheckCircle size={9} /> : order.status === "Pending" ? <FaClock size={9} /> : <FaTimes size={9} />}
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm font-semibold mt-1" style={{ color: INK }}>{order.treatment}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: SAGE }}>
                          <span>{order.date}</span>
                          <span>{order.method}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xl font-bold" style={{ fontFamily: "Fraunces, serif", color: ACCENT }}>{formatRp(order.amount)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* CART DRAWER */}
      {showCart && (
        <div className="fixed inset-0 z-50" onClick={() => setShowCart(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md animate-slide" style={{ background: "#FFFFFF" }} onClick={e => e.stopPropagation()}>
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6" style={{ borderBottom: `1px solid ${CARD_TINT}` }}>
              <div className="flex items-center gap-3">
                <FaShoppingBag size={20} style={{ color: ACCENT }} />
                <div>
                  <h2 className="text-lg font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Shopping Cart</h2>
                  <p className="text-xs" style={{ color: SAGE }}>{cartCount} items</p>
                </div>
              </div>
              <button onClick={() => setShowCart(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: "calc(100vh - 280px)" }}>
              {cart.length === 0 ? (
                <div className="text-center py-16"><FaShoppingBag size={40} style={{ color: CARD_TINT }} className="mx-auto mb-3" /><p style={{ color: SAGE }}>Keranjang kosong</p></div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-2xl" style={{ background: BG, border: `1px solid ${CARD_TINT}` }}>
                      <ProductThumb product={item} size={64} />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm" style={{ color: INK }}>{item.name}</h4>
                        <p className="text-xs" style={{ color: SAGE }}>{formatRp(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaMinus size={8} /></button>
                          <span className="text-sm font-semibold w-7 text-center" style={{ color: INK }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaPlus size={8} /></button>
                        </div>
                      </div>
                      <div className="text-right flex flex-col justify-between">
                        <span className="text-sm font-bold" style={{ color: ACCENT }}>{formatRp(item.price * item.qty)}</span>
                        <button onClick={() => removeFromCart(item.id, item.name)} className="text-xs transition-colors hover:opacity-70" style={{ color: "#D32F2F" }}><FaTrash size={10} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
                <div className="flex justify-between mb-4">
                  <span className="text-sm" style={{ color: SAGE }}>Total</span>
                  <span className="text-xl font-bold" style={{ fontFamily: "Fraunces, serif", color: ACCENT }}>{formatRp(cartTotal)}</span>
                </div>
                <RippleButton onClick={() => { setShowCart(false); setShowCheckout(true); }} className="w-full py-3.5 text-base">
                  <FaCreditCard className="inline mr-2" size={14} />Checkout Now
                </RippleButton>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setShowCheckout(false)}>
          <div className="animate-fade rounded-3xl p-8 max-w-md w-full" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={e => e.stopPropagation()}>              <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: BG_ALT }}><FaCreditCard size={28} style={{ color: ACCENT }} /></div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: INK }}>Confirm Order</h3>
              {bestPromo && (
                <div className="mx-auto w-fit mb-3 px-4 py-2 rounded-xl" style={{ background: "#E8F5E9", color: "#2D6A4F" }}>
                  <FaTags className="inline mr-1" size={11} />
                  <span className="text-xs font-semibold">Promo {bestPromo.code}: {bestPromo.discount} OFF</span>
                </div>
              )}
              <p className="text-sm" style={{ color: SAGE }}>Total pembayaran:</p>
              {promoDiscountAmount > 0 ? (
                <>
                  <p className="text-sm line-through mt-1" style={{ color: SAGE }}>{formatRp(cartTotal)}</p>
                  <p className="text-3xl font-bold mt-1" style={{ fontFamily: "Fraunces, serif", color: "#2D6A4F" }}>{formatRp(finalTotal)}</p>
                  <p className="text-xs mt-1" style={{ color: "#2D6A4F" }}>Anda hemat {formatRp(promoDiscountAmount)}!</p>
                </>
              ) : (
                <p className="text-3xl font-bold mt-2" style={{ fontFamily: "Fraunces, serif", color: ACCENT }}>{formatRp(cartTotal)}</p>
              )}
            </div>
            <div className="space-y-2 mb-6 max-h-32 overflow-y-auto">
              {cart.map(i => (
                <div key={i.id} className="flex justify-between text-xs" style={{ color: SAGE }}>
                  <span>{i.qty}x {i.name}</span>
                  <span className="font-medium" style={{ color: INK }}>{formatRp(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCheckout(false)} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>Cancel</button>
              <RippleButton onClick={handleCheckout} className="flex-1 py-3"><FaCreditCard className="inline mr-1.5" size={12} />Pay Now</RippleButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
