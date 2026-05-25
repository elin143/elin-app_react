export default function Footer() {
    return (
        <footer
            className="
                bg-gradient-to-t
                from-pink-200
                via-rose-350
                to-white

                text-rose-900

                py-10
                mt-16
                border-t
                border-pink-100
            "
        >
            <div className="container mx-auto px-4 text-center">

                <h2 className="text-2xl font-bold mb-2">
                    Glow Beauty Clinic ✨
                </h2>

                <p className="text-rose-600 mb-6 text-sm max-w-md mx-auto">
                    Perawatan kecantikan modern untuk kulit sehat, glowing, dan natural setiap hari.
                </p>

                <div className="flex justify-center gap-6 mb-6 text-sm font-medium">
                    <a href="#" className="hover:text-rose-500 transition">
                        Home
                    </a>

                    <a href="#" className="hover:text-rose-500 transition">
                        Treatment
                    </a>

                    <a href="#" className="hover:text-rose-500 transition">
                        Dokter
                    </a>

                    <a href="#" className="hover:text-rose-500 transition">
                        Kontak
                    </a>
                </div>

                <div className="w-20 h-px bg-pink-200 mx-auto mb-4"></div>

                <p className="text-rose-400 text-xs">
                    © 2026 Glow Beauty Clinic. All rights reserved.
                </p>

            </div>
        </footer>
    );
}