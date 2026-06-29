# Product Requirements Document (PRD)

## Landing Page Guest — BeautyCare CRM

**Versi:** Final (3.0)
**Tanggal:** 29 Juni 2026
**Status:** Final — Production Ready
**Penulis:** Tim BeautyCare CRM

---

## Daftar Isi

1. [Ringkasan Produk](#1-ringkasan-produk)
2. [Tujuan & Sasaran (Final)](#2-tujuan--sasaran-final)
3. [Target Pengguna](#3-target-pengguna)
4. [Branding & Design System](#4-branding--design-system)
5. [Struktur Halaman (Final)](#5-struktur-halaman-final)
6. [Spesifikasi Section per Section](#6-spesifikasi-section-per-section)
   - [6.1 Loading Screen](#61-loading-screen)
   - [6.2 Navbar](#62-navbar)
   - [6.3 Hero Section](#63-hero-section)
   - [6.4 Tentang Kami](#64-tentang-kami)
   - [6.5 Keunggulan BeautyCare](#65-keunggulan-beautycare)
   - [6.6 Layanan](#66-layanan)
   - [6.7 Produk](#67-produk)
   - [6.8 Statistik Klinik](#68-statistik-klinik)
   - [6.9 Tim Dokter](#69-tim-dokter)
   - [6.10 Testimoni Pelanggan — Carousel](#610-testimoni-pelanggan--carousel)
   - [6.11 Promo / Penawaran Spesial](#611-promo--penawaran-spesial)
   - [6.12 Newsletter Subscription](#612-newsletter-subscription)
   - [6.13 FAQ](#613-faq)
   - [6.14 CTA Section](#614-cta-section)
   - [6.15 Kontak](#615-kontak)
   - [6.16 Footer](#616-footer)
7. [Floating Elements (Final)](#7-floating-elements-final)
8. [Animasi & Micro-interactions (Final)](#8-animasi--micro-interactions-final)
9. [Perilaku & Interaksi](#9-perilaku--interaksi)
10. [Responsivitas (Final)](#10-responsivitas-final)
11. [SEO & Metadata](#11-seo--metadata)
12. [Performa](#12-performa)
13. [Aksesibilitas](#13-aksesibilitas)
14. [Rute & Navigasi](#14-rute--navigasi)
15. [Non-Fungsional Requirements (Final)](#15-non-fungsional-requirements-final)
16. [Matriks Perubahan v2 → Final](#16-matriks-perubahan-v2--final)
17. [Checklist Production Readiness](#17-checklist-production-readiness)

---

## 1. Ringkasan Produk

Landing Page Guest Final adalah **versi production-ready** dari halaman utama BeautyCare CRM. Halaman ini menjadi wajah digital BeautyCare Clinic — etalase lengkap yang siap diakses oleh publik dengan kualitas premium, performa tinggi, aksesibilitas baik, dan SEO optimal. Seluruh fitur dari versi 1.0 dan 2.0 dipertahankan dan disempurnakan.

---

## 2. Tujuan & Sasaran (Final)

| Tujuan | Indikator Keberhasilan |
|--------|------------------------|
| Memperkenalkan brand BeautyCare Clinic | Pengunjung memahami profil klinik dalam < 8 detik |
| Mendorong konversi ke registrasi / login | CTAs jelas di setiap section kunci |
| Memberikan informasi lengkap | 15 section mencakup seluruh aspek klinik |
| Tampil premium & profesional | Desain modern, animasi halus, visual berkualitas |
| Cepat diakses | FCP < 1.2 detik, TTI < 2 detik, bundle < 150KB gzip |
| Aksesibel | WCAG 2.1 AA, semantic HTML, aria-label, kontras minimum |
| SEO optimal | Meta tags, Open Graph, structured data (schema.org) |
| Responsif sempurna | Desktop (≥1024), Tablet (768–1023), Mobile (<768) |
| Siap interaksi instan | Floating WhatsApp, Back to Top, Newsletter |

---

## 3. Target Pengguna

- **Calon pasien** mencari klinik kecantikan & dermatologi
- **Pengunjung baru** tanpa akun
- **Member / Admin** yang ingin login ke dashboard
- **Search engines** (Google, Bing) — landing page terindeks optimal
- **Screen reader users** — aksesibel penuh

---

## 4. Branding & Design System

**Identitas tidak berubah.** Token warna, tipografi, dan tone mengikuti BeautyCare CRM.

### 4.1 Color Tokens

| Token | Hex | Peran |
|-------|-----|-------|
| `ACCENT` | `#B85C7A` | Deep dusty rose — tombol primer, highlight, aksen |
| `INK` | `#2E2228` | Warna teks utama |
| `SAGE` | `#A9748C` | Muted mauve — label, teks sekunder |
| `AMBER` | `#8C4A63` | Deeper berry-rose — variasi aksen, gradient |
| `BG` | `#FDF6F8` | Background utama |
| `BG_ALT` | `#F6E4EB` | Background section bergantian |
| `CARD_TINT` | `#F1D3DD` | Border kartu, separator |
| `WHATSAPP` | `#25D366` | WhatsApp green — floating button |

### 4.2 Tipografi

| Elemen | Font | Weight |
|--------|------|--------|
| Headings (h1–h3) | **Fraunces** (serif) | 400–700 |
| Body, button, label | **Inter** (sans-serif) | 400–600 |
| Label uppercase | Inter | 500, tracking `0.2em` |
| Kode promo | **JetBrains Mono** atau monospace | 500 |

### 4.3 Tone & Visual (Final)

- Estetika: **premium, elegan, modern, feminin, profesional**
- Background section: alternating `BG` ↔ `BG_ALT` konsisten
- Kartu: border `CARD_TINT`, shadow `0 4px 16px rgba(43,36,32,0.07)` (final)
- Tombol primer: background `ACCENT`, text putih, rounded-full, **ripple effect**
- Tombol outline: border `#E3B9C8`, background transparan
- Hover kartu: `-translate-y-1.5` + shadow meningkat + border `ACCENT` tipis
- Gambar produk: **URL foto nyata** dari Unsplash, bukan placeholder
- Transisi: semua 300ms ease-out

---

## 5. Struktur Halaman (Final)

Halaman adalah **single-page** dengan 16 section, smooth-scroll, dan animasi scroll-driven.

```
┌──────────────────────────────────────────────────┐
│  LOADING SCREEN (fade-out 600ms)                 │
├──────────────────────────────────────────────────┤
│  NAVBAR (sticky top, backdrop-blur, scrollspy)   │
│  Logo | Home · Tentang · Keunggulan · Layanan ·  │
│  Produk · Promo · FAQ · Kontak | Login · Daftar  │
├──────────────────────────────────────────────────┤
│  HERO SECTION — Visual premium, CTA menonjol     │
├──────────────────────────────────────────────────┤
│  TENTANG KAMI — 2 kolom profil + values          │
├──────────────────────────────────────────────────┤
│  KEUNGGULAN BEAUTYCARE — 4 kartu ikon            │
├──────────────────────────────────────────────────┤
│  LAYANAN — 3 kartu treatment expandable          │
├──────────────────────────────────────────────────┤
│  PRODUK — 4 kartu skincare + foto nyata          │
├──────────────────────────────────────────────────┤
│  STATISTIK KLINIK — 4 kartu count-up             │
├──────────────────────────────────────────────────┤
│  TIM DOKTER — 3 kartu profil dokter              │
├──────────────────────────────────────────────────┤
│  TESTIMONI — Carousel / slider                   │
├──────────────────────────────────────────────────┤
│  PROMO — 3 kartu diskon                          │
├──────────────────────────────────────────────────┤
│  NEWSLETTER — Form subscribe                     │
├──────────────────────────────────────────────────┤
│  FAQ — Accordion 6 pertanyaan                    │
├──────────────────────────────────────────────────┤
│  CTA SECTION — Ajakan membership                 │
├──────────────────────────────────────────────────┤
│  KONTAK — Info + Maps placeholder                │
├──────────────────────────────────────────────────┤
│  FOOTER — 4 kolom lengkap                        │
│  Logo · Tautan Cepat · Kontak · Sosial · Legal   │
├──────────────────────────────────────────────────┤
│  FLOATING ELEMENTS                               │
│  💬 WhatsApp button (fixed bottom-left)          │
│  ⬆ Back to Top button (fixed bottom-right)      │
└──────────────────────────────────────────────────┘
```

---

## 6. Spesifikasi Section per Section

### 6.1 Loading Screen

**Status:** 🆕 Baru di Final

| Properti | Spesifikasi |
|----------|-------------|
| Durasi | 600ms (atau sampai halaman selesai mount) |
| Visual | Full-screen overlay, background putih/bg, logo BeautyCare di tengah, spinner ringan |
| Logo | "BeautyCare" (Fraunces, INK, 2xl) + tagline SAGE |
| Spinner | Ring CSS animasi (border-top: ACCENT, border: CARD_TINT) — 32px |
| Exit | Fade-out 400ms + pointer-events: none setelah selesai |
| State | `loading` state → false setelah `useEffect` mount |

### 6.2 Navbar

**Status:** ✅ v2 — diperbarui di Final

| Properti | Spesifikasi |
|----------|-------------|
| Posisi | Sticky top, z-40 |
| Background | `rgba(253, 246, 248, 0.9)` + `backdrop-blur-xl` (ditingkatkan) |
| Border bottom | `1px solid CARD_TINT` |
| Logo | **"BeautyCare"** (Fraunces, INK, semibold, text-xl) |
| Tagline | "BeautyCare CRM" (SAGE, 0.2em tracking, text-[10px]) di bawah logo (opsional) |
| Menu | Home, Tentang Kami, Keunggulan, Layanan, Produk, Promo, FAQ, Kontak |
| Menu kanan | **Login** (outline) · **Daftar** (solid ACCENT) |
| **Scrollspy** | 🆕 Menu aktif → warna ACCENT + font-semibold + indicator dot bawah |
| Mobile | Hamburger (FaBars) → drawer penuh vertikal + animasi fade-slide |
| **Shadow on scroll** | 🆕 Saat scroll > 10px, tambah `shadow-sm` pada navbar |

**Menu anchor mapping:**

| Label | Anchor |
|-------|--------|
| Home | Scroll to top |
| Tentang Kami | `#about` |
| Keunggulan | `#advantages` |
| Layanan | `#services` |
| Produk | `#products` |
| Promo | `#promo` |
| FAQ | `#faq` |
| Kontak | `#contact` |

**Scrollspy implementation:**
- IntersectionObserver pada setiap section dengan `threshold: 0.3`
- Saat section ≥30% terlihat di viewport → set active nav item
- Active item: `color: ACCENT`, font-semibold, indicator dot kecil di bawah (8px, rounded-full, ACCENT)

### 6.3 Hero Section

**Status:** ✅ v2 — diperbarui di Final

| Properti | Spesifikasi |
|----------|-------------|
| Layout | Grid 2 kolom (teks kiri, visual kanan) |
| **Background** | 🆕 Gradient subtle: `linear-gradient(135deg, BG 0%, BG_ALT 100%)` |
| **Animasi** | 🆕 Fade-in + slide-up (IntersectionObserver, langsung terlihat di atas fold) |
| Label | "Klinik kecantikan & dermatologi" (SAGE, uppercase, tracking 0.2em) |
| Headline | **H1** Fraunces, 4xl sm:5xl md:6xl, leading-tight. *"Kulit sehat dimulai dari diagnosis yang tepat."* (kata kunci warna `ACCENT`, bold) |
| Deskripsi | 1 paragraf (Inter, stone-600, max-w-md, leading-relaxed) |
| **CTA Primary** 🆕 | **"Booking Sekarang"** — lebih besar: px-8 py-4, text-base, shadow-lg, scale hover: 1.02 |
| **CTA Secondary** 🆕 | **"Login"** — outline, px-8 py-4 |
| **Sub-label CTA** 🆕 | "Tidak perlu kartu kredit · Konsultasi pertama gratis" (text-xs, stone-400) |
| Visual Kanan | 🆕 **Upgrade**: decorative rings tetap, tapi tambah gradient subtle di ring tengah. Statistik "98%" lebih besar (text-4xl). Tambah "Trusted by 3.000+ patients" badge kecil di bawah rings |

### 6.4 Tentang Kami

**Status:** ✅ v2 — dipertahankan

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Label | "Tentang Kami" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Mengenal BeautyCare Clinic"* |
| Layout | Grid 2 kolom (profil kiri, values kanan) |
| Animasi | 🆕 Fade-in + slide-up via IntersectionObserver |
| Values | 3 kartu: Dokter Spesialis, Teknologi Modern, Perawatan Personal |

### 6.5 Keunggulan BeautyCare

**Status:** ✅ v2 — dipertahankan

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG_ALT` |
| Headline | *"Mengapa memilih BeautyCare?"* |
| Layout | Grid 4 kolom (desktop) |
| Data | 4 kartu: Dokter Bersertifikat, Teknologi Terkini, Perawatan Personal, Keamanan Terjamin |
| Animasi | 🆕 Staggered fade-in (delay 100ms per kartu) via IntersectionObserver |
| Ikon | Dalam lingkaran 64px, background BG_ALT, ikon 28px ACCENT |

### 6.6 Layanan

**Status:** ✅ v2 — dipertahankan

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Headline | *"Perawatan unggulan kami"* |
| Layout | Grid 3 kolom |
| Data | 3 treatment: Facial Treatment, Skin Consultation, Laser Treatment |
| Fitur | Expand/collapse deskripsi, favorit (FaHeart), Booking button |
| Animasi | 🆕 Fade-in via IntersectionObserver |

### 6.7 Produk

**Status:** ✅ v2 — **diperbarui di Final**

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG_ALT` |
| Headline | *"Skincare pilihan dokter kami"* |
| Layout | Grid 3 kolom (desktop), 1 kolom (mobile) |
| Data | 4 produk skincare |
| **Gambar** 🆕 | **Foto nyata dari Unsplash**, bukan placeholder ikon |

**Data Produk dengan URL Foto:**

| Produk | Kategori | Harga | URL Gambar |
|--------|----------|-------|------------|
| Brightening Serum | Serum | Rp 250K | `https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop` |
| Hydra Moisturizer | Pelembap | Rp 180K | `https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=300&fit=crop` |
| Sunscreen SPF 50 | Pelindung | Rp 150K | `https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop` |
| Retinol Night Cream | Perawatan | Rp 320K | `https://images.unsplash.com/photo-1570194065650-d99fb4b38cc9?w=400&h=300&fit=crop` |

**Spesifikasi Gambar:**
- Size: w-400 h-300, object-cover
- Container: rounded-xl overflow-hidden
- Loading: `loading="lazy"` untuk lazy load
- Alt text deskriptif (misal: "Brightening Serum BeautyCare")
- **Fallback**: jika gambar gagal load, tampilkan placeholder `CARD_TINT` + GiWaterDrop

**Spesifikasi Kartu:**
- Background putih, border `CARD_TINT`, shadow upgraded
- Gambar: full-width, height 200px, object-cover
- Kategori badge: `BG_ALT` / SAGE
- Nama: Fraunces semibold
- Deskripsi: Inter, text-stone-600, 2 baris max
- Harga: Fraunces semibold, `ACCENT`
- Hover: `-translate-y-1.5`, shadow meningkat, border berubah ke `ACCENT` tipis

### 6.8 Statistik Klinik

**Status:** ✅ v2 — dipertahankan

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Headline | *"Dipercaya ribuan pasien"* |
| Animasi | Count-up via IntersectionObserver |
| Data | 4 statistik: 3.245+ Pasien, 120+ Treatment, 15 Dokter, 10K+ Janji Temu |

### 6.9 Tim Dokter

**Status:** ✅ v2 — dipertahankan

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG_ALT` |
| Data | 3 dokter: Dr. Amanda Putri, Dr. Sarah Wijaya, Dr. Jessica Lim |
| Animasi | 🆕 Staggered fade-in |

### 6.10 Testimoni Pelanggan — Carousel

**Status:** ✅ v2 — **diperbarui di Final**

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Headline | *"Cerita dari pasien kami"* |
| **Layout** 🆕 | **Carousel / slider**, bukan grid statis |
| **Navigasi** 🆕 | Panah kiri/kanan + indicator dots |
| **Auto-scroll** 🆕 | Auto-advance setiap 5 detik, pause saat hover |
| Data | 3 testimoni (bisa diperbanyak 4–5) |

**Spesifikasi Carousel:**
- Container max-w-2xl centered
- Setiap slide: 1 kartu testimoni di tengah
- Kartu: background putih, border CARD_TINT, shadow, padding nyaman
- FaQuoteLeft besar di atas (32px, opacity 0.15, ACCENT)
- Teks testimoni: 3–4 baris maks
- Nama + treatment + StarRating di bawah
- Tombol navigasi: lingkaran kecil (w-10 h-10), background white, border CARD_TINT, ikon FaChevronLeft/FaChevronRight
- Indicator dots: 3 lingkaran kecil, active: ACCENT, inactive: CARD_TINT
- Transisi: translateX smooth (CSS transform + transition)
- **Mobile**: kartu full-width, panah lebih kecil

**Data Testimoni (tambah 1):**

| Nama | Teks | Rating | Treatment |
|------|------|--------|-----------|
| Rina A. | "Setelah 3 bulan rutin konsultasi, jerawatku hilang total..." | ⭐5 | Facial Treatment |
| Dewi S. | "Laser treatment di sini benar-benar mengubah hidupku..." | ⭐5 | Laser Treatment |
| Maya K. | "Konsultasi pertama gratis dan dokternya gak buru-buru..." | ⭐4.5 | Skin Consultation |
| Siska P. | "Sudah 1 tahun jadi member, kulitku jauh lebih sehat..." | ⭐5 | Membership |

### 6.11 Promo / Penawaran Spesial

**Status:** ✅ v2 — dipertahankan

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG_ALT` |
| Data | 3 promo: GLOW20, WEEKEND15, REFER10 |
| Animasi | 🆕 Staggered fade-in |

### 6.12 Newsletter Subscription

**Status:** 🆕 Baru di Final

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Label | "Newsletter" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Dapatkan tips skincare & promo terbaru"* |
| Deskripsi | "Subscribe untuk menerima tips perawatan kulit, info promo, dan update dari BeautyCare Clinic." |
| Layout | Centered, max-w-lg mx-auto |
| Form | Input email (rounded-full, border CARD_TINT) + tombol "Subscribe" (solid ACCENT) berdampingan |
| Validasi | Regex email dasar, toast error jika invalid |
| State | Idle → Loading (spinner di tombol) → Success (toast + reset input) |
| Placeholder | "Masukkan email kamu..." |

**Spesifikasi Form:**
- Input email: px-5 py-3, rounded-full, border CARD_TINT, flex-1
- Tombol: RippleButton "Subscribe", px-6 py-3
- Layout: flex row di desktop, stack di mobile
- Animasi: tombol disable + spinner saat loading
- Success: toast "Berlangganan berhasil! Cek email kamu." + input reset
- Error: toast "Email tidak valid, coba lagi."

### 6.13 FAQ

**Status:** ✅ v2 — dipertahankan

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Headline | *"Pertanyaan yang sering diajukan"* |
| Data | 6 pertanyaan + jawaban |
| Accordion | Expand/collapse, maxHeight animasi |
| **maxHeight** 🆕 | 500px (ditingkatkan dari 200px untuk mobile safety) |

### 6.14 CTA Section

**Status:** ✅ v2 — dipertahankan

| Properti | Spesifikasi |
|----------|-------------|
| Headline | *"Kulitmu pantas mendapat perhatian yang tepat."* |
| CTA | "Gabung Membership Sekarang" → `/register` |

### 6.15 Kontak

**Status:** ✅ v2 — dipertahankan

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG_ALT` |
| Info | Alamat, Telepon, Email, Jam Operasional |
| Maps | Placeholder (siap integrasi Google Maps) |

### 6.16 Footer

**Status:** ✅ v2 — **diperbarui di Final**

| Properti | Spesifikasi |
|----------|-------------|
| Background | `INK` (#2E2228) |
| Layout | Grid 4 kolom (desktop), 2 kolom (tablet), 1 kolom (mobile) |

**Kolom Footer:**

| Kolom | Konten |
|-------|--------|
| **Perusahaan** | Logo "BeautyCare" (Fraunces, putih) + tagline + deskripsi singkat |
| **Tautan Cepat** | Home · Tentang Kami · Layanan · Produk · Promo · FAQ · Kontak · Membership |
| **Kontak** | Alamat lengkap · Telepon · Email · Jam Operasional · Social media icons |
| **Legal** 🆕 | Kebijakan Privasi · Syarat & Ketentuan · Copyright |

**Spesifikasi:**
- Padding: py-16
- Text color: stone-400 untuk body, putih untuk heading
- Link hover: warna `ACCENT`
- Social icons: w-10 h-10, rounded-full, background ACCENT, ikon putih
- Copyright bar: full-width di bawah, border-top 1px rgba(255,255,255,0.1), py-4, text-center
- Copyright teks: `© 2026 BeautyCare Clinic. Hak Cipta Dilindungi.`
- Legal links: text-xs, di bawah copyright atau di kolom legal

---

## 7. Floating Elements (Final)

### 7.1 WhatsApp Floating Button

**Status:** 🆕 Baru di Final

| Properti | Spesifikasi |
|----------|-------------|
| Posisi | Fixed bottom-6 left-6, z-50 |
| Ikon | FaWhatsapp, putih, 24px |
| Background | `#25D366` (WhatsApp green) |
| Shape | Rounded-full, w-14 h-14 |
| Shadow | shadow-lg |
| Animasi | Pulse ringan setiap 3 detik (opsional) |
| Hover | Scale 1.1, shadow-xl |
| **Tooltip** 🆕 | Saat hover, muncul bubble "Chat kami di WhatsApp" di sebelah kanan |
| Link | `https://wa.me/6281234567890?text=Halo%20BeautyCare%20Clinic` |
| Target | `_blank`, `rel="noopener noreferrer"` |
| **Mobile** | Bottom-4 left-4, w-12 h-12 (sedikit lebih kecil) |

### 7.2 Back to Top Button

**Status:** ✅ Sudah ada — diperbarui di Final

| Properti | Spesifikasi |
|----------|-------------|
| Posisi | Fixed bottom-6 right-6, z-50 |
| Muncul | Saat scrollY > 600px |
| Ikon | FaArrowUp, putih, 18px |
| Background | `ACCENT` |
| Shadow | shadow-lg |
| Animasi | Fade-in + slide-up saat muncul, fade-out saat hilang |
| **Aria** | `aria-label="Kembali ke atas"` |

---

## 8. Animasi & Micro-interactions (Final)

### 8.1 Scroll-driven Animations

| Section | Animasi | Trigger |
|---------|---------|---------|
| Hero | Fade-in + slide-up (immediate) | On mount |
| Tentang Kami | Fade-in + slide-up | IntersectionObserver 0.2 |
| Keunggulan | Staggered fade-in (100ms delay per card) | IntersectionObserver 0.2 |
| Layanan | Fade-in + slide-up | IntersectionObserver 0.2 |
| Produk | Staggered fade-in | IntersectionObserver 0.2 |
| Statistik | Count-up numbers | IntersectionObserver 0.3 |
| Dokter | Staggered fade-in | IntersectionObserver 0.2 |
| Testimoni | Auto-scroll carousel | On mount |
| Promo | Staggered fade-in | IntersectionObserver 0.2 |
| Newsletter | Fade-in | IntersectionObserver 0.3 |
| FAQ | Fade-in | IntersectionObserver 0.2 |
| CTA | Fade-in + scale | IntersectionObserver 0.3 |
| Kontak | Fade-in + slide-up | IntersectionObserver 0.2 |

**Implementasi:** Custom hook `useInView(ref, threshold)` → return boolean. Class CSS: `animate-in` (opacity + translateY transition).

### 8.2 Micro-interactions

| Elemen | Interaksi |
|--------|-----------|
| Tombol | Ripple effect + scale hover 1.02 + shadow lift |
| Kartu | Hover translateY -6px + shadow 0 8px 24px |
| Navbar menu | Hover opacity-70, active: color ACCENT + indicator dot |
| WhatsApp button | Pulse animation + tooltip |
| Back to Top | Smooth rotate + fade |
| FAQ accordion | Smooth maxHeight + chevron rotate |
| Loading screen | Logo pulse + fade-out |

### 8.3 CSS Keyframes (tambahan)

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse-whatsapp {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
  50% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
}
.animate-in { animation: fadeInUp 0.6s ease-out forwards; }
.opacity-0-anim { opacity: 0; } /* initial state before observer triggers */
```

---

## 9. Perilaku & Interaksi

| Interaksi | Perilaku |
|-----------|----------|
| Halaman dimuat | Loading screen → fade-out → konten muncul |
| Scroll pengguna | Scrollspy navbar aktif + animasi fade-in section saat masuk viewport |
| Klik menu navbar | Smooth scroll ke anchor + tutup mobile drawer |
| Klik "Booking Sekarang" (Hero/Layanan) | Navigasi ke `/register` / toast → `/login` |
| Klik "Login" (Navbar/Hero) | Navigasi ke `/login` |
| Klik "Daftar" (Navbar) | Navigasi ke `/register` |
| Klik "Klaim Promo" (Promo) | Copy kode ke clipboard + toast → navigasi |
| Klik "Subscribe" (Newsletter) | Validasi email → toast sukses/gagal |
| Klik FAQ item | Accordion expand/collapse, item lain menutup |
| Klik WhatsApp floating | Buka `wa.me` di tab baru |
| Klik Back to Top | Smooth scroll ke atas |
| Hover kartu | TranslateY -6px, shadow meningkat, border ACCENT tipis |
| Klik panah carousel | Geser testimoni ke kiri/kanan |
| Auto-scroll carousel | Geser otomatis setiap 5 detik |
| Mobile hamburger | Toggle drawer menu vertikal + overlay |

---

## 10. Responsivitas (Final)

| Breakpoint | Range | Perilaku |
|------------|-------|----------|
| Mobile | < 640px (sm) | 1 kolom, hamburger menu, font headings -2 ukuran |
| Mobile Wide | 640–767px | 1–2 kolom, hamburger menu |
| Tablet | 768–1023px (md) | 2–3 kolom, navbar horizontal penuh |
| Desktop | ≥ 1024px (lg) | 3–4 kolom, max-w-7xl centered |
| Wide | ≥ 1280px (xl) | Max-w-7xl (1280px) centered |

**Aturan Responsivitas per Section:**

| Section | Mobile (<768px) | Tablet (768–1023px) | Desktop (≥1024px) |
|---------|-----------------|---------------------|--------------------|
| Hero | Stack vertikal, rings kecil (w-56) | Grid 2 kolom | Grid 2 kolom, rings w-80 |
| Keunggulan | 1 kolom | 2 kolom | 4 kolom |
| Layanan | 1 kolom | 2 kolom | 3 kolom |
| Produk | 1 kolom | 2 kolom | 3 kolom |
| Statistik | 2 kolom | 2 kolom | 4 kolom |
| Dokter | 1 kolom | 2 kolom | 3 kolom |
| Testimoni | 1 slide, panah kecil | 1 slide | 1 slide centered |
| Promo | 1 kolom | 2 kolom | 3 kolom |
| Newsletter | Input + button stack | Input + button row | Input + button row |
| Footer | 1 kolom | 2 kolom | 4 kolom |

**Prinsip Mobile First:**
- Padding: px-4 mobile, px-6 tablet, px-14 desktop
- Font: headings turun 1–2 ukuran di mobile
- Touch targets: minimum 44x44px untuk semua tombol interaktif
- Tidak ada horizontal scroll di semua breakpoint

---

## 11. SEO & Metadata

### 11.1 Meta Tags (dalam `<head>`)

```html
<title>BeautyCare Clinic — Klinik Kecantikan & Dermatologi Terpercaya di Jakarta</title>
<meta name="description" content="BeautyCare Clinic menyediakan layanan facial, konsultasi kulit, laser treatment, dan produk skincare berkualitas. Dokter spesialis bersertifikat. Booking sekarang!">
<meta name="keywords" content="klinik kecantikan, dermatologi, facial, laser treatment, skincare, konsultasi kulit, Jakarta">
<meta property="og:title" content="BeautyCare Clinic — Kulit Sehat Dimulai dari Diagnosis yang Tepat">
<meta property="og:description" content="Klinik kecantikan modern dengan dokter spesialis, teknologi terkini, dan perawatan personal.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://beautycare.id">
<meta property="og:image" content="https://beautycare.id/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://beautycare.id">
```

### 11.2 Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "BeautyCare Clinic",
  "description": "Klinik kecantikan dan dermatologi modern di Jakarta Selatan.",
  "url": "https://beautycare.id",
  "telephone": "+6281234567890",
  "email": "hello@beautycare.id",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Kecantikan No. 123",
    "addressLocality": "Jakarta Selatan",
    "addressCountry": "ID"
  },
  "openingHours": "Mo-Sa 09:00-20:00",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "3245"
  }
}
```

### 11.3 Heading Hierarchy

```
h1: "Kulit sehat dimulai dari diagnosis yang tepat." (Hero)
h2: Section headings (Tentang Kami, Keunggulan, Layanan, ...)
h3: Card titles (Facial Treatment, Brightening Serum, ...)
```

### 11.4 Image SEO

- Semua `<img>` punya attribut `alt` deskriptif
- `loading="lazy"` pada gambar di bawah fold
- `width` dan `height` explicit untuk menghindari layout shift

---

## 12. Performa

### 12.1 Metrics Target

| Metrik | Target | Keterangan |
|--------|--------|------------|
| FCP (First Contentful Paint) | < 1.2 detik | Konten pertama terlihat |
| LCP (Largest Contentful Paint) | < 2.0 detik | Hero image/text terlihat penuh |
| TTI (Time to Interactive) | < 2.5 detik | Halaman responsif penuh |
| CLS (Cumulative Layout Shift) | < 0.05 | Tidak ada layout berubah tiba-tiba |
| Bundle Size (gzip) | < 150 KB | JS + CSS terkompresi |

### 12.2 Optimasi

| Optimasi | Implementasi |
|----------|--------------|
| Image lazy loading | `loading="lazy"` + `decoding="async"` pada gambar di bawah fold |
| Image dimensions | Explicit width/height di semua `<img>` |
| Font optimasi | Google Fonts dengan `display=swap` (sudah ada) |
| Code splitting | Section besar di-split ke komponen lazy (opsional) |
| No render-blocking | CSS inline untuk above-the-fold, sisanya async |
| Minimal dependencies | Hanya react, react-router-dom, react-icons |
| CSS containment | `contain: layout style paint` pada kartu section |
| IntersectionObserver | Pakai untuk lazy-load animasi, bukan scroll event listener |

---

## 13. Aksesibilitas

### 13.1 WCAG 2.1 AA Compliance

| Kategori | Implementasi |
|----------|--------------|
| **Semantic HTML** | `<nav>`, `<section>`, `<h1>`–`<h3>`, `<footer>`, `<button>` |
| **Aria labels** | `aria-label` di semua tombol ikon (hamburger, social, favorite, WhatsApp, Back to Top, carousel arrows) |
| **Kontras warna** | Semua teks: rasio minimum 4.5:1. ACCENT (#B85C7A) di atas putih = 4.6:1 ✅ |
| **Focus visible** | `focus:ring-2 focus:ring-offset-2` di semua tombol & link |
| **Keyboard navigation** | Semua interaksi bisa diakses via Tab/Enter/Escape |
| **Skip to content** | Link "Skip to main content" di awal halaman (opsional) |
| **Alt text** | Semua gambar punya `alt` deskriptif |
| **Reduced motion** | Animasi di-`prefers-reduced-motion: reduce` |
| **Form labels** | Input newsletter punya `<label>` atau `aria-label` |

### 13.2 Keyboard Navigation Map

```
Tab 1: Skip to content (opsional)
Tab 2: Logo (scroll to top)
Tab 3–10: Navbar menu items
Tab 11: Login button
Tab 12: Daftar button
Tab 13+: Section content buttons (Booking, Klaim Promo, Subscribe, FAQ, WhatsApp, Back to Top)
```

---

## 14. Rute & Navigasi

| Rute | Target | Keterangan |
|------|--------|------------|
| `/` | Landing Page Guest | Halaman final |
| `/login` | Halaman Login | Tombol Login di navbar / hero |
| `/register` | Halaman Register | Tombol Daftar / Booking Sekarang |
| `/Member` | Member Dashboard | Setelah login member |
| `/Dashboard` | Admin Dashboard | Setelah login admin |
| `/kebijakan-privasi` | Halaman legal | Link di footer (placeholder/internal) |
| `/syarat-ketentuan` | Halaman legal | Link di footer (placeholder/internal) |

---

## 15. Non-Fungsional Requirements (Final)

| Aspek | Requirement |
|-------|-------------|
| Performa | FCP < 1.2s, LCP < 2.0s, CLS < 0.05 |
| Aksesibilitas | WCAG 2.1 AA, semantic HTML, aria-label, keyboard navigable |
| SEO | Meta tags, Open Graph, structured data (JSON-LD), heading hierarchy |
| Kompatibilitas | Chrome 90+, Firefox 90+, Safari 15+, Edge 90+ |
| Responsivitas | Mobile (<768), Tablet (768–1023), Desktop (≥1024) |
| Teknologi | React 18+, React Router 6+, Tailwind CSS, react-icons/fa, react-icons/gi |
| Kode | Komponen fungsional, tema token lokal, tanpa dependency eksternal baru |
| Bundle | < 150KB gzip |
| Hosting | Vercel / Netlify (static SPA) |
| Analytics | Siap integrasi Google Analytics / Plausible |
| Monitoring | Lighthouse score ≥ 90 (Performance, Accessibility, Best Practices, SEO) |

---

## 16. Matriks Perubahan v2 → Final

| Section / Fitur | v2.0 | Final |
|-----------------|------|-------|
| **Loading Screen** | ❌ | 🆕 600ms fade-out |
| **Navbar** | 8 menu + scrollspy | 8 menu + scrollspy + shadow on scroll + indicator dot |
| **Hero** | Rings + 98% | 🆕 Gradient bg + larger CTA + sub-label + badge "3.000+ patients" |
| **Tentang Kami** | ✅ | ✅ + fade-in animation |
| **Keunggulan** | ✅ | ✅ + staggered fade-in |
| **Layanan** | ✅ | ✅ + fade-in animation |
| **Produk** | Placeholder ikon GiWaterDrop | 🆕 **Foto nyata Unsplash** + lazy loading + fallback |
| **Statistik** | ✅ Count-up | ✅ |
| **Tim Dokter** | ✅ | ✅ + staggered fade-in |
| **Testimoni** | Grid 3 kartu | 🆕 **Carousel / slider** + auto-scroll + panah + dots |
| **Promo** | ✅ | ✅ + staggered fade-in |
| **Newsletter** | ❌ | 🆕 Form subscribe + validasi + toast |
| **FAQ** | Accordion, maxH: 200px | 🆕 maxH: 500px + fade-in |
| **CTA** | ✅ | ✅ + fade-in scale |
| **Kontak** | ✅ | ✅ + fade-in |
| **Footer** | 3 kolom (Logo, Info, Sosial) | 🆕 **4 kolom** + Legal links (Kebijakan, Syarat, Copyright) |
| **WhatsApp Float** | ❌ | 🆕 Fixed bottom-left + tooltip + pulse |
| **Back to Top** | ✅ | ✅ + animasi fade-in/out |
| **SEO Meta** | ❌ | 🆕 Title, description, OG, Twitter Card, JSON-LD |
| **Aksesibilitas** | Sebagian | 🆕 Full WCAG 2.1 AA, aria-label, keyboard nav |
| **Performa Target** | Tidak ada | 🆕 FCP < 1.2s, LCP < 2.0s, Bundle < 150KB |
| **Scroll Animasi** | ❌ | 🆕 IntersectionObserver fade-in di semua section |
| **Staggered Animation** | ❌ | 🆕 Delay bertahap pada kartu grid |
| **Reduced Motion** | ❌ | 🆕 `prefers-reduced-motion` support |
| **Card Shadow** | `0 4px 12px` | `0 4px 16px rgba(43,36,32,0.07)` |

---

## 17. Checklist Production Readiness

| # | Item | Status |
|---|------|--------|
| 1 | Semua section terimplementasi | ☐ |
| 2 | Loading screen berfungsi | ☐ |
| 3 | Scrollspy navbar aktif | ☐ |
| 4 | Animasi scroll-driven semua section | ☐ |
| 5 | Produk pakai foto Unsplash + fallback | ☐ |
| 6 | Testimoni carousel berfungsi (auto + manual) | ☐ |
| 7 | Newsletter form validasi + toast | ☐ |
| 8 | WhatsApp floating button + tooltip | ☐ |
| 9 | Back to Top fade-in/out | ☐ |
| 10 | Footer 4 kolom + legal links | ☐ |
| 11 | Meta tags di `<head>` | ☐ |
| 12 | JSON-LD structured data | ☐ |
| 13 | Semantic HTML + aria-label | ☐ |
| 14 | Keyboard navigation lengkap | ☐ |
| 15 | `prefers-reduced-motion` support | ☐ |
| 16 | Responsif mobile/tablet/desktop | ☐ |
| 17 | Lighthouse ≥ 90 semua kategori | ☐ |
| 18 | Bundle < 150KB gzip | ☐ |
| 19 | Semua gambar lazy load + alt text | ☐ |
| 20 | Tidak ada broken link | ☐ |

---

## Persetujuan

| Role | Nama | Tanda Tangan | Tanggal |
|------|------|-------------|---------|
| Product Owner | | | |
| Lead Developer | | | |
| UI/UX Designer | | | |
| QA Engineer | | | |

---

*Dokumen ini menjadi acuan tunggal untuk implementasi final Landing Page Guest BeautyCare CRM. Seluruh section dari v1 dan v2 dipertahankan, disempurnakan dengan animasi scroll, carousel testimoni, foto produk nyata, newsletter, WhatsApp floating button, SEO, aksesibilitas, dan performa production-grade.*
