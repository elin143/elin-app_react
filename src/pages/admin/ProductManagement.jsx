import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import {
  FaSearch, FaFilter, FaEdit, FaTrash, FaPlus, FaEye,
  FaBox, FaTag, FaWarehouse, FaDollarSign, FaTimes, FaSave,
  FaTruck,
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

const mockProducts = [
  { id: "PRD-001", name: "Radiance Glow Serum", category: "Serum", brand: "BeautyLab", price: 185000, stock: 45, supplier: "BeautyLab Indonesia", content: "Vitamin C + Niacinamide", description: "Serum pencerah dengan vitamin C konsentrasi tinggi.", image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee8e39?w=400&h=400&fit=crop" },
  { id: "PRD-002", name: "Hydra Moisturizer SPF30", category: "Moisturizer", brand: "DermaCare", price: 225000, stock: 32, supplier: "DermaCare Official", content: "Hyaluronic Acid + SPF30", description: "Pelembab harian dengan perlindungan UV.", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop" },
  { id: "PRD-003", name: "Acne Clear Toner", category: "Toner", brand: "SkinPure", price: 135000, stock: 8, supplier: "SkinPure Global", content: "Salicylic Acid 2% + Witch Hazel", description: "Toner anti-jerawat untuk kulit berminyak.", image: "https://images.unsplash.com/photo-1596755389378-c31a2a75f0fb?w=400&h=400&fit=crop" },
  { id: "PRD-004", name: "Collagen Night Cream", category: "Moisturizer", brand: "LuxGlow", price: 350000, stock: 20, supplier: "LuxGlow Beauty", content: "Collagen + Retinol", description: "Krim malam anti-aging dengan collagen marine.", image: "https://images.unsplash.com/photo-1601049541289-9b1bcc895e35?w=400&h=400&fit=crop" },
  { id: "PRD-005", name: "Sunscreen Matte SPF50", category: "Sunscreen", brand: "SunGuard", price: 165000, stock: 60, supplier: "SunGuard Official", content: "Zinc Oxide + Niacinamide", description: "Sunscreen matte finish tanpa whitecast.", image: "https://images.unsplash.com/photo-1558618665-4e0c28f018e3?w=400&h=400&fit=crop" },
  { id: "PRD-006", name: "Brightening Mask Sheet", category: "Mask", brand: "GlowUp", price: 45000, stock: 120, supplier: "GlowUp Korea", content: "Glutathione + Aloe Vera", description: "Sheet mask pencerah instan, 1 box 5pcs.", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop" },
  { id: "PRD-007", name: "Eye Cream Retinol", category: "Eye Care", brand: "DermaCare", price: 275000, stock: 15, supplier: "DermaCare Official", content: "Retinol + Peptide", description: "Krim mata anti-kerut dengan encapsulated retinol.", image: "https://images.unsplash.com/photo-1608248543803-ba4f8e6d9e3a?w=400&h=400&fit=crop" },
  { id: "PRD-008", name: "Cleansing Balm", category: "Cleanser", brand: "SkinPure", price: 155000, stock: 40, supplier: "SkinPure Global", content: "Natural Oil + Vitamin E", description: "Pembersih wajah oil-based untuk double cleansing.", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba41136c?w=400&h=400&fit=crop" },
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

const ProductThumb = ({ product, size, showImage }) => {
  const s = size || 48;
  const catColor = categoryColors[product.category] || { bg: BG_ALT, color: ACCENT };
  const initials = product.name.split(" ").slice(0, 2).map(w => w[0]).join("");
  const hasImage = showImage !== false && product.image;

  return (
    <div
      className="rounded-xl flex items-center justify-center flex-shrink-0 font-bold overflow-hidden"
      style={{
        width: s, height: s,
        background: hasImage ? "transparent" : `linear-gradient(135deg, ${catColor.bg}, ${catColor.color}30)`,
        color: catColor.color, fontSize: s * 0.35,
        border: `2px solid ${catColor.color}40`,
      }}
    >
      {hasImage ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      ) : (
        initials
      )}
    </div>
  );
};

export default function ProductManagement() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [products, setProducts] = useState(mockProducts);
  const [deleteModal, setDeleteModal] = useState(null);
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const categories = ["All",...[...new Set(products.map(p => p.category))]];
  const lowStock = products.filter(p => p.stock < 10).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()) || p.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const formatRp = (n) => "Rp " + n.toLocaleString("id-ID");

  const handleEditSave = (updated) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditModal(null);
    showToast(`${updated.name} berhasil diperbarui! ✅`);
  };

  const handleAddProduct = (newProduct) => {
    const id = `PRD-${String(products.length + 1).padStart(3, "0")}`;
    setProducts((prev) => [{ ...newProduct, id }, ...prev]);
    setAddModal(false);
    showToast(`${newProduct.name} berhasil ditambahkan! 🎉`);
  };

  const handleLowStockFilter = () => {
    setCategoryFilter("All");
    setSearch("");
    // toggle: if already showing low stock, reset
    if (search === "!lowstock!") {
      setSearch("");
      showToast("Filter low stock di-reset");
    } else {
      setSearch("!lowstock!");
      showToast("Menampilkan produk low stock (< 10 pcs)");
    }
  };

  const displayFiltered = search === "!lowstock!"
    ? products.filter(p => p.stock < 10)
    : filtered;

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
        <PageHeader title={<div className="space-y-1.5"><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Product Management</p><h1 className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: INK }}>Skincare Products</h1></div>} breadcrumb={[{ label: "Dashboard", to: "/Dashboard" }, { label: "Products" }]}>
          <RippleButton onClick={() => setAddModal(true)} className="px-6 py-3 rounded-full text-sm"><FaPlus className="inline mr-2" size={13} />Add Product</RippleButton>
        </PageHeader>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[{ icon: FaBox, value: products.length, label: "Total Products", color: ACCENT, action: () => { setSearch(""); setCategoryFilter("All"); } },
          { icon: FaWarehouse, value: products.reduce((s,p)=>s+p.stock,0), label: "Total Stock", color: AMBER, action: () => showToast(`Total ${products.reduce((s,p)=>s+p.stock,0)} pcs dari ${products.length} produk`) },
          { icon: FaTag, value: lowStock, label: "Low Stock Alert", color: lowStock > 0 ? "#D32F2F" : SAGE, action: handleLowStockFilter },
          { icon: FaDollarSign, value: formatRp(totalValue), label: "Inventory Value", color: ACCENT, action: () => showToast(`Total nilai inventori: ${formatRp(totalValue)}`) },
        ].map(({ icon: Icon, value, label, color, action }) => (
          <div key={label} onClick={action} className="rounded-2xl p-5 bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") action(); }}
            style={{ boxShadow: "0 1px 3px rgba(46,34,40,0.06)", border: `1px solid ${CARD_TINT}` }}>
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
            <input type="text" placeholder="Cari produk, brand..." value={search === "!lowstock!" ? "" : search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-full outline-none text-sm bg-white transition-all focus:ring-2" style={{ border: "1px solid #E7D6DD", "--tw-ring-color": ACCENT }} />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <FaFilter size={13} style={{ color: SAGE }} className="flex-shrink-0" />
            {categories.map((c) => (
              <button key={c} onClick={() => { setCategoryFilter(c); setSearch(""); }} className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap" style={{ background: categoryFilter === c ? ACCENT : "white", color: categoryFilter === c ? "white" : SAGE, border: `1px solid ${CARD_TINT}` }}>{c}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${CARD_TINT}` }}>
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr style={{ background: BG_ALT }}>
                {["ID","Product","Category","Brand","Price","Stock","Supplier","Ingredient","Actions"].map(h => (
                  <th key={h} className="p-4 text-xs font-semibold uppercase tracking-[0.12em] text-left" style={{ color: SAGE }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayFiltered.map((p) => (
                <tr key={p.id} className="border-b transition-all duration-200 hover:bg-white" style={{ borderColor: CARD_TINT }}>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: BG_ALT, color: ACCENT }}>#{p.id}</span></td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <ProductThumb product={p} size={44} />
                      <div><p className="font-semibold text-sm" style={{ color: INK }}>{p.name}</p><p className="text-xs" style={{ color: SAGE }}>{p.description}</p></div>
                    </div>
                  </td>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: (categoryColors[p.category] || {bg: BG_ALT}).bg, color: (categoryColors[p.category] || {color: ACCENT}).color }}>{p.category}</span></td>
                  <td className="p-4 text-sm font-medium" style={{ color: INK }}>{p.brand}</td>
                  <td className="p-4 text-sm font-semibold" style={{ color: INK }}>{formatRp(p.price)}</td>
                  <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: p.stock < 10 ? "#FDECEC" : "#D4EDDA", color: p.stock < 10 ? "#D32F2F" : "#2D6A4F" }}>{p.stock} pcs</span></td>
                  <td className="p-4 text-xs" style={{ color: SAGE }}>{p.supplier}</td>
                  <td className="p-4 text-xs max-w-[180px] truncate" style={{ color: SAGE }}>{p.content}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setViewModal(p)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ color: ACCENT, border: `1px solid ${CARD_TINT}` }} title="View"><FaEye size={13} /></button>
                      <button onClick={() => setEditModal(p)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white" style={{ color: SAGE, border: `1px solid ${CARD_TINT}` }} title="Edit"><FaEdit size={13} /></button>
                      <button onClick={() => setDeleteModal(p)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-50" style={{ color: "#D32F2F", border: `1px solid ${CARD_TINT}` }} title="Delete"><FaTrash size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs" style={{ color: SAGE }}>
          Menampilkan {displayFiltered.length} dari {products.length} produk
          {search === "!lowstock!" && <span className="ml-2 px-2 py-0.5 rounded-full" style={{ background: "#FDECEC", color: "#D32F2F" }}>⚠ Low Stock Filter Active</span>}
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setViewModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-lg w-full" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Product Detail</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>{viewModal.name}</h3></div>
              <button onClick={() => setViewModal(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <div className="space-y-4">
              <div className="w-full h-56 rounded-2xl flex items-center justify-center overflow-hidden" style={{ background: (categoryColors[viewModal.category] || {bg: BG_ALT}).bg }}>
                {viewModal.image ? (
                  <img src={viewModal.image} alt={viewModal.name} className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                ) : (
                  <ProductThumb product={viewModal} size={96} showImage={false} />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{l:"Category",v:viewModal.category},{l:"Brand",v:viewModal.brand},{l:"Price",v:formatRp(viewModal.price)},{l:"Stock",v:`${viewModal.stock} pcs`},{l:"Supplier",v:viewModal.supplier},{l:"Ingredients",v:viewModal.content}].map(({l,v})=>(
                  <div key={l}><p className="text-xs font-medium mb-0.5" style={{color:SAGE}}>{l}</p><p className="text-sm font-semibold" style={{color:INK}}>{v}</p></div>
                ))}
              </div>
              <div><p className="text-xs font-medium mb-0.5" style={{color:SAGE}}>Description</p><p className="text-sm" style={{color:INK}}>{viewModal.description}</p></div>
              <div className="flex gap-3 pt-4" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
                <button onClick={() => { setViewModal(null); setEditModal(viewModal); }} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaEdit className="inline mr-1.5" size={11} />Edit</button>
                <RippleButton onClick={() => { setViewModal(null); }} className="flex-1 py-3 rounded-full text-sm">Tutup</RippleButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setEditModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Edit Product</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>{editModal.name}</h3></div>
              <button onClick={() => setEditModal(null)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <ProductForm product={editModal} onSave={handleEditSave} onClose={() => setEditModal(null)} submitLabel="Simpan Perubahan" />
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setAddModal(false)}>
          <div className="animate-fade rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div><p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: SAGE }}>Add New Product</p><h3 className="text-xl font-semibold mt-0.5" style={{ fontFamily: "Fraunces, serif", color: INK }}>Produk Baru</h3></div>
              <button onClick={() => setAddModal(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes size={16} /></button>
            </div>
            <ProductForm
              product={{ name: "", category: "Serum", brand: "", price: 0, stock: 0, supplier: "", content: "", description: "" }}
              onSave={handleAddProduct}
              onClose={() => setAddModal(false)}
              submitLabel="Tambah Produk"
              isNew
            />
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(46,34,40,0.4)", backdropFilter: "blur(4px)" }} onClick={() => setDeleteModal(null)}>
          <div className="animate-fade rounded-3xl p-8 max-w-md w-full mx-4" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(46,34,40,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FDECEC" }}><FaTrash size={28} style={{ color: "#D32F2F" }} /></div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: INK }}>Hapus Produk</h3>
              <p className="text-sm" style={{ color: SAGE }}>Yakin hapus <strong>{deleteModal.name}</strong>?</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}>Batal</button>
              <button onClick={() => { setProducts((prev) => prev.filter((p) => p.id !== deleteModal.id)); showToast(`${deleteModal.name} berhasil dihapus!`); setDeleteModal(null); }} className="flex-1 py-3 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95" style={{ background: "#D32F2F" }}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Product Form (shared by Edit & Add) ──
function ProductForm({ product, onSave, onClose, submitLabel, isNew }) {
  const [form, setForm] = useState({
    name: product.name || "",
    category: product.category || "Serum",
    brand: product.brand || "",
    price: String(product.price || ""),
    stock: String(product.stock || ""),
    supplier: product.supplier || "",
    content: product.content || "",
    description: product.description || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      name: form.name,
      category: form.category,
      brand: form.brand,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      supplier: form.supplier,
      content: form.content,
      description: form.description,
    };
    onSave(newProduct);
  };

  const allCategories = ["Serum", "Moisturizer", "Toner", "Sunscreen", "Mask", "Eye Care", "Cleanser", "Essence", "Exfoliator"];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Product Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. Radiance Glow Serum" />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT, background: "#FFFFFF" }}>
            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Brand *</label>
          <input name="brand" value={form.brand} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. BeautyLab" />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Price (Rp) *</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. 185000" />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Stock (pcs) *</label>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. 45" />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}><FaTruck className="inline mr-1" size={10} />Supplier</label>
          <input name="supplier" value={form.supplier} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. BeautyLab Indonesia" />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Ingredients</label>
          <input name="content" value={form.content} onChange={handleChange} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="e.g. Vitamin C + Niacinamide" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: SAGE }}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={2} className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all focus:ring-2 resize-none" style={{ border: `1px solid ${CARD_TINT}`, color: INK, "--tw-ring-color": ACCENT }} placeholder="Deskripsi produk..." />
        </div>
      </div>
      <div className="flex gap-3 pt-4" style={{ borderTop: `1px solid ${CARD_TINT}` }}>
        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-full text-sm font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${CARD_TINT}`, color: SAGE }}><FaTimes className="inline mr-1.5" size={11} />Cancel</button>
        <RippleButton type="submit" className="flex-1 py-3 rounded-full text-sm"><FaSave className="inline mr-1.5" size={12} />{submitLabel || "Simpan"}</RippleButton>
      </div>
    </form>
  );
}
