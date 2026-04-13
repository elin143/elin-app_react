import { useState } from "react";
import filmsData from "./Film.json";
import FilmGuest from "./components/FilmGuest";
import TableAdmin from "./components/TableAdmin";
import SearchFilter from "./components/SearchFilter";

export default function FilmPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [view, setView] = useState("guest");

  const filteredFilms = filmsData.filter((film) => {
    return (
      film.judul.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "" || film.genre === genre) &&
      (rating === "" || film.rating >= parseFloat(rating))
    );
  });

return (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6 text-gray-700">
    
    {/* HEADER */}
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-purple-400">
        🎬 Film Diary
      </h1>
      <p className="text-gray-500 mt-1">
        koleksi film favoritmu 💕
      </p>
    </div>

    {/* SEARCH */}
    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md mb-6">
      <SearchFilter
        setSearch={setSearch}
        setGenre={setGenre}
        setRating={setRating}
      />
    </div>

    {/* SWITCH */}
    <div className="flex justify-center gap-3 mb-6">
      <button
        onClick={() => setView("guest")}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition
        ${view === "guest"
          ? "bg-pink-300 text-white"
          : "bg-white shadow hover:bg-pink-100"}`}
      >
        🎀 Guest
      </button>

      <button
        onClick={() => setView("admin")}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition
        ${view === "admin"
          ? "bg-purple-300 text-white"
          : "bg-white shadow hover:bg-purple-100"}`}
      >
        🧁 Admin
      </button>
    </div>

    {view === "guest" ? (
      <FilmGuest films={filteredFilms} />
    ) : (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-purple-400">
          📊 Data Film
        </h2>
        <TableAdmin films={filteredFilms} />
      </div>
    )}
  </div>
);
}