// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'AVERAGE_RISK',
      stops: [
        [13, '#1aaa0d'],
        [26, '#2ea797'],
        [38, '#42a4a9'],
        [52, '#55a1ba'],
        [65, '#699ecb'],
        [76, '#7c9bdd'],
        [89, '#9096ee'],
        [100, '#a294ff'],
      ]
    },
    'fill-opacity': 0.7
  }
};

export const dataLayer2 = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'A_risk_score',
      stops: [
        [14, '#0d0887'],
        [27, '#5301a4'],
        [40, '#8b09a5'],
        [52, '#b93289'],
        [64, '#db5c69'],
        [76, '#f48849'],
        [88, '#febb2b'],
        [100, '#f2f921'],
      ]
    },
    'fill-opacity': 0.7
  }
};