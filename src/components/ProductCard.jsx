import Card from "../components/Card";

export default function ProductCard({
    image,
    title,
    category,
    price,
    description
}) {
    return (
        <Card className="overflow-hidden">

            {/* IMAGE */}
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-52 object-cover"
                />

                {/* soft overlay glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-100/40 to-transparent"></div>
            </div>

            <div className="p-5">

                {/* CATEGORY */}
                <span className="
                    inline-block
                    bg-gradient-to-r
                    from-pink-200
                    to-rose-200
                    text-rose-800

                    text-xs
                    px-3 py-1

                    rounded-full

                    mb-3

                    border border-pink-200
                ">
                    {category}
                </span>

                {/* TITLE */}
                <h2 className="text-lg font-semibold text-rose-900 mb-2">
                    {title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-rose-600 text-sm mb-4 leading-relaxed">
                    {description}
                </p>

                {/* BOTTOM */}
                <div className="flex items-center justify-between">

                    <h3 className="text-xl font-bold text-rose-700">
                        {price}
                    </h3>

                    <button className="
                        bg-gradient-to-r
                        from-pink-300
                        via-rose-300
                        to-pink-400

                        text-rose-950

                        px-4 py-2

                        rounded-full

                        text-sm
                        font-semibold

                        shadow-md
                        shadow-pink-200

                        hover:shadow-lg
                        hover:scale-105

                        transition-all duration-300
                    ">
                        Detail
                    </button>

                </div>

            </div>
        </Card>
    );
}