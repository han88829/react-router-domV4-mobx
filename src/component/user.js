import React, { Component } from 'react';

class User extends Component {

    componentWillMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <span>大家好，我是 :123</span>
            </div>
        );
    }
}

export default User;