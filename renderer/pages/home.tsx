import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Scrollbars } from "react-custom-scrollbars";

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
  return (
    <React.Fragment>
      <Actions />
      <div className='flex h-full'>
        <Navbar page='dashboard' />

        <div className='flex flex-col w-full h-full justify-start'>
          <div
            className='w-full h-1/4 flex flex-col flex-1 items-start justify-between py-8 pl-8'
            style={borderBottom}
          >
            <TopMenu />
            <div className='h-8'></div>
            <div className='font-semibold text-4xl'>Dashboard</div>
          </div>
        </div>
      </div>
      <BottomBar />
    </React.Fragment>
  );
}

export default Home;
