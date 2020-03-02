import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import applicationReducer from "./application/application.reducer";
import homepageReducer from "./homepage/homepage.reducer";
import searchboxReducer from "./searchbox/searchbox.reducer";
import mapSectionReducer from "./mapSection/mapSection.reducer";
import calendarReducer from "./calendar/calendar.reducer";
import chartReducer from "./charts/charts.reducer";
import newsReducer from "./news/news.reducer";

const persistConfig = {
  key: "root-v3",
  storage,
  whitelist: ["searchbox"]
};

const rootReducer = combineReducers({
  application: applicationReducer,
  homepage: homepageReducer,
  searchbox: searchboxReducer,
  mapSection: mapSectionReducer,
  calendar: calendarReducer,
  chart: chartReducer,
  news: newsReducer
});

export default persistReducer(persistConfig, rootReducer);
