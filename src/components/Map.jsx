import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";



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
  aIndex,
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
      center: [9.07, 48.76],
      zoom: 11,
      accessToken: MAPBOX_TOKEN,
    });

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
        data: "/data/250LBS_Stuttgart_updated.geojson",
      });

      map.current.addSource("state-trees", {
        type: "geojson",
        data: "/data/state_trees.geojson",
      });

      map.current.addSource("a-index", {
        type: "geojson",
        data: "/data/armutsindex_1.geojson",
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
      map.current.setStyle('mapbox://styles/mapbox/satellite-v9');
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
          "circle-radius": 4,
          "circle-color": "#3FAD76",
        },
        filter: ["==", "$type", "Point"],
      });
    } else if (map.current.getLayer("state-tree-layer") !== undefined) {
      map.current.removeLayer("state-tree-layer");
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
  }, [cityTrees, aIndex]);

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

  return (
    <div className="">
      <div id="" className="map">
        <div style={{ height: "100%" }} ref={mapContainer}></div>
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
};
