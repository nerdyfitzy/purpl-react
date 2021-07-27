import React from "react";

const Input = ({
  title,
  placeholder,
  required = false,
  className,
  width,
  handleChange,
  value,
}: {
  title: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  width?: string;
  handleChange: any;
  value?: string;
}) => {
  let titleNew = title;
  if (required) titleNew += " *";
  const classes = `flex flex-col ${className}`;
  let inputClasses = `rounded-lg h-12 text-left px-4 text-xs font-medium `;
  if (width) inputClasses += width;
  else inputClasses += "w-56";
  return (
    <div className={classes}>
      <label htmlFor='groupName' className='mb-2 text-md font-medium'>
        {titleNew}
      </label>
      <input
        onChange={(event) => handleChange(event.target.value)}
        id='groupName'
        type='text'
        className={inputClasses}
        style={{ background: "#6B6476" }}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
