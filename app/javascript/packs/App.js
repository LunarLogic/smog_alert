import React from "react";
import "./App.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./themes/MyTheme";
import Navigation from "./components/Navigation/Navigation";
import Homepage from "./pages/Homepage/Homepage";
import WebFont from "webfontloader";
import Footer from "./components/Footer/Footer";

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
        <Homepage />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
