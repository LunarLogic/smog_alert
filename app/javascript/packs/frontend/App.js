import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./themes/MyTheme";
import { Homepage, Calendar } from "./pages";
import WebFont from "webfontloader";
import { Error404, Footer, Navigation } from "./components";

WebFont.load({
  google: {
    families: ["Roboto:300,400,500,700,900", "sans-serif"]
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/calendar" component={Calendar} />
          <Route component={Error404} />
        </Switch>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
