import { observable, action } from 'mobx';

class store {
    @observable token = "";
    @action Edit = (name) => {
        console.log(this.name);
        this.token = JSON.stringify(name);
    };
}

const LoginToken = new store();

export default LoginToken;