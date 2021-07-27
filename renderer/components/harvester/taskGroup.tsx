import React, { useState } from "react";

const gradient = {
  background:
    "linear-gradient(97.17deg, #332E3A 13.22%, rgba(51, 46, 58, 0) 127.05%)",
};

const selectedClasses = {
  background:
    "linear-gradient(97.17deg, #332E3A 13.22%, rgba(51, 46, 58, 0) 127.05%)",
  borderWidth: "2px",
  borderColor: "rgba(181, 132, 255, 1)",
};

interface SelectedClasses {
  background: string;
  borderWidth?: string;
  borderColor?: string;
}

const TaskGroup = ({
  name,
  total,
  running,
  stopped,
  handleClick,
  isselected,
  uuid,
}: {
  name: string;
  total: number;
  running: number;
  stopped: number;
  handleClick: Function;
  isselected: boolean;
  uuid: string;
}) => {
  console.log(isselected);
  function groupClicked(event) {
    console.log("group clicked", event);
    handleClick(event);
  }
  function getSelectedClasses() {
    if (isselected) return selectedClasses;
    return gradient;
  }
  return (
    <>
      <div
        id={uuid}
        className='flex flex-col justify-between h-36 w-10/12 rounded-lg p-5 relative mb-4'
        style={getSelectedClasses()}
        onClick={(event) =>
          groupClicked(event.currentTarget.getAttribute("id"))
        }
      >
        <div className='font-semibold text-md'>
          {name}
          <div
            className='text-sm font-medium mt-1'
            style={{ color: "#6F6B75" }}
          >
            {total} Tasks
          </div>
        </div>

        <div className='relative flex flex-row'>
          <a
            className='text-sm font-medium flex flex-row items-center justify-between w-10'
            style={{ color: "#6F6B75" }}
          >
            <svg
              className=''
              width='15'
              height='15'
              viewBox='0 0 7 7'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.90734 3.1977L2.99155 2.01138C2.75576 1.86401 2.44629 2.03349 2.44629 2.31349V4.67875C2.44629 4.95875 2.74839 5.12823 2.99155 4.98086L4.90734 3.79454C5.13576 3.66191 5.13576 3.3377 4.90734 3.1977Z'
                fill='#B584FF'
              />
              <path
                d='M3.5 0C1.56947 0 0 1.56947 0 3.5C0 5.43053 1.56947 7 3.5 7C5.43053 7 7 5.43053 7 3.5C7 1.56947 5.43053 0 3.5 0ZM3.5 6.32211C1.94526 6.32211 0.677895 5.05474 0.677895 3.5C0.677895 1.94526 1.94526 0.677895 3.5 0.677895C5.05474 0.677895 6.32211 1.94526 6.32211 3.5C6.32211 5.05474 5.05474 6.32211 3.5 6.32211Z'
                fill='#B584FF'
              />
            </svg>
            {running}
          </a>
          <a
            className='text-sm font-medium flex flex-row items-center justify-between w-10 ml-5'
            style={{ color: "#6F6B75" }}
          >
            <svg
              width='15'
              height='15'
              viewBox='0 0 7 7'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3.5 0C2.80777 0 2.13108 0.205271 1.55551 0.589856C0.979934 0.974441 0.53133 1.52107 0.266423 2.16061C0.0015165 2.80015 -0.0677952 3.50388 0.0672531 4.18282C0.202301 4.86175 0.535644 5.48539 1.02513 5.97487C1.51461 6.46436 2.13825 6.7977 2.81718 6.93275C3.49612 7.0678 4.19985 6.99848 4.83939 6.73358C5.47893 6.46867 6.02556 6.02007 6.41014 5.44449C6.79473 4.86892 7 4.19223 7 3.5C7 2.57174 6.63125 1.6815 5.97487 1.02513C5.3185 0.368749 4.42826 0 3.5 0ZM4.84615 4.03846C4.84615 4.25267 4.76106 4.45811 4.60959 4.60959C4.45812 4.76106 4.25268 4.84615 4.03846 4.84615H2.96154C2.74733 4.84615 2.54189 4.76106 2.39041 4.60959C2.23894 4.45811 2.15385 4.25267 2.15385 4.03846V2.96154C2.15385 2.74732 2.23894 2.54188 2.39041 2.39041C2.54189 2.23894 2.74733 2.15385 2.96154 2.15385H4.03846C4.25268 2.15385 4.45812 2.23894 4.60959 2.39041C4.76106 2.54188 4.84615 2.74732 4.84615 2.96154V4.03846Z'
                fill='#81C6DC'
              />
            </svg>
            {stopped}
          </a>
        </div>

        <a className='absolute bottom-5 right-5'>
          <svg
            width='18'
            height='18'
            viewBox='0 0 9 9'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g opacity='0.5'>
              <path
                d='M7.5 2.25H6V1.875C5.99931 1.25395 5.49605 0.750686 4.875 0.75H4.125C3.50395 0.750686 3.00069 1.25395 3 1.875V2.25H1.5C1.29288 2.25 1.125 2.41788 1.125 2.625C1.125 2.83212 1.29288 3 1.5 3H3.375H5.625C5.62507 3 5.62514 3 5.62521 3H7.5C7.70712 3 7.875 2.83212 7.875 2.625C7.875 2.41788 7.70712 2.25 7.5 2.25ZM3.75 2.25V1.875C3.75021 1.66798 3.91798 1.50021 4.125 1.5H4.875C5.08202 1.50021 5.24979 1.66798 5.25 1.875V2.25H3.75ZM3.75 3.75C3.54288 3.75 3.375 3.91788 3.375 4.125V6.375C3.375 6.37507 3.375 6.37514 3.375 6.37521C3.37505 6.58225 3.54295 6.75004 3.75 6.75C3.75007 6.75 3.75014 6.75 3.75021 6.75C3.95725 6.74996 4.12505 6.58205 4.125 6.375V4.125C4.125 3.91788 3.95712 3.75 3.75 3.75ZM5.25 3.75C5.04288 3.75 4.875 3.91788 4.875 4.125V6.375C4.875 6.37507 4.875 6.37514 4.875 6.37521C4.87505 6.58225 5.04295 6.75004 5.25 6.75C5.25007 6.75 5.25014 6.75 5.25021 6.75C5.45725 6.74996 5.62504 6.58205 5.625 6.375V4.125C5.625 3.91788 5.45712 3.75 5.25 3.75Z'
                fill='#9C9C9E'
              />
              <path
                d='M1.875 3V7.125C1.87569 7.74605 2.37895 8.24931 3 8.25H6C6.62105 8.24931 7.12431 7.74605 7.125 7.125V3H1.875ZM4.125 6.375C4.12505 6.58205 3.95725 6.74995 3.75021 6.75C3.75014 6.75 3.75007 6.75 3.75 6.75C3.54296 6.75005 3.37504 6.58225 3.375 6.37521C3.375 6.37514 3.375 6.37507 3.375 6.375V4.125C3.375 3.91788 3.54288 3.75 3.75 3.75C3.95712 3.75 4.125 3.91788 4.125 4.125V6.375ZM5.625 6.375C5.62505 6.58205 5.45725 6.74995 5.25021 6.75C5.25014 6.75 5.25007 6.75 5.25 6.75C5.04295 6.75005 4.87505 6.58225 4.875 6.37521C4.875 6.37514 4.875 6.37507 4.875 6.375V4.125C4.875 3.91788 5.04288 3.75 5.25 3.75C5.45712 3.75 5.625 3.91788 5.625 4.125V6.375Z'
                fill='#6F6B75'
              />
            </g>
          </svg>
        </a>

        <a className='absolute bottom-5 right-16'>
          <svg
            width='18'
            height='18'
            viewBox='0 0 7 7'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g opacity='0.5'>
              <path
                d='M2.11249 6.41683H0.875041C0.836736 6.41684 0.798804 6.40931 0.763413 6.39465C0.728022 6.38 0.695865 6.35851 0.668779 6.33143C0.641693 6.30434 0.62021 6.27218 0.605556 6.23679C0.590901 6.2014 0.583364 6.16347 0.583374 6.12517V4.88757C0.583371 4.84927 0.590917 4.81135 0.60558 4.77596C0.620244 4.74058 0.641737 4.70844 0.668832 4.68137L4.68209 0.668945C4.70916 0.641855 4.74131 0.620366 4.77669 0.605704C4.81208 0.591042 4.85 0.583496 4.88831 0.583496C4.92661 0.583496 4.96453 0.591042 4.99992 0.605704C5.0353 0.620366 5.06745 0.641855 5.09452 0.668945L6.33125 1.9054C6.35834 1.93247 6.37983 1.96462 6.39449 2C6.40915 2.03539 6.4167 2.07331 6.4167 2.11161C6.4167 2.14991 6.40915 2.18784 6.39449 2.22322C6.37983 2.25861 6.35834 2.29075 6.33125 2.31783L2.31871 6.33138C2.26401 6.38608 2.18984 6.41682 2.11249 6.41683Z'
                fill='#9C9C9E'
              />
              <path
                d='M6.33124 1.9054L5.09452 0.668945C5.06744 0.641855 5.03529 0.620366 4.99991 0.605704C4.96453 0.591042 4.9266 0.583496 4.8883 0.583496C4.85 0.583496 4.81207 0.591042 4.77669 0.605704C4.74131 0.620366 4.70916 0.641855 4.68208 0.668945L3.65039 1.70053L5.29956 3.34935L6.33124 2.31783C6.35833 2.29075 6.37982 2.25861 6.39449 2.22322C6.40915 2.18784 6.41669 2.14991 6.41669 2.11161C6.41669 2.07331 6.40915 2.03539 6.39449 2C6.37982 1.96462 6.35833 1.93247 6.33124 1.9054Z'
                fill='#6F6B75'
              />
            </g>
          </svg>
        </a>
      </div>
    </>
  );
};

export default TaskGroup;
