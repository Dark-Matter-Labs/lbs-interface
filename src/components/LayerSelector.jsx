import { Fragment } from "react";
import { Transition } from "@headlessui/react";
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
      className=" mt-56  justify-self-end "
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
          <button
            type="button"
            onClick={() => {
              setRaster(!raster);
            }}
            className={classNames(
              raster ? "bg-dark-wood-800" : "bg-dark-wood-400",
              "bold-intro-sm inline-flex justify-center rounded-full border border-transparent  py-2 px-2 lg:px-8 text-white-200 shadow-sm mr-2",
            )}
          >
            Raster
          </button>
          <button
            type="button"
            onClick={() => {
              setTopo(!topo);
            }}
            className={classNames(
              topo ? "bg-dark-wood-800" : "bg-dark-wood-400",
              "bold-intro-sm inline-flex justify-center rounded-full border border-transparent  py-2 px-2 lg:px-8 text-white-200 shadow-sm mr-2",
            )}
          >
            Topo
          </button>
          <button
            type="button"
            onClick={() => {
              setCityTrees(!cityTrees);
            }}
            className={classNames(
              cityTrees ? "bg-dark-wood-800" : "bg-dark-wood-400",
              "bold-intro-sm inline-flex justify-center rounded-full border border-transparent  py-2 px-2 lg:px-8 text-white-200 shadow-sm mr-2",
            )}
          >
            Städtische Bäume
          </button>
          <button
            type="button"
            onClick={() => {
              setAIndex(!aIndex);
            }}
            className={classNames(
              aIndex ? "bg-dark-wood-800" : "bg-dark-wood-400",
              "bold-intro-sm inline-flex justify-center rounded-full border border-transparent  py-2 px-2 lg:px-8 text-white-200 shadow-sm mr-2",
            )}
          >
            Armutsindex
          </button>
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
