import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import homepageReducer from "./homepage/homepage.reducer";
import searchboxReducer from "./searchbox/searchbox.reducer";
import mapSectionReducer from "./mapSection/mapSection.reducer";
import calendarReducer from "./calendar/calendar.reducer";

const persistConfig = {
  key: "root-v2",
  storage,
  whitelist: ["searchbox"]
};

const rootReducer = combineReducers({
  homepage: homepageReducer,
  searchbox: searchboxReducer,
  mapSection: mapSectionReducer,
  calendar: calendarReducer
});

export default persistReducer(persistConfig, rootReducer);
