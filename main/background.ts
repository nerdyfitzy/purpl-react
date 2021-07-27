import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import GmailFarmer from "../backend/modules/gmailfarming/index";
import engine from "../backend/index";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();
  const code = await engine.setup();
  const mainWindow = createWindow("main", {
    width: 1600,
    height: 500,
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
