import React from "react";

const bg = {
  background:
    "linear-gradient(96.34deg, #332E3A -8.25%, rgba(51, 46, 58, 0) 122.94%)",
};

const Release = ({ name, price }: { name: string; price: number }) => {
  return (
    <>
      <div
        style={bg}
        className='overflow-visible relative h-1/4 w-9/12 ml-4 rounded-lg'
      >
        <div
          className='absolute text-sm top-4 right-4'
          style={{ color: "#FFFFFF" }}
        >
          {name}
        </div>
        <div
          className='absolute right-4 bottom-4 w-16 h-10 flex items-center justify-center rounded-lg'
          style={{
            background: "#322C3B",
            boxShadow: "0px 4px 50px 0px #00000040",
          }}
        >
          ${price}
        </div>
        <img src='/images/af1.png' alt='' className='relative right-16' />
      </div>
    </>
  );
};

export default Release;
