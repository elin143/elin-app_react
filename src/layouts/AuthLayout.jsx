import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center px-6 py-10 overflow-hidden">
      
      {/* CONTAINER FULL WEB */}
      <div className="w-full max-w-7xl">
        <Outlet />
      </div>

    </div>
  );
}