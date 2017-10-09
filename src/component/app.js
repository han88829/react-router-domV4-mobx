import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action, useStrict } from "mobx";
import { Route, Switch, Link } from 'react-router-dom';
import User from './user';


/*
为了支持Mobx的 @。。。 写法，
请安装 babel-plugin-transform-decorators-legacy，
并在package.json或者webpack.config.js下面的plugins中进行配置
*/
// mobx严格模式，开启后必须加@action才能修改状态数
useStrict(true);
class appState {
    @observable data = [1, 2, 3];
}

// 全局状态数stores传入组件
@inject('store')
// observer监听状态变化更改ui
@observer
class App extends Component {

    @action handle() {
        this.props.appState.prototype.data.push(1);
        // 由全局状态数stores传进来的数据也可以在任何地方进行修改
        // this.props.store.fetchData.name = "Hello Mobx!";
        this.props.store.fetchData.Edit("Hello Mobx!");
    }

    render() {
        return (
            <div className="App" >
                <p className="App-intro" onClick={this.handle.bind(this)}>
                    {this.props.store.fetchData.name}
                </p>
                <Link to="/app/user">打开子页面</Link>
                --
                <Link to="/home">打开总页面</Link>

                <ul>
                    {this.props.appState.prototype.data.map((x, i) => {
                        return (
                            <li key={i}>
                                {i}
                            </li>
                        )
                    })}
                </ul>

            </div>
        );
    }
}

class AppS extends Component {

    render() {
        return (
            <div>
                <App appState={appState} />
                <div>
                    {/* 路由定义user前面必须跟home父组件路由，否则无法识别 */}
                    {/* 自路由必须写在Apps里面，如果写在上放的App内，会造成点击跳转，url变化页面未动，必须在state props改变之后，才会出发找到子页面 */}
                    <Switch>
                        <Route exact path="/app/user" component={User} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default AppS;
