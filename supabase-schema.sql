-- ==============================================================================
-- SCHEMA DESAIN UNTUK BEAUTY CLINIC CRM
-- Database: PostgreSQL (Supabase)
-- ==============================================================================

-- Mengaktifkan ekstensi UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- FUNGSI & TRIGGER UNTUK UPDATED_AT
-- ==============================================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- TABEL & KONSTRAIN
-- ==============================================================================

-- 1. USERS (Autentikasi dan Data Pengguna)
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'member', 'guest')),
    full_name VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.users IS 'Tabel pengguna autentikasi sistem (admin, pegawai, dan pelanggan).';

-- 2. PATIENTS (Data Pasien / Rekam Profil)
CREATE TABLE public.patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    age INTEGER,
    gender VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255),
    skin_type_allergies TEXT,
    membership_status VARCHAR(50) DEFAULT 'Regular',
    last_visit DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.patients IS 'Tabel profil pasien/pelanggan klinik.';

-- 3. CUSTOMER_SEGMENTS (Segmentasi Pelanggan)
CREATE TABLE public.customer_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    segment VARCHAR(50) NOT NULL,
    visit_count INTEGER DEFAULT 0,
    last_visit DATE,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.customer_segments IS 'Tabel metrik segmentasi pelanggan (VIP, Active, Inactive, New).';

-- 4. TREATMENTS (Katalog Layanan Treatment)
CREATE TABLE public.treatments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    treatment_id VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(15, 2) NOT NULL DEFAULT 0,
    duration_minutes INTEGER NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.treatments IS 'Tabel master layanan treatment yang disediakan klinik.';

