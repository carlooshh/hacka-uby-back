import express from "express";
import IdeaController from "../controllers/idea.controller";

const ideaRouter = express.Router();

ideaRouter.post("", IdeaController.createIdea);
ideaRouter.get("", IdeaController.getIdeas);
ideaRouter.patch("", IdeaController.getIdeas);

export default ideaRouter;
