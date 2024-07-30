import { useState } from "react";
import PropTypes from "prop-types";
import { FilterContext } from "./FilterContext";

export const FilterProvider = ({ children }) => {
  const [populationFilter, setPopulationFilter] = useState("keiner");
  const [povertyFilter, setPovertyFilter] = useState("keiner");
  const [treeFilter, setTreeFilter] = useState("keiner");
  const [criticalFilter, setCriticalFilter] = useState("keiner");
  const [youngFilter, setYoungFilter] = useState("deaktiviert");
  const [oldFilter, setOldFilter] = useState("deaktiviert");

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
  children: PropTypes.object,
};
