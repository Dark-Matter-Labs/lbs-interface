import { Fragment } from "react";
import { Transition, Switch } from "@headlessui/react";
import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LayerSelector({
  raster,
  setRaster,
  topo,
  setTopo,
  cityTrees,
  muniTrees,
  setMuniTrees,
  greenspace,
  setGreenspace,
  setCityTrees,
  aIndex,
  neighbors,
  popDen,
  setPopDen,
  setNeighbors,
}) {
  return (
    <Transition.Root
      show={true}
      as={Fragment}
      className="mt-[8.5rem] justify-self-end z-10 mr-2"
    >
      <Transition.Child
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className=" mx-10 ">
          <div className="bg-dark-wood-800 px-2 py-2 rounded-[10px] my-4">
            <span className="text-center book-info-sm uppercase text-dark-wood-300">
              HINTERGRUND
            </span>
            <hr className="border-1 border-white" />
            <div className="flex justify-between items-center my-2">
              <span className="text-green-600 book-info-sm">Raster</span>
              <button
                type="button"
                onClick={() => {
                  setRaster(!raster);
                }}
                className={classNames(
                  raster ? "bg-green-600" : "bg-dark-wood-700",
                  "bold-intro-sm inline-flex justify-center rounded-full border border-transparent  py-4 px-4 border-white ml-2",
                )}
              >
                {" "}
              </button>
            </div>

            <div className="flex justify-between my-2">
              <span className="text-white book-info-sm">
                Einfach / <br />
                <span className="text-green-600">Satellit</span>
              </span>
              <Switch
                checked={topo}
                onChange={setTopo}
                className={classNames(
                  topo ? "bg-green-600" : "bg-gray-200",
                  "justify-self-end relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-1 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    topo ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  )}
                />
              </Switch>
            </div>
          </div>

          <div className="bg-dark-wood-800 px-2 py-2 rounded-[10px] my-4 ">
            <span className="text-center book-info-sm uppercase text-dark-wood-300">
              Baum- schichten
            </span>
            <hr className="border-1 border-white" />
            <div className="flex justify-between items-center my-2">
              <span className="text-green-600 book-info-sm">
                Landes <br />
                Bäume
              </span>

              <button
                type="button"
                onClick={() => {
                  setCityTrees(!cityTrees);
                }}
                className={classNames(
                  cityTrees ? "bg-green-600" : "bg-dark-wood-700",
                  "bold-intro-sm inline-flex justify-center rounded-full border border-transparent  py-4 px-4 border-white ml-2 justify-self-end",
                )}
              >
                {" "}
              </button>
            </div>
            <div className="flex justify-between items-center my-2">
              <span className="text-green-600 book-info-sm">
                Städtische <br />
                Bäume
              </span>
              <button
                type="button"
                onClick={() => {
                  setMuniTrees(!muniTrees);
                }}
                className={classNames(
                  muniTrees ? "bg-green-600" : "bg-dark-wood-700",
                  "bold-intro-sm inline-flex justify-center rounded-full border border-transparent  py-4 px-4 border-white ml-2 justify-self-end",
                )}
              >
                {" "}
              </button>
            </div>
            <div className="flex justify-between items-center my-2">
              <span className="text-green-600 book-info-sm">Grünfläche</span>
              <button
                type="button"
                onClick={() => {
                  setGreenspace(!greenspace);
                }}
                className={classNames(
                  greenspace ? "bg-green-600" : "bg-dark-wood-700",
                  "bold-intro-sm inline-flex justify-center rounded-full border border-transparent  py-4 px-4 border-white ml-2 justify-self-end",
                )}
              >
                {" "}
              </button>
            </div>
          </div>

          <div className="bg-dark-wood-800 px-2 py-2 rounded-[10px]">
            <span className="text-center book-info-sm uppercase text-dark-wood-300">
              Zusätzliche Schichten
            </span>
            <hr className="border-1 border-white" />
            <div className="flex justify-between items-center my-2">
              <span className="text-green-600 book-info-sm">Stadbezirk</span>
              <button
                type="button"
                onClick={() => {
                  setNeighbors(!neighbors);
                }}
                className={classNames(
                  neighbors ? "bg-green-600" : "bg-dark-wood-700",
                  "bold-intro-sm inline-flex justify-center rounded-full border border-transparent  py-4 px-4 border-white ml-2",
                )}
              >
                {" "}
              </button>
            </div>
            <div className="flex justify-between items-center my-2">
              <span className="text-green-600 book-info-sm">
                Bevölkerungsdichte
              </span>
              <button
                type="button"
                onClick={() => {
                  setPopDen(!popDen);
                }}
                className={classNames(
                  popDen ? "bg-green-600" : "bg-dark-wood-700",
                  "bold-intro-sm inline-flex justify-center rounded-full border border-transparent  py-4 px-4 border-white ml-2",
                )}
              >
                {" "}
              </button>
            </div>
          </div>
          {aIndex && (
            <div className="bg-white border-2 border-dark-wood-300 px-2 py-4 rounded-[10px] mt-2">
              <p className="medium-info-sm text-dark-wood-800">
                Geringes - Risiko - Hohes
              </p>
              <div className="ml-4 mt-4 rounded-[10px] w-28 h-4 py-2 px-10 bg-gradient-to-r from-[#2DC4B2] via-[#669EC4] to-[#AA5E79]"></div>
            </div>
          )}

          {popDen && (
            <div className="bg-white border-2 border-dark-wood-300 px-2 py-4 rounded-[10px] mt-2">
              <p className="medium-info-sm text-dark-wood-800">
                Geringes - Risiko - Hohes
              </p>
              <div className="ml-4 mt-4 rounded-[10px] w-28 h-4 py-2 px-10 bg-gradient-to-r from-[#EDF8FB] via-[#95A2CD] to-[#810f7b]"></div>
            </div>
          )}
        </div>
      </Transition.Child>
    </Transition.Root>
  );
}

LayerSelector.propTypes = {
  raster: PropTypes.bool,
  setRaster: PropTypes.func,
  topo: PropTypes.bool,
  setTopo: PropTypes.func,
  cityTrees: PropTypes.bool,
  muniTrees: PropTypes.bool,
  setMuniTrees: PropTypes.func,
  greenspace: PropTypes.bool,
  setGreenspace: PropTypes.func,
  setCityTrees: PropTypes.func,
  aIndex: PropTypes.bool,
  setAIndex: PropTypes.func,
  neighbors: PropTypes.bool,
  setNeighbors: PropTypes.func,
  popDen: PropTypes.bool,
  setPopDen: PropTypes.func,
};
