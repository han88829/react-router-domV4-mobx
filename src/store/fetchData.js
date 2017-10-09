import { observable, action } from 'mobx';

class store {
    @observable name = "喊喊";
    @action Edit = (name) => {
        console.log(this.name);
        this.name = name;
    };
}

const fetchData = new store();

export default fetchData;