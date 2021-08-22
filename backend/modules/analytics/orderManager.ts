import fs from "fs";
import path from "path";
import { FormattedOrder, Order, GraphPoint } from "./types/order";
import search from "../profit tracker/stockx/searchProducts";
import * as console from "../../utils/logger";
import { emitter } from "../../utils/webhook scanner/bot";

const quarters = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
];

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
    let stockXurl = "";
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
        const sku = answers[0].sku;
        stockXurl = answers[0].url;
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

        break;
      }

      case "Yeezy Supply": {
        const answers = await search(orderInfo.normalSku);
        stockXurl = answers[0].url;
        const date = new Date();
        const formattedOrder: FormattedOrder = {
          site: orderInfo.site,
          sku: orderInfo.normalSku,
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
        orders.unshift(formattedOrder);
        break;
      }
      default:
        console.log("site not recognized");
        break;
    }

    fs.writeFile(
      path.join(process.env.APPDATA, "purpl", "local-data", "orders.json"),
      JSON.stringify(orders),
      () => {
        console.log("Saved Orders");
      }
    );
  }

  startListener() {
    emitter.on("new-order", (orders: Array<Order>) => {
      console.log("New Orders Detected");
      orders.map((order) => this.newOrder(order));
    });
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

const getMoneySpentGraph = (
  timePeriod: "year" | "month" | "quarter"
): Array<GraphPoint> => {
  let graph = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
    { x: 8, y: 0 },
    { x: 9, y: 0 },
    { x: 10, y: 0 },
    { x: 11, y: 0 },
  ];

  const today = new Date();
  orders.forEach((order) => {
    switch (timePeriod) {
      case "year":
        graph.splice(today.getMonth() + 1);
        console.log(`${order.date.month} monf`);
        if (order.date.year === today.getFullYear())
          graph[order.date.month].y += order.price;
        break;
      case "month":
        graph.splice(6);
        if (order.date.month === today.getMonth())
          graph[Math.round(order.date.dayOfMonth / 5)].y += order.price;
        break;
      case "quarter":
        graph.splice(9);
        const currentQuarter =
          today.getMonth() / 3 < 1
            ? 1
            : today.getMonth() / 3 >= 1 && today.getMonth() / 3 < 2
            ? 2
            : today.getMonth() / 3 >= 2 && today.getMonth() / 3 < 3
            ? 3
            : 4;
        const orderQuarter =
          order.date.month / 3 < 1
            ? 1
            : order.date.month / 3 >= 1 && order.date.month / 3 < 2
            ? 2
            : order.date.month / 3 >= 2 && order.date.month / 3 < 3
            ? 3
            : 4;
        if (currentQuarter === orderQuarter)
          console.log(
            `rounded ${Math.round(
              quarters[orderQuarter - 1].indexOf(order.date.month) * 30 -
                (30 - order.date.dayOfMonth)
            )}`
          );
        console.log(`order q ${orderQuarter}`);
        console.log(JSON.stringify(order.date));
        //[6, 7, 8],
        graph[
          Math.round(
            ((quarters[orderQuarter - 1].indexOf(order.date.month) + 1) * 30 -
              (30 - order.date.dayOfMonth)) /
              10
          )
        ].y += order.price;
        break;
    }
  });

  return graph;
};

const getItemsPurchased = () => {
  const today = new Date();
  return orders.reduce((total, order) => {
    if (today.getDate() - today.getDay() < order.date.dayOfMonth)
      return total + 1;
  }, 0);
};

const getMoneySpentNumber = () => {
  const today = new Date();
  return orders.reduce((total, order) => {
    if (today.getDate() - today.getDay() < order.date.dayOfMonth)
      return total + order.price;
  }, 0);
};

export {
  OrderManager,
  getOrders,
  getCheckoutGraphData,
  getMoneySpentGraph,
  getItemsPurchased,
  getMoneySpentNumber,
};

//    1>   1 <= x < 2   2 <= x < 3 3 <= x
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
