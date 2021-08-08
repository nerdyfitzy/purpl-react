import React from "react";

const imgBg = {
  background:
    "linear-gradient(180deg, #6F6B75 0%, rgba(111, 107, 117, 0.38) 100%)",
};

const Checkout = () => {
  return (
    <>
      <div className='flex mb-1 w-52'>
        <div
          style={imgBg}
          className='h-9 w-9 rounded-lg overflow-x-visible flex items-center justify-center'
        >
          <img src='/images/af1.png' className='h-8 w-10' alt='' />
        </div>
        <div className='text-sm ml-4' style={{ color: "#FFFFFF" }}>
          Air Force 1{" "}
          <div className='' style={{ color: "#6F6B75" }}>
            www.footlocker.com
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
