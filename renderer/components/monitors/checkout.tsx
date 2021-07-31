import React from "react";

const btnBorder = {
  borderColor: "#6F6B75",
  borderWidth: "2px",
};

const Checkout = ({
  image,
  name,
  site,
  size,
  timestamp,
  num,
}: {
  image: string;
  name: string;
  site: string;
  size: string;
  timestamp: string;
  num: number;
}) => {
  function giveBackgroundColor() {
    if (num % 2 !== 0) {
      return {
        background:
          "linear-gradient(90.01deg, rgba(111, 107, 117, 0.15) 1.21%, rgba(111, 107, 117, 0.05) 100.6%)",
      };
    }

    return {};
  }

  return (
    <>
      <div
        className='w-11/12 h-16 flex flex-row items-center justify-between'
        style={giveBackgroundColor()}
      >
        <div className='w-28 flex flex-row items-center h-full'>
          <img src={image} alt='shoe' className='w-12 h-10' />
          <div className='font-md text-xs'>{name}</div>
        </div>

        <div className='font-md text-md text-center'>{site}</div>
        <div className='w-28 font-md text-md text-center'>{size}</div>
        <div className='w-28 font-md text-md text-center'>{timestamp}</div>
        <div className='w-28 flex justify-center'>
          <button
            className=' flex flex-row w-12 h-11 justify-evenly items-center rounded-md py-1'
            style={btnBorder}
          >
            <svg
              width='23'
              height='23'
              viewBox='0 0 9 9'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6.30972 4.11175L3.84656 2.58648C3.5434 2.39701 3.14551 2.6149 3.14551 2.9749V6.01596C3.14551 6.37596 3.53393 6.59385 3.84656 6.40438L6.30972 4.87911C6.6034 4.70859 6.6034 4.29175 6.30972 4.11175Z'
                fill='#B584FF'
              />
              <path
                d='M4.5 0C2.01789 0 0 2.01789 0 4.5C0 6.98211 2.01789 9 4.5 9C6.98211 9 9 6.98211 9 4.5C9 2.01789 6.98211 0 4.5 0ZM4.5 8.12842C2.50105 8.12842 0.871579 6.49895 0.871579 4.5C0.871579 2.50105 2.50105 0.871579 4.5 0.871579C6.49895 0.871579 8.12842 2.50105 8.12842 4.5C8.12842 6.49895 6.49895 8.12842 4.5 8.12842Z'
                fill='#B584FF'
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
