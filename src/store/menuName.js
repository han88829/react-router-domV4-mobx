import { observable, action, useStrict } from 'mobx';

useStrict(true);

class store {
    @observable routeKey = [
        { name: "主页", key: "/home" }
    ];
    @action addKey = (data) => {
        this.props.history.push(data.key)
        let offer = false;
        this.routeKey.forEach(function (x, i) {
            if (x.key == data.key) {
                offer = true
            }
        }, this);
        if (!offer) {
            this.routeKey.push(data);
        }
    };
    @action deleteKey = (data) => {
        this.routeKey.forEach(function (x, i) {
            if (x.key == data.key) {
                this.routeKey.splice(i, 1);
                let len = this.routeKey.length;
                this.props.history.push(this.routeKey[len - 1].key)
            }
        }, this);
    };
}

const menuName = new store();

export default menuName;