import NavBar from "../components/NavBar";
import diagram from "../assets/LBS-wiki.png";

export default function Wiki() {
  return (
    <>
      <NavBar current="wiki" />
      <div className="global-margin pb-40">
        <h1 className="uppercase py-8 bg-green-500 text-white-200 px-10 text-center">
          LBS Wiki
        </h1>
        <div className="grid grid-cols-3 mt-10 border border-green-500 rounded-full px-40 py-10">
          <div className="book-intro-md max-w-sm">
            Klimarisiken sind Ergebnis eines Zusammenspiels von Gefahren,
            Stressfaktoren, Anfälligkeit & Belastung. Ein
            Wirkungsketten-Diagramm zeigt die Beziehung dieser Komponenten.
            <br />
            <button
              type="button"
              className="mt-8 bold-intro-sm  rounded-full bg-dark-wood-800 my-4 py-2 px-12 text-white-200 shadow-sm hover:bg-dark-wood-700 "
            >
              Mehr zur Methode
            </button>
          </div>
          <div className="col-span-2 max-w-3xl border border-green-600 p-4">
            <img className="w-2/3 mx-auto" src={diagram} />
          </div>
        </div>
        <hr className="mx-80 border-8 border-green-600" />
        <div className="grid grid-cols-3 border border-green-500 rounded-full px-40 py-10">
          <div>
            <h3 className="max-w-sm">Was ist eine Wirkungskette?</h3>
          </div>
          <div className="col-span-2">
            <p className="book-intro-sm max-w-2xl">
              Eine Wirkungskette ist ein Rahmen für die Darstellung der
              Auswirkungen des Klimawandels auf natürliche und menschliche
              Systeme durch spezifische Gefährdungs- und Belastungsszenarien.
              Jede Wirkungskette skizziert die Ursache-Wirkungs-Beziehung
              zwischen Risikoelementen, die zum Ergebnis bestimmter
              Gefahr-Belastungs-Paaren führt. Zur Bewertung des Klimarisikos
              werden die Indikatoren in die Kategorien Gefahr, Belastung und
              Anfälligkeit (einschließlich Bewältigungsfähigkeiten und
              Empfindlichkeit) eingeteilt. Die Auswahl der relevanten
              Indikatoren für jede Kategorie richtet sich nach den strategischen
              Risiken der Stadt, der Datenverfügbarkeit und vor allem nach
              Workshops mit Experten und Interessenvertretern.
            </p>
          </div>
        </div>
        <hr className="mx-80 border-8 border-green-600" />
        <div className="grid grid-cols-3 border border-green-500 rounded-full px-40 py-10">
          <div>
            <h3 className="max-w-sm">
              Was ist mit Gefahr und Belastung gemeint?
            </h3>
          </div>
          <div className="col-span-2">
            <p className="book-intro-sm max-w-2xl">
              In der Klimarisikoanalyse ist eine Gefahr jedes potenziell
              schädliche physische Ereignis, Phänomen oder menschliche
              Aktivität, das den Verlust von Menschenleben, Verletzungen,
              Sachschäden, soziale und wirtschaftliche Störungen oder
              Umweltbeeinträchtigungen verursachen kann. Gefahren umfassen
              sowohl natürliche Ereignisse wie Überschwemmungen und Dürren als
              auch vom Menschen verursachte Vorfälle wie Umweltverschmutzungen
              oder Stadtbrände, wobei ein besonderer Schwerpunkt auf
              Klimaveränderungen liegt. Die Belastung wiederum bezieht sich auf
              die Präsenz von Menschen, Lebensgrundlagen, Ökosystemen,
              Ressourcen, Infrastrukturen oder wirtschaftlichen und kulturellen
              Gütern an Orten, die durch Gefahren nachteilig betroffen sein
              könnten. Die Belastung misst das Ausmaß, in dem ein System einem
              potenziellen Schaden ausgesetzt.
            </p>
          </div>
        </div>
        <hr className="mx-80 border-8 border-green-600" />
        <div className="grid grid-cols-3 border border-green-500 rounded-full px-40 py-10">
          <div>
            <h3 className="max-w-sm">Was ist mit Anfälligkeit gemeint?</h3>
          </div>
          <div className="col-span-2">
            <p className="book-intro-sm max-w-2xl">
              Die Anfälligkeit misst, wie anfällig ein System oder eine
              Gemeinschaft für Schäden durch Klimagefahren ist, basierend auf
              der Empfindlichkeit - dem Ausmaß, in dem es vom Klimawandel
              betroffen ist - sowie der Bewältigungsfähigkeit - die Fähigkeit
              des Systems, die Auswirkungen der Klimagefahren zu bewältigen und
              sich an sie anzupassen.Die Empfindlichkeit umfasst Faktoren wie
              den Standort und den sozioökonomischen Status, während die
              Bewältigungsfähigkeit Ressourcen und Anpassungsstrategien
              verkörpert, wie z.B. naturbasierte Lösungen, die
              Ökosystemdienstleistungen nutzen, um die Auswirkungen abzumildern
              und die Resilienz zu verbessern.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
