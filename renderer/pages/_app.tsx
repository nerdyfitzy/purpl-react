import React from "react";
import type { AppProps } from "next/app";
import { HotKeys } from "react-hotkeys";

import "../styles/globals.css";
import "react-vis/dist/style.css";

const keyMap = {
  SELECT_ALL: "ctrl+a",
  DESELECT_ALL: "ctrl+q",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <HotKeys keyMap={keyMap}>
        <Component {...pageProps} />
      </HotKeys>
    </React.Fragment>
  );
}

export default MyApp;
