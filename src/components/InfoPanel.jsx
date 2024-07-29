import { Fragment, useState } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import {
  Transition,
  Popover,
  PopoverButton,
  PopoverPanel,
  Switch,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import DataInfoPopover from "./DataInfoPopover";
import ComboFilter from "./ComboFilter";
import InfoSlideOver from "./InfoSlideOver";
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
      className="bg-white-200 rounded-r-[30px] z-10"
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
                <span className="book-intro-sm">
                  Stadtbezirk: {props.currentGrid.stadtbezirk}
                </span>
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
                    <span className="book-info-md">Gesamtrisikobewertung</span>
                  </div>
                  <div className="flex items-baseline">
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
                    <span className="px-1 book-info-sm">nur kritisch</span>
                    <InfoSlideOver label="filter" />
                    <Popover className="relative">
                      <PopoverButton className="pl-4 inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                        <span className=" book-info-sm">
                          Demografische Filter
                        </span>
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </PopoverButton>

                      <PopoverPanel
                        transition
                        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl h-80">
                          <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                            <ComboFilter
                              label="Wohndichte"
                              setFilterState={props.setPopulationFilter}
                            />

                            <ComboFilter
                              label="Haushalte in Armut"
                              setFilterState={props.setPovertyFilter}
                            />

                            <ComboFilter
                              label="Baumbestand"
                              setFilterState={props.setTreeFilter}
                            />

                            <ComboFilter
                              label="Vorhandensein kritischer Infrastruktur"
                              setFilterState={props.setCriticalFilter}
                            />

                            <ComboFilter
                              label="Einwohner über 65 Jahre"
                              binary={true}
                              setFilterState={props.setOldFilter}
                            />

                            <ComboFilter
                              label="Einwohner unter 10 Jahren"
                              binary={true}
                              setFilterState={props.setYoungFilter}
                            />
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-t border-t-green-600 my-4">
                  <div className="pt-2 border-r border-r-green-600">
                    <span className="book-info-sm ">LEGENDE</span>
                    <InfoSlideOver label="topLegendOverall" />
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
                      <span className="book-info-sm text-right inline-block">
                        BÄUME AUF <br />
                        LANDESLIEGENSCHAFTEN
                        <DataInfoPopover description="Die Anzahl der Bäume auf Landesliegenschaften in Stuttgart innerhalb jedes Rasters." />
                      </span>
                    </div>

                    <div className="flex justify-between py-4 border border-b border-b-green-600 pr-4">
                      <span className="px-8 medium-intro-sm">
                        {props.currentGrid.tree_state}
                      </span>
                      <span className="book-info-sm text-right">
                        STÄDTISCHE BÄUME
                        <DataInfoPopover description="Die Anzahl der Bäume in städtischem Besitz innerhalb jedes Rasters." />
                      </span>
                    </div>

                    <div className="flex justify-between py-4 border border-b border-b-green-600 pr-4">
                      <span className="px-8 medium-intro-sm">
                        {parseFloat(
                          props.currentGrid.critical_infrastructure,
                        ).toFixed(2)}
                      </span>
                      <span className="book-info-sm text-right">
                        KRITISCHE INFRASTRUKTUR
                        <DataInfoPopover description="Die Anzahl der kritischen Infrastrukturen, einschließlich Kindergärten, Schulen, Polizei, Krankenhäuser und Elektrizitätsinfrastrukturen." />
                      </span>
                    </div>

                    <div className="flex justify-between py-4 border border-b border-b-green-600 pr-4">
                      <span className="px-8 medium-intro-sm">
                        {parseFloat(props.currentGrid.poverty_index).toFixed(2)}
                      </span>
                      <span className="book-info-sm text-right">
                        ARMUTSINDEX
                        <DataInfoPopover description="Der Armutsindex pro Stadtviertel von -2 (Minimum) bis 2 (Maximum)." />
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="-mx-4 border-8 border-green-600" />
                <InfoSlideOver label="bottomTableOverall" />
                <div className="grid grid-cols-2 mt-1">
                  <div className=" flow-root">
                    <div className="">
                      <div className="inline-block  align-middle rounded-t-[10px] border-green-600 border-l border-r border-b  ">
                        <table className=" ">
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
                          <tbody className="divide-y divide-green-600 bg-white">
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
                        val: props.currentGrid.D_risk_score,
                      },
                      {
                        attribute: "Überschwemmungsgefahr für bebaute Gebiete",
                        val: props.currentGrid.E_risk_score,
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
                    <span className="book-info-md">Wirkungskette</span>
                  </div>
                  <div className="">
                    <div className="flex items-baseline">
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
                      <span className="px-1 book-info-sm">nur kritisch</span>
                      <InfoSlideOver label="filter" />
                      <Popover className="relative">
                        <PopoverButton className="pl-4 inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                          <span className=" book-info-sm">
                            Demografische Filter
                          </span>
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </PopoverButton>

                        <PopoverPanel
                          transition
                          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl h-80">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                              <ComboFilter
                                label="Wohndichte"
                                setFilterState={props.setPopulationFilter}
                              />

                              <ComboFilter
                                label="Haushalte in Armut"
                                setFilterState={props.setPovertyFilter}
                              />

                              <ComboFilter
                                label="Baumbestand"
                                setFilterState={props.setTreeFilter}
                              />

                              <ComboFilter
                                label="Vorhandensein kritischer Infrastruktur"
                                setFilterState={props.setCriticalFilter}
                              />

                              <ComboFilter
                                label="Einwohner über 65 Jahre"
                                binary={true}
                                setFilterState={props.setOldFilter}
                              />

                              <ComboFilter
                                label="Einwohner unter 10 Jahren"
                                binary={true}
                                setFilterState={props.setYoungFilter}
                              />
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>
                    </div>
                  </div>
                </div>
                <img src={heatCard} className="w-[80%] pb-2" />
                <hr className="-mx-4 border-8 border-green-600" />
                <div className="flex py-2">
                  <div className=" grow-0">
                    <span className="book-info-sm">LEGENDE</span>
                    <InfoSlideOver label="topLegendTrocken" />
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
                  <div className="grow-0">
                    <div className=" px-2 ">
                      <div className="">
                        <div className="inline-block align-middle border-green-600 border-l border-r border-b rounded-t-[10px] ">
                          <table className=" divide-y divide-green-600 ">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-2 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  GEWICHT
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-green-600">
                              <tr>
                                <td className=" py-2 px-2 book-info-sm text-gray-900 ">
                                  Anzahl städtischer
                                  <br /> Bäume
                                  <DataInfoPopover description="Die Anzahl der Bäume in städtischem Besitz innerhalb jedes Rasters." />
                                </td>
                                <td className=" px-2 py-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.tree_municipal}
                                </td>
                                <td className=" px-2 py-2 book-info-sm text-gray-900">
                                  Belasteter <br />
                                  Vermögenswert
                                </td>
                                <td className=" px-2 py-2 book-info-sm text-dark-wood-700 ">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                  Anzahl Bäume auf
                                  <br /> Landesliegenschaften
                                  <DataInfoPopover description="Die Anzahl der Bäume auf Landesliegenschaften in Stuttgart innerhalb jedes Rasters." />
                                </td>
                                <td className="medium-intro-sm px-2 py-4 text-green-600">
                                  {props.currentGrid.tree_state}
                                </td>
                                <td className=" px-2 py-4 book-info-sm text-gray-900">
                                  Belasteter
                                  <br /> Vermögenswert
                                </td>
                                <td className=" px-2 py-4 book-info-sm text-dark-wood-700 ">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                  Bodenqualität
                                  <br /> & Versiegelungsgrad
                                  <DataInfoPopover description="Dieser Wert dient der Gesamtbewertung der Bodenqualität unter Berücksichtigung von Archivfunktion, Versiegelung und Altlasten. Die Skala reicht von 0 (keine funktionale Bodenqualität) bis 5 (sehr hohe Bodenqualität)" />
                                </td>
                                <td className=" px-2 py-4 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.soil_quality,
                                  ).toFixed(2)}
                                </td>
                                <td className=" px-2 py-4 book-info-sm text-gray-900">
                                  Anfälligkeit <br />
                                  (Empfindlichkeit)
                                </td>
                                <td className=" px-2 py-4 book-info-sm text-dark-wood-700 ">
                                  3
                                </td>
                              </tr>

                              <tr>
                                <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                  Durchschnitt digitales Höhenmodell (DEM)
                                  <DataInfoPopover description="Ein digitales Höhenmodell (DEM: Digital Elevation Model) verwendet typischerweise Meter als Maßeinheit für die Höhe. Die Erhebungen in einem DEM werden in Metern über dem Meeresspiegel gemessen. Dieser Indikator ist für diese Bewertung relevant, da Bäume auf Hügeln stärker dem Wind und der Sonneneinstrahlung ausgesetzt und daher anfälliger für Dürrerisiken sind." />
                                </td>
                                <td className=" px-2 py-4 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.average_dem,
                                  ).toFixed(2)}
                                </td>
                                <td className=" px-2 py-4 book-info-sm text-gray-900">
                                  Anfälligkeit <br />
                                  (Empfindlichkeit)
                                </td>
                                <td className=" px-2 py-4 book-info-sm text-dark-wood-700 ">
                                  2
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="-mx-4 border-8 border-green-600" />
                <div className="grid grid-cols-2">
                  <div className="">
                    <InfoSlideOver label="bottomTable" />
                    <div className="">
                      <div className="inline-block  align-middle rounded-t-[10px] border-green-600 border-l border-r border-b">
                        <table className=" divide-y divide-green-600  ">
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
                          <tbody className="divide-y divide-green-600 bg-white">
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
                    <span className="book-info-md">Wirkungskette</span>
                  </div>
                  <div>
                    <div className="flex items-baseline">
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
                      <span className="px-1 book-info-sm">nur kritisch</span>
                      <InfoSlideOver label="filter" />
                      <Popover className="relative">
                        <PopoverButton className="pl-4 inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                          <span className=" book-info-sm">
                            Demografische Filter
                          </span>
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </PopoverButton>

                        <PopoverPanel
                          transition
                          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl h-80">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                              <ComboFilter
                                label="Wohndichte"
                                setFilterState={props.setPopulationFilter}
                              />

                              <ComboFilter
                                label="Haushalte in Armut"
                                setFilterState={props.setPovertyFilter}
                              />

                              <ComboFilter
                                label="Baumbestand"
                                setFilterState={props.setTreeFilter}
                              />

                              <ComboFilter
                                label="Vorhandensein kritischer Infrastruktur"
                                setFilterState={props.setCriticalFilter}
                              />
                              <ComboFilter
                                label="Einwohner über 65 Jahre"
                                binary={true}
                                setFilterState={props.setOldFilter}
                              />

                              <ComboFilter
                                label="Einwohner unter 10 Jahren"
                                binary={true}
                                setFilterState={props.setYoungFilter}
                              />
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>
                    </div>
                  </div>
                </div>
                <img src={hitzeCard} className="w-[80%] pb-2" />
                <hr className="-mx-4 border-8 border-green-600" />
                <div className="flex pb-2">
                  <div className="">
                    <span className="book-info-sm">LEGENDE</span>
                    <InfoSlideOver label="topLegendHitze" />
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
                    <div className="mt-2 flow-root px-2 ">
                      <div className=" h-48 overflow-y-scroll ">
                        <div className="inline-block align-middle sm:mx-6 rounded-t-[10px] border-green-600 border-l border-r border-b ">
                          <table className="divide-y divide-green-600">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-2 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  GEWICHT
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-green-600 bg-white">
                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Landoberflächentemperatur (°C)
                                  <DataInfoPopover description="Gebiete, in denen die Wärme zurückgehalten wird, was zu erhöhtem Unbehagen, Gesundheitsrisiken und erhöhten Temperaturen in städtischen Gebieten führt und den Hitzestress verschlimmert." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {(
                                    parseFloat(
                                      props.currentGrid.ls_temperature * 0.02,
                                    ) - 273.15
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Gefahr
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  2
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Geschätzte Einwohnerschaft
                                  <DataInfoPopover description="Geschätzte Einwohnerzahl auf der Grundlage der demografischen Gegebenheiten des Viertels und der Fläche der Wohngrundstücke." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.population_est}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  6
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Geschätzte ältere Bevölkerung ({">"}64)
                                  <DataInfoPopover description="Ältere Menschen (>64) sind aufgrund ihrer geringeren Hitzetoleranz und potenzieller Gesundheitsprobleme anfälliger für hitzebedingte Krankheiten, was sie bei extremer Hitze angreifbar macht." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.elderly}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  70
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Geschätzte Vorschulbevölkerung ({"<"}10)
                                  <DataInfoPopover description="Kinder unter 10 Jahren sind aufgrund ihrer geringeren Körpergröße und ihrer höheren Stoffwechselrate hitzeempfindlicher, was ihre Anfälligkeit für hitzebedingte Gesundheitsprobleme erhöht." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.young_pop}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  15
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Armutsindex
                                  <DataInfoPopover description="Der Armutsindex pro Stadtviertel von -2 (Minimum) bis 2 (Maximum)." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.poverty_index,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  55
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Prozentsatz der undurchlässigen Fläche
                                  <DataInfoPopover description="Undurchlässige Oberflächen in städtischen Gebieten, wie Beton und Asphalt, absorbieren und speichern die Wärme stärker als natürliche Landschaften, wodurch die lokalen Temperaturen erheblich ansteigen und der Hitzestress der Stadtbevölkerung verschärft wird." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.impervious,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  35
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Vorhandensein von Schulen, Kindergärten und
                                  Pflegeheimen (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Diese Einrichtungen beherbergen oder betreuen häufig besonders schutzbedürftige Bevölkerungsgruppen wie Kinder, ältere Menschen oder Personen mit gesundheitlichen Problemen, was auf eine mögliche Konzentration schutzbedürftiger Gruppen hinweist." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.school_kindergarden,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  30
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Fläche der Grünflächen (Parks, Grünflächen und
                                  Friedhof) (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Grüne Infrastrukturen wie Parks, Bäume und Grünflächen sorgen für Abkühlung durch Beschattung, Evapotranspiration und Verbesserung der Luftqualität, wodurch der städtische Wärmeinseleffekt gemildert wird." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.greenspace,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Bewältigungsfähigkeit (Anfälligkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  9
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anzahl der staatlichen, kommunalen und
                                  sonstigen Bäume
                                  <DataInfoPopover description="Anzahl aller Bäume in Besitz von Stadt und Land innerhalb jedes Rasters." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.total_tree}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Bewältigungsfähigkeit (Anfälligkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  6
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="-mx-4 border-8 border-green-600" />
                <div className="grid grid-cols-2">
                  <div className="flow-root">
                    <InfoSlideOver label="bottomTable" />
                    <div className="">
                      <div className="inline-block align-middle rounded-t-[10px] border-green-600 border-l border-r border-b ">
                        <table className="divide-y divide-green-600">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-2 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                              >
                                AUSGEWÄHLTE REGION
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 rounded-tr-[10px] text-white"
                              >
                                Wert
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-green-600 bg-white">
                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Gefahr
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.B_HAZARD).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Belastung
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.B_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Bewältigungsfähigkeit (Anfälligkeit)
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
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
                    <span className="book-info-md">Wirkungskette</span>
                  </div>
                  <div>
                    <div className="flex items-baseline">
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
                      <span className="px-1 book-info-sm">nur kritisch</span>
                      <InfoSlideOver label="filter" />
                      <Popover className="relative">
                        <PopoverButton className="pl-4 inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                          <span className=" book-info-sm">
                            Demografische Filter
                          </span>
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </PopoverButton>

                        <PopoverPanel
                          transition
                          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl h-80">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                              <ComboFilter
                                label="Wohndichte"
                                setFilterState={props.setPopulationFilter}
                              />

                              <ComboFilter
                                label="Haushalte in Armut"
                                setFilterState={props.setPovertyFilter}
                              />

                              <ComboFilter
                                label="Baumbestand"
                                setFilterState={props.setTreeFilter}
                              />

                              <ComboFilter
                                label="Vorhandensein kritischer Infrastruktur"
                                setFilterState={props.setCriticalFilter}
                              />
                              <ComboFilter
                                label="Einwohner über 65 Jahre"
                                binary={true}
                                setFilterState={props.setOldFilter}
                              />

                              <ComboFilter
                                label="Einwohner unter 10 Jahren"
                                binary={true}
                                setFilterState={props.setYoungFilter}
                              />
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>
                    </div>
                  </div>
                </div>
                <img src={luftCard} className="w-[80%] pb-2" />
                <hr className="-mx-4 border-8 border-green-600" />
                <div className="flex pb-2">
                  <div className="">
                    <span className="book-info-sm">LEGENDE</span>
                    <InfoSlideOver label="topLegendLuft" />
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
                    <div className="mt-2 flow-root ">
                      <div className=" h-48 overflow-y-scroll">
                        <div className="inline-block  align-middle rounded-t-[10px] border-green-600 border-l border-r border-b ">
                          <table className="divide-y divide-green-600">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-2 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  GEWICHT
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-green-600 bg-white">
                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Durchschnittlich gemessener Feinstaub (PM 10)
                                  µg/m³
                                  <DataInfoPopover description="PM10 bezieht sich auf einatembare Partikel mit einem Durchmesser von 10 Mikrometern oder weniger, die in die Atemwege eindringen und Atemwegs- und Herz-Kreislaufprobleme verursachen können. Der Schwellenwert liegt über 46 . Der Grenzwert liegt bei 55." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.pm10_mean,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Gefahr
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  6
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Durchschnittlich gemessenes Stickstoffdioxid
                                  (NO2) µg/m³
                                  <DataInfoPopover description="NO2 ist ein Gas, das bei Verbrennungsprozessen, Fahrzeugabgasen und industriellen Aktivitäten entsteht und zu einer Reizung der Atemwege führt und Lungenerkrankungen verschlimmert. Der Schwellenwert liegt über 110. Der Grenzwert liegt bei 200." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.no2_mean,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Gefahr
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  6
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Geschätzte Einwohnerschaft
                                  <DataInfoPopover description="Geschätzte Einwohnerzahl auf der Grundlage der demografischen Gegebenheiten des Viertels und der Fläche der Wohngrundstücke." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.population_est,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  4
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Geschätzte ältere Bevölkerung ({">"}64)
                                  <DataInfoPopover description="Ältere Menschen (>64) haben oft ein geschwächtes Immunsystem und gesundheitliche Vorbelastungen, was sie anfälliger für die negativen Auswirkungen der Luftverschmutzung macht." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.elderly}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  2
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Geschätzte Vorschulbevölkerung ({"<"}10)
                                  <DataInfoPopover description="Kinder unter 10 Jahren haben ein sich noch entwickelndes Atmungssystem, das sie anfälliger für Atemwegsinfektionen und langfristige gesundheitliche Auswirkungen der Luftverschmutzung macht." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.young_pop}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  18
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Armutsindex
                                  <DataInfoPopover description="Der Armutsindex pro Stadtviertel von -2 (Minimum) bis 2 (Maximum)." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.poverty_index,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  12
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Vorhandensein von Schulen, Kindergärten und
                                  Pflegeheimen (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Diese Einrichtungen beherbergen oder betreuen häufig besonders schutzbedürftige Bevölkerungsgruppen wie Kinder, ältere Menschen oder Personen mit gesundheitlichen Problemen, was auf eine mögliche Konzentration schutzbedürftiger Gruppen hinweist." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.school_kindergarden,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  12
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anzahl der staatlichen, kommunalen und
                                  sonstigen Bäume
                                  <DataInfoPopover description="Anzahl aller Bäume in Besitz von Stadt und Land innerhalb jedes Rasters." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.total_tree}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Bewältigungsfähigkeit (Anfälligkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  10
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Fläche der Grünflächen (Parks, Grünflächen und
                                  Friedhof) (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Grüne Infrastrukturen wie Parks, Bäume und Grünflächen sorgen für Abkühlung durch Beschattung, Evapotranspiration und Verbesserung der Luftqualität, wodurch der städtische Wärmeinseleffekt gemildert wird." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.greenspace,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Bewältigungsfähigkeit (Anfälligkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  8
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="-mx-4 border-8 border-green-600" />
                <div className="grid grid-cols-2 ">
                  <div className="flow-root">
                    <InfoSlideOver label="bottomTable" />
                    <div className=" ">
                      <div className="inline-block align-middle rounded-t-[10px] border-green-600 border-l border-r border-b ">
                        <table className="divide-y divide-green-600">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-2 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                              >
                                AUSGEWÄHLTE REGION
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500  rounded-tr-[10px] text-white"
                              >
                                WERT
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-green-600 bg-white">
                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Gefahr
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {props.currentGrid.C_HAZARD}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Belastung
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {props.currentGrid.C_EXPOSURE}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Bewältigungsfähigkeit (Anfälligkeit)
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {props.currentGrid.C_COPING}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Empfindlichkeit (Anfälligkeit)
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {props.currentGrid.C_SENSITIVITY}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Risikolevel
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
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
                    <span className="book-info-md">Wirkungskette</span>
                  </div>
                  <div>
                    <div className="flex items-baseline">
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
                      <span className="px-1 book-info-sm">nur kritisch</span>
                      <InfoSlideOver label="filter" />
                      <Popover className="relative">
                        <PopoverButton className="pl-4 inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                          <span className=" book-info-sm">
                            Demografische Filter
                          </span>
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </PopoverButton>

                        <PopoverPanel
                          transition
                          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl h-80">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                              <ComboFilter
                                label="Wohndichte"
                                setFilterState={props.setPopulationFilter}
                              />

                              <ComboFilter
                                label="Haushalte in Armut"
                                setFilterState={props.setPovertyFilter}
                              />

                              <ComboFilter
                                label="Baumbestand"
                                setFilterState={props.setTreeFilter}
                              />

                              <ComboFilter
                                label="Vorhandensein kritischer Infrastruktur"
                                setFilterState={props.setCriticalFilter}
                              />
                              <ComboFilter
                                label="Einwohner über 65 Jahre"
                                binary={true}
                                setFilterState={props.setOldFilter}
                              />

                              <ComboFilter
                                label="Einwohner unter 10 Jahren"
                                binary={true}
                                setFilterState={props.setYoungFilter}
                              />
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <span
                    className={classNames(
                      transportBuiltSwitch === "Transport"
                        ? " text-green-600"
                        : "text-dark-wood-500 hover:text-green-600",
                      "pb-4 hover:cursor-pointer book-intro-sm",
                    )}
                    onClick={() => {
                      setTransportBuiltSwitch("Transport");
                      props.setActiveHazard(4);
                      setCurrentRisk(4);
                    }}
                  >
                    Transport Netzwerk |
                  </span>
                  <span
                    className={classNames(
                      transportBuiltSwitch === "Built"
                        ? " text-green-600"
                        : "text-dark-wood-500 hover:text-green-600",
                      "pl-2 hover:cursor-pointer book-intro-sm",
                    )}
                    onClick={() => {
                      setTransportBuiltSwitch("Built");
                      props.setActiveHazard(5);
                      setCurrentRisk(5);
                    }}
                  >
                    Bebautes Gebiet
                  </span>
                </div>
                <img src={uberCard} className="w-[80%] pb-2" />
                <hr className="-mx-4 border-8 border-green-600" />
                <div className="flex pb-2">
                  <div className="pt-2 ">
                    <span className="book-info-sm">LEGENDE</span>
                    <InfoSlideOver label="topLegendUber1" />
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
                    <div className="flow-root px-2 ">
                      <div className="h-52 overflow-y-scroll mt-2">
                        <div className="inline-block align-middle rounded-t-[10px] border-green-600 border-l border-r border-b ">
                          <table className="divide-y divide-green-600">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-2 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  GEWICHT
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-green-600 bg-white">
                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Überschwemmung durch Oberflächenwasser (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Die Daten zu Überschwemmungen durch Oberflächenwasser in bebauten Gebieten weisen auf ein erhöhtes Risiko lokaler Überschwemmungen aufgrund überlasteter Entwässerungssysteme hin, die eine Gefährdung der Infrastruktur und der öffentlichen Sicherheit darstellen." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.flood_area,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Gefahr
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  3
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Industrie & Gewerbegebiet (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Industrie- und Gewerbegebäude sind der Gefahr von Oberflächenwasserüberschwemmungen ausgesetzt" />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.industrial_commecrcial,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  4
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Kritische Infrastrukturen (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Industrielle und gewerbliche Gebäude sind dem Risiko einer Überschwemmung durch Oberflächenwasser ausgesetzt" />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.critical_infrastructure,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  24
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Geschätzte Einwohnerschaft
                                  <DataInfoPopover description="Geschätzte Einwohnerzahl auf der Grundlage der demografischen Gegebenheiten des Viertels und der Fläche der Wohngrundstücke." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.population_est}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  10
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Armutsindex
                                  <DataInfoPopover description="Der Armutsindex pro Stadtviertel von -2 (Minimum) bis 2 (Maximum)." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.poverty_index,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  6
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Prozentsatz der undurchlässigen Fläche
                                  <DataInfoPopover description="Undurchlässige Oberflächen in städtischen Gebieten, wie Beton und Asphalt, absorbieren und speichern die Wärme stärker als natürliche Landschaften, wodurch die lokalen Temperaturen erheblich ansteigen und der Hitzestress der Stadtbevölkerung verschärft wird." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.impervious,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  26
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Durchschnittliche Steigung
                                  <DataInfoPopover description="Gebiete mit steilen Hängen neigen bei starken Regenfällen zu schnellem Abfluss, wodurch sich der Wasserfluss bergab konzentriert, die Erosion verstärkt, das Risiko von Erdrutschen erhöht und Überschwemmungen flussabwärts in niedrig gelegenen Gebieten verstärkt werden." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.slope_mean,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  16
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Fläche der Grünflächen (Parks, Grünflächen und
                                  Friedhof) (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Grüne Infrastrukturen wie Parks, Bäume und Grünflächen sorgen für Abkühlung durch Beschattung, Evapotranspiration und Verbesserung der Luftqualität, wodurch der städtische Wärmeinseleffekt gemildert wird." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.greenspace,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Bewältigungsfähigkeit (Anfälligkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  13
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="-mx-4 border-8 border-green-600" />
                <div className="grid grid-cols-2 ">
                  <div className="flow-root">
                    <InfoSlideOver label="bottomTable" />
                    <div className=" h-60 overflow-y-scroll">
                      <div className="inline-block  align-middle rounded-t-[10px] border-green-600 border-l border-r border-b ">
                        <table className="divide-y divide-green-600">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-2 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                              >
                                AUSGEWÄHLTE REGION
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 rounded-tr-[10px] text-white"
                              >
                                WERT
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-green-600 bg-white">
                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Gefahr
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.D_HAZARD).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Belastung
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.D_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Bewältigungsfähigkeit (Anfälligkeit)
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.D_COPING).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Empfindlichkeit (Anfälligkeit)
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.D_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Risikolevel
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
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
                    <span className="book-info-md">Wirkungskette</span>
                  </div>
                  <div>
                    <div className="flex items-baseline">
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
                      <span className="px-1 book-info-sm">nur kritisch</span>
                      <InfoSlideOver label="filter" />
                      <Popover className="relative">
                        <PopoverButton className="pl-4 inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                          <span className=" book-info-sm">
                            Demografische Filter
                          </span>
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </PopoverButton>

                        <PopoverPanel
                          transition
                          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl h-80">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                              <ComboFilter
                                label="Wohndichte"
                                setFilterState={props.setPopulationFilter}
                              />

                              <ComboFilter
                                label="Haushalte in Armut"
                                setFilterState={props.setPovertyFilter}
                              />

                              <ComboFilter
                                label="Baumbestand"
                                setFilterState={props.setTreeFilter}
                              />

                              <ComboFilter
                                label="Vorhandensein kritischer Infrastruktur"
                                setFilterState={props.setCriticalFilter}
                              />
                              <ComboFilter
                                label="Einwohner über 65 Jahre"
                                binary={true}
                                setFilterState={props.setOldFilter}
                              />

                              <ComboFilter
                                label="Einwohner unter 10 Jahren"
                                binary={true}
                                setFilterState={props.setYoungFilter}
                              />
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <span
                    className={classNames(
                      transportBuiltSwitch === "Transport"
                        ? " text-green-600"
                        : "text-dark-wood-500 hover:text-green-600",
                      "pb-4 hover:cursor-pointer book-intro-sm",
                    )}
                    onClick={() => {
                      setTransportBuiltSwitch("Transport");
                      props.setActiveHazard(4);
                      setCurrentRisk(4);
                    }}
                  >
                    Transport Netzwerk |
                  </span>
                  <span
                    className={classNames(
                      transportBuiltSwitch === "Built"
                        ? " text-green-600"
                        : "text-dark-wood-500 hover:text-green-600",
                      "pl-2 hover:cursor-pointer book-intro-sm",
                    )}
                    onClick={() => {
                      setTransportBuiltSwitch("Built");
                      props.setActiveHazard(5);
                      setCurrentRisk(5);
                    }}
                  >
                    Bebautes Gebiet
                  </span>
                </div>
                <img src={uberBuiltCard} className="w-[80%] pb-2" />
                <hr className="-mx-4 border-8 border-green-600" />
                <div className="flex pb-2">
                  <div className="">
                    <span className="book-info-sm">LEGENDE</span>
                    <InfoSlideOver label="topLegendUber2" />
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
                    <div className="mt-2 flow-root  ">
                      <div className="h-48 overflow-y-scroll">
                        <div className="inline-block align-middle rounded-t-[10px] border-green-600 border-l border-r border-b ">
                          <table className="divide-y divide-green-600">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-2 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                                >
                                  INDIKATOR
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  WERT
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  KLASSE
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  GEWICHT
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-green-600 bg-white">
                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Überschwemmung durch Oberflächenwasser (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Daten zu Überschwemmungen durch Oberflächenwasser in bebauten Gebieten deuten auf ein erhöhtes Risiko lokaler Überschwemmungen aufgrund überlasteter Entwässerungssysteme hin, die eine Gefährdung der Infrastruktur und der öffentlichen Sicherheit darstellen." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.flood_area,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Gefahr
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  5
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Überschwemmungsgefahr in der Straße (erhöht,
                                  hoch und mittel) (m)
                                  <DataInfoPopover description="Überschwemmungsgefährdete Straßen (klassifiziert als erhöht, hoch und mittel)" />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.Roads_risk_flooding,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Gefahr
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  10
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Straßenbahn- und Zugnetz (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Straßenbahn- und Eisenbahnnetze, die oft in tief gelegenen Gebieten oder in der Nähe von Gewässern gebaut wurden, sind anfällig für Überschwemmungen bei starken Regenfällen oder Flussüberläufen. Überschwemmte Gleise oder Bahnhöfe können den Bahnverkehr unterbrechen, was zu Betriebsunterbrechungen, Verspätungen und möglichen Schäden an der Infrastruktur führt und den Pendlerverkehr beeinträchtigt." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.tram_train,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  15
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Straßennetz (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Das Straßennetz, einschließlich Straßen und Autobahnen, kann bei Hochwasserereignissen überflutet werden, was den Verkehr behindert und die Zugänglichkeit beeinträchtigt. Überschwemmte Straßen behindern den Verkehr und führen zu Verkehrsstörungen, Umleitungen, Straßensperrungen und möglichen Schäden an Fahrzeugen in den betroffenen Gebieten." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(props.currentGrid.street).toFixed(
                                    2,
                                  )}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  15
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Fußgängernetz (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Fußgängerwege, Bürgersteige und Kreuzungen sind ebenfalls anfällig für Überschwemmungen, insbesondere in Gebieten mit unzureichender Entwässerung. Überschwemmte Fußgängerwege schränken die sichere Mobilität ein, behindern Gehwege und gefährden Fußgänger, insbesondere in niedrig gelegenen Gebieten oder an Orten, die anfällig für Sturzfluten sind." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.pedestrian,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  9
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Fahrradnetz (m
                                  <span className="align-super">2</span>)
                                  <DataInfoPopover description="Fahrrad- und Radwege, die oft an Straßen oder in überschwemmungsgefährdeten Gebieten verlaufen, können von Überschwemmungen betroffen sein. Überschwemmte Fahrradnetze unterbrechen die Fahrradrouten, schränken alternative Verkehrsmittel ein und beschädigen möglicherweise die Fahrradinfrastruktur." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(props.currentGrid.bike).toFixed(
                                    2,
                                  )}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Belasteter Vermögenswert
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  6
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Geschätzte Einwohnerschaft
                                  <DataInfoPopover description="Geschätzte Einwohnerzahl auf der Grundlage der demografischen Gegebenheiten des Viertels und der Fläche der Wohngrundstücke." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.population_est}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  18
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Armutsindex
                                  <DataInfoPopover description="Der Armutsindex pro Stadtviertel von -2 (Minimum) bis 2 (Maximum)." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.poverty_index,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  14
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Durchschnittliche Steigung (degrees)
                                  <DataInfoPopover description="Gebiete mit steilen Hängen neigen bei starken Regenfällen zu schnellem Abfluss, wodurch sich der Wasserfluss bergab konzentriert, die Erosion verstärkt, das Risiko von Erdrutschen erhöht und Überschwemmungen flussabwärts in niedrig gelegenen Gebieten verstärkt werden." />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.slope_mean,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  Anfälligkeit (Empfindlichkeit)
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  6
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="-mx-4 border-8 border-green-600" />
                <div className="grid grid-cols-2  ">
                  <div className=" flow-root">
                    <InfoSlideOver label="bottomTable" />
                    <div className=" h-60 overflow-y-scroll ">
                      <div className="inline-block  align-middle rounded-t-[10px] border-green-600 border-l border-r border-b ">
                        <table className="divide-y divide-green-600">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-2 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                              >
                                AUSGEWÄHLTE REGION
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 rounded-tr-[10px] text-white"
                              >
                                WERT
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-green-600 bg-white">
                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Gefahr
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.E_HAZARD).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Belastung
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.E_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Bewältigungsfähigkeit (Anfälligkeit)
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.E_COPING).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Empfindlichkeit (Anfälligkeit)
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.E_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                Risikolevel
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
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
  setPopulationFilter: PropTypes.func,
  setPovertyFilter: PropTypes.func,
  setTreeFilter: PropTypes.func,
  setCriticalFilter: PropTypes.func,
  setOldFilter: PropTypes.func,
  setYoungFilter: PropTypes.func,
};
