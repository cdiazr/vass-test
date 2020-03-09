import React, { Component } from 'react';

class Filters extends Component {
    constructor() {
        super();
        this.state = {
            name: ''    
        };
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }

    clearInput = () => {
        this.setState({
            name: ""
        });
        
        this.props.filterUserRole('all')
    }

    render() {
        return (
            <div className="filtering">
                <div className="row">
                    <div className="col-8">
                        <div className="input-group input-group-sm mb-3">
                            <input type="text" name="name" className="form-control" aria-label="Username" placeholder="Enter a username..." aria-describedby="inputGroup-sizing-sm"
                                value={this.state.name} onChange={this.handleChange} />
                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-sm btn-info"
                                    onClick={() => this.props.filterUserName(this.state.name)}>
                                    <i className="fa fa-search"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-warning"
                                    onClick={this.clearInput}>
                                    <i className="fa fa-eraser"></i>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-4 role-filters">
                        <div className="btn-group" role="group" aria-label="Filters by role">
                            <button type="button" className="btn btn-sm btn-secondary"
                                onClick={() => this.props.filterUserRole('all')}>All</button>
                            <button type="button" className="btn btn-sm btn-secondary"
                                onClick={() => this.props.filterUserRole('admin')}>Admins</button>
                            <button type="button" className="btn btn-sm btn-secondary"
                                onClick={() => this.props.filterUserRole('user')}>Users</button>
                        </div>
                    </div>
                </div>
            </div>   
        )
    }
}

export default Filters;