import React from "react";
import { remote } from "electron";
import { Toaster } from "react-hot-toast";
import styles from "../styles/harvester.module.css";

const Actions = () => {
  function minimizeWindow() {
    console.log("mini");
    const WIN = remote.getCurrentWindow();
    WIN.minimize();
  }

  function closeWindow() {
    const WIN = remote.getCurrentWindow();
    WIN.close();
  }

  return (
    <>
      <Toaster position='bottom-right' />
      <div className='absolute left-0 top-0 h-10 flex flex-row z-30 justify-end items-center w-full drag'>
        <button onClick={minimizeWindow} className=''>
          <svg
            className='mx-2 my-4'
            width='15'
            height='15'
            viewBox='0 0 5 1'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0.479167 0.0498047H4.02083C4.21562 0.0498047 4.375 0.218555 4.375 0.424805C4.375 0.631055 4.21562 0.799805 4.02083 0.799805H0.479167C0.284375 0.799805 0.125 0.631055 0.125 0.424805C0.125 0.218555 0.284375 0.0498047 0.479167 0.0498047Z'
              fill='#CCCBDE'
            />
          </svg>
        </button>
        <button onClick={closeWindow} className='mr-5'>
          <svg
            width='15'
            height='15'
            viewBox='0 0 6 5'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5.48125 0.14127C5.34313 -0.00498038 5.12 -0.00498038 4.98188 0.14127L3.25001 1.97127L1.51813 0.13752C1.38001 -0.00873046 1.15688 -0.00873046 1.01875 0.13752C0.88063 0.283769 0.88063 0.52002 1.01875 0.66627L2.75063 2.50002L1.01875 4.33377C0.88063 4.48002 0.88063 4.71627 1.01875 4.86252C1.15688 5.00877 1.38001 5.00877 1.51813 4.86252L3.25001 3.02877L4.98188 4.86252C5.12 5.00877 5.34313 5.00877 5.48125 4.86252C5.61938 4.71627 5.61938 4.48002 5.48125 4.33377L3.74938 2.50002L5.48125 0.66627C5.61584 0.52377 5.61584 0.28377 5.48125 0.14127Z'
              fill='#CCCBDE'
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Actions;
