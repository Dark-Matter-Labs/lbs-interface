import { createContext } from "react";

export const FilterContext = createContext({
  populationFilter: "keiner",
  povertyFilter: "keiner",
  treeFilter: "keiner",
  criticalFilter: "keiner",
  youngFilter: "deaktiviert",
  oldFilter: "deaktiviert",
});
