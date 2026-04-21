import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./pages/Dashboard";
import PageHeader from "./components/PageHeader";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import "./assets/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        
        <Header />

        <div className="p-6">
          <PageHeader />
          <Dashboard />
        </div>

      </div>

    </div>

  </React.StrictMode>
);