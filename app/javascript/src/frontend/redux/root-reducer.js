import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import applicationReducer from "./application/application.reducer";
import calendarReducer from "./calendar/calendar.reducer";
import chartReducer from "./charts/charts.reducer";
import formReducer from "./form/form.reducer";
import homepageReducer from "./homepage/homepage.reducer";
import mapSectionReducer from "./mapSection/mapSection.reducer";
import newsReducer from "./news/news.reducer";
import searchboxReducer from "./searchbox/searchbox.reducer";

const persistConfig = {
  key: "root-v3",
  storage,
  whitelist: ["searchbox"]
};

const rootReducer = combineReducers({
  application: applicationReducer,
  calendar: calendarReducer,
  chart: chartReducer,
  form: formReducer,
  homepage: homepageReducer,
  mapSection: mapSectionReducer,
  news: newsReducer,
  searchbox: searchboxReducer
});

export default persistReducer(persistConfig, rootReducer);
