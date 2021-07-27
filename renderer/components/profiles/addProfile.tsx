import React, { useState } from "react";
import Input from "../styledInput";
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

const countries = [
  { label: "Canada", value: "CA" },
  { label: "United Kingdom", value: "GB" },
  { label: "United States", value: "US" },
  { label: "China", value: "CN" },
];

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
  return (
    <>
      <Input
        placeholder='Enter name'
        title='Name'
        required={true}
        className='mr-1'
      />
      <div className='h-24'></div>

      <Input placeholder='Enter address' title='Address' required={true} />
      <div className='h-24'></div>
      <Input placeholder='Enter line 2' title='Line 2' />
      <div className='h-24'></div>
      <Input placeholder='Enter phone number' title='Phone' required={true} />
      <div className='h-24'></div>
      <Input placeholder='Enter city' title='City' required={true} />
      <div className='h-24'></div>
      <div className='flex flex-col mr-10'>
        <label htmlFor='groupName' className='mb-2 text-md font-medium'>
          State *
        </label>
        <Select options={states} styles={selectStyles} />
      </div>
      <div className='flex flex-col mr-10'>
        <label htmlFor='groupName' className='mb-2 text-md font-medium'>
          Country *
        </label>
        <Select options={countries} styles={selectStyles} />
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
  return (
    <>
      <Input
        placeholder='Enter name'
        title='Name'
        required={true}
        className='mr-1'
      />
      <div className='h-24'></div>

      <Input placeholder='Enter address' title='Address' required={true} />
      <div className='h-24'></div>
      <Input placeholder='Enter line 2' title='Line 2' />
      <div className='h-24'></div>
      <Input placeholder='Enter phone number' title='Phone' required={true} />
      <div className='h-24'></div>
      <Input placeholder='Enter city' title='City' required={true} />
      <div className='h-24'></div>
      <div className='flex flex-col mr-10'>
        <label htmlFor='groupName' className='mb-2 text-md font-medium'>
          State *
        </label>
        <Select options={states} styles={selectStyles} />
      </div>
      <div className='flex flex-col mr-10'>
        <label htmlFor='groupName' className='mb-2 text-md font-medium'>
          Country *
        </label>
        <Select options={countries} styles={selectStyles} />
      </div>
    </>
  );
};

const Payment = () => {
  return (
    <>
      <Input
        placeholder='Enter name on card'
        title='Name on Card'
        required={true}
      />
      <div className='h-24'></div>
      <Input
        placeholder='Enter card number'
        title='Card Number'
        required={true}
      />
      <div className='h-24'></div>
      <div className='flex flex-col'>
        <label htmlFor='groupName' className='mb-2 text-md font-medium'>
          Exp Month *
        </label>
        <Select options={months} styles={selectStyles} />
      </div>
      <div className='h-24'></div>
      <div className='flex flex-col'>
        <label htmlFor='groupName' className='mb-2 text-md font-medium'>
          Exp Year *
        </label>
        <Select options={years} styles={selectStyles} />
      </div>
      <div className='h-24'></div>
      <Input placeholder='Enter CVV' title='CVV' required={true} />
      <div className='h-24'></div>
      <Input
        placeholder='Enter email'
        title='Email'
        required={true}
        className='mr-9'
      />
      <Input
        placeholder='Enter Profile Name'
        title='Profile Name'
        required={true}
        className='mr-1'
      />
    </>
  );
};

const ProfileModal = ({
  shown,
  handleClose,
}: {
  shown: boolean;
  handleClose: any;
}) => {
  const [page, setPage] = useState("Shipping");
  const [same, setSame] = useState(false);
  if (!shown) return null;
  function handleClick(e) {
    if (e.target.getAttribute("id") === "modalBackground") handleClose();
  }
  function submitData() {}

  function pageHandler() {
    switch (page.toLowerCase()) {
      case "shipping":
        return <Shipping setSame={setSame} same={same} />;
      case "billing":
        return <Billing />;
      case "payment":
        return <Payment />;
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
        className='w-full h-full flex justify-center items-center absolute z-30'
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
