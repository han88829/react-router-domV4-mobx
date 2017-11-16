import { observable, action, runInAction } from 'mobx';

class store {
    @observable name = "喊喊";
    @action Edit = (name) => {
        console.log(this.name);
        this.name = name;
    };
    @action getData = (props) => {
        props.store.menuName.loading = true;
        console.log(props.store.menuName.loading);
        // fetch('/home/order/orders', { credentials: 'include' }).then(x => x.json()).then(action(x => {
        //     props.store.menuName.loading = false;
        //     console.log(props.store.menuName.loading);
        //     console.log(x)
        // })).catch(err => console.error(err))
        let timer = setTimeout(() => {
            runInAction(() => {
                props.store.menuName.loading = false;
                clearTimeout(timer)
            })
        }, 1000);
    }
}

const fetchData = new store();

export default fetchData;