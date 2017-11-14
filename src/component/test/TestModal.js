
import React, { Component } from 'react';
import { Row, Checkbox } from 'antd';
import { action, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';


@inject('store')
@observer
class App extends Component {
    render() {
        return (
            <div>
                {this.props.store.test.data.map((x, i) => {
                    return (
                        <Row key={i}>
                            <Checkbox
                                onChange={action((e) => {
                                    this.props.store.test.data[i].checked = e.target.checked;
                                })}
                                checked={x.checked}
                            >Checkbox</Checkbox>
                        </Row>
                    )
                })}
            </div>
        );
    }
}

export default App;