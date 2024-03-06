import { UPDATE_USER_REWARDS } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const refreshRewards = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.refreshRewards();
    await dispatch({ type: UPDATE_USER_REWARDS, data });
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
