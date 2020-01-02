import React from "react";
import ReactDOM from "react-dom";
import App from "./frontend/App";
import { Provider } from "react-redux";
import { store } from "./frontend/redux/store";
import ErrorBoundary from "@honeybadger-io/react";
import { honeybadger } from "./frontend/honeybadger";

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
