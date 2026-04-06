import Profil from "./Profil";
import Pendidikan from "./Pendidikan";
import Hobi from "./Hobi";
import Kontak from "./Kontak";
import Umur from "./Umur";
import Skill from "./Skill";
import "./custom.css";

export default function BiodataDiri() {
  return (
    <div className="bg">
      <h1 className="title">Portfolio</h1>

      <div className="container">
        <Profil />
        <Pendidikan />
        <Hobi />
        <Kontak />
        <Umur />
        <Skill/>
      </div>
    </div>
  );
}
