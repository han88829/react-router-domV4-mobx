import { observable } from 'mobx';
import fetchData from './fetchData';
import LoginToken from './LoginToken';

// 由不同分支的状态集中管理，每个组件也可以由设置单独的状态进行管理
const stores = {
    fetchData,
    LoginToken
}

export default stores;