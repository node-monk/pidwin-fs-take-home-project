import {
  COIN_TOSS_WIN_LOSS_RECORD,
  COIN_TOSS_PLAY,
  UPDATE_USER_REWARDS,
} from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const coinTossPlay = (formData) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.coinTossPlay(formData);

      dispatch({ type: COIN_TOSS_PLAY, data });
      dispatch({ type: UPDATE_USER_REWARDS, data: { tokens: data.tokens } });
    } catch (error) {
      messages.error(error.response.data.message);
      reject(error);
    }
  });
};

export const coinTossWinLossRecord = (formData) => async (dispatch) => {
  try {
    const { data } = await api.coinTossWinLosses(formData);
    dispatch({ type: COIN_TOSS_WIN_LOSS_RECORD, data });
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
