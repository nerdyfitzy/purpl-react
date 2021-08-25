import React from "react";

interface SuggestionProps {
  name: string;
  handleClick: (name) => void;
}

const BotSuggestion = ({ name, handleClick }: SuggestionProps) => {
  const path = `/images/${name}.jpg`;
  return (
    <>
      <div
        className='h-10 w-full flex flex-row justify-start items-center'
        style={{ background: "#6B6476" }}
        onClick={() => handleClick(name)}
      >
        <img src={path} alt='botimg' className='w-8 h-8 rounded-full mr-4' />
        <div className='text-sm font-md text-center' style={{ color: "white" }}>
          {name}
        </div>
      </div>
    </>
  );
};

export default BotSuggestion;
