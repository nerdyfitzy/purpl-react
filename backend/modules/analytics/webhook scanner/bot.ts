import Discord, { Client } from "discord.js";

class Bot {
  secret: string;
  client;
  constructor(secretKey) {
    this.secret = secretKey;
    this.client = new Client(null);

    this.client.on("ready", this.start());

    this.client.login(this.secret);
  }

  async scanForOrderAndEmail(msg: Discord.Message) {
    if (msg.embeds.length > 0) {
      let orderArray = [];
      msg.embeds.forEach((embed) => {
        let orderNum;
        let email;
        let store;
        const formattedEmbed = JSON.stringify(embed).toLowerCase();
        if (formattedEmbed.includes("success")) {
          embed.fields.forEach((field) => {
            const fieldName = field.name.toLowerCase();
            if (fieldName.includes("order")) {
              orderNum = field.value;
            }
            if (fieldName.includes("email")) {
              email = field.value;
            }
            if (fieldName.includes("site") || fieldName.includes("store")) {
              store = field.value;
            }
          });
          orderArray.push({ orderNum, email, store });
        }
      });

      return orderArray;
    }

    return [];
  }

  async start() {
    this.client.on("message", async (msg: Discord.Message) => {
      const orders = await this.scanForOrderAndEmail(msg);
      if (orders.length > 0) {
        //handle orders
      }
    });
  }
}
