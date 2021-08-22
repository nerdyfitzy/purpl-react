import names from "node-random-name";
import Converter from "../index";
import Privacy from "./scripts/privacy";

class VCC_Controller {
  service;
  action;
  profile;
  profileGroup;
  constructor(
    service: "Privacy",
    action: "make" | "get",
    profileId: string,
    groupID: string
  ) {
    this.service = service;
    this.action = action;
    this.profile = profileId;
    this.profileGroup = groupID;
  }

  async addCardsToProfiles(Cards) {
    const Profile = await Converter.getProfile(this.profile, this.profileGroup);
    const copiedProfile = { ...Profile };
    const { uuid } = await Converter.newGroup(`${this.service} Import`);
    Cards.forEach(async (card) => {
      copiedProfile.profile_name = `${card.name} | ${card.site_locked}`;
      delete copiedProfile.uuid;
      const { cardNumber, expMonth, expYear, cvv } = card.cardDetails;
      switch (cardNumber.charAt(0)) {
        case "4":
          copiedProfile.payment.type = "Visa";
          break;
        case "5":
          copiedProfile.payment.type = "MasterCard";
          break;
        default:
          copiedProfile.payment.type = "AmericanExpress";
          break;
      }
      copiedProfile.payment.cnb = cardNumber;
      copiedProfile.payment.month = expMonth;
      copiedProfile.payment.year = expYear;
      copiedProfile.payment.cvv = cvv;

      await Converter.addProfile(copiedProfile, uuid);
    });

    const ProfileGroupFinal = await Converter.loadProfiles(false, uuid);

    return ProfileGroupFinal;
  }

  async startTasks(cardsName = false, qty = 0) {
    var VCC_PROVIDER;
    switch (this.service) {
      case "Privacy":
        VCC_PROVIDER = new Privacy();
        break;
    }

    await VCC_PROVIDER.getApiKey();
    console.log("Got Key");
    let ReturnedCards = [];
    if (this.action === "make") {
      for (let i = 0; i < qty; i++) {
        let name = cardsName;
        if (!cardsName) name = names();

        const Card = await VCC_PROVIDER.makeCards(name);
        ReturnedCards.push(Card);
      }
    } else {
      ReturnedCards = await VCC_PROVIDER.getCards();
    }
    const final = await this.addCardsToProfiles(ReturnedCards);
    return final;
  }
}

export default VCC_Controller;
