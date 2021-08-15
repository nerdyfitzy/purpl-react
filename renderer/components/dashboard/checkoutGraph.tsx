import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import {
  HorizontalGridLines,
  XYPlot,
  YAxis,
  XAxis,
  VerticalBarSeries,
} from "react-vis";

const days = [];

const CheckoutGraph = () => {
  const [Data, setData] = useState([]);
  useEffect(() => {
    setData(ipcRenderer.sendSync("get-checkout-graph"));
    const date = new Date();
    for (let i = date.getDate(); i > date.getDate() - 7; i--)
      days.unshift(`${date.getMonth() + 1}/${i}`);

    console.log(days);
  }, []);
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
            data={Data}
            className='rounded-md'
            color='#9456F1'
          />
        </XYPlot>
      </div>
    </>
  );
};

export default CheckoutGraph;
