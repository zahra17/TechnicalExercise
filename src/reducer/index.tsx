import { combineReducers } from "@reduxjs/toolkit";
import home from "./home";
import search from "./search";

export default combineReducers({
  home,
  search,
});
