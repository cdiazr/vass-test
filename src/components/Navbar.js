import React , { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as utils from "../helpers/helpers.js";
import GLOBAL from '../data/global.js'

class Navbar extends Component {
    clearAuth() {
      utils.setAuthData(false);
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
                    {GLOBAL.user_name} <small>({GLOBAL.user_role})</small>
                  </li>
                  <li><a onClick={this.clearAuth}><i className="fa fa-sign-out"></i></a></li>
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