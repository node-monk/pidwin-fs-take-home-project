/**
 * Tracks each users Coin Toss game
 */

import mongoose from "mongoose";

const gameCoinTossSchema = mongoose.Schema(
  {
    id: { type: String },
    user_id: { type: String, required: true },
    tosses: [
      {
        choice: { type: String, required: true },
        compChoice: { type: String, require: true },
        outcome: { type: String, required: true },
        startingTokens: { type: Number, required: true },
        wager: { type: Number, required: true },
        createdAt: { type: Number, required: true },
        payout: {
          amount: { type: Number },
          multiplier: {
            size: { type: Number },
            message: { type: String },
          },
          delta: { type: String },
          tokens: { type: Number },
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("GameCoinTossSchema", gameCoinTossSchema);
