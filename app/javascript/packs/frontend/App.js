import React from "react";
import { Route, Switch } from "react-router-dom";
import { animateScroll } from "react-scroll";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import "./App.scss";
import { Homepage, Statistics, News } from "./pages";
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
          <Route exact path="/aktualnosci" component={News} />
          <Route component={Error404} />
        </Switch>
        <div className="scroll-to-top" onClick={animateScroll.scrollToTop}>
          <div className="scroll-to-top__text">Wróć na górę strony </div>
          <ArrowUpwardIcon />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
