import GmailScanner from "../auth";
import { google } from "googleapis";
import * as console from "../../../utils/logger";
import * as $ from "cheerio";

class FootsitesScanner extends GmailScanner {
  lastChecked;
  lastOrder;
  inter;
  constructor() {
    super();
    this.lastChecked = 0;
    this.lastOrder = "";
    this.inter;
  }

  scanForOrders() {
    return new Promise(async (resolve, reject) => {
      if (!this.oauth2) await this.getOauth2();
      const gmail = google.gmail({ version: "v1", auth: this.oauth2 });
      this.inter = setInterval(() => {
        gmail.users.messages.list(
          {
            userId: "me",
            q:
              this.lastChecked === 0
                ? `from:(transactions@e.eastbay.com || transactions@e.footlocker.com || transactions@e.footaction.com || transactions@e.champssports.com || transactions@e.kidsfootlocker.com)`
                : `from:(transactions@e.eastbay.com || transactions@e.footlocker.com || transactions@e.footaction.com || transactions@e.champssports.com || transactions@e.kidsfootlocker.com) after:${this.lastChecked}`,
            includeSpamTrash: true,
          },
          (err, res) => {
            if (err) console.log(err, "error");
            if (res.data.messages) {
              gmail.users.messages.get(
                {
                  userId: "me",
                  id: res.data.messages[0].id,
                  format: "full",
                },
                async (err, res) => {
                  if (err) console.log(err, "error");
                  console.log(res);
                }
              );
            }
          }
        );
      }, 30000);
    });
  }

  end() {
    clearInterval(this.inter);
  }
}

export default FootsitesScanner;
