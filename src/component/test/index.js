import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { toJS, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import './test.css';
import TestModal from './TestModal';
import ErrorTest from '../error';
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
            <ErrorTest>
                <TestModal />
            </ErrorTest>
        );
    }
}

export default Test;