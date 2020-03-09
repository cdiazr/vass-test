import React , { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as utils from "../helpers/helpers.js";
//import GLOBAL from '../data/global.js';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      role: "",
    };
  } 

  componentDidMount()
  {
    let authData = utils.getAuthData();
    this.setState({
      name: authData.name,
      role: authData.role,  
    });
  }

  signOut = () => {
    utils.setAuthData(false);
    
    let userData = utils.getAuthData();
    this.props.handler(userData.logged, userData)
  }

  render () {
    return (
      <Router>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <div
            className="collapse navbar-collapse"
            id="navbarsExampleDefault"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                Dashboard
              </li>
            </ul>
            <ul className="navbar-nav mr-right">
              <li>
                {this.state.name} <small>({this.state.role})</small>
              </li>
              <li>
                <a onClick={() => this.signOut()}><i className="fa fa-sign-out"></i></a>
              </li>
            </ul>
            <Switch>
              <Route exact path="/">

              </Route>
            </Switch>
          </div>
        </nav>
        <Switch></Switch>
      </Router>
    );
  }
}

export default Navbar;