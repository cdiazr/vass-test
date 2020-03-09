import React, { Component } from "react";
import * as utils from "../helpers/helpers.js";

import GLOBAL from '../data/global.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailToFind: ""
    }
  }

  componentDidMount() {
    utils.getDataFromAPI('users');
  }

  handleChange = (event) => {
    this.setState({ emailToFind: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    utils.checkUserExist(GLOBAL.clients, "email", this.state.emailToFind);
    let userData = utils.getAuthData();
    let isLogged = userData.logged;

    if(isLogged) {
      this.props.handler(isLogged, userData)
    }  
  }

  render() {
    return (
      <div className="text-center">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-3">Insurance</h1>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">
            <h3>Login form</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <form className="form-signin" onSubmit={this.handleSubmit}>
              <div className="form-label-group">
                <input type="email" id="email" className="form-control" placeholder="Email address" onChange={this.handleChange} />
              </div>

              {/*<div className="form-label-group">
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  placeholder="Password"
                />
              </div>*/}

              <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign in </button>
            </form>
          </div>
        </div>    
      </div>
    )
  }
}

export default Login;

