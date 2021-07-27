import got from "got";

class FiveSim {
  token;
  taskId;
  constructor(key) {
    this.token = key;
  }

  async checkOrder(id) {
    return new Promise(async (resolve, reject) => {
      console.log("CHECKING ORDEr!!!!");
      const res = await got.get(`https://5sim.net/v1/user/check/${id}`, {
        headers: {
          authorization: `Bearer ${this.token}`,
          accept: "application/json",
        },
        responseType: "json",
      });
      //@ts-ignore
      if (res.body.status === "RECEIVED") {
        console.log("received", res.body);
        //@ts-ignore
        if (typeof res.body.sms[0] === "undefined") {
          reject("re-send");
        } else {
          //@ts-ignore
          resolve(res.body.sms[0].code);
        }
      } else {
        setTimeout(async () => {
          resolve(await this.checkOrder(id));
        }, 2000);
      }
    });
  }

  async getNumber() {
    console.log("Getting number");
    const res = await got.get(
      `https://5sim.net/v1/user/buy/activation/russia/any/amazon`,
      {
        headers: {
          authorization: `Bearer ${this.token}`,
          accept: "application/json",
        },
        responseType: "json",
      }
    );
    //@ts-ignore
    return [res.body.phone, res.body.id];
  }
}

export default FiveSim;
