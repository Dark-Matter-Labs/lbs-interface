import { useState } from "react";
import PropTypes from "prop-types";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const rangeFilterOptions = [
  { id: 0, name: "none" },
  {
    id: 1,
    name: "low",
  },
  {
    id: 2,
    name: "high",
  },
];

export default function ComboFilter({
  label,
  selectedFilter,
  setSelectedFilter,
  setFilterState,
}) {
  const [query, setQuery] = useState("");
  const filteredRange =
    query === ""
      ? rangeFilterOptions
      : rangeFilterOptions.filter((filter) => {
          return filter.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
      <Combobox
        as="div"
        value={selectedFilter}
        onChange={(filter) => {
          setQuery("");
          setSelectedFilter(filter);
          setFilterState(filter.name);
        }}
      >
        <Label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </Label>
        <div className="relative mt-2">
          <ComboboxInput
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() => setQuery("")}
            displayValue={(filter) => filter?.name}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>

          {filteredRange.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredRange.map((filter) => (
                <ComboboxOption
                  key={filter.id}
                  value={filter}
                  className={({ focus }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      focus ? "bg-indigo-600 text-white" : "text-gray-900",
                    )
                  }
                >
                  {({ focus, selected }) => (
                    <>
                      <span
                        className={classNames(
                          "block truncate",
                          selected && "font-semibold",
                        )}
                      >
                        {filter.name}
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            focus ? "text-white" : "text-indigo-600",
                          )}
                        ></span>
                      )}
                    </>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </div>
  );
}

ComboFilter.propTypes = {
  label: PropTypes.string,
  selectedFilter: PropTypes.obj,
  setSelectedFilter: PropTypes.func,
  setFilterState: PropTypes.func,
};
