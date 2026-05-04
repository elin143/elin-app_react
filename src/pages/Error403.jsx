import ErrorPage from "../components/ErrorPage";
import img from "../assets/403.png";

export default function Error403() {
  return (
    <ErrorPage
      code="403"
      description="Forbidden - Tidak punya akses"
      image={img}
    />
  );
}