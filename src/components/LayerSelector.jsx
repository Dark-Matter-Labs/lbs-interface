import { Fragment } from "react";
import { Transition, Switch } from "@headlessui/react";
import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function InfoPanel({
  raster,
  setRaster,
  topo,
  setTopo,
  cityTrees,
  setCityTrees,
  aIndex,
  setAIndex,
}) {
  return (
    <Transition.Root
      show={true}
      as={Fragment}
      className="mt-56 justify-self-end z-10"
    >
      <Transition.Child
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className=" mx-10 grid grid-cols-1 gap-y-8 justify-items-end">
          <div className="bg-dark-wood-800 px-2 py-4 rounded-[10px]">
            <span className="text-center book-info-sm uppercase text-dark-wood-300">
              Grundschicht
            </span>
            <hr className="border-1 border-white" />
            <div className="flex justify-center items-center my-2">
              <span className="text-green-600 book-info-sm">Grid raster</span>
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

            <div className="flex  items-center my-2">
              <span className="text-white book-info-sm">
                Basic / <br />
                <span className="text-green-600">Satellite</span>
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

          <div className="bg-dark-wood-800 px-2 py-4 rounded-[10px]">
            <span className="text-center book-info-sm uppercase text-dark-wood-300">
              Baums-
              <br />
              chichten
            </span>
            <hr className="border-1 border-white" />
            <div className="flex justify-center items-center my-2">
              <span className="text-green-600 book-info-sm">
                Städtische <br />
                Bäume
              </span>
              <button
                type="button"
                onClick={() => {
                  setCityTrees(!cityTrees);
                }}
                className={classNames(
                  cityTrees ? "bg-green-600" : "bg-dark-wood-700",
                  "bold-intro-sm inline-flex justify-center rounded-full border border-transparent  py-4 px-4 border-white ml-2",
                )}
              >
                {" "}
              </button>
            </div>
          </div>

          <div className="bg-dark-wood-800 px-2 py-4 rounded-[10px]">
            <span className="text-center book-info-sm uppercase text-dark-wood-300">
              Zusätzliche <br />
              Schichten
            </span>
            <hr className="border-1 border-white" />
            <div className="flex justify-center items-center my-2">
              <span className="text-green-600 book-info-sm">Armutsindex</span>
              <button
                type="button"
                onClick={() => {
                  setAIndex(!aIndex);
                }}
                className={classNames(
                  aIndex ? "bg-green-600" : "bg-dark-wood-700",
                  "bold-intro-sm inline-flex justify-center rounded-full border border-transparent  py-4 px-4 border-white ml-2",
                )}
              >
                {" "}
              </button>
            </div>
          </div>
        </div>
      </Transition.Child>
    </Transition.Root>
  );
}

InfoPanel.propTypes = {
  raster: PropTypes.bool,
  setRaster: PropTypes.func,
  topo: PropTypes.bool,
  setTopo: PropTypes.func,
  cityTrees: PropTypes.bool,
  setCityTrees: PropTypes.func,
  aIndex: PropTypes.bool,
  setAIndex: PropTypes.func,
};
