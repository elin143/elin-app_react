import { useState, useEffect, useRef } from "react";

function generateTimeline(patient) {
  if (!patient) return [];
  const treatments = patient.treatmentHistory
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const lastVisitDate = new Date(patient.lastVisit);
  return treatments.map((treatment, index) => {
    const date = new Date(lastVisitDate);
    date.setMonth(date.getMonth() - index * 2);
    return {
      id: index,
      treatment,
      date: date.toISOString().split("T")[0],
      note: `${treatment} session completed successfully.`,
    };
  });
}

export default function PatientTimeline({ patient, onClose }) {
  const [filterYear, setFilterYear] = useState("all");
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const latestRef = useRef(null);
  const containerRef = useRef(null);
  const replyInputRef = useRef(null);

  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!patient) return;

    setLoading(true);

    const timer = setTimeout(() => {
      const data = generateTimeline(patient);
      setTimeline(data);

      setFeedback({
        rating: Math.floor(Math.random() * 2) + 4,
        comment: [
          "Pelayanan sangat memuaskan dan staff ramah.",
          "Treatment berjalan nyaman dan hasilnya bagus.",
          "Klinik bersih dan profesional.",
          "Dokter menjelaskan prosedur dengan jelas.",
          "Akan kembali untuk treatment berikutnya.",
        ][Math.floor(Math.random() * 5)],
      });

      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [patient]);

  useEffect(() => {
    if (!loading && latestRef.current) {
      latestRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [loading]);

  const availableYears = [
    "all",
    ...new Set(timeline.map((t) => new Date(t.date).getFullYear().toString())),
  ];

  const filtered =
    filterYear === "all"
      ? timeline
      : timeline.filter(
          (t) => new Date(t.date).getFullYear().toString() === filterYear,
        );

  const [reply, setReply] = useState("");
  const [replySent, setReplySent] = useState(false);

  if (!patient) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div
        ref={containerRef}
        className="bg-gradient-to-br from-white via-pink-50 to-rose-50 rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto border-4 border-pink-100 shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-pink-100 px-6 py-4 rounded-t-3xl z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-pink-400 font-serif italic">
                Treatment History
              </h2>
              <p className="text-xs text-pink-300 font-semibold mt-0.5">
                {patient.name} · #{patient.patientId}
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-pink-100 text-pink-400 w-9 h-9 rounded-full font-bold hover:bg-pink-200 transition-colors text-sm"
            >
              ✕
            </button>
          </div>

          {/* Filter Tahun */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => setFilterYear(year)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all duration-200 ${
                  filterYear === year
                    ? "bg-pink-400 text-white shadow-sm"
                    : "bg-pink-100 text-pink-400 hover:bg-pink-200"
                }`}
              >
                {year === "all" ? "All Years" : year}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Body */}
        <div className="px-6 py-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-400 rounded-full animate-spin" />
              <p className="text-pink-300 text-sm font-semibold">
                Loading history...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-pink-300 py-10 text-sm italic">
              No records found for this year.
            </p>
          ) : (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-200 via-rose-200 to-transparent rounded-full" />
              <div className="space-y-5 ml-10">
                {filtered.map((item, index) => (
                  <div
                    key={item.id}
                    ref={index === 0 ? latestRef : null}
                    className="relative bg-white/80 rounded-2xl p-4 border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="absolute -left-[2.85rem] top-4 w-4 h-4 bg-pink-300 rounded-full border-2 border-white shadow-sm" />
                    {index === 0 && (
                      <span className="absolute top-3 right-3 bg-rose-100 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Latest
                      </span>
                    )}
                    <p className="text-[11px] text-pink-300 font-bold uppercase tracking-widest mb-1">
                      {new Date(item.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-gray-700 font-bold text-sm">
                      {item.treatment}
                    </p>
                    <p className="text-gray-400 text-xs mt-1 italic">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Patient */}
        <div className="mx-6 mb-6 bg-pink-50 rounded-2xl p-4 border border-pink-100">
          <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-2">
            Patient Info
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <span>Skin Type</span>
            <span className="font-semibold text-gray-600 text-right">
              {patient.allergiesSkinType}
            </span>
            <span>Membership</span>
            <span className="font-semibold text-gray-600 text-right">
              {patient.membershipStatus}
            </span>
            <span>Last Visit</span>
            <span className="font-semibold text-gray-600 text-right">
              {patient.lastVisit}
            </span>
          </div>
        </div>

        {/* Patient Feedback */}
        <div className="mx-6 mb-6 bg-white rounded-2xl p-4 border border-pink-100 shadow-sm">
          <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-3">
            Patient Feedback
          </p>

          {feedback && (
            <>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < feedback.rating ? "text-yellow-400" : "text-gray-200"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-600 italic mb-4">
                "{feedback.comment}"
              </p>

              <div className="border-t border-pink-100 pt-3">
                <p className="text-[11px] text-pink-300 font-bold uppercase tracking-widest mb-2">
                  Admin Reply
                </p>

                <input
                  ref={replyInputRef}
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full px-3 py-2 border border-pink-100 rounded-xl text-sm focus:outline-none focus:border-pink-300"
                />

                <button
                  onClick={() => {
                    if (!reply.trim()) return;
                    setReplySent(true);
                  }}
                  className="w-full mt-3 flex items-center justify-center gap-2 bg-pink-400 hover:bg-pink-500 text-white py-2 rounded-xl text-sm font-bold transition-all"
                >
                  <span>📩</span>
                  Send Reply
                </button>

                {replySent && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-5">
                    <p className="text-green-600 text-xs font-semibold mb-2">
                      ✓ Reply sent successfully
                    </p>

                    <p className="text-gray-600 text-sm italic">"{reply}"</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
