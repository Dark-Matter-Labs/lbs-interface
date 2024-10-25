import { useTranslation } from "react-i18next";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Wirkung() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-200">
      <NavBar current="wirkung" />
      <div className="global-margin mx-auto max-w-2xl pb-40">
        <h1 className="uppercase py-8 bg-dark-wood-800 text-white-200 px-10 text-center">
          {t(`impact.title`)}
        </h1>
        <div className="border border-dark-wood-800 rounded-[50px] px-8 mt-10 bg-white-300">
          <p className="book-intro-sm  pt-10 pb-4">{t(`impact.para_1`)}</p>
          <p className="book-intro-sm  pb-4">{t(`impact.para_2`)}</p>
          <p className="book-intro-sm pb-4">{t(`impact.para_3`)}</p>
          <a
            href="https://run.gus.earth/project/428/b39877962d1f134fa65f76c071a6749f1ba03a52/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              className="bold-intro-sm inline-flex justify-center rounded-full bg-dark-wood-800 my-4 py-2 px-12 text-white-200 shadow-sm hover:bg-dark-wood-700 "
            >
              GUS website
            </button>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
