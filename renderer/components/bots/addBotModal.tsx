import { ipcRenderer } from "electron";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import { Robot } from "../../../backend/modules/bot vault/types/Bot";
import BotSuggestion from "./botSuggestion";

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
    width: "10rem",
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

const darken = { background: "rgba(0, 0, 0, 0.6)" };

const bots: { [k: string]: Robot } = {
  Fuze: {
    name: "Fuze",
    bbId: 108,
    types: {
      Renewal: [
        {
          amount: 50,
          timePeriod: 30,
        },
      ],
      Lifetime: false,
    },
  },
  Ominous: {
    name: "Ominous",
    bbId: 103,
    types: {
      Renewal: [
        {
          amount: 35,
          timePeriod: 30,
        },
        {
          amount: 50,
          timePeriod: 30,
        },
      ],
      Lifetime: false,
    },
  },
  Ganesh: {
    name: "Ganesh",
    bbId: 100,
    types: {
      Renewal: [
        {
          amount: 135,
          timePeriod: 60,
          currency: "GBP",
        },
      ],
      Lifetime: true,
    },
  },
  Kage: {
    name: "Kage",
    bbId: 99,
    types: {
      Renewal: [
        {
          amount: 45,
          timePeriod: 30,
        },
      ],
      Lifetime: false,
    },
  },
  Dragon: {
    name: "Dragon",
    bbId: 98,
    types: {
      Renewal: [
        {
          amount: 50,
          timePeriod: 30,
        },
      ],
      Lifetime: false,
    },
  },
  MekAIO: {
    name: "MekAIO",
    bbId: 97,
    types: {
      Renewal: [
        {
          amount: 45,
          timePeriod: 30,
        },
      ],
      Lifetime: false,
    },
  },
  Nebula: {
    name: "Nebula",
    bbId: 96,
    types: {
      Renewal: [
        {
          amount: 35,
          timePeriod: 30,
        },
      ],
      Lifetime: true,
    },
  },
  Velox: {
    name: "Velox",
    bbId: 91,
    types: {
      Renewal: [
        {
          amount: 90,
          timePeriod: 30,
          currency: "EUR",
        },
      ],
      Lifetime: true,
    },
  },
  Wrath: {
    name: "Wrath",
    bbId: 49,
    types: {
      Renewal: [
        {
          amount: 50,
          timePeriod: 30,
        },
      ],
      Lifetime: true,
    },
  },
  MEKPreme: {
    name: "MEKPreme",
    bbId: 24,
    types: {
      Renewal: [
        {
          amount: 120,
          timePeriod: 180,
        },
      ],
      Lifetime: false,
    },
  },
  SwftAIO: {
    name: "SwftAIO",
    bbId: 22,
    types: {
      Renewal: [
        {
          amount: 90,
          timePeriod: 180,
        },
      ],
      Lifetime: false,
    },
  },
  Polaris: {
    name: "Polaris",
    bbId: 18,
    types: {
      Renewal: [
        {
          amount: 95,
          timePeriod: 180,
          currency: "EUR",
        },
        {
          amount: 120,
          timePeriod: 180,
          currency: "EUR",
        },
      ],
      Lifetime: false,
    },
  },
  TohruAIO: {
    name: "TohruAIO",
    bbId: 17,
    types: {
      Renewal: [
        {
          amount: 50,
          timePeriod: 30,
        },
      ],
      Lifetime: false,
    },
  },
  Splashforce: {
    name: "Splashforce",
    bbId: 11,
    types: {
      Renewal: [
        {
          amount: 60,
          timePeriod: 180,
        },
      ],
      Lifetime: true,
    },
  },
  Prism: {
    name: "Prism",
    bbId: 10,
    types: {
      Renewal: [
        {
          amount: 150,
          timePeriod: 90,
        },
      ],
      Lifetime: false,
    },
  },
  Balko: {
    name: "Balko",
    bbId: 8,
    types: {
      Renewal: [
        { amount: 40, timePeriod: 180 },
        { amount: 60, timePeriod: 180 },
        {
          amount: 360,
          timePeriod: 365,
        },
      ],
      Lifetime: true,
    },
  },
  Cybersole: {
    name: "Cybersole",
    bbId: 6,
    types: {
      Renewal: [
        {
          amount: 120,
          timePeriod: 180,
          currency: "GBP",
        },
      ],
      Lifetime: true,
    },
  },
};

