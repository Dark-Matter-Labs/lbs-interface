import NavBar from "../components/NavBar";
import STlogo from "../assets/ST_logo.png";
import Dmlogo from "../assets/Dm_logo.png";

export default function Info() {
  return (
    <div className="bg-gray-200 pb-80">
      <NavBar current="info" />
      <div className="global-margin mx-auto max-w-3xl">
        <h1 className="uppercase py-8 bg-dark-wood-800 text-white-200 px-10 text-center">
          Info
        </h1>
        <div className="border border-dark-wood-800 rounded-[50px] px-8 py-10 mt-10 bg-white">
          <h3>
            Das Projekt Trees As Infrastructure Stuttgart wird von Dark Matter
            Labs geleitet und durch den Stuttgarter Klima-Innovationsfonds und
            The Nature Conservancy gefördert.
          </h3>
          <div className="flex my-10">
            <img className="mr-8" src={STlogo} />
            <img src={Dmlogo} />
          </div>
          <p className="book-info-sm">
            © 2023 Landeshauptstadt Stuttgart | Straßen- und Wegenetz: <br />©
            OpenStreetMap-Mitwirkende | Nutzungsflächen aus Basis-DLM: © LGL
          </p>
        </div>
      </div>
    </div>
  );
}
