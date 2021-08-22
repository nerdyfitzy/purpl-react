const got = require("got");
const fs = require("fs");
const path = require("path");

const getStockxPricesAsTable = async (url, size = false) => {
  try {
    const res = await got.get(
      `https://stockx.com/api/products/${url}?includes=market,360&currency=USD&country=US`,
      {
        headers: {
          authority: "stockx.com",
          appversion: "0.1",
          appos: "web",
          "x-requested-with": "XMLHttpRequest",
          "x-session-id": "50407788-d2dd-45c2-bc5d-9319fcd163da",
          authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5USkNNVVEyUmpBd1JUQXdORFk0TURRelF6SkZRelV4TWpneU5qSTNNRFJGTkRZME0wSTNSQSJ9.eyJodHRwczovL3N0b2NreC5jb20vY3VzdG9tZXJfdXVpZCI6IjNhOTI0YmNlLTU4YjgtMTFlOC1hZmVkLTEyZjkyNmEyYzZjNiIsImh0dHBzOi8vc3RvY2t4LmNvbS9nYV9ldmVudCI6IkxvZ2dlZCBJbiIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuc3RvY2t4LmNvbS8iLCJzdWIiOiJhdXRoMHwzYTkyNGJjZS01OGI4LTExZTgtYWZlZC0xMmY5MjZhMmM2YzYiLCJhdWQiOlsiZ2F0ZXdheS5zdG9ja3guY29tIiwiaHR0cHM6Ly9zdG9ja3gtcHJvZC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjI5NTIwNTEyLCJleHAiOjE2Mjk1NjM3MTIsImF6cCI6Ik9WeHJ0NFZKcVR4N0xJVUtkNjYxVzBEdVZNcGNGQnlEIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSJ9.gFT-lsGxXs_VbcIiSA_Y5q0yqzcA4bK2VpmGZMiGX_JIrrY469-OKWO4nsg8PItOon4SgA8Z4E2YB-WCqC1250LDGhn5qg7F13SZMaLe8YOKoELaKetoXSYGcDanvqF4tAG22Xnv86UKeYsKWWHL-9AcD8cNdmLhFuHGZZofmB8IdfxjjFSCGomI6XGSjl1OYVRQP9vMHtSgJbfvAlQUFSvkpepOJksTfOUP5Uvwd1Pkhr8F9jeW_RE7yqoo37p28A3EHOjkFQDKJAjQ75KR3VFve4Hmx6-kvjj1odvx6S809HCh8Jqgx3VRm_O2za5cGd5fyZ8vUuJj3D3cdxOwxQ`,
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36",
          "content-type": "application/json",
          accept: "*/*",
          "sec-gpc": "1",
          origin: "https://stockx.com",
          "sec-fetch-site": "same-origin",
          "sec-fetch-mode": "cors",
          "sec-fetch-dest": "empty",
          "accept-language": "en-US,en;q=0.9",
        },
        responseType: "json",
      }
    );

    if (res.statusCode === 200) {
      let prices = {};
      if (!size) {
        Object.values(res.body.Product.children).forEach((variant) => {
          prices[`${variant.shoeSize}`] = {
            size: variant.shoeSize,
            lowestAsk: variant.market.lowestAsk,
            highestBid: variant.market.highestBid,
            lastSale: variant.market.lastSale,
          };
        });
      } else {
        const found = Object.values(res.body.Product.children).filter(
          (variant) => variant.shoeSize === size
        );

        console.log({
          size: size,
          lowestAsk: found[0].market.lowestAsk,
          highestBid: found[0].market.highestBid,
          lastSale: found[0].market.lastSale,
        });
        return {
          size: size,
          lowestAsk: found[0].market.lowestAsk,
          highestBid: found[0].market.highestBid,
          lastSale: found[0].market.lastSale,
        };
      }
    } else {
      console.log("RES WAS NOT 200" + res);
    }
  } catch (e) {
    console.log(e);
  }
};

getStockxPricesAsTable("adidas-yeezy-slide-pure", "12");

const getStockxGraphs = async (id, startDate, endDate) => {
  try {
    const unparsed = fs.readFileSync(
      path.join(process.env.APPDATA, "purpl", "local-data", "session.json")
    );
    const token = JSON.parse(unparsed).value;
    const res = await got.get(
      `https://stockx.com/api/products/${id}/chart?start_date=${startDate}&end_date=${endDate}&intervals=100&format=highstock&currency=USD&country=US`,
      {
        headers: {
          authority: "stockx.com",
          appversion: "0.1",
          appos: "web",
          "x-requested-with": "XMLHttpRequest",
          "x-session-id": "50407788-d2dd-45c2-bc5d-9319fcd163da",
          authorization: `Bearer ${token}`,
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36",
          "content-type": "application/json",
          accept: "*/*",
          "sec-gpc": "1",
          origin: "https://stockx.com",
          "sec-fetch-site": "same-origin",
          "sec-fetch-mode": "cors",
          "sec-fetch-dest": "empty",
          "accept-language": "en-US,en;q=0.9",
        },
        responseType: "json",
      }
    );

    if (res.statusCode === 200) {
      return res.body.series[0].data;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e.response);
    return false;
  }
};

module.exports = {
  getStockxPricesAsTable: getStockxPricesAsTable,
  getStockxGraphs: getStockxGraphs,
};
