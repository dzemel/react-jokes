import React, { Component } from "react";
import JokeListFunctional from "./JokeListFunctional";

/** App component. Renders list of jokes. */

function App() {
  return (
    <div className="App">
      <JokeListFunctional />
    </div>
  );
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <JokeList />
//       </div>
//     );
//   }
// }

export default App;
