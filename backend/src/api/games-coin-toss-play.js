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
    const startingTokens = user.rewards.tokens;
    user.rewards.tokens -= userWager;

    // Play Coin Toss
    const coinTossGame = new CoinTossGame(req.userId, 10);
    await coinTossGame.play(userChoice, false);
    const payouts = new Payouts(5);
    const payoutResults = payouts.getPayoutAmount(
      userWager,
      coinTossGame.gameData.tosses
    );

    user.rewards.tokens = user.rewards.tokens + payoutResults.amount;

    // update the last added toss record with payout information
    const lastTossRecord = coinTossGame.gameData.tosses[0];

    const lastTossAdded = {
      ...{
        outcome: lastTossRecord.outcome,
        createdAt: lastTossRecord.createdAt,
        _id: lastTossRecord._id,
        startingTokens,
        choice: lastTossRecord.choice,
        compChoice: lastTossRecord.compChoice,
        wager: userWager,
      },
      ...{ payout: { ...payoutResults, tokens: user.rewards.tokens } },
    };

    coinTossGame.gameData.tosses[0] = lastTossAdded;

    await coinTossGame.saveGameData();

    // update tokens for the user
    await User.findByIdAndUpdate(
      req.userId,
      { rewards: user.rewards },
      { new: true }
    );

    res.status(200).json({
      tossResult: coinTossGame.gameData.tosses[0],
      tokens: user.rewards.tokens,
    });
  } catch (coinTossError) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(coinTossError);
  }
};

export default play;
