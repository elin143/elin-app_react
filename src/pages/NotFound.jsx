import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4">
      
      <div className="text-center max-w-md">
        
        {/* Hewan lucu */}
        <div className="text-7xl animate-bounce">🐣</div>

        {/* 404 gemes */}
        <h1 className="mt-4 text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          404
        </h1>

        {/* Pesan lucu pendek */}
        <p className="mt-3 text-xl font-semibold text-pink-500">
          Aduh, tersesat nih~ 🥺
        </p>

        <p className="mt-2 text-purple-400 font-medium">
          Halamannya lagi <span className="italic">"me time"</span> dulu...
        </p>

        {/* Tombol imut */}
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 rounded-full bg-pink-300 text-white font-semibold shadow-md hover:bg-pink-400 hover:scale-105 transition duration-300"
        >
          🍬 Ayo pulang 🍬
        </Link>

        {/* Stiker kecil lucu */}
        <div className="mt-5 text-3xl opacity-50">
          🧸 ✨ 🍰
        </div>

        {/* Blobs pastel */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-2xl opacity-40"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      </div>
    </div>
  );
}