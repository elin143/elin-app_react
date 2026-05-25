export default function Badge({ children, type = "primary" }) {
    const types = {
        primary:
            "bg-gradient-to-r from-pink-300 to-rose-300 text-rose-900 shadow-md shadow-pink-200",

        secondary:
            "bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 shadow-md shadow-pink-100",

        success:
            "bg-gradient-to-r from-emerald-300 to-teal-300 text-emerald-900 shadow-md shadow-emerald-200",

        danger:
            "bg-gradient-to-r from-rose-300 to-pink-400 text-rose-900 shadow-md shadow-rose-200",

        warning:
            "bg-gradient-to-r from-fuchsia-300 to-pink-300 text-fuchsia-900 shadow-md shadow-fuchsia-200",

        premium:
            "bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 text-rose-950 shadow-lg shadow-pink-300",

        vip:
            "bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 text-purple-950 shadow-lg shadow-purple-200",
    };

    return (
        <span
            className={`
                inline-flex items-center
                px-4 py-1.5
                rounded-full
                text-xs
                font-semibold
                tracking-wide
                shadow-sm
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-lg
                ${types[type]}
            `}
        >
            {children}
        </span>
    );
}