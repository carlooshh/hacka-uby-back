import * as functions from "firebase-functions";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import wppRouter from "./routes/wpp";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config({ path: "./.env" });

app.use("/api/wpp", wppRouter);

app.listen(3000, () => {
  console.log("API is running on port 3000");
});

export const api = functions.https.onRequest(app);
