import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action, useStrict } from "mobx";
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import User from '../user';
import Test from '../test';
import Linkage from '../Linkage';
import Table from "../table";
import Rtsp from '../rtsp';
import Report from "../report";

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

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <div>
                    {/* 路由定义user前面必须跟home父组件路由，否则无法识别 */}
                    {/* 路由必须写在Apps里面，如果写在上放的App内，会造成点击跳转，url变化页面未动，必须在state props改变之后，才会触发找到子页面 */}
                    <Switch>
                        <Route exact path="/mobx/app/user" component={User} />
                        <Route exact path="/mobx/app/area" component={Linkage} />
                        <Route exact path="/mobx/app/test" component={Test} />
                        <Route exact path="/mobx/app/table" component={Table} />
                        <Route exact path="/mobx/app/rtsp" component={Rtsp} />
                        <Route exact path="/mobx/app/report" component={Report} />

                        {/* 重定向路由 */}
                        {<Redirect from="/" to="/mobx/app/user" />}
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;
