import React from "react";
import "./App.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./themes/MyTheme";
import Navigation from "./components/Navigation/Navigation";
import Homepage from "./pages/Homepage/Homepage";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Roboto", "sans-serif"]
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <div className="container">
        <Homepage />
      </div>
    </ThemeProvider>
  );
};

export default App;
