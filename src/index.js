import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Route from './Route';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import { observable, } from "mobx";
import stores from './store/store';

/*
为了支持Mobx的 @。。。 写法，
请安装 babel-plugin-transform-decorators-legacy，
并在package.json或者webpack.config.js下面的plugins中进行配置
*/

// stores作为全局的状态树进行管理
ReactDOM.render(
    <Provider store={stores}>
        <Route />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
