import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Form, Modal, Input, Radio, DatePicker, message, Select, Row, Col } from 'antd';
import moment from 'moment';

const FormItem = Form.Item
const Option = Select.Option;

class CollectionCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {}
        }
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
        if (!data.content) {
            message.error("票据内容不能为空");
            return
        }
        const values = {
            pid: this.props.pid,
            type: 3,
            sort: this.props.sort,
            id: this.props.sortId,
            json: {
                date: data.date,
                money: data.money,
                note: data.note,
                ownership: data.ownership,
                type: data.type,
                content: data.content,
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

                this.props.handleCancel(true);
                return
            }
            message.error('保存失败！');
        })
    }
    handleCancel() {
        this.setState({ visible: false });
        this.props.handleCancel();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ visible: nextProps.visible, data: nextProps.sortData });
    }

    render() {
        const dateFormat = 'YYYY/MM/DD';
        let userinfo = sessionStorage.user;
        return (
            <div>
                <Modal
                    visible={this.state.visible}
                    title="新建开票记录"
                    okText="确定"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
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
                                票据内容：
                            </Col>
                            <Col span={12} style={{ marginLeft: 20 }}>
                                <Input value={this.state.data.content}
                                    onChange={(e) => {
                                        let data = this.state.data;
                                        data.content = e.target.value;
                                        this.setState({ data });
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                            <Col span={8} style={{ textAlign: "right", paddingTop: 5 }}>
                                金额（元）：
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
                                开票日期：
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
                                票据类型：
                            </Col>
                            <Col span={12} style={{ marginLeft: 20 }}>
                                <Select
                                    style={{ width: 120 }}
                                    placeholder='请选择票据类型'
                                    value={this.state.data.type}
                                    onChange={(value) => {
                                        let data = this.state.data;
                                        data.type = value;
                                        this.setState({
                                            data
                                        });
                                    }}
                                >
                                    <Option value="增值税">增值税</Option>
                                    <Option value="普通国税">普通国税</Option>
                                    <Option value="普通地税">普通地税</Option>
                                    <Option value="增值税专用发票">增值税专用发票</Option>
                                    <Option value="增值税普通发票">增值税普通发票</Option>
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
            </div>
        )
    }

}
const CollectionCreate = Form.create()(CollectionCreateForm)
export default CollectionCreate