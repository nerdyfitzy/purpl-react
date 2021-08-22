import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { XYPlot, XAxis, YAxis, LineSeries, Crosshair } from "react-vis";
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

const quarters = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
];

const ProfitGraph = () => {
  const [curve, setcurve] = useState(null);
  const [period, setperiod] = useState("year");
  const [data, setdata] = useState([]);
  const [crosshairVal, setCrosshairVal] = useState([]);
  useEffect(() => {
    import("d3-shape").then((d3Shape) => {
      setcurve(d3Shape.curveCatmullRom.alpha(0.5));
    });

    setdata(ipcRenderer.sendSync("get-spent-graph", "year"));
  }, []);

  useEffect(() => {
    setdata(ipcRenderer.sendSync("get-spent-graph", period));
  }, [period]);

  const selectedDate = (d) => {
    if (d === period) return { color: "#FFFFFF" };
    else return { color: "#6F6B75" };
  };

  return (
    <>
      <div className='div4 rounded-lg relative'>
        <div
          className='absolute text-2xl font-bold top-6 left-6'
          style={{ color: "white" }}
        >
          $
          {data.reduce((total, d) => {
            return (total += d.y);
          }, 0)}
          <div style={{ color: "#6F6B75" }} className='text-sm font-md'>
            Total Spent
          </div>
        </div>
        <div
          className='flex m-auto justify-center mt-6'
          style={{ color: "#6F6B75" }}
        >
          {/* <div className='mr-5 text-sm flex items-center'>
            <div
              className='h-3 w-3 rounded-full mr-1 float-left'
              style={{ background: "#B584FF" }}
            ></div>
            Revenue
          </div> */}
          <div className='mr-2 text-sm flex items-center'>
            <div
              className='h-3 w-3 rounded-full mr-1 float-left'
              style={{ background: "#81C6DC" }}
            ></div>
            Retail Value
          </div>
        </div>

        <div
          className='absolute top-6 right-6 flex flex-col justify-evenly items-end p-2 rounded-lg text-sm'
          style={{
            boxShadow: "0px 4px 50px 0px #00000040",
            background: "#322C3B",
          }}
        >
          <div style={selectedDate("year")} onClick={() => setperiod("year")}>
            This Year
          </div>
          <div style={selectedDate("month")} onClick={() => setperiod("month")}>
            This Month
          </div>
          <div
            style={selectedDate("quarter")}
            onClick={() => setperiod("quarter")}
          >
            This Quarter
          </div>
        </div>

        <div className='absolute bottom-3 left-0'>
          <XYPlot
            height={110}
            width={500}
            style={{ overflow: "visible" }}
            onMouseLeave={() => setCrosshairVal([])}
          >
            <XAxis hideLine tickValues={data.map((t) => t.x)} hideTicks />
            <XAxis
              hideLine
              tickTotal={data.length}
              tickFormat={(v) => {
                const today = new Date();
                switch (period) {
                  case "year":
                    return months[v];
                  case "month":
                    const extraDay =
                      today.getMonth() % 2 !== 2
                        ? 1
                        : today.getMonth() === 6
                        ? 1
                        : today.getMonth() === 1
                        ? -2
                        : 0;
                    return `${today.getMonth() + 1}/${v * 5 + 1} - ${
                      today.getMonth() + 1
                    }/${v === 5 ? (v + 1) * 5 + extraDay : (v + 1) * 5}`;
                  case "quarter":
                    const currentQuarter =
                      today.getMonth() / 3 < 1
                        ? 1
                        : today.getMonth() / 3 >= 1 && today.getMonth() / 3 < 2
                        ? 2
                        : today.getMonth() / 3 >= 2 && today.getMonth() / 3 < 3
                        ? 3
                        : 4;

                    return `${
                      quarters[currentQuarter - 1][Math.floor(v / 3)] + 1
                    }/${(v % 3) * 10 + 1} - ${
                      quarters[currentQuarter - 1][Math.floor(v / 3)] + 1
                    }/${((v % 3) + 1) * 10}`;
                }
                console.log(v);
                return months[v];
              }}
            />
            {/* profit */}
            <LineSeries
              data={data}
              curve={"curveMonotoneX"}
              color='#81C6DC'
              onNearestX={({ x }) => {
                setCrosshairVal([data[x]]);
                console.log(crosshairVal);
              }}
            />
            <Crosshair values={crosshairVal} className={"test-class-name"}>
              <div
                className='rounded-md h-8 w-8 flex justify-center items-center p-2 text-md'
                style={{ background: "#322C3B", color: "white" }}
              >
                {crosshairVal.length > 0 ? `$${crosshairVal[0].y}` : 0}
              </div>
            </Crosshair>

            {/* revenue */}
            {/* <LineSeries
                  data={testData2}
                  curve={"curveMonotoneX"}
                  color='#B584FF'
                /> */}
          </XYPlot>
        </div>
      </div>
    </>
  );
};

export default ProfitGraph;
