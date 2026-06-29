import MemberSidebar from "../components/MemberSidebar";
import MemberHeader from "../components/MemberHeader";
import { Outlet } from "react-router-dom";

export default function MemberLayout() {
  return (
    <div className="h-screen" style={{ background: "#FDF6F8", overflow: "hidden" }}>
      {/* SIDEBAR */}
      <aside className="fixed top-0 left-0 w-64 h-screen z-50">
        <MemberSidebar />
      </aside>

      {/* HEADER */}
      <header className="fixed top-0 left-64 right-0 h-[90px] z-40">
        <MemberHeader />
      </header>

      {/* MAIN CONTENT */}
      <main className="ml-64 mt-[90px] h-[calc(100vh-90px)] overflow-y-auto overflow-x-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
