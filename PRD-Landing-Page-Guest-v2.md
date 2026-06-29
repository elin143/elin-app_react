# Product Requirements Document (PRD)

## Landing Page Guest — BeautyCare CRM

**Versi:** 2.0
**Tanggal:** 29 Juni 2026
**Status:** Draft — Evaluasi Versi 1.0
**Penulis:** Tim BeautyCare CRM

---

## Daftar Isi

1. [Ringkasan Produk](#1-ringkasan-produk)
2. [Evaluasi Versi 1.0](#2-evaluasi-versi-10)
3. [Tujuan & Sasaran (v2)](#3-tujuan--sasaran-v2)
4. [Target Pengguna](#4-target-pengguna)
5. [Branding & Design System](#5-branding--design-system)
6. [Struktur Halaman (v2)](#6-struktur-halaman-v2)
7. [Spesifikasi Section per Section](#7-spesifikasi-section-per-section)
   - [7.1 Navbar](#71-navbar)
   - [7.2 Hero Section](#72-hero-section)
   - [7.3 Tentang Kami](#73-tentang-kami)
   - [7.4 Keunggulan BeautyCare](#74-keunggulan-beautycare)
   - [7.5 Layanan](#75-layanan)
   - [7.6 Produk](#76-produk)
   - [7.7 Statistik Klinik](#77-statistik-klinik)
   - [7.8 Tim Dokter](#78-tim-dokter)
   - [7.9 Testimoni Pelanggan](#79-testimoni-pelanggan)
   - [7.10 Promo / Penawaran Spesial](#710-promo--penawaran-spesial)
   - [7.11 FAQ](#711-faq)
   - [7.12 CTA Section](#712-cta-section)
   - [7.13 Kontak](#713-kontak)
   - [7.14 Footer](#714-footer)
8. [Peningkatan UI/UX (v2)](#8-peningkatan-uiux-v2)
9. [Perilaku & Interaksi](#9-perilaku--interaksi)
10. [Responsivitas](#10-responsivitas)
11. [Rute & Navigasi](#11-rute--navigasi)
12. [Non-Fungsional Requirements](#12-non-fungsional-requirements)
13. [Out of Scope (Versi 2)](#13-out-of-scope-versi-2)
14. [Matriks Perubahan v1 → v2](#14-matriks-perubahan-v1--v2)

---

## 1. Ringkasan Produk

Landing Page Guest v2 adalah penyempurnaan dari versi 1.0 yang telah diimplementasikan. Halaman ini tetap menjadi **halaman pertama** yang dilihat oleh pengunjung sebelum login ke sistem BeautyCare CRM — berfungsi sebagai etalase digital lengkap yang memperkenalkan identitas klinik, keunggulan, layanan, produk, statistik, testimoni, promo, FAQ, dan informasi kontak.

---

## 2. Evaluasi Versi 1.0

### 2.1 Apa yang berhasil

| Aspek | Status |
|-------|--------|
| Navbar sticky dengan smooth scroll | ✅ Diimplementasikan sesuai PRD |
| Hero Section dengan headline + CTA | ✅ Sesuai, CTA "Booking Sekarang" + "Login" |
| Tentang Kami dengan value props | ✅ 2 paragraf + 3 value propositions |
| Layanan — 3 kartu treatment | ✅ Dengan expand/collapse, favorit, Booking |
| Produk — 4 kartu skincare | ✅ Dengan placeholder ikon, kategori, harga |
| Kontak — info + Maps placeholder | ✅ Address, telepon, email, jam operasional |
| Footer — copyright + social media | ✅ Logo BeautyCare, 3 kolom |
| Branding & tema konsisten | ✅ Token ACCENT/INK/SAGE terjaga |

### 2.2 Kelebihan implementasi (melebihi PRD v1)

Beberapa fitur diimplementasikan **melampaui** spesifikasi v1 dan terbukti bernilai:

| Fitur Tambahan | Status | Nilai |
|----------------|--------|-------|
| Journey Section (4 steps) | Sudah ada | Menjelaskan proses perawatan pasien |
| Statistik count-up animation | Sudah ada | Angka kredibilitas (pasien, treatment, dokter) |
| Tim Dokter — 3 kartu dokter | Sudah ada | Membangun kepercayaan dengan profil dokter |
| Testimoni — 3 ulasan pasien | Sudah ada | Social proof, rating bintang |
| CTA Section | Sudah ada | Konversi akhir ke membership |
| Back-to-top button | Sudah ada | Navigasi nyaman |
| Ripple effect pada tombol | Sudah ada | Micro-interaction modern |
| Expand/collapse deskripsi layanan | Sudah ada | UX informatif tanpa clutter |

### 2.3 Kekurangan yang perlu diperbaiki

| Kekurangan | Solusi di v2 |
|------------|--------------|
| Tidak ada section FAQ | Tambah section FAQ accordion |
| Tidak ada section Promo | Tambah section Penawaran Spesial |
| Tidak ada section Keunggulan terpisah | Tambah section Keunggulan BeautyCare |
| Navigasi belum ada active state (scrollspy) | Navigasi dengan highlight section aktif |
| Kartu belum fully modern | Tingkatkan shadow, border-radius, hover scale |
| Background section tidak konsisten | Rapikan pola alternating BG/BG_ALT |

---

## 3. Tujuan & Sasaran (v2)

| Tujuan | Indikator Keberhasilan |
|--------|------------------------|
| Memperkenalkan brand BeautyCare Clinic | Pengunjung memahami profil klinik dalam < 10 detik |
| Mendorong konversi ke registrasi / login | CTAs jelas di setiap section kunci |
| Menampilkan seluruh value proposition | Keunggulan, statistik, dokter, testimoni — terlihat |
| Menjawab pertanyaan umum | FAQ menjawab ≥ 5 pertanyaan tanpa perlu kontak |
| Menarik minat dengan promo | Section promo terlihat menggoda untuk Booking |
| Membangun kredibilitas maksimal | Desain bersih + testimoni + statistik + dokter |

---

## 4. Target Pengguna

- **Calon pasien** yang mencari klinik kecantikan & dermatologi
- **Pengunjung baru** yang belum memiliki akun
- **Member / Admin** yang belum login dan ingin masuk ke dashboard

---

## 5. Branding & Design System

**Identitas tidak berubah.** Semua token warna, tipografi, dan tone mengikuti BeautyCare CRM yang sudah ada.

### 5.1 Color Tokens

| Token | Hex | Peran |
|-------|-----|-------|
| `ACCENT` | `#B85C7A` | Deep dusty rose — tombol primer, highlight, aksen |
| `INK` | `#2E2228` | Warna teks utama (headings, body) |
| `SAGE` | `#A9748C` | Muted mauve — label, breadcrumb, teks sekunder |
| `AMBER` | `#8C4A63` | Deeper berry-rose — variasi aksen, gradient |
| `BG` | `#FDF6F8` | Background utama halaman |
| `BG_ALT` | `#F6E4EB` | Background section bergantian |
| `CARD_TINT` | `#F1D3DD` | Border kartu, separator |

### 5.2 Tipografi

| Elemen | Font | Weight |
|--------|------|--------|
| Headings (h1–h3) | **Fraunces** (serif) | 400–700 |
| Body, button, label | **Inter** (sans-serif) | 400–600 |
| Label uppercase | Inter | 500, tracking `0.2em` |

### 5.3 Tone & Visual

- Estetika: **bersih, elegan, modern, feminin**
- Background section berselang-seling: `BG` ↔ `BG_ALT` secara konsisten
- Kartu: border `CARD_TINT`, shadow `0 4px 12px rgba(43,36,32,0.06)` (ditingkatkan dari v1)
- Tombol primer: background `ACCENT`, text putih, rounded-full, ripple effect
- Tombol outline: border `#E3B9C8`, background transparan
- Hover kartu: `-translate-y-1.5` + shadow meningkat (ditingkatkan dari v1)

---

## 6. Struktur Halaman (v2)

Halaman adalah **single-page** dengan navigasi smooth-scroll ke anchor section.

```
┌──────────────────────────────────────────┐
│  NAVBAR (sticky top, backdrop-blur)      │
│  Logo | Home · Tentang · Keunggulan ·    │
│  Layanan · Produk · Promo · FAQ ·        │
│  Kontak | Login · Daftar                 │
├──────────────────────────────────────────┤
│  HERO SECTION                            │
│  Headline + deskripsi + CTA buttons      │
│  (BG default)                            │
├──────────────────────────────────────────┤
│  TENTANG KAMI                            │
│  Profil klinik + 3 value propositions    │
│  (BG)                                    │
├──────────────────────────────────────────┤
│  KEUNGGULAN BEAUTYCARE                   │
│  4 kartu alasan memilih klinik ini       │
│  (BG_ALT)                                │
├──────────────────────────────────────────┤
│  LAYANAN                                 │
│  Grid kartu treatment (3 item)           │
│  (BG)                                    │
├──────────────────────────────────────────┤
│  PRODUK                                  │
│  Grid kartu produk skincare (4 item)     │
│  (BG_ALT)                                │
├──────────────────────────────────────────┤
│  STATISTIK KLINIK                        │
│  4 kartu count-up angka kredibilitas     │
│  (BG)                                    │
├──────────────────────────────────────────┤
│  TIM DOKTER                              │
│  Grid 3 kartu profil dokter              │
│  (BG_ALT)                                │
├──────────────────────────────────────────┤
│  TESTIMONI PELANGGAN                     │
│  Grid 3 kartu ulasan pasien + rating     │
│  (BG)                                    │
├──────────────────────────────────────────┤
│  PROMO / PENAWARAN SPESIAL               │
│  Grid 3 kartu promo diskon + CTA         │
│  (BG_ALT)                                │
├──────────────────────────────────────────┤
│  FAQ                                     │
│  Accordion 5-6 pertanyaan umum           │
│  (BG)                                    │
├──────────────────────────────────────────┤
│  CTA SECTION                             │
│  Ajakan gabung membership                │
│  (BG default)                            │
├──────────────────────────────────────────┤
│  KONTAK                                  │
│  Info kontak + Google Maps placeholder   │
│  (BG_ALT)                                │
├──────────────────────────────────────────┤
│  FOOTER                                  │
│  Logo + Informasi + Sosial Media         │
│  (INK background)                        │
└──────────────────────────────────────────┘
```

---

## 7. Spesifikasi Section per Section

### 7.1 Navbar

**Status:** ✅ Sudah ada di v1 — diperbarui di v2

| Properti | Spesifikasi |
|----------|-------------|
| Posisi | Sticky top, z-index tinggi |
| Background | `rgba(253, 246, 248, 0.85)` + `backdrop-blur-lg` |
| Border bottom | `1px solid CARD_TINT` |
| Logo | **"BeautyCare"** (Fraunces, `INK`, semibold) |
| Menu | Home, Tentang Kami, Keunggulan, Layanan, Produk, Promo, FAQ, Kontak |
| Menu kanan | **Login** (outline button) · **Daftar** (solid ACCENT button) |
| Mobile | Hamburger menu (FaBars) → drawer menu vertikal |
| **Baru di v2** | Scrollspy — menu aktif di-highlight warna ACCENT saat section terlihat |

**Menu anchor mapping:**

| Label | Anchor |
|-------|--------|
| Home | `#home` (scroll to top) |
| Tentang Kami | `#about` |
| Keunggulan | `#advantages` |
| Layanan | `#services` |
| Produk | `#products` |
| Promo | `#promo` |
| FAQ | `#faq` |
| Kontak | `#contact` |

### 7.2 Hero Section

**Status:** ✅ Sudah ada di v1

| Properti | Spesifikasi |
|----------|-------------|
| Layout | Grid 2 kolom (teks kiri, visual kanan) |
| Label | "Klinik kecantikan & dermatologi" (SAGE, uppercase) |
| Headline | **H1** Fraunces: *"Kulit sehat dimulai dari diagnosis yang tepat."* (ACCENT pada "diagnosis yang tepat") |
| Deskripsi | 1 paragraf (Inter, stone-600, max-w-md) |
| CTA Primary | **"Booking Sekarang"** → `/register` |
| CTA Secondary | **"Login"** → `/login` |
| Visual Kanan | Decorative rings (dashed circle) + "98%" statistik |

### 7.3 Tentang Kami

**Status:** ✅ Sudah ada di v1

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Label | "Tentang Kami" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Mengenal BeautyCare Clinic"* |
| Layout | Grid 2 kolom (profil kiri, values kanan) |
| Konten | 2 paragraf profil singkat |
| Values | 3 kartu kecil: Dokter Spesialis, Teknologi Modern, Perawatan Personal |

### 7.4 Keunggulan BeautyCare

**Status:** 🆕 Baru di v2

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG_ALT` |
| Label | "Keunggulan" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Mengapa memilih BeautyCare?"* |
| Layout | Grid 4 kolom (desktop), 2 kolom (tablet), 1 kolom (mobile) |
| Kartu | Masing-masing: ikon besar (react-icons/fa), judul, deskripsi singkat |

**Data Keunggulan:**

| Ikon | Judul | Deskripsi |
|------|-------|-----------|
| FaUserMd | Dokter Bersertifikat | Semua dokter kami memiliki sertifikasi resmi dan pengalaman klinis. |
| FaClinicMedical | Teknologi Terkini | Peralatan dermatologi modern untuk diagnosis dan perawatan presisi. |
| FaHeart | Perawatan Personal | Setiap rencana perawatan dirancang khusus untuk kebutuhan kulitmu. |
| FaShieldAlt | Keamanan Terjamin | Standar steril ketat dan produk BPOM untuk keselamatan pasien. |

**Spesifikasi Kartu:**
- Background putih, border `CARD_TINT`, shadow ringan
- Ikon: 40px, warna `ACCENT`, di tengah atas
- Judul: Fraunces semibold, text-lg
- Deskripsi: Inter, text-stone-500, text-sm
- Hover: `-translate-y-1.5`, shadow meningkat, transisi 300ms

### 7.5 Layanan

**Status:** ✅ Sudah ada di v1

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Label | "Layanan" atau "Layanan Unggulan" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Perawatan unggulan kami"* |
| Layout | Grid 3 kolom (desktop), 1 kolom (mobile) |
| Data | 3 treatment: Facial Treatment, Skin Consultation, Laser Treatment |

**Kartu Layanan (spesifikasi):**
- Background putih, border `CARD_TINT`, shadow ringan
- Tag badge: background `BG_ALT`, teks `ACCENT`, uppercase kecil
- Judul: Fraunces semibold, text-xl
- Deskripsi singkat + expandable full description
- Harga: Fraunces semibold, `ACCENT`
- Durasi: badge kecil `BG_ALT` / SAGE
- Tombol favorit (FaHeart / FaRegHeart)
- Tombol "Booking Sekarang": RippleButton solid `ACCENT`
- Hover: `-translate-y-1.5`, transisi 300ms

### 7.6 Produk

**Status:** ✅ Sudah ada di v1

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG_ALT` |
| Label | "Produk" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Skincare pilihan dokter kami"* |
| Layout | Grid 3 kolom (desktop), 1 kolom (mobile) |
| Data | 4 produk: Brightening Serum, Hydra Moisturizer, Sunscreen SPF 50, Retinol Night Cream |

**Kartu Produk (spesifikasi):**
- Background putih, border `CARD_TINT`, shadow ringan
- Placeholder gambar: area rounded-xl, background `CARD_TINT`, ikon GiWaterDrop
- Kategori: badge `BG_ALT`, teks SAGE
- Nama: Fraunces semibold
- Deskripsi: Inter, text-stone-600
- Harga: Fraunces semibold, `ACCENT`
- Hover: `-translate-y-1.5`, transisi 300ms

### 7.7 Statistik Klinik

**Status:** ✅ Sudah ada di v1 (count-up animation)

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Label | "Statistik" atau "Angka Berbicara" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Dipercaya ribuan pasien"* |
| Layout | Grid 4 kolom (desktop), 2 kolom (mobile) |
| Animasi | Count-up from 0 → target dengan Intersection Observer |

**Data Statistik:**

| Ikon | Angka | Label |
|------|-------|-------|
| FaUsers | 3.245+ | Pasien Puas |
| GiWaterDrop | 120+ | Jenis Perawatan |
| FaUserMd | 15 | Dokter Spesialis |
| FaCalendarCheck | 10K+ | Janji Temu |

**Spesifikasi Kartu:**
- Background putih, border `CARD_TINT`, shadow ringan
- Ikon: 24px, warna `ACCENT`
- Angka: Fraunces semibold, text-2xl
- Label: Inter, text-stone-500, text-sm
- Hover: `-translate-y-1`, transisi 300ms

### 7.8 Tim Dokter

**Status:** ✅ Sudah ada di v1

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG_ALT` |
| Label | "Tim Kami" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Dokter spesialis terpercaya"* |
| Layout | Grid 3 kolom (desktop), 1 kolom (mobile) |
| Data | 3 dokter: Dr. Amanda Putri, Dr. Sarah Wijaya, Dr. Jessica Lim |

**Spesifikasi Kartu:**
- Background putih, border `CARD_TINT`, shadow ringan, text-center
- Avatar: inisial dalam lingkaran `CARD_TINT` dengan badge centang hijau `ACCENT`
- Nama: Fraunces/Inter semibold
- Spesialisasi: text-stone-500
- Rating: bintang (FaStar/FaStarHalfAlt) + angka
- Pengalaman: badge `BG_ALT`
- Tombol "Booking Dokter": RippleButton outline

### 7.9 Testimoni Pelanggan

**Status:** ✅ Sudah ada di v1 — diperbarui di v2

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Label | "Testimoni" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Cerita dari pasien kami"* |
| Layout | Grid 3 kolom (desktop), 1 kolom (mobile) |
| Data | 3 testimoni pasien |

**Data Testimoni:**

| Nama | Teks | Rating | Treatment |
|------|------|--------|-----------|
| Rina A. | "Setelah 3 bulan rutin konsultasi, jerawatku hilang total..." | ⭐5 | Facial Treatment |
| Dewi S. | "Laser treatment di sini benar-benar mengubah hidupku..." | ⭐5 | Laser Treatment |
| Maya K. | "Konsultasi pertama gratis dan dokternya gak buru-buru..." | ⭐4.5 | Skin Consultation |

**Spesifikasi Kartu:**
- Background putih, border `CARD_TINT`, shadow ringan
- Ikon quote: FaQuoteLeft, warna `CARD_TINT`
- Teks: Inter, text-stone-600, leading-relaxed
- Nama: semibold
- Treatment: SAGE
- Rating: bintang emas (#E8B44F)
- Hover: `-translate-y-1`, transisi 300ms

### 7.10 Promo / Penawaran Spesial

**Status:** 🆕 Baru di v2

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG_ALT` |
| Label | "Promo" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Penawaran spesial untukmu"* |
| Layout | Grid 3 kolom (desktop), 1 kolom (mobile) |
| Data | 3 kartu promo |

**Data Promo:**

| Judul | Diskon | Kode | Deskripsi | CTA |
|-------|--------|------|-----------|-----|
| First Timer Glow | 20% | GLOW20 | Diskon 20% untuk pasien baru di kunjungan pertama. | Klaim Promo |
| Weekend Beauty | 15% | WEEKEND15 | Perawatan facial & laser spesial setiap akhir pekan. | Lihat Jadwal |
| Referral Bonus | 10% | REFER10 | Ajak teman dan dapatkan diskon untuk kalian berdua. | Ajak Teman |

**Spesifikasi Kartu:**
- Background putih, border `CARD_TINT`, shadow ringan
- Badge diskon: background `ACCENT`, teks putih, rounded-full, posisi kanan atas
- Judul: Fraunces semibold
- Kode promo: monospace, background BG_ALT, rounded, SAGE
- Deskripsi: Inter, text-stone-600
- CTA button: RippleButton solid `ACCENT`
- Hover: `-translate-y-1.5`, badge scale up, transisi 300ms

### 7.11 FAQ

**Status:** 🆕 Baru di v2

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG` |
| Label | "FAQ" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Pertanyaan yang sering diajukan"* |
| Layout | Accordion, max-w-3xl centered |
| Data | 5-6 pertanyaan umum |

**Data FAQ:**

| # | Pertanyaan | Jawaban |
|---|-----------|---------|
| 1 | Apakah konsultasi pertama gratis? | Ya, konsultasi pertama bersama dokter spesialis kami tidak dikenakan biaya. |
| 2 | Berapa lama satu sesi treatment berlangsung? | Tergantung treatment: konsultasi 30 menit, facial 60 menit, laser 45 menit. |
| 3 | Apakah produk skincare yang dijual aman? | Semua produk kami terdaftar BPOM dan telah melalui uji dermatologi. |
| 4 | Bagaimana cara booking appointment? | Klik "Booking Sekarang" di mana saja, lalu daftar atau login ke akunmu. |
| 5 | Apakah bisa reschedule atau cancel booking? | Ya, kamu bisa mengubah jadwal maksimal 24 jam sebelum appointment. |
| 6 | Apakah menerima pembayaran dengan asuransi? | Saat ini kami menerima pembayaran tunai, transfer, dan kartu kredit/debit. |

**Spesifikasi Accordion:**
- Setiap item: border bottom `CARD_TINT`
- Header: pertanyaan + ikon FaChevronDown / FaChevronUp di kanan
- Body: expand/collapse dengan animasi max-height transition
- Header hover: background putih, cursor pointer
- Satu item terbuka otomatis (default: item pertama)

### 7.12 CTA Section

**Status:** ✅ Sudah ada di v1

| Properti | Spesifikasi |
|----------|-------------|
| Background | BG default (tidak ada background section) |
| Layout | Text-center, max-w-3xl mx-auto |
| Headline | H2 Fraunces: *"Kulitmu pantas mendapat perhatian yang tepat."* |
| Deskripsi | "Gabung membership untuk diskon konsultasi, prioritas booking..." |
| CTA | "Gabung Membership Sekarang" → `/register` |

### 7.13 Kontak

**Status:** ✅ Sudah ada di v1

| Properti | Spesifikasi |
|----------|-------------|
| Background | `BG_ALT` |
| Label | "Kontak" (SAGE, uppercase) |
| Headline | H2 Fraunces: *"Hubungi kami"* |
| Layout | Grid 2 kolom (info kiri, Maps kanan) |

### 7.14 Footer

**Status:** ✅ Sudah ada di v1 — diperbarui di v2

| Properti | Spesifikasi |
|----------|-------------|
| Background | `INK` (#2E2228) |
| Layout | Grid 3 kolom (desktop), stack (mobile) |
| Kolom 1 | Logo "BeautyCare" + tagline |
| Kolom 2 | Informasi (alamat, telepon, email) |
| Kolom 3 | "Ikuti Kami" + social media icons (Instagram, Facebook, WhatsApp) |
| Copyright | `© 2026 BeautyCare Clinic. Konsultasi dengan dokter sebelum memulai perawatan.` |

---

## 8. Peningkatan UI/UX (v2)

| Peningkatan | Deskripsi |
|-------------|-----------|
| Shadow kartu ditingkatkan | v1: `0 1px 3px rgba(...)` → v2: `0 4px 12px rgba(43,36,32,0.06)` |
| Hover scale kartu | v1: `-translate-y-1.5` (6px) → v2: tetap, tapi shadow ikut meningkat |
| Scrollspy navbar | Menu aktif berubah warna ke ACCENT saat section terlihat di viewport |
| Background section konsisten | Pola alternating BG/BG_ALT diperbaiki agar tidak ada 2 section berturut-turut dengan warna sama |
| Accordion FAQ | Animasi smooth expand/collapse, ikon chevron berputar |
| Badge diskon di promo | Posisi absolute di kanan atas kartu, background ACCENT |
| Spacing konsisten | Semua section: py-16, px-6 md:px-14, max-w-7xl mx-auto |
| AOS ringan | Intersection Observer untuk animasi fade-in saat section masuk viewport (opsional v2) |

---

## 9. Perilaku & Interaksi

| Interaksi | Perilaku |
|-----------|----------|
| Klik menu navbar | Smooth scroll ke section anchor (`behavior: "smooth"`) |
| Scroll pengguna | Navbar menu item aktif berubah warna sesuai section yang terlihat (scrollspy) |
| Klik "Booking Sekarang" (Hero/Layanan) | Navigasi ke `/register` / tampilkan toast "Silakan login" → `/login` |
| Klik "Login" (Navbar/Hero) | Navigasi ke `/login` |
| Klik "Daftar" (Navbar) | Navigasi ke `/register` |
| Klik "Klaim Promo" (Promo) | Tampilkan toast "Promo disalin! Kode: XX" → navigasi ke `/register` |
| Klik FAQ item | Accordion expand/collapse, item lain menutup |
| Hover kartu | `-translate-y-1.5`, shadow meningkat, transisi 300ms |
| Hover tombol | Scale ringan, shadow lift |
| Hover social icons | Opacity turun ke 80% |
| Scroll ke Stats | Count-up animation trigger via IntersectionObserver |
| Scroll ke bawah | Navbar tetap sticky, Back-to-top button muncul |
| Mobile hamburger | Toggle drawer menu vertikal |

---

## 10. Responsivitas

| Breakpoint | Perilaku |
|------------|----------|
| ≥ 768px (md) | Grid 2–4 kolom, navbar menu horizontal penuh |
| < 768px | Grid 1–2 kolom, navbar menu diganti hamburger + drawer |
| ≥ 1024px (lg) | Max-width konten `7xl` (1280px), centered |

**Prinsip responsivitas:**
- Hero: stack vertikal di mobile (teks di atas, visual di bawah)
- Grid kartu: 1 kolom mobile → 2 kolom tablet → 3–4 kolom desktop
- Kontak: stack vertikal di mobile (info dulu, maps kemudian)
- Font size: heading mengecil proporsional di mobile
- Padding: px-6 mobile, px-14 desktop
- FAQ: tetap centered, max-w-3xl

---

## 11. Rute & Navigasi

| Rute | Target | Keterangan |
|------|--------|------------|
| `/` | Landing Page Guest | Halaman ini, tanpa autentikasi |
| `/login` | Halaman Login | Via tombol Login di navbar / hero |
| `/register` | Halaman Register | Via tombol Daftar / Booking Sekarang / Klaim Promo |
| `/Member` | Member Dashboard | Setelah login sebagai member |
| `/Dashboard` | Admin Dashboard | Setelah login sebagai admin |

---

## 12. Non-Fungsional Requirements

| Aspek | Requirement |
|-------|-------------|
| Performa | First Contentful Paint < 1.5 detik |
| Aksesibilitas | Semantic HTML, aria-label di tombol ikon, kontras warna minimum AA |
| SEO | Meta title + description, heading hierarchy benar (h1 → h2 → h3) |
| Kompatibilitas | Chrome, Firefox, Safari, Edge (versi 2 tahun terakhir) |
| Teknologi | React 18+, React Router, Tailwind CSS (inline style token), react-icons/fa, react-icons/gi |
| Kode | Komponen fungsional, tema token lokal, tanpa dependency eksternal baru |
| Bundle Size | Tidak melebihi 200KB gzip untuk landing page |

---

## 13. Out of Scope (Versi 2)

Fitur berikut **tidak** termasuk dalam versi 2:

- ❌ Integrasi Google Maps nyata (placeholder saja)
- ❌ Form kontak / kirim pesan langsung
- ❌ Blog / artikel
- ❌ Chat widget / live chat
- ❌ Dark mode
- ❌ Animasi scroll-driven library eksternal (AOS / framer-motion)
- ❌ Multi-language / i18n
- ❌ Video background di hero
- ❌ Newsletter subscription
- ❌ Integrasi booking calendar real-time
- ❌ Payment gateway di landing page

---

## 14. Matriks Perubahan v1 → v2

| Section | v1.0 | v2.0 |
|---------|------|------|
| Navbar | 5 menu items | 8 menu items + scrollspy |
| Hero | ✅ | ✅ (tidak berubah) |
| Tentang Kami | ✅ | ✅ (tidak berubah) |
| Keunggulan BeautyCare | ❌ (Out of Scope v1) | 🆕 4 kartu alasan memilih |
| Journey | ✅ (implementasi) | ❌ Dihapus / diganti Keunggulan |
| Layanan | ✅ | ✅ (tidak berubah) |
| Produk | ✅ | ✅ (tidak berubah) |
| Statistik Klinik | ✅ (implementasi) | ✅ (dipertahankan) |
| Tim Dokter | ✅ (implementasi) | ✅ (dipertahankan) |
| Testimoni Pelanggan | ✅ (implementasi) | ✅ (dipertahankan) |
| Promo / Penawaran Spesial | ❌ (Out of Scope v1) | 🆕 3 kartu promo dengan kode |
| FAQ | ❌ (Out of Scope v1) | 🆕 Accordion 6 pertanyaan |
| CTA | ✅ (implementasi) | ✅ (dipertahankan) |
| Kontak | ✅ | ✅ (tidak berubah) |
| Footer | ✅ | ✅ (tidak berubah) |
| Kartu shadow | `0 1px 3px` | `0 4px 12px` |
| Scrollspy | ❌ | 🆕 |
| Background alternating | ❌ Tidak konsisten | ✅ Konsisten BG↔BG_ALT |

---

## Persetujuan

| Role | Nama | Tanda Tangan | Tanggal |
|------|------|-------------|---------|
| Product Owner | | | |
| Lead Developer | | | |
| UI/UX Designer | | | |

---

*Dokumen ini menjadi acuan tunggal untuk implementasi Landing Page Guest BeautyCare CRM versi 2.0. Semua section v1 dipertahankan dan 3 section baru ditambahkan (Keunggulan, Promo, FAQ) bersama peningkatan UI/UX.*
