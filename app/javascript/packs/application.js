import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Honeybadger from "honeybadger-js";
import ErrorBoundary from "@honeybadger-io/react";

const config = {
  apiKey: "586828b9",
  environment: window.location.hostname
};

const honeybadger = Honeybadger.configure(config);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ErrorBoundary honeybadger={honeybadger}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>,
    document.body.appendChild(document.createElement("div"))
  );
});
