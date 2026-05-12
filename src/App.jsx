import React, { Suspense, useState } from "react";
import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
  const Dashboard = React.lazy(() => import("./pages/Dashboard"))
  const Booking = React.lazy(() => import("./pages/Booking"))
  const Pasien = React.lazy(() => import("./pages/Pasien"))
  const PasienDetail = React.lazy(() => import("./pages/PasienDetail"))
  const BookingDetail = React.lazy(() => import("./pages/BookingDetail"))
  const NotFound = React.lazy(() => import("./pages/NotFound"))
  const Login = React.lazy(() => import("./pages/auth/Login"))
  const Register = React.lazy(() => import("./pages/auth/Register"))
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
  const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
  const Error401 = React.lazy(() => import("./pages/Error401"))
  const Error400 = React.lazy(() => import("./pages/Error400"))
  const Error403 = React.lazy(() => import("./pages/Error403"))
  const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
  return (
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route element={<MainLayout/>}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/pasien" element={<Pasien />} />
          <Route path="/error-400" element={<Error400 />} />
          <Route path="/error-401" element={<Error401 />} />
          <Route path="/error-403" element={<Error403 />} />
          <Route path="/Pasien/:id" element={<PasienDetail />} />
          <Route path="/Booking/:id" element={<BookingDetail/>} />
          </Route>

          <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot" element={<Forgot/>}/>
          </Route>
        </Routes>
        </Suspense>
  );
}


export default App;