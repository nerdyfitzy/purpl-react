import * as console from "../../utils/logger";
import got from "got";
import { Robot, Renewal } from "./types/Bot";

const bots: { [k: string]: Robot } = {
  Fuze: {
    bbId: 108,
    types: {
      Renewal: [
        {
          amount: 50,
          timePeriod: 30,
        },
      ],
      Lifetime: false,
    },
  },
  Ominous: {
    bbId: 103,
    types: {
      Renewal: [
        {
          amount: 35,
          timePeriod: 30,
        },
        {
          amount: 50,
          timePeriod: 30,
        },
      ],
      Lifetime: false,
    },
  },
  Ganesh: {
    bbId: 100,
    types: {
      Renewal: [
        {
          amount: 135,
          timePeriod: 60,
          currency: "GBP",
        },
      ],
      Lifetime: true,
    },
  },
  Kage: {
    bbId: 99,
    types: {
      Renewal: [
        {
          amount: 45,
          timePeriod: 30,
        },
      ],
      Lifetime: false,
    },
  },
  Dragon: {
    bbId: 98,
    types: {
      Renewal: [
        {
          amount: 50,
          timePeriod: 30,
        },
      ],
      Lifetime: false,
    },
  },
  MekAIO: {
    bbId: 97,
    types: {
      Renewal: [
        {
          amount: 45,
          timePeriod: 30,
        },
      ],
      Lifetime: false,
    },
  },
  Nebula: {
    bbId: 96,
    types: {
      Renewal: [
        {
          amount: 35,
          timePeriod: 30,
        },
      ],
      Lifetime: true,
    },
  },
  Velox: {
    bbId: 91,
    types: {
      Renewal: [
        {
          amount: 90,
          timePeriod: 30,
          currency: "EUR",
        },
      ],
      Lifetime: true,
    },
  },
  Wrath: {
    bbId: 49,
    types: {
      Renewal: [
        {
          amount: 50,
          timePeriod: 30,
        },
      ],
      Lifetime: true,
    },
  },
  MEKPreme: {
    bbId: 24,
    types: {
      Renewal: [
        {
          amount: 120,
          timePeriod: 180,
        },
      ],
      Lifetime: false,
    },
  },
  SwftAIO: {
    bbId: 22,
    types: {
      Renewal: [
        {
          amount: 90,
          timePeriod: 180,
        },
      ],
      Lifetime: false,
    },
  },
  Polaris: {
    bbId: 18,
    types: {
      Renewal: [
        {
          amount: 95,
          timePeriod: 180,
          currency: "EUR",
        },
        {
          amount: 120,
          timePeriod: 180,
          currency: "EUR",
        },
      ],
      Lifetime: false,
    },
  },
  TohruAIO: {
    bbId: 17,
    types: {
      Renewal: [
        {
          amount: 50,
          timePeriod: 30,
        },
      ],
      Lifetime: false,
    },
  },
  Splashforce: {
    bbId: 11,
    types: {
      Renewal: [
        {
          amount: 60,
          timePeriod: 180,
        },
      ],
      Lifetime: true,
    },
  },
  Prism: {
    bbId: 10,
    types: {
      Renewal: [
        {
          amount: 150,
          timePeriod: 90,
        },
      ],
      Lifetime: false,
    },
  },
  Balko: {
    bbId: 8,
    types: {
      Renewal: [
        { amount: 40, timePeriod: 180 },
        { amount: 60, timePeriod: 180 },
        {
          amount: 360,
          timePeriod: 365,
        },
      ],
      Lifetime: true,
    },
  },
  Cybersole: {
    bbId: 6,
    types: {
      Renewal: [
        {
          amount: 120,
          timePeriod: 180,
          currency: "GBP",
        },
      ],
      Lifetime: true,
    },
  },
};

const moneySigns = {
  EUR: "€",
  GBP: "£",
};

//renewal period is a number which corresponds to the correct renewal in the bot types above
//renewals are always from least to most, and are positioned accordingly on the frontend
//first renewal is a date in the format of [year, month (zero index), day] and can be converted into a date obj
class Bot {
  bot: string;
  key: string;
  plan: string;
  period: number;
  renewalInfo: Renewal | null;
  first: Array<number>;
  price: number;
  constructor(
    bot: string,
    key: string,
    renewalPlan: string,
    renewalPeriod: number,
    firstRenewal,
    price
  ) {
    this.bot = bot;
    this.key = key;
    this.plan = renewalPlan;
    this.first = firstRenewal;
    this.price = price;
    this.renewalInfo =
      renewalPlan === "Lifetime"
        ? null
        : bots[bot].types[renewalPlan][renewalPeriod];
  }

  async markSold() {}

  async getPrice() {
    let spec = "";
    if (bots[this.bot].types[this.plan].length > 1)
      spec += `${
        this.renewalInfo.currency ? moneySigns[this.renewalInfo.currency] : `$`
      }${this.renewalInfo.amount}`;
    if (this.renewalInfo.timePeriod / 30 > 1)
      spec += ` ${this.renewalInfo.timePeriod / 30} months`;
    const res = await got.post(
      "https://ancient-lake-42941.herokuapp.com/botValue",
      {
        headers: {
          "content-type": "application/json",
        },
        json: {
          bot: this.bot,
          key_type: this.plan,
          specification: spec,
        },
        responseType: "json",
      }
    );
    //@ts-ignore
    return res.body.price;
  }
}

export default Bot;
