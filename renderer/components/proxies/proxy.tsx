import React, { useContext } from "react";
import { stateContext } from "../../pages/proxies";

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

const Proxy = ({
  ip,
  port,
  user,
  pass,
  speed,
  uuid,
}: {
  ip: string;
  port: string;
  user: string;
  pass: string;
  speed: number | string;
  uuid: string;
}) => {
  const { addSelected, changeProxies, proxies, selected } =
    useContext(stateContext);
  const classes = `text-sm font-medium w-1/5 mr-5 overflow-hidden`;
  const selectProxy = () => {
    if (!selected.includes(uuid)) {
      if (selected.length === 0) addSelected([uuid]);
      else addSelected([...selected, uuid]);
    } else {
      const index = selected.indexOf(uuid);
      addSelected(selected.splice(index, 1));
    }
    console.log(selected);
  };
  const getSelectedClasses = () => {
    if (selected.includes(uuid)) return selectedClasses;
    return gradient;
  };
  return (
    <>
      <div
        style={getSelectedClasses()}
        id={uuid}
        onClick={selectProxy}
        className='flex flex-row px-6 items-center rounded-lg h-16 w-11/12 mt-5'
      >
        <div className={classes}>{ip}</div>
        <div className={classes}>{port}</div>
        <div className={classes}>{user}</div>
        <div className={classes}>{pass}</div>
        <div className={classes}>
          {speed === "Untested" ? speed : `${speed}ms`}
        </div>
        <div className='flex flex-row'>
          <button className='mx-2'>
            <svg
              width='20'
              height='20'
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
          </button>
          <button>
            <svg
              width='20'
              height='20'
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
          </button>
        </div>
      </div>
    </>
  );
};

export default Proxy;
