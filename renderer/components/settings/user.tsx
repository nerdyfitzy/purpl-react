import React from "react";

const User = ({
  pfp,
  name,
  email,
}: {
  pfp: string;
  email: string;
  name: string;
}) => {
  return (
    <>
      <div className='flex flex-row h-10'>
        <img
          src='/images/fitzyPFP.gif'
          alt='pfp'
          className='w-10 h-10 rounded-full mr-3'
        />
        <div className='flex flex-col justify-evenly'>
          <div className='text-xs ' style={{ color: "#FFFFFF" }}>
            {name}
          </div>
          <div className='text-sm' style={{ color: "#6F6B75" }}>
            {email}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
