import fs from "fs";
import path from "path";
import GmailScanner from "../gmail scanning/auth";
import * as console from "../../utils/logger";

const saveSettings = async (
  webhook = false,
  chromePath = false,
  gmailToken = false,
  twoCaptcha = false,
  fivesim = false,
  key = false
) => {
  console.log("saving settings");
  const oldSettings = JSON.parse(
    fs
      .readFileSync(
        path.join(process.env.APPDATA, "purpl", "local-data", "config.json")
      )
      .toString()
  );
  var token = "";
  if (gmailToken && oldSettings.misc.authorizedToken === "") {
    console.log("Getting new Token");
    const scanner = new GmailScanner(gmailToken);
    token = await scanner.getOauth2();
  }
  const newSettings = {
    global: {
      webhook: webhook ? webhook : oldSettings.global.webhook,
      activated: false,
      key: key ? key : oldSettings.global.key,
      chromePath: chromePath ? chromePath : oldSettings.global.chromePath,
    },
    gmailSettings: {
      maxRunning: 10,
      sleepinputlow: 300,
      sleepinputhigh: 480,
      runinputlow: 30,
      runinputhigh: 60,
    },

    misc: {
      gmailToken: gmailToken ? gmailToken : oldSettings.misc.gmailToken,
      fivesim: fivesim ? fivesim : oldSettings.misc.fivesim,
      twoCaptcha: twoCaptcha ? twoCaptcha : oldSettings.misc.twoCaptcha,
      authorizedToken: oldSettings.misc.authorizedToken
        ? oldSettings.misc.authorizedToken
        : token,
    },
  };
  fs.writeFileSync(
    path.join(process.env.APPDATA, "purpl", "local-data", "config.json"),
    JSON.stringify(newSettings)
  );
};

const getSettings = () => {
  console.log("getting settings");
  return JSON.parse(
    fs
      .readFileSync(
        path.join(process.env.APPDATA, "purpl", "local-data", "config.json")
      )
      .toString()
  );
};

export { saveSettings, getSettings };
