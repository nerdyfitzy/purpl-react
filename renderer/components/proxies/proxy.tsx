import React, { useContext } from "react";
import { stateContext } from "../../pages/proxies";
import { ContextMenuTrigger, ContextMenu, MenuItem } from "react-contextmenu";

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
  isSelected,
}: {
  ip: string;
  port: string;
  user: string;
  pass: string;
  speed: number | string;
  uuid: string;
  isSelected: boolean;
}) => {
  const { addSelected, changeProxies, proxies, selected } =
    useContext(stateContext);
  const classes = `text-sm font-medium w-20 mr-16 overflow-hidden `;
  const selectProxy = () => {
    if (!selected.includes(uuid)) {
      addSelected([...selected, uuid]);
    } else {
      let copy = [...selected];
      copy.splice(copy.indexOf(uuid), 1);
      addSelected(copy);
    }
    console.log(selected);
  };
  const getSelectedClasses = () => {
    if (isSelected) return selectedClasses;
    return gradient;
  };
  return (
    <>
      <ContextMenuTrigger id='proxy'>
        <div
          style={getSelectedClasses()}
          id={uuid}
          onClick={selectProxy}
          className='flex flex-row items-center rounded-lg h-16 w-11/12 mt-5 px-4'
        >
          <div className={classes}>{ip}</div>
          <div className='text-sm font-medium w-20 mr-10 overflow-hidden ml-3'>
            {port}
          </div>
          <div className={classes}>{user}</div>
          <div className={classes}>{pass}</div>
          <div className={classes}>
            {speed === "Untested" ? speed : `${speed}ms`}
          </div>
          <div className='flex flex-row '>
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
      </ContextMenuTrigger>

      <ContextMenu id='proxy'>
        <MenuItem>Test Selected</MenuItem>
        <MenuItem>Copy Selected</MenuItem>
        <MenuItem>Delete Selected</MenuItem>
        <MenuItem>Move Selected</MenuItem>
      </ContextMenu>
    </>
  );
};

export default Proxy;
