import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  XYPlot,
  VerticalBarSeries,
  LineSeries,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
  Crosshair,
} from "react-vis";
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
import Purchases from "../components/dashboard/purchaseCounter";
import Spent from "../components/dashboard/spent";
import CheckoutGraph from "../components/dashboard/checkoutGraph";
import ProfitGraph from "../components/dashboard/profitGraph";
import Calendar from "../components/dashboard/calendar";
import Checkout from "../components/dashboard/checkout";
import EventEmitter from "events";

//this is the harvester for now just to get the hang of it

const borderBottom = {
  borderColor: "#37324080",
  borderBottomWidth: "2px",
};

const borderLeft = {
  borderColor: "#37324080",
  borderLeftWidth: "2px",
};

const gradient = {
  background:
    "linear-gradient(97.17deg, #332E3A 13.22%, rgba(51, 46, 58, 0) 127.05%)",
};

function Home() {
  useEffect(() => {});
  const isUp = () => {
    return (
      <svg
        className='ml-3'
        width='13'
        height='18'
        viewBox='0 0 5 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M2.71955 7.92398C2.69011 7.94827 2.65539 7.9673 2.61738 7.97999C2.54201 8.00667 2.45746 8.00667 2.38209 7.97999C2.34408 7.9673 2.30936 7.94827 2.27992 7.92398L0.0910507 6.03834C0.0621841 6.01347 0.0392857 5.98395 0.0236632 5.95146C0.00804074 5.91896 3.04159e-10 5.88414 0 5.84897C-3.04159e-10 5.8138 0.00804074 5.77898 0.0236632 5.74649C0.0392857 5.714 0.0621841 5.68448 0.0910507 5.65961C0.119917 5.63474 0.154187 5.61501 0.191903 5.60156C0.229619 5.5881 0.270043 5.58117 0.310866 5.58117C0.35169 5.58117 0.392114 5.5881 0.42983 5.60156C0.467546 5.61501 0.501816 5.63474 0.530682 5.65961L2.19014 7.09185V0.266711C2.19014 0.195975 2.22275 0.128136 2.28082 0.0781174C2.33888 0.0280995 2.41762 0 2.49974 0C2.58185 0 2.66059 0.0280995 2.71866 0.0781174C2.77672 0.128136 2.80934 0.195975 2.80934 0.266711V7.09185L4.46879 5.65961C4.49772 5.63489 4.53203 5.61533 4.56975 5.60206C4.60747 5.58879 4.64786 5.58206 4.6886 5.58226C4.72935 5.58206 4.76974 5.58879 4.80746 5.60206C4.84518 5.61533 4.87949 5.63489 4.90842 5.65961C4.93744 5.6844 4.96047 5.7139 4.97619 5.7464C4.99191 5.7789 5 5.81376 5 5.84897C5 5.88418 4.99191 5.91904 4.97619 5.95154C4.96047 5.98404 4.93744 6.01354 4.90842 6.03834L2.71955 7.92398Z'
          fill='#B584FF'
        />
      </svg>
    );
  };

  return (
    <React.Fragment>
      <Actions />
      <div className='flex h-full'>
        <Navbar page='dashboard' />

        <div className='flex flex-col w-full h-full justify-start'>
          <div className='w-9/12 h-1/4 flex flex-col flex-1 items-start justify-between py-8 pl-8'>
            <TopMenu />
            <div className='h-8'></div>
            <div className='font-semibold text-4xl'>
              Dashboard{" "}
              <div
                className='text-xs font-small mt-1'
                style={{ color: "#6F6B75" }}
              >
                Welcome to purpl.
              </div>
            </div>
          </div>
          <div className='parent'>
            <CheckoutGraph />
            <Spent />
            <Purchases />
            <ProfitGraph />
            <Calendar />
          </div>
          <div
            className='absolute top-0 right-0 h-full w-1/5 flex justify-center'
            style={{
              ...borderLeft,
              background:
                "linear-gradient(180deg, rgba(48, 43, 54, 0.0621) 0%, rgba(48, 43, 54, 0.23) 100%)",
            }}
          >
            <div className='relative top-40'>
              <div className='text-2xl font-semibold text-center mb-4'>
                Latest Checkouts
              </div>
              <div className='flex flex-col relative scrollbars h-4/6'>
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
                <Checkout />
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
