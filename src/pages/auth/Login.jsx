import { useState } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GiTerror } from "react-icons/gi";

export default function Login() {
    const navigate = useNavigate() 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }
    const handleSubmit = async (e) => {
		        e.preventDefault()
		
		        setLoading(true)
		        setError(false)
		
            axios
		            .post("https://dummyjson.com/user/login", {
		                username: dataForm.email,
		                password: dataForm.password,
		            })
		            .then((response) => {
		                // Jika status bukan 200, tampilkan pesan error
		                if (response.status !== 200) {
		                    setError(response.data.message);
		                    return; 
		                }
		
		                // Redirect ke dashboard jika login sukses
		                navigate("/");
		            })
		            .catch((err) => {
		                if (err.response) {
		                    setError(err.response.data.message || "An error occurred");
		                } else {
		                    setError(err.message || "An unknown error occurred");
		                }
		            })
		            .finally(() => {
		                setLoading(false); 
		            });
	
		    }

    const errorInfo = error ? (
		    <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
		        <GiTerror  className="text-red-600 me-2 text-lg" />
		        {error}
		    </div>
		) : null
		
		const loadingInfo = loading ? (
		    <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
		        <AiOutlineLoading3Quarters className="me-2 animate-spin" />
		        Mohon Tunggu...
		    </div>
		) : null
return (
  <div className="w-full min-h-[720px] grid lg:grid-cols-2 rounded-[3rem] overflow-hidden shadow-2xl bg-white">
    
    {/* LEFT VISUAL SECTION */}
    <div className="hidden lg:flex relative bg-gradient-to-br from-pink-300 via-rose-300 to-pink-200 p-16">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.35),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.25),_transparent_30%)]" />

      <div className="relative z-10 flex flex-col justify-between h-full text-white">
        
        <div>
          <h1 className="text-6xl font-black font-serif italic leading-tight">
            Beauty
            <br />
            Clinic
          </h1>

          <p className="mt-8 text-lg leading-relaxed text-white/90 max-w-lg">
            Premium aesthetic dashboard for skincare, treatment booking,
            patient elegance, and luxury clinic experiences.
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 max-w-md border border-white/30">
          <p className="text-sm uppercase tracking-[0.3em] mb-3">
            Trusted by professionals
          </p>
          <p className="text-2xl font-bold">
            Elevate your beauty business with grace.
          </p>
        </div>

      </div>
    </div>

    {/* RIGHT FORM */}
    <div className="flex items-center justify-center px-8 md:px-16 py-14 bg-white">
      <div className="w-full max-w-lg">
        
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-pink-300 text-sm font-bold mb-4">
            Welcome Back
          </p>

          <h2 className="text-5xl font-black text-gray-800 leading-tight">
            Sign In
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Access your beauty management dashboard.
          </p>
        </div>

        {errorInfo}
        {loadingInfo}

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="relative">
            <FaEnvelope className="absolute top-5 left-5 text-pink-300" />
            <input
              type="text"
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              placeholder="Username"
              className="w-full rounded-2xl border border-pink-100 bg-pink-50/40 py-5 pl-14 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-5 left-5 text-pink-300" />
            <input
              type="password"
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full rounded-2xl border border-pink-100 bg-pink-50/40 py-5 pl-14 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <div className="flex justify-between text-sm">
            <Link
              to="/forgot"
              className="text-pink-400 font-medium hover:text-rose-400"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full py-5 rounded-2xl bg-gradient-to-r from-pink-300 to-rose-300 text-white font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Sign In"}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>

        </form>

        <p className="mt-8 text-gray-500 text-center">
          New here?{" "}
          <Link to="/register" className="text-pink-400 font-bold">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  </div>
);
}