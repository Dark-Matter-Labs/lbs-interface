import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ResponsiveRadar } from "@nivo/radar";

const tempData = [
  {
    attribute: "Hitze-Risiko für Bevölkerungsgesundheit",
    val: 0,
  },
  {
    attribute: "Trocken–heitsrisiko für Grünzonen",
    val: 0,
  },
  {
    attribute: "Überschwemmungs-gefahr für das Verkehrsnetz",
    val: 0,
  },
  {
    attribute: "Überschwemmungsgefahr für bebaute Gebiete",
    val: 0,
  },
  {
    attribute: "Risiko der Luftverschmutzung für Bevölkerungs–gesundheit",
    val: 0,
  },
];

// eslint-disable-next-line
const LabelComponent = ({ id, x, y, anchor }) => (
  <g transform={`translate(${x}, ${y})`}>
    <g>
      <text
        y={24}
        x={-28}
        width={2}
        style={{
          fontSize: 7,
          fontWeight: "regular",
          fill: "#607D8B",
          lineBreak: "strict",
          overflowWrap: "break-word",
        }}
      >
        {id}
      </text>
    </g>
  </g>
);

const RiskRadar = (props) => {
  const [data, setData] = useState(tempData);

  useEffect(() => {
    if (props.data[0].val !== undefined) {
      setData(props.data);
    } else {
      setData(tempData);
    }
  }, [props.data]);

  return (
    <div>
      <ResponsiveRadar
        data={data}
        gridLabel={LabelComponent}
        keys={["val"]}
        gridShape="linear"
        indexBy="attribute"
        margin={{ top: 10, right: 100, bottom: 10, left: 100 }}
        colors={["#1EB792", "#2F3130", "#4F46E5"]}
        borderColor={{ from: "color" }}
        dotSize={5}
        blendMode="multiply"
        animate={false}
      />
    </div>
  );
};

RiskRadar.propTypes = {
  data: PropTypes.array,
};

RiskRadar.defaultProps = {
  data: tempData,
};

export default RiskRadar;
