import { CoinTossGame } from "../utils/CoinToss.js";
import { Payouts } from "../utils/Payouts.js";
import User from "../models/user.js";

const play = async (req, res) => {
  const { userChoice, userWager } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.rewards.tokens -= userWager;

    // Play Coin Toss
    const coinTossGame = new CoinTossGame(req.userId, 10);
    const tossResults = await coinTossGame.play(userChoice);
    const payouts = new Payouts(5);
    const payoutResults = payouts.getPayoutAmount(
      userWager,
      coinTossGame.gameData.tosses
    );

    user.rewards.tokens = user.rewards.tokens + payoutResults.amount;

    await User.findByIdAndUpdate(
      req.userId,
      { rewards: user.rewards },
      { new: true }
    );

    res.status(200).json({
      tossResult: coinTossGame.gameData.tosses[0],
      payout: payoutResults,
      tokens: user.rewards.tokens,
    });
  } catch (coinTossError) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(coinTossError);
  }
};

export default play;
