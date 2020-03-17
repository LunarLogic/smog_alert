require("trix");
require("@rails/actiontext");
require("jquery");
require("jquery_ui");
require("@rails/ujs").start();
// require("turbolinks").start();
// require("@rails/activestorage").start();
// require("channels");

import "bootstrap";
import "../stylesheets/application-admin";
import "../src/admin/article_form"

import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "../src/admin/components/Dashboard"

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("dashboard-react");
  if (container) {
    ReactDOM.render(
      <Dashboard/>,
      container
    );
  }
});
