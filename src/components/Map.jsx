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

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZ3VyZGVuIiwiYSI6ImNrdXNjdTA3eDA5MWYybm8wZWhiMXVqdzkifQ.NVMz5cLI846KYy281riBhw";

export default function LBSMap({ layer, setCurrentGrid }) {
  const mapContainer = useRef(null);
  const [currentLayer, setCurrentLayer] = useState(genRiskLayer);

  const [hoveredDistrict, _setHoveredDistrict] = useState(null);
  const hoveredDistrictRef = useRef(hoveredDistrict);

  const setHoveredDistrict = (data) => {
    hoveredDistrictRef.current = data;
    _setHoveredDistrict(data);
  };

  useEffect(() => {
    let map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [8.99, 48.76],
      zoom: 11,
      accessToken: MAPBOX_TOKEN,
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(
      new MapboxGeocoder({
        accessToken: MAPBOX_TOKEN,
        mapboxgl: mapboxgl,
        language: "de-DE",
        countries: "DE",
        collapsed: true,
      }),
      "top-right",
    );

    map.once("load", function () {
      map.addSource("district-source", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/Dark-Matter-Labs/treesai_registry/main/src/data/250LBS_Stuttgart_updated.geojson",
      });

      map.addLayer(currentLayer);

      map.addLayer(baseLayer);

      map.on("click", "district-layer", function (e) {
        var allFeatures = map.queryRenderedFeatures({
          layers: ["district-layer"],
        });
        var features = map.queryRenderedFeatures(e.point, {
          layers: ["district-layer"],
        });

        for (var j = 0; j < allFeatures.length; j++) {
          map.setFeatureState(
            { source: "district-source", id: allFeatures[j].id },
            { click: false },
          );
        }

        for (var i = 0; i < features.length; i++) {
          map.setFeatureState(
            { source: "district-source", id: features[i].id },
            { click: true },
          );
        }
      });

      map.on("mousedown", "district-layer", function (e) {
        if (e.features.length > 0) {
          setCurrentGrid(e.features[0].properties);
        }
      });

      map.on("mousemove", "district-layer", function (e) {
        if (e.features.length > 0) {
          if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
            map.setFeatureState(
              { source: "district-source", id: hoveredDistrictRef.current },
              { hover: false },
            );
          }

          let _hoveredDistrict = e.features[0].id;

          map.setFeatureState(
            { source: "district-source", id: _hoveredDistrict },
            { hover: true },
          );

          setHoveredDistrict(_hoveredDistrict);
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.on("mouseleave", "district-layer", function () {
        if (hoveredDistrictRef.current) {
          map.setFeatureState(
            { source: "district-source", id: hoveredDistrictRef.current },
            { hover: false },
          );
        }
        setHoveredDistrict(null);
      });

      map.on("move", () => {});
    });
  }, [currentLayer]);

  useEffect(() => {
    if (layer === "Gesamt") {
      setCurrentLayer(genRiskLayer);
    } else if (layer === "Trockenheit") {
      setCurrentLayer(droughtRiskLayer);
    } else if (layer === "Hitze") {
      setCurrentLayer(heatRiskLayer);
    } else if (layer === "Luftverschmutzung") {
      setCurrentLayer(airPollutionRiskLayer);
    } else if (layer === "Überschwemmung") {
      setCurrentLayer(floodingRiskLayer);
    } else if (layer === "Überschwemmung2") {
      setCurrentLayer(floodingBuiltRiskLayer);
    }
  }, [layer]);

  return (
    <div className="district-map-wrapper">
      <div id="districtDetailMap" className="map">
        <div style={{ height: "100%" }} ref={mapContainer}></div>
      </div>
    </div>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<LBSMap />);
}

LBSMap.propTypes = {
  layer: PropTypes.string,
  setCurrentGrid: PropTypes.func,
};
