import { useState } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

import "./App.css";
import NavBar from "./components/NavBar";
import LBSMap from "./components/Map";
import InfoPanel from "./components/InfoPanel";
import LayerSelector from "./components/LayerSelector";

export default function App() {
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [raster, setRaster] = useState(true);
  const [topo, setTopo] = useState(false);
  const [cityTrees, setCityTrees] = useState(false);
  const [aIndex, setAIndex] = useState(false);
  const [activeHazard, setActiveHazard] = useState(0);

  // TODO: Move this to util
  const [currentGrid, setCurrentGrid] = useState({
    id: "250mN285175E426025",
    stadtbezirk_id: 1,
    stadtbezirk: "Mitte",
    tree_state: 3,
    tree_municipal: 100,
    tree_uknown: 463,
    "greenspace_area(m2)_s": 0.294,
    soil_quality: 0.733,
    ls_temperature: 14956,
    pm10_mean: 28.4,
    no2_mean: 45.2,
    sf_flooding: 8212.16,
    average_dem: 264.3873651,
    population_est: 10,
    elderly: 1,
    poverty_index: 1.566369261,
    impervious: 53671.783,
    critical_infrastructure: 5,
    A_HAZARD: false,
    A_EXPOSURE: 55,
    A_SENSITIVITY: 14.6,
    A_COPING: false,
    A_STRESSOR: 5,
    A_risk_score: 43.6,
    B_HAZARD: 96.5,
    B_EXPOSURE: 0,
    B_SENSITIVITY: 37.5,
    B_COPING: 79.5,
    B_STRESSOR: 34.3,
    B_risk_score: 0,
    C_HAZARD: 27,
    C_EXPOSURE: 75,
    C_SENSITIVITY: 82,
    C_COPING: 38,
    C_STRESSOR: 79,
    C_risk_score: 33.6,
    D_HAZARD: 20.53,
    D_EXPOSURE: 2.6628538,
    D_SENSITIVITY: 68.25203927,
    D_COPING: 95.29524724,
    D_risk_score: 32.8,
    E_HAZARD: 91,
    E_EXPOSURE: 35,
    E_SENSITIVITY: 41,
    E_COPING: 72,
    E_risk_score: 27.5,
    AVERAGE_RISK: 25.1,
  });

  return (
    <>
      <NavBar />
      {showInfoPanel ? (
        <div className="relative">
          <div className="absolute z-20">
            <InfoPanel
              activeHazard={activeHazard}
              setActiveHazard={setActiveHazard}
              show={showInfoPanel}
              setShowPanel={setShowInfoPanel}
              currentGrid={currentGrid}
            />
            <LayerSelector
              raster={raster}
              setRaster={setRaster}
              topo={topo}
              setTopo={setTopo}
              cityTrees={cityTrees}
              setCityTrees={setCityTrees}
              aIndex={aIndex}
              setAIndex={setAIndex}
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
          />
        </div>
      ) : (
        <div className="relative">
          <div className="absolute z-20 top-1/4">
            <div
              className="px-4 py-10 bg-green-600 rounded-r-full flex items-center cursor-pointer w-52"
              onClick={() => setShowInfoPanel(true)}
            >
              <span className="text-white medium-intro-sm ">
                Eukunde das Risiko eines Standorts
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
              aIndex={aIndex}
              setAIndex={setAIndex}
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
          />
        </div>
      )}
    </>
  );
}
