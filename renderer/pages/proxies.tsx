import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Scrollbars } from "react-custom-scrollbars";

import Actions from "../components/actions";
import Navbar from "../components/navbar";
import TopMenu from "../components/topMenu";
import CreateBtn from "../components/createBtn";
import TaskGroup from "../components/proxies/proxyGroup";
import Header from "../components/harvester/header";
import Proxy from "../components/proxies/proxy";
import BottomBar from "../components/bottomBar";
import ImExC from "../components/importExportCopy";
import Profile from "../components/profiles/profile";
import GroupModal from "../components/proxies/addProxyGroup";
import ProxyModal from "../components/proxies/addProxies";

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
  const [showProxy, changePModal] = useState(false);
  const isBlurred = () => {
    if (showGroup || showProxy) return { filter: "blur(3px)" };
    return {};
  };
  return (
    <React.Fragment>
      <Actions />
      <GroupModal shown={showGroup} handleClose={() => changeVis(false)} />
      <ProxyModal shown={showProxy} handleClose={() => changePModal(false)} />
      <div className='flex h-full' style={isBlurred()}>
        <Navbar page='proxies' />

        <div className='flex flex-col w-full h-full justify-start'>
          <div
            className='w-full h-1/4 flex flex-col flex-1 items-start justify-between py-8 pl-8'
            style={borderBottom}
          >
            <TopMenu />
            <div className='h-8'></div>
            <div className='font-semibold text-4xl'>Proxies</div>
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
              <div className='scrollbars' style={{ height: "90%" }}>
                <TaskGroup />
              </div>
            </div>

            <div className='h-full ml-8 w-full'>
              <div
                className='font-semibold text-sm mt-8'
                style={{ color: "#6F6B75" }}
              >
                LIST
              </div>

              <div className='flex flex-row justify-between w-full items-center'>
                <div className='flex flex-row justify-between items-center'>
                  <CreateBtn
                    text='Add Proxies'
                    handleClick={() => changePModal(true)}
                  />
                </div>

                <div className='flex flex-row items-center'>
                  <button
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
                  <button
                    className='h-10 w-44 flex flex-row items-center rounded-md justify-evenly mr-4 font-medium text-sm'
                    style={{ background: "#B584FF" }}
                  >
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 11 11'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M9.16654 5.50036C9.16654 5.24722 9.37173 5.04203 9.62488 5.04203H10.0603C9.97053 4.14575 9.61816 3.29592 9.04737 2.5991L9.04815 2.60022L8.74074 2.90764C8.56193 3.08564 8.27287 3.08561 8.09406 2.90761C7.91465 2.72902 7.91401 2.43884 8.0926 2.25944L8.39998 1.95206C7.70337 1.3818 6.85401 1.02966 5.95821 0.939941V1.37536C5.95745 1.62817 5.75268 1.83294 5.49987 1.8337C5.24707 1.83294 5.0423 1.62817 5.04154 1.37536V0.939941C4.14574 1.02966 3.29638 1.3818 2.59977 1.95206L2.90715 2.25944C2.90827 2.26053 2.90936 2.26165 2.91047 2.26274C3.08853 2.44265 3.08707 2.73285 2.90717 2.91094C2.72727 3.089 2.43709 3.08754 2.25901 2.90764L1.9516 2.60025C1.38139 3.29687 1.02917 4.14623 0.939453 5.04203H1.37487C1.62768 5.04279 1.83245 5.24756 1.83321 5.50036C1.83245 5.75317 1.62768 5.95794 1.37487 5.9587H0.939453C0.98866 6.44808 1.12162 6.90661 1.30933 7.3337H9.69674C9.88398 6.90527 10.0115 6.44433 10.0603 5.9587H9.62488C9.37173 5.9587 9.16654 5.7535 9.16654 5.50036Z'
                        fill='#F7D8FF'
                      />
                      <path
                        d='M1.302 7.33301C2.31221 9.65148 5.01064 10.712 7.32911 9.70181C8.38957 9.23975 9.23585 8.39346 9.69792 7.33301H1.302Z'
                        fill='#CFB1FF'
                      />
                      <path
                        d='M5.50008 6.875C5.24702 6.87506 5.04181 6.66997 5.04175 6.4169C5.04175 6.41683 5.04175 6.41674 5.04175 6.41667V3.20833C5.04175 2.9552 5.24695 2.75 5.50008 2.75C5.75321 2.75 5.95841 2.9552 5.95841 3.20833V6.41667C5.95848 6.66973 5.75338 6.87494 5.50032 6.875C5.50024 6.875 5.50016 6.875 5.50008 6.875Z'
                        fill='#9456F1'
                      />
                      <path
                        d='M9.04758 2.59908C8.85089 2.36571 8.6347 2.14952 8.40133 1.95283L8.40018 1.95201L8.0928 2.2594C7.91421 2.43879 7.91487 2.72899 8.09426 2.90758C8.27308 3.08558 8.56213 3.08559 8.74096 2.9076L9.04837 2.60018L9.04758 2.59908ZM5.50008 1.83366C5.7529 1.8329 5.95766 1.62814 5.95842 1.37533V0.939909C5.80716 0.926159 5.65591 0.916992 5.50008 0.916992C5.34425 0.916992 5.193 0.926159 5.04175 0.939909V1.37533C5.0425 1.62814 5.24726 1.8329 5.50008 1.83366ZM1.83341 5.50033C1.83266 5.24751 1.6279 5.04275 1.37508 5.04199H0.939665C0.925915 5.19324 0.916748 5.34449 0.916748 5.50033C0.916748 5.65616 0.925915 5.80741 0.939665 5.95866H1.37508C1.6279 5.9579 1.83266 5.75314 1.83341 5.50033ZM2.25921 2.9076C2.43729 3.08749 2.72748 3.08897 2.90738 2.91089C3.08728 2.73281 3.08875 2.44261 2.91067 2.26271C2.90957 2.2616 2.90846 2.2605 2.90735 2.2594L2.59997 1.95202L2.59883 1.95283C2.36547 2.14952 2.14927 2.36571 1.95258 2.59908L1.95177 2.60019L2.25921 2.9076ZM10.0605 5.04199H9.62508C9.37195 5.04199 9.16675 5.24719 9.16675 5.50033C9.16675 5.75346 9.37195 5.95866 9.62508 5.95866H10.0605C10.0742 5.80741 10.0834 5.65616 10.0834 5.50033C10.0834 5.34449 10.0742 5.19324 10.0605 5.04199Z'
                        fill='#CFB1FF'
                      />
                      <path
                        d='M5.50008 8.02116C4.86726 8.02116 4.35425 7.50815 4.35425 6.87533C4.35425 6.2425 4.86726 5.72949 5.50008 5.72949C6.13291 5.72949 6.64591 6.2425 6.64591 6.87533C6.64523 7.50787 6.13262 8.02047 5.50008 8.02116Z'
                        fill='#9456F1'
                      />
                    </svg>
                    Test Proxy Speed
                  </button>
                  <button
                    className='mr-10 rounded-md h-10 w-10'
                    style={{ background: "#81C6DC" }}
                  >
                    <svg
                      className='m-auto'
                      width='20'
                      height='20'
                      viewBox='0 0 11 11'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M7.33337 4.12484C6.82711 4.12484 6.41671 3.71443 6.41671 3.20817V0.916505H4.58337C3.825 0.915492 3.20939 1.52946 3.20838 2.28783C3.20838 2.28906 3.20838 2.29028 3.20838 2.29151V6.87484C3.20736 7.63322 3.82133 8.24883 4.5797 8.24984C4.58093 8.24984 4.58215 8.24984 4.58337 8.24984H8.25004C9.00842 8.25085 9.62403 7.63689 9.62504 6.87851C9.62504 6.87729 9.62504 6.87606 9.62504 6.87484V4.12484H7.33337Z'
                        fill='#D5F5FF'
                      />
                      <path
                        d='M4.58334 8.25C4.5821 8.25 4.5809 8.25 4.57967 8.25C3.82128 8.24899 3.20733 7.63339 3.20833 6.875V2.75H2.75C1.99162 2.74899 1.37601 3.36295 1.375 4.12133C1.375 4.12257 1.375 4.12377 1.375 4.125V8.70833C1.37399 9.46672 1.98795 10.0823 2.74633 10.0833C2.74757 10.0833 2.74877 10.0833 2.75 10.0833H6.41667C7.17505 10.0843 7.79066 9.47039 7.79167 8.712C7.79167 8.71077 7.79167 8.70957 7.79167 8.70833V8.25H4.58334Z'
                        fill='#ABEBFF'
                      />
                      <path
                        d='M9.62496 4.12484H7.33329C6.82703 4.12484 6.41663 3.71443 6.41663 3.20817V0.916504L9.62496 4.12484Z'
                        fill='white'
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='w-11/12'>
                <div
                  className='h-16 rounded-lg w-11/12 flex flex-row justify-between px-4 items-center'
                  style={gradient}
                >
                  <div
                    className='h-8 w-20 text-center rounded-lg align-middle leading-8'
                    style={{ background: "#9456F1" }}
                  >
                    IP
                  </div>
                  <div
                    className='h-8 w-20 text-center rounded-lg align-middle leading-8'
                    style={{ background: "#9456F1" }}
                  >
                    Port
                  </div>
                  <div
                    className='h-8 w-20 text-center rounded-lg align-middle leading-8'
                    style={{ background: "#9456F1" }}
                  >
                    Username
                  </div>
                  <div
                    className='h-8 w-20 text-center rounded-lg align-middle leading-8'
                    style={{ background: "#9456F1" }}
                  >
                    Password
                  </div>
                  <div
                    className='h-8 w-20 text-center rounded-lg align-middle leading-8'
                    style={{ background: "#9456F1" }}
                  >
                    Speed
                  </div>
                  <div
                    className='h-8 w-20 text-center rounded-lg align-middle leading-8'
                    style={{ background: "#9456F1" }}
                  >
                    Actions
                  </div>
                </div>
                <div className='scrollbars'>
                  <Proxy
                    ip='127.0.0.1'
                    port='8888'
                    user='nerdy'
                    pass='fitzy'
                    speed={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </React.Fragment>
  );
}

export default Home;
