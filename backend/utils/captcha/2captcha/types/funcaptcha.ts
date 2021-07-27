import got from "got";
import TwoCaptcha from "../2captcha";

class FunCaptcha extends TwoCaptcha {
  constructor(key) {
    super(key);
  }

  async requestSolve(pkey, url, surl) {
    return new Promise(async (resolve, reject) => {
      const res = await got.post("http://2captcha.com/in.php", {
        headers: {
          "content-type": "application/json",
        },
        json: {
          key: this.key,
          method: "funcaptcha",
          publickey: pkey,
          surl,
          pageurl: url,
          json: 1,
        },
        responseType: "json",
      });
      //@ts-ignore
      if (res.body.status === 0) console.log(res.body);
      //@ts-ignore
      const task = res.body.request;
      if (task === "ERROR_ZERO_BALANCE") reject("Out of Balance");
      console.log("Got captcha id", task);
      setTimeout(async () => {
        try {
          const sol = await this.getCaptchaResponse(task, this.key);
          resolve(sol);
        } catch (e) {
          console.log("Error Occured! Resolving");
          resolve(await this.requestSolve(pkey, url, surl));
        }
      }, 7000);
    });
  }
}

export default FunCaptcha;
