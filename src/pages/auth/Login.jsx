import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiTerror } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/loginAPI";

export default function Login() {
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
      const user = await loginAPI.login(
        dataForm.username,
        dataForm.password
      );

      if (!user) {
        setError("Invalid username or password.");
        return;
      }

      if (user.role !== dataForm.role) {
        setError("Selected role does not match your account.");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      switch (user.role) {
        case "admin":
          navigate("/Dashboard");
          break;

        case "member":
          navigate("/Member");
          break;

        default:
          navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-6
      py-12
      "
      style={{
        background: "#FDF6F8",
      }}
    >
      <div
        className="
        w-full
        max-w-md
        bg-white
        rounded-[32px]
        p-10
        shadow-xl
        "
      >
        {/* BRAND */}
        <div className="mb-8 text-center">
          <p
            className="
            uppercase
            tracking-[0.25em]
            text-xs
            mb-3
            "
            style={{
              color: "#A9748C",
            }}
          >
            BeautyCare CRM
          </p>

          <h1
            className="text-5xl mb-3"
            style={{
              fontFamily: "Fraunces, serif",
              color: "#2E2228",
            }}
          >
            Sign In
          </h1>

          <p className="text-stone-500">
            Continue your personalized beauty journey.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            className="
            mb-5
            p-4
            rounded-2xl
            flex
            items-center
            gap-2
            "
            style={{
              background: "#FDECEC",
              color: "#D32F2F",
            }}
          >
            <GiTerror />
            {error}
          </div>
        )}

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          {/* USERNAME */}
          <div>
            <label className="block text-sm mb-2 font-medium text-stone-700">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={dataForm.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="
                w-full
                h-14
                rounded-full
                px-5
                outline-none
                bg-white
              "
              style={{
                border: "1px solid #E7D6DD",
              }}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-2 font-medium text-stone-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="
                w-full
                h-14
                rounded-full
                px-5
                outline-none
                bg-white
              "
              style={{
                border: "1px solid #E7D6DD",
              }}
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
                  setDataForm({
                    ...dataForm,
                    role: "member",
                  })
                }
                className="h-14 rounded-2xl font-medium transition"
                style={{
                  background:
                    dataForm.role === "member"
                      ? "#B85C7A"
                      : "#FFFFFF",
                  color:
                    dataForm.role === "member"
                      ? "#FFFFFF"
                      : "#2E2228",
                  border: "1px solid #E7D6DD",
                }}
              >
                Member
              </button>

              <button
                type="button"
                onClick={() =>
                  setDataForm({
                    ...dataForm,
                    role: "admin",
                  })
                }
                className="h-14 rounded-2xl font-medium transition"
                style={{
                  background:
                    dataForm.role === "admin"
                      ? "#B85C7A"
                      : "#FFFFFF",
                  color:
                    dataForm.role === "admin"
                      ? "#FFFFFF"
                      : "#2E2228",
                  border: "1px solid #E7D6DD",
                }}
              >
                Admin
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-14
              rounded-full
              text-white
              font-semibold
              transition
              hover:opacity-90
            "
            style={{
              background: "#B85C7A",
            }}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin mx-auto text-xl" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* DEMO LOGIN */}
        <div className="mt-8">
          <p className="text-sm text-stone-500 mb-3">
            Demo Account
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setDataForm({
                  username: "member",
                  password: "123",
                  role: "member",
                })
              }
              className="
                flex-1
                py-2
                rounded-full
                text-sm
              "
              style={{
                border: "1px solid #E7D6DD",
              }}
            >
              Member
            </button>

            <button
              type="button"
              onClick={() =>
                setDataForm({
                  username: "admin",
                  password: "123",
                  role: "admin",
                })
              }
              className="
                flex-1
                py-2
                rounded-full
                text-sm
              "
              style={{
                border: "1px solid #E7D6DD",
              }}
            >
              Admin
            </button>
          </div>
        </div>

        {/* REGISTER */}
        <p className="mt-8 text-center text-sm text-stone-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold"
            style={{
              color: "#B85C7A",
            }}
          >
            Join Membership
          </Link>
        </p>

        {/* BACK */}
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm"
            style={{
              color: "#A9748C",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}