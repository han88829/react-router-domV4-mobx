import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Form, Modal, Input, Radio, DatePicker, message, Row, Col } from 'antd';
import moment from 'moment';

const FormItem = Form.Item
class CollectionCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {}
        }
    }


    componentDidMount() {
        let data = this.state.data;

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
            pid: this.props.pid,
            type: 1,
            sort: this.props.sort,
            id: this.props.sortId,
            json: {
                date: data.date,
                money: data.money,
                note: data.note,
                ownership: data.ownership,
            }
        };

        let myFetchOptions = {
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
        }).catch(err => {
            message.error('保存失败！');
            console.error(err)
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
        let data = this.state.data;

        return (
            <div>
                <Modal
                    visible={this.state.visible}
                    title="修改回款计划"
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
                                计划回款金额：
                            </Col>
                            <Col span={12} style={{ marginLeft: 20 }}>
                                <Input value={this.state.data.money || ""}
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
                                计划回款日期：
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
                                所有人：
                            </Col>
                            <Col span={12} style={{ marginLeft: 20 }}>
                                <Input value={this.state.data.ownership || ""}
                                    disabled
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                            <Col span={8} style={{ textAlign: "right", paddingTop: 5 }}>
                                备注：
                            </Col>
                            <Col span={12} style={{ marginLeft: 20 }}>
                                <Input value={this.state.data.note || ""}
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

export default CollectionCreateForm