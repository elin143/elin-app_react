export default function Button({
    children,
    type = "primary",
    className = "",
    ...props
}) {
    const types = {
        primary:
            "bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 text-rose-950 shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300",

        secondary:
            "bg-white/80 backdrop-blur text-rose-700 border border-pink-200 hover:bg-pink-100 shadow-sm",

        success:
            "bg-gradient-to-r from-emerald-200 via-green-200 to-teal-200 text-emerald-900 shadow-md shadow-emerald-200 hover:shadow-lg",

        danger:
            "bg-gradient-to-r from-rose-300 via-pink-300 to-red-300 text-rose-950 shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300",

        warning:
            "bg-gradient-to-r from-fuchsia-200 via-pink-200 to-rose-200 text-fuchsia-900 shadow-md shadow-fuchsia-200 hover:shadow-lg",

        premium:
            "bg-gradient-to-r from-pink-300 via-fuchsia-300 to-rose-300 text-rose-950 shadow-lg shadow-pink-300 hover:shadow-xl",
    };

    return (
        <button
            className={`
                ${types[type]}

                px-6 py-2.5
                rounded-full

                font-semibold
                tracking-wide

                transition-all duration-300

                hover:-translate-y-1
                hover:scale-[1.02]

                active:scale-95

                border border-white/40

                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}