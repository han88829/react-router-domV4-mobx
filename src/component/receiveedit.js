import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Form, Modal, Input, Radio, DatePicker, Select, message, Row, Col } from 'antd';
import moment from 'moment';

const FormItem = Form.Item
const Option = Select.Option
class ReceiveLogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            username: '',
            data: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ visible: nextProps.visible, data: nextProps.sortData });
    }


    handleOk() {
        let { data } = this.state;
        if (!data.date) {
            message.error("时间不能为空");
            return
        }
        if (!data.money) {
            message.error("金额不能为空");
            return
        }
        const values = {
            pid: this.props.id,
            type: 2,
            sort: this.props.sort,
            id: this.props.sortId,
            json: {
                date: data.date,
                money: data.money,
                note: data.note,
                ownership: data.ownership,
                paytype: data.paytype,

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
                this.setState({
                    visible: false,
                });

                this.props.onCancel(true);
                return
            }
            message.error('保存失败！');
        })
    }
    handleCancel() {
        this.setState({ visible: false });
        this.props.onCancel();
    }

    render() {
        // let userinfo = sessionStorage.user
        // userinfo = JSON.parse(userinfo)
        let data = this.state.data;
        const dateFormat = 'YYYY/MM/DD';
        const { visible, onCancel, onCreate, form } = this.props;
        return (
            <Modal
                visible={visible}
                title="修改回款记录"
                okText="保存"
                onCancel={onCancel}
                onOk={this.handleOk.bind(this)}
            >
                <Row>
                    <Row>
                        <Col span={8} style={{ textAlign: "right" }}>
                            回款期次：
                        </Col>
                        <Col span={12} style={{ marginLeft: 20 }}>
                            {this.props.sort}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        <Col span={8} style={{ textAlign: "right", paddingTop: 5 }}>
                            实际回款金额：
                        </Col>
                        <Col span={12} style={{ marginLeft: 20 }}>
                            <Input value={this.state.data.money}
                                onChange={(e) => {
                                    let data = this.state.data;
                                    data.money = e.target.value;
                                    this.setState({ data });
                                }}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        <Col span={8} style={{ textAlign: "right", paddingTop: 5 }}>
                            实际回款日期：
                        </Col>
                        <Col span={12} style={{ marginLeft: 20 }}>
                            <DatePicker
                                value={moment(this.state.data.date || new Date(), dateFormat)}
                                format={dateFormat}
                                onChange={(date, dateString) => {
                                    let data = this.state.data;
                                    data.date = dateString;
                                    this.setState({
                                        data
                                    });
                                }}

                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        <Col span={8} style={{ textAlign: "right", paddingTop: 5 }}>
                            付款方式：
                        </Col>
                        <Col span={12} style={{ marginLeft: 20 }}>
                            <Select
                                placeholder='请选择付款方式'
                                value={this.state.data.paytype}
                                onChange={(value) => {
                                    let data = this.state.data;
                                    data.paytype = value;
                                    this.setState({
                                        data
                                    });
                                }}
                            >
                                <Option value="1">支票</Option>
                                <Option value="2">现金</Option>
                                <Option value="3">银行转账</Option>
                                <Option value="4">支付宝</Option>
                                <Option value="5">其他</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        <Col span={8} style={{ textAlign: "right", paddingTop: 5 }}>
                            所有人：
                        </Col>
                        <Col span={12} style={{ marginLeft: 20 }}>
                            <Input value={this.state.data.ownership}
                                disabled
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        <Col span={8} style={{ textAlign: "right", paddingTop: 5 }}>
                            备注：
                         </Col>
                        <Col span={12} style={{ marginLeft: 20 }}>
                            <Input value={this.state.data.note}
                                onChange={(e) => {
                                    let data = this.state.data;
                                    data.note = e.target.value;
                                    this.setState({ data });
                                }}
                            />
                        </Col>
                    </Row>
                </Row>
            </Modal>
        )
    }

}
const ReceiveLog = Form.create()(ReceiveLogForm)
export default ReceiveLog