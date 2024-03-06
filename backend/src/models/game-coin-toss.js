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
        outcome: { type: String, required: true },
        createdAt: { type: Number, default: Date.now },
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
