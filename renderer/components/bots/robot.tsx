import React from "react";

const Robot = () => {
  return (
    <div
      className='p-6 rounded-lg mb-4 h-56'
      style={{
        width: "49%",
        background:
          "linear-gradient(97.17deg, #332E3A 13.22%, rgba(51, 46, 58, 0) 127.05%)",
      }}
    >
      <div
        className='rounded-lg h-full w-full relative flex flex-col justify-end'
        style={{
          background:
            "linear-gradient(110.01deg, #B584FF 5.98%, rgba(148, 86, 241, 0.88) 86.54%)",
        }}
      >
        <div className='absolute top-4 left-4'>
          <img
            src='/images/cybersole.jpg'
            alt='robot'
            className='rounded-full w-16 h-16'
          />
        </div>
        <div className='absolute top-6 left-24 flex flex-col h-24'>
          <div className='font-semibold text-md' style={{ color: "#FFFFFF" }}>
            Cybersole
          </div>
          <div className='font-medium text-sm' style={{ color: "#CCCBDE" }}>
            Lifetime
          </div>
        </div>

        <div className='flex flex-row justify-between w-10/12 my-4 mx-4'>
          <div>
            <label
              htmlFor='license'
              className='font-medium text-sm'
              style={{ color: "#CCCBDE" }}
            >
              License
            </label>
            <div
              className='rounded-lg p-2 mt-2 drop-shadow-sm text-sm'
              style={{
                background: "#B584FF",
                borderWidth: "1px",
                borderColor: "#D0CBDE",
              }}
            >
              XXXX-XXXX-XXXX-XXXX
            </div>
          </div>

          <div>
            <label
              htmlFor='value'
              className='font-medium text-sm'
              style={{ color: "#CCCBDE" }}
            >
              Value
            </label>
            <div
              className='rounded-lg px-4 py-2 mt-2'
              style={{
                background: "#81C6DC",
                borderWidth: "1px",
                borderColor: "#D0CBDE",
              }}
            >
              $5000
            </div>
          </div>

          <div>
            <div></div>
            <svg
              className='mt-10 ml-3'
              width='20'
              height='20'
              viewBox='0 0 7 7'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.50516 0C4.68345 0 4.82729 0.144194 4.82729 0.321459L4.8272 1.19652L6.67787 1.19654C6.85616 1.19654 7 1.34074 7 1.518C7.00066 1.69527 6.85616 1.83946 6.67787 1.83946L6.15947 1.83944L6.15955 6.0052C6.16087 6.54427 5.70419 7 5.164 7H1.83666C1.29647 7 0.839787 6.54427 0.839787 6.0052L0.839737 1.83944L0.322128 1.83946C0.143831 1.83946 0 1.69527 0 1.518C0 1.34074 0.143831 1.19654 0.322128 1.19654L2.17403 1.19652L2.17404 0.321459C2.17404 0.144194 2.31787 0 2.49616 0H4.50516ZM5.51521 1.83944H1.484L1.48404 6.0052C1.48404 6.18577 1.65505 6.35642 1.836 6.35642H5.16333C5.34428 6.35642 5.51529 6.18577 5.51529 6.0052L5.51521 1.83944ZM2.69103 2.69205C2.86933 2.69205 3.01316 2.83625 3.01316 3.01351V5.18237C3.01316 5.3603 2.86867 5.50383 2.69103 5.50383C2.51273 5.50383 2.3689 5.35963 2.3689 5.18237V3.01351C2.3689 2.83625 2.51273 2.69205 2.69103 2.69205ZM4.30963 2.69205C4.48792 2.69205 4.63176 2.83625 4.63176 3.01351V5.18237C4.63176 5.3603 4.48792 5.50383 4.30963 5.50383C4.13133 5.50383 3.9875 5.35963 3.9875 5.18237V3.01351C3.9875 2.83625 4.13133 2.69205 4.30963 2.69205ZM4.18237 0.642918H2.81829L2.81829 1.19652H4.18232L4.18237 0.642918Z'
                fill='#CCCBDE'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Robot;
