import React from "react";

const Purchases = () => {
  const isUp = () => {
    return (
      <svg
        className='ml-3'
        width='13'
        height='18'
        viewBox='0 0 5 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M2.71955 7.92398C2.69011 7.94827 2.65539 7.9673 2.61738 7.97999C2.54201 8.00667 2.45746 8.00667 2.38209 7.97999C2.34408 7.9673 2.30936 7.94827 2.27992 7.92398L0.0910507 6.03834C0.0621841 6.01347 0.0392857 5.98395 0.0236632 5.95146C0.00804074 5.91896 3.04159e-10 5.88414 0 5.84897C-3.04159e-10 5.8138 0.00804074 5.77898 0.0236632 5.74649C0.0392857 5.714 0.0621841 5.68448 0.0910507 5.65961C0.119917 5.63474 0.154187 5.61501 0.191903 5.60156C0.229619 5.5881 0.270043 5.58117 0.310866 5.58117C0.35169 5.58117 0.392114 5.5881 0.42983 5.60156C0.467546 5.61501 0.501816 5.63474 0.530682 5.65961L2.19014 7.09185V0.266711C2.19014 0.195975 2.22275 0.128136 2.28082 0.0781174C2.33888 0.0280995 2.41762 0 2.49974 0C2.58185 0 2.66059 0.0280995 2.71866 0.0781174C2.77672 0.128136 2.80934 0.195975 2.80934 0.266711V7.09185L4.46879 5.65961C4.49772 5.63489 4.53203 5.61533 4.56975 5.60206C4.60747 5.58879 4.64786 5.58206 4.6886 5.58226C4.72935 5.58206 4.76974 5.58879 4.80746 5.60206C4.84518 5.61533 4.87949 5.63489 4.90842 5.65961C4.93744 5.6844 4.96047 5.7139 4.97619 5.7464C4.99191 5.7789 5 5.81376 5 5.84897C5 5.88418 4.99191 5.91904 4.97619 5.95154C4.96047 5.98404 4.93744 6.01354 4.90842 6.03834L2.71955 7.92398Z'
          fill='#B584FF'
        />
      </svg>
    );
  };
  return (
    <>
      <div className='div3 rounded-lg rounded-lg flex flex-row justify-evenly items-center'>
        {" "}
        <div
          className='rounded-full w-12 h-12 flex items-center justify-center'
          style={{
            background: "#24b3e0",
          }}
        >
          <svg
            width='25'
            height='25'
            viewBox='0 0 11 11'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.35417 10.0833C3.84791 10.0833 3.4375 9.67293 3.4375 9.16667C3.4375 8.66041 3.84791 8.25 4.35417 8.25C4.86043 8.25 5.27083 8.66041 5.27083 9.16667C5.27028 9.6727 4.8602 10.0828 4.35417 10.0833ZM8.02083 10.0833C7.51457 10.0833 7.10417 9.67293 7.10417 9.16667C7.10417 8.66041 7.51457 8.25 8.02083 8.25C8.52709 8.25 8.9375 8.66041 8.9375 9.16667C8.93695 9.6727 8.52687 10.0828 8.02083 10.0833Z'
              fill='#C8F2FF'
            />
            <path
              d='M3.74924 6.41654C3.54184 6.41654 3.36029 6.27724 3.3066 6.07691L2.16924 1.8332L1.60437 1.83345C1.35129 1.83356 1.14605 1.62849 1.14594 1.37541C1.14594 1.37538 1.14594 1.37535 1.14594 1.37533C1.14588 1.12225 1.35099 0.917047 1.60407 0.916992C1.6041 0.916992 1.60414 0.916992 1.60417 0.916992H2.52083C2.72823 0.916992 2.90978 1.05629 2.96347 1.25662L4.10082 5.49987H8.47916C9.23855 5.49987 9.85416 6.11548 9.85416 6.87487C9.85416 7.63426 9.23855 8.24987 8.47916 8.24987H2.52083C2.2677 8.24987 2.06249 8.04466 2.06249 7.79154C2.06249 7.53841 2.2677 7.3332 2.52083 7.3332H8.47916C8.73229 7.3332 8.93749 7.128 8.93749 6.87487C8.93749 6.62174 8.73229 6.41654 8.47916 6.41654H3.74924Z'
              fill='#81C6DC'
            />
            <path
              d='M4.10083 5.50016H8.47917C8.65268 5.50078 8.82449 5.5345 8.98536 5.59953L9.8385 2.41045C9.90423 2.16622 9.75953 1.91496 9.51531 1.84923C9.47635 1.83874 9.43618 1.83346 9.39583 1.8335H3.11804L4.10083 5.50016Z'
              fill='#ADEBFF'
            />
          </svg>
        </div>
        <div className=''>
          <div className='text-xl font-semibold flex flex-row items-center'>
            157
            {isUp()}
          </div>
          <div className='text-sm font-medium' style={{ color: "#6F6B75" }}>
            Items this week
          </div>
        </div>
      </div>
    </>
  );
};

export default Purchases;