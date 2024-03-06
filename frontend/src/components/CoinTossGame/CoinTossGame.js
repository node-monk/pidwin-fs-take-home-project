import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { coinTossPlay } from "../../actions/coin-toss.js";
import { useDispatch } from "react-redux";
import { coinTossWinLossRecord } from "../../actions/coin-toss.js";
import { styles } from "./styles.js";
import { keyframes } from "@emotion/react";
import {
  Container,
  Grow,
  Paper,
  Typography,
  FormControlLabel,
  Input,
  RadioGroup,
  Radio,
  Button,
  Grid,
  Stack,
  Box,
} from "@mui/material";

const CoinTossGame = () => {
  const dispatch = useDispatch();
  const rewards = useSelector((state) => {
    return state.rewards;
  });

  const gameStats = useSelector((state) => {
    return state.cointoss;
  });

  const GAME_STATUSES = {
    IDLE: "IDLE",
    FLIPPING: "FLIPPING",
    RESULTS: "RESULTS",
  };

  const [gameState, setGameState] = useState({
    userChoice: "",
    afterWagerTotal: rewards.tokens,
    wager: 0,
    playStatus: GAME_STATUSES.IDLE,
    winlossesLoaded: false,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setGameState({
      ...gameState,
      wager: 0,
      afterWagerTotal: rewards.tokens,
      playStatus: GAME_STATUSES.FLIPPING,
    });
    dispatch(
      coinTossPlay({
        userChoice: gameState.userChoice,
        userWager: Number(gameState.wager),
      })
    );
    setTimeout(() => {
      setGameState({
        ...gameState,
        wager: 0,
        afterWagerTotal: rewards.tokens,
        playStatus: GAME_STATUSES.RESULTS,
        userChoice: "",
        winlossesLoaded: false,
      });
    }, 3000);
  };

  const handleChangeWager = (e) => {
    setGameState({
      ...gameState,
      wager: e.target.value,
      afterWagerTotal: calculateNewTotalAfterWager(
        e.target.value,
        rewards.tokens
      ),
    });
  };

  const handlePlayAgain = () => {
    setGameState({ ...gameState, playStatus: GAME_STATUSES.IDLE });
  };

  const handleChangeSide = (e) => {
    setGameState({ ...gameState, userChoice: e.target.value });
  };

  const calculateNewTotalAfterWager = (wagerAmount, userTokens) => {
    return userTokens - wagerAmount;
  };

  let winlosses = [];
  winlosses = gameStats.winlosses.map((item) => <div>{item.outcome}</div>);

  // dispatch(coinTossWinLossRecord({}));

  useEffect(() => {
    if (!gameState.winlossesLoaded) {
      dispatch(coinTossWinLossRecord({}));
      setGameState({ ...gameState, winlossesLoaded: true });
    }
  });

  const flipping = keyframes(styles["@keyframes flipping"]);

  const disablePlayButton = () => {
    return gameState.playStatus !== GAME_STATUSES.IDLE || !gameState.userChoice;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6}>
        {gameState.playStatus === GAME_STATUSES.IDLE && (
          <Paper sx={{ p: 2 }}>
            <form onSubmit={handleFormSubmit}>
              <Input
                id="token-wager"
                label="Wager Amount"
                type="number"
                value={gameState.wager}
                onChange={handleChangeWager}
              ></Input>
              <RadioGroup
                row
                onChange={handleChangeSide}
                value={gameState.userChoice}
              >
                <FormControlLabel
                  label="Heads"
                  value="heads"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Tails"
                  value="tails"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
              <Button
                disabled={disablePlayButton()}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                PLAY
              </Button>
            </form>
          </Paper>
        )}
        {gameState.playStatus === GAME_STATUSES.FLIPPING && (
          <Paper sx={{ ...{ p: 2 }, ...styles.coinContainer }}>
            <Box
              sx={[
                styles.coin,
                { animation: `${flipping} 0.2s infinite`, cursor: "wait" },
              ]}
            >
              <Box sx={[styles.coinSide, styles.heads]}>Heads</Box>
              <Box sx={[styles.coinSide, styles.tails]}>Tails</Box>
            </Box>
          </Paper>
        )}
        {gameState.playStatus === GAME_STATUSES.RESULTS && (
          <Paper>
            <h2>
              {" "}
              {gameStats.playResult.tossResult.outcome === "win"
                ? "you win!!"
                : "you lose!!"}
            </h2>

            <div>{gameStats.playResult.payout.multiplier.message}</div>
            <div>{gameStats.playResult.payout.vector}</div>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handlePlayAgain}
            >
              PLAY AGAIN
            </Button>
          </Paper>
        )}
      </Grid>
      <Grid item xs={6} md={6}>
        <Paper sx={{ p: 2 }}>
          <h1>{rewards.tokens}</h1>
          <hr />
          <Stack spacing={2}>{winlosses}</Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CoinTossGame;
