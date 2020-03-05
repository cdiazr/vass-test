import React, { Component } from "react";
import * as utils from "../helpers/helpers.js";

import GLOBAL from '../global.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailToFind: ""
    }
  }

  getData() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      localStorage.setItem("users", xhr.responseText);
      GLOBAL.users = utils.filterBy(localStorage.getItem("users"));
    });

    xhr.open("GET", GLOBAL.api_base_url + GLOBAL.api_clients);
    xhr.send();
  }

  componentDidMount() {
    this.getData();
  }

  handleChange = (event) => {
    this.setState({ emailToFind: event.target.value });
  }

  // This arroy
  handleSubmit = (event) => {
    event.preventDefault();
    let user_data = utils.checkUserExist(GLOBAL.users, "email", this.state.emailToFind);
    let isLogged = GLOBAL.user_logged;

    if(isLogged) 
    {
      this.props.handler(isLogged, user_data)
    }  
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="text-center">
            <form className="form-signin" onSubmit={this.handleSubmit}>
              <div className="text-center mb-4">
                <h1 className="h3 mb-3 font-weight-normal">Exam for interview</h1>
              </div>
  
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

              <button className="btn btn-lg btn-primary btn-block" type="submit">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;

