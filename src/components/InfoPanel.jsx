import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Transition, Switch } from "@headlessui/react";
import PropTypes from "prop-types";

import DataInfoPopover from "./DataInfoPopover";
import FilterGroup from "./FilterGroup";
import InfoSlideOver from "./InfoSlideOver";
import RiskRadar from "./RadarChart";
import heatCard from "../assets/heat_card.png";
import hitzeCard from "../assets/hitze_card.png";
import luftCard from "../assets/luft_card.png";
import uberCard from "../assets/uberCard.png";
import uberBuiltCard from "../assets/uber2.png";
import heatEn from "../assets/HeatEn.png";
import droughtEn from "../assets/DroughtEn.png";
import airEn from "../assets/AirEn.png";
import floodBiEn from "../assets/FloodBIEn.png";
import floodTnEn from "../assets/FloodTNEn.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const hazards = [
  { name: "AVERAGE_RISK", current: true, id: 0 },
  { name: "A_risk_score", current: false, id: 1 },
  { name: "B_risk_score", current: false, id: 2 },
  { name: "C_risk_score", current: false, id: 3 },
  { name: "D_risk_score", current: false, id: 4 },
];

export default function InfoPanel(props) {
  const [currentRisk, setCurrentRisk] = useState(0);
  const [transportBuiltSwitch, setTransportBuiltSwitch] = useState("Transport");
  const { t, i18n } = useTranslation();

  return (
    <Transition.Root
      show={props.show}
      as={Fragment}
      className="bg-white-200 rounded-r-[30px] z-10 w-[42rem] border-b border-r border-l border-green-500"
    >
      <Transition.Child
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="pb-10 max-w-3xl mt-2">
          <div className="pr-4 py-4 bg-green-600 flex flex-row items-center my-auto justify-between rounded-tr-[30px]">
            <div>
              <span className="medium-intro-sm text-white-200 pl-6">
                {t("info_panel.title")}
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
                  <option key={tab.id}> {t(`info_panel.${tab.name}`)}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block px-4">
              <div className="border-b border-gray-200">
                <span className="book-intro-sm">
                  {t("info_panel.neighbor_label")}:{" "}
                  {props.currentGrid.stadtbezirk}
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
                      {t(`info_panel.${tab.name}`)}
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
                    <span className="book-info-md">
                      {t("info_panel.overall_title")}
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="pr-2 book-info-sm ">
                      {t("info_panel.critical_filter_0")}
                    </span>
                    <Switch
                      checked={props.onlyCritical}
                      onChange={props.setOnlyCritical}
                      className={classNames(
                        props.onlyCritical ? "bg-green-600" : "bg-gray-200",
                        "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
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
                    <span className="px-2 book-info-sm">
                      {t("info_panel.critical_filter_1")}
                    </span>
                    <InfoSlideOver label="filter" />
                    <FilterGroup />
                  </div>
                </div>

                <div className="grid grid-cols-2 border-t border-t-green-600 mt-2">
                  <div className="pt-2 border-r border-r-green-600">
                    <span className="book-info-sm uppercase">
                      {t("info_panel.legend")}
                    </span>
                    <InfoSlideOver label="topLegendOverall" />
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-indigo-400 to-green-600"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm max-w-[90px]">
                          {t("info_panel.overall_legend_top")}
                        </div>
                        <div className="book-info-sm">
                          {t("info_panel.overall_legend_bottom")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between py-4 border-b mx-5 border-b-green-600 ">
                      <span className="px-8 medium-intro-sm">
                        {props.currentGrid.tree_municipal}
                      </span>
                      <span className="book-info-sm text-right inline-block uppercase">
                        {t("info_panel.state_trees")}
                        <DataInfoPopover
                          description={t("info_panel.info_state_tree_number")}
                        />
                      </span>
                    </div>

                    <div className="flex justify-between py-4 border-b border-b-green-600 mx-5">
                      <span className="px-8 medium-intro-sm">
                        {props.currentGrid.tree_state}
                      </span>
                      <span className="book-info-sm text-right uppercase">
                        {t("info_panel.city_trees")}
                        <DataInfoPopover
                          description={t("info_panel.info_city_tree_number")}
                        />
                      </span>
                    </div>

                    <div className="flex justify-between py-4 border-b border-b-green-600 mx-5">
                      <span className="px-8 medium-intro-sm">
                        {parseFloat(
                          props.currentGrid.critical_infrastructure,
                        ).toFixed(2)}
                      </span>
                      <span className="book-info-sm text-right uppercase">
                        {t("info_panel.critical_infra")}
                        <DataInfoPopover
                          description={t("info_panel.info_critical")}
                        />
                      </span>
                    </div>

                    <div className="flex justify-between py-4  mx-5">
                      <span className="px-8 medium-intro-sm">
                        {parseFloat(props.currentGrid.poverty_index).toFixed(2)}
                      </span>
                      <span className="book-info-sm text-right uppercase">
                        {t("info_panel.pov_index")}
                        <DataInfoPopover
                          description={t("info_panel.info_pov")}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="-mx-4 border-4 border-green-600" />
                <InfoSlideOver label="bottomTableOverall" />
                <div className="grid grid-cols-2 mt-1 overflow-y-scroll h-[27vh]">
                  <div className=" flow-root">
                    <div className="">
                      <div className="inline-block  align-middle rounded-t-[10px] border-green-600 border-l border-r border-b  ">
                        <table className=" ">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-2 pl-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white "
                              >
                                {t("info_panel.risk")}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                              >
                                {t("info_panel.exposure")}
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2 text-left medium-info-sm uppercase bg-green-500 rounded-tr-[10px] text-white"
                              >
                                {t("info_panel.score")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-green-600 bg-white">
                            <tr>
                              <td className=" py-2 px-2 book-info-sm text-gray-900 ">
                                {t("info_panel.A_risk_score")}
                              </td>
                              <td className=" px-2 py-2 book-info-sm text-gray-900">
                                {t("info_panel.trees")}
                              </td>
                              <td className=" px-2 py-2 book-info-sm text-gray-900 float-right">
                                {parseFloat(
                                  props.currentGrid.A_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td className=" py-2 px-2 book-info-sm text-gray-900 ">
                                {t("info_panel.B_risk_score")}
                              </td>
                              <td className=" px-2 py-2 book-info-sm text-gray-900]">
                                {t("info_panel.health")}
                              </td>
                              <td className=" px-2 py-2 book-info-sm text-gray-900 float-right">
                                {parseFloat(
                                  props.currentGrid.B_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td className=" py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.C_risk_score")}
                              </td>
                              <td className="px-2 py-2 book-info-sm text-gray-900">
                                {t("info_panel.health")}
                              </td>
                              <td className=" px-2 py-2 book-info-sm text-gray-900 float-right">
                                {parseFloat(
                                  props.currentGrid.C_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td className=" py-2 px-2 book-info-sm text-gray-900 ">
                                {t("info_panel.D_risk_score")}
                              </td>
                              <td className="px-2 py-2 book-info-sm text-gray-900">
                                {t("info_panel.transport")}
                              </td>
                              <td className=" px-2 py-2 book-info-sm text-gray-900 float-right">
                                {parseFloat(
                                  props.currentGrid.D_risk_score,
                                ).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900 ">
                                {t("info_panel.D_risk_score")}
                              </td>
                              <td className=" px-2 py-2 book-info-sm text-gray-900">
                                {t("info_panel.built")}
                              </td>
                              <td className=" px-2 py-2 book-info-sm text-gray-900 float-right">
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
                        attribute: t("info_panel.spider_summary_heat"),
                        val: props.currentGrid.B_risk_score,
                      },
                      {
                        attribute: t("info_panel.spider_summary_drought"),
                        val: props.currentGrid.A_risk_score,
                      },
                      {
                        attribute: t(
                          "info_panel.spider_summary_flood_transport",
                        ),
                        val: props.currentGrid.D_risk_score,
                      },
                      {
                        attribute: t("info_panel.spider_summary_flood_built"),
                        val: props.currentGrid.E_risk_score,
                      },
                      {
                        attribute: t("info_panel.spider_summary_air"),
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
                    <span className="book-info-md">
                      {t("info_panel.chain")}
                    </span>
                  </div>
                  <div className="">
                    <div className="flex items-baseline">
                      <span className="pr-2 book-info-sm ">
                        {t("info_panel.critical_filter_0")}
                      </span>
                      <Switch
                        checked={props.onlyCritical}
                        onChange={props.setOnlyCritical}
                        className={classNames(
                          props.onlyCritical ? "bg-green-600" : "bg-gray-200",
                          "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
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
                      <span className="px-2 book-info-sm">
                        {t("info_panel.critical_filter_1")}
                      </span>
                      <InfoSlideOver label="filter" />
                      <FilterGroup />
                    </div>
                  </div>
                </div>
                {i18n.language === "de" ? (
                  <img src={heatCard} className="w-[80%] pb-4" />
                ) : (
                  <img src={droughtEn} className="w-[80%] pb-4" />
                )}
                <hr className="-mx-4 border-4 border-green-600" />
                <div className="flex py-4">
                  <div className=" grow-0">
                    <span className="book-info-sm">
                      {t("info_panel.legend")}
                    </span>
                    <InfoSlideOver label="topLegendTrocken" />
                    <p className="book-info-md pt-1">
                      {t("info_panel.risk_score")}
                    </p>
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-[#F0F921] via-[#D8576C] to-[#0D0887]"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm ">
                          {t("info_panel.overall_legend_top")}
                        </div>
                        <div className="book-info-sm">
                          {t("info_panel.overall_legend_bottom")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grow-0">
                    <div className="px-2 ">
                      <div className="h-48 overflow-y-scroll">
                        <div className="inline-block align-middle border-green-600 border-l border-r border-b rounded-t-[10px] ">
                          <table className=" divide-y divide-green-600 ">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-2 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                                >
                                  {t("info_panel.indicator")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  {t("info_panel.value")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  {t("info_panel.class")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  {t("info_panel.weight")}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-green-600">
                              <tr>
                                <td className=" py-2 px-2 book-info-sm text-gray-900 ">
                                  {t("info_panel.number_muni_trees")}
                                  <DataInfoPopover
                                    description={t("info_panel.muni_describe")}
                                  />
                                </td>
                                <td className=" px-2 py-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.tree_municipal}
                                </td>
                                <td className=" px-2 py-2 book-info-sm text-gray-900">
                                  {t("info_panel.asset")}
                                </td>
                                <td className=" px-2 py-2 book-info-sm text-dark-wood-700 ">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                  {t("info_panel.number_state_trees")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.state_trees_describe",
                                    )}
                                  />
                                </td>
                                <td className="medium-intro-sm px-2 py-2 text-green-600">
                                  {props.currentGrid.tree_state}
                                </td>
                                <td className=" px-2 py-2 book-info-sm text-gray-900">
                                  {t("info_panel.asset")}
                                </td>
                                <td className=" px-2 py-2 book-info-sm text-dark-wood-700 ">
                                  1
                                </td>
                              </tr>

                              <tr>
                                <td className=" py-2 px-2 book-info-sm text-gray-900 ">
                                  {t("info_panel.soil_quality")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.soil_quality_describe",
                                    )}
                                  />
                                </td>
                                <td className=" px-2 py-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.soil_quality,
                                  ).toFixed(2)}
                                </td>
                                <td className=" px-2 py-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className=" px-2 py-2 book-info-sm text-dark-wood-700 ">
                                  3
                                </td>
                              </tr>

                              <tr>
                                <td className=" py-2 px-2 book-info-sm text-gray-900 ">
                                  {t("info_panel.dem")}
                                  <DataInfoPopover
                                    description={t("info_panel.dem_describe")}
                                  />
                                </td>
                                <td className=" px-2 py-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.average_dem,
                                  ).toFixed(2)}
                                </td>
                                <td className=" px-2 py-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className=" px-2 py-2 book-info-sm text-dark-wood-700 ">
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
                <hr className="-mx-4 border-4 border-green-600" />
                <div className="grid grid-cols-2 overflow-y-scroll h-[24vh]">
                  <div className="">
                    <InfoSlideOver label="bottomTable" />
                    <div className="">
                      <div className="inline-block align-middle rounded-t-[10px] border-green-600 border-l border-r border-b">
                        <table className=" divide-y divide-green-600  ">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-2 px-2 text-left medium-info-sm uppercase text-white bg-green-600 rounded-tl-[10px]"
                              >
                                {t("info_panel.region_selected")}
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-2 text-left medium-info-sm uppercase text-white bg-green-600 rounded-tr-[10px]"
                              >
                                {t("info_panel.value")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-green-600 bg-white">
                            <tr>
                              <td className=" py-2 px-2 book-info-sm text-gray-900 ">
                                {t("info_panel.exposure")}
                              </td>
                              <td className=" px-2 py-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.A_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className=" py-4 px-2 book-info-sm text-gray-900 ">
                                {t("info_panel.vulnerability")}
                              </td>
                              <td className=" px-2 py-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.A_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className=" py-2 px-2 book-info-sm text-gray-900 ">
                                {t("info_panel.risk_level")}
                              </td>
                              <td className=" px-2 py-2 book-info-sm text-green-600 text-right">
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
                        attribute: t("info_panel.coping"),
                        val: props.currentGrid.A_COPING,
                      },
                      {
                        attribute: t("info_panel.exposure"),
                        val: props.currentGrid.A_EXPOSURE,
                      },
                      {
                        attribute: t("info_panel.vulnerability"),
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
                    <span className="book-info-md">
                      {t("info_panel.chain")}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline">
                      <span className="pr-2 book-info-sm ">
                        {t("info_panel.critical_filter_0")}
                      </span>
                      <Switch
                        checked={props.onlyCritical}
                        onChange={props.setOnlyCritical}
                        className={classNames(
                          props.onlyCritical ? "bg-green-600" : "bg-gray-200",
                          "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
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
                      <span className="px-2 book-info-sm">
                        {t("info_panel.critical_filter_1")}
                      </span>
                      <InfoSlideOver label="filter" />
                      <FilterGroup />
                    </div>
                  </div>
                </div>
                {i18n.language === "de" ? (
                  <img src={hitzeCard} className="w-[80%] pb-4" />
                ) : (
                  <img src={heatEn} className="w-[80%] pb-4" />
                )}

                <hr className="-mx-4 border-4 border-green-600" />
                <div className="flex py-4">
                  <div className="">
                    <span className="book-info-sm">
                      {t("info_panel.legend")}
                    </span>
                    <InfoSlideOver label="topLegendHitze" />
                    <p className="book-info-md pt-1">
                      {t("info_panel.risk_score")}
                    </p>
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-[#67000D] via-[#F85D42] to-[#FFF5F0]"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm ">
                          {t("info_panel.overall_legend_top")}
                        </div>
                        <div className="book-info-sm">
                          {t("info_panel.overall_legend_bottom")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-2 flow-root">
                      <div className="h-48 overflow-y-scroll ">
                        <div className="inline-block align-middle rounded-t-[10px] border-green-600 border-l border-r border-b ">
                          <table className="divide-y divide-green-600">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-2 px-2 text-left medium-info-sm uppercase bg-green-500 rounded-tl-[10px] text-white"
                                >
                                  {t("info_panel.indicator")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  {t("info_panel.value")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  {t("info_panel.class")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  {t("info_panel.weight")}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-green-600 bg-white">
                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900 ">
                                  {t("info_panel.land_temp")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.land_temp_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {(
                                    parseFloat(
                                      props.currentGrid.ls_temperature * 0.02,
                                    ) - 273.15
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.risk")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  2
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.population")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.population_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.population_est}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.exposure")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  6
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.over_64")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.over_64_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.elderly}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  70
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.under_10")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.under_10_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.young_pop}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  15
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.pov_index")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.pov_index_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.poverty_index,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  55
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.impervious_percent")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.impervious_percent_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.impervious / 625,
                                  ).toFixed(2)}
                                  %
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  35
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.schools")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.schools_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.school_kindergarden,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  30
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.greenspaces")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.greenspaces_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.greenspace,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.coping")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  9
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.total_trees")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.total_trees_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.total_tree}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.coping")}
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
                <hr className="-mx-4 border-4 border-green-600" />
                <div className="grid grid-cols-2 overflow-y-scroll h-[27vh]">
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
                                {t("info_panel.region_selected")}
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 rounded-tr-[10px] text-white"
                              >
                                {t("info_panel.value")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-green-600 bg-white">
                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.risk")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.B_HAZARD).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.exposure")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.B_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.coping")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.B_COPING).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                {t("info_panel.vulnerability")}
                              </td>
                              <td className="py-4 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.B_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-4 px-2 book-info-sm text-gray-900">
                                {t("info_panel.risk_level")}
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
                        attribute: t("info_panel.risk"),
                        val: props.currentGrid.B_HAZARD,
                      },
                      {
                        attribute: t("info_panel.coping"),
                        val: props.currentGrid.B_COPING,
                      },
                      {
                        attribute: t("info_panel.exposure"),
                        val: props.currentGrid.B_EXPOSURE,
                      },
                      {
                        attribute: t("info_panel.vulnerability"),
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
                    <span className="book-info-md">
                      {t("info_panel.chain")}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline">
                      <span className="pr-2 book-info-sm ">
                        {t("info_panel.critical_filter_0")}
                      </span>
                      <Switch
                        checked={props.onlyCritical}
                        onChange={props.setOnlyCritical}
                        className={classNames(
                          props.onlyCritical ? "bg-green-600" : "bg-gray-200",
                          "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
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
                      <span className="px-2 book-info-sm">
                        {t("info_panel.critical_filter_1")}
                      </span>
                      <InfoSlideOver label="filter" />
                      <FilterGroup />
                    </div>
                  </div>
                </div>
                {i18n.language === "de" ? (
                  <img src={luftCard} className="w-[80%] pb-4" />
                ) : (
                  <img src={airEn} className="w-[80%] pb-4" />
                )}
                <hr className="-mx-4 border-4 border-green-600" />
                <div className="flex py-4">
                  <div className="">
                    <span className="book-info-sm">
                      {t("info_panel.legend")}
                    </span>
                    <InfoSlideOver label="topLegendLuft" />
                    <p className="book-info-md pt-1">
                      {t("info_panel.risk_score")}
                    </p>
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-[#7A0177] via-[#F879A6] to-[#FFF5F0]"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm ">
                          {t("info_panel.overall_legend_top")}
                        </div>
                        <div className="book-info-sm">
                          {t("info_panel.overall_legend_bottom")}
                        </div>
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
                                  {t("info_panel.indicator")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  {t("info_panel.value")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  {t("info_panel.class")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  {t("info_panel.weight")}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-green-600 bg-white">
                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.pm10")}
                                  <DataInfoPopover
                                    description={t("info_panel.pm10_describe")}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.pm10_mean,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.risk")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  6
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.no2")}
                                  <DataInfoPopover
                                    description={t("info_panel.no2_describe")}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.no2_mean,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.risk")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  6
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.population")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.population_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.population_est,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.exposure")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  4
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.over_64")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.over_64_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.elderly}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  2
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.under_10")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.under_10_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.young_pop}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  18
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.pov_index")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.pov_index_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.poverty_index,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  12
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.schools")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.schools_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.school_kindergarden,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  12
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.total_trees")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.total_trees_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.total_tree}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.coping")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  10
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.greenspaces")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.greenspaces_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.greenspace,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.coping")}
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
                <hr className="-mx-4 border-4 border-green-600" />
                <div className="grid grid-cols-2 overflow-y-scroll h-[24vh]">
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
                                {t("info_panel.region_selected")}
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500  rounded-tr-[10px] text-white"
                              >
                                {t("info_panel.value")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-green-600 bg-white">
                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.risk")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {props.currentGrid.C_HAZARD}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.exposure")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {props.currentGrid.C_EXPOSURE}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.coping")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {props.currentGrid.C_COPING}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.vulnerability")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {props.currentGrid.C_SENSITIVITY}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.risk_level")}
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
                        attribute: t("info_panel.risk"),
                        val: props.currentGrid.C_HAZARD,
                      },
                      {
                        attribute: t("info_panel.coping"),
                        val: props.currentGrid.C_COPING,
                      },
                      {
                        attribute: t("info_panel.exposure"),
                        val: props.currentGrid.C_EXPOSURE,
                      },
                      {
                        attribute: t("info_panel.vulnerability"),
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
                    <span className="book-info-md">
                      {t("info_panel.chain")}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline">
                      <span className="pr-2 book-info-sm ">
                        {t("info_panel.critical_filter_0")}
                      </span>
                      <Switch
                        checked={props.onlyCritical}
                        onChange={props.setOnlyCritical}
                        className={classNames(
                          props.onlyCritical ? "bg-green-600" : "bg-gray-200",
                          "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
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
                      <span className="px-2 book-info-sm">
                        {t("info_panel.critical_filter_1")}
                      </span>
                      <InfoSlideOver label="filter" />
                      <FilterGroup />
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
                    {t("info_panel.built")} |
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
                    {t("info_panel.transport_network")}
                  </span>
                </div>
                {i18n.language === "de" ? (
                  <img src={uberCard} className="w-[80%] pb-4" />
                ) : (
                  <img src={floodBiEn} className="w-[80%] pb-4" />
                )}
                <hr className="-mx-4 border-4 border-green-600" />
                <div className="flex py-4">
                  <div className="pt-2 ">
                    <span className="book-info-sm">
                      {t("info_panel.legend")}
                    </span>
                    <InfoSlideOver label="topLegendUber1" />
                    <p className="book-info-md pt-1">
                      {t("info_panel.risk_score")}
                    </p>
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-[#045A8D] via-[#6DA3D3] to-[#F1EEF6]"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm ">
                          {t("info_panel.overall_legend_top")}
                        </div>
                        <div className="book-info-sm">
                          {t("info_panel.overall_legend_bottom")}
                        </div>
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
                                  {t("info_panel.indicator")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  {t("info_panel.value")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  {t("info_panel.class")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  {t("info_panel.weight")}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-green-600 bg-white">
                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.surface_flood")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.surface_flood_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.flood_area,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.risk")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  3
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.industry")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.industry_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.industrial_commecrcial,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900"></td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  4
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.critical_infra")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.critical_infra_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.critical_infrastructure,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.exposure")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  24
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.population")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.population_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.population_est}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.exposure")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  10
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.pov_index")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.pov_index_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.poverty_index,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  6
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.impervious_percent")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.impervious_percent_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.impervious / 625,
                                  ).toFixed(2)}
                                  %
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  26
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.slope")}
                                  <DataInfoPopover
                                    description={t("info_panel.slope_describe")}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.slope_mean,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  16
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.greenspaces")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.greenspaces_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.greenspace,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.coping")}
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
                <hr className="-mx-4 border-4 border-green-600" />
                <div className="grid grid-cols-2 overflow-y-scroll h-[27vh]">
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
                                {t("info_panel.region_selected")}
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 rounded-tr-[10px] text-white"
                              >
                                {t("info_panel.value")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-green-600 bg-white">
                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.risk")}
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
                                {t("info_panel.coping")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.D_COPING).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.vulnerability")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.D_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.risk_level")}
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
                        attribute: t("info_panel.risk"),
                        val: props.currentGrid.D_HAZARD,
                      },
                      {
                        attribute: t("info_panel.coping"),
                        val: props.currentGrid.D_COPING,
                      },
                      {
                        attribute: t("info_panel.exposure"),
                        val: props.currentGrid.D_EXPOSURE,
                      },
                      {
                        attribute: t("info_panel.vulnerability"),
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
                    <span className="book-info-md">
                      {t("info_panel.chain")}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline">
                      <span className="pr-2 book-info-sm ">
                        {t("info_panel.critical_filter_0")}
                      </span>
                      <Switch
                        checked={props.onlyCritical}
                        onChange={props.setOnlyCritical}
                        className={classNames(
                          props.onlyCritical ? "bg-green-600" : "bg-gray-200",
                          "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
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
                      <span className="px-2 book-info-sm">
                        {t("info_panel.critical_filter_1")}
                      </span>
                      <InfoSlideOver label="filter" />
                      <FilterGroup />
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
                    {t("info_panel.built")} |
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
                    {t("info_panel.transport_network")}
                  </span>
                </div>
                {i18n.language === "de" ? (
                  <img src={uberBuiltCard} className="w-[80%] pb-4" />
                ) : (
                  <img src={floodTnEn} className="w-[80%] pb-4" />
                )}
                <hr className="-mx-4 border-4 border-green-600" />
                <div className="flex py-4">
                  <div className="">
                    <span className="book-info-sm">
                      {t("info_panel.legend")}
                    </span>
                    <InfoSlideOver label="topLegendUber2" />
                    <p className="book-info-md pt-1">
                      {t("info_panel.risk_score")}
                    </p>
                    <div className="flex">
                      <div className="ml-4 mt-4 rounded-[10px] w-12 h-36 py-10 px-4 bg-gradient-to-b from-[#045A8D] via-[#6DA3D3] to-[#F1EEF6]"></div>
                      <div className="flex flex-col mt-4 ml-2 mr-4 justify-between">
                        <div className="book-info-sm ">
                          {t("info_panel.overall_legend_top")}
                        </div>
                        <div className="book-info-sm">
                          {t("info_panel.overall_legend_bottom")}
                        </div>
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
                                  {t("info_panel.indicator")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  {t("info_panel.value")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 text-white"
                                >
                                  {t("info_panel.class")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-2 py-2 text-left medium-info-sm uppercase bg-dark-wood-700 text-white rounded-tr-[10px]"
                                >
                                  {t("info_panel.weight")}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-green-600 bg-white">
                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.surface_flood")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.surface_flood_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.flood_area,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.risk")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  5
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.flood_road")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.flood_road_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.Roads_risk_flooding,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.risk")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  10
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.train_network")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.train_network_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.tram_train,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.exposure")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  15
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.street_network")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.street_network_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(props.currentGrid.street).toFixed(
                                    2,
                                  )}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.exposure")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  15
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.pedestrian_network")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.pedestrian_network_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.pedestrian,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.exposure")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  9
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.bike_network")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.bike_network_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(props.currentGrid.bike).toFixed(
                                    2,
                                  )}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.exposure")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  6
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.population")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.population_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {props.currentGrid.population_est}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  18
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.pov_index")}
                                  <DataInfoPopover
                                    description={t(
                                      "info_panel.pov_index_describe",
                                    )}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.poverty_index,
                                  ).toFixed(2)}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
                                </td>
                                <td className="py-2 px-2 book-info-sm text-dark-wood-700 text-right">
                                  14
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.slope")}
                                  <DataInfoPopover
                                    description={t("info_panel.slope_describe")}
                                  />
                                </td>
                                <td className="py-2 px-2 medium-intro-sm text-green-600">
                                  {parseFloat(
                                    props.currentGrid.slope_mean,
                                  ).toFixed(2)}{" "}
                                  degrees
                                </td>
                                <td className="py-2 px-2 book-info-sm text-gray-900">
                                  {t("info_panel.vulnerability")}
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
                <hr className="-mx-4 border-4 border-green-600" />
                <div className="grid grid-cols-2  overflow-y-scroll h-[27vh]">
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
                                {t("info_panel.region_selected")}
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-2 text-left medium-info-sm uppercase bg-green-500 rounded-tr-[10px] text-white"
                              >
                                {t("info_panel.value")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-green-600 bg-white">
                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.risk")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.E_HAZARD).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.exposure")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.E_EXPOSURE,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.coping")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(props.currentGrid.E_COPING).toFixed(
                                  0,
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.vulnerability")}
                              </td>
                              <td className="py-2 px-2 book-info-sm text-green-600 text-right">
                                {parseFloat(
                                  props.currentGrid.E_SENSITIVITY,
                                ).toFixed(0)}
                              </td>
                            </tr>

                            <tr>
                              <td className="py-2 px-2 book-info-sm text-gray-900">
                                {t("info_panel.risk_level")}
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
                        attribute: t("info_panel.risk"),
                        val: props.currentGrid.E_HAZARD,
                      },
                      {
                        attribute: t("info_panel.coping"),
                        val: props.currentGrid.E_COPING,
                      },
                      {
                        attribute: t("info_panel.exposure"),
                        val: props.currentGrid.E_EXPOSURE,
                      },
                      {
                        attribute: t("info_panel.vulnerability"),
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
