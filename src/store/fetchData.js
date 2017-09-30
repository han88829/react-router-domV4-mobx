import { observable } from 'mobx';

class store {
    @observable name = "喊喊"
}

const fetchData = new store();

export default fetchData;