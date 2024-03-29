import CoinTossGameModel from "../models/game-coin-toss.js";

const CHOICES = {
  heads: "heads",
  tails: "tails",
};

const WinLoss = {
  win: "win",
  loss: "loss",
};

export class CoinTossGame {
  constructor(userId, historyLimit) {
    this.userId = userId;
    this.gameData = null;
    this.historyLimit = historyLimit;
  }

  async play(userChoice, autoSave = true) {
    console.log("playing game ---->");
    if (
      !userChoice ||
      typeof userChoice !== "string" ||
      ![CHOICES.heads, CHOICES.tails].includes(userChoice.toLowerCase())
    ) {
      throw new Error(
        `User choice required to be one of "${CHOICES.heads}" or "${CHOICES.tails}"`
      );
    }

    if (!this.gameData) {
      await this.fetchGameData();
    }

    const cleanUserChoice = userChoice.toLowerCase();
    const flipResult = this.flipResult();
    const outcome = cleanUserChoice === flipResult ? WinLoss.win : WinLoss.loss;
    console.log({ cleanUserChoice, flipResult, outcome });

    const tossResult = {
      choice: cleanUserChoice,
      compChoice: flipResult,
      outcome,
      createdAt: Date.now(),
    };

    this.addTossOutcome(tossResult);
    if (autoSave) {
      this.saveGameData();
    }
    return tossResult;
  }

  /**
   * Use majority flips to get more realistic computer answer
   */
  flipResult() {
    return this.flip() + this.flip() + this.flip() < 2
      ? CHOICES.heads
      : CHOICES.tails;
  }

  flip() {
    return Math.round(Math.random());
  }

  addTossOutcome(outcome) {
    if (this.gameData.tosses.length >= this.historyLimit) {
      this.gameData.tosses.pop();
    }

    this.gameData.tosses.unshift(outcome);
  }

  async fetchGameData() {
    let gameData = await CoinTossGameModel.findById(this.userId);
    if (!gameData) {
      gameData = {
        user_id: this.userId,
        tosses: [],
      };
    }

    this.gameData = gameData;
  }

  async saveGameData() {
    await CoinTossGameModel.findByIdAndUpdate(this.userId, this.gameData, {
      upsert: true,
    });
  }
}
