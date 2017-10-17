import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Form, Modal, Input, Radio, DatePicker, message, Select } from 'antd';

const FormItem = Form.Item
const Option = Select.Option;

class CollectionCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    handleOk(e) {
        // this.setState({ visible: false });
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            // Should format date value before submit.
            const values = {
                pid: this.props.pid,
                type: 3,
                sort: this.props.sort,
                id: this.props.sortId,
                json: {
                    date: fieldsValue['date-picker'].format('YYYY-MM-DD'),
                    money: fieldsValue["money"],
                    note: fieldsValue["note"],
                    ownership: fieldsValue["ownership"],
                    type: fieldsValue["type"],
                    content: fieldsValue["content"],
                }
            };
            var myFetchOptions = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            };
            fetch('/home/api/set_receive', myFetchOptions).then(x => x.json()).then(x => {
                if (x.status == 1) {
                    message.success('保存成功！');
                    this.setState({ visible: false });
                    this.props.handleCancel(true);
                    return
                }
                message.error('保存失败！');
            }).catch(err => {
                message.error('保存失败！');
                console.error(err)
            })
        });
    }
    handleCancel() {
        this.setState({ visible: false });
        this.props.handleCancel();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ visible: nextProps.visible });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let userinfo = sessionStorage.user
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        return (
            <div>
                <Modal
                    visible={this.state.visible}
                    title="新建开票记录"
                    okText="确定"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <Form layout="horizontal">
                        <FormItem
                            {...formItemLayout}
                            label="&nbsp;&nbsp;回款期次"
                            hasFeedback
                        >
                            {getFieldDecorator('sort', {
                                initialValue: this.props.sort,
                                rules: [{
                                    required: false, message: '',
                                }],
                            })(
                                <Input style={{ border: "none", backgroundColor: "#fff", color: "black" }} disabled />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="票据内容"
                            hasFeedback
                        >
                            {getFieldDecorator('content', {
                                rules: [{
                                    required: true, message: '请输入票据内容!',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input placeholder="票据内容" />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="金额（元）"
                            hasFeedback
                        >
                            {getFieldDecorator('money', {
                                rules: [{
                                    required: true, message: '请输入金额!',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input placeholder="金额" />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="开票日期"
                        >
                            {getFieldDecorator('date-picker', config)(
                                <DatePicker />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="票据类型"
                            hasFeedback
                        >
                            {getFieldDecorator('type', {
                                rules: [{
                                    required: true, message: '请选择票据类型!',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Select placeholder="请选择票据类型" style={{ width: 160 }}>
                                    <Option value="增值税">增值税</Option>
                                    <Option value="普通国税">普通国税</Option>
                                    <Option value="普通地税">普通地税</Option>
                                    <Option value="增值税专用发票">增值税专用发票</Option>
                                    <Option value="增值税普通发票">增值税普通发票</Option>
                                </Select>
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="发票号码"
                            hasFeedback
                        >
                            {getFieldDecorator('number', {
                                rules: [{
                                    required: true, message: '请输入发票号',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input placeholder="发票号" />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="经手人"
                            hasFeedback
                        >
                            {getFieldDecorator('ownership', {
                                initialValue: userinfo || "",
                                rules: [{
                                    required: true, message: '请输入所有人',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input placeholder="" />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="备注"
                            hasFeedback
                        >
                            {getFieldDecorator('note')(
                                <Input placeholder="备注" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }

}
const CollectionCreate = Form.create()(CollectionCreateForm)
export default CollectionCreate