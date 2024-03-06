import { CoinTossGame } from "../utils/CoinToss.js";

const history = async (req, res) => {
  try {
    const coinTossGame = new CoinTossGame(req.userId, 10);
    await coinTossGame.fetchGameData();
    const gameData = coinTossGame.gameData;
    const tosses = gameData.tosses || [];
    const returnTosses = tosses.map(
      ({ outcome, payout }) => ({
        outcome,
        payout,
      }),
      []
    );
    res.status(200).json(returnTosses);
  } catch (fetchHistoryError) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(fetchHistoryError);
  }
};

export default history;
