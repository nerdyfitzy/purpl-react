import fs from "fs";
import { v4 } from "uuid";
import path from "path";
import * as console from "../../utils/logger";
import { ipcMain } from "electron";
import clipboardy from "clipboardy";
//proxy example

var groups = {
  default: {
    uuid: "default",
    name: "Default List",
    proxies: {},
  },
};

var loaded = false;

const loadProxies = async (fromfile, group) => {
  if (fromfile) {
    if (
      fs.existsSync(
        path.join(process.env.APPDATA, "purpl", "local-data", "proxies.json")
      )
    ) {
      let temp = fs.readFileSync(
        path.join(process.env.APPDATA, "purpl", "local-data", "proxies.json"),
        "utf8"
      );
      groups = JSON.parse(temp);
      return JSON.parse(temp);
    } else {
      saveProxies();
      return groups;
    }
  } else {
    if (
      !loaded &&
      fs.existsSync(
        path.join(process.env.APPDATA, "purpl", "local-data", "proxies.json")
      )
    ) {
      let temp = fs.readFileSync(
        path.join(process.env.APPDATA, "purpl", "local-data", "proxies.json"),
        "utf8"
      );
      groups = JSON.parse(temp);
      loaded = true;
    }
    console.log(
      `[${new Date().toLocaleTimeString()}] - Loading Group ` + group
    );
    if (typeof group === "undefined") return groups;
    if (typeof groups[group] === "undefined") return undefined;
    return groups[group].proxies;
  }
};

var SpeedArr = [];
const setSpeed = (proxy, group, speed) => {
  groups[group].proxies[proxy].speed = speed;
  SpeedArr.push({ proxy, speed });
  saveProxies();
};

ipcMain.on("request-speeds", (event) => {
  event.reply("got-speeds", SpeedArr);
  SpeedArr = [];
});

//proxies are an array of objects, give each a specific uuid and add to the group in question
const addProxies = (proxies, group) => {
  var newProxies = {};
  proxies.forEach((proxy) => {
    let uuid = v4();
    groups[group].proxies[uuid] = {
      uuid: uuid,
      proxy: proxy,
      speed: "Untested",
    };
    newProxies[uuid] = {
      uuid: uuid,
      proxy: proxy,
      speed: "Untested",
    };
  });
  saveProxies();
  return newProxies;
};

const deleteProxy = (uuid, group) => {
  delete groups[group].proxies[uuid];
  saveProxies();
};

const addGroup = (name) => {
  let uuid = v4();
  groups[uuid] = {
    uuid: uuid,
    name: name,
    proxies: {},
  };
  saveProxies();
  return groups[uuid];
};

const editGroup = (newName, uuid) => {
  groups[uuid].name = newName;
  saveProxies();
};

const deleteGroup = (uuid) => {
  delete groups[uuid];
  saveProxies();
};

const deleteAll = (group) => {
  groups[group].proxies = {};
  saveProxies();
};

const getAll = () => {
  return groups;
};

const saveProxies = async () => {
  fs.writeFileSync(
    path.join(process.env.APPDATA, "purpl", "local-data", "proxies.json"),
    JSON.stringify(groups)
  );
  console.log(`[${new Date().toLocaleTimeString()}] - Wrote proxies`, "info");
  return;
};

const copyProxies = (sel, group) => {
  let copy = "";
  for (const id of sel) {
    copy += groups[group].proxies[id].proxy + "\n";
  }

  clipboardy.writeSync(copy);
};

export {
  addGroup,
  editGroup,
  loadProxies,
  deleteProxy,
  addProxies,
  deleteAll,
  getAll,
  saveProxies,
  deleteGroup,
  setSpeed,
  copyProxies,
};
