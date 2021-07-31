import { ipcRenderer } from "electron";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Input from "../styledInput";

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

const darken = { background: "rgba(0, 0, 0, 0.6)" };

const AccountModal = ({
  shown,
  handleClose,
  group,
  handleSubmit,
  edit = false,
  editedUuid,
}: {
  shown: boolean;
  handleClose: any;
  group: string;
  handleSubmit: any;
  edit?: boolean;
  editedUuid?: string;
}) => {
  if (!shown) return null;

  const [email, setEmail] = useState("");
  const [recovery, setRecovery] = useState("");
  const [password, setPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [proxy, setProxy] = useState("");

  useEffect(() => {
    if (!edit) return;
    const gmail = ipcRenderer.sendSync("get-gmail", {
      group,
      uuid: editedUuid,
    });
    console.log(gmail);
    setEmail(gmail.email);
    setPassword(gmail.password);
    setRecovery(gmail.recovery);
    setQuestion(gmail.security);
    setProxy(gmail.proxy);
    return () => {};
  }, []);

  function handleClick(e) {
    if (e.target.getAttribute("id") === "modalBackground") handleClose();
  }
  function submitData() {
    if (!email || !password)
      return toast.error("Please fill all required fields!");
    if (!edit) {
      toast.success("Added Account!");
      const newGmail = ipcRenderer.sendSync("new-gmail", {
        email,
        recovery,
        password,
        question,
        proxy,
        group,
      });
      handleSubmit({
        uuid: newGmail.uuid,
        email: newGmail.email,
        status: newGmail.status,
        proxy: newGmail.proxy,
        running: newGmail.running,
        score: newGmail.score,
      });
    } else {
      toast.success("Edited Gmail!");
      ipcRenderer.send("edit-gmail", {
        email,
        password,
        recovery,
        question,
        proxy,
        uuid: editedUuid,
        group,
      });
      handleSubmit(email, proxy);
    }

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
              Add Account
            </div>
          </div>
          <div className='modalBottom relative flex flex-wrap flex-row justify-between px-10 py-5'>
            <Input
              placeholder='Enter email'
              title='Email'
              required={true}
              width='w-72'
              className='mr-1'
              handleChange={setEmail}
              value={email}
            />
            <Input
              placeholder='Enter password'
              title='Password'
              required={true}
              width='w-60'
              handleChange={setPassword}
              value={password}
            />
            <div className='h-24'></div>
            <Input
              placeholder='Enter recovery'
              title='Recovery Email'
              width='w-72'
              handleChange={setRecovery}
              value={recovery}
            />
            <Input
              placeholder='Enter security question'
              title='Security Question'
              width='w-60'
              handleChange={setQuestion}
              value={question}
            />
            <div className='h-24'></div>
            <Input
              placeholder='Enter proxy'
              title='Proxy'
              required={true}
              width='w-96'
              handleChange={setProxy}
              value={proxy}
            />
            <button
              className='rounded-lg text-center align-middle absolute -bottom-9 right-8 h-10 w-16'
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

export default AccountModal;
