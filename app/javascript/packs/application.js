import React from "react";
import ReactDOM from "react-dom";
import App from "../src/frontend/App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/frontend/redux/store";
import ErrorBoundary from "@honeybadger-io/react";
import { honeybadger } from "../src/frontend/honeybadger";
import { BrowserRouter } from "react-router-dom";
import "../stylesheets/actiontext.scss";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ErrorBoundary honeybadger={honeybadger}>
      <Provider store={store}>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>,
    document.body.appendChild(document.createElement("div"))
  );
});
