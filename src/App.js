import React , { Component } from 'react';

import Home from "./components/Home";
import Table from "./components/Table";

import GLOBAL from './global.js';

import './App.css';

function useConditionalRendering(conditional, method) {
  return (conditional) ? <Table handler={method}/> : null;
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: GLOBAL.user_logged
    };
  }

  // Updating state from child component
  handler = (param) => {
    this.setState({
      logged: param
    })
  }

  render() {
    const conditionalComponent = useConditionalRendering(this.state.logged, this.handler);
    return (
      <div className="App">
        <header className="App-header">
          <Home />
          {conditionalComponent}
        </header>
      </div>
    )
  }
}

export default App;
