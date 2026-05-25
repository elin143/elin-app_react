export default function Alert({ type = "info", title, children }) {
    const types = {
        info: "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-400 text-pink-800",
        success: "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-400 text-rose-800",
        warning: "bg-gradient-to-r from-fuchsia-50 to-pink-50 border-fuchsia-400 text-fuchsia-800",
        danger: "bg-gradient-to-r from-pink-100 to-rose-100 border-pink-600 text-pink-900",
    };

    return (
        <div
            className={`${types[type]} border-l-4 rounded-2xl p-5 mb-4 shadow-md`}
        >
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm leading-relaxed">{children}</p>
        </div>
    );
}