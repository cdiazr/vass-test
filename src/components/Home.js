import React, { Component } from 'react';
import GLOBAL from '../data/global.js'
import * as utils from "../helpers/helpers.js";


import Login from "./Login";
import Navbar from "./Navbar";
import Table from "./Table";

// This method shows one componente or the other one depeding the conditional value
function useConditionalRendering(conditional, method) {
    let view;
    if(conditional) {
        view = <div>
                <header className="App-header">
                    <Navbar handler={method}/>
                </header>
                <section>
                    <Table />
                </section>     
            </div>
    } else {
        view = <Login handler={method}/>
    }

    return view;
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: GLOBAL.user.logged

        };
    }

    componentDidMount()
    {
        let user = utils.getAuthData();
        this.setState({ logged: user.logged });
    }

    // Updating state from child component
    handler = (param, data) => {  
        this.setState({
            logged: param
        })
    }

    render() {
        const conditionalComponent = useConditionalRendering(this.state.logged, this.handler)
        return (
            <div className="col-12">
                {conditionalComponent}
            </div>
        )
    }
}

export default Home;