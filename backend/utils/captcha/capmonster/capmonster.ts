import got from "got";

class Capmonster {
  key;
  constructor(key) {
    this.key = key;
  }

  getCaptchaStatus(key, taskID) {
    return new Promise(async (resolve, reject) => {
      console.log(key, taskID);
      try {
        const res = await got.post(
          "https://api.capmonster.cloud/getTaskResult",
          {
            headers: {
              "content-type": "application/json",
            },
            json: {
              clientKey: key,
              taskId: taskID,
            },
            responseType: "json",
          }
        );
        console.log("returned", res);
        //@ts-ignore
        if (res.body.status === "ready") resolve(res.body.solution.text);

        setTimeout(() => {
          resolve(this.getCaptchaStatus(key, taskID));
        }, 1000);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default Capmonster;
