import { ipcRenderer } from "electron";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

const topGradient = {
  background:
    "linear-gradient(93.71deg, rgba(111, 107, 117, 0.09) 13.99%, rgba(111, 107, 117, 0) 107.92%)",
};

const botBorder = {
  borderBottomWidth: "2px",
  borderColor: "#B584FF",
};

const back = {
  background: "linear-gradient(170.6deg, #292431 7.78%, #312B3B 92.9%)",
};

const befaft = [
  { label: "Before", value: "before" },
  { label: "After", value: "after" },
];

const onetwo = [
  { label: "Line 1", value: "1" },
  { label: "Line 2", value: "2" },
];

const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#6B6476",
    width: "7rem",
    height: "1.5rem",
    color: "#FFFFFF",
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
  }),
  option: (styles, { data, isDisabled, isSelected, isFocused }) => ({
    ...styles,
    background: "#3A3544",
    color: "#FFFFFF",
  }),
  placeholder: (styles) => ({ ...styles }),
};

const darken = { background: "rgba(0, 0, 0, 0.6)" };

const JigModal = ({
  shown,
  handleClose,
  handleSubmit,
}: {
  shown: boolean;
  handleClose: any;
  handleSubmit: Function;
}) => {
  if (!shown) return null;
  const letter_amt = useRef(null);
  const fourLet = useRef(null);
  const apt = useRef(null);
  const fname = useRef(null);
  const lname = useRef(null);
  const phone = useRef(null);
  const email = useRef(null);
  const catchall = useRef(null);

  const [beforeAfter, setbeforeAfter] = useState(befaft[0]);
  const [aptLine, setaptLine] = useState(onetwo[0]);
  function handleClick(e) {
    if (e.target.getAttribute("id") === "modalBackground") handleClose();
  }
  function submitData() {
    handleSubmit({
      RANDOM_LETTERS: {
        checked: fourLet.current.value,
        amount: letter_amt.current.value,
        position: beforeAfter.value,
      },
      RANDOM_APT: {
        checked: apt.current.value,
        position: aptLine.value,
      },
      RANDOM_FNAME: fname.current.value,
      RANDOM_LNAME: lname.current.value,
      RANDOM_PHONE: phone.current.value,
      RANDOM_EMAIL: {
        checked: email.current.value,
        catchall: catchall.current.value,
      },
    });
    handleClose();
  }
  return (
    <>
      <div
        className='w-full h-full flex justify-center items-center absolute top-0 left-0 z-30'
        style={darken}
        onClick={handleClick}
        id='modalBackground'
      >
        <div
          className='w-2/5 h-3/5 flex flex-col relative rounded-md z-50'
          style={back}
          id='modal'
        >
          <div className='h-28' style={topGradient}>
            <button>
              <svg
                className='absolute top-5 right-5'
                onClick={handleClose}
                width='15'
                height='15'
                viewBox='0 0 6 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5.48125 0.14127C5.34313 -0.00498038 5.12 -0.00498038 4.98188 0.14127L3.25001 1.97127L1.51813 0.13752C1.38001 -0.00873046 1.15688 -0.00873046 1.01875 0.13752C0.88063 0.283769 0.88063 0.52002 1.01875 0.66627L2.75063 2.50002L1.01875 4.33377C0.88063 4.48002 0.88063 4.71627 1.01875 4.86252C1.15688 5.00877 1.38001 5.00877 1.51813 4.86252L3.25001 3.02877L4.98188 4.86252C5.12 5.00877 5.34313 5.00877 5.48125 4.86252C5.61938 4.71627 5.61938 4.48002 5.48125 4.33377L3.74938 2.50002L5.48125 0.66627C5.61584 0.52377 5.61584 0.28377 5.48125 0.14127Z'
                  fill='#CCCBDE'
                />
              </svg>
            </button>

            <div
              className='absolute top-8 left-12 text-md font-semibold p-2 w-1/5'
              style={botBorder}
            >
              Jig Profiles
            </div>
          </div>
          <div className='modalBottom relative'>
            <div className='flex justify-between w-full h-full'>
              <div className='absolute left-16 top-8 flex flex-col'>
                <div className='flex flex-row items-center'>
                  <input
                    type='checkbox'
                    className='mr-2 h-4 w-4'
                    ref={fourLet}
                  />
                  <input
                    id='groupName'
                    type='text'
                    min='0'
                    className='rounded-lg w-10 h-8 text-left px-4 text-xs font-medium mr-2'
                    style={{ background: "#6B6476" }}
                    placeholder='4'
                    ref={letter_amt}
                  />{" "}
                  random letters{" "}
                  <Select
                    options={befaft}
                    styles={selectStyles}
                    onChange={setbeforeAfter}
                  />
                  address line 1
                </div>
                <div className='flex flex-row items-center mt-4'>
                  <input type='checkbox' className='mr-2 h-4 w-4' ref={apt} />
                  Random apartment in{" "}
                  <Select
                    options={onetwo}
                    styles={selectStyles}
                    onChange={setaptLine}
                  />
                </div>
                <div className='flex flex-row items-center mt-4'>
                  <input type='checkbox' className='mr-2 h-4 w-4' ref={email} />
                  Random email
                  <input
                    id='groupName'
                    type='text'
                    min='0'
                    className='rounded-lg w-36 h-8 text-left px-4 text-xs font-medium ml-2'
                    style={{ background: "#6B6476" }}
                    placeholder='Catchall'
                    ref={catchall}
                  />
                </div>
                <div className='flex flex-row items-center mt-4'>
                  <input type='checkbox' className='mr-2 h-4 w-4' ref={fname} />
                  Random first name
                </div>
                <div className='flex flex-row items-center mt-4'>
                  <input type='checkbox' className='mr-2 h-4 w-4' ref={lname} />
                  Random last name
                </div>
                <div className='flex flex-row items-center mt-4'>
                  <input type='checkbox' className='mr-2 h-4 w-4' ref={phone} />
                  Random phone number
                </div>
              </div>
            </div>
            <button
              className='rounded-lg text-center align-middle absolute top-80 right-7 h-10 w-16'
              style={{ background: "#81C6DC" }}
              onClick={submitData}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JigModal;
