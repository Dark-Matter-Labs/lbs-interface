import { useState } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import "@watergis/mapbox-gl-export/dist/mapbox-gl-export.css";

import "./App.css";
import NavBar from "./components/NavBar";
import LBSMap from "./components/Map";
import InfoPanel from "./components/InfoPanel";
import LayerSelector from "./components/LayerSelector";

export default function App() {
  // TODO: move needed states to app state via Context API
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [raster, setRaster] = useState(true);
  const [topo, setTopo] = useState(false);
  const [cityTrees, setCityTrees] = useState(false);
  const [aIndex, setAIndex] = useState(false);
  const [neighbors, setNeighbors] = useState(false);
  const [activeHazard, setActiveHazard] = useState(0);
  const [onlyCritical, setOnlyCritical] = useState(false);
  const [populationFilter, setPopulationFilter] = useState("none");
  const [povertyFilter, setPovertyFilter] = useState("none");
  const [treeFilter, setTreeFilter] = useState("none");
  const [criticalFilter, setCriticalFilter] = useState("none");
  const [currentGrid, setCurrentGrid] = useState({});

  return (
    <>
      <NavBar />
      {showInfoPanel ? (
        <div className="relative">
          <div className="absolute grid grid-cols-2 justify-items-start w-full">
            <InfoPanel
              activeHazard={activeHazard}
              setActiveHazard={setActiveHazard}
              show={showInfoPanel}
              setShowPanel={setShowInfoPanel}
              currentGrid={currentGrid}
              onlyCritical={onlyCritical}
              setOnlyCritical={setOnlyCritical}
              setPopulationFilter={setPopulationFilter}
              setPovertyFilter={setPovertyFilter}
              setTreeFilter={setTreeFilter}
              setCriticalFilter={setCriticalFilter}
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
              neighbors={neighbors}
              setNeighbors={setNeighbors}
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
            populationFilter={populationFilter}
            povertyFilter={povertyFilter}
            treeFilter={treeFilter}
            criticalFilter={criticalFilter}
          />
        </div>
      ) : (
        <div className="relative">
          <div className="absolute  grid grid-cols-2 justify-items-start w-full">
            <div
              className="z-10 px-4 py-10 bg-green-600 rounded-r-full flex items-center cursor-pointer w-52"
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
              neighbors={neighbors}
              setNeighbors={setNeighbors}
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
            populationFilter={populationFilter}
            povertyFilter={povertyFilter}
            treeFilter={treeFilter}
            criticalFilter={criticalFilter}
          />
        </div>
      )}
    </>
  );
}
