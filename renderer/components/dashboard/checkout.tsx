import React from "react";

const imgBg = {
  background:
    "linear-gradient(180deg, #6F6B75 0%, rgba(111, 107, 117, 0.38) 100%)",
};

const Checkout = ({
  image,
  site,
  name,
}: {
  image: string;
  site: string;
  name: string;
}) => {
  console.log(image, site, name);
  return (
    <>
      <div className='flex mb-1 w-52 min-w-full'>
        <div
          style={imgBg}
          className='h-9 w-9 rounded-lg overflow-x-visible flex items-center justify-center'
        >
          <img src={image} className='h-8 w-12 rounded-md' alt='' />
        </div>
        <div className='text-sm ml-4' style={{ color: "#FFFFFF" }}>
          {name}{" "}
          <div className='' style={{ color: "#6F6B75" }}>
            {site}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
