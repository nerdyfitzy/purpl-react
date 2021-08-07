import React from "react";

const border = {
  borderColor: "#C4C4C4",
  borderWidth: "2px",
  background: "#17131d",
};

const CreateGroup = ({
  text,
  handleClick,
  className,
}: {
  text: string;
  handleClick: any;
  className?: string;
}) => {
  const classes = className
    ? className
    : `rounded-lg h-14 w-40 my-6 flex flex-row justify-evenly items-center`;
  return (
    <>
      <button className={classes} style={border} onClick={handleClick}>
        <svg
          className='float-left pointer-events-none'
          width='20'
          height='20'
          viewBox='0 0 11 11'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M5.49996 10.0832C4.59346 10.0832 3.70732 9.81436 2.9536 9.31074C2.19987 8.80712 1.61242 8.0913 1.26551 7.25381C0.918612 6.41631 0.827847 5.49475 1.0047 4.60568C1.18154 3.7166 1.61806 2.89992 2.25906 2.25893C2.90005 1.61794 3.71672 1.18142 4.6058 1.00457C5.49488 0.827725 6.41643 0.91849 7.25393 1.26539C8.09142 1.61229 8.80724 2.19975 9.31086 2.95348C9.81449 3.7072 10.0833 4.59334 10.0833 5.49984C10.0819 6.71499 9.59857 7.87997 8.73933 8.73921C7.88009 9.59845 6.71511 10.0818 5.49996 10.0832Z'
            fill='#F6D3FF'
          />
          <path
            d='M7.33337 5.95817H3.66671C3.54515 5.95817 3.42857 5.90988 3.34262 5.82393C3.25666 5.73797 3.20837 5.62139 3.20837 5.49984C3.20837 5.37828 3.25666 5.2617 3.34262 5.17575C3.42857 5.08979 3.54515 5.0415 3.66671 5.0415H7.33337C7.45493 5.0415 7.57151 5.08979 7.65746 5.17575C7.74342 5.2617 7.79171 5.37828 7.79171 5.49984C7.79171 5.62139 7.74342 5.73797 7.65746 5.82393C7.57151 5.90988 7.45493 5.95817 7.33337 5.95817Z'
            fill='#9456F1'
          />
          <path
            d='M5.49996 7.79183C5.43977 7.79185 5.38016 7.78 5.32454 7.75697C5.26893 7.73395 5.2184 7.70019 5.17583 7.65762C5.13327 7.61506 5.09951 7.56453 5.07648 7.50891C5.05345 7.4533 5.04161 7.39369 5.04163 7.3335V3.66683C5.04163 3.54527 5.08991 3.42869 5.17587 3.34274C5.26182 3.25678 5.3784 3.2085 5.49996 3.2085C5.62152 3.2085 5.7381 3.25678 5.82405 3.34274C5.91 3.42869 5.95829 3.54527 5.95829 3.66683V7.3335C5.95831 7.39369 5.94646 7.4533 5.92344 7.50891C5.90041 7.56453 5.86665 7.61506 5.82409 7.65762C5.78152 7.70019 5.73099 7.73395 5.67537 7.75697C5.61976 7.78 5.56015 7.79185 5.49996 7.79183Z'
            fill='#9456F1'
          />
        </svg>
        {text}
      </button>
    </>
  );
};

export default CreateGroup;
