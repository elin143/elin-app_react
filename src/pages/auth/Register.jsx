import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowRight, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/loginAPI";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    role: "member",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const user = await loginAPI.register({
        username: dataForm.username,
        password: dataForm.password,
        role: dataForm.role,
        tier: dataForm.role === "member" ? "Regular" : null,
      });

      if (!user) {
        throw new Error("Gagal mendapatkan data user dari server.");
      }

      navigate("/login");
    } catch (err) {
  console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
  console.log("FULL ERROR:", err);

  throw new Error(
    err.response?.data?.message ||
    err.response?.data?.error ||
    JSON.stringify(err.response?.data)
  );
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#FDF6F8] px-6">
      <div className="bg-white rounded-[32px] shadow-xl p-10 w-full max-w-md">

        <div className="text-center mb-8">
          <p className="uppercase tracking-[0.25em] text-xs text-[#A9748C] mb-3">
            BeautyCare CRM
          </p>

          <h1
            className="text-5xl"
            style={{
              fontFamily: "Fraunces, serif",
              color: "#2E2228",
            }}
          >
            Register
          </h1>

          <p className="text-stone-500 mt-3">
            Create your account.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 rounded-xl p-3 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative">
            <FaUser className="absolute left-5 top-5 text-pink-400" />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={dataForm.username}
              onChange={handleChange}
              className="w-full h-14 rounded-full pl-14 pr-4 border border-[#E7D6DD]"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-5 top-5 text-pink-400" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={dataForm.password}
              onChange={handleChange}
              className="w-full h-14 rounded-full pl-14 pr-4 border border-[#E7D6DD]"
              required
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm mb-3 font-medium text-stone-700">
              Account Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setDataForm({ ...dataForm, role: "member" })
                }
                className="h-14 rounded-2xl font-medium transition"
                style={{
                  background: dataForm.role === "member" ? "#B85C7A" : "#FFFFFF",
                  color: dataForm.role === "member" ? "#FFFFFF" : "#2E2228",
                  border: "1px solid #E7D6DD",
                }}
              >
                Member
              </button>

              <button
                type="button"
                onClick={() =>
                  setDataForm({ ...dataForm, role: "admin" })
                }
                className="h-14 rounded-2xl font-medium transition"
                style={{
                  background: dataForm.role === "admin" ? "#B85C7A" : "#FFFFFF",
                  color: dataForm.role === "admin" ? "#FFFFFF" : "#2E2228",
                  border: "1px solid #E7D6DD",
                }}
              >
                Admin
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-full bg-[#B85C7A] text-white font-semibold flex justify-center items-center gap-2"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <>
                Create Account
                <FaArrowRight />
              </>
            )}
          </button>

        </form>

        <p className="text-center mt-8 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#B85C7A]"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}