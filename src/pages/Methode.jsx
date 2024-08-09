import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import NavBar from "../components/NavBar";

const faqs = [
  {
    question: "1. Definition städtischer Risiken (Wirkungsketten)",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "2. Wirkungsketten & städtische Indikatoren",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "3. Datenerfassung & Geoverarbeitung",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "4. Gewichtung & Aggregierung",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "5. Visualisierung der standortspezifischen Bewertung (LBS)",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

export default function Methode() {
  return (
    <div className="bg-gray-200">
      <NavBar current="method" />
      <div className="global-margin  ">
        <h1 className="uppercase py-8 bg-green-500 text-white-200 px-10 text-center">
          Methode
        </h1>
        <h3 className="py-4">Weitere Komponenten, die wir entwickeln:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-2">
          <div className="border border-dark-wood-800 rounded-[10px] px-8 bg-white-300">
            <p className="book-intro-sm  pt-10 pb-4">
              Das “Location-basedScoring” Werkzeug wurde von TreesAI entwickelt,
              um eine risikobasierte Vulnerabilitätsbewertung durchzuführen.
              Damit lässt sich bewerten, wie sich dieMuster der Risiken und
              potenziellen Vorteile für natürliche und menschlicheSysteme
              aufgrund des Klimawandels verändern. Die von TreesAI verwendete
              Methode zur Entwicklung einer Risikobewertung für geografische
              Gebiete wurde an den Leitfaden für die Analyse der Auswirkungen
              und der Anfälligkeit lebenswichtiger Infrastrukturen und bebauter
              Gebiete (IVAVIA)(Resin, 2018) angepasst, der auf den
              Risikokonzepten des Fünften Sachstandsberichts des IPCC basiert.
            </p>
            <button
              type="button"
              className="bold-intro-sm  rounded-full bg-green-600 my-4 py-2 px-4 text-white-200 shadow-sm hover:bg-dark-wood-700 "
            >
              Technisches Vorgehen
            </button>
            <br />
            <button
              type="button"
              className="bold-intro-sm  rounded-full bg-green-600 my-4 py-2 px-4 text-white-200 shadow-sm hover:bg-dark-wood-700 "
            >
              Strategiepapier
            </button>
          </div>
          <div className="border border-green-500 rounded-[10px] px-8 bg-white-300">
            <p className="book-intro-sm pt-10 pb-4">
              <span className="bold-intro-sm">NbS-Simulationsprogramm:</span>{" "}
              Ein auf einem wissenschaftlichen Peer-Review basierter
              Open-Source-Ansatz, welcher agentenbasierte Modellierung (ABM)
              nutzt - d.h. ein Computermodell zur Simulation der Interaktionen
              von Agenten wie einzelnen Bäumen, Bienen, Anwohnern oder einem
              Park als Ganzes - um das Verhalten eines Systems und seine
              Ergebnisse zu verstehen. Dieser Ansatz ermöglicht es, z.B. die
              Umweltleistungen eines städtischen Waldes für das Ökosystem unter
              verschiedenen Bedingungen (z. B. Wetter, Pflegeaufwand,
              Artenzusammensetzung, räumliche Verteilung) zu simulieren und zu
              bewerten.
            </p>
            <hr className=" border-8 border-green-600" />
            <p className="book-intro-sm py-4">
              <span className="bold-intro-sm">Cloud-basierte Software</span>:
              Eine Open-Source-Software, die es ermöglicht, Projektdaten schnell
              in eine Folgenabschätzung umzuwandeln, ohne dass Nutzer*innen über
              große Speicherkapazitäten verfügen müssen.
            </p>
          </div>
          <div className="border border-green-500 rounded-[10px] px-8 bg-white-300">
            <p className="book-intro-sm pt-10 pb-4">
              <span className="bold-intro-sm">
                Bewertung der Auswirkungen von Ökosystemleistungen
              </span>
              : Anwendung und Weiterentwicklung von Wirkungsmodellen die auf
              wissenschaftlichem peer-review basieren, zur Vorhersage der über
              50 Jahre hinweg erbrachten Ökosystemleistungen wie z. B.
              Kohlenstoffbindung, Kohlenstofffreisetzung, Wasserrückhalt,
              Beseitigung von Luftverschmutzung, Reduzierung des
              Wärmeinseleffekts.
            </p>
            <hr className=" border-8 border-green-600" />
            <p className="book-intro-sm py-4">
              <span className="bold-intro-sm">Hybride Beobachtung</span>:
              Kombination von zivilgesellschaftlichem Engagement und
              Fernerkundung zur Beobachtung der Auswirkungen jedes NbS-Projekts
              unter Anwendung der Augmented Collective Intelligence (ACI)
              methode.
            </p>
          </div>
        </div>

        <h2 className=" py-8 bg-green-500 text-white-200 px-10 text-center mt-20 max-w-xl mx-auto rounded-[10px]">
          LBS Methode
        </h2>
        <div className="max-w-4xl px-10 py-8 border rounded-[10px] border-green-600 mx-auto book-intro-sm mb-40 bg-white">
          <p>
            Das übergeordnete Ziel einer risikobasierten
            Vulnerabilitätsbewertung nach “IVAVIA: Impact and Vulnerability
            Analysis of Vital Infrastructures and Built-Up Areas” ist es, das
            Verständnis zu erleichtern für:
          </p>
          <ol>
            <li>
              1. Ursache-Wirkungs-Beziehungen des Klimawandels in einem lokalen
              Kontext.
            </li>
            <li>
              2. Geografische Hotspots der Anfälligkeit und des Risikos zu
              identifizieren.
            </li>
            <li>
              3. Zu beurteilen, welche Auswirkungen auf die Menschen, die
              Wirtschaft und die bebaute Fläche jetzt und in Zukunft aufgrund
              des Klimawandels zu erwarten sind.
            </li>
          </ol>
          <p className="pt-8">
            Die standortbezogene Bewertung (Location-Based Scoring, LBS)
            ermöglicht den Vergleich von Gebieten in der Stadt in Bezug auf eine
            bestimmte Gruppe von Klimarisiken. Ziel ist es, die Gebiete einer
            Stadt hinsichtlich ihres Risikoprofils zu bewerten. In dieser Phase
            werden die Risiken der Stadt ermittelt, städtische Indikatoren
            definiert, die Daten gesammelt und geografisch aufbereitet, ein
            Verfahren zur Gewichtung der Indikatoren und deren Zusammenfassung
            zu einer endgültigen Bewertung festgelegt und schließlich die
            Ergebnisse visualisiert - und genau darum geht es bei dieser
            Plattform.
          </p>
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 ">
              <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                <dl className="mt-2 space-y-6 divide-y divide-gray-900/10">
                  {faqs.map((faq) => (
                    <Disclosure key={faq.question} as="div" className="pt-6">
                      <dt>
                        <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                          <span className="medium-intro-lg  text-green-600">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <PlusSmallIcon
                              aria-hidden="true"
                              className="h-8 w-8 group-data-[open]:hidden text-green-600"
                            />
                            <MinusSmallIcon
                              aria-hidden="true"
                              className="h-8 w-8 [.group:not([data-open])_&]:hidden text-green-600"
                            />
                          </span>
                        </DisclosureButton>
                      </dt>
                      <DisclosurePanel as="dd" className="mt-2 pr-12">
                        <p className="medium-intro-md  text-gray-600">
                          {faq.answer}
                        </p>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
