import NavBar from "../components/NavBar";

export default function Wirkung() {
  return (
    <>
      <NavBar current="wirkung" />
      <div className="global-margin mx-auto max-w-2xl">
        <h1 className="uppercase py-8 bg-dark-wood-800 text-white-200 px-10 text-center">
          WIRKUNGMODELLIERUNG
        </h1>
        <div className="border border-dark-wood-800 rounded-[50px] px-8 mt-10">
          <p className="book-intro-sm  pt-10 pb-4">
            Verwenden Sie Green Unified Scenarios (GUS) zur
            Wirkungsmodellierung: Das GUS Rahmenwerk nutzt agentenbasierte
            Modellierung (ABM) zur Erstellung digitaler Zwillinge von
            städtischen Wäldern, um deren zukünftige Entwicklung genau
            vorherzusagen. Dafür berücksichtigt GUS Wetterinformationen,
            Baumarten, Baum-Pflegeaufwände, Baumkrankheiten und die räumliche
            Verteilung von Bäumen, um deren Auswirkungen zu prognostizieren.
            Damit die Simulationen nützlich sind, müssen sie mit Daten
            initialisiert werden, die die reale Umgebung widerspiegeln: In einer
            Stuttgarter Instanz von GUS haben wir bereits das aktuelle
            Baumkataster der Stadtbäume sowie aller Bäume auf
            Landesliegenschaften in Stuttgart implementiert, und deren
            einzigartigen Aspekte je Baumstandort erfasst: die räumlichen
            Koordinaten, die Baumart, den Durchmesser, die Höhe und den
            aktuellen Zustand jedes einzelnen Baumes in Stuttgart.{" "}
          </p>
          <p className="book-intro-sm  pb-4">
            Durch Veränderung konkreter Einflussfaktoren auf die Bäume in
            Stuttgart können Sie die entsprechenden Wirkungen simulieren.
          </p>
          <p className="book-intro-sm pb-4">
            Außerdem können Sie eigene Baumdaten einlesen und simulieren,
            respektive Annahmen für Ihre geplanten Baumpflanzungen im Kontext
            von Bebauungsplänen und Straßenbegrünung überprüfen.
          </p>
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
    </>
  );
}
