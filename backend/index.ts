import io, { Manager } from "socket.io-client";
import DiscordRPC from "discord-rpc";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import * as console from "./utils/logger";
import { ipcRenderer } from "electron";
import { machineId } from "node-machine-id";
import { saveSettings } from "./utils/config/editConfig";
import FootsitesScanner from "./utils/gmail scanning/site specific/footsites";
import Bot from "./utils/webhook scanner/bot";
import { OrderManager } from "./modules/analytics/orderManager";
import currentProcess from "current-processes";
import notifier from "node-notifier";
import Webhook from "./utils/webhook";
const list_of_programs = [
  "HTTPDebuggerUI.exe",
  "asdsdaasdwqesdg.exe",
  "Fiddler Everywhere.exe",
  "HTTPDebuggerSvc.exe",
  "Fiddler.WebUi.exe",
  "fiddler.exe",
  "fiddler",
  "wireshark",
  "debugger",
  "Proxyman",
  "Charles",
  "ghidra",
  "ollydbg.exe",
  "ProcessHacker.exe",
  "tcpview.exe",
  "autoruns.exe",
  "autorunsc.exe",
  "filemon.exe",
  "procmon.exe",
  "regmon.exe",
  "procexp.exe",
  "idaq.exe",
  "idaq64.exe",
  "ImmunityDebugger.exe",
  "Wireshark.exe",
  "dumpcap.exe",
  "HookExplorer.exe",
  "ImportREC.exe",
  "PETools.exe",
  "LordPE.exe",
  "dumpcap.exe",
  "SysInspector.exe",
  "proc_analyzer.exe",
  "sysAnalyzer.exe",
  "sniff_hit.exe",
  "windbg.exe",
  "joeboxcontrol.exe",
  "joeboxserver.exe",
  "fiddler.exe",
  "Charles.exe",
  "ghidra.exe",
];
let authenticated = false;
const clientId = "785264365963182121";
dotenv.config();
const setActivity = (rpc) => {
  rpc.setActivity({
    details: "Beta 2.0",
    state: "Automation Done Better",
    startTimestamp: Date.now(),
    largeImageKey: "purpl",
    largeImageText: "saving time.",
    smallImageKey: "purpl_captcha",
    smallImageText: "farming gmails",
    instance: true,
  });
};

const presence = () => {
  const rpc = new DiscordRPC.Client({ transport: "ipc" });
  rpc.login({ clientId }).catch();
  rpc.on("ready", () => {
    setActivity(rpc);
    console.log(
      `[${new Date().toLocaleTimeString()}] - Set Discord Presence`,
      "info"
    );
  });
};

var socket;

const sendKey = (key) => {
  return new Promise(async (resolve, reject) => {
    socket.on("message", (message) => {
      const wsParsed = JSON.parse(message);
      console.log(`Received msg from server, ${wsParsed}`, "debug");
      switch (wsParsed.op) {
        case 1:
          if (wsParsed.hwId === hwid) {
            console.log(
              `[${new Date().toLocaleTimeString()}] - Key found in config, skipping key page`,
              "info"
            );
          } else {
            console.log(
              `[${new Date().toLocaleTimeString()}] - No key in config. Must input`,
              "info"
            );
          }
          break;
        case 2:
          if (wsParsed.success === 1) {
            console.log(
              `[${new Date().toLocaleTimeString()}] - Successfully Activated!`,
              "info"
            );
            saveSettings(false, false, false, false, false, key);
            resolve({ success: 1 });
          } else {
            console.log(
              `[${new Date().toLocaleTimeString()}] - Error activating.`,
              "error"
            );
            resolve({ success: 0, reason: wsParsed.error });
          }

          break;
      }
    });
    const hwid = await machineId();
    socket.send(
      JSON.stringify({
        op: 1,
        key,
        hwid,
      })
    );
  });
};

const startSocket = () => {
  //@ts-ignore
  socket = io.connect("https://ancient-lake-42941.herokuapp.com/");
  socket.on("connect", async () => {
    console.log(
      `[${new Date().toLocaleTimeString()}] - Connected to API`,
      "info"
    );
    presence();
  });

  return 1;
};

