export class Payouts {
  constructor(winStreakLimit) {
    this.winStreakLimit = winStreakLimit;
  }
  getPayoutAmount(wager, history) {
    if (wager == undefined || wager < 0) {
      throw new Error("wager must be greater than 0");
    }

    const winLosses = this.winLossOutcomes(history);
    const winStreakCount = this.lastWinStreakCount(winLosses);
    const payoutMultiplier = this.calculatePayoutMultiplier(winStreakCount);
    const newAmount = wager * payoutMultiplier.size;
    return {
      amount: newAmount,
      delta: payoutMultiplier.size === 0 ? `-${wager}` : `+${newAmount}`,
      multiplier: payoutMultiplier,
    };
  }

  winLossOutcomes(history) {
    return history.reduce((records, record) => {
      records.push(record.outcome);
      return records;
    }, []);
  }

  sortRecords(history) {
    history.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
  }

  lastWinStreakCount(winLosses) {
    let wins = 0;
    for (let i = 0; i < winLosses.length; i++) {
      if (winLosses[i] === "win") {
        wins++;
        if (wins > this.winStreakLimit) {
          wins = 1;
          break;
        }
      } else {
        break;
      }
    }
    return wins;
  }

  calculatePayoutMultiplier(winStreakCount) {
    switch (winStreakCount) {
      case 0: {
        return { size: 0, message: "Loss Wager" };
      }
      case 3: {
        return { size: 3, message: "3 Win Streak Reward!! 3x wager" };
      }
      case 5: {
        return { size: 10, message: "5 Win Streak Reward!! 10x wager" };
      }
      default: {
        return { size: 2, message: "Doubled wager" };
      }
    }
  }
}
