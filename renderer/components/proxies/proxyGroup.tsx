import { ipcRenderer } from "electron";
import React, { useContext, useState } from "react";
import { stateContext } from "../../pages/proxies";
import { ProxyType } from "../../public/types/proxies";
import ProxyGroup from "./addProxyGroup";
import toast from "react-hot-toast";

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

const TaskGroup = ({
  name,
  uuid,
  total,
  isSelected,
}: {
  name: string;
  uuid: string;
  total: number;
  isSelected: boolean;
}) => {
  console.log(name, uuid, total, isSelected);
  const [shown, changeVis] = useState(false);
  const [
    { changeGroups, setCurrentGroup, changeProxies, addSelected },
    { groups, currentGroup, proxies, selected },
  ] = useContext(stateContext);
  const selectGroup = () => {
    setCurrentGroup(uuid);
    addSelected([]);
    const proxies: { [k: string]: ProxyType } = ipcRenderer.sendSync(
      "load-proxies",
      {
        initial: false,
        group: uuid,
      }
    );
    if (typeof proxies === "undefined") return;
    console.log(proxies);
    const newProxies = Object.values(proxies);

    changeProxies(newProxies);
  };
  const getSelectedClasses = () => {
    if (isSelected) return selectedClasses;
    return gradient;
  };
  const editGroup = (newName) => {
    let copy = [...groups];
    let [res] = copy.filter((obj) => obj.uuid === uuid);
    const index = copy.indexOf(res);
    if (index > -1) {
      ipcRenderer.send("edit-proxy-group", { uuid, name: newName });
      res.name = newName;
      copy[index] = res;
      changeGroups(copy);
      toast.success("Edited Group!");
    }
  };
  const deleteGroup = () => {
    ipcRenderer.send("delete-proxy-group", uuid);
    let copy = [...groups];
    let res = copy.filter((obj) => obj.uuid !== uuid);
    changeGroups(res);
    toast.success("Deleted Group!");
  };
  return (
    <>
      <ProxyGroup
        shown={shown}
        edit={true}
        editedUuid={uuid}
        handleClose={() => changeVis(false)}
        handleSubmit={editGroup}
      ></ProxyGroup>
      <div
        className='flex flex-col mb-4 justify-between h-36 w-10/12 rounded-lg p-5 relative'
        style={getSelectedClasses()}
        id={uuid}
        onClick={selectGroup}
      >
        <div className='font-semibold text-md'>
          {name}
          <div
            className='text-sm font-medium mt-1'
            style={{ color: "#6F6B75" }}
          ></div>
        </div>

        <div
          className='relative rounded-md w-28 h-10'
          style={{ background: "#B584FF" }}
        >
          <div className='my-2 ml-2 align-middle font-medium text-sm'>
            <svg
              className='float-left mr-2'
              width='20'
              height='20'
              viewBox='0 0 10 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.62772 5.60156C7.25989 5.96137 6.78084 6.1869 6.25001 6.18757C6.13684 6.18757 6.02639 6.17604 5.91854 6.15638C5.90714 6.14561 5.89387 6.13741 5.88232 6.12681C6.61464 6.79884 7.08334 7.80634 7.08334 8.93757C7.08339 9.19062 6.89695 9.39585 6.6669 9.3959H9.16667C9.16675 9.3959 9.16683 9.3959 9.1669 9.3959C9.39695 9.39585 9.58339 9.19062 9.58334 8.93757C9.58334 7.45364 8.7804 6.17862 7.62772 5.60156Z'
                fill='#9456F1'
              />
              <path
                d='M3.75008 6.18734C2.59949 6.18734 1.66675 5.16132 1.66675 3.89567C1.66675 2.63002 2.59949 1.604 3.75008 1.604C4.90067 1.604 5.83341 2.63002 5.83341 3.89567C5.83206 5.16071 4.90011 6.18585 3.75008 6.18734Z'
                fill='#F7D8FF'
              />
              <path
                d='M3.75008 6.18734C2.59949 6.18734 1.66675 5.16132 1.66675 3.89567C1.66675 2.63002 2.59949 1.604 3.75008 1.604C4.90067 1.604 5.83341 2.63002 5.83341 3.89567C5.83206 5.16071 4.90011 6.18585 3.75008 6.18734Z'
                fill='#F7D8FF'
              />
              <path
                d='M5.1278 5.60156C4.75996 5.96137 4.28091 6.1869 3.75008 6.18757C3.21885 6.18757 2.73939 5.9621 2.3714 5.60206C1.21926 6.17935 0.416748 7.45405 0.416748 8.93757C0.416748 8.93765 0.416748 8.93774 0.416748 8.93782C0.416798 9.19088 0.603365 9.39596 0.833415 9.3959H6.66675C6.66682 9.3959 6.6669 9.3959 6.66698 9.3959C6.89703 9.39585 7.08346 9.19062 7.08341 8.93757C7.08341 7.45364 6.28047 6.17862 5.1278 5.60156Z'
                fill='#CFB1FF'
              />
              <path
                d='M6.25 1.604C5.77878 1.604 5.34902 1.78257 5 2.07271C5.11383 2.16735 5.21695 2.2743 5.31085 2.39215C5.33712 2.42483 5.36186 2.4587 5.38643 2.49295C5.43747 2.56487 5.48505 2.63847 5.52811 2.71688C5.56664 2.78604 5.60199 2.85723 5.63375 2.93097C5.65145 2.97277 5.6692 3.01383 5.68464 3.05694C5.72492 3.16744 5.7574 3.28191 5.78155 3.40027C5.7872 3.42838 5.79104 3.45686 5.79575 3.48537C5.81812 3.61875 5.83333 3.75493 5.83333 3.89567C5.83318 4.03994 5.81815 4.17972 5.79442 4.31604C5.79099 4.33627 5.78898 4.3568 5.78507 4.37683C5.76197 4.49214 5.72902 4.60298 5.69056 4.7109C5.67543 4.75429 5.66065 4.79726 5.64323 4.83933C5.60844 4.92166 5.56872 5.00083 5.52556 5.07753C5.417 5.27427 5.28315 5.44928 5.12761 5.60141C5.41552 5.7455 5.68145 5.93226 5.91852 6.15614C6.02638 6.17581 6.13683 6.18734 6.25 6.18734C7.40003 6.18586 8.33199 5.1607 8.33333 3.89567C8.33333 2.63002 7.40059 1.604 6.25 1.604Z'
                fill='#C29EFA'
              />
            </svg>
            {total} Proxies
          </div>
        </div>

        <button className='absolute bottom-5 right-5' onClick={deleteGroup}>
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
        </button>

        <button
          className='absolute bottom-5 right-16'
          onClick={() => changeVis(true)}
        >
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
        </button>
      </div>
    </>
  );
};

export default TaskGroup;
