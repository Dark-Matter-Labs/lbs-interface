import { Fragment, useState } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import PropTypes from "prop-types";

import RiskRadar from "./RadarChart";
import heatCard from "../assets/heat_card.png";
import hitzeCard from "../assets/hitze_card.png";
import luftCard from "../assets/luft_card.png";
import uberCard from "../assets/uberCard.png";
import uberBuiltCard from "../assets/uber2.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const hazards = [
  { title: "Gesamt", name: "AVERAGE_RISK", current: true },
  { title: "Trockenheit", name: "A_risk_score", current: false },
  { title: "Hitze", name: "B_risk_score", current: false },
  { title: "Luftverschmutzung", name: "C_risk_score", current: false },
  { title: "Überschwemmung", name: "D_risk_score", current: false },
];

export default function InfoPanel(props) {
  const [currentRisk, setCurrentRisk] = useState("Gesamt");
  const [transportBuiltSwitch, setTransportBuiltSwitch] = useState("Transport");

  return (
    <Transition.Root
      show={props.show}
      as={Fragment}
      className="bg-white-200 mt-10 rounded-r-[30px]"
    >
      <Transition.Child
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="pb-10 max-w-4xl">
          <div className="px-10 py-4 bg-green-600 flex flex-row items-center my-auto justify-between rounded-tr-[30px]">
            <div>
              <span className="bold-intro-md text-white-200 pl-6">
                Erkunde das Risiko eines Standorts
              </span>
            </div>
            <div className="">
              <button onClick={() => props.setShowPanel(false)}>
                <ArrowLeftCircleIcon className="text-white-200 w-7 h-7" />
              </button>
            </div>
          </div>
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                defaultValue={hazards.find((tab) => tab.current).title}
              >
                {hazards.map((tab) => (
                  <option key={tab.name}>{tab.title}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block px-4">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {hazards.map((tab) => (
                    <span
                      key={tab.name}
                      onClick={(e) => {
                        setCurrentRisk(e.target.innerHTML);
                        const oldIndex = hazards.findIndex(
                          (obj) => obj.current === true,
                        );
                        const newIndex = hazards.findIndex(
                          (obj) => obj.title === e.target.innerHTML,
                        );
                        hazards[oldIndex].current = false;
                        hazards[newIndex].current = true;
                        props.setActiveHazard(e.target.innerHTML);
                      }}
                      className={classNames(
                        tab.current
                          ? "border-green-600 text-green-600"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "whitespace-nowrap border-b-2 py-4 px-1 bold-intro-sm cursor-pointer",
                      )}
                    >
                      {tab.title}
                    </span>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="px-4 pt-4">
            {currentRisk === "Gesamt" ? (
              <>
                <h2>Gesamtrisikobewertung</h2>
                <p className="book-info-sm">
                  Klicken Sie bitte auf ein Rasterfeld auf der Karte, um Details
                  anzuzeigen.
                </p>
                <div className="grid grid-cols-2 border-t border-t-green-600 my-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <h3>LEGENDE</h3>
                    <p className="book-info-md pt-1">Gesamtrisikowertung</p>
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-indigo-400 to-green-600"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm ">
                          100 Hohes Risiko =<br /> hohes Anpassungspotenzial
                          durch NbS
                        </div>
                        <div className="book-info-sm">0 Geringes Risiko</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between py-4 border border-b border-b-green-600 pr-4">
                      <h2 className="px-8">
                        {props.currentGrid.tree_municipal}
                      </h2>
                      <h3>BÄUME AUF LANDESLIEGENSCHAFTEN</h3>
                    </div>

                    <div className="flex justify-between py-4 border border-b border-b-green-600 pr-4">
                      <h2 className="px-8">{props.currentGrid.tree_state}</h2>
                      <h3>STÄDTISCHE BÄUME</h3>
                    </div>

                    <div className="flex justify-between py-4 border border-b border-b-green-600 pr-4">
                      <h2 className="px-8">
                        {props.currentGrid.critical_infrastructure}
                      </h2>
                      <h3>KRITISCHE INFRASTRUKTUR</h3>
                    </div>

                    <div className="flex justify-between py-4 border border-b border-b-green-600 pr-4">
                      <h2 className="px-8">
                        {parseFloat(props.currentGrid.poverty_index).toFixed(2)}
                      </h2>
                      <h3>ARMUTSINDEX</h3>
                    </div>
                  </div>
                </div>
                <hr className="mx-10 border-8 border-green-600" />
                <div className="grid grid-cols-2 border-t border-t-green-600 mt-4">
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3 pl-4 pr-3 text-left book-intro-sm  tracking-wide text-gray-500 sm:pl-0"
                              >
                                Gefahr
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left book-intro-sm  tracking-wide text-gray-500"
                              >
                                Belastung
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left book-intro-sm  tracking-wide text-gray-500"
                              >
                                Risikowert
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Trockenheit
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 book-info-md text-gray-500">
                                Bäume
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 book-info-md text-gray-500">
                                {parseFloat(
                                  props.currentGrid.A_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Hitze
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 book-info-md text-gray-500">
                                Bevölkerungsgesundheit
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 book-info-md text-gray-500">
                                {parseFloat(
                                  props.currentGrid.B_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Luftverschmutzung
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 book-info-md text-gray-500">
                                Bevölkerungsgesundheit
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 book-info-md text-gray-500">
                                {parseFloat(
                                  props.currentGrid.C_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Überschwemmung
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 book-info-md text-gray-500">
                                Verkehrsnetz
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 book-info-md text-gray-500">
                                {parseFloat(
                                  props.currentGrid.D_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Überschwemmung
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 book-info-md text-gray-500">
                                Bebaute Gebiete
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 book-info-md text-gray-500">
                                {parseFloat(
                                  props.currentGrid.E_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <RiskRadar
                    data={[
                      {
                        attribute: "Hitze-Risiko für Bevölkerungsgesundheit",
                        val: props.currentGrid.B_risk_score,
                      },
                      {
                        attribute: "Trocken heitsrisiko für Grünzonen",
                        val: props.currentGrid.A_risk_score,
                      },
                      {
                        attribute:
                          "Überschwemmungs gefahr für das Verkehrsnetz",
                        val: props.currentGrid.E_risk_score,
                      },
                      {
                        attribute: "Überschwemmungsgefahr für bebaute Gebiete",
                        val: props.currentGrid.D_risk_score,
                      },
                      {
                        attribute:
                          "Risiko der Luftverschmutzung für Bevölkerungs–gesundheit",
                        val: props.currentGrid.C_risk_score,
                      },
                    ]}
                  />
                </div>
              </>
            ) : currentRisk === "Trockenheit" ? (
              <>
                <h2>Wirkungskette</h2>
                <img src={heatCard} />
                <div className="flex border-t border-t-green-600 mt-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <h3>LEGENDE</h3>
                    <p className="book-info-md pt-1">
                      Spezifische Risikobewertung
                    </p>
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-[#F0F921] via-[#D8576C] to-[#0D0887]"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm ">
                          100 Hohes Risiko =<br /> hohes Anpassungspotenzial
                          durch NbS
                        </div>
                        <div className="book-info-sm">1 Geringes Risiko</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-8 flow-root px-2 ">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 pl-4 pr-3 text-left book-intro-sm uppercase tracking-wide text-gray-500 sm:pl-0"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  GEWICHTUNG
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Anzahl städtischer Bäume
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {props.currentGrid.tree_municipal}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Anzahl Bäume auf Landesliegenschaften
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {props.currentGrid.tree_state}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Bodenqualität & Versiegelungsgrad
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {parseFloat(
                                    props.currentGrid.soil_quality,
                                  ).toFixed(2)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  3
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mx-10 border-8 border-green-600" />
                <div className="grid grid-cols-2 border-t border-t-green-600 mt-4">
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3 pl-4 pr-3 text-left book-intro-sm uppercase tracking-wide text-gray-500 sm:pl-0"
                              >
                                Ausgewählte Region
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                              >
                                Wert
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Belastung
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.A_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0 ">
                                Empfindlichkeit (Anfälligkeit)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.A_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0 ">
                                Risikolevel
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.A_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <RiskRadar
                    data={[
                      {
                        attribute: "Bewältigungs fähigkeit",
                        val: props.currentGrid.A_COPING,
                      },
                      {
                        attribute: "Belastung",
                        val: props.currentGrid.A_EXPOSURE,
                      },
                      {
                        attribute: "Empfind lichkeit (Anfälligkeit)",
                        val: props.currentGrid.A_SENSITIVITY,
                      },
                    ]}
                  />
                </div>
              </>
            ) : currentRisk === "Hitze" ? (
              <>
                <h2>Wirkungskette</h2>
                <img src={hitzeCard} />
                <div className="flex border-t border-t-green-600 mt-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <h3>LEGENDE</h3>
                    <p className="book-info-md pt-1">
                      Spezifische Risikobewertung
                    </p>
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-[#67000D] via-[#F85D42] to-[#FFF5F0]"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm ">
                          100 Hohes Risiko =<br /> hohes Anpassungspotenzial
                          durch NbS
                        </div>
                        <div className="book-info-sm">1 Geringes Risiko</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-8 flow-root px-2 ">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 pl-4 pr-3 text-left book-intro-sm uppercase tracking-wide text-gray-500 sm:pl-0"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  GEWICHTUNG
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Landoberflächentemperatur (°C)
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {(parseFloat(props.currentGrid.ls_temperature * 0.02) - 273.15).toFixed(2)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Anzahl Bäume auf Landesliegenschaften
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {props.currentGrid.tree_state}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Bäume auf Anhöhen
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {props.currentGrid.tree_municipal}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Grünfläche
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {props.currentGrid.greenspace}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  3
                                </td>
                              </tr>

                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Armutsindex
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {parseFloat(
                                    props.currentGrid.poverty_index,
                                  ).toFixed(2)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Überflutung durch <br />
                                  Oberflächenwasser
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  1
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mx-10 border-8 border-green-600" />
                <div className="grid grid-cols-2 border-t border-t-green-600 mt-4">
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3 pl-4 pr-3 text-left book-intro-sm uppercase tracking-wide text-gray-500 sm:pl-0"
                              >
                                AUSGEWÄHLTE REGION
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                              >
                                Wert
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Gefahr
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(props.currentGrid.B_HAZARD).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Belastung
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.B_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Bewältigungsfähigkeit (Anfälligkeit)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(props.currentGrid.B_COPING).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Empfindlichkeit (Anfälligkeit)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.B_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Risikolevel
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.B_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <RiskRadar
                    data={[
                      {
                        attribute: "Gefahr",
                        val: props.currentGrid.B_HAZARD,
                      },
                      {
                        attribute: "Bewältigungs fähigkeit",
                        val: props.currentGrid.B_COPING,
                      },
                      {
                        attribute: "Belastung",
                        val: props.currentGrid.B_EXPOSURE,
                      },
                      {
                        attribute: "Empfind lichkeit (Anfälligkeit)",
                        val: props.currentGrid.B_SENSITIVITY,
                      },
                    ]}
                  />
                </div>
              </>
            ) : currentRisk === "Luftverschmutzung" ? (
              <>
                <h2>Wirkungskette</h2>
                <img src={luftCard} />
                <div className="flex border-t border-t-green-600 mt-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <h3>LEGENDE</h3>
                    <p className="book-info-md pt-1">
                      Spezifische Risikobewertung
                    </p>
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-[#7A0177] via-[#F879A6] to-[#FFF5F0]"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm ">
                          100 Hohes Risiko =<br /> hohes Anpassungspotenzial
                          durch NbS
                        </div>
                        <div className="book-info-sm">1 Geringes Risiko</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-8 flow-root px-2 ">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 pl-4 pr-3 text-left book-intro-sm uppercase tracking-wide text-gray-500 sm:pl-0"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  GEWICHTUNG
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Anzahl städtischer Bäume
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {props.currentGrid.tree_municipal}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Anzahl Bäume auf Landesliegenschaften
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {props.currentGrid.tree_state}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Bodenqualität & Versiegelungsgrad
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {parseFloat(
                                    props.currentGrid.soil_quality,
                                  ).toFixed(2)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  3
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mx-10 border-8 border-green-600" />
                <div className="flex border-t border-t-green-600 mt-4">
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3 pl-4 pr-3 text-left book-intro-sm uppercase tracking-wide text-gray-500 sm:pl-0"
                              >
                                AUSGEWÄHLTE REGION
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                              >
                                WERT
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Gefahr
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {props.currentGrid.C_HAZARD}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Belastung
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {props.currentGrid.C_EXPOSURE}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Bewältigungsfähigkeit (Anfälligkeit)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {props.currentGrid.C_COPING}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Empfindlichkeit (Anfälligkeit)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {props.currentGrid.C_SENSITIVITY}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Risikolevel
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.C_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <RiskRadar
                    data={[
                      {
                        attribute: "Gefahr",
                        val: props.currentGrid.C_HAZARD,
                      },
                      {
                        attribute: "Bewältigungs fähigkeit",
                        val: props.currentGrid.C_COPING,
                      },
                      {
                        attribute: "Belastung",
                        val: props.currentGrid.C_EXPOSURE,
                      },
                      {
                        attribute: "Empfind lichkeit (Anfälligkeit)",
                        val: props.currentGrid.C_SENSITIVITY,
                      },
                    ]}
                  />
                </div>
              </>
            ) : currentRisk === "Überschwemmung" ? (
              <>
                {/* text with onclick state update, if render rest of bottom component based on choice*/}
                <div className="flex">
                  <h2
                    className={classNames(
                      transportBuiltSwitch === "Transport"
                        ? " text-green-600"
                        : "text-dark-wood-500 hover:text-green-600",
                      "pb-4 hover:cursor-pointer",
                    )}
                    onClick={() => {
                      setTransportBuiltSwitch("Transport");
                      props.setActiveHazard("Überschwemmung");
                      setCurrentRisk("Überschwemmung");
                    }}
                  >
                    Transport Netzwerk |
                  </h2>
                  <h2
                    className={classNames(
                      transportBuiltSwitch === "Built"
                        ? " text-green-600"
                        : "text-dark-wood-500 hover:text-green-600",
                      "pl-2 hover:cursor-pointer",
                    )}
                    onClick={() => {
                      setTransportBuiltSwitch("Built");
                      props.setActiveHazard("Überschwemmung2");
                      setCurrentRisk("Überschwemmung2");
                    }}
                  >
                    Bebautes Gebiet
                  </h2>
                </div>
                <img src={uberCard} />
                <div className="flex border-t border-t-green-600 mt-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <h3>LEGENDE</h3>
                    <p className="book-info-md pt-1">
                      Spezifische Risikobewertung
                    </p>
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-[#045A8D] via-[#6DA3D3] to-[#F1EEF6]"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm ">
                          100 Hohes Risiko =<br /> hohes Anpassungspotenzial
                          durch NbS
                        </div>
                        <div className="book-info-sm">1 Geringes Risiko</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-8 flow-root px-2 ">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 pl-4 pr-3 text-left book-intro-sm uppercase tracking-wide text-gray-500 sm:pl-0"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  GEWICHTUNG
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Anzahl städtischer Bäume
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {props.currentGrid.tree_municipal}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Anzahl Bäume auf Landesliegenschaften
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {props.currentGrid.tree_state}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Bodenqualität & Versiegelungsgrad
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {parseFloat(
                                    props.currentGrid.soil_quality,
                                  ).toFixed(2)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  3
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mx-10 border-8 border-green-600" />
                <div className="grid grid-cols-2 border-t border-t-green-600 mt-4">
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3 pl-4 pr-3 text-left book-intro-sm uppercase tracking-wide text-gray-500 sm:pl-0"
                              >
                                AUSGEWÄHLTE REGION
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                              >
                                WERT
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Gefahr
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(props.currentGrid.D_HAZARD).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Belastung
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.D_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Bewältigungsfähigkeit (Anfälligkeit)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(props.currentGrid.D_COPING).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Empfindlichkeit (Anfälligkeit)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.D_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Risikolevel
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.D_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <RiskRadar
                    data={[
                      {
                        attribute: "Gefahr",
                        val: props.currentGrid.D_HAZARD,
                      },
                      {
                        attribute: "Bewältigungs fähigkeit",
                        val: props.currentGrid.D_COPING,
                      },
                      {
                        attribute: "Belastung",
                        val: props.currentGrid.D_EXPOSURE,
                      },
                      {
                        attribute: "Empfind lichkeit (Anfälligkeit)",
                        val: props.currentGrid.D_SENSITIVITY,
                      },
                    ]}
                  />
                </div>
              </>
            ) : currentRisk === "Überschwemmung2" ? (
              <>
                {/* text with onclick state update, if render rest of bottom component based on choice*/}
                <div className="flex">
                  <h2
                    className={classNames(
                      transportBuiltSwitch === "Transport"
                        ? " text-green-600"
                        : "text-dark-wood-500 hover:text-green-600",
                      "pb-4 hover:cursor-pointer",
                    )}
                    onClick={() => {
                      setTransportBuiltSwitch("Transport");
                      props.setActiveHazard("Überschwemmung");
                      setCurrentRisk("Überschwemmung");
                    }}
                  >
                    Transport Netzwerk |
                  </h2>
                  <h2
                    className={classNames(
                      transportBuiltSwitch === "Built"
                        ? " text-green-600"
                        : "text-dark-wood-500 hover:text-green-600",
                      "pl-2 hover:cursor-pointer",
                    )}
                    onClick={() => {
                      setTransportBuiltSwitch("Built");
                      props.setActiveHazard("Überschwemmung2");
                      setCurrentRisk("Überschwemmung2");
                    }}
                  >
                    Bebautes Gebiet
                  </h2>
                </div>
                <img src={uberBuiltCard} />
                <div className="flex border-t border-t-green-600 mt-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <h3>LEGENDE</h3>
                    <p className="book-info-md pt-1">
                      Spezifische Risikobewertung
                    </p>
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-[#006D2C] via-[#77C9B2] to-[#EDF8FB]"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm ">
                          100 Hohes Risiko =<br /> hohes Anpassungspotenzial
                          durch NbS
                        </div>
                        <div className="book-info-sm">1 Geringes Risiko</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-8 flow-root px-2 ">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 pl-4 pr-3 text-left book-intro-sm uppercase tracking-wide text-gray-500 sm:pl-0"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                                >
                                  GEWICHTUNG
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Anzahl städtischer Bäume
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {props.currentGrid.tree_municipal}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Anzahl Bäume auf Landesliegenschaften
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {props.currentGrid.tree_state}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                  Bodenqualität & Versiegelungsgrad
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {parseFloat(
                                    props.currentGrid.soil_quality,
                                  ).toFixed(2)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  3
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mx-10 border-8 border-green-600" />
                <div className="grid grid-cols-2 border-t border-t-green-600 mt-4">
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3 pl-4 pr-3 text-left book-intro-sm uppercase tracking-wide text-gray-500 sm:pl-0"
                              >
                                AUSGEWÄHLTE REGION
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left book-intro-sm uppercase tracking-wide text-gray-500"
                              >
                                WERT
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Gefahr
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(props.currentGrid.E_HAZARD).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Belastung
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.E_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Bewältigungsfähigkeit (Anfälligkeit)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(props.currentGrid.E_COPING).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Empfindlichkeit (Anfälligkeit)
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.E_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 book-info-md text-gray-900 sm:pl-0">
                                Risikolevel
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {parseFloat(
                                  props.currentGrid.E_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <RiskRadar
                    data={[
                      {
                        attribute: "Gefahr",
                        val: props.currentGrid.E_HAZARD,
                      },
                      {
                        attribute: "Bewältigungs fähigkeit",
                        val: props.currentGrid.E_COPING,
                      },
                      {
                        attribute: "Belastung",
                        val: props.currentGrid.E_EXPOSURE,
                      },
                      {
                        attribute: "Empfind lichkeit (Anfälligkeit)",
                        val: props.currentGrid.E_SENSITIVITY,
                      },
                    ]}
                  />
                </div>
              </>
            ) : (
              <p>-</p>
            )}
          </div>
        </div>
      </Transition.Child>
    </Transition.Root>
  );
}

InfoPanel.propTypes = {
  show: PropTypes.bool,
  setShowPanel: PropTypes.func,
  setActiveHazard: PropTypes.func,
  activeHazard: PropTypes.string,
  currentGrid: PropTypes.object,
};
