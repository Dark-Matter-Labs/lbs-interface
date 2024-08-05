import { useState } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import "@watergis/mapbox-gl-export/dist/mapbox-gl-export.css";

import { FilterProvider } from "./FilterProvider";
import NavBar from "../components/NavBar";
import LBSMap from "../components/Map";
import InfoPanel from "../components/InfoPanel";
import LayerSelector from "../components/LayerSelector";

export default function Home() {
  // TODO: move needed states to app state via Context API
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [raster, setRaster] = useState(true);
  const [topo, setTopo] = useState(false);
  const [cityTrees, setCityTrees] = useState(false);
  const [muniTrees, setMuniTrees] = useState(false);
  const [greenspace, setGreenspace] = useState(false);
  const [aIndex, setAIndex] = useState(false);
  const [neighbors, setNeighbors] = useState(false);
  const [popDen, setPopDen] = useState(false);
  const [activeHazard, setActiveHazard] = useState(0);
  const [onlyCritical, setOnlyCritical] = useState(false);

  const [currentGrid, setCurrentGrid] = useState({
    id: "1",
    tree_state: 0,
    tree_municipal: 0,
    tree_uknown: 0,
    greenspace: 0,
    soil_quality: 0,
    ls_temperature: 0,
    pm10_mean: 0,
    no2_mean: 0,
    sf_flooding: 0,
    average_dem: 0,
    population_est: 0,
    elderly: 0,
    poverty_index: 0,
    impervious: 0,
    critical_infrastructure: 0,
    A_HAZARD: false,
    A_EXPOSURE: 0,
    A_SENSITIVITY: 0,
    A_COPING: false,
    A_STRESSOR: 0,
    A_risk_score: 0,
    B_HAZARD: 0,
    B_EXPOSURE: 0,
    B_SENSITIVITY: 0,
    B_COPING: 0,
    B_STRESSOR: 0,
    B_risk_score: 0,
    C_HAZARD: 0,
    C_EXPOSURE: 0,
    C_SENSITIVITY: 0,
    C_COPING: 0,
    C_STRESSOR: 0,
    C_risk_score: 0,
    D_HAZARD: 0,
    D_EXPOSURE: 0,
    D_SENSITIVITY: 0,
    D_COPING: 0,
    D_risk_score: 0,
    E_HAZARD: 0,
    E_EXPOSURE: 0,
    E_SENSITIVITY: 0,
    E_COPING: 0,
    E_risk_score: 0,
    AVERAGE_RISK: 0,
  });

  return (
    <FilterProvider>
      <div className="h-[100vh] overflow-y-clip">
        <NavBar current="home" />
        {showInfoPanel ? (
          <div className="relative">
            <div className="absolute grid grid-cols-2 justify-items-start w-full ">
              <InfoPanel
                activeHazard={activeHazard}
                setActiveHazard={setActiveHazard}
                show={showInfoPanel}
                setShowPanel={setShowInfoPanel}
                currentGrid={currentGrid}
                onlyCritical={onlyCritical}
                setOnlyCritical={setOnlyCritical}
              />
              <LayerSelector
                raster={raster}
                setRaster={setRaster}
                topo={topo}
                setTopo={setTopo}
                cityTrees={cityTrees}
                setCityTrees={setCityTrees}
                muniTrees={muniTrees}
                setMuniTrees={setMuniTrees}
                greenspace={greenspace}
                setGreenspace={setGreenspace}
                aIndex={aIndex}
                setAIndex={setAIndex}
                neighbors={neighbors}
                setNeighbors={setNeighbors}
                popDen={popDen}
                setPopDen={setPopDen}
              />
            </div>
            <LBSMap
              layer={activeHazard}
              setCurrentGrid={setCurrentGrid}
              raster={raster}
              topo={topo}
              cityTrees={cityTrees}
              muniTrees={muniTrees}
              greenspace={greenspace}
              risk={showInfoPanel}
              aIndex={aIndex}
              neighbors={neighbors}
              popDen={popDen}
              onlyCritical={onlyCritical}
            />
          </div>
        ) : (
          <div className="relative">
            <div className="absolute grid grid-cols-2 justify-items-start w-full">
              <div
                className="z-10 px-4 py-10 bg-green-600 rounded-r-full flex items-center cursor-pointer mt-10 h-20 w-52"
                onClick={() => setShowInfoPanel(true)}
              >
                <span className="text-white medium-intro-sm ">
                  Erkunde das Risiko eines Standorts
                </span>
                <button onClick={() => setShowInfoPanel(true)}>
                  <ArrowRightCircleIcon className="text-white-200 w-7 h-7 ml-2" />
                </button>
              </div>
              <LayerSelector
                raster={raster}
                setRaster={setRaster}
                topo={topo}
                setTopo={setTopo}
                cityTrees={cityTrees}
                setCityTrees={setCityTrees}
                muniTrees={muniTrees}
                setMuniTrees={setMuniTrees}
                greenspace={greenspace}
                setGreenspace={setGreenspace}
                aIndex={aIndex}
                setAIndex={setAIndex}
                neighbors={neighbors}
                setNeighbors={setNeighbors}
                popDen={popDen}
                setPopDen={setPopDen}
              />
            </div>
            <LBSMap
              layer={activeHazard}
              setCurrentGrid={setCurrentGrid}
              raster={raster}
              topo={topo}
              cityTrees={cityTrees}
              risk={showInfoPanel}
              aIndex={aIndex}
              neighbors={neighbors}
              onlyCritical={onlyCritical}
            />
          </div>
        )}
      </div>
    </FilterProvider>
  );
}
