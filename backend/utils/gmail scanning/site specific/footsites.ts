import GmailScanner from "../auth";
import { google } from "googleapis";
import * as console from "../../../utils/logger";
import * as cheerio from "cheerio";
import fs from "fs";
import EventEmitter from "events";
import OrderManager from "../../../modules/analytics/orderManager";

class FootsitesScanner extends GmailScanner {
  lastChecked;
  lastOrder;
  inter;
  manager;
  constructor() {
    super();
    this.lastChecked = 0;
    this.lastOrder = "";
    this.inter;
    this.manager = new OrderManager();
  }

  scanForOrders() {
    return new Promise(async (resolve, reject) => {
      if (!this.oauth2) await this.getOauth2();
      const gmail = google.gmail({ version: "v1", auth: this.oauth2 });
      this.inter = setInterval(() => {
        console.log("Scanning For Footsite Orders");
        gmail.users.messages.list(
          {
            userId: "me",
            q:
              this.lastChecked === 0
                ? `from:(transactions@e.eastbay.com || transactions@e.footlocker.com || transactions@e.footaction.com || transactions@e.champssports.com || transactions@e.kidsfootlocker.com)`
                : `from:(transactions@e.eastbay.com || transactions@e.footlocker.com || transactions@e.footaction.com || transactions@e.champssports.com || transactions@e.kidsfootlocker.com) after:${this.lastChecked}`,
            includeSpamTrash: false,
          },
          (err, res) => {
            if (err) console.log(err, "error");
            if (res.data.messages) {
              const id = res.data.messages[0].id;
              gmail.users.messages.get(
                {
                  userId: "me",
                  id: id,
                  format: "raw",
                },
                async (err, res) => {
                  if (err) console.log(err, "error");
                  //@ts-ignore
                  const b64 = res.data.raw;

                  const html = Buffer.from(b64, "base64").toString("ascii");
                  const sku = html
                    .split("<strong>SKU</strong>: ")[1]
                    .split(" <strong>")[0]
                    .split(" ")[0]
                    .trim();

                  const orderNum = html
                    .split("Order:</strong>")[1]
                    .split("</font></td>")[0]
                    .trim();

                  const size = html
                    .split("Size</strong>: ")[1]
                    .split("<strong>")[0]
                    .trim();

                  const price = parseInt(
                    html
                      .split("<strong><strong>$")[1]
                      .split("</strong></strong>")[0]
                      .trim()
                  );
                  const a = await gmail.users.messages.get({
                    userId: "me",
                    id: id,
                    format: "full",
                  });
                  fs.writeFileSync("asdsa.json", JSON.stringify(a));
                  const { value } = a.data.payload.headers.filter(
                    (head) => head.name === "To"
                  )[0];
                  const from = a.data.payload.headers.filter(
                    (head) => head.name === "From"
                  )[0].value;
                  let site = from.includes("Foot Locker")
                    ? "Footlocker"
                    : from.includes("East")
                    ? "Eastbay"
                    : from.includes("Foot Action")
                    ? "Footaction"
                    : from.includes("Champs")
                    ? "Champssports"
                    : from.includes("Kids")
                    ? "Kids Footlocker"
                    : "Unknown";
                  this.manager.newOrder({
                    specialSku: sku,
                    orderNum,
                    size,
                    price,
                    email: value,
                    site,
                  });
                  console.log("Successfully Emit Event");
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
