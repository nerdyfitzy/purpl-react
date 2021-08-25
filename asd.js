const bots = {
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

console.log(Object.keys(bots));
