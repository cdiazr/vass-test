import React , { Component } from 'react';
import NumberFormat from "react-number-format";

import * as utils from "../helpers/helpers.js";
import GLOBAL from '../data/global.js'

import Filters from "./Filters";
import moment from 'moment';

class Table extends Component {
    constructor() {
        super();
        this.state = {
            clients: [],
            currentPage: 1,
            itemsPerPage: 25,
            policies: [],
            role: ""   
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

    componentDidMount() { 
        this.getClients();
        utils.getDataFromAPI('policies');

        let user = utils.getAuthData();
        this.setState({ role: user.role });
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
        if(value.length > 0)
        {
            let clientsList = utils.searchUserBy(GLOBAL.clients, "name", value);
            this.setState({
                clients: clientsList
            })  
        }
    }

    policiesList = (clientID) => {
        let policies = utils.setPoliciesListByClient(GLOBAL.policies, clientID);
        
        if(policies === undefined)
        {
            policies = [];
        }

        this.setState({ policies: policies })
    }

    renderFractional(bool)
    {
        return bool? 'Yes' : 'No';
    }

    render () {
        const { clients, currentPage, itemsPerPage } = this.state;

        // Logic for displaying current clients per page
        const clientsLastItem = currentPage * itemsPerPage;
        const clientsFirstItem = clientsLastItem - itemsPerPage;
        const currentItems = clients.slice(clientsFirstItem, clientsLastItem);

        // Logic for displaying table rows
        const clientsList = currentItems.map((client, index) =>
            <tr key={index} className={this.selectUser(client.email)}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.role}</td>
                <td>
                    <a onClick={() => this.policiesList(client.id)}><i className="fa fa-eye"></i></a>
                </td>
            </tr>
        );

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(clients.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        
        const renderQtyNumbers = clientsLastItem + " of " + Object.keys(this.state.clients).length + " records"
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
                            <tfoot>
                                <tr>
                                    <td>
                                        {renderQtyNumbers}
                                    </td>
                                    <td colSpan="100%">
                                        {renderPageNumbers}
                                    </td>
                                </tr>
                            </tfoot>
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
                                {this.state.policies.map((policy) =>
                                    <tr key={policy.id}>
                                        <td><NumberFormat value={policy.amountInsured} displayType={'text'} thousandSeparator={true} suffix={'€'} /></td>
                                        <td>{this.renderFractional(policy.installmentPayment)}</td>
                                        <td>{moment(policy.inceptionDate).utc().format('DD-MM-YYYY H:m:ss')}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>           
        )
    }
}

export default Table;