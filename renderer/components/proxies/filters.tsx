import React from "react";

const norm = { color: "#6F6B75" };

const sel = { color: "#9456F1" };

const Filter = ({
  filterName,
  num,
  handleFilter,
  isSelected,
}: {
  filterName: string;
  num: number;
  handleFilter: any;
  isSelected: boolean;
}) => {
  const clicked = () => {
    handleFilter(filterName);
  };
  const giveSel = () => {
    if (isSelected) return sel;
    return norm;
  };
  return (
    <button
      className='flex flex-row items-center text-sm font-medium mr-6'
      style={giveSel()}
      onClick={clicked}
    >
      {filterName}
      <div
        className='w-8 h-8 rounded-md ml-2 flex justify-center items-center min-w-min p-3'
        style={{
          background:
            "linear-gradient(97.17deg, #332E3A 13.22%, rgba(51, 46, 58, 0) 127.05%)",
          color: "#FFFFFF",
        }}
      >
        {num}
      </div>
    </button>
  );
};

export default Filter;
