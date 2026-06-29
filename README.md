# BeautyCare CRM — Klinik Kecantikan & Dermatologi

> Aplikasi CRM untuk klinik kecantikan berbasis React + Vite dengan Tailwind CSS. Mencakup landing page publik, dashboard admin, manajemen booking, manajemen pasien, dan sistem autentikasi.

---

## 🚀 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Framework** | React 19 + Vite 8 |
| **Routing** | React Router DOM v7 |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Charts** | Recharts |
| **Icons** | React Icons (FontAwesome) |
| **HTTP Client** | Axios |
| **Backend/Auth** | Supabase REST API |
| **Deploy** | Vercel (SPA rewrite) |
| **Package Manager** | npm |

---

## 📁 Struktur Proyek

```
elin-app/
├── index.html                    # Entry HTML
├── package.json                  # Dependencies & scripts
├── vite.config.js                # Vite config + path alias @/
├── vercel.json                   # Vercel SPA rewrite
├── README.md                     # Dokumentasi ini
│
├── public/
│   └── fonts/                    # Barlow & Poppins fonts
│
└── src/
    ├── main.jsx                  # React entry → BrowserRouter → App
    ├── App.jsx                   # Route definitions + lazy loading
    ├── index.css                 # Global CSS variables (unused, kustom)
    ├── assets/
    │   └── tailwind.css          # Tailwind import
    │
    ├── components/               # Shared UI components
    │   ├── Header.jsx            # Top navbar (logo, search, notif, profile)
    │   ├── Sidebar.jsx           # Left sidebar (menu, logo, add treatment)
    │   ├── PageHeader.jsx        # Page title + clickable breadcrumbs
    │   ├── Loading.jsx           # Suspense fallback spinner
    │   └── ui/                   # shadcn/ui primitives (button, card, table, tabs, badge, select)
    │
    ├── layouts/                  # Layout wrappers
    │   ├── MainLayout.jsx        # Sidebar (fixed left) + Header (fixed top) + <Outlet/>
    │   └── AuthLayout.jsx        # Centered gradient bg + <Outlet/>
    │
    ├── pages/                    # Semua halaman
    │   ├── guest/
    │   │   └── GuestDashboard.jsx   # Landing page publik
    │   ├── Dashboard.jsx            # Dashboard admin (charts, stats)
    │   ├── Booking.jsx              # Tabel booking + filter + new booking modal
    │   ├── BookingAdd.jsx           # Form modal tambah booking
    │   ├── BookingDetail.jsx        # Detail booking (lazy, belum direwrite)
    │   ├── Pasien.jsx               # Tabel pasien + filter + add patient modal
    │   ├── PatientAdd.jsx           # Form modal tambah pasien
    │   ├── PatientTimeline.jsx      # Modal timeline treatment history
    │   ├── PasienDetail.jsx         # Detail pasien (lazy, belum direwrite)
    │   ├── CustomerSegmen.jsx       # Customer segmentation
    │   ├── Components.jsx           # Showcase komponen
    │   ├── member/
    │   │   └── MemberDashboard.jsx  # Dashboard member
    │   ├── auth/
    │   │   ├── Login.jsx            # Login form (username/password/role)
    │   │   ├── Register.jsx         # Register form
    │   │   └── Forgot.jsx           # Forgot password
    │   ├── NotFound.jsx             # 404
    │   ├── Error400.jsx             # 400
    │   ├── Error401.jsx             # 401
    │   └── Error403.jsx             # 403
    │
    ├── data/                     # Data awal (JSON)
    │   ├── booking.json          # 30 booking records
    │   └── pasien.json           # 30 patient records
    │
    └── services/
        └── loginAPI.js           # Supabase REST login/register
```

---

## 🧭 Arsitektur & Alur Navigasi

```
BrowserRouter
└── App
    ├── <MainLayout>                    → (Sidebar kiri + Header atas)
    │   ├── "/"                         → GuestDashboard       [PUBLIK]
    │   ├── "/Dashboard"                → Dashboard            [ADMIN]
    │   ├── "/Booking"                  → Booking              [ADMIN]
    │   ├── "/Booking/:id"              → BookingDetail        [ADMIN]
    │   ├── "/Pasien"                   → Pasien               [ADMIN]
    │   ├── "/Pasien/:id"               → PasienDetail         [ADMIN]
    │   ├── "/Components"               → Components           [ADMIN]
    │   ├── "/CustomerSegmen"           → CustomerSegmen       [ADMIN]
    │   ├── "/Member"                   → MemberDashboard      [MEMBER]
    │   ├── "/error-400"                → Error400             [SYSTEM]
    │   ├── "/error-401"                → Error401             [SYSTEM]
    │   ├── "/error-403"                → Error403             [SYSTEM]
    │   └── "*"                         → NotFound             [FALLBACK]
    │
    └── <AuthLayout>                    → (Centered gradient)
        ├── "/login"                    → Login
        ├── "/register"                 → Register
        └── "/forgot"                   → Forgot
```

