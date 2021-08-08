import React, { useState } from "react";

const pingBg = {
  background: "#B584FF",
  color: "#FFFFFF",
};

const normalBg = {
  background: "",
  color: "#6F6B75",
};

const Days = ({ start, month }: { start: number; month: number }) => {
  const [sel, setsel] = useState(null);
  const addBefore = start++;
  let nums = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  if ((month + 1) % 2 === 0 || month + 1 === 7 || month === 0) {
    nums.push(31);
  }
  if (month === 1) {
    nums.splice(28, 3);
  }
  let subNum =
    (month - 1) % 2 === 0 ? 32 : month - 1 === 7 ? 32 : month - 1 < 0 ? 32 : 31;
  for (let i = 1; i <= addBefore; i++) {
    nums.unshift(subNum - i);
  }

  const giveSel = (e) => {
    if (sel === e) {
      return pingBg;
    }
    return normalBg;
  };
  return (
    <>
      {nums.map((num, index) => (
        <div
          className='rounded-md text-center py-px'
          onMouseOver={() => setsel(index)}
          onMouseLeave={() => setsel(1000)}
          style={giveSel(index)}
        >
          {num}
        </div>
      ))}
    </>
  );
};

export default Days;
