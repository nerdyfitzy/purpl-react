import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Group, Gmail } from "../public/types/gmails";
import Actions from "../components/actions";
import Navbar from "../components/navbar";
import TopMenu from "../components/topMenu";
import CreateBtn from "../components/createBtn";
import TaskGroup from "../components/harvester/taskGroup";
import Header from "../components/harvester/header";
import Task from "../components/harvester/task";
import BottomBar from "../components/bottomBar";
import ImExC from "../components/importExportCopy";
import GroupModal from "../components/harvester/groupModal";
import AccountModal from "../components/harvester/addAccount";
import { ipcRenderer } from "electron";

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

function Home() {
  const [showGroup, changeVis] = useState(false);
  const [showAccount, changeAccModal] = useState(false);

  const [groups, addGroups] = useState<Array<Group>>([]);
  const [currentGroup, setCurrentGroup] = useState<string>("default");
  const [gmails, addGmails] = useState<Array<Gmail>>([]);
  const [selected, addSelected] = useState<Array<string>>([]);

  useEffect(() => {
    const newGroups = ipcRenderer.sendSync("load-gmails", {
      initial: true,
      groupID: undefined,
    });
    const g = Object.values(newGroups).map((group: any) => {
      const running = Object.values(group.gmails).filter(
        (gmail: Gmail) => gmail.running
      ).length;
      return {
        name: group.name,
        uuid: group.uuid,
        total: Object.values(group.gmails).length,
        running: running,
        stopped: Object.values(group.gmails).length - running,
      };
    });
    addGroups(g);
    if (newGroups["default"].gmails !== {}) getGmails("default");
    console.log(groups);
  }, []);
  const handleImport = (data) => {
    const g = Object.values(data).map((group: any) => {
      const running = Object.values(group.gmails).filter(
        (gmail: Gmail) => gmail.running
      ).length;
      return {
        name: group.name,
        uuid: group.uuid,
        total: Object.values(group.gmails).length,
        running: running,
        stopped: Object.values(group.gmails).length - running,
      };
    });
    addGroups(g);
    if (data["default"].gmails !== {}) getGmails("default");
  };

  const handleExport = () => {
    ipcRenderer.send("gmail-export");
  };

  const copyGroup = () => {
    const u = ipcRenderer.sendSync("copy-gmail-group", currentGroup);
    let [res] = groups.filter((obj) => obj.uuid === currentGroup);
    res.uuid = u;
    addGroups([...groups, res]);
  };

  const getGmails = (id: string) => {
    console.log("getting gmails of", id);
    const gmails = ipcRenderer.sendSync("load-gmails", {
      fromfile: false,
      groupID: id,
    });
    if (typeof gmails === "undefined") return;
    let startNum = 0;
    let stopNum = 0;
    const gmailsState = Object.values(gmails).map((gmail: Gmail) => {
      if (gmail.running) startNum++;
      else stopNum++;

      return {
        uuid: gmail.uuid,
        email: gmail.email,
        status: gmail.status,
        proxy: gmail.proxy,
        running: gmail.running,
        score: gmail.score,
      };
    });
    console.log(startNum, stopNum);
    incStartNumber(id, startNum, true);
    incStopNumber(id, stopNum, true);
    addGmails(gmailsState);
  };

  const addGroup = (group: Group) => {
    addGroups([...groups, group]);
  };

  const addGmail = (gmail: Gmail) => {
    addGmails([...gmails, gmail]);
    incStopNumber(currentGroup, 1, false);
  };

  const selectTask = (e) => {
    if (selected.includes(e)) {
      let copy = [...selected];
      const index = copy.indexOf(e);
      copy.splice(index, 1);
      addSelected(copy);
    } else {
      addSelected([...selected, e]);
    }

    console.log(selected);
  };
  const selectGroup = (e) => {
    setCurrentGroup(e);
    addSelected([]);
    getGmails(e);
  };
  const incStopNumber = (uuid: string, inc: number, change: boolean) => {
    let copy = [...groups];
    let [res] = groups.filter((obj) => obj.uuid === uuid);
    const index = groups.indexOf(res);
    if (index > -1) {
      res.stopped += inc;
      if (change) res.stopped = inc;
      copy[index] = res;
      addGroups(copy);
    }
  };
  const incStartNumber = (uuid: string, inc: number, change: boolean) => {
    let copy = [...groups];
    let [res] = groups.filter((obj) => obj.uuid === uuid);
    const index = groups.indexOf(res);
    if (index > -1) {
      res.running += inc;
      if (change) res.running = inc;
      copy[index] = res;
      addGroups(copy);
    }
  };

  const startAll = () => {
    ipcRenderer.send("start-all-gmails", currentGroup);
    let copy = [...gmails];
    copy.map((gmail) => (gmail.running = true));
    addGmails(copy);
  };

  const stopAll = () => {
    ipcRenderer.send("stop-all-gmails", currentGroup);
    let copy = [...gmails];
    copy.map((gmail) => (gmail.running = false));
    addGmails(copy);
  };

  const deleteAll = () => {
    ipcRenderer.send("delete-all-gmails", currentGroup);
    addGmails([]);
  };

  const handleGroupEdit = (uuid: string, name: string) => {
    let copy = [...groups];
    let [res] = groups.filter((obj) => obj.uuid === uuid);
    const index = groups.indexOf(res);
    if (index > -1) {
      res.name = name;
      copy[index] = res;
      addGroups(copy);
    }
  };

  const handleGroupDelete = (uuid: string) => {
    let copy = [...groups];
    let [res] = groups.filter((obj) => obj.uuid === uuid);
    const index = groups.indexOf(res);
    if (index > -1) {
      copy.splice(index, 1);
      addGroups(copy);
    }
  };

  const handleGmailEdit = (id: string, newGmail: Gmail) => {
    let copy = [...gmails];
    let [res] = gmails.filter((obj) => obj.uuid === id);
    const index = gmails.indexOf(res);
    if (index > -1) {
      copy[index] = newGmail;
      addGmails(copy);
    }
  };

  const handleGmailAction = (id: string) => {
    let copy = [...gmails];
    let [res] = gmails.filter((obj) => obj.uuid === id);
    const index = gmails.indexOf(res);
    if (index > -1) {
      copy[index].running = !copy[index].running;
      addGmails(copy);
    }
  };

  const handleGmailDelete = (id: string) => {
    let copy = [...gmails];
    let [res] = gmails.filter((obj) => obj.uuid === id);
    const index = gmails.indexOf(res);
    if (index > -1) {
      copy.splice(index, 1);
      addGmails(copy);
    }
  };

  const isBlurred = () => {
    if (showGroup || showAccount) return { filter: "blur(3px)" };
    return {};
  };
  return (
    <React.Fragment>
      <Actions />
      <GroupModal
        shown={showGroup}
        handleClose={() => changeVis(false)}
        handleSubmit={addGroup}
      />
      <AccountModal
        shown={showAccount}
        handleClose={() => changeAccModal(false)}
        group={currentGroup}
        handleSubmit={addGmail}
      />
      <div className='flex h-full' style={isBlurred()}>
        <Navbar page='harvester' />

        <div className='flex flex-col w-screen h-screen justify-start'>
          <div
            className='w-full h-1/4 flex flex-col flex-1 items-start justify-between py-8 pl-8'
            style={borderBottom}
          >
            <TopMenu />
            <div className='h-8'></div>
            <div className='font-semibold text-4xl'>Gmail Harvester</div>
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
              <div className='scrollbars'>
                {groups.map((group) => (
                  <TaskGroup
                    uuid={group.uuid}
                    isselected={currentGroup === group.uuid}
                    name={group.name}
                    stopped={group.stopped}
                    total={group.total}
                    running={group.running}
                    handleEdit={handleGroupEdit}
                    handleDelete={handleGroupDelete}
                    handleClick={selectGroup}
                  />
                ))}
              </div>
            </div>

            <div className='h-full ml-8 w-full'>
              <div
                className='font-semibold text-sm mt-8'
                style={{ color: "#6F6B75" }}
              >
                HARVESTERS
              </div>

              <div className='flex flex-row justify-between w-full'>
                <CreateBtn
                  text='Add Account'
                  handleClick={() => changeAccModal(true)}
                />

                <div className='flex flex-row items-center'>
                  <button
                    className='mr-4 flex flex-row justify-evenly items-center w-24 font-medium text-sm'
                    style={{ color: "#6F6B75" }}
                    onClick={startAll}
                  >
                    <svg
                      width='15'
                      height='15'
                      viewBox='0 0 8 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M2.38952 7.00059C2.08756 6.99955 1.79829 6.87903 1.58493 6.66536C1.37157 6.45169 1.25146 6.16224 1.25085 5.86029V2.13959C1.25085 1.93971 1.30346 1.74335 1.40341 1.57025C1.50335 1.39716 1.6471 1.25342 1.8202 1.15349C1.9933 1.05356 2.18966 1.00096 2.38954 1.00098C2.58942 1.00099 2.78577 1.05363 2.95885 1.15359L6.18004 3.01392C6.35309 3.11387 6.49679 3.2576 6.5967 3.43068C6.69661 3.60375 6.7492 3.80008 6.7492 3.99992C6.7492 4.19976 6.69661 4.39609 6.5967 4.56916C6.49679 4.74224 6.35309 4.88597 6.18004 4.98592L2.95884 6.84625C2.78596 6.9469 2.58957 7.00014 2.38952 7.00059Z'
                        fill='#B584FF'
                      />
                    </svg>
                    Start All
                  </button>
                  <button
                    className='mr-4 flex flex-row justify-evenly items-center w-24 font-medium text-sm'
                    style={{ color: "#6F6B75" }}
                    onClick={stopAll}
                  >
                    <svg
                      width='15'
                      height='15'
                      viewBox='0 0 8 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M3.99996 7.33317C3.34069 7.33317 2.69622 7.13767 2.14806 6.7714C1.5999 6.40513 1.17265 5.88454 0.920362 5.27545C0.66807 4.66636 0.602059 3.99614 0.730677 3.34954C0.859294 2.70293 1.17676 2.10899 1.64294 1.64282C2.10911 1.17664 2.70306 0.859172 3.34966 0.730554C3.99626 0.601937 4.66648 0.667948 5.27557 0.92024C5.88466 1.17253 6.40525 1.59977 6.77152 2.14794C7.1378 2.6961 7.33329 3.34057 7.33329 3.99984C7.33228 4.88358 6.98077 5.73084 6.35587 6.35574C5.73096 6.98065 4.88371 7.33216 3.99996 7.33317Z'
                        fill='#81C6DC'
                      />
                      <path
                        d='M4.99996 5.33317H2.99996C2.95618 5.33318 2.91283 5.32457 2.87238 5.30782C2.83194 5.29107 2.79519 5.26652 2.76423 5.23556C2.73328 5.20461 2.70872 5.16786 2.69198 5.12741C2.67523 5.08696 2.66661 5.04361 2.66663 4.99984V2.99984C2.66661 2.95606 2.67523 2.91271 2.69198 2.87226C2.70872 2.83182 2.73328 2.79506 2.76423 2.76411C2.79519 2.73315 2.83194 2.7086 2.87238 2.69185C2.91283 2.67511 2.95618 2.66649 2.99996 2.6665H4.99996C5.04374 2.66649 5.08709 2.67511 5.12753 2.69185C5.16798 2.7086 5.20473 2.73315 5.23569 2.76411C5.26664 2.79506 5.29119 2.83182 5.30794 2.87226C5.32469 2.91271 5.3333 2.95606 5.33329 2.99984V4.99984C5.3333 5.04361 5.32469 5.08696 5.30794 5.12741C5.29119 5.16786 5.26664 5.20461 5.23569 5.23556C5.20473 5.26652 5.16798 5.29107 5.12753 5.30782C5.08709 5.32457 5.04374 5.33318 4.99996 5.33317Z'
                        fill='#2D2738'
                      />
                    </svg>
                    Stop All
                  </button>
                  <button
                    className='mr-4 flex flex-row justify-evenly items-center w-24 font-medium text-sm'
                    style={{ color: "#6F6B75" }}
                    onClick={deleteAll}
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
                    page='harvester'
                    handleImport={handleImport}
                    handleExport={handleExport}
                    handleCopy={copyGroup}
                  />
                </div>
              </div>

              <div className='w-11/12 h-3/4'>
                <div
                  className='h-16 rounded-lg w-full flex flex-row justify-between px-4 items-center'
                  style={gradient}
                >
                  <div
                    className='h-8 w-8 text-center rounded-full align-middle leading-8'
                    style={{ background: "#9456F1" }}
                  >
                    #
                  </div>
                  <div
                    className='h-8 w-20 text-center rounded-lg align-middle leading-8'
                    style={{ background: "#9456F1" }}
                  >
                    Account
                  </div>
                  <div
                    className='h-8 w-20 text-center rounded-lg align-middle leading-8'
                    style={{ background: "#9456F1" }}
                  >
                    Proxy
                  </div>
                  <div
                    className='h-8 w-20 text-center rounded-lg align-middle leading-8'
                    style={{ background: "#9456F1" }}
                  >
                    Health
                  </div>
                  <div
                    className='h-8 w-20 text-center rounded-lg align-middle leading-8'
                    style={{ background: "#9456F1" }}
                  >
                    Status
                  </div>
                  <div
                    className='h-8 w-20 text-center rounded-lg align-middle leading-8'
                    style={{ background: "#9456F1" }}
                  >
                    Actions
                  </div>
                </div>
                <div className='scrollbars h-4/6'>
                  {gmails.map((gmail) => (
                    <Task
                      handleEdit={handleGmailEdit}
                      handleDelete={handleGmailDelete}
                      groupID={currentGroup}
                      handleClick={selectTask}
                      id={gmail.uuid}
                      score={gmail.score}
                      num={gmails.indexOf(gmail) + 1}
                      email={gmail.email}
                      proxy={gmail.proxy}
                      status={gmail.status}
                      running={gmail.running}
                      handleStart={handleGmailAction}
                    />
                  ))}
                </div>
              </div>
              {/* <div
                className='h-16 rounded-lg w-11/12 flex flex-row justify-between px-4 items-center'
                style={gradient}
              >
                <div
                  className='h-8 w-8 text-center rounded-full align-middle leading-8'
                  style={{ background: "#9456F1" }}
                >
                  #
                </div>
                <Header text='Account' />
                <Header text='Proxy' />
                <Header text='Status' />
                <Header text='Actions' />
              </div>
              <div className='flex flex-col justify-start'>
                <Task
                  num={1}
                  email='test@gmail.com'
                  proxy='127.0.0.1'
                  status='Logging in..'
                  running={true}
                />
                <Task
                  num={2}
                  email='testLONG1232131@gmail.com'
                  proxy='127.0.0.1'
                  status='Stopped'
                  running={false}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </React.Fragment>
  );
}

export default Home;
