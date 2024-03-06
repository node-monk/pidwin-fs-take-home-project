import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./src/api/user.js";
import gamesRouter from "./src/api/games.js";
import auth from "./src/utils/auth.js";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/games", auth, gamesRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Coin Toss Server Started On Port ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
