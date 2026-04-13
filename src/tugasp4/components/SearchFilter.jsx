export default function SearchFilter({ setSearch, setGenre, setRating }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-4">
      <input
        type="text"
        placeholder="Search film..."
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded"
      />

      <select
        onChange={(e) => setGenre(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Genre</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Animation">Animation</option>
        <option value="Horror">Horror</option>
        <option value="Romance">Romance</option>
      </select>

      <select
        onChange={(e) => setRating(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Rating</option>
        <option value="8">≥ 8</option>
        <option value="7">≥ 7</option>
      </select>
    </div>
  );
}