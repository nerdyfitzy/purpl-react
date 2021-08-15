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
    | "Unknown";
}

export interface FormattedOrder {
  site: string;
  sku: string;
  price: number;
  email: string;
  orderNum: string;
  size: string;
}
