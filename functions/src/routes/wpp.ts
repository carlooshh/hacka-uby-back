import express from "express";
import WhatsappBot from "../controllers/wpp.controller";

const wppRouter = express.Router();

wppRouter.post("/incoming", WhatsappBot.googleSearch);

export default wppRouter;
