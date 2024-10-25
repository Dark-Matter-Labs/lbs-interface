import { useTranslation } from "react-i18next";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import STlogo from "../assets/ST_logo.png";
import Dmlogo from "../assets/Dm_logo.png";

export default function Info() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-200">
      <NavBar current="info" />
      <div className="global-margin mx-auto max-w-3xl pb-40">
        <h1 className="uppercase py-8 bg-dark-wood-800 text-white-200 px-10 text-center">
          Info
        </h1>
        <div className="border border-dark-wood-800 rounded-[50px] px-8 py-10 mt-10 bg-white">
          <h3>{t(`info.title`)}</h3>
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
      <Footer />
    </div>
  );
}