### 🔄 Alur Pengguna (User Flow)

```
┌─────────────────────────────────────────────────────────────┐
│                      GUEST / PUBLIK                         │
│                                                             │
│  "/"  →  GuestDashboard                                     │
│          ├── Scroll sections (Hero, Journey, Stats, Layanan,│
│          │   Dokter, Testimoni, CTA)                        │
│          ├── Klik "Mulai Konsultasi" → Modal Join Member    │
│          ├── Klik "Masuk" → Modal Login                     │
│          ├── Navbar: Login / Join Membership                │
│          └── Auth modal: validasi → loading → sukses        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    LOGIN (Supabase)                          │
│                                                             │
│  "/login" → Login.jsx                                       │
│    ├── Input username + password + role (member/admin)      │
│    ├── LoginAPI.login(username, password) → Supabase REST   │
│    ├── Validasi role cocok                                  │
│    ├── Simpan user ke localStorage                          │
│    └── Redirect:                                            │
│        ├── role "admin"  → "/Dashboard"                     │
│        ├── role "member" → "/Member"                        │
│        └── default       → "/"                              │
│                                                             │
│  "/register" → Register.jsx                                 │
│    └── LoginAPI.register(data) → Supabase REST              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
        ┌──────────────┐     ┌──────────────────┐
        │ ADMIN FLOW   │     │   MEMBER FLOW    │
        │ Login/admin  │     │ Login/member     │
        └──────────────┘     └──────────────────┘
              │                       │
              ▼                       ▼
      "/Dashboard"             "/Member"
      Dashboard.jsx            MemberDashboard.jsx
```

### 🔄 Alur Data Booking & Pasien

