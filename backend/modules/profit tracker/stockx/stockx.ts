import { cancelAsk } from "./cancelAsk";
import { editAsk } from "./editAsk";
import { getStockxPricesAsTable, getStockxGraphs } from "./getPrices";
import { login } from "./login";
import { placeAsk } from "./placeask";
import search from "./searchProducts";
import { getVar } from "./getVar";
import getAllSales from "./getAllSales";

export default {
  cancelAsk: cancelAsk,
  editAsk: editAsk,
  getStockxGraphs: getStockxGraphs,
  getStockxPricesAsTable: getStockxPricesAsTable,
  login: login,
  placeAsk: placeAsk,
  search: search,
  getVar: getVar,
  getAllSales,
};
