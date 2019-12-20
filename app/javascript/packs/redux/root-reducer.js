import { combineReducers } from "redux";
import homepageReducer from "./homepage/homepage.reducer";
import searchboxReducer from "./searchbox/searchbox.reducer";

export default combineReducers({
  homepage: homepageReducer,
  searchbox: searchboxReducer
});
