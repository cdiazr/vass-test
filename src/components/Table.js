import React , { Component } from 'react';
import NumberFormat from "react-number-format";

import * as utils from "../helpers/helpers.js";
import GLOBAL from '../data/global.js'

import Filters from "./Filters";

class Table extends Component {
    constructor() {
        super();
        this.state = {
            clients: [],
            currentPage: 1,
            itemsPerPage: 25,
            policies: []    
        };
    }    
    
    getClients = () => {
        utils.getDataFromAPI('clients');    
        setTimeout(() => {
            this.setState({
                clients: GLOBAL.clients
            });
        }, 100);
        
    }

    getPolicies = () => {
        utils.getDataFromAPI('policies');
        setTimeout(() => {
            this.setState({
                policies: GLOBAL.policies
            });
            console.log(this.state.policies);
            utils.setPoliciesListByClient(this.state.policies)
        }, 200);
        
    }

    componentDidMount() { 
        this.getClients();
        this.getPolicies();
    }

    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
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
        let clientsList = utils.searchUserBy(GLOBAL.clients, "name", value);
        this.setState({
            clients: clientsList
        })  
    }

    policiesList = (id) => {
        //let policies = utils.filterByKeyName(GLOBAL.policies);
        //console.log(policies); 
    }
    render () {
        const { clients, currentPage, itemsPerPage, policies } = this.state;

        // Logic for displaying current clients per page
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

        // Logic for displaying table rows with data
        const clientsList = currentItems.map((client) =>
            <tr className={this.selectUser(client.email)}
                key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.role}</td>
                <td>{this.policiesList(client.id)}</td>
            </tr>
        );

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(clients.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        
        const renderQtyNumbers = indexOfLastItem + " of " + Object.keys(this.state.clients).length + " records"

        const renderPageNumbers = pageNumbers.map(number => {
            return (  
                <div className="btn-group" role="group" aria-label="Filters by role">
                    <button className="btn btn-default" key={number} id={number} onClick={this.handleClick}>
                        {number}
                    </button>
                </div>   
            );
        });

        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Filters filterUserRole={this.filterUserRole} filterUserName={this.filterUserName} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 container-table">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>eMail</th>
                                    <th>Role</th>
                                    <th>Policies</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientsList}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6 policies-table">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Fractional</th>
                                    <th>Starting Date</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        {renderQtyNumbers}
                    </div>
                    <div className="col-4 pagination-buttons">
                        {renderPageNumbers}
                    </div>
                </div>
            </div>           
        )
    }
}

export default Table;