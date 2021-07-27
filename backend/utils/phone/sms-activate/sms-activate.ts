import got from "got";

class SMS_ACTIVATE {
  apiKey;
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async requestNumber() {
    const res = await got.get(`https://sms-activate.ru/stubs/handler_api.php`, {
      searchParams: {
        api_key: this.apiKey,
        service: "am",
        action: "getNumber",
        country: 187,
      },
    });

    console.log(res.body);
  }
}
