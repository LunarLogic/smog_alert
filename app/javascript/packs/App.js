import React from "react";
import File from "./components/File.js";
import "./App.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EcoIcon from "@material-ui/icons/Eco";
import theme from "./MyTheme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <File />
        <Button variant="contained" color="primary">
          Click me! <EcoIcon color="secondary" />
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default App;
