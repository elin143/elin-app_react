import FilmCard from "./FilmCard";

export default function FilmGuest({ films }) {
  if (films.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">
        Film tidak ditemukan 🥺
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
}