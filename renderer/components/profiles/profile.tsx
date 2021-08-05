import { ipcRenderer } from "electron";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { stateContext } from "../../pages/profiles";
import ProfileModal from "./addProfile";
import { ContextMenuTrigger } from "react-contextmenu";

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

const greyText = {
  color: "#6F6B75",
};

export const modalContext = createContext(null);

const Profile = ({
  profName,
  addy,
  email,
  last4,
  type,
  uuid,
  isSelected,
}: {
  profName: string;
  addy: string;
  email: string;
  last4: string;
  type: string;
  uuid: string;
  isSelected: boolean;
}) => {
  const [shown, changeVis] = useState(false);
  const [
    { changeGroups, setCurrentGroup, changeProfiles, addSelected },
    { groups, currentGroup, profiles, selected },
  ] = useContext(stateContext);
  function Dot() {
    return (
      <div
        className='h-2 w-2 rounded-full'
        style={{ background: "#6F6B75" }}
      ></div>
    );
  }

  function typeCard() {
    switch (type) {
      case "MasterCard":
        return "/images/mastercard.png";
      case "Visa":
        return "/images/visa.png";
      case "AmericanExpress":
        return "/images/amex.png";
      default:
        return "/images/mastercard.png";
    }
  }

  const selectProf = () => {
    if (!selected.includes(uuid)) {
      addSelected([...selected, uuid]);
    } else {
      let copy = [...selected];
      copy.splice(copy.indexOf(uuid), 1);
      addSelected(copy);
    }
  };

  const deleteProfile = () => {
    ipcRenderer.send("delete-profile", { group: currentGroup, uuid });
    let copy = [...profiles];
    const [res] = copy.filter((obj) => obj.uuid === uuid);
    console.log(res);
    const index = copy.indexOf(res);
    if (index > -1) {
      copy.splice(index, 1);
      let groupsCopy = [...groups];
      groupsCopy = groupsCopy.filter((obj) => {
        obj.total = obj.uuid === currentGroup ? obj.total - 1 : obj.total;

        return true;
      });
      changeGroups(groupsCopy);
      changeProfiles(copy);
    }
    toast.success("Deleted Profile!");
  };

  const getClasses = () => {
    if (isSelected) return selectedClasses;
    return gradient;
  };

  const sub_classes = `font-medium text-sm flex flex-row items-center`;
  return (
    <>
      <modalContext.Provider value={{ changeProfiles, currentGroup, profiles }}>
        <ProfileModal
          shown={shown}
          handleClose={() => changeVis(false)}
          edit={true}
          editedUuid={uuid}
        />
      </modalContext.Provider>
      <ContextMenuTrigger id='profile'>
        <div
          className='flex flex-col mb-2 relative h-32 w-72 px-4 py-4 rounded-lg mr-2'
          style={getClasses()}
          id={uuid}
          onClick={selectProf}
        >
          <div className='font-semibold text-md flex flex-row justify-between w-full'>
            <div>{profName}</div>
            <div>
              <button className='' onClick={() => changeVis(true)}>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 7 7'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g opacity='0.5'>
                    <path
                      d='M2.11237 6.41683H0.874919C0.836614 6.41684 0.798682 6.40931 0.763291 6.39465C0.7279 6.38 0.695743 6.35851 0.668657 6.33143C0.641571 6.30434 0.620088 6.27218 0.605434 6.23679C0.590779 6.2014 0.583242 6.16347 0.583252 6.12517V4.88757C0.583249 4.84927 0.590795 4.81135 0.605458 4.77596C0.620122 4.74058 0.641615 4.70844 0.66871 4.68137L4.68196 0.668945C4.70904 0.641855 4.74119 0.620366 4.77657 0.605704C4.81196 0.591042 4.84988 0.583496 4.88818 0.583496C4.92648 0.583496 4.96441 0.591042 4.99979 0.605704C5.03518 0.620366 5.06733 0.641855 5.0944 0.668945L6.33113 1.9054C6.35822 1.93247 6.37971 1.96462 6.39437 2C6.40903 2.03539 6.41658 2.07331 6.41658 2.11161C6.41658 2.14991 6.40903 2.18784 6.39437 2.22322C6.37971 2.25861 6.35822 2.29075 6.33113 2.31783L2.31858 6.33138C2.26389 6.38608 2.18972 6.41682 2.11237 6.41683Z'
                      fill='#9C9C9E'
                    />
                    <path
                      d='M6.33124 1.9054L5.09452 0.668945C5.06744 0.641855 5.03529 0.620366 4.99991 0.605704C4.96453 0.591042 4.9266 0.583496 4.8883 0.583496C4.85 0.583496 4.81207 0.591042 4.77669 0.605704C4.74131 0.620366 4.70916 0.641855 4.68208 0.668945L3.65039 1.70053L5.29956 3.34935L6.33124 2.31783C6.35833 2.29075 6.37982 2.25861 6.39449 2.22322C6.40915 2.18784 6.41669 2.14991 6.41669 2.11161C6.41669 2.07331 6.40915 2.03539 6.39449 2C6.37982 1.96462 6.35833 1.93247 6.33124 1.9054Z'
                      fill='#6F6B75'
                    />
                  </g>
                </svg>
              </button>
              <button className='ml-5' onClick={deleteProfile}>
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
          <div className={sub_classes} style={greyText}>
            <svg
              className='mr-2'
              width='15'
              height='15'
              viewBox='0 0 8 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.6 3.96667L6.8 2.9C6.6 2.63333 6.3 2.5 6 2.5H5.33333V5.83333C5.33333 6.03333 5.2 6.16667 5 6.16667H7.33333C7.53333 6.16667 7.66667 6.03333 7.66667 5.83333V4.16667C7.66667 4.1 7.63333 4.03333 7.6 3.96667Z'
                fill='#CFB1FF'
              />
              <path
                d='M4.99992 6.16683H0.666585C0.466585 6.16683 0.333252 6.0335 0.333252 5.8335V1.8335C0.333252 1.26683 0.766585 0.833496 1.33325 0.833496H4.33325C4.89992 0.833496 5.33325 1.26683 5.33325 1.8335V5.8335C5.33325 6.0335 5.19992 6.16683 4.99992 6.16683Z'
                fill='#B889FF'
              />
              <path
                d='M5.33333 4.16667H7.66667C7.66667 4.1 7.63333 4.03333 7.6 3.96667L6.8 2.9C6.6 2.63333 6.3 2.5 6 2.5H5.33333V4.16667ZM2 7.16667C1.43333 7.16667 1 6.73333 1 6.16667C1 5.6 1.43333 5.16667 2 5.16667C2.56667 5.16667 3 5.6 3 6.16667C3 6.73333 2.56667 7.16667 2 7.16667ZM6 7.16667C5.43333 7.16667 5 6.73333 5 6.16667C5 5.6 5.43333 5.16667 6 5.16667C6.56667 5.16667 7 5.6 7 6.16667C7 6.73333 6.56667 7.16667 6 7.16667Z'
                fill='#9456F1'
              />
            </svg>
            {addy}
          </div>

          <div className={sub_classes} style={greyText}>
            <svg
              className='mr-2'
              width='15'
              height='15'
              viewBox='0 0 9 9'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8.1375 2.14125C8.04662 1.94958 7.90326 1.7876 7.72405 1.6741C7.54484 1.5606 7.33713 1.50023 7.125 1.5H1.875C1.66287 1.50023 1.45516 1.5606 1.27595 1.6741C1.09674 1.7876 0.953381 1.94958 0.8625 2.14125C0.78879 2.29188 0.750319 2.4573 0.75 2.625V6.375C0.750877 6.6731 0.869686 6.95874 1.08047 7.16953C1.29126 7.38031 1.5769 7.49912 1.875 7.5H7.125C7.4231 7.49912 7.70874 7.38031 7.91953 7.16953C8.13031 6.95874 8.24912 6.6731 8.25 6.375V2.625C8.24968 2.4573 8.21121 2.29188 8.1375 2.14125Z'
                fill='#D5F5FF'
              />
              <path
                d='M8.13755 2.14125L5.29505 4.98375C5.19075 5.08834 5.06685 5.17132 4.93043 5.22794C4.794 5.28456 4.64775 5.31371 4.50005 5.31371C4.35234 5.31371 4.20609 5.28456 4.06967 5.22794C3.93325 5.17132 3.80934 5.08834 3.70505 4.98375L0.862549 2.14125C0.95343 1.94958 1.09679 1.7876 1.276 1.6741C1.45521 1.5606 1.66292 1.50023 1.87505 1.5H7.12505C7.33718 1.50023 7.54489 1.5606 7.7241 1.6741C7.90331 1.7876 8.04667 1.94958 8.13755 2.14125Z'
                fill='#81C6DC'
              />
            </svg>
            {email}
          </div>
          <div className='flex flex-row items-center text-sm font-medium'>
            <Dot />
            <Dot />
            <Dot />
            <Dot />
            <div className='mx-1'></div>
            <Dot />
            <Dot />
            <Dot />
            <Dot />
            <div className='mx-1'></div>
            <Dot />
            <Dot />
            <Dot />
            <Dot />
            <div className='mx-1'></div>
            {last4}
          </div>

          <img
            src={typeCard()}
            className='relative left-52 bottom-5 w-10 h-10'
          />
        </div>
      </ContextMenuTrigger>
    </>
  );
};

export default Profile;
