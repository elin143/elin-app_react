import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaBars,
  FaArrowUp,
  FaHeart,
  FaRegHeart,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaStarHalfAlt,
  FaQuoteLeft,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaClinicMedical,
  FaShieldAlt,
  FaTags,
  FaCopy,
} from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";

// ── THEME TOKENS ──
const ACCENT = "#B85C7A";
const INK = "#2E2228";
const SAGE = "#A9748C";
const AMBER = "#8C4A63";
const BG = "#FDF6F8";
const BG_ALT = "#F6E4EB";
const CARD_TINT = "#F1D3DD";

// ── DATA ──
const advantages = [
  { icon: FaUserMd, title: "Dokter Bersertifikat", desc: "Semua dokter kami memiliki sertifikasi resmi dan pengalaman klinis bertahun-tahun." },
  { icon: FaClinicMedical, title: "Teknologi Terkini", desc: "Peralatan dermatologi modern untuk diagnosis akurat dan perawatan presisi." },
  { icon: FaHeart, title: "Perawatan Personal", desc: "Setiap rencana perawatan dirancang khusus untuk kebutuhan kulit unikmu." },
  { icon: FaShieldAlt, title: "Keamanan Terjamin", desc: "Standar steril ketat dan produk BPOM untuk keselamatan pasien." },
];

const services = [
  {
    title: "Facial Treatment",
    shortDesc: "Perawatan wajah mendalam untuk kulit sehat dan glowing dari dalam.",
    fullDesc:
      "Menggunakan teknologi pembersihan mutakhir dan serum premium yang diformulasikan khusus untuk jenis kulitmu. Termasuk ekstraksi komedo, masker terapi, dan pijat wajah relaksasi. Hasil langsung terlihat setelah satu sesi.",
    tag: "Paling diminati",
    price: "Rp 350K",
    duration: "60 menit",
  },
  {
    title: "Skin Consultation",
    shortDesc: "Konsultasi langsung dengan dokter spesialis kulit bersertifikat.",
    fullDesc:
      "Analisis mendalam kondisi kulit menggunakan alat dermatoskop digital. Dokter akan memeriksa tekstur, kelembapan, pigmentasi, dan elastisitas kulitmu. Dapatkan rekomendasi perawatan dan produk yang tepat.",
    tag: "Langkah pertama",
    price: "Rp 150K",
    duration: "30 menit",
  },
  {
    title: "Laser Treatment",
    shortDesc: "Teknologi laser modern untuk masalah kulit yang lebih spesifik.",
    fullDesc:
      "Mengatasi bekas jerawat, flek hitam, pori-pori besar, hingga tanda penuaan dengan laser fraksional CO2 dan IPL. Prosedur aman dengan downtime minimal dan hasil optimal dalam 3-5 sesi.",
    tag: "Teknologi terkini",
    price: "Rp 850K",
    duration: "45 menit",
  },
];

const doctors = [
  { name: "Dr. Amanda Putri", specialty: "Dermatologist", years: "12 thn", rating: 4.9, patients: 1200 },
  { name: "Dr. Sarah Wijaya", specialty: "Beauty Specialist", years: "8 thn", rating: 4.8, patients: 850 },
  { name: "Dr. Jessica Lim", specialty: "Skin Expert", years: "10 thn", rating: 4.9, patients: 980 },
];

const testimonials = [
  { name: "Rina A.", text: "Setelah 3 bulan rutin konsultasi, jerawatku hilang total. Dr. Amanda sangat telaten dan perawatannya nyaman banget!", rating: 5, treatment: "Facial Treatment" },
  { name: "Dewi S.", text: "Laser treatment di sini benar-benar mengubah hidupku. Flek hitam membandel akhirnya pudar. Worth every rupiah!", rating: 5, treatment: "Laser Treatment" },
  { name: "Maya K.", text: "Konsultasi pertama gratis dan dokternya gak buru-buru ngejelasin. Aku jadi paham banget kondisi kulitku.", rating: 4.5, treatment: "Skin Consultation" },
  { name: "Siska P.", text: "Sudah 1 tahun jadi member, kulitku jauh lebih sehat dan glowing. Perawatannya konsisten dan dokternya selalu ingat riwayat kulitku.", rating: 5, treatment: "Membership" },
];

