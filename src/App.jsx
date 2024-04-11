import { useState } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

import "./App.css";
import NavBar from "./components/NavBar";
import LBSMap from "./components/Map";
import InfoPanel from "./components/InfoPanel";

export default function App() {
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [activeHazard, setActiveHazard] = useState("Gesamt");
  const [currentGrid, setCurrentGrid] = useState({});

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
          </div>
          <LBSMap layer={activeHazard} setCurrentGrid={setCurrentGrid} />
        </div>
      ) : (
        <div className="relative">
          <div className="absolute z-20 top-1/4">
            <div className="px-4 py-10 bg-green-600 rounded-r-full">
              <button onClick={() => setShowInfoPanel(true)}>
                <ArrowRightCircleIcon className="text-white-200 w-7 h-7 ml-2" />
              </button>
            </div>
          </div>
          <LBSMap layer={activeHazard} setCurrentGrid={setCurrentGrid} />
        </div>
      )}
    </>
  );
}
