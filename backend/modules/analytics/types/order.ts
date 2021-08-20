export interface Order {
  normalSku?: string;
  specialSku?: string;
  price: number;
  email: string;
  orderNum: string;
  size: string;
  site:
    | "Footlocker"
    | "Footaction"
    | "Eastbay"
    | "Champssports"
    | "Kids Footlocker"
    | "Yeezy Supply"
    | "Unknown";
}

export interface FormattedOrder {
  site: string;
  sku: string;
  image: string;
  price: number;
  email: string;
  orderNum: string;
  size: string;
  name: string;
  date: Date;
}

interface Date {
  year: number;
  month: number;
  dayOfMonth: number;
  day: number;
}

export interface GraphPoint {
  x: number;
  y: number;
}
