import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { animateScroll } from "react-scroll";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { connect } from "react-redux";
import WebFont from "webfontloader";
import { PropTypes } from "prop-types";

import { getOrganizationDetails } from "./redux/application/application.actions";

import {
  AirFacts,
  Homepage,
  Statistics,
  News,
  Article,
  Error404
} from "./pages";
import { Footer, Navigation, NavigationMobile } from "./components";

import "./App.scss";

WebFont.load({
  google: {
    families: ["Roboto:300,400,500,700,900", "sans-serif"]
  }
});

const App = ({ getOrganizationDetails }) => {
  useEffect(() => {
    getOrganizationDetails();
  }, []);

  return (
    <div>
      <Navigation />
      <NavigationMobile />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/czym-oddycham" component={AirFacts} />
          <Route exact path="/statistics" component={Statistics} />
          <Route exact path="/aktualnosci" component={News} />
          <Route exact path="/aktualnosci/:articleId" component={Article} />
          <Route component={Error404} />
        </Switch>
        <div className="scroll-to-top" onClick={animateScroll.scrollToTop}>
          <div className="scroll-to-top__text">Powrót na górę strony </div>
          <ArrowUpwardIcon />
        </div>
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  getOrganizationDetails: PropTypes.func
};

export default connect(null, { getOrganizationDetails })(App);
