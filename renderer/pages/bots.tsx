import React, { useState, useContext, useEffect } from "react";
import Actions from "../components/actions";
import TopMenu from "../components/topMenu";
import Navbar from "../components/navbar";
import BottomBar from "../components/bottomBar";
import CreateBtn from "../components/createBtn";
import Portfolio from "../components/bots/portfolio";
import Table from "../components/bots/botTable";
import BotModal from "../components/bots/addBotModal";

const borderBottom = {
  borderColor: "#37324080",
  borderBottomWidth: "2px",
};

const borderLeft = {
  borderColor: "#373240",
  borderLeftWidth: "1px",
};

const gradient = {
  background:
    "linear-gradient(97.17deg, #332E3A 13.22%, rgba(51, 46, 58, 0) 127.05%)",
};

const Home = () => {
  const [botModal, changeBotModal] = useState(false);

  const newRobot = () => {};
  return (
    <>
      <Actions />

      <div className='flex h-full'>
        <Navbar page='bots' />
        <BotModal
          shown={botModal}
          handleClose={() => changeBotModal(false)}
          handleSubmit={newRobot}
        />

        <div className='flex flex-col w-full h-full justify-start'>
          <div
            className='w-full h-1/4 flex flex-col z-30 flex-1 items-start justify-between py-8 pl-8 z-20'
            style={borderBottom}
          >
            <TopMenu />
            <div className='h-8'></div>
            <div className='font-semibold text-4xl'>Bots</div>
          </div>

          <div className='w-full h-screen flex flex-row relative'>
            <div className='h-full ml-8 w-9/12'>
              <div className='flex flex-row items-center'>
                <CreateBtn
                  text='Add Bot'
                  handleClick={() => changeBotModal(true)}
                  className='rounded-lg mr-10 h-12 w-32 my-6 flex flex-row justify-evenly items-center'
                />
                <Portfolio />
              </div>

              <Table />
            </div>
            <div
              className='h-screen  absolute right-0 top-0 z-50'
              style={{
                background:
                  "linear-gradient(180deg, rgba(48, 43, 54, 0.0621) 0%, rgba(48, 43, 54, 0.23) 100%)",
                ...borderLeft,
                width: "20%",
              }}
            >
              hi
            </div>
          </div>
        </div>
      </div>

      <BottomBar />
    </>
  );
};

export default Home;
