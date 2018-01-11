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
    constructor(props) {
        super(props);
        this.state = {
            releaseBugs: false,
            data: {}
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            'data.hello': 222222
        });
    }

    render() {
        if (this.state.releaseBugs) {
            throw new Error("I crashed!");
        }
        return (
            <ErrorTest>
                <button className="btn" onClick={this.handleClick}>
                    {"Scary Button!"}
                </button>
            </ErrorTest>

        );
    }
}

export default Test;