import React from "react";

const Header = ({ text }: { text: string }) => {
  return (
    <>
      <span
        className='h-8 w-20 text-center rounded-lg align-middle leading-8'
        style={{ background: "#9456F1" }}
      >
        {text}
      </span>
    </>
  );
};

export default Header;
