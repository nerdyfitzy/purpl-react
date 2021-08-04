import React from "react";

const Filter = ({
  filterName,
  num,
  handleFilter,
}: {
  filterName: string;
  num: number;
  handleFilter: any;
}) => {
  return (
    <button
      className='flex flex-row items-center text-sm font-medium mr-6'
      style={{ color: "#6F6B75" }}
      onClick={() => handleFilter(filterName)}
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
