import React, { Component } from 'react';

class Admin extends Component {
    render() {
        return (
            <div>
                总页面

                <div onClick={() => {
                    {/* 调用props返回方法，跳转指定路由，请用push */ }
                    this.props.history.goBack();
                    {/* this.props.history.push('/app') */ }
                }}>
                    返回
                </div>
            </div>
        );
    }
}

export default Admin;