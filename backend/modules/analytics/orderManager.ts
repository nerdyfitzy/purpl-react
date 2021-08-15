import fs from "fs";
import path from "path";
import { FormattedOrder, Order, GraphPoint } from "./types/order";
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
        console.log(`${answers} ${orderInfo.specialSku}`);
        const sku = answers[0].sku;
        const date = new Date();
        const formattedOrder: FormattedOrder = {
          site: orderInfo.site,
          sku: sku,
          image: answers[0].img,
          price: orderInfo.price,
          email: orderInfo.email,
          orderNum: orderInfo.orderNum,
          size: orderInfo.size,
          name: answers[0].name,
          date: {
            year: date.getFullYear(),
            month: date.getMonth(),
            dayOfMonth: date.getDate(),
            day: date.getDay(),
          },
        };
        //send that to frontend
        orders.unshift(formattedOrder);
        fs.writeFile(
          path.join(process.env.APPDATA, "purpl", "local-data", "orders.json"),
          JSON.stringify(orders),
          () => {
            console.log("Saved Orders");
          }
        );
        break;
      }
    }
  }
}

const getOrders = () => {
  return orders.slice(0, 24);
};

const getCheckoutGraphData = (
  timePeriod: "week" | "month" | "year"
): Array<GraphPoint> => {
  let graph = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
  ];
  const today = new Date().getDate();
  orders.forEach((order) => {
    if (today - 7 < order.date.dayOfMonth) {
      console.log(7 + (order.date.dayOfMonth - today));
      graph[6 + (order.date.dayOfMonth - today)].y++;
    }
  });

  return graph;
};

export { OrderManager, getOrders, getCheckoutGraphData };
