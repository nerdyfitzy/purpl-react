import React from "react";

const gradient = {
  background:
    "linear-gradient(97.17deg, #332E3A 13.22%, rgba(51, 46, 58, 0) 127.05%)",
};

const Retailer = ({ name, image }: { name: string; image: string }) => {
  return (
    <>
      <div
        className='w-full h-16 flex flex-row p-4 pr-28 mb-4 justify-evenly items-center rounded-md'
        style={gradient}
      >
        <img src={image} alt='logo' className='w-10 h-10' />
        <div className='font-semibold text-lg'>{name}</div>
      </div>
    </>
  );
};

export default Retailer;
