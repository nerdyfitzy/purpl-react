import Discord, { Client } from "discord.js";
import { Order } from "../../modules/analytics/types/order";
import EventEmitter from "events";
import util from "util";

const footsites = ["locker", "action", "champs", "eastbay"];
export const emitter = new EventEmitter();

const getNyteSite = (value) => {
  switch (value) {
    case "Successful Checkout (Foot Locker US)":
      return "Foot Locker";
    case "Successful Checkout (Kids Foot Locker)":
      return "Kids Footlocker";
    case "Successful Checkout (Champs Sports)":
      return "Champs Sports";
    case "Successful Checkout (Footaction)":
      return "Foot Action";
    case "Successful Checkout (Eastbay)":
      return "Eastbay";
    case "Successful Checkout (Yeezy Supply US)":
      return "Yeezy Supply";
    default:
      return "Unknown";
  }
};

const getPrismSite = (val) => {
  let site = val.split("|")[1].trim();
  if (site.includes("Foot Locker")) site = "Foot Locker";

  return site;
};

const getSkuFromImage = (link: string): string => {
  const split = link.split("/");
  if (link.includes("yeezysupply"))
    return split[split.length - 1].split("_")[0];
  else if (link.includes("footlocker")) return split[4];
};

const formatSite = (site) => {
  switch (site) {
    case "footlocker" || "footlocker us" || "foot locker us":
      return "Footlocker";
    case "footaction" || "foot action":
      return "Footaction";
    case "eastbay":
      return "Eastbay";
    case "champs sports" || "champssports":
      return "Champssports";
    case "kids footlocker" || "kids foot locker":
      return "Kids Footlocker";
    case "yeezysupply" || "yeezy supply":
      return "Yeezy Supply";
  }
};

class Bot {
  secret: string;
  client: Discord.Client;
  constructor(secretKey) {
    this.secret = secretKey;
    this.client = new Client();
    this.client.login(secretKey);
  }

  async scanForOrderAndEmail(msg: Discord.Message) {
    if (msg.embeds.length > 0) {
      let orderArray: Array<Order> = [];
      msg.embeds.forEach((embed) => {
        const hasFooter = embed.footer ? true : false;

        let orderNum: string;
        let email: string;
        let site: string;
        let price: number;
        let item: string;
        let size: string;
        let normalSku = "";
        const formattedEmbed = JSON.stringify(
          util.inspect(embed)
        ).toLowerCase();
        if (formattedEmbed.includes("success")) {
          if (hasFooter && embed.footer.text.toLowerCase().includes("nyte")) {
            site = getNyteSite(embed.fields[0].value);
          } else if (
            hasFooter &&
            embed.footer.text.toLowerCase().includes("prism")
          ) {
            site = getPrismSite(embed.fields[0].value);
          }

          embed.fields.forEach((field) => {
            const fieldName = field.name.toLowerCase();
            if (fieldName.includes("order") && !fieldName.includes("email")) {
              orderNum = field.value;
            }
            if (fieldName.includes("email")) {
              email = field.value.replaceAll("|", "");
            }
            if (fieldName.includes("site") || fieldName.includes("store")) {
              site = field.value;

              if (
                (hasFooter &&
                  embed.footer.text.toLowerCase().includes("ganesh")) ||
                embed.author.name.includes("Wrath Success") ||
                embed.footer.text.toLowerCase().includes("tohru")
              ) {
                normalSku = getSkuFromImage(embed.thumbnail.url);
              }
            }
            if (fieldName.includes("product") || fieldName.includes("item")) {
              //add support for hyperlinks, can grab sku
              item = field.value;
            }
            if (fieldName.includes("sku")) {
              normalSku = field.value;
            }
            if (fieldName.includes("size")) {
              size = field.value;
            }
            if (fieldName.includes("price")) {
              price = parseInt(field.value.match(/(\d+)/)[0]);
            }
          });
          orderArray.push({
            orderNum,
            email,
            site: formatSite(site.toLowerCase()),
            normalSku,
            price,
            size,
          });
        }
      });
      return orderArray;
    }

    return [];
  }

  async start() {
    console.log("Robot Is Running");
    this.client.on("message", async (msg: Discord.Message) => {
      console.log("Got A Message");
      const orders = await this.scanForOrderAndEmail(msg);
      if (orders.length > 0) {
        //handle orders
        console.log(orders);
        emitter.emit("new-order", orders);
        console.log("Emitted Event");
      }
    });
  }
}

export default Bot;
