import { observable, action, useStrict } from 'mobx';
import RouteData from './RouteData';

useStrict(true);

class store {
    @observable routeKey = [];
    @observable parent = [{ name: "首页", path: "/home" }]
    //导航栏增加新的记录的时候只需要@inject引入store。并调用addKey函数。传入{name:"。。。",key:"path"}即可
    @action addKey = (data, props) => {
        props.history.push(data.key);
        let offer = false;
        this.routeKey.forEach(function (x, i) {
            if (x.key == data.key) {
                offer = true
            }
        }, this);
        this.addBread(data.name);
        if (!offer) {
            this.routeKey.push(data);
        }
    };
    // 删除历史记录的导航栏，后期会加入销毁状态
    @action deleteKey = (data, props) => {
        this.routeKey.forEach(function (x, i) {
            if (x.key == data.key) {
                this.routeKey.splice(i, 1);

                if (data.key != window.location.pathname) {
                    props.history.push(window.location.pathname)
                    return
                }

                let len = this.routeKey.length;
                this.addBread(len > 0 ? this.routeKey[len - 1].name : "首页");
                props.history.push(len > 0 ? this.routeKey[len - 1].key : "home")
            }
        }, this);
    };
    // 面包屑所有数据存在RouteData中，如增加新的页面，并且需要使用面包屑，请在RouteData中按格式添加即可
    @action addBread = (data) => {
        this.parent = [];
        RouteData.forEach(function (x) {
            if (data === x.name) {
                this.parent = x.data;
            }
        }, this);
    }
    // 严格模式使用fetch promise async 无法修改状态值
    /**
     * 可以使用action关键之包裹如下所示
     * fetch('/home/name').then(x=>x.json()).then(action(x=>{
     * console.log(x);
     * this.name = x.name;//这里action包裹之后才可以修改严格模式下的状态
     * }))
     */
}

const menuName = new store();

export default menuName;