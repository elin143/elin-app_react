export default function Table({ headers, children }) {
    return (
        <div className="overflow-x-auto rounded-2xl shadow-md shadow-pink-100 border border-pink-100">
            <table className="w-full">

                <thead className="
                    bg-gradient-to-r
                    from-pink-100
                    to-rose-100
                ">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="
                                    px-5 py-4
                                    text-left
                                    text-rose-800
                                    text-sm
                                    font-semibold
                                    tracking-wide
                                "
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="bg-white/70 backdrop-blur-md">
                    {children}
                </tbody>

            </table>
        </div>
    );
}