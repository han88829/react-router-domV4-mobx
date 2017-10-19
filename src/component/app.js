import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action, useStrict } from "mobx";
import { Route, Switch, Link } from 'react-router-dom';
import User from './user';
import Test from './test';


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
    constructor(props) {
        super(props);
        this.state = {
            total: 1,
            data: [],
        }
    }


    @action handle() {
        this.props.appState.prototype.data.push(1);
        // 由全局状态数stores传进来的数据也可以在任何地方进行修改
        // this.props.store.fetchData.name = "Hello Mobx!";
        this.props.store.fetchData.Edit("Hello Mobx!");
    }

    componentDidMount() {
        console.log(this.props)
        // package.json中设置"proxy": "http://m.maizuo.com"  
        //api请求时会自动代理到http://m.maizuo.com，
        //前后端分离以及请求第三方api时进行设置
        fetch('/v4/api/billboard/home').then(x => {
            return x.json()
        }).then(x => {
            x.data.billboards.length = 1;
            this.setState({
                data: x.data.billboards
            });
        }).catch((err) => {
            console.error(err)
        })
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
                --
                <Link to="/app/test">打开测试页</Link>
                --
                <a onClick={() => {
                    localStorage.removeItem('token');
                    this.props.history.push('/login')
                }}>退出登录</a>

                <div style={{}}>
                    {this.state.data.map((x, i) => {
                        return (
                            <div key={i}>
                                <img src={x.imageUrl} alt="" />
                                <span style={{ color: "blue" }}>{x.name}</span>
                            </div>
                        )
                    })}
                </div>
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

@inject('store')
class AppS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
        }
        console.log(props)
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
                {/* props全部传递给子组件，自定义的mobx关联appState需要另外传入 */}
                <App appState={appState} {...this.props} />
                <div>
                    {/* 路由定义user前面必须跟home父组件路由，否则无法识别 */}
                    {/* 自路由必须写在Apps里面，如果写在上放的App内，会造成点击跳转，url变化页面未动，必须在state props改变之后，才会触发找到子页面 */}
                    <Switch>
                        <Route exact path="/app/user" component={User} />
                        <Route exact path="/app/test" component={Test} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default AppS;
