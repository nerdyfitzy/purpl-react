import fs from "fs";
import path from "path";
import { FormattedOrder, Order } from "./types/order";
import search from "../profit tracker/stockx/searchProducts";

let orders =
  JSON.parse(
    fs
      .readFileSync(
        path.join(process.env.APPDATA, "purpl", "local-data", "orders.json")
      )
      .toString()
  ) || [];

class OrderManager {
  constructor() {}

  newOrder(orderInfo: Order) {
    switch (orderInfo.site) {
      case "Footlocker" ||
        "Footaction" ||
        "Champssports" ||
        "Eastbay" ||
        "Kids Footlocker": {
        const answers = search(
          orderInfo.specialSku.slice(0, -3) +
            "-" +
            orderInfo.specialSku.slice(-3)
        );
        const sku = answers[0].sku;

        const formattedOrder: FormattedOrder = {
          site: orderInfo.site,
          sku: sku,
          price: orderInfo.price,
          email: orderInfo.email,
          orderNum: orderInfo.orderNum,
          size: orderInfo.size,
        };
        //send that to frontend
        break;
      }
    }
  }
}
