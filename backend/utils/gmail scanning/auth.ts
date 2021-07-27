import fs from "fs";
import path from "path";
import got from "got";
import { google } from "googleapis";

class GmailScanner {
  gmailToken;
  oauth2;
  constructor() {
    const { misc } = JSON.parse(
      fs
        .readFileSync(
          path.join(process.env.APPDATA, "purpl", "local-data", "config.json")
        )
        .toString()
    );
    this.gmailToken = misc.gmailToken;
    this.oauth2 = false;
  }

  async getOauth2() {
    if (this.oauth2) return this.oauth2;
    const { misc } = JSON.parse(
      fs
        .readFileSync(
          path.join(process.env.APPDATA, "purpl", "local-data", "config.json")
        )
        .toString()
    );
    if (misc.authorizedToken === "") {
      const res = await got.post(
        "http://ancient-lake-42941.herokuapp.com/oauth2",
        {
          headers: {
            "content-type": "application/json",
          },
          json: {
            code: this.gmailToken,
          },
          responseType: "json",
        }
      );

      console.log(res.body);
      //@ts-ignore
      const { token, oAuth2Client } = res.body;
      this.oauth2 = new google.auth.OAuth2(
        oAuth2Client._clientId,
        oAuth2Client._clientSecret,
        oAuth2Client.redirectUri
      );
      this.oauth2.setCredentials(token);

      return token;
    } else {
      const res = await got.get(
        "http://ancient-lake-42941.herokuapp.com/preAuthorized",
        {
          responseType: "json",
        }
      );
      //@ts-ignore
      const { oAuth2Client } = res.body;
      this.oauth2 = new google.auth.OAuth2(
        oAuth2Client._clientId,
        oAuth2Client._clientSecret,
        oAuth2Client.redirectUri
      );

      this.oauth2.setCredentials(misc.authorizedToken);
    }

    return 1;
  }
}

export default GmailScanner;
