import React from "react";
import Actions from "../components/actions";
import TopMenu from "../components/topMenu";
import Navbar from "../components/navbar";
import User from "../components/settings/user";

const borderBottom = {
  borderColor: "#37324080",
  borderBottomWidth: "2px",
};

const borderRight = {
  borderColor: "#373240",
  borderRightWidth: "2px",
};

const btnBorder = {
  borderWidth: "2px",
  borderColor: "#6F6B75",
};

const gradient = {
  background:
    "linear-gradient(97.17deg, #332E3A 13.22%, rgba(51, 46, 58, 0) 127.05%)",
};

const Home = () => {
  return (
    <>
      <Actions />

      <div className='absolute right-40 top-48'>
        <img src='/images/purplback.png' alt='' />
      </div>

      <div className='absolute bottom-0 right-96'>
        <img src='/images/curve.png' className='' alt='' />
      </div>

      <div className='flex h-full'>
        <Navbar page='settings' />

        <div className='flex flex-col w-full h-full justify-start'>
          <div className='w-full h-1/4 flex flex-col flex-1 items-start justify-between py-8 pl-8'>
            <TopMenu />
            <div className='h-8'></div>
            <div className='font-semibold text-4xl'>Settings</div>
          </div>

          <div className='w-full h-screen flex flex-row'>
            <div
              style={borderRight}
              className='w-7/12 h-4/6 mb-10 flex flex-col pl-8 pt-8'
            >
              <div className='flex flex-col'>
                <label htmlFor='license' className='font-semibold text-xl mb-5'>
                  License
                </label>
                <div className='flex flex-row'>
                  <button
                    className='rounded-md w-28 px-2 pr-4 mr-6 h-10 flex flex-row justify-evenly items-center text-xs'
                    style={{
                      background:
                        "linear-gradient(95.15deg, #9456F1 4.34%, #7F41DD 103.04%)",
                    }}
                  >
                    <svg
                      width='22'
                      height='22'
                      viewBox='0 0 11 12'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M7.3195 7.75C7.82576 7.75 8.23616 7.30229 8.23616 6.75C8.23616 6.19772 7.82576 5.75 7.3195 5.75C6.81324 5.75 6.40283 6.19772 6.40283 6.75C6.40283 7.30229 6.81324 7.75 7.3195 7.75Z'
                        fill='#9456F1'
                      />
                      <path
                        d='M6.40283 6.75C6.40283 6.49811 6.49109 6.27072 6.632 6.09488C6.46398 5.8852 6.21988 5.75 5.9445 5.75C5.43825 5.75 5.02783 6.19773 5.02783 6.75C5.02783 7.30228 5.43825 7.75 5.9445 7.75C6.21988 7.75 6.46398 7.61481 6.632 7.40512C6.49109 7.22928 6.40283 7.00189 6.40283 6.75Z'
                        fill='#EED8FF'
                      />
                      <path
                        d='M8.69466 2.75H2.27799C1.77174 2.75 1.36133 3.19772 1.36133 3.75V8.25C1.36133 8.80228 1.77174 9.25 2.27799 9.25H8.69466C9.20094 9.25 9.61133 8.80228 9.61133 8.25V3.75C9.61133 3.19772 9.20094 2.75 8.69466 2.75ZM7.31966 7.75C7.04431 7.75 6.80018 7.6148 6.63216 7.40512C6.46415 7.6148 6.22004 7.75 5.94466 7.75C5.43841 7.75 5.02799 7.30228 5.02799 6.75C5.02799 6.19773 5.43841 5.75 5.94466 5.75C6.22004 5.75 6.46415 5.8852 6.63216 6.09488C6.80018 5.8852 7.04431 5.75 7.31966 5.75C7.82594 5.75 8.23635 6.19773 8.23635 6.75C8.23635 7.30228 7.82594 7.75 7.31966 7.75Z'
                        fill='#CFB1FF'
                      />
                    </svg>
                    Manage
                  </button>

                  <User
                    email='fitzgerald@gmail.com'
                    name='nerdyfitzy#0001'
                    pfp='.'
                  />
                </div>
              </div>

              <div className='flex flex-col mt-12'>
                <label htmlFor='' className='font-semibold text-xl mb-5'>
                  Updates
                </label>
                <button
                  className='rounded-md w-40 px-2 mr-6 h-10 flex flex-row justify-evenly items-center text-xs'
                  style={{
                    background:
                      "linear-gradient(95.15deg, #9456F1 4.34%, #7F41DD 103.04%)",
                  }}
                >
                  <svg
                    width='17'
                    height='17'
                    viewBox='0 0 11 11'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5.49984 0.916504C4.30041 0.919664 3.14984 1.39211 2.2943 2.23276V1.37484C2.2943 1.25328 2.24601 1.1367 2.16006 1.05075C2.0741 0.964792 1.95752 0.916504 1.83597 0.916504C1.71441 0.916504 1.59783 0.964792 1.51188 1.05075C1.42592 1.1367 1.37763 1.25328 1.37763 1.37484V3.43734C1.37762 3.49753 1.38946 3.55714 1.41249 3.61275C1.43552 3.66837 1.46928 3.7189 1.51184 3.76146C1.5544 3.80403 1.60494 3.83779 1.66055 3.86081C1.71617 3.88384 1.77577 3.89569 1.83597 3.89567H3.89847C4.02002 3.89567 4.1366 3.84738 4.22256 3.76143C4.30851 3.67547 4.3568 3.55889 4.3568 3.43734C4.3568 3.31578 4.30851 3.1992 4.22256 3.11325C4.1366 3.02729 4.02002 2.979 3.89847 2.979H2.84996C3.43798 2.36546 4.22132 1.97585 5.0654 1.87713C5.90948 1.77841 6.76158 1.97673 7.47532 2.43803C8.18905 2.89932 8.71986 3.59478 8.97652 4.40493C9.23319 5.21507 9.1997 6.08931 8.8818 6.87744C8.56391 7.66558 7.98146 8.31839 7.23452 8.72373C6.48759 9.12907 5.6228 9.26162 4.78875 9.09861C3.9547 8.9356 3.20346 8.48721 2.6641 7.83047C2.12474 7.17374 1.83094 6.34966 1.83317 5.49984C1.83317 5.37828 1.78488 5.2617 1.69893 5.17575C1.61297 5.08979 1.49639 5.0415 1.37484 5.0415C1.25328 5.0415 1.1367 5.08979 1.05075 5.17575C0.964792 5.2617 0.916504 5.37828 0.916504 5.49984C0.916504 6.40633 1.18531 7.29248 1.68893 8.0462C2.19256 8.79993 2.90838 9.38738 3.74587 9.73429C4.58337 10.0812 5.50492 10.172 6.394 9.9951C7.28308 9.81825 8.09975 9.38173 8.74074 8.74074C9.38173 8.09975 9.81825 7.28308 9.9951 6.394C10.172 5.50492 10.0812 4.58337 9.73429 3.74587C9.38738 2.90838 8.79993 2.19256 8.0462 1.68893C7.29248 1.18531 6.40633 0.916504 5.49984 0.916504Z'
                      fill='#F7D8FF'
                    />
                    <path
                      d='M6.4165 5.95817H5.49984C5.43964 5.95819 5.38004 5.94634 5.32442 5.92331C5.26881 5.90029 5.21828 5.86653 5.17571 5.82396C5.13315 5.7814 5.09939 5.73087 5.07636 5.67525C5.05333 5.61964 5.04149 5.56003 5.0415 5.49984V4.12484C5.0415 4.00328 5.08979 3.8867 5.17575 3.80075C5.2617 3.71479 5.37828 3.6665 5.49984 3.6665C5.62139 3.6665 5.73797 3.71479 5.82393 3.80075C5.90988 3.8867 5.95817 4.00328 5.95817 4.12484V5.0415H6.4165C6.53806 5.0415 6.65464 5.08979 6.74059 5.17575C6.82655 5.2617 6.87484 5.37828 6.87484 5.49984C6.87484 5.62139 6.82655 5.73797 6.74059 5.82393C6.65464 5.90988 6.53806 5.95817 6.4165 5.95817Z'
                      fill='#F7D8FF'
                    />
                    <path
                      d='M5.49984 1.8335C5.00363 1.83544 4.51296 1.93799 4.05751 2.13493C3.60205 2.33188 3.19126 2.61913 2.84996 2.97933H3.89847C4.02002 2.97933 4.1366 3.02762 4.22256 3.11357C4.30851 3.19953 4.3568 3.31611 4.3568 3.43766C4.3568 3.55922 4.30851 3.6758 4.22256 3.76175C4.1366 3.84771 4.02002 3.896 3.89847 3.896H1.83597C1.72419 3.89526 1.61662 3.85326 1.53392 3.77805C1.45122 3.70285 1.39922 3.59974 1.3879 3.48854C1.0785 4.11403 0.917208 4.80233 0.916504 5.50016C0.916504 5.3786 0.964792 5.26203 1.05075 5.17607C1.1367 5.09012 1.25328 5.04183 1.37484 5.04183C1.49639 5.04183 1.61297 5.09012 1.69893 5.17607C1.78488 5.26203 1.83317 5.3786 1.83317 5.50016C1.83317 6.22536 2.04822 6.93427 2.45112 7.53725C2.85401 8.14023 3.42667 8.6102 4.09666 8.88772C4.76666 9.16524 5.5039 9.23785 6.21517 9.09637C6.92643 8.9549 7.57977 8.60568 8.09256 8.09289C8.60535 7.58009 8.95457 6.92676 9.09605 6.21549C9.23753 5.50423 9.16492 4.76699 8.88739 4.09699C8.60987 3.42699 8.13991 2.85434 7.53693 2.45144C6.93395 2.04854 6.22503 1.8335 5.49984 1.8335ZM6.4165 5.9585H5.49984C5.43964 5.95851 5.38004 5.94667 5.32442 5.92364C5.26881 5.90061 5.21827 5.86685 5.17571 5.82429C5.13315 5.78172 5.09939 5.73119 5.07636 5.67558C5.05333 5.61996 5.04149 5.56036 5.0415 5.50016V4.12516C5.0415 4.0036 5.08979 3.88703 5.17575 3.80107C5.2617 3.71512 5.37828 3.66683 5.49984 3.66683C5.62139 3.66683 5.73797 3.71512 5.82393 3.80107C5.90988 3.88703 5.95817 4.0036 5.95817 4.12516V5.04183H6.4165C6.53806 5.04183 6.65464 5.09012 6.74059 5.17607C6.82655 5.26203 6.87484 5.3786 6.87484 5.50016C6.87484 5.62172 6.82655 5.7383 6.74059 5.82425C6.65464 5.91021 6.53806 5.9585 6.4165 5.9585Z'
                      fill='#C5B1FF'
                      fill-opacity='0.32'
                    />
                  </svg>
                  Check For Updates
                </button>
              </div>

              <div className='flex flex-col mt-12 w-36'>
                <label htmlFor='' className='font-semibold text-xl mb-5'>
                  Customization
                </label>
                <div className='flex flex-row justify-between'>
                  <div
                    className='h-6 w-6 rounded-full'
                    style={{ background: "#B584FF" }}
                  ></div>
                  <div
                    className='h-6 w-6 rounded-full'
                    style={{ background: "#897FF9" }}
                  ></div>
                  <div
                    className='h-6 w-6 rounded-full'
                    style={{ background: "#81DC85" }}
                  ></div>
                  <div
                    className='h-6 w-6 rounded-full'
                    style={{ background: "#FFA96A" }}
                  ></div>
                </div>

                <button
                  className='rounded-md pr-2 w-48 h-11 flex flex-row items-center mt-4 justify-evenly text-sm'
                  style={btnBorder}
                >
                  <svg
                    width='23'
                    height='23'
                    viewBox='0 0 11 11'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5.49984 10.0832C4.59334 10.0832 3.7072 9.81436 2.95348 9.31074C2.19975 8.80712 1.61229 8.0913 1.26539 7.25381C0.91849 6.41631 0.827725 5.49475 1.00457 4.60568C1.18142 3.7166 1.61794 2.89992 2.25893 2.25893C2.89992 1.61794 3.7166 1.18142 4.60568 1.00457C5.49475 0.827725 6.41631 0.91849 7.25381 1.26539C8.0913 1.61229 8.80712 2.19975 9.31074 2.95348C9.81436 3.7072 10.0832 4.59334 10.0832 5.49984C10.0818 6.71499 9.59845 7.87997 8.73921 8.73921C7.87997 9.59845 6.71499 10.0818 5.49984 10.0832Z'
                      fill='#F6D3FF'
                    />
                    <path
                      d='M7.3335 5.95817H3.66683C3.54527 5.95817 3.42869 5.90988 3.34274 5.82393C3.25678 5.73797 3.2085 5.62139 3.2085 5.49984C3.2085 5.37828 3.25678 5.2617 3.34274 5.17575C3.42869 5.08979 3.54527 5.0415 3.66683 5.0415H7.3335C7.45505 5.0415 7.57163 5.08979 7.65759 5.17575C7.74354 5.2617 7.79183 5.37828 7.79183 5.49984C7.79183 5.62139 7.74354 5.73797 7.65759 5.82393C7.57163 5.90988 7.45505 5.95817 7.3335 5.95817Z'
                      fill='#9456F1'
                    />
                    <path
                      d='M5.49984 7.79183C5.43964 7.79185 5.38004 7.78 5.32442 7.75697C5.26881 7.73395 5.21828 7.70019 5.17571 7.65762C5.13315 7.61506 5.09939 7.56453 5.07636 7.50891C5.05333 7.4533 5.04149 7.39369 5.0415 7.3335V3.66683C5.0415 3.54527 5.08979 3.42869 5.17575 3.34274C5.2617 3.25678 5.37828 3.2085 5.49984 3.2085C5.62139 3.2085 5.73797 3.25678 5.82393 3.34274C5.90988 3.42869 5.95817 3.54527 5.95817 3.66683V7.3335C5.95819 7.39369 5.94634 7.4533 5.92331 7.50891C5.90029 7.56453 5.86653 7.61506 5.82396 7.65762C5.7814 7.70019 5.73087 7.73395 5.67525 7.75697C5.61964 7.78 5.56003 7.79185 5.49984 7.79183Z'
                      fill='#9456F1'
                    />
                  </svg>
                  Upload Background
                </button>
              </div>

              <div className='flex flex-col mt-10'>
                <label htmlFor='' className='font-semibold text-xl mb-3'>
                  Webhook
                </label>
                <div className='flex flex-col'>
                  <div
                    className='text-xs w-72 mb-4'
                    style={{ color: "#6F6B75" }}
                  >
                    Get fancy messages sent directly to your Discord server when
                    checkouts are processed or declined.
                  </div>
                  <div className='flex flex-row justify-start'>
                    <input
                      type='text'
                      className='p-5 rounded-md w-48 h-12 input'
                      style={{ background: "#B584FF" }}
                      placeholder='https://discord.com/api/webhook/'
                    />
                    <button
                      className='w-28 h-12 rounded-lg ml-16 '
                      style={{
                        background:
                          "linear-gradient(95.15deg, #9456F1 4.34%, #7F41DD 103.04%)",
                      }}
                    >
                      Send Test
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='h-full ml-8 w-full relative'>
              <div className='flex flex-col'>
                <label htmlFor='' className='font-semibold text-xl mb-3'>
                  2captcha Key
                </label>
                <input
                  type='text'
                  style={{ background: "#5A5464" }}
                  className='w-56 h-12 rounded-lg p-4'
                  placeholder='Enter 2captcha API key'
                />
              </div>
              <div className='flex flex-col mt-12'>
                <label htmlFor='' className='font-semibold text-xl mb-3'>
                  5sim Key
                </label>
                <input
                  type='text'
                  style={{ background: "#5A5464" }}
                  className='w-56 h-12 rounded-lg p-4'
                  placeholder='Enter 2captcha API key'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
