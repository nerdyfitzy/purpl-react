import { ipcRenderer } from "electron";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import { Group } from "../../public/types/profiles";

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

const providers = [{ label: "Privacy", value: "Privacy" }];

const makeGet = [
  { label: "Make Cards", value: "make" },
  { label: "Get Cards", value: "get" },
];

let profGroups = [];

let profiles = [];

const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#6B6476",
    width: "10rem",
    height: "1.5rem",
    color: "#FFFFFF",
  }),
  option: (styles, { data, isDisabled, isSelected, isFocused }) => ({
    ...styles,
    background: "#3A3544",
    color: "#FFFFFF",
  }),
  placeholder: (styles) => ({ ...styles }),
};

const darken = { background: "rgba(0, 0, 0, 0.6)" };

const VCCModal = ({
  shown,
  handleClose,
  handleSubmit,
}: {
  shown: boolean;
  handleClose: any;
  handleSubmit: Function;
}) => {
  if (!shown) return null;

  const [provider, setprovider] = useState(null);
  const [addressToUse, setaddressToUse] = useState(null);
  const qty = useRef(null);
  const names = useRef(null);

  const [action, setaction] = useState(makeGet[0]);
  const [profGroup, setprofGroup] = useState(null);
  const [profileOptions, setprofileOptions] = useState([]);
  let groups: { [k: string]: Group };
  useEffect(() => {
    groups = ipcRenderer.sendSync("load-profiles", {
      initial: true,
      group: undefined,
    });
    console.log(groups);
    Object.values(groups).map((group) =>
      profGroups.push({ label: group.name, value: group.uuid })
    );
  }, []);

  useEffect(() => {
    profiles = [];
    if (profGroup !== null) {
      const profs: Group = ipcRenderer.sendSync("load-profiles", {
        initial: false,
        group: profGroup.value,
      });
      setprofileOptions(
        Object.values(profs.profiles).map((prof) => ({
          label: prof.profile_name,
          value: prof.uuid,
        }))
      );
    }
  }, [profGroup]);

  function handleClick(e) {
    if (e.target.getAttribute("id") === "modalBackground") {
      profGroups = [];
      profiles = [];
      handleClose();
    }
  }
  function submitData() {
    ipcRenderer.send("gen-vcc", {
      provider: provider.value,
      profileInfo: { group: profGroup.value, profile: addressToUse.value },
      qty: qty.current.value,
      names: names.current.value,
      action: action.value,
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
              Generate VCCs
            </div>
          </div>
          <div className='modalBottom relative w-full h-full'>
            <div className='flex justify-between w-full h-full'>
              <div className='w-full h-1/2 mt-10 flex flex-row justify-evenly flex-wrap'>
                <div className='flex flex-col items-start'>
                  <label htmlFor='provider' className='mb-2'>
                    Provider
                  </label>
                  <Select
                    options={providers}
                    styles={selectStyles}
                    onChange={setprovider}
                  />
                </div>
                <div className='flex flex-col items-start'>
                  <label htmlFor='provider' className='mb-2'>
                    Action
                  </label>
                  <Select
                    options={makeGet}
                    styles={selectStyles}
                    defaultInputValue={makeGet[0].label}
                    onChange={setaction}
                  />
                </div>
                <div className='w-full'></div>
                {action.value === "make" ? (
                  <>
                    <div className='flex flex-row justify-evenly w-full justify-self-start self-start mt-5'>
                      <div className='flex flex-col items-start'>
                        <label htmlFor='provider' className='mb-2'>
                          Profile Group
                        </label>
                        <Select
                          styles={selectStyles}
                          options={profGroups}
                          defaultInputValue={
                            profGroups.length > 0 ? profGroups[0].label : ""
                          }
                          onChange={setprofGroup}
                        />
                      </div>
                      <div className='flex flex-col items-start'>
                        <label htmlFor='provider' className='mb-2'>
                          Profile Address to Use
                        </label>
                        <Select
                          styles={selectStyles}
                          options={profileOptions}
                          onChange={setaddressToUse}
                        />
                      </div>
                    </div>
                    <div className='flex flex-row justify-evenly w-1/2 justify-self-start self-start mt-5'>
                      <div className='flex flex-col items-start'>
                        <label htmlFor='provider' className='mb-2'>
                          Quantity
                        </label>
                        <input
                          id='groupName'
                          type='text'
                          className='rounded-lg w-10 h-10 text-left px-4 text-xs font-medium '
                          style={{ background: "#6B6476" }}
                          placeholder='0'
                          ref={qty}
                        />
                      </div>
                      <div className='flex flex-col items-start'>
                        <label htmlFor='provider' className='mb-2'>
                          Card Names
                        </label>
                        <input
                          id='groupName'
                          type='text'
                          className='rounded-lg w-28 h-10 text-left px-4 text-xs font-medium '
                          style={{ background: "#6B6476" }}
                          placeholder='Enter here...'
                          ref={names}
                        />
                      </div>
                    </div>
                    <div className='w-full'></div>
                  </>
                ) : (
                  <></>
                )}
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

export default VCCModal;
