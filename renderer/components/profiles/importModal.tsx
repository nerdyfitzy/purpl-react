import React, { useContext, useRef, useState } from "react";
import { stateContext } from "../../pages/profiles";
import Select from "react-select";
import { ipcRenderer } from "electron";
import toast from "react-hot-toast";
import { FormattedProfile, Prof } from "../../public/types/profiles";

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

const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#6B6476",
    width: "12.5rem",
    height: "3rem",
    color: "#FFFFFF",
  }),
  option: (styles, { data, isDisabled, isSelected, isFocused }) => ({
    ...styles,
    background: "#3A3544",
    color: "#FFFFFF",
  }),
  placeholder: (styles) => ({ ...styles }),
};

const bots = [
  { label: "AYCD", value: "AYCD" },
  { label: "CSV ", value: "CSV " },
  { label: "purpl", value: "purpl" },
  { label: "Wrath", value: "Wrath" },
  { label: "Prism", value: "Prism" },
  { label: "Nebula", value: "Nebula" },
  { label: "Phantom", value: "Phantom" },
  { label: "Cybersole", value: "Cybersole" },
  { label: "NSB", value: "NSB" },
  { label: "Polaris", value: "Polaris" },
  { label: "Balkobot", value: "Balkobot" },
  { label: "Project Destroyer", value: "Project Destroyer" },
  { label: "Kodai", value: "Kodai" },
  { label: "Dashe", value: "Dashe" },
];

const darken = { background: "rgba(0, 0, 0, 0.6)" };
// "Project Destroyer": im.pd,
//   Dashe: im.dashe,
const ImportModal = ({
  shown,
  handleClose,
}: {
  shown: boolean;
  handleClose: any;
}) => {
  if (!shown) return null;
  const robot = useRef("");
  const [file, setFile] = useState("");
  const {
    profiles,
    selected,
    currentGroup,
    changeProfiles,
    changeGroups,
    groups,
    setCurrentGroup,
  } = useContext(stateContext);
  function handleClick(e) {
    if (e.target.getAttribute("id") === "modalBackground") handleClose();
  }
  function submitData() {
    const profs = ipcRenderer.sendSync("import-profiles", {
      path: file,
      bot: robot.current,
    });
    console.log(profs);

    changeGroups([
      ...groups,
      {
        name: profs.name,
        uuid: profs.uuid,
        total: Object.values(profs.profiles).length,
      },
    ]);
    setCurrentGroup(profs.uuid);

    const formattedProfs: Array<FormattedProfile> = Object.values(
      profs.profiles
    ).map((prof: Prof) => ({
      name: prof.profile_name,
      uuid: prof.uuid,
      last4: prof.payment.cnb.substring(prof.payment.cnb.length - 4),
      address: prof.shipping.addy1,
      email: prof.email,
      type: prof.payment.type,
    }));
    changeProfiles(formattedProfs);
    toast.success(
      `Imported ${formattedProfs.length} Profiles to ${robot.current} format`
    );

    handleClose();
  }
  function importFile() {
    const data = ipcRenderer.sendSync("import-file", "profiles");
    setFile(data);
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
          className='w-2/5 h-2/5 flex flex-col relative rounded-md z-50'
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
              className='absolute top-8 left-12 text-md font-semibold p-2 min-w-min max-w-none'
              style={botBorder}
            >
              Import {selected.length === 0 ? profiles.length : selected.length}{" "}
              Profiles
            </div>
          </div>
          <div className='relative mx-auto my-5 flex flex-row justify-evenly w-full'>
            <div className='flex flex-col mr-4'>
              <label htmlFor='groupName' className='mb-2 text-xl font-medium'>
                File
              </label>
              <button
                className='rounded-lg h-12 text-left px-4 text-sm font-medium'
                style={{ background: "#B584FF" }}
                onClick={importFile}
              >
                {file === ""
                  ? "Choose File"
                  : file.split("\\")[file.split("\\").length - 1]}
              </button>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='groupName' className='mb-2 text-xl font-medium'>
                Bot
              </label>
              <Select
                styles={selectStyles}
                options={bots}
                onChange={(e) => (robot.current = e.value)}
              />
            </div>
          </div>
          <button
            className='rounded-lg text-center align-middle absolute bottom-7 right-7 h-10 w-16'
            style={{ background: "#81C6DC" }}
            onClick={submitData}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default ImportModal;
