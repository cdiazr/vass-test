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

    clearFilter = () => {
        this.setState({
            name: ""
        });
        
        this.props.filterUserRole('all')
    }

    render() {
        return (
            <div className="filtering">
                <div className="row">
                    <div className="col-6">
                        <div className="input-group">
                            <input type="text" name="name" placeholder="Enter a username..." className="form-control" 
                                value={ this.state.name }
                                onChange={ this.handleChange }/>
                            <div className="input-group-prepend">
                                <button className="btn btn-sm btn-info" 
                                    onClick={() => this.props.filterUserName(this.state.name) }>
                                    <i className="fa fa-search"></i>
                                </button>
                                <button className="btn btn-sm btn-warning" 
                                    onClick={this.clearFilter }>
                                    <i className="fa fa-eraser"></i>
                                </button>  
                            </div>
                        </div> 
                    </div>

                    <div className="col-6">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button className="btn btn-default"
                                onClick={() => this.props.filterUserRole('all')}>All</button>
                            <button className="btn btn-default" 
                                onClick={() => this.props.filterUserRole('admin')}>Admins</button>
                            <button className="btn btn-default" 
                                onClick={() => this.props.filterUserRole('user')}>Users</button> 
                        </div>     
                    </div>
                </div>
            </div>   
        )
    }
}

export default Filters;