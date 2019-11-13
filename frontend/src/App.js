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
// import Blank from "./";
import File from "./components/File.js";
import "./App.scss";

const App = () => {
    return (
        <div className="container">
            <File />
        </div>
    );
};

export default App;
