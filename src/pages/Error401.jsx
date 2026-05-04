import ErrorPage from "../components/ErrorPage";
import img from "../assets/401.png";

export default function Error401() {
  return (
    <ErrorPage
      code="401"
      description="Unauthorized - Harus login dulu"
      image={img}
    />
  );
}