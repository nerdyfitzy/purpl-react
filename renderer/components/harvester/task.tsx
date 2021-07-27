import { ipcRenderer } from "electron";
import React, { useState } from "react";
import AccountModal from "./addAccount";

interface SelectedClasses {
  background: string;
  borderWidth?: string;
  borderColor?: string;
}

const Task = ({
  num,
  email,
  proxy,
  status,
  running,
  id,
  score,
  handleClick,
  groupID,
  handleEdit,
  handleDelete,
  handleStart,
}: {
  num: number;
  email: string;
  proxy: string;
  status: string;
  running: boolean;
  id: string;
  score: {
    v3: string | number;
    v2v: string | boolean;
    v2i: string | boolean;
  };
  handleClick: any;
  groupID: string;
  handleEdit: any;
  handleDelete: any;
  handleStart: any;
}) => {
  const [selected, setSelected] = useState<SelectedClasses>({
    background:
      "linear-gradient(97.17deg, #332E3A 13.22%, rgba(51, 46, 58, 0) 127.05%)",
  });
  const [shown, changeVis] = useState(false);
  function getCorrectButton() {
    if (running) {
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M8.00004 14.6668C6.6815 14.6668 5.39257 14.2758 4.29624 13.5433C3.19991 12.8108 2.34543 11.7696 1.84085 10.5514C1.33626 9.33321 1.20424 7.99277 1.46148 6.69956C1.71871 5.40636 2.35365 4.21847 3.286 3.28612C4.21835 2.35377 5.40623 1.71883 6.69944 1.4616C7.99265 1.20436 9.33309 1.33638 10.5513 1.84097C11.7694 2.34555 12.8106 3.20004 13.5432 4.29636C14.2757 5.39269 14.6667 6.68162 14.6667 8.00017C14.6647 9.76765 13.9617 11.4622 12.7119 12.712C11.4621 13.9618 9.76753 14.6648 8.00004 14.6668Z'
            fill='#81C6DC'
          />
          <path
            d='M10 10.6668H6.00004C5.91249 10.6669 5.82579 10.6496 5.74489 10.6161C5.664 10.5826 5.5905 10.5335 5.52859 10.4716C5.46668 10.4097 5.41757 10.3362 5.38407 10.2553C5.35058 10.1744 5.33335 10.0877 5.33337 10.0002V6.00016C5.33335 5.91261 5.35058 5.82591 5.38407 5.74501C5.41757 5.66412 5.46668 5.59062 5.52859 5.52871C5.5905 5.4668 5.664 5.41769 5.74489 5.3842C5.82579 5.3507 5.91249 5.33347 6.00004 5.3335H10C10.0876 5.33347 10.1743 5.3507 10.2552 5.3842C10.3361 5.41769 10.4096 5.4668 10.4715 5.52871C10.5334 5.59062 10.5825 5.66412 10.616 5.74501C10.6495 5.82591 10.6667 5.91261 10.6667 6.00016V10.0002C10.6667 10.0877 10.6495 10.1744 10.616 10.2553C10.5825 10.3362 10.5334 10.4097 10.4715 10.4716C10.4096 10.5335 10.3361 10.5826 10.2552 10.6161C10.1743 10.6496 10.0876 10.6669 10 10.6668Z'
            fill='#2D2738'
          />
        </svg>
      );
    } else {
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 15 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M4.48034 14.0012C3.91417 13.9991 3.37179 13.7581 2.97173 13.3307C2.57167 12.9034 2.34647 12.3245 2.34534 11.7206V4.27917C2.34533 3.87942 2.44398 3.4867 2.63137 3.14051C2.81876 2.79432 3.08829 2.50684 3.41286 2.30698C3.73743 2.10712 4.1056 2.00192 4.48037 2.00195C4.85514 2.00199 5.2233 2.10725 5.54784 2.30717L11.5876 6.02784C11.912 6.22773 12.1815 6.5152 12.3688 6.86135C12.5561 7.2075 12.6547 7.60015 12.6547 7.99984C12.6547 8.39952 12.5561 8.79217 12.3688 9.13832C12.1815 9.48448 11.912 9.77194 11.5876 9.97184L5.54781 13.6925C5.22365 13.8938 4.85543 14.0003 4.48034 14.0012Z'
            fill='#B584FF'
          />
        </svg>
      );
    }
  }
  const classes = `text-sm font-medium w-1/5 overflow-hidden mr-10`;

  function clickedTask(e) {
    if (typeof selected.borderWidth !== "undefined") {
      setSelected({
        background:
          "linear-gradient(97.17deg, #332E3A 13.22%, rgba(51, 46, 58, 0) 127.05%)",
      });
    } else {
      setSelected({
        ...selected,
        borderWidth: "2px",
        borderColor: "rgba(181, 132, 255, 1)",
      });
    }

    handleClick(e);
  }

  function editGmail(emailN, proxyN) {
    handleEdit(id, {
      uuid: id,
      email: emailN,
      status: status,
      proxy: proxyN,
      running: running,
      score: score,
    });
  }

  function deleteGmail() {
    ipcRenderer.send("delete-gmail", { groupID, uuid: id });
    handleDelete(id);
  }

  function onAction() {
    ipcRenderer.send("action-gmail", { groupID, uuid: id });
    handleStart(id);
  }

  return (
    <>
      <AccountModal
        shown={shown}
        handleClose={() => changeVis(false)}
        group={groupID}
        handleSubmit={editGmail}
        edit={true}
        editedUuid={id}
      />
      <div
        onClick={(event) => clickedTask(event.currentTarget.getAttribute("id"))}
        id={id}
        style={selected}
        className='flex flex-row  px-6 items-center rounded-lg h-16 w-full mt-5 text-center overflow-hidden'
      >
        <div className='text-sm font-medium w-4 mr-20'>{num}</div>
        <div className={classes}>{email}</div>
        <div className={classes}>{proxy}</div>
        <div className='text-sm font-medium w-1/5 overflow-hidden mr-5'>
          <div className='flex flex-col h-full'>
            <div className='text-2xs'>
              v3 - {score.v3 ? score.v3 : "Untested"}
            </div>
            <div className='text-2xs'>
              v2i - {score.v2i ? score.v2i : "Untested"}
            </div>
            <div className='text-2xs'>
              v2v - {score.v2v ? score.v2v : "Untested"}
            </div>
          </div>
        </div>
        <div className='text-sm font-medium w-1/5 overflow-hidden mr-7'>
          {status}
        </div>
        <div className='flex flex-row ml-9'>
          <button onClick={onAction}>{getCorrectButton()}</button>
          <button className='mx-2' onClick={() => changeVis(true)}>
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
          <button onClick={deleteGmail}>
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

export default Task;
