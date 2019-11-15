// import React from "react";
// import "./App.scss";
// import Logo from "./Logo";

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <Logo />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;

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