const stats = [
  { icon: FaUsers, value: 3245, suffix: "+", label: "Pasien Puas" },
  { icon: GiWaterDrop, value: 120, suffix: "+", label: "Jenis Perawatan" },
  { icon: FaUserMd, value: 15, suffix: "", label: "Dokter Spesialis" },
  { icon: FaCalendarCheck, value: 10, suffix: "K+", label: "Janji Temu" },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Tentang Kami", href: "#about" },
  { label: "Keunggulan", href: "#advantages" },
  { label: "Layanan", href: "#services" },
  { label: "Produk", href: "#products" },
  { label: "Promo", href: "#promo" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#contact" },
];

// ── HOOK: Count-up animation ──
function useCountUp(target, duration = 2000, trigger) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}

// ── COMPONENT: Ripple Button ──
function RippleButton({ children, onClick, variant, className, disabled, type, style: extraStyle }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    onClick?.(e);
  };

  const isPrimary = variant !== "outline";

  return (
    <button
      type={type || "button"}
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${
        isPrimary ? "text-white hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0" : "border hover:bg-white active:bg-stone-50"
      } ${className || ""}`}
      style={{
        background: isPrimary ? ACCENT : "transparent",
        borderColor: !isPrimary ? "#E3B9C8" : undefined,
        color: !isPrimary ? INK : undefined,
        "--tw-ring-color": ACCENT,
        ...(extraStyle || {}),
      }}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full animate-ripple"
          style={{
            left: r.x - 20,
            top: r.y - 20,
            width: 40,
            height: 40,
            background: isPrimary ? "rgba(255,255,255,0.35)" : "rgba(184,92,122,0.15)",
          }}
        />
      ))}
      {children}
    </button>
  );
}

// ── COMPONENT: Star Rating ──
function StarRating({ rating, size }) {
  const s = size || 14;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} size={s} color="#E8B44F" />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} size={s} color="#E8B44F" />);
    else stars.push(<FaStar key={i} size={s} color="#E7D6DD" />);
  }
  return <div className="flex gap-0.5">{stars}</div>;
}

// ── COMPONENT: Service Card ──
function ServiceCard({ service, onBook }) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div
      className="rounded-2xl p-7 bg-white flex flex-col transition-all duration-300 hover:-translate-y-1.5"
      style={{ boxShadow: "0 4px 16px rgba(43,36,32,0.07)", border: `1px solid ${CARD_TINT}` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-medium tracking-wide uppercase px-2.5 py-1 rounded-full" style={{ background: BG_ALT, color: ACCENT }}>
          {service.tag}
        </span>
        <button
          onClick={() => setSaved(!saved)}
          className="transition-transform hover:scale-125"
          aria-label={saved ? "Hapus dari favorit" : "Simpan ke favorit"}
        >
          {saved ? <FaHeart size={18} color={ACCENT} /> : <FaRegHeart size={18} color={SAGE} />}
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Fraunces, serif" }}>
        {service.title}
      </h3>
      <p className="text-stone-600 text-sm leading-relaxed flex-1">{expanded ? service.fullDesc : service.shortDesc}</p>

      <div className="flex items-center gap-3 mt-4 mb-1">
        <span className="text-lg font-semibold" style={{ fontFamily: "Fraunces, serif", color: ACCENT }}>
          {service.price}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: BG_ALT, color: SAGE }}>
          {service.duration}
        </span>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-sm font-medium flex items-center gap-1 transition-colors hover:opacity-70"
        style={{ color: SAGE }}
      >
        {expanded ? (
          <>
            <FaChevronUp size={12} /> Lebih sedikit
          </>
        ) : (
          <>
            <FaChevronDown size={12} /> Selengkapnya
          </>
        )}
      </button>

      <RippleButton onClick={onBook} className="mt-4 py-3 rounded-full w-full text-sm">
        Booking Sekarang
      </RippleButton>
    </div>
  );
}

// ── COMPONENT: Doctor Card ──
function DoctorCard({ doctor, onBook }) {
  const initials = doctor.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className="rounded-2xl p-7 text-center bg-white transition-all duration-300 hover:-translate-y-1.5 group"
      style={{ boxShadow: "0 4px 16px rgba(43,36,32,0.07)", border: `1px solid ${CARD_TINT}` }}
    >
      <div
        className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-semibold relative transition-transform group-hover:scale-105"
        style={{ background: CARD_TINT, color: AMBER, fontFamily: "Fraunces, serif" }}
      >
        {initials}
        <div
          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white"
          style={{ background: ACCENT }}
        >
          {"\u2713"}
        </div>
      </div>

      <h3 className="font-semibold text-lg">{doctor.name}</h3>
      <p className="text-stone-500 text-sm mt-0.5">{doctor.specialty}</p>

      <div className="flex items-center justify-center gap-1 mt-2">
        <StarRating rating={doctor.rating} size={13} />
        <span className="text-xs font-medium ml-1" style={{ color: SAGE }}>
          {doctor.rating}
        </span>
      </div>

      <p className="text-xs mt-2 inline-block px-3 py-1 rounded-full" style={{ background: BG_ALT, color: SAGE }}>
        {doctor.years} pengalaman \u00b7 {doctor.patients}+ pasien
      </p>

      <RippleButton
        onClick={onBook}
        variant="outline"
        className="mt-5 py-2.5 rounded-full w-full text-sm"
      >
        Booking Dokter
      </RippleButton>
    </div>
  );
}

// ── MAIN COMPONENT ──
const GuestDashboard = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [toast, setToast] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const prevCarouselRef = useRef(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); // idle | loading | success | error

  const statsRef = useRef(null);
  const count1 = useCountUp(3245, 2000, statsVisible);
  const count2 = useCountUp(120, 1500, statsVisible);
  const count3 = useCountUp(15, 1200, statsVisible);
  const count4 = useCountUp(10, 1400, statsVisible);
  const statCounts = [count1, count2, count3, count4];

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for stats count-up
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Toast notification
  const handleBook = useCallback(
    (doctorName) => {
      const msg = doctorName
        ? `Booking dengan ${doctorName} dikirim! Silakan login untuk melanjutkan.`
        : "Silakan login terlebih dahulu untuk booking.";
      setToast(msg);
      setTimeout(() => setToast(null), 2500);
      setTimeout(() => navigate("/login"), 800);
    },
    [navigate]
  );

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Scrollspy + fadeInUp animations
  useEffect(() => {
    const sectionIds = ["home", "about", "advantages", "services", "products", "doctors", "testimonials", "promo", "faq", "contact"];
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
          if (entry.isIntersecting && !el.classList.contains("animated")) {
            el.classList.add("animated");
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Carousel auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => {
        prevCarouselRef.current = prev;
        return (prev + 1) % (testimonials.length + 1);
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Track prev carousel index for transition disable
  const handleCarouselChange = (newIndex) => {
    prevCarouselRef.current = carouselIndex;
    setCarouselIndex(newIndex);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToSection = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen scroll-smooth" style={{ background: BG, color: INK, fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes ripple { to { transform: scale(8); opacity: 0; } }
        @keyframes toast-in {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse-wa {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          50% { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
        }
        .animate-ripple { animation: ripple 0.6s ease-out forwards; }
        .animate-toast { animation: toast-in 0.3s ease-out; }
        .section-hidden { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .animated { opacity: 1 !important; transform: translateY(0) !important; }
        .pulse-wa { animation: pulse-wa 3s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .section-hidden { opacity: 1; transform: none; transition: none; }
          .pulse-wa { animation: none; }
        }
      `}</style>

      {/* LOADING */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-400" style={{ background: BG }}>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: "Fraunces, serif", color: INK }}>BeautyCare</h2>
            <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: SAGE }}>BeautyCare CRM</p>
            <div className="w-8 h-8 rounded-full mx-auto border-2 border-transparent" style={{ borderTopColor: ACCENT, borderRightColor: CARD_TINT, animation: "spin 0.8s linear infinite" }} />
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-toast px-6 py-3.5 rounded-full text-white text-sm font-medium shadow-xl"
          style={{ background: INK }}
        >
          {toast}
        </div>
      )}

      {/* NAV */}
      <nav
        className="sticky top-0 z-40 backdrop-blur-lg"
        style={{ background: "rgba(253, 246, 248, 0.85)", borderBottom: `1px solid ${CARD_TINT}` }}
      >
        <div className="flex items-center justify-between px-6 md:px-14 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="text-xl tracking-tight font-semibold hover:opacity-80 transition-opacity"
            style={{ fontFamily: "Fraunces, serif", color: INK }}
          >
            BeautyCare
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium transition-colors hover:opacity-70 relative"
                style={{ color: activeSection === link.href.replace("#", "") ? ACCENT : INK, fontWeight: activeSection === link.href.replace("#", "") ? 600 : 500 }}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <RippleButton
              variant="outline"
              onClick={() => navigate("/login")}
              className="px-5 py-2.5 rounded-full text-sm"
            >
              Login
            </RippleButton>
            <RippleButton onClick={() => navigate("/register")} className="px-5 py-2.5 rounded-full text-sm">
              Daftar
            </RippleButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-white"
            aria-label="Buka menu"
          >
            <FaBars size={22} color={INK} />
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden px-6 pb-6 pt-2 space-y-4" style={{ background: BG }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left py-2 text-sm font-medium"
                style={{ color: INK }}
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <RippleButton
                variant="outline"
                onClick={() => { setMobileOpen(false); navigate("/login"); }}
                className="flex-1 py-2.5 rounded-full text-sm"
              >
                Login
              </RippleButton>
              <RippleButton
                onClick={() => { setMobileOpen(false); navigate("/register"); }}
                className="flex-1 py-2.5 rounded-full text-sm"
              >
                Daftar
              </RippleButton>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="section-hidden px-6 md:px-14 pt-12 pb-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center" style={{ background: `linear-gradient(135deg, ${BG} 0%, ${BG_ALT} 100%)` }}>
        <div>
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: SAGE }}>
            Klinik kecantikan & dermatologi
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] font-semibold" style={{ fontFamily: "Fraunces, serif" }}>
            Kulit sehat dimulai dari{" "}
            <span style={{ color: ACCENT }}>diagnosis yang tepat.</span>
          </h1>
          <p className="mt-6 text-stone-600 text-base md:text-lg max-w-md leading-relaxed">
            Konsultasikan kondisi kulitmu dengan dokter spesialis dan dapatkan rencana perawatan yang benar-benar dirancang untukmu, bukan
            untuk semua orang.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <RippleButton onClick={() => navigate("/register")} className="px-8 py-4 rounded-full text-base">
              Booking Sekarang
            </RippleButton>
            <RippleButton
              variant="outline"
              onClick={() => navigate("/login")}
              className="px-8 py-4 rounded-full"
            >
              Login
            </RippleButton>
            <p className="text-xs mt-2" style={{ color: SAGE }}>Tidak perlu kartu kredit · Konsultasi pertama gratis</p>
          </div>
        </div>

        {/* Diagnostic rings */}
        <div className="flex justify-center">
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full" style={{ border: `1px dashed ${SAGE}55` }} />
            <div className="absolute w-[78%] h-[78%] rounded-full" style={{ border: `1px dashed ${ACCENT}55` }} />
            <div className="absolute w-[52%] h-[52%] rounded-full" style={{ background: CARD_TINT }} />
            <div className="relative z-10 text-center px-6">
              <p className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif", color: AMBER }}>
                98%
              </p>
              <p className="text-xs text-stone-600 mt-1 leading-snug">pasien melihat perbaikan kulit dalam 8 minggu</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center -mt-4 md:hidden">
          <span className="text-xs px-4 py-2 rounded-full" style={{ background: BG_ALT, color: SAGE }}>Dipercaya 3.000+ pasien sejak 2020</span>
        </div>
      </section>

      {/* TENTANG KAMI */}
      <section id="about" className="section-hidden px-6 md:px-14 py-16" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2" style={{ color: SAGE }}>
            Tentang Kami
          </p>
          <h2 className="text-3xl font-semibold mb-10" style={{ fontFamily: "Fraunces, serif" }}>
            Mengenal BeautyCare Clinic
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                BeautyCare Clinic adalah klinik kecantikan dan dermatologi modern yang berdedikasi untuk memberikan perawatan kulit terbaik dengan pendekatan ilmiah dan personal. Sejak berdiri, kami telah melayani ribuan pasien dengan standar medis tertinggi.
              </p>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                Kami percaya bahwa setiap kulit itu unik. Oleh karena itu, setiap rencana perawatan dirancang khusus berdasarkan diagnosis mendalam terhadap kondisi dan kebutuhan kulit masing-masing pasien — bukan sekadar solusi satu ukuran untuk semua.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: "Dokter Spesialis", desc: "Tim dokter kulit bersertifikat dengan pengalaman klinis bertahun-tahun." },
                { label: "Teknologi Modern", desc: "Peralatan dermatologi terkini untuk diagnosis akurat dan perawatan efektif." },
                { label: "Perawatan Personal", desc: "Setiap pasien mendapatkan rencana perawatan yang disesuaikan dengan kebutuhan uniknya." },
              ].map((v) => (
                <div key={v.label} className="flex items-start gap-3 p-4 rounded-xl bg-white transition-all duration-300 hover:-translate-y-0.5" style={{ border: `1px solid ${CARD_TINT}` }}>
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: ACCENT }} />
                  <div>
                    <h4 className="font-semibold text-sm mb-0.5">{v.label}</h4>
                    <p className="text-stone-500 text-xs leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* KEUNGGULAN */}
      <section id="advantages" className="section-hidden px-6 md:px-14 py-16" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2" style={{ color: SAGE }}>
            Keunggulan
          </p>
          <h2 className="text-3xl font-semibold mb-10" style={{ fontFamily: "Fraunces, serif" }}>
            Mengapa memilih BeautyCare?
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {advantages.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6 bg-white text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-1.5"
                style={{ boxShadow: "0 4px 16px rgba(43,36,32,0.07)", border: `1px solid ${CARD_TINT}` }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: BG_ALT }}>
                  <Icon size={28} color={ACCENT} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "Fraunces, serif" }}>
                  {title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" ref={statsRef} className="section-hidden px-6 md:px-14 py-16 max-w-7xl mx-auto">
        <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2" style={{ color: SAGE }}>
          Angka berbicara
        </p>
        <h2 className="text-3xl font-semibold mb-10" style={{ fontFamily: "Fraunces, serif" }}>
          Dipercaya ribuan pasien
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map(({ icon: Icon, suffix, label }, i) => (
            <div
              key={label}
              className="rounded-2xl p-6 bg-white transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 4px 16px rgba(43,36,32,0.07)", border: `1px solid ${CARD_TINT}` }}
            >
              <Icon className="text-2xl mb-3" style={{ color: ACCENT }} />
              <h3 className="text-2xl font-semibold" style={{ fontFamily: "Fraunces, serif" }}>
                {statsVisible ? statCounts[i].toLocaleString() : "0"}
                {suffix}
              </h3>
              <p className="text-stone-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-hidden px-6 md:px-14 py-16" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2" style={{ color: SAGE }}>
            Layanan unggulan
          </p>
          <h2 className="text-3xl font-semibold mb-10" style={{ fontFamily: "Fraunces, serif" }}>
            Perawatan unggulan kami
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} onBook={() => handleBook(null)} />
            ))}
          </div>
        </div>
      </section>

      {/* PRODUK */}
      <section id="products" className="section-hidden px-6 md:px-14 py-16 max-w-7xl mx-auto">
        <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2" style={{ color: SAGE }}>
          Produk
        </p>
        <h2 className="text-3xl font-semibold mb-10" style={{ fontFamily: "Fraunces, serif" }}>
          Skincare pilihan dokter kami
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Brightening Serum", category: "Serum", price: "Rp 250K", desc: "Mencerahkan kulit kusam dan menyamarkan noda hitam.", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop" },
            { name: "Hydra Moisturizer", category: "Pelembap", price: "Rp 180K", desc: "Melembapkan intensif seharian, cocok untuk semua jenis kulit.", img: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=300&fit=crop" },
            { name: "Sunscreen SPF 50", category: "Pelindung", price: "Rp 150K", desc: "Perlindungan maksimal dari UVA/UVB, ringan tanpa whitecast.", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop" },
            { name: "Retinol Night Cream", category: "Perawatan", price: "Rp 320K", desc: "Krim malam dengan retinol untuk regenerasi kulit saat tidur.", img: "https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=400&h=300&fit=crop" },
          ].map((product, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
              style={{ boxShadow: "0 4px 16px rgba(43,36,32,0.07)", border: `1px solid ${CARD_TINT}` }}
            >
              <div className="w-full h-48 overflow-hidden relative" style={{ background: CARD_TINT }}>
                <img
                  src={product.img}
                  alt={product.name}
                  loading="lazy"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                />
                <div className="absolute inset-0 items-center justify-center" style={{ display: "none" }}>
                  <GiWaterDrop size={40} color={SAGE} />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
              <span className="text-xs font-medium tracking-wide uppercase px-2.5 py-1 rounded-full self-start mb-2" style={{ background: BG_ALT, color: SAGE }}>
                {product.category}
              </span>
              <h3 className="text-lg font-semibold mb-1.5" style={{ fontFamily: "Fraunces, serif" }}>
                {product.name}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed flex-1 mb-3">{product.desc}</p>
              <p className="text-lg font-semibold" style={{ fontFamily: "Fraunces, serif", color: ACCENT }}>
                {product.price}
              </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors" className="section-hidden px-6 md:px-14 py-16" style={{ background: BG_ALT }}>
        <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2" style={{ color: SAGE }}>
          Tim kami
        </p>
        <h2 className="text-3xl font-semibold mb-10" style={{ fontFamily: "Fraunces, serif" }}>
          Dokter spesialis terpercaya
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.name} doctor={doctor} onBook={() => handleBook(doctor.name)} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS — CAROUSEL */}
      <section id="testimonials" className="section-hidden px-6 md:px-14 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2" style={{ color: SAGE }}>
            Testimoni
          </p>
          <h2 className="text-3xl font-semibold mb-10" style={{ fontFamily: "Fraunces, serif" }}>
            Cerita dari pasien kami
          </h2>

          <div className="relative overflow-hidden">
            <div
              className="flex transition duration-500 ease-out"
              style={{
                transform: `translateX(-${carouselIndex * 100}%)`,
                transition: (carouselIndex === 0 && prevCarouselRef.current === testimonials.length) ? "none" : "transform 0.5s ease-out",
              }}
            >
              {[...testimonials, testimonials[0]].map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div
                    className="rounded-2xl p-8 bg-white flex flex-col text-left transition-all duration-300"
                    style={{ boxShadow: "0 4px 16px rgba(43,36,32,0.07)", border: `1px solid ${CARD_TINT}` }}
                  >
                    <FaQuoteLeft size={32} color={ACCENT} style={{ opacity: 0.15 }} className="mb-4" />
                    <p className="text-stone-600 text-sm md:text-base leading-relaxed flex-1 mb-6">{t.text}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs" style={{ color: SAGE }}>{t.treatment}</p>
                      </div>
                      <StarRating rating={t.rating} size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={() => handleCarouselChange((carouselIndex - 1 + testimonials.length + 1) % (testimonials.length + 1))}
              aria-label="Testimoni sebelumnya"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transition hover:scale-105"
              style={{ border: `1px solid ${CARD_TINT}` }}
            >
              <FaChevronDown size={16} color={INK} style={{ transform: "rotate(90deg)" }} />
            </button>
            <button
              onClick={() => handleCarouselChange((carouselIndex + 1) % (testimonials.length + 1))}
              aria-label="Testimoni selanjutnya"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transition hover:scale-105"
              style={{ border: `1px solid ${CARD_TINT}` }}
            >
              <FaChevronDown size={16} color={INK} style={{ transform: "rotate(-90deg)" }} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleCarouselChange(i)}
                aria-label={`Testimoni ${i + 1}`}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{ background: carouselIndex === i ? ACCENT : CARD_TINT }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section id="promo" className="section-hidden px-6 md:px-14 py-16" style={{ background: BG_ALT }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2" style={{ color: SAGE }}>
            Promo
          </p>
          <h2 className="text-3xl font-semibold mb-10" style={{ fontFamily: "Fraunces, serif" }}>
            Penawaran spesial untukmu
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "First Timer Glow", discount: "20%", code: "GLOW20", desc: "Diskon 20% untuk pasien baru di kunjungan pertama.", cta: "Klaim Promo", action: () => { navigator.clipboard.writeText("GLOW20"); setToast("Kode GLOW20 disalin! Lanjutkan ke registrasi."); setTimeout(() => navigate("/register"), 1200); } },
              { title: "Weekend Beauty", discount: "15%", code: "WEEKEND15", desc: "Perawatan facial & laser spesial setiap akhir pekan.", cta: "Lihat Jadwal", action: () => { navigator.clipboard.writeText("WEEKEND15"); setToast("Kode WEEKEND15 disalin! Login untuk booking."); setTimeout(() => navigate("/login"), 1200); } },
              { title: "Referral Bonus", discount: "10%", code: "REFER10", desc: "Ajak teman dan dapatkan diskon untuk kalian berdua.", cta: "Ajak Teman", action: () => { navigator.clipboard.writeText("REFER10"); setToast("Kode REFER10 disalin! Bagikan ke temanmu."); } },
            ].map((promo, i) => (
              <div
                key={i}
                className="rounded-2xl p-7 bg-white flex flex-col relative transition-all duration-300 hover:-translate-y-1.5"
                style={{ boxShadow: "0 4px 16px rgba(43,36,32,0.07)", border: `1px solid ${CARD_TINT}` }}
              >
                <span
                  className="absolute -top-3 -right-3 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
                  style={{ background: ACCENT }}
                >
                  {promo.discount} OFF
                </span>

                <FaTags size={28} color={ACCENT} className="mb-4" />
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "Fraunces, serif" }}>
                  {promo.title}
                </h3>
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-lg mb-3" style={{ background: BG_ALT }}>
                  <FaCopy size={11} color={SAGE} />
                  <span className="text-xs font-mono font-medium" style={{ color: SAGE }}>{promo.code}</span>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed flex-1 mb-5">{promo.desc}</p>
                <RippleButton onClick={promo.action} className="py-3 rounded-full w-full text-sm">
                  {promo.cta}
                </RippleButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="newsletter" className="section-hidden px-6 md:px-14 py-16" style={{ background: BG_ALT }}>
        <div className="max-w-lg mx-auto text-center">
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2" style={{ color: SAGE }}>
            Newsletter
          </p>
          <h2 className="text-3xl font-semibold mb-3" style={{ fontFamily: "Fraunces, serif" }}>
            Dapatkan tips skincare & promo terbaru
          </h2>
          <p className="text-stone-600 text-sm mb-6">Subscribe untuk menerima tips perawatan kulit, info promo, dan update dari BeautyCare Clinic.</p>
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(newsletterEmail)) {
                setToast("Email tidak valid, coba lagi.");
                setTimeout(() => setToast(null), 2500);
                return;
              }
              setNewsletterStatus("loading");
              setTimeout(() => {
                setNewsletterStatus("success");
                setNewsletterEmail("");
                setToast("Berlangganan berhasil! Cek email kamu.");
                setTimeout(() => { setToast(null); setNewsletterStatus("idle"); }, 2500);
              }, 1200);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Masukkan email kamu..."
              required
              aria-label="Email untuk newsletter"
              className="flex-1 px-5 py-3 rounded-full outline-none text-sm transition focus:ring-2"
              style={{ border: `1px solid ${CARD_TINT}`, "--tw-ring-color": ACCENT }}
            />
            <RippleButton
              type="submit"
              disabled={newsletterStatus === "loading"}
              className="px-6 py-3 rounded-full text-sm whitespace-nowrap"
            >
              {newsletterStatus === "loading" ? "Mengirim..." : "Subscribe"}
            </RippleButton>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-hidden px-6 md:px-14 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2" style={{ color: SAGE }}>
            FAQ
          </p>
          <h2 className="text-3xl font-semibold mb-10" style={{ fontFamily: "Fraunces, serif" }}>
            Pertanyaan yang sering diajukan
          </h2>

          <div className="space-y-1">
            {[
              { q: "Apakah konsultasi pertama gratis?", a: "Ya, konsultasi pertama bersama dokter spesialis kami tidak dikenakan biaya. Kamu bisa langsung booking melalui tombol \"Booking Sekarang\" di halaman ini." },
              { q: "Berapa lama satu sesi treatment berlangsung?", a: "Tergantung jenis treatment: konsultasi kulit sekitar 30 menit, facial treatment sekitar 60 menit, dan laser treatment sekitar 45 menit per sesi." },
              { q: "Apakah produk skincare yang dijual aman?", a: "Semua produk skincare kami telah terdaftar di BPOM dan melalui uji dermatologi ketat. Kami hanya menjual produk yang direkomendasikan langsung oleh dokter kami." },
              { q: "Bagaimana cara booking appointment?", a: "Klik tombol \"Booking Sekarang\" di mana saja di halaman ini, lalu daftar akun atau login. Setelah itu kamu bisa memilih treatment dan jadwal yang diinginkan." },
              { q: "Apakah bisa reschedule atau cancel booking?", a: "Ya, kamu bisa mengubah atau membatalkan jadwal appointment maksimal 24 jam sebelum waktu yang dijadwalkan melalui dashboard member." },
              { q: "Apakah menerima pembayaran dengan asuransi?", a: "Saat ini kami menerima pembayaran melalui tunai, transfer bank, dan kartu kredit/debit. Untuk pertanggungan asuransi, silakan konsultasikan dengan provider asuransimu terlebih dahulu." },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-xl transition-all duration-200"
                style={{ borderBottom: `1px solid ${CARD_TINT}` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full flex items-center justify-between py-4 px-3 text-left rounded-xl transition-colors hover:bg-white"
                >
                  <span className="text-sm font-medium pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <FaChevronUp size={14} color={SAGE} className="flex-shrink-0" />
                  ) : (
                    <FaChevronDown size={14} color={SAGE} className="flex-shrink-0" />
                  )}
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openFaq === i ? "500px" : "0px",
                    opacity: openFaq === i ? 1 : 0,
                  }}
                >
                  <p className="text-stone-600 text-sm leading-relaxed px-3 pb-4">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-hidden px-6 md:px-14 py-24 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight" style={{ fontFamily: "Fraunces, serif" }}>
          Kulitmu pantas mendapat perhatian yang tepat.
        </h2>
        <p className="mt-4 text-stone-600 max-w-md mx-auto text-sm md:text-base">
          Gabung membership untuk diskon konsultasi, prioritas booking, dan program perawatan jangka panjang.
        </p>
        <RippleButton onClick={() => navigate("/register")} className="mt-8 px-8 py-3.5 rounded-full text-base">
          Gabung Membership Sekarang
        </RippleButton>
      </section>

      {/* KONTAK */}
      <section id="contact" className="section-hidden px-6 md:px-14 py-16 max-w-7xl mx-auto" style={{ background: BG_ALT }}>
        <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2" style={{ color: SAGE }}>
          Kontak
        </p>
        <h2 className="text-3xl font-semibold mb-10" style={{ fontFamily: "Fraunces, serif" }}>
          Hubungi kami
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info Kontak */}
          <div className="space-y-4">
            {[
              { label: "Alamat", value: "Jl. Kecantikan No. 123, Jakarta Selatan" },
              { label: "Telepon", value: "+62 812-3456-7890" },
              { label: "Email", value: "hello@beautycare.id" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: ACCENT }} />
                <div>
                  <p className="text-xs font-medium tracking-wide uppercase" style={{ color: SAGE }}>{item.label}</p>
                  <p className="text-sm text-stone-600 mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: ACCENT }} />
              <div>
                <p className="text-xs font-medium tracking-wide uppercase" style={{ color: SAGE }}>Jam Operasional</p>
                <p className="text-sm text-stone-600 mt-0.5">Senin–Sabtu: 09.00–20.00 WIB</p>
                <p className="text-sm text-stone-600">Minggu: 10.00–17.00 WIB</p>
              </div>
            </div>
          </div>

          {/* Google Maps Placeholder */}
          <div
            className="rounded-2xl flex items-center justify-center min-h-[240px]"
            style={{ background: CARD_TINT, border: `1px solid ${SAGE}33` }}
          >
            <div className="text-center px-6">
              <GiWaterDrop size={28} color={SAGE} className="mx-auto mb-2 opacity-60" />
              <p className="text-sm" style={{ color: SAGE }}>Google Maps akan ditampilkan di sini</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: INK }} className="px-6 md:px-14 py-16 text-white">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Perusahaan */}
          <div>
            <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "Fraunces, serif" }}>
              BeautyCare
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Klinik kecantikan dan dermatologi modern. Kulit sehat dimulai dari diagnosis yang tepat.
            </p>
          </div>
          {/* Tautan Cepat */}
          <div>
            <h4 className="font-medium mb-3 text-sm" style={{ color: SAGE }}>Tautan Cepat</h4>
            <ul className="space-y-2 text-stone-400 text-sm">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <button onClick={() => scrollToSection(l.href)} className="hover:text-white transition-colors text-left">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>
          {/* Kontak */}
          <div>
            <h4 className="font-medium mb-3 text-sm" style={{ color: SAGE }}>Kontak</h4>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li>Jl. Kecantikan No. 123</li>
              <li>Jakarta Selatan</li>
              <li>+62 812-3456-7890</li>
              <li>hello@beautycare.id</li>
            </ul>
            <p className="text-stone-400 text-sm mt-2">Senin–Sabtu 09.00–20.00</p>
          </div>
          {/* Sosial + Legal */}
          <div>
            <h4 className="font-medium mb-3 text-sm" style={{ color: SAGE }}>Ikuti Kami</h4>
            <div className="flex items-center gap-3 mb-4">
              <button aria-label="Instagram" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80 border-none cursor-pointer" style={{ background: ACCENT }}>
                <FaInstagram size={16} color="white" />
              </button>
              <button aria-label="Facebook" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80 border-none cursor-pointer" style={{ background: ACCENT }}>
                <FaFacebookF size={16} color="white" />
              </button>
              <button aria-label="WhatsApp" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80 border-none cursor-pointer" style={{ background: ACCENT }}>
                <FaWhatsapp size={16} color="white" />
              </button>
            </div>
            <div className="text-xs text-stone-500 space-y-1 mt-6">
              <button className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-xs text-stone-500 p-0">Kebijakan Privasi</button>
              <br />
              <button className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-xs text-stone-500 p-0">Syarat & Ketentuan</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 text-center text-xs text-stone-500" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {"\u00a9"} 2026 BeautyCare Clinic. Hak Cipta Dilindungi.
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/6281234567890?text=Halo%20BeautyCare%20Clinic"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat kami di WhatsApp"
        className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-50 w-14 h-14 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl pulse-wa group"
        style={{ background: "#25D366" }}
      >
        <FaWhatsapp size={24} color="white" />
        <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none" style={{ color: INK }}>
          Chat kami di WhatsApp
        </span>
      </a>

      {/* BACK TO TOP */}
      <button
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        style={{ background: ACCENT, opacity: showBackTop ? 1 : 0, transform: showBackTop ? "translateY(0)" : "translateY(16px)", pointerEvents: showBackTop ? "auto" : "none" }}
      >
        <FaArrowUp size={18} color="white" />
      </button>

    </div>
  );
};

export default GuestDashboard;
