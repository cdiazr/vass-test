import React, { Component } from 'react';
import GLOBAL from '../data/global.js'

import Login from "./Login";
import Navbar from "./Navbar";
import Table from "./Table";

// This method shows one componente or the other one depeding the conditional value
function useConditionalRendering(conditional, method) {
    let view;
    if(conditional) {
        view = <div>
                <header className="App-header">
                    <Navbar />
                </header>
                <div className="row">
                    <div className="col-12">
                        <Table />
                    </div>
                </div>        
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

    // Updating state from child component
    handler = (param, data) => {  
        console.log(param);
        this.setState({
            logged: param
        })
    }

    render() {
        const conditionalComponent = useConditionalRendering(this.state.logged, this.handler)
        return (
            <div>
                {conditionalComponent}
            </div>
        )
    }
}

export default Home;