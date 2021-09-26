import React, { useState } from "react";

interface WorkerProps {
  site: string;
  mode: string;
  email: string;
  status: string;
  uuid: string;
}

const gradient = {
  background:
    "linear-gradient(97.17deg, #332E3A 13.22%, rgba(51, 46, 58, 0) 127.05%)",
};

const Worker = ({ site, mode, email, status, uuid }: WorkerProps) => {
  const [state, setstate] = useState();

  const classes = `text-sm font-medium w-1/4 overflow-hidden `;
  return (
    <>
      <div
        id={uuid}
        className='flex flex-row  px-6 items-center rounded-lg h-16 w-full mt-5 text-left overflow-hidden'
        style={gradient}
      >
        <div className='text-sm font-medium w-1/4 mr-28'>{site}</div>
        <div className={classes + "mr-16"}>{mode}</div>
        <div className={classes}>{email}</div>

        <div className='text-sm font-medium w-1/5 text-right overflow-hidden mr-7'>
          {status}
        </div>
      </div>
    </>
  );
};

export default Worker;
