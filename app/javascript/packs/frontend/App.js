import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { animateScroll } from "react-scroll";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { connect } from "react-redux";
import WebFont from "webfontloader";
import { PropTypes } from "prop-types";

import { getOrganizationDetails } from "./redux/application/application.actions";

// import { AirFacts, News, Article, Error404 } from "./pages";
import { Footer, Navigation, NavigationMobile } from "./components";

import "./App.scss";

WebFont.load({
  custom: {
    families: ["Roboto:300,400,500,700,900", "sans-serif"],
    urls: [
      "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap"
    ]
  }
});

const Homepage = lazy(() =>
  import(/* webpackChunkName: "Homepage" */ "./pages/Homepage/Homepage.js")
);
const Statistics = lazy(() =>
  import(
    /* webpackChunkName: "Statistics" */ "./pages/Statistics/Statistics.js"
  )
);
const AirFacts = lazy(() =>
  import(/* webpackChunkName: "AirFacts" */ "./pages/AirFacts/AirFacts.js")
);
const News = lazy(() =>
  import(/* webpackChunkName: "News" */ "./pages/News/News.js")
);
const Article = lazy(() =>
  import(/* webpackChunkName: "Article" */ "./pages/Article/Article.js")
);
const Error404 = lazy(() =>
  import(/* webpackChunkName: "Error404" */ "./pages/Error404/Error404.js")
);

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
          <Suspense fallback={<div>...Loading</div>}>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/czym-oddycham" component={AirFacts} />
            <Route exact path="/statistics" component={Statistics} />
            <Route exact path="/aktualnosci" component={News} />
            <Route exact path="/aktualnosci/:articleId" component={Article} />
            <Route component={Error404} />
          </Suspense>
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