const noCrackingBangBang = () => {
  setInterval(async () => {
    currentProcess.get(async function (err, processes) {
      for (let i = 0; i < list_of_programs.length; i += 1) {
        if (
          JSON.stringify(processes)
            .toLowerCase()
            .includes(list_of_programs[i].toLowerCase())
        ) {
          console.log("stop crack");
          const hook = new Webhook();
          await hook.send({
            content:
              "@everyone this man is trying to crack purpl software laugh at him",
          });
          //@ts-ignore
          notifier.notify({
            title: "Jolt Account Tool",
            message: "Your license key has been suspended for being sussy.",
            icon: "https://www.scarymommy.com/wp-content/uploads/2019/09/GettyImages-146582583-min-1.jpg",
          });

          process.exit(1);
        }
      }
    });
  }, 5000);
};

const setup = () => {
  return new Promise(async (resolve, reject) => {
    startSocket();
    noCrackingBangBang();
    if (
      !fs.existsSync(path.join(process.env.APPDATA, "purpl", "local-data")) ||
      !fs.existsSync(
        path.join(process.env.APPDATA, "purpl", "local-data", "config.json")
      )
    ) {
      console.log("files dont exist, making");
      // fs.mkdirSync(path.join(process.env.APPDATA, "purpl", "local-data"));
      fs.mkdirSync(
        path.join(process.env.APPDATA, "purpl", "local-data", "exports")
      );
      fs.mkdirSync(
        path.join(
          process.env.APPDATA,
          "purpl",
          "local-data",
          "exports",
          "accounts"
        )
      );
      fs.mkdirSync(
        path.join(
          process.env.APPDATA,
          "purpl",
          "local-data",
          "exports",
          "profiles"
        )
      );
      fs.mkdirSync(
        path.join(
          process.env.APPDATA,
          "purpl",
          "local-data",
          "exports",
          "gmails"
        )
      );

      fs.writeFileSync(
        path.join(process.env.APPDATA, "purpl", "local-data", "config.json"),
        JSON.stringify({
          global: {
            webhook: "",
            activated: false,
            key: "",
            chromePath:
              "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          },
          gmailSettings: {
            maxRunning: 10,
            sleepinputlow: 300,
            sleepinputhigh: 480,
            runinputlow: 30,
            runinputhigh: 60,
          },

          misc: {
            gmailToken: "",
            fivesim: "",
            twoCaptcha: "",
            authorizedToken: "",
            botToken: "",
          },
        })
      );
    }
    const config_unparsed = fs.readFileSync(
      path.join(process.env.APPDATA, "purpl", "local-data", "config.json")
    );
    const config = JSON.parse(config_unparsed.toString());
    console.log(config.misc);
    if (config.misc.botToken !== "") {
      console.log("Starting Webhook Scanner");
      const robot = new Bot(config.misc.botToken);
      robot.start();
      const manager = new OrderManager();
      manager.startListener();
    }
    if (process.env.NODE_ENV === "development") {
      resolve(1);
      return;
    }

    if (config.global.key !== "") {
      console.log(
        `[${new Date().toLocaleTimeString()}] - Key found in config (${
          config.global.key
        }), sending to server`,
        "info"
      );
      const hwid = await machineId();
      socket.send(
        JSON.stringify({
          op: 1,
          key: config.global.key,
          hwid,
        })
      );
      socket.on("message", (message) => {
        const wsParsed = JSON.parse(message);
        console.log(
          `Received msg from server, ${JSON.stringify(wsParsed)}`,
          "debug"
        );
        switch (wsParsed.op) {
          case 2:
            if (wsParsed.success === 1) {
              console.log(
                `[${new Date().toLocaleTimeString()}] - Successfully Activated!`,
                "info"
              );
              resolve(1);
            } else {
              console.log(
                `[${new Date().toLocaleTimeString()}] - Error activating.`,
                "error"
              );
              resolve(0);
            }

            break;
        }
      });
    } else {
      console.log(
        `[${new Date().toLocaleTimeString()}] - No key found`,
        "info"
      );
      resolve(0);
    }
  });
};

export default {
  sendKey,
  setup,
};
