import express from "express";
import play from "./games-coin-toss-play.js";
import history from "./games-coin-toss-history.js";

const router = express.Router();

router.post("/play", play);
router.get("/history", history);

export default router;
