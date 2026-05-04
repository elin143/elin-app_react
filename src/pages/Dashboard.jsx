import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";

import {
  FaShoppingCart,
  FaTruck,
  FaTimesCircle,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // DATA
  const pieData = [
    { name: "Facial Treatment", value: 81 },
    { name: "Skin Consultation", value: 22 },
    { name: "Beauty Revenue", value: 62 },
  ];

  const lineData = [
    { name: "Sunday", value: 100 },
    { name: "Monday", value: 200 },
    { name: "Tuesday", value: 350 },
    { name: "Wednesday", value: 200 },
    { name: "Thursday", value: 150 },
    { name: "Friday", value: 250 },
    { name: "Saturday", value: 400 },
  ];

  const COLORS = ["#f9c5d5", "#fbcfe8", "#f8b4d9"];

  return (
    <div className="flex bg-pink-50 min-h-screen">
      {/* <Sidebar /> */}

      <div className="flex-1">
        {/* <Header /> */}

        <div className="p-6">
          <PageHeader />

          {/* CARDS */}
          <div className="grid grid-cols-5 gap-4 mt-6">

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 border border-pink-100">
              <div className="bg-pink-100 p-3 rounded-full">
                <FaShoppingCart className="text-pink-400" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-pink-500">300</h2>
                <p className="text-pink-300 text-sm">Beauty Orders</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 border border-pink-100">
              <div className="bg-rose-100 p-3 rounded-full">
                <FaTruck className="text-rose-400" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-rose-500">196</h2>
                <p className="text-pink-300 text-sm">Treatment Completed</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 border border-pink-100">
              <div className="bg-pink-100 p-3 rounded-full">
                <FaTimesCircle className="text-pink-300" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-pink-400">50</h2>
                <p className="text-pink-300 text-sm">Canceled Booking</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 border border-pink-100">
              <div className="bg-rose-100 p-3 rounded-full">
                <FaDollarSign className="text-rose-400" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-rose-500">Rp.140</h2>
                <p className="text-pink-300 text-sm">Clinic Revenue</p>
              </div>
            </div>

            {/* IMPROVISASI */}
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 border border-pink-100">
              <div className="bg-pink-100 p-3 rounded-full">
                <FaUsers className="text-pink-400" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-pink-500">320</h2>
                <p className="text-pink-300 text-sm">Beauty Patients</p>
              </div>
            </div>

          </div>

          {/* CHART SECTION */}
          <div className="grid grid-cols-2 gap-6 mt-6">

            {/* PIE CHART */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-pink-100">
              <h2 className="font-semibold mb-4 text-pink-500">Beauty Service Chart</h2>

              <div className="flex justify-around">

                {pieData.map((entry, index) => (
                  <div key={index} className="text-center">
                    <PieChart width={120} height={120}>
                      <Pie
                        data={[entry]}
                        dataKey="value"
                        innerRadius={30}
                        outerRadius={50}
                        fill={COLORS[index]}
                      />
                    </PieChart>
                    <p className="text-sm mt-2 font-semibold text-pink-500">
                      {entry.value}%
                    </p>
                    <p className="text-pink-300 text-xs">
                      {entry.name}
                    </p>
                  </div>
                ))}

              </div>
            </div>

            {/* LINE CHART */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-pink-100">
              
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-pink-500">Patient Visit Trend</h2>
                  <p className="text-pink-300 text-xs">
                    Weekly beauty clinic performance
                  </p>
                </div>

                <button className="border border-pink-200 px-3 py-1 rounded text-pink-400 hover:bg-pink-50">
                  Save Report
                </button>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineData}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#f9a8d4"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;