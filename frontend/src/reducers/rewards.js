import {
  UPDATE_USER_REWARDS,
  REFRESH_USER_REWARDS,
} from "../constants/actionTypes";

const rewardsReducer = (state = { tokens: 0 }, action) => {
  switch (action.type) {
    case UPDATE_USER_REWARDS:
      localStorage.setItem("rewards", JSON.stringify(action.data));
      return { ...state, ...action.data };

    case REFRESH_USER_REWARDS:
      localStorage.setItem("rewards", JSON.stringify(action.data));
      return { ...state, ...action.data };

    default:
      return state;
  }
};
export default rewardsReducer;
