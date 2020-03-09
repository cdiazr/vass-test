import React , { Component } from 'react';
import * as utils from "./helpers/helpers.js";

import Home from "./components/Home";
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    )
  }
}

export default App;
