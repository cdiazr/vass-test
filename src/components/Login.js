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
    utils.getDataFromAPI('clients');
  }

  handleChange = (event) => {
    this.setState({ emailToFind: event.target.value });
  }

  // This arroy
  handleSubmit = (event) => {
    event.preventDefault();
    let user_data = utils.checkUserExist(GLOBAL.clients, "email", this.state.emailToFind);
    let isLogged = user_data.logged;

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
                              <h1 className="h3 mb-3 font-weight-normal">Insurance Administration</h1>
                            </div>
              
                            <div className="form-label-group">
                              <input type="email" id="email" className="form-control" placeholder="Email address" onChange={this.handleChange} />
                            </div>

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

