import { observable, action, useStrict } from 'mobx';

useStrict(true);

class store {
    @observable routeKey = [

    ];
    @action addKey = (data, props) => {
        console.log(props)
        props.history.push(data.key)
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
    @action deleteKey = (data, props) => {
        this.routeKey.forEach(function (x, i) {
            if (x.key == data.key) {
                this.routeKey.splice(i, 1);
                if (data.key != window.location.pathname) {
                    props.history.push(window.location.pathname)
                    return
                }

                let len = this.routeKey.length;
                props.history.push(len > 0 ? this.routeKey[len - 1].key : "home")
            }
        }, this);
    };
}

const menuName = new store();

export default menuName;