import ErrorPage from "../components/ErrorPage";
import img from "../assets/400.png";

export default function Error400() {
  return (
    <ErrorPage
      code="400"
      description="Bad Request - Permintaan tidak valid"
      image={img}
    />
  );
}