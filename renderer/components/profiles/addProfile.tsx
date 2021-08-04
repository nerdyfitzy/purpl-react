import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import Input from "../styledInput";
import Select from "react-select";
import { Prof } from "../../public/types/profiles";
import { stateContext } from "../../pages/profiles";
import { modalContext } from "./profile";
import { v4 } from "uuid";
import { ipcRenderer } from "electron";
import toast from "react-hot-toast";

const inputContext = createContext(null);

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

const states = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "American Samoa", value: "AS" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "District Of Columbia", value: "DC" },
  { label: "Federated States Of Micronesia", value: "FM" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Guam", value: "GU" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Marshall Islands", value: "MH" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Northern Mariana Islands", value: "MP" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Palau", value: "PW" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Puerto Rico", value: "PR" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virgin Islands", value: "VI" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

const countries = [{ label: "United States", value: "US" }];

const months = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const years = [
  { label: "2021", value: "21" },
  { label: "2022", value: "22" },
  { label: "2023", value: "23" },
  { label: "2024", value: "24" },
  { label: "2025", value: "25" },
  { label: "2026", value: "26" },
  { label: "2027", value: "27" },
  { label: "2028", value: "28" },
  { label: "2029", value: "29" },
  { label: "2030", value: "30" },
  { label: "2031", value: "31" },
  { label: "2032", value: "32" },
  { label: "2033", value: "33" },
  { label: "2034", value: "34" },
];

const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#6B6476",
    width: "13.75rem",
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

const Shipping = ({ setSame, same }: { setSame: Function; same: boolean }) => {
  const [
    { sName, sAddy1, sAddy2, sCity, sState, sCountry, sPhone, sZip },
    {
      setSName,
      setSAddy1,
      setSAddy2,
      setSCity,
      setSState,
      setSCountry,
      setSameBilling,
      setSPhone,
      setSZip,
    },
  ] = useContext(inputContext);
  return (
    <>
      <Input
        placeholder='Enter name'
        title='Name'
        required={true}
        className='mr-1'
        handleChange={setSName}
        value={sName}
      />
      <div className='h-24'></div>

      <Input
        placeholder='Enter address'
        title='Address'
        required={true}
        handleChange={setSAddy1}
        value={sAddy1}
      />
      <div className='h-24'></div>
      <Input
        placeholder='Enter line 2'
        title='Line 2'
        handleChange={setSAddy2}
        value={sAddy2}
      />
      <div className='h-24'></div>
      <Input
        placeholder='Enter phone number'
        title='Phone'
        className='relative bottom-5'
        required={true}
        handleChange={setSPhone}
        value={sPhone}
      />
      <div className='h-24'></div>
      <Input
        placeholder='Enter city'
        title='City'
        required={true}
        handleChange={setSCity}
        value={sCity}
      />
      <div className='h-24'></div>
      <Input
        placeholder='Enter zip'
        className='absolute right-20 bottom-28'
        title='Zip code'
        required={true}
        handleChange={setSZip}
        value={sZip}
      />
      <div className='flex flex-col mr-10 relative bottom-10'>
        <label htmlFor='groupName' className='mb-2 text-md font-medium'>
          State *
        </label>
        <Select
          options={states}
          styles={selectStyles}
          onChange={setSState}
          inputValue={sState}
        />
      </div>
      <div className='flex flex-col mr-10'>
        <label htmlFor='groupName' className='mb-2 text-md font-medium'>
          Country *
        </label>
        <Select
          options={countries}
          styles={selectStyles}
          onChange={setSCountry}
          inputValue={sCountry}
        />
      </div>
      <div className='flex flex-row items-center absolute bottom-11 right-28'>
        <input type='checkbox' onChange={() => setSame(!same)} checked={same} />
        <label htmlFor='' className='text-sm font-md mx-2'>
          Same billing as shipping
        </label>
      </div>
    </>
  );
};

const Billing = () => {
  const [
    { bName, bAddy1, bAddy2, bCity, bState, bCountry, bPhone, bZip },
    {
      setBName,
      setBAddy1,
      setBAddy2,
      setBCity,
      setBState,
      setBCountry,
      setBPhone,
      setBZip,
    },
  ] = useContext(inputContext);
  return (
    <>
      <Input
        placeholder='Enter name'
        title='Name'
        required={true}
        handleChange={setBName}
        className='mr-1'
        value={bName}
      />
      <div className='h-24'></div>

      <Input
        placeholder='Enter address'
        title='Address'
        required={true}
        handleChange={setBAddy1}
        value={bAddy1}
      />
      <div className='h-24'></div>
      <Input
        placeholder='Enter line 2'
        title='Line 2'
        handleChange={setBAddy2}
        value={bAddy2}
      />
      <div className='h-24'></div>
      <Input
        placeholder='Enter phone number'
        title='Phone'
        className='relative bottom-5'
        required={true}
        handleChange={setBPhone}
        value={bPhone}
      />
      <div className='h-24'></div>
      <Input
        placeholder='Enter city'
        title='City'
        required={true}
        value={bCity}
        handleChange={setBCity}
      />
      <div className='h-24'></div>
      <Input
        placeholder='Enter zip'
        className='absolute right-20 bottom-28'
        title='Zip code'
        required={true}
        handleChange={setBZip}
        value={bZip}
      />
      <div className='flex flex-col mr-10 relative bottom-10'>
        <label htmlFor='groupName' className='mb-2 text-md font-medium'>
          State *
        </label>
        <Select
          options={states}
          styles={selectStyles}
          onChange={setBState}
          inputValue={bState}
        />
      </div>
      <div className='flex flex-col mr-10'>
        <label htmlFor='groupName' className='mb-2 text-md font-medium'>
          Country *
        </label>
        <Select
          options={countries}
          styles={selectStyles}
          onChange={setBCountry}
          inputValue={bCountry}
        />
      </div>
    </>
  );
};

const Payment = () => {
  const [
    { cardName, cardNum, expMonth, expYear, cvv, profName, email },
    {
      setCardName,
      setCardNum,
      setExpMonth,
      setExpYear,
      setCvv,
      setProfName,
      setEmail,
    },
  ] = useContext(inputContext);
  return (
    <>
      <Input
        placeholder='Enter name on card'
        title='Name on Card'
        required={true}
        handleChange={setCardName}
        value={cardName}
      />
      <div className='h-24'></div>
      <Input
        placeholder='Enter card number'
        title='Card Number'
        required={true}
        handleChange={setCardNum}
        value={cardNum}
      />
      <div className='h-24'></div>
      <div className='flex flex-col'>
        <label htmlFor='groupName' className='mb-2 text-md font-medium'>
          Exp Month *
        </label>
        <Select
          options={months}
          styles={selectStyles}
          inputValue={expMonth}
          onChange={setExpMonth}
        />
      </div>
      <div className='h-24'></div>
      <div className='flex flex-col'>
        <label htmlFor='groupName' className='mb-2 text-md font-medium'>
          Exp Year *
        </label>
        <Select
          options={years}
          styles={selectStyles}
          inputValue={expYear}
          onChange={setExpYear}
        />
      </div>
      <div className='h-24'></div>
      <Input
        placeholder='Enter CVV'
        title='CVV'
        value={cvv}
        required={true}
        handleChange={setCvv}
      />
      <div className='h-24'></div>
      <Input
        placeholder='Enter email'
        title='Email'
        required={true}
        value={email}
        className='mr-9'
        handleChange={setEmail}
      />
      <Input
        placeholder='Enter Profile Name'
        title='Profile Name'
        value={profName}
        required={true}
        handleChange={setProfName}
        className='mr-1'
      />
    </>
  );
};

const ProfileModal = ({
  shown,
  handleClose,
  edit = false,
  editedUuid,
}: {
  shown: boolean;
  handleClose: any;
  edit?: boolean;
  editedUuid?: string;
}) => {
  const [page, setPage] = useState("Shipping");
  const [same, setSame] = useState(false);
  const [sName, setSName] = useState("");
  const [sAddy1, setSAddy1] = useState("");
  const [sAddy2, setSAddy2] = useState("");
  const [sCity, setSCity] = useState("");
  const [sState, setSState] = useState("");
  const [sCountry, setSCountry] = useState("");
  const [sPhone, setSPhone] = useState("");
  const [sZip, setSZip] = useState("");

  const [bName, setBName] = useState("");
  const [bAddy1, setBAddy1] = useState("");
  const [bAddy2, setBAddy2] = useState("");
  const [bCity, setBCity] = useState("");
  const [bState, setBState] = useState("");
  const [bCountry, setBCountry] = useState("");
  const [bPhone, setBPhone] = useState("");
  const [bZip, setBZip] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [profName, setProfName] = useState("");
  const { changeProfiles, currentGroup, profiles } = useContext(
    !edit ? stateContext : modalContext
  );
  useEffect(() => {
    if (edit && shown) {
      const prof: Prof = ipcRenderer.sendSync("get-profile", {
        group: currentGroup,
        uuid: editedUuid,
      });
      console.log(prof);
      setSame(prof.sameBilling);
      setSName(prof.shipping.name);
      setSAddy1(prof.shipping.addy1);
      setSAddy2(prof.shipping.addy2);
      setSCity(prof.shipping.city);
      setSState(prof.shipping.state);
      setSCountry(prof.shipping.country);
      setSPhone(prof.shipping.phone);
      setSZip(prof.shipping.zip);

      setBName(prof.billing.name);
      setBAddy1(prof.billing.addy1);
      setBAddy2(prof.billing.addy2);
      setBCity(prof.billing.city);
      setBState(prof.billing.state);
      setBCountry(prof.billing.country);
      setBPhone(prof.billing.phone);
      setBZip(prof.billing.zip);

      setCardName(prof.payment.name);
      setCardNum(prof.payment.cnb);
      setExpMonth(prof.payment.month);
      setExpYear(prof.payment.year);
      setCvv(prof.payment.cvv);
      setEmail(prof.email);
      setProfName(prof.profile_name);
    }
  }, [shown]);
  if (!shown) return null;
  function handleClick(e) {
    if (e.target.getAttribute("id") === "modalBackground") handleClose();
  }
  function submitData() {
    if (
      !profName ||
      !email ||
      !sName ||
      !sPhone ||
      !sAddy1 ||
      !sZip ||
      !sCity ||
      !sState ||
      !sCountry ||
      (!same &&
        (!bName ||
          !bAddy1 ||
          !bAddy2 ||
          !bCity ||
          !bState ||
          !bZip ||
          !bPhone ||
          !bCountry))
    )
      return toast.error("Please fill all required fields!");
    let profile: Prof = {
      uuid: edit ? editedUuid : "",
      profile_name: profName,
      email: email,
      one_checkout: false,
      shipping: {
        name: sName,
        phone: sPhone,
        addy1: sAddy1,
        addy2: sAddy2,
        zip: sZip,
        city: sCity,
        state: sState,
        country: sCountry,
      },
      sameBilling: same,
      billing: same
        ? {
            name: sName,
            phone: sPhone,
            addy1: sAddy1,
            addy2: sAddy2,
            zip: sZip,
            city: sCity,
            state: sState,
            country: sCountry,
          }
        : {
            name: bName,
            phone: bPhone,
            addy1: bAddy1,
            addy2: bAddy2,
            zip: bZip,
            city: bCity,
            state: bState,
            country: bCountry,
          },
      payment: {
        name: cardName,
        cnb: cardNum,
        month: expMonth,
        year: expYear,
        cvv: cvv,
        type: "",
      },
    };
    if (cardNum.charAt(0) === "5") {
      profile.payment.type = "MasterCard";
    } else if (cardNum.charAt(0) === "4") {
      profile.payment.type = "Visa";
    } else if (profile.payment.cvv.length === 4) {
      profile.payment.type = "AmericanExpress";
    } else {
      profile.payment.type = "Discover";
    }

    console.log(profile);

    if (!edit) {
      const uuid = ipcRenderer.sendSync("add-profile", {
        profile,
        group: currentGroup,
      });
      changeProfiles([
        ...profiles,
        {
          uuid,
          name: profile.profile_name,
          last4: profile.payment.cnb.substring(profile.payment.cnb.length - 4),
          address: profile.shipping.addy1,
          email: profile.email,
          type: profile.payment.type,
        },
      ]);
    } else {
      ipcRenderer.send("edit-profile", {
        group: currentGroup,
        uuid: editedUuid,
        newProf: profile,
      });
      let copy = [...profiles];
      let [res] = copy.filter((obj) => obj.uuid === editedUuid);
      const index = copy.indexOf(res);
      if (index > -1) {
        copy.splice(index, 1);
        copy[index].name = profile.profile_name;
        copy[index].last4 = profile.payment.cnb.substring(
          profile.payment.cnb.length - 4
        );
        copy[index].address = profile.shipping.addy1;
        copy[index].email = profile.email;
        copy[index].type = profile.payment.type;
        changeProfiles(copy);
        toast.success("Edited Profile!");
      }
    }

    handleClose();
  }

  function pageHandler() {
    switch (page.toLowerCase()) {
      case "shipping":
        return (
          <inputContext.Provider
            value={[
              {
                sName,
                sAddy1,
                sAddy2,
                sCity,
                sState,
                sCountry,
                sPhone,
                sZip,
              },
              {
                setSName,
                setSAddy1,
                setSAddy2,
                setSCity,
                setSState,
                setSCountry,
                setSame,
                setSPhone,
                setSZip,
              },
            ]}
          >
            <Shipping setSame={setSame} same={same} />
          </inputContext.Provider>
        );
      case "billing":
        return (
          <inputContext.Provider
            value={[
              {
                bName,
                bAddy1,
                bAddy2,
                bCity,
                bState,
                bCountry,
                bPhone,
                bZip,
              },
              {
                setBName,
                setBAddy1,
                setBAddy2,
                setBCity,
                setBState,
                setBCountry,
                setBPhone,
                setBZip,
              },
            ]}
          >
            <Billing />
          </inputContext.Provider>
        );
      case "payment":
        return (
          <inputContext.Provider
            value={[
              {
                cardName,
                cardNum,
                expMonth,
                expYear,
                cvv,
                profName,
                email,
              },
              {
                setCardName,
                setCardNum,
                setExpMonth,
                setExpYear,
                setCvv,
                setProfName,
                setEmail,
              },
            ]}
          >
            <Payment />
          </inputContext.Provider>
        );
    }
  }
  function displayBilling() {
    if (!same)
      return (
        <>
          <button
            className='font-md text-sm'
            onClick={() => setPage("Billing")}
            style={{
              color: page === "Billing" ? "#FFFFFF" : "#6F6B75",
            }}
          >
            Billing
          </button>
        </>
      );
  }

  return (
    <>
      <div
        className='top-0 left-0 w-full h-full flex justify-center items-center absolute z-30'
        style={darken}
        onClick={handleClick}
        id='modalBackground'
      >
        <div
          className='w-2/5 h-4/5 flex flex-col relative rounded-md z-50'
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
              className='absolute top-5 left-12 text-md font-semibold p-2 '
              style={botBorder}
            >
              Add Profile - {page}
            </div>

            <div className='flex flex-row justify-between absolute right-12 top-12'>
              <button
                className='font-md text-sm mr-2'
                style={{ color: page === "Shipping" ? "#FFFFFF" : "#6F6B75" }}
                onClick={() => setPage("Shipping")}
              >
                Shipping
              </button>
              {displayBilling()}
              <button
                className='font-md text-sm ml-2'
                onClick={() => setPage("Payment")}
                style={{ color: page === "Payment" ? "#FFFFFF" : "#6F6B75" }}
              >
                Payment
              </button>
            </div>
          </div>
          <div className='modalBottom relative flex flex-wrap flex-row justify-between px-10 py-5 h-full w-full'>
            {pageHandler()}
            <button
              className='rounded-lg text-center align-middle absolute bottom-5 right-8 h-10 w-16'
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

export default ProfileModal;
