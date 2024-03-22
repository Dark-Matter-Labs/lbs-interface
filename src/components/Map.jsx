import {useState, useCallback, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {Source, Layer} from 'react-map-gl';
import PropTypes from 'prop-types';

import { dataLayer, dataLayer2 } from './map-style';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ3VyZGVuIiwiYSI6ImNrdXNjdTA3eDA5MWYybm8wZWhiMXVqdzkifQ.NVMz5cLI846KYy281riBhw';

export default function LBSMap({ layer }) {
  const [hoverInfo, setHoverInfo] = useState(null);
  const [currentLayer, setCurrentLayer] = useState(dataLayer);

  // useEffect(() => {
  //   fetch(
  //     'https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson'
  //   )
  //     .then(resp => resp.json())
  //     .then(json => setAllData(json))
  //     .catch(err => console.error('Could not load data', err)); // eslint-disable-line
  // }, []);

  useEffect(() => {
    if (layer === 'Gesamt'){
      setCurrentLayer(dataLayer)
    } else if (layer === 'Trockenheit'){
        setCurrentLayer(dataLayer2)
      }

  }, [layer]);

  const onHover = useCallback(event => {
    const {
      features,
      point: {x, y}
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, []);

  return (
        <div id='map'>
      <Map
        initialViewState={{
          latitude: 48.77,
          longitude: 9.18,
          zoom: 11
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['data']}
        onMouseMove={onHover}
      >
        <Source type="geojson" data='https://raw.githubusercontent.com/Dark-Matter-Labs/treesai_registry/main/src/data/250_test1.geojson'>
          <Layer {...currentLayer} />
        </Source>
        {hoverInfo && (
          <div className="tooltip" style={{left: hoverInfo.x, top: hoverInfo.y}}>
            <div>DEM_mean: {hoverInfo.feature.properties.DEM_mean}</div>
            <div>AVERAGE_RI: {hoverInfo.feature.properties.AVERAGE_RI}</div>
          </div>
        )}
      </Map>
    </div>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<LBSMap />);
}

LBSMap.propTypes = {
  layer: PropTypes.string,
};