import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { coinTossPlay } from "../../actions/coin-toss.js";
import { useDispatch } from "react-redux";
import { coinTossWinLossRecord } from "../../actions/coin-toss.js";
import { styles } from "./styles.js";
import { keyframes } from "@emotion/react";
import {
  Paper,
  Typography,
  Container,
  FormControlLabel,
  Divider,
  TextField,
  RadioGroup,
  Radio,
  Button,
  Grid,
  Stack,
  Box,
  Chip,
  Avatar,
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

    /**
     * Small Delay to show user coin flipping and help build suspense
     */
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
  winlosses = gameStats.winlosses.map((item) => (
    <Grid container spacing={2} key={item.createdAt}>
      <Grid item xs={4} md={4}>
        <Typography
          sx={[
            styles.winlosses.winnerLoser,
            item.outcome === "win"
              ? styles.winlosses.winner
              : styles.winlosses.loser,
          ]}
        >
          {item.outcome === "win" ? "winner" : "loser"}
        </Typography>
      </Grid>
      <Grid item xs={4} md={4}>
        <span>{item.payout.multiplier.message}</span>
      </Grid>
      <Grid item xs={4} md={4}>
        <Chip
          avatar={<Avatar alt="tokens" src="/token25x25.png" />}
          label={item.payout.delta}
          variant="outlined"
          sx={{ float: "right" }}
        />
      </Grid>
    </Grid>
  ));

  // dispatch(coinTossWinLossRecord({}));

  useEffect(() => {
    dispatch(coinTossWinLossRecord({}));
  }, [gameState, dispatch]);

  const disablePlayButton = () => {
    return gameState.playStatus !== GAME_STATUSES.IDLE || !gameState.userChoice;
  };

  const flipping = keyframes(styles["@keyframes flipping"]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6}>
        {gameState.playStatus === GAME_STATUSES.IDLE && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5">WIN more tokens!!!</Typography>
            <Divider sx={{ m: 2 }}></Divider>

            <Container>
              <form onSubmit={handleFormSubmit}>
                <Grid container>
                  <Grid item xs={6} md={6}>
                    <TextField
                      id="token-wager"
                      label="Tokens to wager"
                      type="number"
                      value={gameState.wager}
                      onChange={handleChangeWager}
                    ></TextField>
                  </Grid>
                  <Grid item xs={6} md={6}>
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
                  </Grid>
                </Grid>
                <Button
                  disabled={disablePlayButton()}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                >
                  PLAY
                </Button>
              </form>
            </Container>
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
              <Box sx={[styles.coinSide, styles.heads]}>
                <Typography sx={styles.coinBigText}>HEADS</Typography>
              </Box>
              <Box sx={[styles.coinSide, styles.tails]}>
                <Typography sx={styles.coinBigText}>TAILS</Typography>
              </Box>
            </Box>
          </Paper>
        )}
        {gameState.playStatus === GAME_STATUSES.RESULTS && (
          <Paper sx={[{ p: 2 }, styles.results.container]}>
            <Stack>
              <Grid>
                <Grid item>
                  <Typography
                    sx={[
                      styles.results.outcome,
                      gameStats.playResult.tossResult.outcome === "win"
                        ? styles.winlosses.winner
                        : styles.winlosses.loser,
                    ]}
                  >
                    {gameStats.playResult.tossResult.outcome === "win"
                      ? "you win!!"
                      : "you lose!!"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      ...{ p: 2 },
                      ...styles.coinContainer,
                      ...{ width: "100px", height: "100px" },
                    }}
                  >
                    <Box sx={[styles.coin]}>
                      <Box
                        sx={[
                          styles.coinSide,
                          styles.heads,
                          { paddingTop: "50px" },
                        ]}
                      >
                        <Typography sx={styles.coinSmallText}>
                          {gameStats.playResult.tossResult.compChoice}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Typography sx={styles.results.message}>
                {gameStats.playResult.tossResult.payout.multiplier.message}
              </Typography>
              <Typography sx={styles.results.payout}>
                {gameStats.playResult.tossResult.payout.delta} Tokens
              </Typography>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handlePlayAgain}
              >
                PLAY AGAIN
              </Button>
            </Stack>
          </Paper>
        )}
      </Grid>
      <Grid item xs={6} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography sx={styles.gameTokens}>
            {rewards.tokens} <img src="/token43.png" alt="yellow token" />
          </Typography>
          <hr />
          <Typography sx={styles.prevResultsTitle}>Previous tosses</Typography>
          <Stack spacing={2}>{winlosses}</Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CoinTossGame;
