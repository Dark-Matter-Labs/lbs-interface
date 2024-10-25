import { useTranslation } from "react-i18next";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import diagram from "../assets/LBS-wiki.png";
import diagramEn from "../assets/method.png";

export default function Wiki() {
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-gray-200">
      <NavBar current="wiki" />
      <div className="global-margin pb-40">
        <h1 className="uppercase py-8 bg-green-500 text-white-200 px-10 text-center">
          LBS Wiki
        </h1>
        <div className="grid grid-cols-3 mt-10 border border-green-500 rounded-full px-40 py-10 bg-white">
          <div className="book-intro-md max-w-sm">
            {t(`wiki.intro`)}
            <br />
            <button
              type="button"
              className="mt-8 bold-intro-sm  rounded-full bg-dark-wood-800 my-4 py-2 px-12 text-white-200 shadow-sm hover:bg-dark-wood-700 "
            >
              {t(`wiki.cta`)}
            </button>
          </div>
          <div className="col-span-2 max-w-3xl border border-green-600 p-4">
            {i18n.language === "de" ? (
              <img className="w-2/3 mx-auto" src={diagram} />
            ) : (
              <img className="w-2/3 mx-auto" src={diagramEn} />
            )}
          </div>
        </div>
        <hr className="mx-80 border-8 border-green-600" />
        <div className="grid grid-cols-3 border border-green-500 rounded-full px-40 py-10 bg-white">
          <div>
            <h3 className="max-w-[200px]">{t(`wiki.q1`)}</h3>
          </div>
          <div className="col-span-2">
            <p className="book-intro-sm max-w-2xl">{t(`wiki.a1`)}</p>
          </div>
        </div>
        <hr className="mx-80 border-8 border-green-600" />
        <div className="grid grid-cols-3 border border-green-500 rounded-full px-40 py-10 bg-white">
          <div>
            <h3 className="max-w-[200px]">{t(`wiki.q2`)}</h3>
          </div>
          <div className="col-span-2">
            <p className="book-intro-sm max-w-2xl">{t(`wiki.a2`)}</p>
          </div>
        </div>
        <hr className="mx-80 border-8 border-green-600" />
        <div className="grid grid-cols-3 border border-green-500 rounded-full px-40 py-10 bg-white">
          <div>
            <h3 className="max-w-[200px]">{t(`wiki.q3`)}</h3>
          </div>
          <div className="col-span-2">
            <p className="book-intro-sm max-w-2xl">{t(`wiki.a3`)}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
