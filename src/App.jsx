import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
  // ── LAYOUTS ──
  const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));
  const MemberLayout = React.lazy(() => import("./layouts/MemberLayout"));
  const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
  const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

  // ── GUEST PAGES ──
  const GuestDashboard = React.lazy(() => import("./pages/guest/GuestDashboard"));

  // ── MEMBER PAGES ──
  const MemberDashboard = React.lazy(() => import("./pages/member/MemberDashboard"));
  const MyAppointments = React.lazy(() => import("./pages/member/MyAppointments"));
  const MyProfile = React.lazy(() => import("./pages/member/MyProfile"));
  const Benefits = React.lazy(() => import("./pages/member/Benefits"));
  const Treatments = React.lazy(() => import("./pages/member/Treatments"));
  const Rewards = React.lazy(() => import("./pages/member/Rewards"));
  const Shop = React.lazy(() => import("./pages/member/Shop"));

  // ── ADMIN PAGES ──
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Booking = React.lazy(() => import("./pages/Booking"));
  const BookingDetail = React.lazy(() => import("./pages/BookingDetail"));
  const Pasien = React.lazy(() => import("./pages/Pasien"));
  const PasienDetail = React.lazy(() => import("./pages/PasienDetail"));
  const MedicalRecords = React.lazy(() => import("./pages/admin/MedicalRecords"));
  const TreatmentManagement = React.lazy(() => import("./pages/admin/TreatmentManagement"));
  const ProductManagement = React.lazy(() => import("./pages/admin/ProductManagement"));
  const MembershipLoyalty = React.lazy(() => import("./pages/admin/MembershipLoyalty"));
  const PromotionManagement = React.lazy(() => import("./pages/admin/PromotionManagement"));
  const CommunicationManagement = React.lazy(() => import("./pages/admin/CommunicationManagement"));
  const CustomerFeedback = React.lazy(() => import("./pages/admin/CustomerFeedback"));
  const PaymentManagement = React.lazy(() => import("./pages/admin/PaymentManagement"));
  const ReportsAnalytics = React.lazy(() => import("./pages/admin/ReportsAnalytics"));
  const NotificationManagement = React.lazy(() => import("./pages/admin/NotificationManagement"));
  const Settings = React.lazy(() => import("./pages/admin/Settings"));
  const Components = React.lazy(() => import("./pages/Components"));
  const CustomerSegmen = React.lazy(() => import("./pages/CustomerSegmen"));
  const Error400 = React.lazy(() => import("./pages/Error400"));
  const Error401 = React.lazy(() => import("./pages/Error401"));
  const Error403 = React.lazy(() => import("./pages/Error403"));
  const NotFound = React.lazy(() => import("./pages/NotFound"));

  // ── AUTH PAGES ──
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* ── GUEST: No Sidebar/Header, GuestDashboard has its own navbar ── */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<GuestDashboard />} />
        </Route>

        {/* ── MEMBER: Sidebar kiri + Header atas ── */}
        <Route element={<MemberLayout />}>
          <Route path="/Member" element={<MemberDashboard />} />
          <Route path="/Member/appointments" element={<MyAppointments />} />
          <Route path="/Member/profile" element={<MyProfile />} />
          <Route path="/Member/benefits" element={<Benefits />} />
          <Route path="/Member/treatments" element={<Treatments />} />
          <Route path="/Member/rewards" element={<Rewards />} />
          <Route path="/Member/shop" element={<Shop />} />
        </Route>

        {/* ── ADMIN: Sidebar kiri + Header atas ── */}
        <Route element={<MainLayout />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/Booking/:id" element={<BookingDetail />} />
          <Route path="/pasien" element={<Pasien />} />
          <Route path="/Pasien/:id" element={<PasienDetail />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/treatments-admin" element={<TreatmentManagement />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/membership" element={<MembershipLoyalty />} />
          <Route path="/promotions" element={<PromotionManagement />} />
          <Route path="/communications" element={<CommunicationManagement />} />
          <Route path="/feedback" element={<CustomerFeedback />} />
          <Route path="/payments" element={<PaymentManagement />} />
          <Route path="/reports" element={<ReportsAnalytics />} />
          <Route path="/notifications" element={<NotificationManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/Components" element={<Components />} />
          <Route path="/CustomerSegmen" element={<CustomerSegmen />} />
          <Route path="/error-400" element={<Error400 />} />
          <Route path="/error-401" element={<Error401 />} />
          <Route path="/error-403" element={<Error403 />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ── AUTH: Centered gradient layout ── */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
