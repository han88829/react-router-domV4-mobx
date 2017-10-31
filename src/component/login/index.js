import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { inject } from 'mobx-react';
import { observable, action, useStrict } from "mobx";
import './login.css';

useStrict(true)
const FormItem = Form.Item;

@inject('store')
class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 对字符串进行加密处理
                let str = JSON.stringify(values), ss = "";
                for (let i = 0; i < str.length; i++) {
                    ss += String.fromCharCode(str.charCodeAt(i) + 659);
                }
                // let a = "";
                // for (let i = 0; i < ss.length; i++) {
                //     a += String.fromCharCode(ss.charCodeAt(i) - 659);
                // }
                localStorage.setItem('token', ss);
                this.props.store.LoginToken.token = ss;
                message.success("登录成功！")
                this.props.history.push('/app')
            }
        });
    }

    componentWillUnmount() {
        // 组件即将销毁的时候do something 。。。
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                        )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住密码</Checkbox>
                        )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;