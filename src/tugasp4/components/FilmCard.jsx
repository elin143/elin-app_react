export default function FilmCard({ film }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition overflow-hidden">
      
      {/* IMAGE */}
      <img
        src={film.gambar}
        alt={film.judul}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        
        {/* JUDUL */}
        <h2 className="font-semibold text-lg text-gray-700">
          {film.judul}
        </h2>

        {/* TAHUN + GENRE */}
        <p className="text-sm text-gray-400">
          {film.tahun} • {film.genre}
        </p>

        {/* RATING + BADGE */}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-yellow-400 text-sm">
            ⭐ {film.rating}
          </span>

          <span className="text-xs bg-pink-100 text-pink-400 px-2 py-1 rounded-full">
            {film.genre}
          </span>
        </div>

        {/* NESTED DATA (INI YANG KAMU BUTUHIN) */}
        <div className="mt-3 space-y-1 text-xs text-gray-400">
          <p>🎬 {film.sutradara?.nama}</p>
          <p>⏱ {film.detail?.durasi} menit</p>
          <p>🏢 {film.produksi?.studio}</p>
        </div>

      </div>
    </div>
  );
}