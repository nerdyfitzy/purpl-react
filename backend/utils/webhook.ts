import got from "got";
import fs from "fs";
import path from "path";
import * as console from "./logger";

class Webhook {
  hook;
  constructor() {
    const temp = fs.readFileSync(
      path.join(process.env.APPDATA, "purpl", "local-data", "config.json")
    );
    const { global } = JSON.parse(temp.toString());
    this.hook = global.webhook;
  }

  async send(data, forcedHook = "") {
    if (this.hook === "") return;
    try {
      const res = await got.post(forcedHook !== "" ? forcedHook : this.hook, {
        headers: {
          "content-type": "application/json",
        },
        json: data,
      });
      console.log(res);
      return 1;
    } catch (e) {
      console.log(e, "error");
      return e;
    }
  }
}

export default Webhook;
