import { FaSpa } from "react-icons/fa";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200">
            
            {/* OUTER GLOW */}
            <div className="relative flex items-center justify-center mb-8">
                
                {/* SPIN RING */}
                <div className="w-20 h-20 rounded-full border-4 border-pink-200 border-t-pink-400 animate-spin"></div>

                {/* INNER ICON */}
                <div className="absolute w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center">
                    <FaSpa className="text-pink-400 text-2xl animate-pulse" />
                </div>

            </div>

            {/* TEXT */}
            <h2 className="text-3xl font-black text-pink-400 font-serif italic tracking-wide">
                Beauty Clinic
            </h2>

            <p className="text-pink-300 text-lg mt-2 font-medium">
                Preparing your elegant dashboard...
            </p>

            {/* DOTS */}
            <div className="flex gap-2 mt-4">
                <span className="w-2.5 h-2.5 bg-pink-300 rounded-full animate-bounce"></span>
                <span className="w-2.5 h-2.5 bg-rose-300 rounded-full animate-bounce delay-150"></span>
                <span className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce delay-300"></span>
            </div>

        </div>
    );
}