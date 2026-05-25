export default function Modal({ title, children }) {
    return (
        <div className="border border-pink-100 rounded-2xl shadow-lg shadow-pink-100 bg-gradient-to-br from-white via-pink-50 to-rose-50 p-6 max-w-md">

            <div className="flex items-start justify-between mb-4">

                <h3 className="text-xl font-bold text-rose-900">
                    {title}
                </h3>

                <button className="text-rose-300 hover:text-rose-500 text-xl leading-none transition">
                    ✕
                </button>

            </div>

            <div className="text-rose-700 mb-5 text-sm leading-relaxed">
                {children}
            </div>

            <div className="flex justify-end gap-3">

                <button className="
                    px-4 py-2
                    rounded-full
                    bg-pink-100
                    text-rose-700
                    border border-pink-200
                    hover:bg-pink-200
                    transition
                ">
                    Batal
                </button>

                <button className="
                    px-5 py-2
                    rounded-full
                    bg-gradient-to-r
                    from-pink-300
                    via-rose-300
                    to-pink-400
                    text-rose-950
                    shadow-md shadow-pink-200
                    hover:shadow-lg
                    hover:scale-105
                    transition-all duration-300
                ">
                    Simpan
                </button>

            </div>

        </div>
    );
}