import React, { Component } from 'react';

class User extends Component {

    render() {
        return (
            <div>
                <span>大家好，我是 : </span>
                <span style={{ color: "blue" }}> {this.props.match.params.name}</span>
            </div>
        );
    }
}

export default User;