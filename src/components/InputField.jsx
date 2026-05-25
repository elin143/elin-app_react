export default function InputField({
    label,
    name,
    type = "text",
    placeholder = "",
}) {
    return (
        <div className="mb-5">
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-rose-800 mb-2"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                className="
                    w-full

                    px-4 py-2.5

                    rounded-xl

                    border border-pink-200

                    bg-pink-50/40

                    text-rose-900

                    placeholder:text-rose-300

                    shadow-sm

                    focus:outline-none
                    focus:ring-2
                    focus:ring-pink-300

                    focus:bg-white

                    transition-all duration-300
                "
            />
        </div>
    );
}