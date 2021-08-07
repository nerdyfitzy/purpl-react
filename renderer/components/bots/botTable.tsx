import React from "react";
import Robot from "./robot";

const Table = () => {
  return (
    <>
      <div
        className='flex flex-wrap flex-row justify-between scrollbars pr-10'
        style={{ width: "99%", height: "65vh" }}
      >
        <Robot />
        <Robot />
        <Robot />
        <Robot />
        <Robot />
        <Robot />
        <Robot />
        <Robot />
      </div>
    </>
  );
};

export default Table;