```
┌──────────────────────────────────────────────────────────┐
│  Booking.jsx  (state: bookings[])                        │
│                                                          │
│  import bookingData from JSON → useState(bookingData)    │
│                                                          │
│  [New Booking] button                                    │
│       │                                                  │
│       ▼                                                  │
│  BookingAdd.jsx (modal)                                  │
│    ├── Form: patientName, treatment, doctor, datetime    │
│    ├── Validasi → Loading → Success                      │
│    └── onSuccess(newBooking)                             │
│         │                                                │
│         ▼                                                │
│  setBookings([newBooking, ...prev])  ← PREPEND ke state  │
│         │                                                │
│         ▼                                                │
│  Tabel langsung update + Toast notifikasi                │
│                                                          │
│  Fitur:                                                  │
│  ├── Search bar (real-time filter)                       │
│  ├── Filter chips (All/Scheduled/Completed/Cancelled)    │
│  ├── Stats cards (Total, Completed, Scheduled, dll)      │
│  └── Action buttons (View/Edit/Delete) per row           │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  Pasien.jsx  (state: patients[])                         │
│                                                          │
│  import pasienData from JSON → useState(pasienData)      │
│                                                          │
│  [Add Patient] button                                    │
│       │                                                  │
│       ▼                                                  │
│  PatientAdd.jsx (modal)                                  │
│    ├── Form: name, age, gender, phone, email, treatment, │
│    │         allergies, membership                       │
│    ├── Validasi → Loading → Success                      │
│    └── onSuccess(newPatient)                             │
│         │                                                │
│         ▼                                                │
│  setPatients([newPatient, ...prev]) ← PREPEND ke state   │
│         │                                                │
│         ▼                                                │
│  Tabel langsung update + Toast notifikasi                │
│                                                          │
│  Fitur:                                                  │
│  ├── Search bar                                          │
│  ├── Filter membership (All/Platinum/Gold/Silver/Regular)│
│  ├── Stats cards                                         │
│  ├── Timeline button → PatientTimeline modal             │
│  └── Detail link → /Pasien/:id                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🎨 Theme System

Aplikasi menggunakan **CSS-in-JS tokens** yang konsisten di seluruh komponen:

```js
const ACCENT     = "#B85C7A";  // deep dusty rose (primary)
const INK        = "#2E2228";  // dark text
const SAGE       = "#A9748C";  // muted mauve (secondary text)
const AMBER      = "#8C4A63";  // deeper berry-rose (accents)
const BG         = "#FDF6F8";  // page background
const BG_ALT     = "#F6E4EB";  // alternate section bg
const CARD_TINT  = "#F1D3DD";  // card borders
```

**Font**: Fraunces (headings) + Inter (body) via Google Fonts `@import`

**Common patterns**:
- Cards: `rounded-2xl`, white bg, subtle border, hover animation (`hover:-translate-y-1`)
- Buttons: `rounded-full`, ripple effect via `useState` + CSS animation
- Tables: `rounded-2xl` wrapper, header `BG_ALT`, rows `hover:bg-white`
- Modals: overlay `rgba(43,36,32,0.55)`, `rounded-3xl`, shake animation on validation error
- Toast: fixed bottom-center, dark background, slide-up animation

---

## 🧩 Komponen Utama

### Header.jsx
- Logo "Beauty Dashboard" → navigasi ke `/`
- Search bar → klik buka modal pencarian
- Notifikasi / Pesan / Pengaturan → **dropdown panel** (bukan halaman terpisah)
- Login condition:
  - **Logged in**: Profile avatar + dropdown (Book Consultation, Membership, Logout)
  - **Guest**: Tombol "Login" + "Join Membership"
- Tidak ada `alert()` — semua feedback pakai **toast notification**

### Sidebar.jsx
- Logo "Beauty." → klik navigasi ke `/`
- Menu: Dashboard, Booking, Patients, Components, Customer Segment
- System Pages: Error 400, 401, 403
- Card "Add Treatment" → klik tampilkan toast
- Toast notification built-in

### PageHeader.jsx
- Judul halaman (Fraunces)
- **Breadcrumb klikabel**: bisa array `[{label, to}]` atau string
- Area tombol aksi (children)

### RippleButton (duplikat di beberapa file)
- Efek ripple saat diklik
- Variant: `primary` (filled ACCENT) atau `outline` (bordered)
- Focus ring aksesibilitas

---

## 📊 Halaman & Fitur

### GuestDashboard (`/`)
Landing page publik dengan:
- Sticky navbar (Login / Join Membership)
- Hero section + CTA buttons
- 4-step journey (Consult → Diagnose → Treat → Glow)
- Stats dengan **count-up animation** (Intersection Observer)
- Service cards expandable + heart bookmark
- Doctor cards dengan star rating + booking button
- Testimoni section
- CTA section + footer
- Auth modal (login/join) dengan validasi, loading, success

### Dashboard (`/Dashboard`)
Admin dashboard dengan:
- PageHeader + breadcrumb
- 5 stats cards
- 2 PieChart + 1 LineChart + 2 RadialBarChart + 1 BarChart
- Filter buttons (Monthly, Today, This Month)

### Booking (`/Booking`)
- Stats cards (Total, Completed, Scheduled, Cancelled, Paid)
- Search bar + status filter chips
- Tabel 30 booking dengan 8 kolom
- Action buttons (View/Edit/Delete) per baris
- **New Booking modal** → langsung masuk state

### Pasien (`/Patients`)
- Stats cards (Total, Platinum, Gold, Silver, Regular)
- Search bar + membership filter
- Tabel 30 pasien dengan 10 kolom
- Contact inline (ikon phone + email)
- Timeline button → PatientTimeline modal
- **Add Patient modal** → langsung masuk state

---

## 🔌 API & Services

### loginAPI.js
- Endpoint: Supabase REST `https://gbzvfstwrillekxyzxvm.supabase.co/rest/v1/login`
- **login(username, password)**: GET dengan query filter `username=eq.X&password=eq.Y`
- **register(data)**: POST dengan headers Supabase (apikey, Authorization, Prefer)

### localStorage
- `user`: disimpan setelah login `{ username, role }`
- Dicek oleh Header.jsx untuk menentukan tampilan logged-in/guest

---

## 🚦 Menjalankan Proyek

```bash
# Install dependencies
npm install

# Development server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

### Demo Accounts
| Username | Password | Role   | Redirect     |
|----------|----------|--------|--------------|
| member   | 123      | member | `/Member`    |
| admin    | 123      | admin  | `/Dashboard` |

---

## 📝 Catatan Pengembangan

- Semua halaman menggunakan **lazy loading** (`React.lazy`) dengan fallback `<Loading/>`
- Data booking dan pasien diinisialisasi dari JSON, lalu dikelola sebagai **React state** — perubahan langsung terlihat di tabel
- Komponen form (BookingAdd, PatientAdd, AuthModal) memiliki **validasi client-side**, animasi **shake** saat error, **loading spinner**, dan **success state**
- CSS keyframes (`ripple`, `shake`, `toast-in`) didefinisikan di masing-masing file — idealnya diekstrak ke file CSS global
- RippleButton diduplikasi di beberapa file — idealnya diekstrak ke `src/components/ui/`
- Route `/Booking/:id` case-sensitive: huruf B kapital
- `vercel.json` memastikan semua path di-redirect ke `/` untuk SPA routing
