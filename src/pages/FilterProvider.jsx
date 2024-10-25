import { useState } from "react";
import PropTypes from "prop-types";
import { FilterContext } from "./FilterContext";

export const FilterProvider = ({ children }) => {
  const [populationFilter, setPopulationFilter] = useState({
    id: 0,
    name: "keiner",
  });
  const [povertyFilter, setPovertyFilter] = useState({ id: 0, name: "keiner" });
  const [treeFilter, setTreeFilter] = useState({ id: 0, name: "keiner" });
  const [criticalFilter, setCriticalFilter] = useState({
    id: 0,
    name: "keiner",
  });
  const [youngFilter, setYoungFilter] = useState({
    id: 0,
    name: "deaktiviert",
  });
  const [oldFilter, setOldFilter] = useState({ id: 0, name: "deaktiviert" });

  return (
    <FilterContext.Provider
      value={{
        populationFilter,
        setPopulationFilter,
        povertyFilter,
        setPovertyFilter,
        treeFilter,
        setTreeFilter,
        criticalFilter,
        setCriticalFilter,
        youngFilter,
        setYoungFilter,
        oldFilter,
        setOldFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.array,
};
