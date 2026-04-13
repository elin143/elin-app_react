export default function TableAdmin({ films }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        
        {/* HEADER */}
        <thead className="bg-purple-100 text-purple-500">
          <tr>
            <th className="p-3">Poster</th>
            <th className="p-3">Judul</th>
            <th className="p-3">Genre</th>
            <th className="p-3">Tahun</th>
            <th className="p-3">Sutradara</th>
            <th className="p-3">Durasi</th>
            <th className="p-3">Studio</th>
            <th className="p-3">Rating</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {films.map((film) => (
            <tr
              key={film.id}
              className="border-b hover:bg-pink-50 transition"
            >
              {/* POSTER */}
              <td className="p-2">
                <img
                  src={film.gambar}
                  className="w-14 h-16 object-cover rounded-lg"
                />
              </td>

              {/* DATA UTAMA */}
              <td className="p-3 font-medium">{film.judul}</td>
              <td className="p-3 text-gray-500">{film.genre}</td>
              <td className="p-3">{film.tahun}</td>

              {/* NESTED DATA */}
              <td className="p-3 text-gray-500">
                {film.sutradara?.nama}
              </td>

              <td className="p-3 text-gray-500">
                {film.detail?.durasi} min
              </td>

              <td className="p-3 text-gray-500">
                {film.produksi?.studio}
              </td>

              {/* RATING */}
              <td className="p-3">
                <span className="bg-yellow-100 text-yellow-500 px-2 py-1 rounded-full text-xs">
                  ⭐ {film.rating}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EMPTY */}
      {films.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          Tidak ada data 🥺
        </p>
      )}
    </div>
  );
}