import { combineReducers } from "redux";
import mapReducer from "./map/map.reducer";

export default combineReducers({
  map: mapReducer
});
