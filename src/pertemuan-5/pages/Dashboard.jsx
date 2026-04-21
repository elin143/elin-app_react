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
    { name: "Total Order", value: 81 },
    { name: "Customer Growth", value: 22 },
    { name: "Total Revenue", value: 62 },
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

  const COLORS = ["#f2acc3", "#b4f0af", "#9fd5f5"];

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">

        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <FaShoppingCart className="text-green-500" />
          </div>
          <div>
            <h2 className="font-bold text-lg">75</h2>
            <p className="text-gray-400 text-sm">Total Orders</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaTruck className="text-blue-500" />
          </div>
          <div>
            <h2 className="font-bold text-lg">175</h2>
            <p className="text-gray-400 text-sm">Total Delivered</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-full">
            <FaTimesCircle className="text-red-500" />
          </div>
          <div>
            <h2 className="font-bold text-lg">40</h2>
            <p className="text-gray-400 text-sm">Total Canceled</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <FaDollarSign className="text-yellow-500" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Rp.128</h2>
            <p className="text-gray-400 text-sm">Total Revenue</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <FaUsers className="text-purple-500" />
          </div>
          <div>
            <h2 className="font-bold text-lg">320</h2>
            <p className="text-gray-400 text-sm">Total Customers</p>
          </div>
        </div>

      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        {/* PIE CHART */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Pie Chart</h2>

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
                <p className="text-sm mt-2 font-semibold">
                  {entry.value}%
                </p>
                <p className="text-gray-400 text-xs">
                  {entry.name}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* LINE CHART */}
        <div className="bg-white p-4 rounded-lg shadow">
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-semibold">Chart Order</h2>
              <p className="text-gray-400 text-xs">
                Weekly performance
              </p>
            </div>

            <button className="border px-3 py-1 rounded text-blue-500">
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
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;