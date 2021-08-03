import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

const RightClickMenu = () => {
  const handleClick = () => {
    console.log("handle");
  };
  return (
    <ContextMenu id='gmails'>
      <MenuItem data={{ test: "item" }} onClick={handleClick}></MenuItem>
    </ContextMenu>
  );
};

export default RightClickMenu;
