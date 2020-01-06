import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import homepageReducer from "./homepage/homepage.reducer";
import searchboxReducer from "./searchbox/searchbox.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["searchbox"]
};

const rootReducer = combineReducers({
  homepage: homepageReducer,
  searchbox: searchboxReducer
});

export default persistReducer(persistConfig, rootReducer);
