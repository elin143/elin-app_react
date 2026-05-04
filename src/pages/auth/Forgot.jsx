import { FaEnvelope, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function forgot() {
  return (
    <div className="w-full min-h-[720px] grid lg:grid-cols-2 rounded-[3rem] overflow-hidden shadow-2xl bg-white">
      
      {/* LEFT VISUAL SECTION */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-pink-300 via-rose-300 to-pink-200 p-16">
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.35),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.25),_transparent_30%)]" />

        <div className="relative z-10 flex flex-col justify-between h-full text-white">
          
          <div>
            <h1 className="text-6xl font-black font-serif italic leading-tight">
              Reset
              <br />
              Password
            </h1>

            <p className="mt-8 text-lg leading-relaxed text-white/90 max-w-lg">
              Recover your beauty clinic account securely and continue managing
              your patients, bookings, and treatments effortlessly.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 max-w-md border border-white/30">
            <p className="text-sm uppercase tracking-[0.3em] mb-3">
              Secure Recovery
            </p>
            <p className="text-2xl font-bold">
              Elegant access, restored beautifully.
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-8 md:px-16 py-14 bg-white">
        <div className="w-full max-w-lg">
          
          <div className="mb-10">
            <p className="uppercase tracking-[0.4em] text-pink-300 text-sm font-bold mb-4">
              Password Recovery
            </p>

            <h2 className="text-5xl font-black text-gray-800 leading-tight">
              Forgot Password
            </h2>

            <p className="text-gray-400 mt-4 text-lg">
              Enter your email to receive reset instructions.
            </p>
          </div>

          <form className="space-y-6">
            
            <div className="relative">
              <FaEnvelope className="absolute top-5 left-5 text-pink-300" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-2xl border border-pink-100 bg-pink-50/40 py-5 pl-14 pr-4"
              />
            </div>

            <button className="group w-full py-5 rounded-2xl bg-gradient-to-r from-pink-300 to-rose-300 text-white font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all">
              Send Reset Link
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

          </form>

          <p className="mt-8 text-gray-500 text-center">
            Remember your password?{" "}
            <Link to="/login" className="text-pink-400 font-bold">
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}