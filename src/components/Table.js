import React , { Component } from 'react';
import * as utils from "../helpers/helpers.js";
import '../App.css';

import Filters from "./Filters";
import GLOBAL from '../global.js'

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
        this.getData();
    }

    selectUser(email)
    {
        return email === GLOBAL.user_email? 'current' : '';
    }

    // Updating state from child component
    filterUser = (param) => {
        let clientsList = utils.searchUserBy(GLOBAL.clients, "role", param);
        this.setState({
            clients: clientsList
        })
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
            <div className="container-table">
                <Filters filterUser={this.filterUser}/>
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
        )
    }
}

export default Table;