const BotModal = ({
  shown,
  handleClose,
  handleSubmit,
}: {
  shown: boolean;
  handleClose: any;
  handleSubmit: Function;
}) => {
  if (!shown) return null;
  const [name, setName] = useState("");
  const [botName, setbotName] = useState("");
  const [plans, setplans] = useState([]);
  const [renewalTypes, setrenewalTypes] = useState([]);
  const [selectedPlan, setselectedPlan] = useState({ label: "", value: "" });
  const [suggestions, setsuggestions] = useState([]);
  const price = useRef(null);
  const key = useRef(null);

  useEffect(() => {
    if (botName !== "") {
      const botArray = Object.keys(bots);
      const matches = botArray.filter((robot) =>
        robot.toLowerCase().includes(botName.toLowerCase())
      );
      setsuggestions(matches);
    }
  }, [botName]);

  function handleClick(e) {
    if (e.target.getAttribute("id") === "modalBackground") handleClose();
  }
  function submitData() {
    if (
      !name ||
      selectedPlan.value !== "" ||
      price.current.value ||
      key.current.value ||
      (selectedPlan.label === "Renewal" && selectedPlan.value !== "")
    )
      return toast.error("Please fill all required fields!");

    ipcRenderer.sendSync("new-robot", {
      key: key.current.value,
      bot: bots[botName],
      renewalType: bots[botName].types[selectedPlan.label],
      renewalInfo:
        selectedPlan.label === "Lifetime" ? "Lifetime" : selectedPlan.value,
      price: price.current.value,
    });
    handleClose();
  }

  const handleSuggestionClick = (name) => {
    const selected = bots[name];
    console.log(selected);
    const newPlans = [];
    if (selected.types.Lifetime)
      newPlans.push({ label: "Lifetime", value: "lifetime" });
    if (selected.types.Renewal.length > 0)
      newPlans.push({ label: "Renewal", value: "renewal" });

    setplans(newPlans);
    selected.types.Renewal.forEach((type) => {
      setrenewalTypes([
        {
          label: `$${type.amount} / ${type.timePeriod / 30} month${
            type.timePeriod / 30 > 1 ? "s" : ``
          }`,
          value: type,
        },
      ]);
    });
    setbotName(selected.name);
    setsuggestions([]);
  };
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
              Add Bot
            </div>
          </div>
          <div className='modalBottom relative'>
            <div className='flex flex-row flex-wrap justify-evenly mt-12'>
              <div className='flex flex-col'>
                <label htmlFor='groupName' className='mb-3'>
                  Bot Name
                </label>
                <input
                  id='groupName'
                  type='text'
                  className='rounded-lg w-56 h-12 text-left px-4 text-xs font-medium mb-1'
                  style={{ background: "#6B6476" }}
                  placeholder='Enter bot name'
                  value={botName}
                  onChange={(event) => setbotName(event.target.value)}
                />
                <div className='w-full max-h-full scrollbars'>
                  {suggestions.map((sugg) => (
                    <BotSuggestion
                      handleClick={() => handleSuggestionClick(sugg)}
                      name={sugg}
                    />
                  ))}
                </div>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='groupName' className='mb-3'>
                  Renewal Plan
                </label>
                <Select
                  styles={selectStyles}
                  options={plans}
                  onChange={setselectedPlan}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='groupName' className='mb-3'>
                  Renewal Type
                </label>
                <Select styles={selectStyles} options={renewalTypes} />
              </div>
              <div className='w-full mb-5'></div>

              <div className='flex flex-col justify-self-center'>
                <label htmlFor='groupName' className='mb-3'>
                  Purchase Price
                </label>
                <input
                  id='groupName'
                  ref={price}
                  type='number'
                  min='0'
                  className='rounded-lg w-36 h-12 text-left px-4 text-xs font-medium mb-1'
                  style={{ background: "#6B6476" }}
                  placeholder='300'
                />
              </div>
              <div className='flex flex-col justify-self-center'>
                <label htmlFor='groupName' className='mb-3'>
                  License Key
                </label>
                <input
                  id='groupName'
                  type='text'
                  className='rounded-lg w-48 h-12 text-left px-4 text-xs font-medium mb-1'
                  style={{ background: "#6B6476" }}
                  placeholder='XXXX-XXXX-XXXX-XXXX'
                  ref={key}
                />
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

export default BotModal;
