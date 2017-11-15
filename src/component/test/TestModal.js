
import React, { Component } from 'react';
import { Row, Checkbox, Button } from 'antd';
import { action, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';


@inject('store')
@observer
class App extends Component {
    state = {
        releaseBugs: false
    };
    render() {
        if (this.state.releaseBugs) {
            throw new Error("我捕捉到一个错误!");
        }
        return (
            <div>
                <Button
                    onClick={() => {
                        this.setState({
                            releaseBugs: true
                        });
                    }}
                >
                    错误测试
                </Button>
            </div>
        );
    }
}

export default App;