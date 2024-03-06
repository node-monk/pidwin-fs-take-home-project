import express from "express";
import coinTossRouter from "./games-coin-toss.js";

const router = express.Router();
router.use("/coin-toss", coinTossRouter);

export default router;
