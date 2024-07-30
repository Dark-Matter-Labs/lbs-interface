import { useContext } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FilterContext } from "../pages/FilterContext";
import ComboFilter from "./ComboFilter";

export default function FilterGroup() {
  const {
    setPopulationFilter,
    setPovertyFilter,
    setTreeFilter,
    setCriticalFilter,
    setOldFilter,
    setYoungFilter,
  } = useContext(FilterContext);
  return (
    <Popover className="relative">
      <PopoverButton className="pl-4 inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span className=" book-info-sm">Demografische Filter</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl h-80">
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
            <ComboFilter
              label="Wohndichte"
              setFilterState={setPopulationFilter}
            />

            <ComboFilter
              label="Haushalte in Armut"
              setFilterState={setPovertyFilter}
            />

            <ComboFilter label="Baumbestand" setFilterState={setTreeFilter} />

            <ComboFilter
              label="Vorhandensein kritischer Infrastruktur"
              setFilterState={setCriticalFilter}
            />

            <ComboFilter
              label="Einwohner über 65 Jahre"
              binary={true}
              setFilterState={setOldFilter}
            />

            <ComboFilter
              label="Einwohner unter 10 Jahren"
              binary={true}
              setFilterState={setYoungFilter}
            />
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
