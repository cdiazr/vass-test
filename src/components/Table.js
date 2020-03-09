import React , { Component } from 'react';
import * as utils from "../helpers/helpers.js";
import GLOBAL from '../data/global.js'
import '../css/App.css';

import Filters from "./Filters";


class Table extends Component {
    constructor() {
        super();
        this.state = {
            clients: [],
            policies:[]    
        };
    }    
    
    getData = (Role) => {
        var xhr = new XMLHttpRequest();
    
        xhr.addEventListener("load", () => {
            let list = JSON.parse(xhr.responseText);
            this.setState({ clients: list.clients });
            GLOBAL.clients = list.clients;
        });
    
        xhr.open("GET", GLOBAL.api_base_url + GLOBAL.api_clients);
        xhr.send();
      }

    componentDidMount() { 
        utils.getDataFromAPI('clients');
        utils.getDataFromAPI('policies');
    }

    selectUser(email)
    {
        return email === GLOBAL.user_email? 'current' : '';
    }

    // Updating state from child component
    filterUserRole = (value) => {
        let clientsList = utils.searchUserBy(GLOBAL.clients, "role", value);
        this.setState({
            clients: clientsList
        })
    }

    filterUserName = (value) => {
        if(value.length > 0)
        {
            let clientsList = utils.searchUserBy(GLOBAL.clients, "name", value);
            this.setState({
                clients: clientsList
            })  
        }
    }

    render () {
        const clientsList = this.state.clients.map((client) =>
            <tr className={this.selectUser(client.email)} key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.role}</td>
            </tr>
        );
        return (
            <div className="row">
                <div className="col-6">
                    <div className="container-table">
                        <Filters filterUserRole={this.filterUserRole} filterUserName={this.filterUserName}/>
                        <table className="table table-hovered table-responsive table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>eMail</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientsList}    
                            </tbody>
                        </table>
                    </div>            
                </div>
                <div className="col-6">
                    <div className="container-table">
                        <table className="table table-hovered table-responsive table-bordered">
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Fractional</th>
                                    <th>Start Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Table;