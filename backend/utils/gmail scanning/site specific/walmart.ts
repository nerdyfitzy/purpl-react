import GmailScanner from "../auth";
import { google } from "googleapis";
import * as console from "../../../utils/logger";
import * as cheerio from "cheerio";
import fs from "fs";
import EventEmitter from "events";
import { OrderManager } from "../../../modules/analytics/orderManager";
import path from "path";

class WalmartScanner extends GmailScanner {
  lastChecked;
  lastOrder;
  inter;
  manager;
  firstScan;
  constructor() {
    super();
    this.lastChecked = 0;
    this.lastOrder = "";
    this.inter;
    this.manager = new OrderManager();
    this.firstScan = !fs.existsSync(
      path.join(process.env.APPDATA, "purpl", "local-data", "orders.json")
    );
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
              for (
                let i = 0;
                this.firstScan ? i < res.data.messages.length : i < 1;
                i++
              ) {
                console.log("getting email number " + i);
                const id = res.data.messages[i].id;
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
                  }
                );
              }

              this.firstScan = false;
            }
          }
        );
      }, 5000);
    });
  }

  end() {
    clearInterval(this.inter);
  }
}

export default WalmartScanner;
