import ProductCard from "./ProductCard";

export default function ProductsSection({ products = [] }) {
    return (
        <section className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            gap-20
        ">
            {products.map((product) => (
                <div
                    key={product.title}
                    className="
                        transition-all duration-300
                        hover:-translate-y-1
                    "
                >
                    <ProductCard
                        image={product.image}
                        title={product.title}
                        category={product.category}
                        price={product.price}
                        description={product.description}
                    />
                </div>
            ))}
        </section>
    );
}