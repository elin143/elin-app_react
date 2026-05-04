import { Link } from "react-router-dom";

const ErrorPage = ({ code, description, image }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      
      {/* Image */}
      <img src={image} alt="error" className="w-72 mb-6" />

      {/* Code */}
      <h1 className="text-6xl font-bold text-gray-800">{code}</h1>

      {/* Description */}
      <p className="text-gray-500 mt-2 mb-6">{description}</p>

      {/* Button */}
      <Link
        to="/"
        className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;