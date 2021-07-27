import got from "got";
import TwoCaptcha from "../2captcha";

class ImgCap extends TwoCaptcha {
  constructor(key) {
    super(key);
  }

  async requestSolve(b64) {
    return new Promise(async (resolve, reject) => {
      const res = await got.post("http://2captcha.com/in.php", {
        headers: {
          "content-type": "application/json",
        },
        json: {
          key: this.key,
          method: "base64",
          body: b64,
          json: 1,
        },
      });
      //@ts-ignore
      const task = res.body.request;
      if (task === "ERROR_ZERO_BALANCE") reject("Out of Balance");
      console.log("Got captcha id", task);
      setTimeout(async () => {
        const sol = await this.getCaptchaResponse(task, this.key);
        resolve(sol);
      }, 15000);
    });
  }
}
