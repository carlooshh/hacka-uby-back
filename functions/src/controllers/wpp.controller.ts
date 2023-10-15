import { google } from "googleapis";
import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();

const {
  SID: accountSid,
  AUTH_TOKEN: TwilloAuthToken,
  API_KEY: googleApiKey,
  SERCH_ENGINE_ID: cx,
} = process.env;

twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
const customsearch = google.customsearch("v1");

/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */
class WhatsappBot {
  /**
   * @memberof WhatsappBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static async googleSearch(req: any, res: any, next: any) {
    const twiml = new MessagingResponse();
    const q = req.body.Body;
    const options = { cx, q, auth: googleApiKey };

    try {
      const result = await customsearch.cse.list(options);
      if (!result.data.items?.length) {
        twiml.message(
          "Não encontramos resultados, seja mais específico na pesquisa e tente outra vez!"
        );
        res.set("Content-Type", "text/xml");
        return res.status(200).send(twiml.toString());
      }

      const firstResult = result.data.items[0];
      const searchData = firstResult.snippet;
      const link = firstResult.link;

      twiml.message(`${searchData} ${link}`);

      res.set("Content-Type", "text/xml");

      return res.status(200).send(twiml.toString());
    } catch (error) {
      return next(error);
    }
  }
}

export default WhatsappBot;
