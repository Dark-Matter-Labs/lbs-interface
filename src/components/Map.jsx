import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {
  MapboxExportControl,
  Size,
  PageOrientation,
  Format,
  DPI,
} from "@watergis/mapbox-gl-export";

import {
  genRiskLayer,
  droughtRiskLayer,
  heatRiskLayer,
  airPollutionRiskLayer,
  floodingRiskLayer,
  floodingBuiltRiskLayer,
  baseLayer,
} from "./map-style";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function LBSMap({
  layer,
  setCurrentGrid,
  raster,
  topo,
  cityTrees,
  muniTrees,
  greenspace,
  aIndex,
  onlyCritical,
  neighbors,
  popDen,
  populationFilter,
  povertyFilter,
  treeFilter,
  criticalFilter,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [currentLayer, setCurrentLayer] = useState(genRiskLayer);

  const [hoveredDistrict, _setHoveredDistrict] = useState(null);
  const hoveredDistrictRef = useRef(hoveredDistrict);

  const setHoveredDistrict = (data) => {
    hoveredDistrictRef.current = data;
    _setHoveredDistrict(data);
  };

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [9.07, 48.78],
      zoom: 11,
      accessToken: MAPBOX_TOKEN,
      preserveDrawingBuffer: true,
    });

    const exportControl = new MapboxExportControl({
      PageSize: Size.A3,
      PageOrientation: PageOrientation.Portrait,
      Format: Format.PDF,
      DPI: DPI[96],
      Crosshair: true,
      PrintableArea: true,
      Local: "de",
      accessToken: MAPBOX_TOKEN,
    });

    map.current.addControl(exportControl, "top-right");

    // Add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.addControl(
      new MapboxGeocoder({
        accessToken: MAPBOX_TOKEN,
        mapboxgl: mapboxgl,
        language: "de-DE",
        countries: "DE",
        collapsed: true,
      }),
      "top-right",
    );

    map.current.once("load", function () {
      map.current.addSource("lbs-source", {
        type: "geojson",
        data: "/data/250LBS_Stuttgart.geojson",
      });

      map.current.addSource("state-trees", {
        type: "geojson",
        data: "/data/state_trees.geojson",
      });

      map.current.addSource("a-index", {
        type: "geojson",
        data: "/data/armutsindex_1.geojson",
      });

      map.current.addSource("neighbors", {
        type: "geojson",
        data: "/data/Stadbezirk-neighbourhood.geojson",
      });

      map.current.addSource("muni-trees-north", {
        type: "geojson",
        data: "/data/Municipal_Trees_North.geojson",
      });

      map.current.addSource("muni-trees-south", {
        type: "geojson",
        data: "/data/Municipal_Trees_South.geojson",
      });

      map.current.addSource("greenspace", {
        type: "geojson",
        data: "/data/parks_greenspace.geojson",
      });

      map.current.addSource("pop-den", {
        type: "geojson",
        data: "/data/population_density.geojson",
      });

      map.current.addLayer(currentLayer);
      map.current.addLayer(baseLayer);

      map.current.on("click", "risk-layer", function (e) {
        var allFeatures = map.current.queryRenderedFeatures({
          layers: ["risk-layer"],
        });
        var features = map.current.queryRenderedFeatures(e.point, {
          layers: ["risk-layer"],
        });

        for (var j = 0; j < allFeatures.length; j++) {
          map.current.setFeatureState(
            { source: "lbs-source", id: allFeatures[j].id },
            { click: false },
          );
        }

        for (var i = 0; i < features.length; i++) {
          map.current.setFeatureState(
            { source: "lbs-source", id: features[i].id },
            { click: true },
          );
        }
      });

      map.current.on("mousedown", "risk-layer", function (e) {
        if (e.features.length > 0) {
          setCurrentGrid(e.features[0].properties);
        }
      });

      map.current.on("mousemove", "risk-layer", function (e) {
        if (e.features.length > 0) {
          if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
            map.current.setFeatureState(
              { source: "lbs-source", id: hoveredDistrictRef.current },
              { hover: false },
            );
          }

          let _hoveredDistrict = e.features[0].id;

          map.current.setFeatureState(
            { source: "lbs-source", id: _hoveredDistrict },
            { hover: true },
          );

          setHoveredDistrict(_hoveredDistrict);
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.current.on("mouseleave", "risk-layer", function () {
        if (hoveredDistrictRef.current) {
          map.current.setFeatureState(
            { source: "lbs-source", id: hoveredDistrictRef.current },
            { hover: false },
          );
        }
        setHoveredDistrict(null);
      });
    });
  }, [topo]);

  useEffect(() => {
    if (topo) {
      map.current.setStyle("mapbox://styles/mapbox/satellite-v9");
    } else {
      map.current.setStyle("mapbox://styles/mapbox/light-v11");
    }
  }, [topo]);

  useEffect(() => {
    if (map.current.getLayer("risk-layer") !== undefined) {
      map.current.setPaintProperty(
        "risk-layer",
        "fill-color",
        currentLayer.paint["fill-color"],
      );
    }
  }, [currentLayer]);

  useEffect(() => {
    if (map.current.getLayer("raster-layer") !== undefined) {
      if (raster) {
        map.current.setPaintProperty(
          "raster-layer",
          "line-width",
          baseLayer.paint["line-width"],
        );
      } else {
        map.current.setPaintProperty("raster-layer", "line-width", [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          0,
          0,
        ]);
      }
    }
  }, [raster]);

  useEffect(() => {
    if (cityTrees) {
      map.current.addLayer({
        id: "state-tree-layer",
        type: "circle",
        source: "state-trees",
        paint: {
          "circle-radius": 7,
          "circle-color": "#3FAD76",
          "circle-opacity": 0.2,
        },
        filter: ["==", "$type", "Point"],
      });
    } else if (map.current.getLayer("state-tree-layer") !== undefined) {
      map.current.removeLayer("state-tree-layer");
    }

    if (muniTrees) {
      map.current.addLayer({
        id: "m-tree-layer-n",
        type: "circle",
        source: "muni-trees-north",
        paint: {
          "circle-radius": 7,
          "circle-color": "#3FAD76",
          "circle-opacity": 0.2,
        },
        filter: ["==", "$type", "Point"],
      });

      map.current.addLayer({
        id: "m-tree-layer-s",
        type: "circle",
        source: "muni-trees-south",
        paint: {
          "circle-radius": 7,
          "circle-color": "#3FAD76",
        },
        filter: ["==", "$type", "Point"],
      });
    } else if (
      map.current.getLayer("m-tree-layer-n") !== undefined &&
      map.current.getLayer("m-tree-layer-s") !== undefined
    ) {
      map.current.removeLayer("m-tree-layer-n");
      map.current.removeLayer("m-tree-layer-s");
    }

    if (greenspace) {
      map.current.addLayer({
        id: "greenspace-layer",
        type: "fill",
        source: "greenspace",
        paint: {
          "fill-color": "#b2df8a",
        },
      });
    } else if (map.current.getLayer("greenspace-layer") !== undefined) {
      map.current.removeLayer("greenspace-layer");
    }

    if (aIndex) {
      map.current.addLayer({
        id: "a-index-layer",
        type: "fill",
        source: "a-index",
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["number", ["get", "Armutsindex 2020"]],
            -2,
            "#2DC4B2",
            -1.5,
            "#3BB3C3",
            -1,
            "#669EC4",
            0,
            "#A2719B",
            1,
            "#AA5E79",
            999,
            "transparent",
          ],
          "fill-opacity": 0.7,
        },
        filter: ["==", "$type", "Polygon"],
      });
    } else if (map.current.getLayer("a-index-layer") !== undefined) {
      map.current.removeLayer("a-index-layer");
    }

    if (popDen) {
      map.current.addLayer({
        id: "pop-den-layer",
        type: "fill",
        source: "pop-den",
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["number", ["get", "_Populatio"]],
            14,
            "#edf8fb",
            127,
            "#d4e5f1",
            3485,
            "#bad2e6",
            5084,
            "#a6bbda",
            6692,
            "#95a2cd",
            8030,
            "#8b88bf",
            9920,
            "#896bb2",
            12886,
            "#874ea2",
            17147,
            "#842e8f",
            34605,
            "#810f7b",
          ],
          "fill-opacity": 0.7,
        },
        filter: ["==", "$type", "Polygon"],
      });
    } else if (map.current.getLayer("pop-den-layer") !== undefined) {
      map.current.removeLayer("pop-den-layer");
    }

    if (neighbors) {
      map.current.addLayer({
        id: "neighbor-boundary",
        type: "line",
        source: "neighbors",
        paint: {
          "fill-color": "#888888",
          "fill-opacity": 1,
        },
        filter: ["==", "$type", "Polygon"],
      });
    } else if (map.current.getLayer("neighbor-boundary") !== undefined) {
      map.current.removeLayer("neighbor-boundary");
    }
  }, [cityTrees, aIndex, neighbors, muniTrees, greenspace, popDen]);

  useEffect(() => {
    if (layer === 0) {
      setCurrentLayer(genRiskLayer);
    } else if (layer === 1) {
      setCurrentLayer(droughtRiskLayer);
    } else if (layer === 2) {
      setCurrentLayer(heatRiskLayer);
    } else if (layer === 3) {
      setCurrentLayer(airPollutionRiskLayer);
    } else if (layer === 4) {
      setCurrentLayer(floodingRiskLayer);
    } else if (layer === 5) {
      setCurrentLayer(floodingBuiltRiskLayer);
    }
  }, [layer]);

  useEffect(() => {
    if (map.current.getLayer("risk-layer") !== undefined) {
      if (layer === 0) {
        if (onlyCritical) {
          map.current.setFilter("risk-layer", [
            ">",
            ["to-number", ["get", "AVERAGE_RISK"]],
            48.8,
          ]);
        } else {
          map.current.setFilter("risk-layer", [
            ">",
            ["to-number", ["get", "AVERAGE_RISK"]],
            0,
          ]);
        }
      } else if (layer === 1) {
        if (onlyCritical) {
          map.current.setFilter("risk-layer", [
            ">",
            ["to-number", ["get", "A_risk_score"]],
            38.3,
          ]);
        } else {
          map.current.setFilter("risk-layer", [
            ">",
            ["to-number", ["get", "A_risk_score"]],
            0,
          ]);
        }
      } else if (layer === 2) {
        if (onlyCritical) {
          map.current.setFilter("risk-layer", [
            ">",
            ["to-number", ["get", "B_risk_score"]],
            55.1,
          ]);
        } else {
          map.current.setFilter("risk-layer", [
            ">",
            ["to-number", ["get", "B_risk_score"]],
            0,
          ]);
        }
      } else if (layer === 3) {
        if (onlyCritical) {
          map.current.setFilter("risk-layer", [
            ">",
            ["to-number", ["get", "C_risk_score"]],
            61.7,
          ]);
        } else {
          map.current.setFilter("risk-layer", [
            ">",
            ["to-number", ["get", "C_risk_score"]],
            0,
          ]);
        }
      } else if (layer === 4) {
        if (onlyCritical) {
          map.current.setFilter("risk-layer", [
            ">",
            ["to-number", ["get", "D_risk_score"]],
            42.3,
          ]);
        } else {
          map.current.setFilter("risk-layer", [
            ">",
            ["to-number", ["get", "D_risk_score"]],
            0,
          ]);
        }
      } else if (layer === 5) {
        if (onlyCritical) {
          map.current.setFilter("risk-layer", [
            ">",
            ["to-number", ["get", "E_risk_score"]],
            55.2,
          ]);
        } else {
          map.current.setFilter("risk-layer", [
            ">",
            ["to-number", ["get", "E_risk_score"]],
            0,
          ]);
        }
      }
    }
  }, [onlyCritical, layer]);

  useEffect(() => {
    if (map.current.getLayer("risk-layer") !== undefined) {
      if (populationFilter === "high") {
        map.current.setFilter("risk-layer", [
          ">",
          ["to-number", ["get", "population_est"]],
          205,
        ]);
      } else if (populationFilter === "low") {
        map.current.setFilter("risk-layer", [
          "<",
          ["to-number", ["get", "population_est"]],
          12,
        ]);
      } else {
        map.current.setFilter("risk-layer", [
          ">=",
          ["to-number", ["get", "population_est"]],
          0,
        ]);
      }
    }
  }, [populationFilter, layer]);

  useEffect(() => {
    if (map.current.getLayer("risk-layer") !== undefined) {
      if (povertyFilter === "high") {
        map.current.setFilter("risk-layer", [
          ">",
          ["to-number", ["get", "poverty_index"]],
          0,
        ]);
      } else if (povertyFilter === "low") {
        map.current.setFilter("risk-layer", [
          "<=",
          ["to-number", ["get", "poverty_index"]],
          0,
        ]);
      } else {
        map.current.setFilter("risk-layer", [
          ">=",
          ["to-number", ["get", "poverty_index"]],
          -2,
        ]);
      }
    }
  }, [povertyFilter, layer]);

  useEffect(() => {
    if (map.current.getLayer("risk-layer") !== undefined) {
      if (treeFilter === "high") {
        map.current.setFilter("risk-layer", [
          ">",
          ["to-number", ["get", "Total_Trees"]],
          100,
        ]);
      } else if (treeFilter === "low") {
        map.current.setFilter("risk-layer", [
          "<",
          ["to-number", ["get", "Total_Trees"]],
          20,
        ]);
      } else {
        map.current.setFilter("risk-layer", [
          ">=",
          ["to-number", ["get", "Total_Trees"]],
          0,
        ]);
      }
    }
  }, [treeFilter, layer]);

  useEffect(() => {
    if (map.current.getLayer("risk-layer") !== undefined) {
      if (criticalFilter === "high") {
        map.current.setFilter("risk-layer", [
          ">",
          ["to-number", ["get", "critical_infrastructure"]],
          0,
        ]);
      } else if (criticalFilter === "low") {
        map.current.setFilter("risk-layer", [
          "<=",
          ["to-number", ["get", "critical_infrastructure"]],
          1,
        ]);
      } else {
        map.current.setFilter("risk-layer", [
          ">=",
          ["to-number", ["get", "critical_infrastructure"]],
          0,
        ]);
      }
    }
  }, [criticalFilter, layer]);

  return (
    <div className="overflow-hidden">
      <div id="" className="map">
        <div style={{ height: "93vh" }} ref={mapContainer}></div>
      </div>
    </div>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<LBSMap />);
}

LBSMap.propTypes = {
  layer: PropTypes.number,
  setCurrentGrid: PropTypes.func,
  raster: PropTypes.bool,
  topo: PropTypes.bool,
  risk: PropTypes.bool,
  cityTrees: PropTypes.bool,
  aIndex: PropTypes.bool,
  neighbors: PropTypes.bool,
  onlyCritical: PropTypes.bool,
  currentGrid: PropTypes.object,
  populationFilter: PropTypes.string,
  povertyFilter: PropTypes.string,
  treeFilter: PropTypes.string,
  criticalFilter: PropTypes.string,
  popDen: PropTypes.bool,
  muniTrees: PropTypes.bool,
  greenspace: PropTypes.bool,
};
