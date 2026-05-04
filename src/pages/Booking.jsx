import PageHeader from "../components/PageHeader";
import orders from "../data/booking.json";

export default function Booking() {
    return (
        <div>
            <PageHeader/>
<div className="bg-gradient-to-br from-white via-pink-50 to-rose-50 p-8 rounded-[2.5rem] border-4 border-pink-100 shadow-md">
  <PageHeader
    title={
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-pink-400 tracking-tight font-serif italic">
          Appointment List
        </h1>
        <div className="h-1.5 w-16 bg-gradient-to-r from-pink-200 to-rose-300 rounded-full" />
      </div>
    }
    breadcrumb={
      <nav className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest">
        <span className="text-pink-300 hover:text-pink-400 transition-colors cursor-pointer">Home</span>
        <div className="w-1 h-1 rounded-full bg-pink-200" />
        <span className="text-rose-200">Appointments</span>
      </nav>
    }
  >
    <button className="group flex items-center px-8 py-3.5 font-bold text-pink-400 bg-pink-100 hover:bg-pink-200 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md active:translate-y-0.5">
      <span className="mr-2 text-xl opacity-70 group-hover:rotate-12 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </span>
      Add Appointment
    </button>
  </PageHeader>
</div>

<div className="bg-gradient-to-br from-white via-pink-50 to-rose-50 p-8 rounded-[2.5rem] border-4 border-pink-100 shadow-md mt-6">
  {/* PageHeader tetap sinkron dengan tema */}
  <PageHeader 
    title={<h1 className="text-3xl font-black text-pink-400 tracking-tight font-serif italic">Appointment List</h1>} 
    breadcrumb={["Home", "Appointments"]} 
  />

  <div className="mt-8 overflow-hidden rounded-3xl border border-pink-100 bg-white/70 backdrop-blur-sm shadow-sm">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-400 text-xs uppercase tracking-[0.15em]">
          <th className="p-5 font-bold">Booking ID</th>
          <th className="p-5 font-bold">Patient Name</th>
          <th className="p-5 font-bold">Treatment Type</th>
          <th className="p-5 font-bold">Therapist / Doctor</th>
          <th className="p-5 font-bold">Date & Time</th>
          <th className="p-5 font-bold">Status</th>
          <th className="p-5 font-bold">Payment</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr 
            key={order.bookingId} 
            className="text-center border-b border-pink-50 last:border-none hover:bg-pink-50/60 transition-all duration-300 group"
          >
            <td className="p-5 text-pink-300 font-medium text-sm">
              <span className="bg-pink-100 px-3 py-1 rounded-xl text-[11px] font-bold shadow-sm">
                #{order.bookingId}
              </span>
            </td>

            <td className="p-5 text-gray-600 font-bold text-sm">
              {order.patientName}
            </td>

            <td className="p-5 text-rose-400 font-semibold text-sm">
              {order.treatmentType}
            </td>

            <td className="p-5 text-gray-500 font-medium text-sm">
              {order.therapistDoctor}
            </td>

            <td className="p-5 text-pink-300 text-xs font-medium italic">
              {order.dateTime}
            </td>

            <td className="p-5">
              <span className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-400 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm">
                {order.status}
              </span>
            </td>

            <td className="p-5">
              <span className={`px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm ${
                order.paymentStatus === "Paid"
                  ? "bg-green-100 text-green-500"
                  : order.paymentStatus === "Pending"
                  ? "bg-yellow-100 text-yellow-500"
                  : "bg-red-100 text-red-400"
              }`}>
                {order.paymentStatus}
              </span>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
        </div>
    )
}