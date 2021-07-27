import React, { useState } from "react";
import toast from "react-hot-toast";

const topGradient = {
  background:
    "linear-gradient(93.71deg, rgba(111, 107, 117, 0.09) 13.99%, rgba(111, 107, 117, 0) 107.92%)",
};

const botBorder = {
  borderBottomWidth: "2px",
  borderColor: "#B584FF",
};

const back = {
  background: "linear-gradient(170.6deg, #292431 7.78%, #312B3B 92.9%)",
};

const darken = { background: "rgba(0, 0, 0, 0.6)" };

const GroupModal = ({
  shown,
  handleClose,
}: {
  shown: boolean;
  handleClose: any;
}) => {
  if (!shown) return null;
  function handleClick(e) {
    if (e.target.getAttribute("id") === "modalBackground") handleClose();
  }
  function submitData() {
    toast.success("Added Group!");
    handleClose();
  }
  return (
    <>
      <div
        className='w-full h-full flex justify-center items-center absolute z-30'
        style={darken}
        onClick={handleClick}
        id='modalBackground'
      >
        <div
          className='w-2/5 h-2/5 flex flex-col relative rounded-md z-50'
          style={back}
          id='modal'
        >
          <div className='h-28' style={topGradient}>
            <button>
              <svg
                className='absolute top-5 right-5'
                onClick={handleClose}
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

            <div
              className='absolute top-8 left-12 text-md font-semibold p-2 w-1/5'
              style={botBorder}
            >
              Add Group
            </div>
          </div>
          <div className='modalBottom relative'>
            <div className='absolute left-16 top-8 flex flex-col'>
              <label htmlFor='groupName' className='mb-3'>
                Group Name
              </label>
              <input
                id='groupName'
                type='text'
                className='rounded-lg w-56 h-12 text-left px-4 text-xs font-medium '
                style={{ background: "#6B6476" }}
                placeholder='Enter group name'
              />
            </div>

            <button
              className='rounded-lg text-center align-middle absolute -bottom-52 right-7 h-10 w-16'
              style={{ background: "#81C6DC" }}
              onClick={submitData}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupModal;
