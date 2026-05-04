import PageHeader from "../components/PageHeader";
import customer from "../data/pasien.json";

export default function Pasien(){
    return (
        <div>
            <PageHeader/>
<div className="bg-gradient-to-br from-white via-pink-50 to-rose-50 p-8 rounded-[2.5rem] border-4 border-pink-100 shadow-md">
  <PageHeader
    title={
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-pink-400 tracking-tight font-serif italic">
          Patient List
        </h1>
        <div className="h-1.5 w-16 bg-gradient-to-r from-pink-200 to-rose-300 rounded-full" />
      </div>
    }
    breadcrumb={
      <nav className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest">
        <span className="text-pink-300 hover:text-pink-400 transition-colors cursor-pointer">Home</span>
        <div className="w-1 h-1 rounded-full bg-pink-200" />
        <span className="text-rose-200">Patients</span>
      </nav>
    }
  >
    <button className="group flex items-center px-8 py-3.5 font-bold text-pink-400 bg-pink-100 hover:bg-pink-200 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md active:translate-y-0.5">
      <span className="mr-2 text-xl opacity-70 group-hover:rotate-12 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </span>
      Add Patient
    </button>
  </PageHeader>
</div>

<div className="bg-gradient-to-br from-white via-pink-50 to-rose-50 p-8 rounded-[2.5rem] border-4 border-pink-100 shadow-md mt-6">
  
  <PageHeader 
    title={<h1 className="text-3xl font-black text-pink-400 tracking-tight font-serif italic">Patient List</h1>} 
    breadcrumb={["Home", "Patients"]} 
  />

  <div className="mt-8 overflow-hidden rounded-3xl border border-pink-100 bg-white/70 backdrop-blur-sm shadow-sm">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-400 text-xs uppercase tracking-[0.15em]">
          <th className="p-4 font-bold">Patient ID</th>
          <th className="p-4 font-bold">Name</th>
          <th className="p-4 font-bold">Age</th>
          <th className="p-4 font-bold">Gender</th>
          <th className="p-4 font-bold">Phone</th>
          <th className="p-4 font-bold">Email</th>
          <th className="p-4 font-bold">Treatment History</th>
          <th className="p-4 font-bold">Allergies / Skin Type</th>
          <th className="p-4 font-bold">Membership</th>
          <th className="p-4 font-bold">Last Visit</th>
        </tr>
      </thead>

      <tbody className="bg-white/50">
        {customer.map((c) => (
          <tr 
            key={c.patientId} 
            className="text-center border-b border-pink-50 last:border-none hover:bg-pink-50/60 transition-all duration-300"
          >
            <td className="p-4 text-pink-300 font-bold text-sm">
              <span className="bg-pink-100 px-3 py-1 rounded-xl text-[11px] shadow-sm">
                #{c.patientId}
              </span>
            </td>

            <td className="p-4 text-gray-600 font-bold text-sm">
              {c.name}
            </td>

            <td className="p-4 text-gray-500 text-sm">
              {c.age}
            </td>

            <td className="p-4 text-gray-500 text-sm">
              {c.gender}
            </td>

            <td className="p-4 text-pink-300 text-sm">
              {c.phone}
            </td>

            <td className="p-4 text-rose-300 text-sm">
              {c.email}
            </td>

            <td className="p-4 text-gray-600 text-sm font-medium">
              {c.treatmentHistory}
            </td>

            <td className="p-4 text-gray-500 text-sm italic">
              {c.allergiesSkinType}
            </td>

            <td className="p-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                c.membershipStatus === "Platinum"
                  ? "bg-purple-100 text-purple-400"
                  : c.membershipStatus === "Gold"
                  ? "bg-yellow-100 text-yellow-500"
                  : c.membershipStatus === "Silver"
                  ? "bg-gray-200 text-gray-500"
                  : "bg-pink-100 text-pink-400"
              }`}>
                {c.membershipStatus}
              </span>
            </td>

            <td className="p-4 text-pink-300 text-sm italic">
              {c.lastVisit}
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