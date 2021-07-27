import got from "got";
import FunCaptcha from "./types/funcaptcha";

class TwoCaptcha {
  key;
  constructor(key) {
    this.key = key;
  }

  async getCaptchaResponse(taskId, key) {
    return new Promise(async (resolve, reject) => {
      const inter = setInterval(async () => {
        console.log("Getting status of", taskId);
        const res = await got.get("http://2captcha.com/res.php", {
          searchParams: {
            key,
            action: "get",
            id: taskId,
            json: 1,
          },
          responseType: "json",
        });

        console.log(res.body);
        //@ts-ignore
        if (res.body.status === 1) {
          clearInterval(inter);
          //@ts-ignore
          resolve(res.body.request);
          //@ts-ignore
        } else if (res.body.request === "ERROR_CAPTCHA_UNSOLVABLE") {
          clearInterval(inter);
          reject("Unsolvable");
        }
      }, 5000);
    });
  }
}

export default TwoCaptcha;
