import dotenv from "dotenv";
import dbConnection from "../db/db";
dotenv.config();

/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */
class IdeaController {
  /**
   * @memberof IdeaController
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static async createIdea(req: any, res: any, next: any) {
    const { challenge, solution, gain, userName, userEmail, problem } =
      req.body;

    dbConnection.connect();

    dbConnection.query(
      "insert into util.idea ( challenge, solution, gain, user_name, user_email, problem ) values (?,?,?,?,?, ?);",
      [challenge, solution, gain, userName, userEmail, problem],
      function (error: any, results: any, fields: any) {
        if (error) throw error;
        console.log("The solution is: ", results);
        res.status(200).send({
          message:
            "Ideia criada com sucesso! Obrigado por fazer parte da evolução da Uby",
        });
      }
    );

    dbConnection.end();
  }

  static async getIdeas(req: any, res: any, next: any) {
    const challenge = req.body.challenge;

    dbConnection.connect();

    dbConnection.query(
      "select * from idea where challenge = ? ;",
      [`"${challenge}"`],
      function (error: any, results: any, fields: any) {
        if (error) throw error;
        console.log("The solution is: ", results);
        res.status(200).send({
          message:
            "Ideia criada com sucesso! Obrigado por fazer parte da evolução da Uby",
        });
      }
    );

    dbConnection.end();
  }

  static async updateIdea(req: any, res: any, next: any) {}
}

export default IdeaController;
