import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/navbar";
import Actions from "../components/actions";
import TopMenu from "../components/topMenu";
import BottomBar from "../components/bottomBar";
import Input from "../components/styledInput";
import Retailer from "../components/monitors/retailer";
import Checkout from "../components/monitors/checkout";

const borderBottom = {
  borderColor: "#37324080",
  borderBottomWidth: "2px",
};

const borderRight = {
  borderColor: "#37324080",
  borderRightWidth: "2px",
};

const buttonBorder = {
  borderWidth: "2px",
  borderColor: "#6F6B75",
};

interface Checkout {
  image: string;
  name: string;
  site: string;
  size: string;
  timestamp: string;
}

function Home() {
  const [checkouts, addCheckouts] = useState<Array<Checkout>>([]);
  useEffect(() => {
    addCheckouts([
      {
        image:
          "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.stockx.com%2Fimages%2FNike-Air-Force-1-Low-Rose-White-Product.jpg%3Ffit%3Dfill%26bg%3DFFFFFF%26w%3D140%26h%3D100%26auto%3Dformat%2Ccompress%26q%3D90%26dpr%3D2%26trim%3Dcolor%26updated_at%3D1615918299&imgrefurl=https%3A%2F%2Fstockx.com%2Fnike-air-force-1-low-rose-white&tbnid=-pj72APXjZmODM&vet=12ahUKEwi84vH8tovyAhVGNd8KHU_WBvQQMyggegUIARDHAw..i&docid=xXJfyw5Wrjg71M&w=280&h=200&q=air%20force%201&ved=2ahUKEwi84vH8tovyAhVGNd8KHU_WBvQQMyggegUIARDHAw",
        name: "Air Force 1",
        site: "footlocker.com",
        size: "10",
        timestamp: "10:59:44 AM",
      },
      {
        image:
          "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.stockx.com%2Fimages%2FNike-Air-Force-1-Low-Rose-White-Product.jpg%3Ffit%3Dfill%26bg%3DFFFFFF%26w%3D140%26h%3D100%26auto%3Dformat%2Ccompress%26q%3D90%26dpr%3D2%26trim%3Dcolor%26updated_at%3D1615918299&imgrefurl=https%3A%2F%2Fstockx.com%2Fnike-air-force-1-low-rose-white&tbnid=-pj72APXjZmODM&vet=12ahUKEwi84vH8tovyAhVGNd8KHU_WBvQQMyggegUIARDHAw..i&docid=xXJfyw5Wrjg71M&w=280&h=200&q=air%20force%201&ved=2ahUKEwi84vH8tovyAhVGNd8KHU_WBvQQMyggegUIARDHAw",
        name: "Air Force 1",
        site: "footlocker.com",
        size: "10",
        timestamp: "10:59:44 AM",
      },
      {
        image:
          "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.stockx.com%2Fimages%2FNike-Air-Force-1-Low-Rose-White-Product.jpg%3Ffit%3Dfill%26bg%3DFFFFFF%26w%3D140%26h%3D100%26auto%3Dformat%2Ccompress%26q%3D90%26dpr%3D2%26trim%3Dcolor%26updated_at%3D1615918299&imgrefurl=https%3A%2F%2Fstockx.com%2Fnike-air-force-1-low-rose-white&tbnid=-pj72APXjZmODM&vet=12ahUKEwi84vH8tovyAhVGNd8KHU_WBvQQMyggegUIARDHAw..i&docid=xXJfyw5Wrjg71M&w=280&h=200&q=air%20force%201&ved=2ahUKEwi84vH8tovyAhVGNd8KHU_WBvQQMyggegUIARDHAw",
        name: "Air Force 1",
        site: "footlocker.com",
        size: "10",
        timestamp: "10:59:44 AM",
      },
    ]);
    return () => {
      addCheckouts([]);
    };
  }, []);
  return (
    <>
      <Actions />
      <div className='flex h-full'>
        <Navbar page='monitors' />
        <div className='flex flex-col w-screen h-screen justify-start'>
          <div
            className='w-full h-1/4 flex flex-col flex-1 items-start justify-between py-8 pl-8'
            style={borderBottom}
          >
            <TopMenu />
            <div className='h-8'></div>
            <div className='font-semibold text-4xl'>Monitors</div>
          </div>
          <div className='w-full h-screen flex flex-row'>
            <div
              className='w-5/12 h-screen flex flex-col pl-8 pt-8'
              style={borderRight}
            >
              <div
                className='text-sm font-semibold mb-8'
                style={{ color: "#6F6B75" }}
              >
                AUTOMATION
              </div>
              <textarea
                name=''
                id=''
                className='placeholder resize-none w-10/12 rounded-md h-28 p-2 px-3 font-medium text-md'
                placeholder='SKU Input'
                style={{
                  background:
                    "linear-gradient(104.17deg, rgba(128, 125, 133, 0.21) 25.37%, rgba(107, 100, 118, 0.21) 89.51%)",
                }}
              ></textarea>
              <input
                type='text'
                className='mt-4 placeholder resize-none w-10/12 rounded-md h-16 p-2 px-3 font-medium text-md'
                placeholder='Leave tasks running for... (minutes)'
                style={{
                  background:
                    "linear-gradient(104.17deg, rgba(128, 125, 133, 0.21) 25.37%, rgba(107, 100, 118, 0.21) 89.51%)",
                }}
              />
              <button
                className='rounded-sm w-6/12 h-12 mt-4 pr-3 flex flex-row items-center justify-evenly'
                style={buttonBorder}
              >
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 8 6'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3.06335 5.88441C2.98699 5.9586 2.8828 6 2.77457 6C2.66634 6 2.56215 5.9586 2.48579 5.88441L0.179506 3.65644C-0.0598354 3.42526 -0.0598354 3.05039 0.179506 2.81965L0.468287 2.54064C0.707704 2.30947 1.09536 2.30947 1.3347 2.54064L2.77457 3.93147L6.6653 0.173383C6.90471 -0.0577944 7.29274 -0.0577944 7.53171 0.173383L7.82049 0.452386C8.05984 0.683564 8.05984 1.05836 7.82049 1.28918L3.06335 5.88441Z'
                    fill='#B584FF'
                  />
                </svg>
                <div>Save Changes</div>
              </button>

              <div
                className='text-sm font-semibold my-8 mt-10'
                style={{ color: "#6F6B75" }}
              >
                RETAILERS
              </div>
              <div className='scrollbars flex-col justify-start items-center w-10/12'>
                <Retailer name='Footsites' image='/images/footlocker.jpg' />
                <Retailer name='Shopify' image='/images/shopify.png' />
              </div>
            </div>
            <div className='h-full ml-8 w-full'>
              <div
                className='font-semibold text-sm mt-8'
                style={{ color: "#6F6B75" }}
              >
                GLOBAL CHECKOUT FEED
              </div>

              <div className='flex flex-row w-11/12 justify-between mt-7'>
                <div
                  className='h-8 w-28 text-sm text-center rounded-lg align-middle leading-8'
                  style={{ background: "#9456F1" }}
                >
                  Product
                </div>
                <div
                  className='h-8 w-28 text-sm text-center rounded-lg align-middle leading-8'
                  style={{ background: "#9456F1" }}
                >
                  Site
                </div>
                <div
                  className='h-8 w-28 text-sm text-center rounded-lg align-middle leading-8'
                  style={{ background: "#9456F1" }}
                >
                  Size
                </div>
                <div
                  className='h-8 w-28 text-sm text-center rounded-lg align-middle leading-8'
                  style={{ background: "#9456F1" }}
                >
                  Time
                </div>
                <div className='h-8 w-28 text-sm text-center rounded-lg align-middle leading-8'></div>
              </div>
              <div className='scrollbars h-4/6 mt-4'>
                {checkouts.map((succ) => (
                  <Checkout
                    name={succ.name}
                    image={succ.image}
                    site={succ.site}
                    size={succ.size}
                    timestamp={succ.timestamp}
                    num={checkouts.indexOf(succ) + 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
