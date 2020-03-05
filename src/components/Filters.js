import React, { Component } from 'react';

class Filters extends Component {
    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={() => this.props.filterUser('admin')}>Admins</button>
                <button className="btn btn-primary" onClick={() => this.props.filterUser('user')}>Users</button> 
            </div>   
        )
    }
}

export default Filters;