# Product Requirements Document (PRD)

## Landing Page Guest — BeautyCare CRM

**Versi:** 1.0  
**Tanggal:** 29 Juni 2026  
**Status:** Draft  
**Penulis:** Tim BeautyCare CRM  

---

## Daftar Isi

1. [Ringkasan Produk](#1-ringkasan-produk)
2. [Tujuan & Sasaran](#2-tujuan--sasaran)
3. [Target Pengguna](#3-target-pengguna)
4. [Branding & Design System](#4-branding--design-system)
5. [Struktur Halaman](#5-struktur-halaman)
6. [Spesifikasi Section per Section](#6-spesifikasi-section-per-section)
   - [6.1 Navbar](#61-navbar)
   - [6.2 Hero Section](#62-hero-section)
   - [6.3 Tentang Kami](#63-tentang-kami)
   - [6.4 Layanan](#64-layanan)
   - [6.5 Produk](#65-produk)
   - [6.6 Kontak](#66-kontak)
   - [6.7 Footer](#67-footer)
7. [Perilaku & Interaksi](#7-perilaku--interaksi)
8. [Responsivitas](#8-responsivitas)
9. [Rute & Navigasi](#9-rute--navigasi)
10. [Non-Fungsional Requirements](#10-non-fungsional-requirements)
11. [Out of Scope (Versi 1)](#11-out-of-scope-versi-1)

---

## 1. Ringkasan Produk

Landing Page Guest adalah **halaman pertama** yang dilihat oleh pengunjung sebelum melakukan login ke dalam sistem BeautyCare CRM. Halaman ini berfungsi sebagai etalase digital BeautyCare Clinic — memperkenalkan identitas klinik, layanan, produk, dan informasi kontak kepada calon pasien. Halaman ini berdiri sendiri, tidak memerlukan autentikasi, dan terbuka untuk publik.

---

## 2. Tujuan & Sasaran

| Tujuan | Indikator Keberhasilan |
|--------|------------------------|
| Memperkenalkan brand BeautyCare Clinic | Pengunjung memahami profil klinik dalam < 10 detik |
| Mendorong konversi ke registrasi / login | CTAs jelas dan mudah dijangkau |
| Menampilkan layanan & produk | Daftar treatment + skincare terlihat rapi & informatif |
| Memberikan informasi kontak lengkap | Alamat, telepon, email, jam operasional mudah ditemukan |
| Membangun kredibilitas | Desain bersih, modern, profesional |

---

## 3. Target Pengguna

- **Calon pasien** yang mencari klinik kecantikan & dermatologi
- **Pengunjung baru** yang belum memiliki akun
- **Member / Admin** yang belum login dan ingin masuk ke dashboard

---

## 4. Branding & Design System

**Identitas tidak berubah.** Semua token warna, tipografi, dan tone mengikuti BeautyCare CRM yang sudah ada.

### 4.1 Color Tokens

| Token | Hex | Peran |
|-------|-----|-------|
| `ACCENT` | `#B85C7A` | Deep dusty rose — tombol primer, highlight, aksen |
| `INK` | `#2E2228` | Warna teks utama (headings, body) |
| `SAGE` | `#A9748C` | Muted mauve — label, breadcrumb, teks sekunder |
| `AMBER` | `#8C4A63` | Deeper berry-rose — variasi aksen, gradient |
| `BG` | `#FDF6F8` | Background utama halaman |
| `BG_ALT` | `#F6E4EB` | Background section bergantian |
| `CARD_TINT` | `#F1D3DD` | Border kartu, separator |

### 4.2 Tipografi

| Elemen | Font | Weight |
|--------|------|--------|
| Headings (h1–h3) | **Fraunces** (serif) | 400–700 |
| Body, button, label | **Inter** (sans-serif) | 400–600 |
| Label uppercase | Inter | 500, tracking `0.2em` |

### 4.3 Tone & Visual

- Estetika: **bersih, elegan, modern, feminin**
- Background section berselang-seling: `BG` ↔ `BG_ALT`
- Kartu: border `CARD_TINT`, shadow ringan (`0 1px 3px rgba(43,36,32,0.06)`)
- Tombol primer: background `ACCENT`, text putih, rounded-full, ripple effect
- Tombol outline: border `#E3B9C8`, background transparan

---

## 5. Struktur Halaman

Halaman adalah **single-page** dengan navigasi smooth-scroll ke anchor section.

```
┌──────────────────────────────────────────┐
│  NAVBAR (sticky top, backdrop-blur)      │
│  Logo | Home · Tentang · Layanan ·       │
│  Produk · Kontak | Login · Daftar        │
├──────────────────────────────────────────┤
│  HERO SECTION                            │
│  Headline + deskripsi + CTA buttons      │
├──────────────────────────────────────────┤
│  TENTANG KAMI                            │
│  Profil singkat klinik + values          │
├──────────────────────────────────────────┤
│  LAYANAN                                 │
│  Grid kartu treatment (3–4 item)         │
├──────────────────────────────────────────┤
│  PRODUK                                  │
│  Grid kartu produk skincare (3–4 item)   │
├──────────────────────────────────────────┤
│  KONTAK                                  │
│  Info kontak + Google Maps placeholder   │
├──────────────────────────────────────────┤
│  FOOTER                                  │
│  Copyright + social media icons          │
└──────────────────────────────────────────┘
```

---

## 6. Spesifikasi Section per Section

### 6.1 Navbar

| Properti | Spesifikasi |
|----------|-------------|
| Posisi | Sticky top, z-index tinggi |
| Background | `rgba(253, 246, 248, 0.85)` + `backdrop-blur-lg` |
| Border bottom | `1px solid CARD_TINT` |
| Logo | **"BeautyCare"** (Fraunces, `INK`, semibold, italic opsional) + tagline kecil "BeautyCare CRM" (SAGE, `0.2em` tracking) |
| Menu kiri | Home, Tentang Kami, Layanan, Produk, Kontak — smooth scroll ke anchor `#section` |
| Menu kanan | **Login** (outline button) · **Daftar** (solid ACCENT button) — navigasi ke `/login` dan `/register` |
| Mobile | Hamburger menu (FaBars) → drawer dari bawah dengan menu vertikal + tombol Login/Daftar |

**Menu anchor mapping:**

| Label | Anchor |
|-------|--------|
| Home | Scroll to top |
| Tentang Kami | `#about` |
| Layanan | `#services` |
| Produk | `#products` |
| Kontak | `#contact` |

### 6.2 Hero Section

| Properti | Spesifikasi |
|----------|-------------|
| Layout | Grid 2 kolom (teks kiri, visual kanan) |
| Label | Uppercase kecil: "Klinik kecantikan & dermatologi" (SAGE) |
| Headline | **H1** Fraunces, 4–6xl, leading tight. Contoh: *"Kulit sehat dimulai dari diagnosis yang tepat."* dengan highlight kata kunci warna `ACCENT` |
| Deskripsi | Paragraf 1–2 kalimat (Inter, stone-600, max-width-md) |
| CTA Primary | **"Booking Sekarang"** — solid button `ACCENT`, rounded-full, ripple effect, navigasi ke `/register` |
| CTA Secondary | **"Login"** — outline button, navigasi ke `/login` |
| Visual Kanan | Placeholder ilustrasi / decorative rings (dashed circle) dengan statistik persentase di tengah |

### 6.3 Tentang Kami

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG_ALT` |
| Label | "Tentang Kami" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Mengenal BeautyCare Clinic"* |
| Konten | 2 paragraf profil singkat: sejarah, misi, nilai klinik (Inter, stone-600). Maks 150 kata. |
| Visual (opsional) | Placeholder gambar klinik (rounded-2xl) atau ikon dekoratif |
| Values | 3–4 value propositions singkat dengan ikon kecil (misal: Dokter Spesialis, Teknologi Modern, Perawatan Personal) |

### 6.4 Layanan

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Label | "Layanan" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Perawatan unggulan kami"* |
| Layout | Grid 3 kolom (desktop), 1 kolom (mobile) |
| Kartu | Masing-masing: tag badge, judul treatment, deskripsi singkat, harga, durasi, tombol **"Booking Sekarang"** |
| Data | 3–4 treatment: Facial Treatment, Skin Consultation, Laser Treatment, + 1 opsional |

**Kartu Layanan (spesifikasi):**
- Background putih, border `CARD_TINT`, shadow ringan
- Tag badge: background `BG_ALT`, teks `ACCENT`, uppercase kecil
- Judul: Fraunces semibold
- Deskripsi: Inter, stone-600
- Harga: Fraunces semibold, `ACCENT`
- Tombol: RippleButton solid `ACCENT`, rounded-full, teks "Booking Sekarang"
- Hover: `-translate-y-1.5`, transisi 300ms

### 6.5 Produk

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG_ALT` |
| Label | "Produk" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Skincare pilihan dokter kami"* |
| Layout | Grid 3 kolom (desktop), 1 kolom (mobile) |
| Kartu | Masing-masing: gambar placeholder, nama produk, kategori, deskripsi, harga |
| Data | 3–4 produk skincare (misal: Brightening Serum, Hydra Moisturizer, Sunscreen SPF50, Retinol Night Cream) |

**Kartu Produk (spesifikasi):**
- Background putih, border `CARD_TINT`, shadow ringan
- Gambar placeholder: area abu-abu dengan ikon produk (GiWaterDrop atau FaBox)
- Nama produk: Fraunces semibold
- Kategori: badge `BG_ALT` / SAGE
- Harga: Fraunces semibold, `ACCENT`
- Hover: `-translate-y-1.5`

### 6.6 Kontak

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Label | "Kontak" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Hubungi kami"* |
| Layout | Grid 2 kolom: info kontak (kiri) + Google Maps placeholder (kanan) |

**Info Kontak (kolom kiri):**

| Field | Nilai Placeholder |
|-------|-------------------|
| Alamat | Jl. Kecantikan No. 123, Jakarta Selatan |
| Telepon | +62 812-3456-7890 |
| Email | hello@beautycare.id |
| Jam Operasional | Senin–Sabtu: 09.00–20.00 WIB · Minggu: 10.00–17.00 WIB |

**Google Maps Placeholder (kolom kanan):**
- Area persegi rounded-2xl (rasio 4:3 atau 16:9)
- Background `CARD_TINT`, teks tengah "Google Maps akan ditampilkan di sini"
- Ikon peta kecil
- Siap diintegrasikan dengan `<iframe>` Google Maps embed

### 6.7 Footer

| Properti | Spesifikasi |
|----------|-------------|
| Background | `INK` (#2E2228) |
| Layout | 1 baris teks copyright + icon media sosial |

**Konten:**
- Copyright: `© 2026 BeautyCare Clinic. Konsultasi dengan dokter sebelum memulai perawatan.`
- Social media icons (bulat, background `ACCENT`, ikon putih): Instagram, Facebook, WhatsApp
- Hover social icons: opacity turun

**Spesifikasi:**
- Padding vertikal cukup (py-8)
- Teks copyright: text-xs, text-stone-400 atau SAGE
- Ikon sosial: w-9 h-9, rounded-full, background ACCENT, flex center

---

## 7. Perilaku & Interaksi

| Interaksi | Perilaku |
|-----------|----------|
| Klik menu navbar | Smooth scroll ke section anchor (`behavior: "smooth"`) |
| Klik "Booking Sekarang" (Hero) | Navigasi ke `/register` |
| Klik "Login" (Navbar/Hero) | Navigasi ke `/login` |
| Klik "Booking Sekarang" (kartu Layanan) | Tampilkan toast "Silakan login terlebih dahulu", lalu navigasi ke `/login` setelah 800ms |
| Klik "Daftar" (Navbar) | Navigasi ke `/register` |
| Hover kartu | `translate-y: -1.5` (6px), transisi 300ms |
| Hover tombol | Scale ringan, shadow lift |
| Scroll down | Navbar tetap sticky di atas |
| Mobile hamburger | Toggle drawer menu vertikal |

---

## 8. Responsivitas

| Breakpoint | Perilaku |
|------------|----------|
| ≥ 768px (md) | Grid 2–3 kolom, navbar menu horizontal penuh |
| < 768px | Grid 1 kolom, navbar menu diganti hamburger + drawer |
| ≥ 1024px (lg) | Max-width konten `7xl` (1280px), centered |

**Prinsip responsivitas:**
- Hero: stack vertikal di mobile (teks di atas, visual di bawah)
- Grid kartu: 1 kolom mobile → 2 kolom tablet → 3 kolom desktop
- Kontak: stack vertikal di mobile (info dulu, maps kemudian)
- Font size: heading mengecil proporsional di mobile (4xl → 3xl → 2xl)
- Padding: px-6 mobile, px-14 desktop

---

## 9. Rute & Navigasi

| Rute | Target | Keterangan |
|------|--------|------------|
| `/` | Landing Page Guest | Halaman ini, tanpa autentikasi |
| `/login` | Halaman Login | Via tombol Login di navbar / hero |
| `/register` | Halaman Register | Via tombol Daftar / Booking Sekarang |
| `/Member` | Member Dashboard | Setelah login sebagai member |
| `/Dashboard` | Admin Dashboard | Setelah login sebagai admin |

---

## 10. Non-Fungsional Requirements

| Aspek | Requirement |
|-------|-------------|
| Performa | First Contentful Paint < 1.5 detik |
| Aksesibilitas | Semantic HTML, aria-label di tombol ikon, kontras warna minimum AA |
| SEO | Meta title + description, heading hierarchy benar (h1 → h2) |
| Kompatibilitas | Chrome, Firefox, Safari, Edge (versi 2 tahun terakhir) |
| Teknologi | React 18+, React Router, Tailwind CSS (inline style token), react-icons/fa |
| Kode | Komponen fungsional, tema token lokal (`const ACCENT = "#B85C7A"`), tanpa dependency eksternal baru |

---

## 11. Out of Scope (Versi 1)

Fitur berikut **tidak** termasuk dalam versi 1 landing page ini:

- ❌ Testimoni pasien (section terpisah)
- ❌ Dokter / tim medis (section terpisah)
- ❌ Statistik count-up animation
- ❌ Animasi scroll-driven (AOS / framer-motion)
- ❌ Integrasi Google Maps nyata (placeholder saja)
- ❌ Form kontak / kirim pesan
- ❌ Blog / artikel
- ❌ FAQ section
- ❌ Chat widget / live chat
- ❌ Dark mode

---

## Persetujuan

| Role | Nama | Tanda Tangan | Tanggal |
|------|------|-------------|---------|
| Product Owner | | | |
| Lead Developer | | | |
| UI/UX Designer | | | |

---

*Dokumen ini menjadi acuan tunggal untuk implementasi Landing Page Guest BeautyCare CRM versi 1.0.*
