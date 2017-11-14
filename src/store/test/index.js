import { observable, action } from 'mobx';

class store {
    @observable visible = false;
    @observable data = [];

    @action hide = () => {
        this.visible = false;
        this.data = [];
    };

    @action onOk = () => {
        console.log(this.data);
        this.visible = false;
        this.data = [];
    }
    @action onChange = (value, i) => {
        this.data[i].checked = value;
    }
}

const test = new store();

export default test;