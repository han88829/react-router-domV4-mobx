import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { toJS, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import './test.css';
import TestModal from './TestModal';
const FormItem = Form.Item;

@inject("store")
@observer
class Test extends Component {
    state = {
        hasError: false
    }
    componentDidCatch(error, info) {
        console.log(error);
        console.log(info);
        // 显示回退UI
        this.setState({ hasError: true });
    }
    render() {
        if (this.state.hasError) {
            return <div>发生错误，请查看错误信息</div>
        }
        return (
            <div>
                <Button
                    type="primary"
                    onClick={action(() => {
                        throw new Error("错误")
                        this.props.store.test.visible = true;
                        let data = [];
                        for (let i = 0; i < 10; i++) {
                            data.push(
                                { checked: false }
                            )
                        }
                        this.props.store.test.data = data;
                    })}

                >打开modal</Button>
                <Modal
                    title="Basic Modal"
                    visible={this.props.store.test.visible}
                    onOk={this.props.store.test.onOk}
                    onCancel={this.props.store.test.hide}
                >
                    <TestModal />
                </Modal>
            </div>
        );
    }
}

export default Test;