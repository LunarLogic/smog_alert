import { combineReducers } from "redux";
import mapReducer from "./map/map.reducer";
import cityListReducer from "./cityList/cityList.reducer";
import searchboxReducer from "./searchbox/searchbox.reducer";

export default combineReducers({
  map: mapReducer,
  cityList: cityListReducer,
  searchbox: searchboxReducer
});
