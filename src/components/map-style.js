// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/

export const baseLayer = {
  id: "raster-layer",
  type: "line",
  source: "lbs-source",
  layout: {},
  paint: {
    "line-width": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      2,
      0.2,
    ],
    "line-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#FFFFFF",
      "#00f900",
    ],
  },
};

export const genRiskLayer = {
  id: "risk-layer",
  type: "fill",
  source: "lbs-source",
  paint: {
    "fill-color": {
      property: "AVERAGE_RISK",
      stops: [
        [16, "#1baa86"],
        [23.4, "#2aa893"],
        [30.7, "#39a5a1"],
        [38.1, "#48a4ae"],
        [45.4, "#699ecb"],
        [52.7, "#679fc9"],
        [60.1, "#769bd7"],
        [67.4, "#8599e4"],
        [74.8, "#9496f2"],
        [82.1, "#a294ff"],
      ],
    },
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "click"], false],
      0.8,
      0.6,
    ],
    "fill-outline-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#FFFFFF",
      "transparent",
    ],
  },
};

export const droughtRiskLayer = {
  id: "risk-layer",
  type: "fill",
  source: "lbs-source",
  paint: {
    "fill-color": {
      property: "A_risk_score",
      stops: [
        [15.9, "#0d0887"],
        [20.1, "#5302a4"],
        [22.8, "#8b0aa5"],
        [25.6, "#b9328a"],
        [28.6, "#db5c69"],
        [31.8, "#f48849"],
        [36.5, "#febb2b"],
        [100, "#f2f921"],
      ],
    },
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "click"], false],
      0.8,
      0.6,
    ],
    "fill-outline-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#FFFFFF",
      "transparent",
    ],
  },
};

export const heatRiskLayer = {
  id: "risk-layer",
  type: "fill",
  source: "lbs-source",
  paint: {
    "fill-color": {
      property: "B_risk_score",
      stops: [
        [13, "#fff5f0"],
        [25, "#fedccd"],
        [38, "#fcb398"],
        [50, "#fc8766"],
        [63, "#f6573e"],
        [75, "#dd2b25"],
        [88, "#b31217"],
        [100, "#67000e"],
      ],
    },
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "click"], false],
      0.8,
      0.6,
    ],
    "fill-outline-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#FFFFFF",
      "transparent",
    ],
  },
};

export const airPollutionRiskLayer = {
  id: "risk-layer",
  type: "fill",
  source: "lbs-source",
  paint: {
    "fill-color": {
      property: "C_risk_score",
      stops: [
        [38, "#feebe2"],
        [41.4, "#fccccb"],
        [44.7, "#faa9b7"],
        [48.9, "#f87ea8"],
        [53.7, "#e9529b"],
        [60, "#cc268c"],
        [75, "#a51082"],
        [100, "#7a0178"],
      ],
    },
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "click"], false],
      0.8,
      0.6,
    ],
    "fill-outline-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#FFFFFF",
      "transparent",
    ],
  },
};

export const floodingRiskLayer = {
  id: "risk-layer",
  type: "fill",
  source: "lbs-source",
  paint: {
    "fill-color": {
      property: "D_risk_score",
      stops: [
        [1, "#f7fbff"],
        [10, "#dce9f6"],
        [22.1, "#bed8ec"],
        [36.6, "#8fc2de"],
        [47, "#5fa5d1"],
        [55, "#3d8dc3"],
        [75, "#1e6db2"],
        [100, "#08529c"],
      ],
    },
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "click"], false],
      0.8,
      0.6,
    ],
    "fill-outline-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#FFFFFF",
      "transparent",
    ],
  },
};

export const floodingBuiltRiskLayer = {
  id: "risk-layer",
  type: "fill",
  source: "lbs-source",
  paint: {
    "fill-color": {
      property: "E_risk_score",
      stops: [
        [15.8, "#bed8ec"],
        [25, "#8fc2de"],
        [31.4, "#5fa5d1"],
        [38.5, "#3d8dc3"],
        [50.1, "#1e6db2"],
        [100, "#08529c"],
      ],
    },
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "click"], false],
      0.8,
      0.6,
    ],
    "fill-outline-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#FFFFFF",
      "transparent",
    ],
  },
};
