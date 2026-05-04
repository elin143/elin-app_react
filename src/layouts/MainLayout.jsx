import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { Outlet } from "react-router-dom"

export default function MainLayout(){
    return(
     <div className="h-screen bg-pink-50 overflow-hidden">
            
            {/* SIDEBAR */}
            <aside className="fixed top-0 left-0 w-64 h-screen z-50">
                <Sidebar />
            </aside>

            {/* HEADER */}
            <header className="fixed top-0 left-64 right-0 h-[90px] z-40">
                <Header />
            </header>

            {/* MAIN CONTENT */}
            <main className="ml-64 mt-[90px] h-[calc(100vh-90px)] overflow-y-auto overflow-x-auto p-6">
                <Outlet />
            </main>

        </div>
    );
}
