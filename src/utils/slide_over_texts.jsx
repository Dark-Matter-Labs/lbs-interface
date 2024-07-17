const slide_texts = {
  filter: {
    text: (
      <p className="book-intro-md text-dark-wood-800">
        Here you can filter to see the locations/areas/spots assessed with the
        most climate risk (worst 20%) and need for adaptation solutions
      </p>
    ),
    title: "Filter detail",
  },
  bottomTable: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>Summary of risk components for selected grid</p>
      </div>
    ),
    title: "",
  },
  bottomTableOverall: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
          This table summarizes the scores of the different assessed climate
          risk impact chains from the location selected.
        </p>
      </div>
    ),
    title: "",
  },
  topLegendHitze: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
          The risk for heat on population’s health and wellbeing is assessed
          based on the indicators and weights shown in this table.
        </p>
      </div>
    ),
    title: "",
  },
  topLegendTrocken: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
          The risk for drought on tree health is assessed based on the
          indicators and weights shown in this table.
        </p>
      </div>
    ),
    title: "",
  },
  topLegendLuft: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
          The risk for air pollution on population’s health is assessed based on
          the indicators and weights shown in this table.
        </p>
      </div>
    ),
    title: "",
  },
  topLegendUber1: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
          The risk for surfacewater flooding on the built-up area is assessed
          based on the indicators and weights shown in this table.
        </p>
      </div>
    ),
    title: "",
  },
  topLegendUber2: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
          The risk for surfacewater flooding on the transport network is
          assessed based on the indicators and weights shown in this table.
        </p>
      </div>
    ),
    title: "",
  },
  topLegendOverall: {
    text: (
      <div className="book-intro-md text-dark-wood-800">
        <p>
          Here is the legend for the risk grids overalayed in the map. The
          higher the value, the higher the compounded risk from the different
          hazards (drought, heat, air pollution and flood). Check the table
          shown below to unpack how this risk is distributed amongst these
          hazards.
        </p>
      </div>
    ),
    title: "",
  },
};

export function get_slide_texts() {
  return slide_texts;
}
