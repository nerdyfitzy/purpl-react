import React, { useEffect, useState } from "react";
import { XYPlot, XAxis, YAxis, LineSeries } from "react-vis";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const testData = [
  { x: 0, y: 10 },
  { x: 1, y: 2 },
  { x: 2, y: 20 },
  { x: 3, y: 15 },
  { x: 4, y: 12 },
  { x: 5, y: 25 },
  { x: 7, y: 50 },
  { x: 8, y: 30 },
  { x: 9, y: 35 },
  { x: 10, y: 32 },
  { x: 11, y: 28 },
];

const testData2 = [
  { x: 0, y: 20 },
  { x: 1, y: 35 },
  { x: 2, y: 40 },
  { x: 3, y: 32 },
  { x: 4, y: 55 },
  { x: 5, y: 52 },
  { x: 7, y: 53 },
  { x: 8, y: 50 },
  { x: 9, y: 58 },
  { x: 10, y: 36 },
  { x: 11, y: 37 },
];
const ProfitGraph = () => {
  const [curve, setcurve] = useState(null);
  useEffect(() => {
    import("d3-shape").then((d3Shape) => {
      setcurve(d3Shape.curveCatmullRom.alpha(0.5));
    });
  }, []);

  const selectedDate = (d) => {
    switch (d) {
      case "year":
        return { color: "#FFFFFF" };
      case "month":
        return { color: "#6F6B75" };
      case "quarter":
        return { color: "#6F6B75" };
    }
  };
  return (
    <>
      <div className='div4 rounded-lg relative'>
        <div
          className='absolute text-2xl font-bold top-6 left-6'
          style={{ color: "white" }}
        >
          $25.5k
          <div style={{ color: "#6F6B75" }} className='text-sm font-md'>
            Overall profit
          </div>
        </div>
        <div
          className='flex m-auto justify-center mt-6'
          style={{ color: "#6F6B75" }}
        >
          <div className='mr-5 text-sm flex items-center'>
            <div
              className='h-3 w-3 rounded-full mr-1 float-left'
              style={{ background: "#B584FF" }}
            ></div>
            Revenue
          </div>
          <div className='mr-2 text-sm flex items-center'>
            <div
              className='h-3 w-3 rounded-full mr-1 float-left'
              style={{ background: "#81C6DC" }}
            ></div>
            Profit
          </div>
        </div>

        <div
          className='absolute top-6 right-6 flex flex-col justify-evenly items-end p-2 rounded-lg text-sm'
          style={{
            boxShadow: "0px 4px 50px 0px #00000040",
            background: "#322C3B",
          }}
        >
          <div style={selectedDate("year")}>This Year</div>
          <div style={selectedDate("month")}>This Month</div>
          <div style={selectedDate("quarter")}>This Quarter</div>
        </div>

        <div className='absolute bottom-3 left-0'>
          <XYPlot height={110} width={450}>
            <XAxis hideLine tickValues={testData.map((t) => t.x)} hideTicks />
            <XAxis hideLine tickFormat={(v) => months[v]} />
            {/* profit */}
            <LineSeries
              data={testData}
              curve={"curveMonotoneX"}
              color='#81C6DC'
            />

            {/* revenue */}
            <LineSeries
              data={testData2}
              curve={"curveMonotoneX"}
              color='#B584FF'
            />
          </XYPlot>
        </div>
      </div>
    </>
  );
};

export default ProfitGraph;
