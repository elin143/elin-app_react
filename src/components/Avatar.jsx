export default function Avatar({ name, size = "md" }) {
    const sizes = {
        sm: "w-10 h-10 text-sm",
        md: "w-14 h-14 text-lg",
        lg: "w-20 h-20 text-2xl",
    };

    return (
        <div className="relative inline-flex">
            <div className="absolute inset-0 rounded-full bg-pink-300 blur-md opacity-40"></div>

            <div
                className={`
                    ${sizes[size]}
                    relative
                    rounded-full
                    bg-gradient-to-br
                    from-pink-200
                    via-pink-400
                    to-rose-500
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-white
                    border-4
                    border-white
                    shadow-xl
                    ring-2
                    ring-pink-100
                `}
            >
                {name?.charAt(0).toUpperCase()}
            </div>
        </div>
    );
}