require("@rails/ujs").start();
require("trix");
require("@rails/actiontext");
require("jquery")
// require("turbolinks").start();
// require("@rails/activestorage").start();
// require("channels");

import "bootstrap";
import "../stylesheets/application-admin";

import "./admin/article_form"

import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./admin/components/Dashboard"

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("dashboard-react");
  if (container) {
    ReactDOM.render(
      <Dashboard/>,
      container
    );
  }
});
