import { combineReducers } from "redux";
import question from "./question";
import signed from "./signed";

export default combineReducers({
  question,
  signed,
});
