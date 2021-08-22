import React, { createContext, useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { Scrollbars } from "react-custom-scrollbars";
import {
  Address,
  Payment,
  Prof,
  Group,
  FormattedProfile,
} from "../public/types/profiles";
import { HotKeys } from "react-hotkeys";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import Actions from "../components/actions";
import Navbar from "../components/navbar";
import TopMenu from "../components/topMenu";
import CreateBtn from "../components/createBtn";
import TaskGroup from "../components/profiles/profileGroup";
import BottomBar from "../components/bottomBar";
import ImExC from "../components/importExportCopy";
import Profile from "../components/profiles/profile";
import GroupModal from "../components/profiles/profGroupModal";
import ProfileModal from "../components/profiles/addProfile";
import { ipcRenderer, remote } from "electron";
import toast from "react-hot-toast";
import ExportModal from "../components/profiles/exportModal";
import ImportModal from "../components/profiles/importModal";
import JigModal from "../components/profiles/jigModal";
import VCCModal from "../components/profiles/vccModal";

//this is the harvester for now just to get the hang of it

const borderBottom = {
  borderColor: "#37324080",
  borderBottomWidth: "2px",
};

const borderRight = {
  borderColor: "#37324080",
  borderRightWidth: "2px",
};

const gradient = {
  background:
    "linear-gradient(97.17deg, #332E3A 13.22%, rgba(51, 46, 58, 0) 127.05%)",
};

export const stateContext = createContext(null);

function Home() {
  const [shown, changeVis] = useState(false);
  const [showProfModal, changeProfModal] = useState(false);
  const [showExportModal, changeExportModal] = useState(false);
  const [showImportModal, changeImportModal] = useState(false);
  const [jigModal, setJigModal] = useState(false);
  const [vccModal, setvccModal] = useState(false);

  const [groups, changeGroups] = useState<Array<Group>>([]);
  const [currentGroup, setCurrentGroup] = useState<string>("default");
  const [profiles, changeProfiles] = useState<Array<FormattedProfile>>([]);
  const [selected, addSelected] = useState<Array<string>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState<
    Array<FormattedProfile>
  >([]);

  const shift = useRef(false);
  const ctrl = useRef(false);

  const searchInput = useRef(null);

  const selectAll = () => {
    addSelected([]);
    addSelected(profiles.map((prof) => prof.uuid));
  };

  const deselAll = () => {
    addSelected([]);
  };

  const handlers = {
    SELECT_ALL: selectAll,
    DESELECT_ALL: deselAll,
  };

  useEffect(() => {
    const win = remote.getCurrentWindow();
    win.webContents.on("before-input-event", (event, input) => {
      console.log(input.control, input.shift);
      ctrl.current = input.control;
      shift.current = input.shift;
    });

    const groups = ipcRenderer.sendSync("load-profiles", {
      initial: true,
      group: undefined,
    });
    const formattedGroups = Object.values(groups).map((group: any) => ({
      name: group.name,
      uuid: group.uuid,
      total: Object.values(group.profiles).length,
    }));
    changeGroups(formattedGroups);
    if (Object.values(groups["default"].profiles).length > 0) {
      const profs = ipcRenderer.sendSync("load-profiles", {
        initial: false,
        group: "default",
      });
      console.log(profs);
      const formattedProfs = Object.values(profs).map((profile: any) => ({
        uuid: profile.uuid,
        name: profile.profile_name,
        address: profile.shipping.addy1,
        email: profile.email,
        type: profile.payment.type,
        last4: profile.payment.cnb.substring(profile.payment.cnb.length - 4),
      }));

      changeProfiles(formattedProfs);
    }
  }, []);

  const changeStates = [
    {
      changeGroups,
      setCurrentGroup,
      changeProfiles,
      addSelected,
    },
    {
      groups,
      currentGroup,
      profiles,
      selected,
      shift,
      ctrl,
    },
  ];

  const addGroup = (group: Group) => {
    changeGroups([...groups, group]);
  };
  const copyGroup = () => {
    if (selected.length > 0) {
      let newProfiles = ipcRenderer.sendSync("copy-profiles", {
        profiles: selected,
        group: currentGroup,
      });
      toast.success("Copied Selected Profiles!");
      newProfiles = newProfiles.map((prof: Prof) => ({
        uuid: prof.uuid,
        name: prof.profile_name,
        address: prof.shipping.addy1,
        email: prof.email,
        last4: prof.payment.cnb.substring(prof.payment.cnb.length - 4),
        type: prof.payment.type,
      }));
      let c = groups.filter((obj) => {
        obj.total =
          obj.uuid === currentGroup ? obj.total + selected.length : obj.total;
        return true;
      });
      changeProfiles([...profiles, ...newProfiles]);

      changeGroups(c);
    }
  };
  const deleteSelected = () => {
    ipcRenderer.send("delete-selected-profiles", {
      profiles: selected,
      group: currentGroup,
    });
    let c = profiles.filter((obj) => !selected.includes(obj.uuid));
    changeProfiles(c);
    addSelected([]);
  };
  const exportProfiles = () => {};
  const importProfiles = () => {};
  const deleteAllProfiles = () => {
    ipcRenderer.send("delete-all-profs", currentGroup);
    toast.success("Deleted All Profiles!");
    changeProfiles([]);
    let copy = [...groups];
    let [res] = copy.filter((obj) => obj.uuid === currentGroup);
    const index = copy.indexOf(res);
    if (index > -1) {
      res.total = 0;
      copy[index] = res;
      changeGroups(copy);
    }
  };
  const filterProfs = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
    const val = e.target.value;
    let copy = [...profiles];
    copy = copy.filter((obj) => {
      console.log(obj.name, val, obj.name.includes(val));
      return obj.name.includes(val);
    });
    console.log(copy);
    setFilteredProfiles(copy);
  };
  const jigProfiles = (options) => {
    const jigged: Group = ipcRenderer.sendSync("jig-profiles", {
      group: currentGroup,
      selected,
      options,
    });

    toast.success(`Jigged ${selected.length} profiles!`);

    const formatted = Object.values(jigged.profiles).map((prof: Prof) => ({
      uuid: prof.uuid,
      name: prof.profile_name,
      address: prof.shipping.addy1,
      email: prof.email,
      last4: prof.payment.cnb.substring(prof.payment.cnb.length - 4),
      type: prof.payment.type,
    }));

    changeProfiles(formatted);
    addSelected([]);
  };

  const genVCCs = () => {
    ipcRenderer.on("vcc-reply", (event, profs) => {
      console.log(profs);
      changeGroups([
        ...groups,
        {
          name: profs.name,
          uuid: profs.uuid,
          total: Object.values(profs.profiles).length,
        },
      ]);
    });
  };
  return (
    <React.Fragment>
      <HotKeys handlers={handlers}>
        <Actions />
        <GroupModal
          edit={false}
          shown={shown}
          handleClose={() => changeVis(false)}
          handleSubmit={addGroup}
        />

        <JigModal
          shown={jigModal}
          handleClose={() => setJigModal(false)}
          handleSubmit={jigProfiles}
        />

        <VCCModal
          shown={vccModal}
          handleClose={() => setvccModal(false)}
          handleSubmit={genVCCs}
        />

        <stateContext.Provider
          value={{
            changeProfiles,
            currentGroup,
            profiles,
            selected,
            changeGroups,
            groups,
            setCurrentGroup,
          }}
        >
          <ExportModal
            shown={showExportModal}
            handleClose={() => changeExportModal(false)}
          />
          <ImportModal
            shown={showImportModal}
            handleClose={() => changeImportModal(false)}
          />
          <ProfileModal
            shown={showProfModal}
            handleClose={() => changeProfModal(false)}
          />
        </stateContext.Provider>
        <div className='flex h-full'>
          <Navbar page='profiles' />

          <div className='flex flex-col w-full h-full justify-start'>
            <div
              className='w-full h-1/4 flex flex-col flex-1 items-start justify-between py-8 pl-8'
              style={borderBottom}
            >
              <TopMenu />
              <div className='h-8'></div>
              <div className='font-semibold text-4xl'>Profiles</div>
            </div>

            <div className='w-full h-screen flex flex-row'>
              <div
                style={borderRight}
                className='w-4/12 h-screen flex flex-col pl-8 pt-8'
              >
                <div
                  className='text-sm font-semibold'
                  style={{ color: "#6F6B75" }}
                >
                  GROUPS
                </div>

                <CreateBtn
                  text='Create Group'
                  handleClick={() => changeVis(true)}
                />
                <div className='scrollbars h-3/5'>
                  <stateContext.Provider value={changeStates}>
                    {groups.map((group) => (
                      <TaskGroup
                        name={group.name}
                        total={group.total}
                        uuid={group.uuid}
                        isselected={group.uuid === currentGroup}
                      />
                    ))}
                  </stateContext.Provider>
                </div>
              </div>

              <div className='h-full ml-8 w-full'>
                <div
                  className='font-semibold text-sm mt-8'
                  style={{ color: "#6F6B75" }}
                >
                  LIST (
                  {filteredProfiles.length === 0
                    ? profiles.length
                    : filteredProfiles.length}{" "}
                  Total, {selected.length} Selected)
                </div>

                <div className='flex flex-row justify-between w-full items-center'>
                  <div className='flex flex-row justify-between items-center'>
                    <CreateBtn
                      text='Add Profile'
                      handleClick={() => changeProfModal(true)}
                    />
                    <CreateBtn
                      text='Generate VCCs'
                      handleClick={() => setvccModal(true)}
                      className='rounded-lg h-10 w-36 my-6 ml-2 flex flex-row justify-evenly items-center'
                    />
                    <div
                      className='flex flex-row justify-between border-2 rounded-md h-10 w-48 ml-5'
                      style={{ borderColor: "#6F6B75" }}
                    >
                      <svg
                        width='35'
                        height='35'
                        viewBox='0 0 10 10'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M4.58341 7.49984C2.97259 7.49984 1.66675 6.194 1.66675 4.58317C1.66675 2.97234 2.97259 1.6665 4.58341 1.6665C6.19424 1.6665 7.50008 2.97234 7.50008 4.58317C7.49827 6.19325 6.19349 7.49803 4.58341 7.49984Z'
                          fill='#CCCCCC'
                        />
                        <path
                          d='M4.58325 0.833496C2.51218 0.833496 0.833252 2.51242 0.833252 4.5835C0.833252 6.65457 2.51218 8.3335 4.58325 8.3335C6.65336 8.33115 8.33091 6.6536 8.33325 4.5835C8.33325 2.51242 6.65433 0.833496 4.58325 0.833496ZM4.58325 7.50016C2.97243 7.50016 1.66659 6.19432 1.66659 4.5835C1.66659 2.97268 2.97243 1.66683 4.58325 1.66683C6.19407 1.66683 7.49992 2.97268 7.49992 4.5835C7.49811 6.19358 6.19334 7.49836 4.58325 7.50016Z'
                          fill='#8E8E8E'
                        />
                        <path
                          d='M9.04402 8.4551L7.51031 6.92139C7.3362 7.139 7.13876 7.33645 6.92114 7.51055L8.45483 9.04429C8.45516 9.04462 8.45549 9.04495 8.4558 9.04528C8.61878 9.20771 8.88258 9.20728 9.04501 9.04429C9.20744 8.88133 9.20698 8.61753 9.04402 8.4551Z'
                          fill='#6F6B75'
                        />
                      </svg>
                      <input
                        type='text'
                        placeholder='Search Profiles'
                        name='search'
                        className='w-full my-auto'
                        style={{ background: "#17131d" }}
                        onChange={(event) => filterProfs(event)}
                      />
                    </div>
                  </div>

                  <div className='flex flex-row items-center'>
                    <button
                      onClick={deleteAllProfiles}
                      className='mr-4 flex flex-row justify-evenly items-center w-24 font-medium text-sm'
                      style={{ color: "#6F6B75" }}
                    >
                      <svg
                        width='15'
                        height='15'
                        viewBox='0 0 9 9'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M7.5 2.25H6V1.875C5.99931 1.25395 5.49605 0.750686 4.875 0.75H4.125C3.50395 0.750686 3.00069 1.25395 3 1.875V2.25H1.5C1.29288 2.25 1.125 2.41788 1.125 2.625C1.125 2.83212 1.29288 3 1.5 3H3.375H5.625C5.62507 3 5.62514 3 5.62521 3H7.5C7.70712 3 7.875 2.83212 7.875 2.625C7.875 2.41788 7.70712 2.25 7.5 2.25ZM3.75 2.25V1.875C3.75021 1.66798 3.91798 1.50021 4.125 1.5H4.875C5.08202 1.50021 5.24979 1.66798 5.25 1.875V2.25H3.75ZM3.75 3.75C3.54288 3.75 3.375 3.91788 3.375 4.125V6.375C3.375 6.37507 3.375 6.37514 3.375 6.37521C3.37505 6.58225 3.54295 6.75004 3.75 6.75C3.75007 6.75 3.75014 6.75 3.75021 6.75C3.95725 6.74996 4.12505 6.58205 4.125 6.375V4.125C4.125 3.91788 3.95712 3.75 3.75 3.75ZM5.25 3.75C5.04288 3.75 4.875 3.91788 4.875 4.125V6.375C4.875 6.37507 4.875 6.37514 4.875 6.37521C4.87505 6.58225 5.04295 6.75004 5.25 6.75C5.25007 6.75 5.25014 6.75 5.25021 6.75C5.45725 6.74996 5.62504 6.58205 5.625 6.375V4.125C5.625 3.91788 5.45712 3.75 5.25 3.75Z'
                          fill='#D0CBDE'
                        />
                        <path
                          d='M1.875 3V7.125C1.87569 7.74605 2.37895 8.24931 3 8.25H6C6.62105 8.24931 7.12431 7.74605 7.125 7.125V3H1.875ZM4.125 6.375C4.12505 6.58205 3.95725 6.74995 3.75021 6.75C3.75014 6.75 3.75007 6.75 3.75 6.75C3.54296 6.75005 3.37504 6.58225 3.375 6.37521C3.375 6.37514 3.375 6.37507 3.375 6.375V4.125C3.375 3.91788 3.54288 3.75 3.75 3.75C3.95712 3.75 4.125 3.91788 4.125 4.125V6.375ZM5.625 6.375C5.62505 6.58205 5.45725 6.74995 5.25021 6.75C5.25014 6.75 5.25007 6.75 5.25 6.75C5.04295 6.75005 4.87505 6.58225 4.875 6.37521C4.875 6.37514 4.875 6.37507 4.875 6.375V4.125C4.875 3.91788 5.04288 3.75 5.25 3.75C5.45712 3.75 5.625 3.91788 5.625 4.125V6.375Z'
                          fill='#6F6B75'
                        />
                      </svg>
                      Delete All
                    </button>

                    <ImExC
                      page='profiles'
                      handleCopy={copyGroup}
                      handleExport={() => changeExportModal(true)}
                      handleImport={() => changeImportModal(true)}
                    />
                  </div>
                </div>
                <div className='flex flex-row scrollbars flex-wrap h-3/6'>
                  <stateContext.Provider value={changeStates}>
                    {searchTerm === ""
                      ? profiles.map((profile) => (
                          <Profile
                            profName={profile.name}
                            addy={profile.address}
                            last4={profile.last4}
                            email={profile.email}
                            type={profile.type}
                            uuid={profile.uuid}
                            isSelected={selected.includes(profile.uuid)}
                          />
                        ))
                      : filteredProfiles.map((profile) => (
                          <Profile
                            profName={profile.name}
                            addy={profile.address}
                            last4={profile.last4}
                            email={profile.email}
                            type={profile.type}
                            uuid={profile.uuid}
                            isSelected={selected.includes(profile.uuid)}
                          />
                        ))}
                  </stateContext.Provider>
                </div>

                <ContextMenu id='profile'>
                  <MenuItem onClick={copyGroup}>Copy Selected</MenuItem>
                  <MenuItem onClick={() => setJigModal(true)}>
                    Jig Selected
                  </MenuItem>
                  <MenuItem>Move Selected</MenuItem>
                  <MenuItem onClick={deleteSelected}>Delete Selected</MenuItem>
                  <MenuItem>Export Selected</MenuItem>
                </ContextMenu>
              </div>
            </div>
          </div>
        </div>

        <BottomBar />
      </HotKeys>
    </React.Fragment>
  );
}

export default Home;
