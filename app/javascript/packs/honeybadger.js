import Honeybadger from "honeybadger-js";

const config = {
  apiKey: "586828b9",
  environment: process.env.NODE_ENV,
  disabled:
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
};

export const honeybadger = Honeybadger.configure(config);