-- 5. BOOKINGS (Reservasi / Janji Temu)
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id VARCHAR(50) UNIQUE NOT NULL,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    treatment_id UUID REFERENCES public.treatments(id) ON DELETE SET NULL,
    patient_name VARCHAR(255) NOT NULL,
    treatment_type VARCHAR(255) NOT NULL,
    doctor_therapist VARCHAR(255),
    date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Completed', 'Cancelled', 'Rescheduled')),
    payment_status VARCHAR(50) DEFAULT 'Pending' CHECK (payment_status IN ('Paid', 'Pending', 'Refunded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.bookings IS 'Tabel jadwal booking dan reservasi pasien.';

-- 6. MEDICAL_RECORDS (Rekam Medis)
CREATE TABLE public.medical_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    record_id VARCHAR(50) UNIQUE NOT NULL,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    patient_name VARCHAR(255) NOT NULL,
    diagnosis TEXT,
    doctor VARCHAR(255),
    record_date DATE NOT NULL,
    treatment TEXT,
    notes TEXT,
    before_image_url TEXT,
    after_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.medical_records IS 'Tabel riwayat rekam medis dan treatment tiap pasien.';

-- 7. PRODUCTS (Manajemen Produk / Shop)
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    brand VARCHAR(100),
    price DECIMAL(15, 2) NOT NULL DEFAULT 0,
    stock INTEGER DEFAULT 0,
    supplier VARCHAR(255),
    ingredients TEXT,
    description TEXT,
    image_url TEXT,
    rating DECIMAL(2, 1) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.products IS 'Tabel inventoris produk skincare.';

-- 8. SHOP_ORDERS (Pesanan Toko / E-Commerce)
CREATE TABLE public.shop_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_no VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    items JSONB NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    payment_method VARCHAR(100),
    order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Paid', 'Refunded', 'Cancelled')),
    source VARCHAR(50) DEFAULT 'shop',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.shop_orders IS 'Tabel riwayat pembelian produk dari member shop.';

-- 9. MEMBERSHIP_TIERS (Tingkatan Loyalty)
CREATE TABLE public.membership_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tier_name VARCHAR(50) UNIQUE NOT NULL,
    points_required INTEGER NOT NULL DEFAULT 0,
    discount_percent DECIMAL(5, 2) DEFAULT 0,
    benefits JSONB,
    member_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.membership_tiers IS 'Tabel master status tingkatan keanggotaan (Platinum, Gold, dll).';

-- 10. MEMBERS (Data Anggota Loyalty)
CREATE TABLE public.members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    tier_name VARCHAR(50) REFERENCES public.membership_tiers(tier_name) ON DELETE SET NULL,
    points INTEGER DEFAULT 0,
    join_date DATE NOT NULL,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.members IS 'Tabel data loyalty & points milik pengguna.';

-- 11. POINT_RULES (Aturan Penghasilan Poin)
CREATE TABLE public.point_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(255) NOT NULL,
    points INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.point_rules IS 'Tabel aturan perolehan poin loyalty (misal: booking = 100 pt).';

-- 12. PROMOTIONS (Promo & Diskon)
CREATE TABLE public.promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    promo_id VARCHAR(50) UNIQUE NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Discount', 'Bundle', 'Voucher')),
    value VARCHAR(50) NOT NULL,
    min_purchase DECIMAL(15, 2) DEFAULT 0,
    applicable_treatments TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    usage_count INTEGER DEFAULT 0,
    max_usage INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Scheduled', 'Expired')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.promotions IS 'Tabel manajemen kode promo dan voucher diskon.';

-- 13. COMMUNICATIONS (Riwayat Pesan / Kampanye)
CREATE TABLE public.communications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message_id VARCHAR(50) UNIQUE,
    type VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    recipients VARCHAR(255),
    segment VARCHAR(100),
    sent_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'Scheduled' CHECK (status IN ('Sent', 'Scheduled', 'Draft')),
    opened_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.communications IS 'Tabel log komunikasi blast email/whatsapp ke pelanggan.';

-- 14. FEEDBACK (Ulasan Pelanggan)
CREATE TABLE public.feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    feedback_id VARCHAR(50) UNIQUE,
    patient_id UUID REFERENCES public.patients(id) ON DELETE SET NULL,
    treatment VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    feedback_date DATE DEFAULT CURRENT_DATE,
    replied BOOLEAN DEFAULT FALSE,
    reply_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.feedback IS 'Tabel ulasan dan rating testimoni pelanggan.';

-- 15. PAYMENTS (Manajemen Tagihan/Invoice)
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_no VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    treatment_description TEXT,
    amount DECIMAL(15, 2) NOT NULL,
    payment_method VARCHAR(100),
    payment_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Paid', 'Pending', 'Refunded')),
    source VARCHAR(50) DEFAULT 'Treatment',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.payments IS 'Tabel riwayat seluruh pembayaran/invoice transaksi.';

-- 16. NOTIFICATIONS (Notifikasi Dalam Aplikasi)
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    notification_id VARCHAR(50) UNIQUE,
    type VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.notifications IS 'Tabel data notifikasi sistem (alert stock, payment, booking).';

-- 17. CLINIC_SETTINGS (Pengaturan Klinik)
CREATE TABLE public.clinic_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_name VARCHAR(255) NOT NULL,
    slogan VARCHAR(255),
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(100),
    website VARCHAR(255),
    working_hours TEXT,
    timezone VARCHAR(100) DEFAULT 'Asia/Jakarta',
    booking_limit INTEGER DEFAULT 50,
    notification_email VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
COMMENT ON TABLE public.clinic_settings IS 'Tabel konfigurasi umum aplikasi profil klinik.';

-- ==============================================================================
-- MENAMBAHKAN TRIGGER UPDATE TIMESTAMP
-- ==============================================================================

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER update_treatments_updated_at BEFORE UPDATE ON public.treatments FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER update_medical_records_updated_at BEFORE UPDATE ON public.medical_records FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON public.members FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER update_promotions_updated_at BEFORE UPDATE ON public.promotions FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON public.feedback FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER update_clinic_settings_updated_at BEFORE UPDATE ON public.clinic_settings FOR EACH ROW EXECUTE PROCEDURE set_updated_at();


-- ==============================================================================
-- INDEX (Untuk Kinerja Query)
-- ==============================================================================

CREATE INDEX idx_patients_user_id ON public.patients(user_id);
CREATE INDEX idx_patients_patient_id ON public.patients(patient_id);
CREATE INDEX idx_bookings_patient_id ON public.bookings(patient_id);
CREATE INDEX idx_bookings_date_time ON public.bookings(date_time);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_medical_records_patient_id ON public.medical_records(patient_id);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_promotions_code ON public.promotions(code);
CREATE INDEX idx_payments_invoice_no ON public.payments(invoice_no);
CREATE INDEX idx_shop_orders_user_id ON public.shop_orders(user_id);

-- ==============================================================================
-- FUNGSI BANTUAN RLS & AUTENTIKASI (Diasumsikan pakai Supabase Auth UID -> public.users)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Aktifkan RLS ke semua tabel
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinic_settings ENABLE ROW LEVEL SECURITY;

-- 1. Kebijakan untuk Users:
CREATE POLICY "Admin dapat melihat dan edit seluruh users" ON public.users FOR ALL USING (public.is_admin());
CREATE POLICY "User dapat melihat & edit datanya sendiri" ON public.users FOR SELECT USING (id = auth.uid());
CREATE POLICY "User dapat edit datanya sendiri" ON public.users FOR UPDATE USING (id = auth.uid());

-- 2. Kebijakan untuk Patients:
CREATE POLICY "Admin akses semua tables" ON public.patients FOR ALL USING (public.is_admin());
CREATE POLICY "Member hanya bisa akses dan edit profil pasien sendiri" ON public.patients FOR ALL USING (user_id = auth.uid());

-- 3. Kebijakan Master Data (Treatments, Products, Tiers, Rules, Promotions, Settings)
-- Bisa dilihat (READ) oleh semua role, tetapi hanya bisa diubah (MUTATE) oleh admin.
CREATE POLICY "Public read catalogs" ON public.treatments FOR SELECT USING (true);
CREATE POLICY "Admin mutate treatments" ON public.treatments FOR ALL USING (public.is_admin());

CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admin mutate products" ON public.products FOR ALL USING (public.is_admin());

CREATE POLICY "Public read settings" ON public.clinic_settings FOR SELECT USING (true);
CREATE POLICY "Admin mutate settings" ON public.clinic_settings FOR ALL USING (public.is_admin());

CREATE POLICY "Public read membership_tiers" ON public.membership_tiers FOR SELECT USING (true);
CREATE POLICY "Admin mutate membership_tiers" ON public.membership_tiers FOR ALL USING (public.is_admin());

CREATE POLICY "Public read point_rules" ON public.point_rules FOR SELECT USING (true);
CREATE POLICY "Admin mutate point_rules" ON public.point_rules FOR ALL USING (public.is_admin());

CREATE POLICY "Public read promotions" ON public.promotions FOR SELECT USING (true);
CREATE POLICY "Admin mutate promotions" ON public.promotions FOR ALL USING (public.is_admin());

-- 4. Kebijakan Transaksi (Bookings, Shop Orders, Feedback, Payments)
CREATE POLICY "Admin All Access Bookings" ON public.bookings FOR ALL USING (public.is_admin());
CREATE POLICY "Member Access Own Bookings" ON public.bookings FOR ALL USING (
    EXISTS (SELECT 1 FROM public.patients p WHERE p.id = bookings.patient_id AND p.user_id = auth.uid())
);

CREATE POLICY "Admin All Access Shop Orders" ON public.shop_orders FOR ALL USING (public.is_admin());
CREATE POLICY "User Access Own Orders" ON public.shop_orders FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admin All Access Feedback" ON public.feedback FOR ALL USING (public.is_admin());
CREATE POLICY "Public Can Read Feedback" ON public.feedback FOR SELECT USING (true);
CREATE POLICY "Member Create Own Feedback" ON public.feedback FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.patients p WHERE p.id = feedback.patient_id AND p.user_id = auth.uid())
);

-- Kebijakan ketat untuk Data Medis, Analytics, dan Admin Dashboard
CREATE POLICY "Admin access only Customer Segments" ON public.customer_segments FOR ALL USING (public.is_admin());
CREATE POLICY "Admin access only Medical Records" ON public.medical_records FOR ALL USING (public.is_admin());
CREATE POLICY "Member read own Medical Records" ON public.medical_records FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.patients p WHERE p.id = medical_records.patient_id AND p.user_id = auth.uid())
);

CREATE POLICY "Admin access only Communications" ON public.communications FOR ALL USING (public.is_admin());
CREATE POLICY "Admin access only Payments" ON public.payments FOR ALL USING (public.is_admin());
CREATE POLICY "Admin access only Notifications" ON public.notifications FOR ALL USING (public.is_admin());
