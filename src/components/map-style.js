// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const genRiskLayer = {
  id: "district-layer",
  type: "fill",
  source: "district-source",
  layout: {},
  paint: {
    "fill-color": {
      property: "AVERAGE_RISK",
      stops: [
        [13.6, "#1aaa0d"],
        [19.6, "#2ea797"],
        [25.89, "#42a4a9"],
        [32.6, "#55a1ba"],
        [42.82, "#699ecb"],
        [52.6, "#7c9bdd"],
        [63, "#9096ee"],
        [100, "#a294ff"],
      ],
    },
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "click"], false],
      1,
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
  id: "district-layer",
  type: "fill",
  source: "district-source",
  paint: {
    "fill-color": {
      property: "A_risk_score",
      stops: [
        [22.39, "#0d0887"],
        [30.19, "#5301a4"],
        [36.6, "#8b09a5"],
        [41.79, "#b93289"],
        [46.89, "#db5c69"],
        [52.29, "#f48849"],
        [59, "#febb2b"],
        [100, "#f2f921"],
      ],
    },
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "click"], false],
      1,
      0.4,
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
  id: "district-layer",
  type: "fill",
  source: "district-source",
  paint: {
    "fill-color": {
      property: "B_risk_score",
      stops: [
        [12.5, "#fff5f0"],
        [25, "#feddcd"],
        [37.5, "#fcb398"],
        [50, "#fc8766"],
        [62.5, "#f7573e"],
        [75, "#de2a24"],
        [87.5, "#b31217"],
        [100, "#67000e"],
      ],
    },
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "click"], false],
      1,
      0.5,
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
  id: "district-layer",
  type: "fill",
  source: "district-source",
  paint: {
    "fill-color": {
      property: "C_risk_score",
      stops: [
        [13.4, "#feebe2"],
        [14.69, "#fdcccb"],
        [16.39, "#fba9b7"],
        [22.39, "#f97ea7"],
        [36.29, "#e9529b"],
        [50.95, "#cc268c"],
        [63.29, "#a50f82"],
        [100, "#7a0178"],
      ],
    },
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "click"], false],
      1,
      0.5,
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
  id: "district-layer",
  type: "fill",
  source: "district-source",
  paint: {
    "fill-color": {
      property: "D_risk_score",
      stops: [
        [5.1, "#bed8ec"],
        [19.89, "#8fc2de"],
        [29.52, "#5ba3d0"],
        [39.45, "#3281be"],
        [51.2, "#115ba5"],
        [100, "#08306b"],
      ],
    },
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "click"], false],
      1,
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
