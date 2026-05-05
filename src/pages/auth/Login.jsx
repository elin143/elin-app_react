import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEnvelope, FaLock, FaArrowRight, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GiTerror } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function Login() {
  const Image = "/img/image.png";
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
        <div>
            <div className="w-full max-w-6xl min-h-[720px] grid lg:grid-cols-2 rounded-[2rem] overflow-hidden shadow-2xl bg-white">

                {/* LEFT SECTION */}
                <div className="hidden lg:flex relative bg-[#0F2D3F]">

                    {/* Background Image */}
                    <img
                        src={Image}
                        alt="Login Visual"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-[#0F2D3F]/70" />

                    {/* Soft Gradient Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.08),_transparent_30%)]" />

                    <div className="relative z-10 flex flex-col justify-between h-full text-white p-16">

                        {/* Main Branding */}
                        <div>
                            <p className="uppercase tracking-[0.4em] text-sm text-white/70 font-semibold mb-6">
                                Desktop
                            </p>

                            <h1 className="text-6xl font-extrabold leading-tight">
                                Welcome
                                <br />
                                Back
                            </h1>

                        </div>

              

                    </div>
                </div>

                {/* RIGHT FORM SECTION */}
                <div className="flex items-center justify-center px-8 md:px-20 py-14 bg-white">
                    <div className="w-full max-w-md">

                        {/* Header */}
                        <div className="mb-10">
                            <h2 className="text-4xl font-bold text-[#1F2937] flex items-center gap-2">
                                Welcome Back <span className="text-3xl">👋</span>
                            </h2>

                            <p className="text-[#4B5563] mt-4 leading-relaxed">
                                Today is a new day. It's your day. You shape it.
                                Sign in to start managing your projects.
                            </p>
                        </div>

                        {errorInfo}
                        {loadingInfo}

                        {/* Form */}
                        <form className="space-y-5" onSubmit={handleSubmit}>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                                    Email
                                </label>

                                <input
                                    type="text"
                                    name="email"
                                    value={dataForm.email}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className="w-full h-12 rounded-xl border border-[#D1D5DB] bg-[#F3F4F6] px-4 text-gray-700 placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0F2D3F]"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={dataForm.password}
                                    onChange={handleChange}
                                    placeholder="At least 8 characters"
                                    className="w-full h-12 rounded-xl border border-[#D1D5DB] bg-[#F3F4F6] px-4 text-gray-700 placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0F2D3F]"
                                    required
                                />
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-end">
                                <Link
                                    to="/forgot"
                                    className="text-sm text-[#3B5BFF] hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 rounded-xl bg-[#0F2D3F] text-white font-semibold text-lg hover:bg-[#1E4257] transition-all disabled:opacity-70 flex items-center justify-center"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign in"
                                )}
                            </button>

                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-8">
                            <div className="flex-1 h-px bg-[#E5E7EB]" />
                            <span className="text-sm text-gray-400">Or</span>
                            <div className="flex-1 h-px bg-[#E5E7EB]" />
                        </div>

                        {/* Social Login */}
                        <div className="space-y-4">

                            <button
                                type="button"
                                className="w-full h-12 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center gap-3 text-gray-700 font-medium hover:bg-gray-100 transition"
                            >
                                <FcGoogle className="text-xl" />
                                Sign in with Google
                            </button>

                            <button
                                type="button"
                                className="w-full h-12 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center gap-3 text-gray-700 font-medium hover:bg-gray-100 transition"
                            >
                                <FaFacebook className="text-blue-600 text-xl" />
                                Sign in with Facebook
                            </button>

                        </div>

                        {/* Register */}
                        <p className="mt-8 text-center text-[#4B5563]">
                            Don't you have an account?{" "}
                            <Link
                                to="/register"
                                className="text-[#3B5BFF] font-semibold hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>

                        {/* Footer */}
                        <p className="mt-16 text-center text-xs text-[#9CA3AF]">
                            © 2023 ALL RIGHTS RESERVED
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}