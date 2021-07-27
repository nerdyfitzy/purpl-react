import * as console from "../../../../utils/logger";
import names from "node-random-name";
import playwright from "playwright";
const numbers = "1234567890";

class WalmartAccount {
  email;
  pass;
  fname;
  lname;
  created;
  page;
  constructor(catchall, page) {
    const fname = names({ first: true });
    const lname = names({ last: true });
    this.email =
      fname +
      lname +
      numbers.charAt(Math.random() * (numbers.length - 1)) +
      catchall;
    this.pass =
      fname + lname + numbers.charAt(Math.random() * (numbers.length - 1));
    this.fname = fname;
    this.lname = lname;
    this.created = false;
    this.page = page;
  }

  getDetails() {
    return this.email + ":" + this.pass;
  }

  async generate() {
    await this.page.fill("#first-name-su", this.fname);
    await this.page.fill("#last-name-su", this.lname);
    await this.page.fill("#email-su", this.email);
    await this.page.fill("#password-su", this.pass);

    console.log("Creating Account...");
    await this.page.click(
      "#sign-up-form > button.button.s-margin-top.text-inherit"
    );
    try {
      await this.page.waitForSelector(
        "#main-content > span > div.hide-content-max-m > div > nav > div.Grid.Grid--gutters.bottom-margin-ph > div:nth-child(1) > a",
        { timeout: 2000 }
      );
      this.created = true;
    } catch (e) {
      console.log(`Error Creatings`, "error");
    }

    return this.created;
  }
}

export default WalmartAccount;
