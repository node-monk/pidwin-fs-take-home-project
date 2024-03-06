import { LOGIN, LOGOUT } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: LOGIN, data });
    history("/games/cointoss");
    messages.success("SignUp Successful");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    await dispatch({ type: LOGIN, data });
    history("/games/cointoss");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const logout = (formData, history) => async (dispatch) => {
  dispatch({ type: LOGOUT, formData });
  messages.success("Logout Successful");
};

export const changePassword = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(formData);
    localStorage.clear();
    dispatch({ type: LOGOUT, data });
    messages.success("Password Change Was Successful");
    history("/");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
