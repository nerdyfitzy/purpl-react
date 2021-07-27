import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Scrollbars } from "react-custom-scrollbars";

import Actions from "../components/actions";
import Navbar from "../components/navbar";
import TopMenu from "../components/topMenu";
import CreateBtn from "../components/createBtn";
import TaskGroup from "../components/profiles/taskGroup";
import BottomBar from "../components/bottomBar";
import ImExC from "../components/importExportCopy";
import Profile from "../components/profiles/profile";
import GroupModal from "../components/harvester/groupModal";
import ProfileModal from "../components/profiles/addProfile";

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
  const [shown, changeVis] = useState(false);
  const [showProfModal, changeProfModal] = useState(false);
  return (
    <React.Fragment>
      <Actions />
      <GroupModal shown={shown} handleClose={() => changeVis(false)} />
      <ProfileModal
        shown={showProfModal}
        handleClose={() => changeProfModal(false)}
      />
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
              <Scrollbars className='' style={{ height: "90%" }} autoHide>
                <TaskGroup />
              </Scrollbars>
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
                    text='Add Profile'
                    handleClick={() => changeProfModal(true)}
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
                      className='w-full'
                      style={{ background: "#17131d" }}
                    />
                  </div>
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

                  <ImExC />
                </div>
              </div>
              <div className='flex flex-row flex-wrap'>
                <Profile
                  profName='test Prof'
                  addy='123 Test St.'
                  email='react@js.org'
                  last4='1234'
                  type='MasterCard'
                />
                <Profile
                  profName='test Prof2'
                  addy='1234 Test St.'
                  email='react@js.org'
                  last4='5678'
                  type='Visa'
                />
                <Profile
                  profName='test Prof3'
                  addy='1234 Test St.'
                  email='react@js.org'
                  last4='5678'
                  type='Visa'
                />
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
