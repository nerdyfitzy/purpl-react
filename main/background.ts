import { app, dialog, ipcMain, ipcRenderer } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import GmailFarmer from "../backend/modules/gmailfarming/index";
import engine from "../backend/index";
import ProfileConverter from "../backend/modules/profile maker/index";
import Proxies from "../backend/modules/proxies/index";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();
  app.on("quit", () => {
    GmailFarmer.saveGmails(true);
  });
  const code = await engine.setup();
  const mainWindow = createWindow("main", {
    width: 1600,
    height: 800,
    frame: false,
    webPreferences: {
      enableRemoteModule: true,
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on(
  "load-gmails",
  async (
    event,
    { initial, groupID }: { initial: boolean; groupID: string | undefined }
  ) => {
    const loaded = GmailFarmer.loadGmails(initial, groupID);
    event.returnValue = loaded;
  }
);

ipcMain.on("new-gmail-group", async (event, name) => {
  const newGroup = await GmailFarmer.addGroup(name);
  event.returnValue = newGroup;
});

ipcMain.on(
  "new-gmail",
  async (event, { email, recovery, password, question, proxy, group }) => {
    const newGmail = await GmailFarmer.newGmail(
      email,
      password,
      proxy,
      recovery,
      question,
      group
    );
    event.returnValue = newGmail;
  }
);

ipcMain.on("start-all-gmails", (event, group) => {
  GmailFarmer.startAll(group);
});

ipcMain.on("stop-all-gmails", (event, group) => {
  GmailFarmer.stopAll(group);
});

ipcMain.on("edit-gmail-group", (event, { editedUuid, name }) => {
  if (typeof editedUuid === "string") GmailFarmer.editGroup(name, editedUuid);
});

ipcMain.on("delete-gmail-group", (event, uuid) => {
  GmailFarmer.deleteGroup(uuid);
});

ipcMain.on("get-gmail", async (event, { group, uuid }) => {
  const gmail = await GmailFarmer.getGmail(uuid, group);
  event.returnValue = gmail;
});

ipcMain.on(
  "edit-gmail",
  (event, { email, password, recovery, question, proxy, uuid, group }) => {
    GmailFarmer.editGmail(
      uuid,
      group,
      email,
      password,
      recovery,
      question,
      proxy
    );
  }
);

ipcMain.on("delete-gmail", (event, { groupID, uuid }) => {
  GmailFarmer.deleteGmail(groupID, uuid);
});

ipcMain.on("delete-all-gmails", (event, group) => {
  GmailFarmer.deleteAllGmailsInGroup(group);
});

ipcMain.on("action-gmail", (event, { uuid, groupID }) => {
  GmailFarmer.actionSpecific(uuid, groupID, false);
});

ipcMain.on("import-file", async (event, arg) => {
  dialog
    .showOpenDialog({
      properties: ["openFile"],
    })
    .then(async (res) => {
      const { filePaths } = res;
      var rt;
      switch (arg) {
        case "harvester":
          rt = await GmailFarmer.importFromFile(filePaths[0]);
          break;
        default:
          event.returnValue = undefined;
          return;
      }
      console.log(rt);
      event.returnValue = rt;
    });
});

ipcMain.on("gmail-export", (event, arg) => {
  GmailFarmer.exportGmails();
});

ipcMain.on("copy-gmail-group", (event, group) => {
  const u = GmailFarmer.copyGroup(group);
  event.returnValue = u;
});

ipcMain.on("load-profiles", async (event, { initial, group }) => {
  event.returnValue = await ProfileConverter.loadProfiles(initial, group);
});

ipcMain.on("delete-profile-group", (event, uuid) => {
  ProfileConverter.deleteGroup(uuid);
});

ipcMain.on("edit-profile-group", (event, { editedUuid, name }) => {
  ProfileConverter.editGroup(editedUuid, name);
});

ipcMain.on("delete-all-profs", (event, uuid) => {
  ProfileConverter.deleteAll(uuid);
});

ipcMain.on("add-profile", (event, { profile, group }) => {
  ProfileConverter.addProfile(profile, group);
});

ipcMain.on("load-proxies", async (event, { initial, group }) => {
  event.returnValue = await Proxies.loadProxies(initial, group);
});

ipcMain.on("add-proxy-group", async (event, name) => {
  event.returnValue = await Proxies.addGroup(name);
});

ipcMain.on("edit-proxy-group", (event, { uuid, name }) => {
  Proxies.editGroup(name, uuid);
});

ipcMain.on("delete-proxy-group", (event, uuid) => {
  Proxies.deleteGroup(uuid);
});

ipcMain.on("delete-all-proxies", (event, group) => {
  Proxies.deleteAll(group);
});
