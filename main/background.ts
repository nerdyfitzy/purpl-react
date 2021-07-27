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
    width: 1000,
    height: 600,
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
    { fromfile, groupID }: { fromfile: boolean; groupID: string | undefined }
  ) => {
    const loaded = GmailFarmer.loadGmails(fromfile, groupID);
    event.returnValue = loaded;
  }
);
