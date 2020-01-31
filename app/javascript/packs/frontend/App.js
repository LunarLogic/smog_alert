import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import { Homepage, Statistics } from "./pages";
import WebFont from "webfontloader";
import { Error404, Footer, Navigation, NavigationMobile } from "./components";

WebFont.load({
  google: {
    families: ["Roboto:300,400,500,700,900", "sans-serif"]
  }
});

const App = () => {
  return (
    <div>
      <Navigation />
      <NavigationMobile />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/statistics" component={Statistics} />
          <Route component={Error404} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
