import fs from "fs";
import path from "path";
import { FormattedOrder, Order } from "./types/order";
import search from "../profit tracker/stockx/searchProducts";
import * as console from "../../utils/logger";

let orders: Array<FormattedOrder> = fs.existsSync(
  path.join(process.env.APPDATA, "purpl", "local-data", "orders.json")
)
  ? JSON.parse(
      fs
        .readFileSync(
          path.join(process.env.APPDATA, "purpl", "local-data", "orders.json")
        )
        .toString()
    )
  : [];

class OrderManager {
  constructor() {}

  async newOrder(orderInfo: Order) {
    if (
      orders.filter((order) => order.orderNum === orderInfo.orderNum).length > 0
    )
      return;
    switch (orderInfo.site) {
      case "Footlocker" ||
        "Footaction" ||
        "Champssports" ||
        "Eastbay" ||
        "Kids Footlocker": {
        const answers = await search(
          orderInfo.specialSku.slice(0, -3) +
            "-" +
            orderInfo.specialSku.slice(-3)
        );
        console.log(answers);
        const sku = answers[0].sku;

        const formattedOrder: FormattedOrder = {
          site: orderInfo.site,
          sku: sku,
          image: answers[0].img,
          price: orderInfo.price,
          email: orderInfo.email,
          orderNum: orderInfo.orderNum,
          size: orderInfo.size,
        };
        //send that to frontend
        orders.push(formattedOrder);
        fs.writeFileSync(
          path.join(process.env.APPDATA, "purpl", "local-data", "orders.json"),
          JSON.stringify(orders)
        );
        console.log("Added Formatted Order", "info");
        break;
      }
    }
  }
}

export default OrderManager;
