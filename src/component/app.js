import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action, useStrict } from "mobx";
import { Route, Switch, Link } from 'react-router-dom';
import User from './user';
import Test from './test';
import Linkage from './Linkage';


/*
为了支持Mobx的 @。。。 写法，
请安装 babel-plugin-transform-decorators-legacy，
并在package.json或者webpack.config.js下面的plugins中进行配置
*/

// 全局状态数stores传入组件
@inject('store')
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
        }
    }

    componentWillMount() {
        if (!this.state.token) {
            this.props.history.push('/login');
            return
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.token) {
            this.props.history.push('/login');
            return
        }
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <div>
                    {/* 路由定义user前面必须跟home父组件路由，否则无法识别 */}
                    {/* 路由必须写在Apps里面，如果写在上放的App内，会造成点击跳转，url变化页面未动，必须在state props改变之后，才会触发找到子页面 */}
                    <Switch>
                        <Route exact path="/home/app/user" component={User} />
                        <Route exact path="/home/app/area" component={Linkage} />
                        <Route exact path="/home/app/test" component={Test} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;
