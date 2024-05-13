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

export default function LBSMap({ layer, setCurrentGrid, raster, topo, risk, cityTrees, aIndex }) {
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

    if(topo){
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [8.99, 48.76],
        zoom: 11,
        accessToken: MAPBOX_TOKEN,
      });
    } else {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [8.99, 48.76],
        zoom: 11,
        accessToken: MAPBOX_TOKEN,
      });
    }
    

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
      map.current.addSource("district-source", {
        type: "geojson",
        data: "../../data/250LBS_Stuttgart_updated.geojson",
      });

      map.current.addSource("state-trees", {
        type: "geojson",
        data: "../../data/state_trees.geojson",
      });

      map.current.addSource("a-index", {
        type: "geojson",
        data: "../../data/armutsindex_1.geojson",
      });

      if(cityTrees){
        map.current.addLayer({
          'id': 'state-tree-layer',
          'type': 'circle',
          'source': 'state-trees',
          'paint': {
              'circle-radius': 4,
              'circle-color': '#3FAD76'
          },
          'filter': ['==', '$type', 'Point']
        });  
      } else {
        map.current.removeLayer('state-tree-layer')
      }

      if(aIndex){
        map.current.addLayer({
          'id': 'a-index-layer',
          type: "fill",
          'source': 'a-index',
  paint: {
    "fill-color": [
      'interpolate', ['linear'],
      ['number', ['get', 'Armutsindex_2020']],
      -2, '#2DC4B2',
      -1.5, '#3BB3C3', 
      -1,'#669EC4', 
      0, '#A2719B', 
      1, '#AA5E79'
    ],
    "fill-opacity":1,
  },
  'filter': ['==', '$type', 'Polygon']}
        );  
      } else {
        map.current.removeLayer('a-index-layer')
      }

     
      if(risk){
        map.current.addLayer(currentLayer);
      } else {
        map.current.removeLayer('district-layer');
      }

     

      if(raster){
        map.current.addLayer(baseLayer);
      } else {
        map.current.removeLayer('states-layer-outline');
      }
     

      map.current.on("click", "district-layer", function (e) {
        var allFeatures = map.queryRenderedFeatures({
          layers: ["district-layer"],
        });
        var features = map.queryRenderedFeatures(e.point, {
          layers: ["district-layer"],
        });

        for (var j = 0; j < allFeatures.length; j++) {
          map.current.setFeatureState(
            { source: "district-source", id: allFeatures[j].id },
            { click: false },
          );
        }

        for (var i = 0; i < features.length; i++) {
          map.current.setFeatureState(
            { source: "district-source", id: features[i].id },
            { click: true },
          );
        }
      });

      map.current.on("mousedown", "district-layer", function (e) {
        if (e.features.length > 0) {
          setCurrentGrid(e.features[0].properties);
        }
      });

      map.current.on("mousemove", "district-layer", function (e) {
        if (e.features.length > 0) {
          if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
            map.current.setFeatureState(
              { source: "district-source", id: hoveredDistrictRef.current },
              { hover: false },
            );
          }

          let _hoveredDistrict = e.features[0].id;

          map.current.setFeatureState(
            { source: "district-source", id: _hoveredDistrict },
            { hover: true },
          );

          setHoveredDistrict(_hoveredDistrict);
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.current.on("mouseleave", "district-layer", function () {
        if (hoveredDistrictRef.current) {
          map.setFeatureState(
            { source: "district-source", id: hoveredDistrictRef.current },
            { hover: false },
          );
        }
        setHoveredDistrict(null);
      });

      map.current.on("move", () => {});
    });
  }, [currentLayer, raster, topo, risk, cityTrees, aIndex]);



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
        <div style={{ height: "100%" }} ref={mapContainer}>
        </div>
      
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
  raster: PropTypes.bool,
  topo: PropTypes.bool,
  risk: PropTypes.bool,
  cityTrees: PropTypes.bool,
  aIndex: PropTypes.bool
};
