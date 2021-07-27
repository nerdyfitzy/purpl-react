import Capmonster from "../capmonster";
import got from "got";

class ImageCaptcha extends Capmonster {
  constructor(key) {
    super(key);
  }

  async reqCaptcha(imgb64) {
    return new Promise(async (resolve, reject) => {
      try {
        const { body } = await got.post(
          "https://api.capmonster.cloud/createTask",
          {
            headers: {
              "content-type": "application/json",
            },
            json: {
              clientKey: this.key,
              task: {
                type: "ImageToTextTask",
                body: imgb64,
              },
            },
            responseType: "json",
          }
        );
        //@ts-ignore
        const taskID = body.taskId;
        console.log(body);
        setTimeout(async () => {
          console.log("Asking for Solution");
          const solution = await this.getCaptchaStatus(this.key, taskID);
          console.log("Got solution");
          resolve(solution);
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    });
  }
}

export default ImageCaptcha;
