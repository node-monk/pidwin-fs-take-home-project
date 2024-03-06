import {
  COIN_TOSS_WIN_LOSS_RECORD,
  COIN_TOSS_PLAY,
} from "../constants/actionTypes";

const cointossReducer = (
  state = { playResult: null, winlosses: [] },
  action
) => {
  switch (action.type) {
    case COIN_TOSS_PLAY:
      return { ...state, playResult: action?.data };

    case COIN_TOSS_WIN_LOSS_RECORD:
      localStorage.setItem("winlosses", JSON.stringify(action.data));
      return { ...state, winlosses: action?.data };

    default:
      return state;
  }
};
export default cointossReducer;
