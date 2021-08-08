import React, { useState, useEffect } from "react";
import Days from "./days";
import Release from "./release";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  const [month, setmonth] = useState(7);
  const [dayIndex, setdayIndex] = useState(
    new Date(new Date().getFullYear(), month, 1).getDay()
  );

  useEffect(() => {
    const d = new Date(new Date().getFullYear(), month, 1);
    console.log(d.getDay());
    setdayIndex(d.getDay());
    return () => {};
  }, [month]);

  return (
    <>
      <div className='div5 rounded-lg flex flex-col justify-evenly items-center'>
        <div className='text-2xl font-bold'>Release Calendar</div>
        {/* month scroller */}
        <div
          className='flex justify-between items-center w-10/12 h-12 rounded-lg p-4'
          style={{
            background:
              "linear-gradient(96.34deg, #3A3541 -8.25%, rgba(60, 54, 68, 0) 122.94%)",
          }}
        >
          <button
            onClick={() => setmonth(month - 1 >= 0 ? month - 1 : month + 11)}
          >
            <svg
              width='10'
              height='12'
              viewBox='0 0 5 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4 1L1 4L4 7'
                stroke='#6F6B75'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </button>
          <div className='text-sm font-medium'>{months[month]}</div>
          <button
            onClick={() => setmonth(month + 1 <= 11 ? month + 1 : month - 11)}
          >
            <svg
              width='10'
              height='12'
              viewBox='0 0 5 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 1L4 4L1 7'
                stroke='#6F6B75'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </button>
        </div>

        <div
          className='calendar-grid h-2/6 grid-flow-row text-center'
          style={{ color: "#6F6B75" }}
        >
          <div>SU</div>
          <div>MO</div>
          <div>TU</div>
          <div>WE</div>
          <div>TH</div>
          <div>FR</div>
          <div>SA</div>
          <Days start={dayIndex} month={month} />
        </div>
        <Release name='Air Force 1' price={110} />
      </div>
    </>
  );
};

export default Calendar;
