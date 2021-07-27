import React, { useState } from "react";

const BottomBar = () => {
  const now = new Date();
  const min = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const [time, setTime] = useState<string>(
    `${now.getHours()}:${min}:${now.getSeconds()}`
  );
  setInterval(() => {
    const newNow = new Date();
    const newMin =
      newNow.getMinutes() < 10
        ? `0${newNow.getMinutes()}`
        : newNow.getMinutes();
    setTime(`${newNow.getHours()}:${newMin}:${newNow.getSeconds()}`);
  }, 1000);
  return (
    <>
      <div className='flex flex-row absolute bottom-0.5 right-5'>
        <div className='relative'>
          <svg
            className='float-left relative mr-2 top-0.5'
            width='20'
            height='20'
            viewBox='0 0 9 9'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.5 2.25C4.45075 2.24999 4.40198 2.25968 4.35648 2.27852C4.31098 2.29736 4.26963 2.32498 4.23481 2.35981C4.19998 2.39463 4.17236 2.43598 4.15352 2.48148C4.13468 2.52698 4.12499 2.57575 4.125 2.625V4.125H3.375C3.27554 4.125 3.18016 4.16451 3.10984 4.23484C3.03951 4.30516 3 4.40054 3 4.5C3 4.59946 3.03951 4.69484 3.10984 4.76516C3.18016 4.83549 3.27554 4.875 3.375 4.875H4.5C4.54925 4.87501 4.59802 4.86532 4.64352 4.84648C4.68902 4.82764 4.73037 4.80002 4.76519 4.76519C4.80002 4.73037 4.82764 4.68902 4.84648 4.64352C4.86532 4.59802 4.87501 4.54925 4.875 4.5V2.625C4.87501 2.57575 4.86532 2.52698 4.84648 2.48148C4.82764 2.43598 4.80002 2.39463 4.76519 2.35981C4.73037 2.32498 4.68902 2.29736 4.64352 2.27852C4.59802 2.25968 4.54925 2.24999 4.5 2.25Z'
              fill='#9456F1'
            />
            <path
              d='M4.5 0.75C3.75832 0.75 3.0333 0.969934 2.41661 1.38199C1.79993 1.79404 1.31928 2.37971 1.03545 3.06494C0.751625 3.75016 0.677362 4.50416 0.822057 5.23159C0.966751 5.95902 1.3239 6.6272 1.84835 7.15165C2.3728 7.6761 3.04098 8.03325 3.76841 8.17795C4.49584 8.32264 5.24984 8.24838 5.93506 7.96455C6.62029 7.68072 7.20596 7.20007 7.61801 6.58339C8.03007 5.9667 8.25 5.24168 8.25 4.5C8.25 4.00754 8.153 3.51991 7.96455 3.06494C7.77609 2.60997 7.49987 2.19657 7.15165 1.84835C6.80343 1.50013 6.39004 1.22391 5.93506 1.03545C5.48009 0.846997 4.99246 0.75 4.5 0.75ZM4.875 4.5C4.87501 4.54925 4.86532 4.59802 4.84648 4.64352C4.82764 4.68902 4.80002 4.73037 4.76519 4.76519C4.73037 4.80002 4.68903 4.82764 4.64352 4.84648C4.59802 4.86532 4.54925 4.87501 4.5 4.875H3.375C3.27555 4.875 3.18016 4.83549 3.10984 4.76516C3.03951 4.69484 3 4.59946 3 4.5C3 4.40054 3.03951 4.30516 3.10984 4.23484C3.18016 4.16451 3.27555 4.125 3.375 4.125H4.125V2.625C4.125 2.52554 4.16451 2.43016 4.23484 2.35984C4.30516 2.28951 4.40055 2.25 4.5 2.25C4.59946 2.25 4.69484 2.28951 4.76517 2.35984C4.83549 2.43016 4.875 2.52554 4.875 2.625V4.5Z'
              fill='#DAC2FF'
            />
          </svg>
          {time}
        </div>
        <div className='relative'>
          <svg
            className='float-left relative -top-1.5'
            width='45'
            height='45'
            viewBox='0 0 35 35'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g filter='url(#filter0_d)'>
              <circle cx='17.5' cy='13.5' r='2.5' fill='#8DE191' />
            </g>
            <defs>
              <filter
                id='filter0_d'
                x='0'
                y='0'
                width='35'
                height='35'
                filterUnits='userSpaceOnUse'
                color-interpolation-filters='sRGB'
              >
                <feFlood flood-opacity='0' result='BackgroundImageFix' />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hardAlpha'
                />
                <feOffset dy='4' />
                <feGaussianBlur stdDeviation='7.5' />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.554675 0 0 0 0 0.883632 0 0 0 0 0.567834 0 0 0 0.7 0'
                />
                <feBlend
                  mode='normal'
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='effect1_dropShadow'
                  result='shape'
                />
              </filter>
            </defs>
          </svg>
          Connected
        </div>
      </div>
    </>
  );
};

export default BottomBar;
