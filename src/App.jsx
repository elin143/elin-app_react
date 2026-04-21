import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import "./assets/tailwind.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import { Routes, Route } from "react-router-dom";
import Customers from "./pages/Customer";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

function App() {
  // const [count, setCount] = useState(0);

  return (
 
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        
        <Header />


        <div className="p-6">
          <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
        </div>

      </div>
      </div>

  );
}

export default App;