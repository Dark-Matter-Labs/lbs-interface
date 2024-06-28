import { Fragment, useState } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import { Switch } from "@headlessui/react";

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
  { title: "Gesamt", name: "AVERAGE_RISK", current: true, id: 0 },
  { title: "Trockenheit", name: "A_risk_score", current: false, id: 1 },
  { title: "Hitze", name: "B_risk_score", current: false, id: 2 },
  { title: "Luftverschmutzung", name: "C_risk_score", current: false, id: 3 },
  { title: "Überschwemmung", name: "D_risk_score", current: false, id: 4 },
];

export default function InfoPanel(props) {
  const [currentRisk, setCurrentRisk] = useState(0);
  const [transportBuiltSwitch, setTransportBuiltSwitch] = useState("Transport");

  return (
    <Transition.Root
      show={props.show}
      as={Fragment}
      className="bg-white-200 mt-10 rounded-r-[30px] z-10"
    >
      <Transition.Child
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="pb-10 max-w-3xl">
          <div className="pr-4 py-4 bg-green-600 flex flex-row items-center my-auto justify-between rounded-tr-[30px]">
            <div>
              <span className="medium-intro-sm text-white-200 pl-6">
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
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:book-info-sm"
                defaultValue={hazards.find((tab) => tab.current).title}
              >
                {hazards.map((tab) => (
                  <option key={tab.id}>{tab.title}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block px-4">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {hazards.map((tab) => (
                    <span
                      key={tab.id}
                      id={tab.id}
                      onClick={(e) => {
                        setCurrentRisk(Number(e.target.id));

                        const oldIndex = hazards.findIndex(
                          (obj) => obj.current === true,
                        );
                        const newIndex = hazards.findIndex(
                          (obj) => obj.id === Number(e.target.id),
                        );

                        hazards[oldIndex].current = false;
                        hazards[newIndex].current = true;
                        props.setActiveHazard(Number(e.target.id));
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
            {currentRisk === 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h2>Gesamtrisikobewertung</h2>
                    <p className="book-info-sm">
                      Klicken Sie bitte auf ein Rasterfeld auf der Karte, um
                      Details anzuzeigen.
                    </p>
                  </div>
                  <div>
                    <span className="pr-2 book-info-sm ">alle Daten</span>
                    <Switch
                      checked={props.onlyCritical}
                      onChange={props.setOnlyCritical}
                      className={classNames(
                        props.onlyCritical ? "bg-green-600" : "bg-gray-200",
                        "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-1 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
                      )}
                    >
                      <span className="sr-only">Critical or all</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          props.onlyCritical
                            ? "translate-x-5"
                            : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        )}
                      />
                    </Switch>
                    <span className="pl-2 book-info-sm">nur kritisch</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-t border-t-green-600 my-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <span className="book-info-sm ">LEGENDE</span>
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-indigo-400 to-green-600"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm ">
                          100 Hohes Risiko =<br /> hohes Anpassungspotenzial
                          <br />
                          durch NbS
                        </div>
                        <div className="book-info-sm">0 Geringes Risiko</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between py-4 border border-b border-b-green-600 pr-4">
                      <span className="px-8 medium-intro-sm">
                        {props.currentGrid.tree_municipal}
                      </span>
                      <span className="book-info-sm text-right">
                        BÄUME AUF <br />
                        LANDESLIEGENSCHAFTEN
                      </span>
                    </div>

                    <div className="flex justify-between py-4 border border-b border-b-green-600 pr-4">
                      <span className="px-8 medium-intro-sm">
                        {props.currentGrid.tree_state}
                      </span>
                      <span className="book-info-sm text-right">
                        STÄDTISCHE BÄUME
                      </span>
                    </div>

                    <div className="flex justify-between py-4 border border-b border-b-green-600 pr-4">
                      <span className="px-8 medium-intro-sm">
                        {props.currentGrid.critical_infrastructure}
                      </span>
                      <span className="book-info-sm text-right">
                        KRITISCHE INFRASTRUKTUR
                      </span>
                    </div>

                    <div className="flex justify-between py-4 border border-b border-b-green-600 pr-4">
                      <span className="px-8 medium-intro-sm">
                        {parseFloat(props.currentGrid.poverty_index).toFixed(2)}
                      </span>
                      <span className="book-info-sm text-right">
                        ARMUTSINDEX
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="-mx-4 border-8 border-green-600" />
                <div className="grid grid-cols-2 border-t border-t-green-600 mt-4">
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                      <div className="inline-block  py-2 align-middle px-6 rounded-[10px]">
                        <table className="  ">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3 pl-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white "
                              >
                                Gefahr
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                              >
                                Belastung
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left medium-info-sm uppercase bg-green-500 rounded-tr-[10px] text-white"
                              >
                                Risikowert
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                Trockenheit
                              </td>
                              <td className=" px-2 py-4 book-info-sm text-gray-900">
                                Bäume
                              </td>
                              <td className=" px-2 py-4 book-info-sm text-gray-900 float-right">
                                {parseFloat(
                                  props.currentGrid.A_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                Hitze
                              </td>
                              <td className=" px-2 py-4 book-info-sm text-gray-900]">
                                Bevölkerungs
                                <br />
                                gesundheit
                              </td>
                              <td className=" px-2 py-4 book-info-sm text-gray-900 float-right">
                                {parseFloat(
                                  props.currentGrid.B_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td className=" py-4 px-2 book-info-sm text-gray-900">
                                Luftverschmutzung
                              </td>
                              <td className="px-2 py-4 book-info-sm text-gray-900">
                                Bevölkerungs
                                <br />
                                gesundheit
                              </td>
                              <td className=" px-2 py-4 book-info-sm text-gray-900 float-right">
                                {parseFloat(
                                  props.currentGrid.C_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                Überschwemmung
                              </td>
                              <td className="p px-2 py-4 book-info-sm text-gray-900">
                                Verkehrsnetz
                              </td>
                              <td className=" px-2 py-4 book-info-sm text-gray-900 float-right">
                                {parseFloat(
                                  props.currentGrid.D_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900 ">
                                Überschwemmung
                              </td>
                              <td className=" px-2 py-4 book-info-sm text-gray-900">
                                Bebaute
                                <br /> Gebiete
                              </td>
                              <td className=" px-2 py-4 book-info-sm text-gray-900 float-right">
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
                        attribute: "Trockenheitsrisiko für Grünzonen",
                        val: props.currentGrid.A_risk_score,
                      },
                      {
                        attribute: "Überschwemmungsgefahr für das Verkehrsnetz",
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
            ) : currentRisk === 1 ? (
              <>
                <div className="flex justify-between items-center pb-2">
                  <div>
                    <h2>Wirkungskette</h2>
                  </div>
                  <div>
                    <span className="pr-2 book-info-sm ">alle Daten</span>
                    <Switch
                      checked={props.onlyCritical}
                      onChange={props.setOnlyCritical}
                      className={classNames(
                        props.onlyCritical ? "bg-green-600" : "bg-gray-200",
                        "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-1 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
                      )}
                    >
                      <span className="sr-only">Critical or all</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          props.onlyCritical
                            ? "translate-x-5"
                            : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        )}
                      />
                    </Switch>
                    <span className="pl-2 book-info-sm">nur kritisch</span>
                  </div>
                </div>
                <img src={heatCard} />
                <div className="flex border-t border-t-green-600 mt-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <span className="book-info-sm">LEGENDE</span>
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
                      <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block  py-2 align-middle sm:px-6 lg:px-8">
                          <table className=" divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  GEWICHT
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <tr>
                                <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                  Anzahl städtischer
                                  <br /> Bäume
                                </td>
                                <td className=" px-2 py-4 medium-intro-sm text-green-600">
                                  {props.currentGrid.tree_municipal}
                                </td>
                                <td className=" px-2 py-4 book-info-sm text-gray-900">
                                  Belasteter <br />
                                  Vermögenswert
                                </td>
                                <td className=" px-2 py-4 book-info-sm text-dark-wood-700 text-right">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                  Anzahl Bäume auf
                                  <br /> Landesliegenschaften
                                </td>
                                <td className="medium-intro-sm px-2 py-4 text-green-600">
                                  {props.currentGrid.tree_state}
                                </td>
                                <td className=" px-2 py-4 book-info-sm text-gray-900">
                                  Belasteter
                                  <br /> Vermögenswert
                                </td>
                                <td className=" px-2 py-4 book-info-sm text-dark-wood-700 text-right">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                  Bodenqualität
                                  <br /> & Versiegelungsgrad
                                </td>
                                <td className=" px-2 py-4 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.soil_quality,
                                  ).toFixed(2)}
                                </td>
                                <td className=" px-2 py-4 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className=" px-2 py-4 book-info-sm text-dark-wood-700 text-right">
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
                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                      <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
                        <table className=" divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3 px-2 text-left medium-info-sm uppercase text-white bg-green-600 rounded-tl-[10px]"
                              >
                                Ausgewählte Region
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left medium-info-sm uppercase text-white bg-green-600 rounded-tr-[10px]"
                              >
                                Wert
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                Belastung
                              </td>
                              <td className=" px-2 py-4 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.A_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                Empfindlichkeit <br />
                                (Anfälligkeit)
                              </td>
                              <td className=" px-2 py-4 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.A_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                Risikolevel
                              </td>
                              <td className=" px-2 py-4 book-info-sm text-green-600 text-right">
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
                        attribute: "Bewältigungsfähigkeit",
                        val: props.currentGrid.A_COPING,
                      },
                      {
                        attribute: "Belastung",
                        val: props.currentGrid.A_EXPOSURE,
                      },
                      {
                        attribute: "Empfindlichkeit (Anfälligkeit)",
                        val: props.currentGrid.A_SENSITIVITY,
                      },
                    ]}
                  />
                </div>
              </>
            ) : currentRisk === 2 ? (
              <>
                <div className="flex justify-between items-center pb-2">
                  <div>
                    <h2>Wirkungskette</h2>
                  </div>
                  <div>
                    <span className="pr-2 book-info-sm ">alle Daten</span>
                    <Switch
                      checked={props.onlyCritical}
                      onChange={props.setOnlyCritical}
                      className={classNames(
                        props.onlyCritical ? "bg-green-600" : "bg-gray-200",
                        "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-1 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
                      )}
                    >
                      <span className="sr-only">Critical or all</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          props.onlyCritical
                            ? "translate-x-5"
                            : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        )}
                      />
                    </Switch>
                    <span className="pl-2 book-info-sm">nur kritisch</span>
                  </div>
                </div>
                <img src={hitzeCard} />
                <div className="flex border-t border-t-green-600 mt-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <span className="book-info-sm">LEGENDE</span>
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
                      <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
                          <table className="divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  GEWICHT
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Landoberflächentemperatur (°C)
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {(
                                    parseFloat(
                                      props.currentGrid.ls_temperature * 0.02,
                                    ) - 273.15
                                  ).toFixed(2)}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Anzahl Bäume auf Landesliegenschaften
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.tree_state}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Bäume auf Anhöhen
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.tree_municipal}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Grünfläche
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.greenspace}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
                                  3
                                </td>
                              </tr>

                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Armutsindex
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.poverty_index,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Überflutung durch <br />
                                  Oberflächenwasser
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
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
                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                      <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
                        <table className="divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                              >
                                AUSGEWÄHLTE REGION
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                              >
                                Wert
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Gefahr
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.B_HAZARD).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Belastung
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.B_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Bewältigungsfähigkeit (Anfälligkeit)
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.B_COPING).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Empfindlichkeit (Anfälligkeit)
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.B_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Risikolevel
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
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
                        attribute: "Bewältigungsfähigkeit",
                        val: props.currentGrid.B_COPING,
                      },
                      {
                        attribute: "Belastung",
                        val: props.currentGrid.B_EXPOSURE,
                      },
                      {
                        attribute: "Empfindlichkeit (Anfälligkeit)",
                        val: props.currentGrid.B_SENSITIVITY,
                      },
                    ]}
                  />
                </div>
              </>
            ) : currentRisk === 3 ? (
              <>
                <div className="flex justify-between items-center pb-2">
                  <div>
                    <h2>Wirkungskette</h2>
                  </div>
                  <div>
                    <span className="pr-2 book-info-sm ">alle Daten</span>
                    <Switch
                      checked={props.onlyCritical}
                      onChange={props.setOnlyCritical}
                      className={classNames(
                        props.onlyCritical ? "bg-green-600" : "bg-gray-200",
                        "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-1 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
                      )}
                    >
                      <span className="sr-only">Critical or all</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          props.onlyCritical
                            ? "translate-x-5"
                            : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        )}
                      />
                    </Switch>
                    <span className="pl-2 book-info-sm">nur kritisch</span>
                  </div>
                </div>
                <img src={luftCard} />
                <div className="flex border-t border-t-green-600 mt-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <span className="book-info-sm">LEGENDE</span>
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
                      <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
                          <table className="divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  GEWICHT
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Anzahl städtischer Bäume
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.tree_municipal}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Anzahl Bäume auf Landesliegenschaften
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.tree_state}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Bodenqualität & Versiegelungsgrad
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.soil_quality,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
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
                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                      <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
                        <table className="divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                              >
                                AUSGEWÄHLTE REGION
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                              >
                                WERT
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Gefahr
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {props.currentGrid.C_HAZARD}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Belastung
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {props.currentGrid.C_EXPOSURE}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Bewältigungsfähigkeit (Anfälligkeit)
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {props.currentGrid.C_COPING}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Empfindlichkeit (Anfälligkeit)
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {props.currentGrid.C_SENSITIVITY}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Risikolevel
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
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
                        attribute: "Bewältigungsfähigkeit",
                        val: props.currentGrid.C_COPING,
                      },
                      {
                        attribute: "Belastung",
                        val: props.currentGrid.C_EXPOSURE,
                      },
                      {
                        attribute: "Empfindlichkeit (Anfälligkeit)",
                        val: props.currentGrid.C_SENSITIVITY,
                      },
                    ]}
                  />
                </div>
              </>
            ) : currentRisk === 4 ? (
              <>
                <div className="flex justify-between items-center pb-2">
                  <div>
                    <h2>Wirkungskette</h2>
                  </div>
                  <div>
                    <span className="pr-2 book-info-sm ">alle Daten</span>
                    <Switch
                      checked={props.onlyCritical}
                      onChange={props.setOnlyCritical}
                      className={classNames(
                        props.onlyCritical ? "bg-green-600" : "bg-gray-200",
                        "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-1 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
                      )}
                    >
                      <span className="sr-only">Critical or all</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          props.onlyCritical
                            ? "translate-x-5"
                            : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        )}
                      />
                    </Switch>
                    <span className="pl-2 book-info-sm">nur kritisch</span>
                  </div>
                </div>
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
                      props.setActiveHazard(4);
                      setCurrentRisk(4);
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
                      props.setActiveHazard(5);
                      setCurrentRisk(5);
                    }}
                  >
                    Bebautes Gebiet
                  </h2>
                </div>
                <img src={uberCard} />
                <div className="flex border-t border-t-green-600 mt-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <span className="book-info-sm">LEGENDE</span>
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
                      <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
                          <table className="divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  GEWICHT
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Anzahl städtischer Bäume
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.tree_municipal}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Anzahl Bäume auf Landesliegenschaften
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.tree_state}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Bodenqualität & Versiegelungsgrad
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.soil_quality,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
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
                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                      <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
                        <table className="divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                              >
                                AUSGEWÄHLTE REGION
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                              >
                                WERT
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Gefahr
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.D_HAZARD).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Belastung
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.D_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Bewältigungsfähigkeit (Anfälligkeit)
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.D_COPING).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Empfindlichkeit (Anfälligkeit)
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.D_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Risikolevel
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
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
                        attribute: "Bewältigungsfähigkeit",
                        val: props.currentGrid.D_COPING,
                      },
                      {
                        attribute: "Belastung",
                        val: props.currentGrid.D_EXPOSURE,
                      },
                      {
                        attribute: "Empfindlichkeit (Anfälligkeit)",
                        val: props.currentGrid.D_SENSITIVITY,
                      },
                    ]}
                  />
                </div>
              </>
            ) : currentRisk === 5 ? (
              <>
                <div className="flex justify-between items-center pb-2">
                  <div>
                    <h2>Wirkungskette</h2>
                  </div>
                  <div>
                    <span className="pr-2 book-info-sm ">alle Daten</span>
                    <Switch
                      checked={props.onlyCritical}
                      onChange={props.setOnlyCritical}
                      className={classNames(
                        props.onlyCritical ? "bg-green-600" : "bg-gray-200",
                        "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-1 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
                      )}
                    >
                      <span className="sr-only">Critical or all</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          props.onlyCritical
                            ? "translate-x-5"
                            : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        )}
                      />
                    </Switch>
                    <span className="pl-2 book-info-sm">nur kritisch</span>
                  </div>
                </div>
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
                      props.setActiveHazard(4);
                      setCurrentRisk(4);
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
                      props.setActiveHazard(5);
                      setCurrentRisk(5);
                    }}
                  >
                    Bebautes Gebiet
                  </h2>
                </div>
                <img src={uberBuiltCard} />
                <div className="flex border-t border-t-green-600 mt-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <span className="book-info-sm">LEGENDE</span>
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
                      <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
                          <table className="divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-3 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  GEWICHT
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Anzahl städtischer Bäume
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.tree_municipal}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Anzahl Bäume auf Landesliegenschaften
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.tree_state}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Bodenqualität & Versiegelungsgrad
                                </td>
                                <td className="py-4 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.soil_quality,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-4 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-4 px-2 book-info-sm text-dark-wood-700 text-right">
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
                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                      <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
                        <table className="divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                              >
                                AUSGEWÄHLTE REGION
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left medium-info-sm uppercase bg-green-500 text-white"
                              >
                                WERT
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Gefahr
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.E_HAZARD).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Belastung
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.E_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Bewältigungsfähigkeit (Anfälligkeit)
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.E_COPING).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Empfindlichkeit (Anfälligkeit)
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.E_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                Risikolevel
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
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
                        attribute: "Bewältigungsfähigkeit",
                        val: props.currentGrid.E_COPING,
                      },
                      {
                        attribute: "Belastung",
                        val: props.currentGrid.E_EXPOSURE,
                      },
                      {
                        attribute: "Empfindlichkeit (Anfälligkeit)",
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
  activeHazard: PropTypes.number,
  currentGrid: PropTypes.object,
  onlyCritical: PropTypes.bool,
  setOnlyCritical: PropTypes.func,
};
