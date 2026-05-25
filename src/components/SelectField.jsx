export default function SelectField({
    label,
    name,
    options = [],
}) {
    return (
        <div className="mb-5">
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-rose-800 mb-2"
            >
                {label}
            </label>

            <select
                id={name}
                name={name}
                className="
                    w-full

                    px-4 py-2.5

                    rounded-xl

                    border border-pink-200

                    bg-pink-50/40

                    text-rose-900

                    shadow-sm

                    focus:outline-none
                    focus:ring-2
                    focus:ring-pink-300

                    focus:bg-white

                    transition-all duration-300
                "
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}