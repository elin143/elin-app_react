export default function FeatureSection({ features = [] }) {
    return (
        <section className="grid md:grid-cols-3 gap-6 mb-10">
            {features.map((feature) => (
                <div
                    key={feature.title}
                    className="
                        relative
                        overflow-hidden

                        bg-gradient-to-br
                        from-white
                        via-pink-50
                        to-rose-50

                        border border-pink-100

                        rounded-2xl

                        p-6

                        shadow-md shadow-pink-100

                        transition-all duration-300
                        hover:-translate-y-1
                        hover:shadow-lg
                    "
                >
                    {/* soft glow decoration */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 bg-pink-200 rounded-full blur-2xl opacity-30"></div>

                    <div className="relative z-10">
                        <div className="text-4xl mb-4">
                            {feature.icon}
                        </div>

                        <h3 className="text-lg font-semibold text-rose-900 mb-2">
                            {feature.title}
                        </h3>

                        <p className="text-rose-600 text-sm leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
}