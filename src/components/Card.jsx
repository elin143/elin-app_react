export default function Card({ children, className = "" }) {
    return (
        <div
            className={`
                bg-gradient-to-br from-white via-pink-200 to-rose-350

                border border-pink-100

                rounded-2xl

                shadow-md shadow-pink-100

                p-6

                transition-all duration-300

                hover:shadow-lg
                hover:-translate-y-1

                ${className}
            `}
        >
            {children}
        </div>
    );
}