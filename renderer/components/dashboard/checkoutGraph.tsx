import React from "react";
import {
  HorizontalGridLines,
  XYPlot,
  YAxis,
  XAxis,
  VerticalBarSeries,
} from "react-vis";

const testData = [
  { x: 0, y: 10 },
  { x: 1, y: 2 },
  { x: 2, y: 20 },
  { x: 3, y: 15 },
  { x: 4, y: 12 },
  { x: 5, y: 25 },
  { x: 6, y: 2 },
];

const days = ["S", "M", "T", "W", "Th", "F", "S"];

const CheckoutGraph = () => {
  return (
    <>
      <div className='div1 rounded-lg flex items-center relative justify-center'>
        <div
          className='flex flex-row justify-between absolute top-4 left-4 text-xs'
          style={{ color: "#FFFFFF" }}
        >
          Checkouts
        </div>
        <XYPlot
          height={200}
          width={275}
          margin={{ left: 31, right: 20, top: 35, bottom: 22 }}
        >
          <HorizontalGridLines
            style={{ stroke: "#77717F3B", strokeWidth: "2px" }}
          />
          <XAxis hideLine tickValues={[0, 1, 2, 3, 4, 5, 6]} hideTicks />
          <XAxis
            tickFormat={(v) => days[v]}
            hideLine
            style={{ line: { stroke: "#77717F3B" } }}
          />
          <YAxis hideLine style={{ line: { stroke: "#77717F3B" } }} />
          <VerticalBarSeries
            barWidth={0.1}
            data={testData}
            className='rounded-md'
            color='#9456F1'
          />
        </XYPlot>
      </div>
    </>
  );
};

export default CheckoutGraph;
