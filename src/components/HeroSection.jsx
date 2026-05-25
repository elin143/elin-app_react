export default function HeroSection({
    title,
    subtitle,
    buttonText,
}) {
    return (
        <section
            className="
                relative
                overflow-hidden

                bg-gradient-to-br
                from-pink-100 via-rose-50 to-white

                text-rose-900

                rounded-3xl

                p-10
                mb-8

                shadow-lg
                shadow-pink-100
            "
        >
            {/* soft decorative glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-40"></div>

            <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-3 leading-tight">
                    {title}
                </h1>

                <p className="text-rose-700 mb-6 max-w-2xl text-base leading-relaxed">
                    {subtitle}
                </p>

                <button className="
                    bg-gradient-to-r
                    from-pink-300
                    via-rose-300
                    to-pink-400

                    text-rose-950

                    px-6 py-3

                    rounded-full

                    font-semibold

                    shadow-md
                    shadow-pink-200

                    hover:shadow-lg
                    hover:scale-105

                    transition-all duration-300
                ">
                    {buttonText}
                </button>
            </div>
        </section>
    );
}