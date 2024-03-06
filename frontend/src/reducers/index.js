import { combineReducers } from "redux";
import login from "./login";
import cointoss from "./cointoss";
import rewards from "./rewards";

export default combineReducers({
  login,
  cointoss,
  rewards,
});
