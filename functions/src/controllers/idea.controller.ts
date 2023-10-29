import dotenv from "dotenv";
import db from "../config/firestore";
import { v4 as uuidv4 } from "uuid";

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

    console.log(db);

    try {
      const collection = db.collection("idea");
      const result = await collection.add({
        id: uuidv4(),
        challenge,
        solution,
        gain,
        userName,
        userEmail,
        problem,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log(result);
      return res.status(200).send({
        message:
          "Ideia criada com sucesso! Obrigado por fazer parte da evolução da Uby",
      });
    } catch (error) {
      throw error;
    }
  }

  static async getIdeas(req: any, res: any, next: any) {
    const { challenge, status } = req.query;

    const snapshot = await db.collection("idea").get();
    const result: any = [];

    for (const doc of snapshot.docs) {
      if (doc.data().challenge == challenge && doc.data().status == status)
        result.push(doc.data());
    }

    return res.status(200).send(result);
  }

  static async updateIdea(req: any, res: any, next: any) {}

  static async test(req: any, res: any, next: any) {
    res.send("Hello World!");
  }
}

export default IdeaController;
