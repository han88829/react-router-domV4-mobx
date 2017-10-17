import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col, Button, Form, Dropdown, Menu, Icon, Modal, Input, Radio, Popconfirm, message } from 'antd'
import CollectionCreate from './collectioncreate';
import ReceiveLog from './receivelog';
import Billing from './Billing';
import Billingedit from './Billingedit';
import Collectionedit from './collectionedit';
import Receiveedit from './receiveedit';

export default class ProjectReceive extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 22,
            i: 0,
            keys: [],
            visible: false,
            receivelog: false,
            sort: 0,
            visibleBilling: false,
            select: 0,
            leave: false,
            dataTotal: [],
            edit: false,
            sortId: 0,
            sortEdit: 0,
            visibleBillingedit: false,
            visibleColection: false,
            visibleReceive: false,
            sortData: {}
        }
    }

    componentDidMount() {
        var myFetchOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'id=' + this.state.id
        };
        fetch("/home/api/get_receive", myFetchOptions).then(x => x.json()).then(x => {
            console.log(x)
            let data = [];
            for (var key in x.data) {
                data.push(x.data[key])
            }
            this.setState({ dataTotal: data });
        }).catch(err => console.error(err))
    }


    add() {
        let dataTotal = this.state.dataTotal;
        dataTotal.push({ pid: this.state.id, total: 0, receive: 0, billing: 0, list: [] })
        this.setState({ dataTotal });
    }
    showModal(item, key, keyPath) {
        if (item.key == 2) {
            this.setState({ receivelog: true, edit: false })
        } else if (item.key == 3) {
            this.setState({ visibleBilling: true, edit: false });
        } else {
            let { sort, dataTotal } = this.state;
            let data = dataTotal[sort - 1];
            let Switch = false;
            data.list.forEach(function (x, i) {
                if (data.list[i].type == 1) {
                    Switch = true
                }
            }, this);
            if (Switch) {
                message.info("回款计划已存在！")
                return
            }
            this.setState({ visible: true, edit: false })
        }

    }
    handleCancel(Switch) {
        this.setState({ visible: false, edit: false });
        if (!Switch) {
            return
        }
        var myFetchOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'id=' + this.state.id
        };
        fetch("/home/api/get_receive", myFetchOptions).then(x => x.json()).then(x => {
            console.log(x)
            let data = [];
            for (var key in x.data) {
                data.push(x.data[key])
            }
            this.setState({ dataTotal: data });
        }).catch(err => console.error(err))
    }
    handleCancelBilling(Switch) {
        this.setState({ visibleBilling: false, edit: false });
        if (!Switch) {
            return
        }

        var myFetchOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'id=' + this.state.id
        };
        fetch("/home/api/get_receive", myFetchOptions).then(x => x.json()).then(x => {
            console.log(x)
            let data = [];
            for (var key in x.data) {
                data.push(x.data[key])
            }
            this.setState({ dataTotal: data });
        }).catch(err => console.error(err))
    }
    handleOk(e) {
        // console.log(e);
        // this.setState({ loading: true });
        // setTimeout(() => {
        //     this.setState({ loading: false, visible: false });
        // }, 3000);
    }
    ReceiveCancel(Switch) {
        this.setState({ receivelog: false, edit: false });
        if (!Switch) {
            return
        }
        var myFetchOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'id=' + this.state.id
        };
        fetch("/home/api/get_receive", myFetchOptions).then(x => x.json()).then(x => {
            console.log(x)
            let data = [];
            for (var key in x.data) {
                data.push(x.data[key])
            }
            this.setState({ dataTotal: data });
        }).catch(err => console.error(err))
    }

    Refresh() {
        var myFetchOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'id=' + this.state.id
        };
        fetch("/home/api/get_receive", myFetchOptions).then(x => x.json()).then(x => {
            console.log(x)
            let data = [];
            for (var key in x.data) {
                data.push(x.data[key])
            }
            this.setState({ dataTotal: data });
        }).catch(err => console.error(err))
    }

    deleteData(id) {
        var myFetchOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'id=' + id
        };
        fetch("/home/api/delete_receive", myFetchOptions).then(x => x.json()).then(x => {
            if (x.status == 1) {
                message.info("删除成功！");
                var myFetchOptionsT = {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    body: 'id=' + this.state.id
                };
                fetch("/home/api/get_receive", myFetchOptionsT).then(x => x.json()).then(x => {
                    let data = [];
                    for (var key in x.data) {
                        data.push(x.data[key])
                    }
                    this.setState({ dataTotal: data });
                }).catch(err => console.error(err))
                return
            }
            message.info("删除失败！");
        }).catch(err => console.error(err))
    }

    editReceive(data) {
        switch (data.type) {
            case "1":
                this.setState({ visibleColection: true, sortEdit: data.sort, sortData: data.sortData, sortId: data.id })
                break;
            case "2":
                this.setState({ visibleReceive: true, sortEdit: data.sort, sortData: data.sortData, sortId: data.id })
                break;
            case "3":
                this.setState({ visibleBillingedit: true, sortEdit: data.sort, sortData: data.sortData, sortId: data.id });
                break;

            default:
                break;
        }
    }

    render() {
        let data = this.state.dataTotal;
        let type = ["", "计划", "实际", "开票"];
        const i = this.state.i
        const menu = (
            <Menu onClick={this.showModal.bind(this)}>
                <Menu.Item key="1">添加回款计划</Menu.Item>
                <Menu.Item key="2">添加回款记录</Menu.Item>
                <Menu.Item key="3">添加开票记录</Menu.Item>
            </Menu>
        )
        const formItems = data.map((x, k) => {
            return (
                <Row key={k} style={{ marginBottom: '20px', paddingBottom: '10px' }} onMouseLeave={() => {
                    if (this.state.leave) {
                        return
                    }
                    this.setState({ select: -10 });
                }}>
                    <Row style={{ borderBottom: '1px dashed #eee', marginBottom: '20px', paddingBottom: '10px' }}>
                        <Col span={1}></Col>
                        <Col span={8}>
                            <h2>
                                第{k + 1}期
		  				        <Dropdown overlay={menu} trigger={['click']} onVisibleChange={(visible) => { this.setState({ sort: k + 1 }); }} >
                                    <a className="ant-dropdown-link" href="#" style={{ marginLeft: '90px', color: '#aaa', fontWeight: 'bold' }}>
                                        <Icon type="plus" />
                                    </a>
                                </Dropdown>
                            </h2>
                            <p><span >计划 {x.total} 元</span><span> 实际 {x.receive} 元 </span><span>开票 {x.billing} 元</span></p>
                        </Col>
                    </Row>
                    {data[k].list.map((d, i) => {
                        let dd = JSON.parse(d.json)
                        if (d.type == 1) {
                            return (
                                <Row
                                    key={i}
                                    style={{ height: 40, backgroundColor: this.state.select == `${k}` + `${i}` ? "#eff0f2" : "", lineHeight: "40px" }}
                                    onMouseEnter={(e) => {
                                        this.setState({ select: `${k}` + `${i}` });
                                    }}
                                >

                                    <Col span={1}></Col>
                                    <Col span={16}>
                                        <div
                                            style={{ color: '#fff', height: 22, width: 50, backgroundColor: "#ffc107", textAlign: "center", lineHeight: "22px", float: "left", marginTop: 9 }}
                                        >
                                            {type[d.type]}
                                        </div>
                                        <div style={{ float: "left", marginLeft: 5 }}>{dd.date}</div>
                                        <div style={{ float: "left", marginLeft: 20 }}>收款：{dd.money || 0}元</div>
                                        <div style={{ float: "left", marginLeft: 20 }}>{x.receive >= x.total ? "已完成" : "未完成"}</div>

                                        <div style={{ float: "left", marginLeft: 50, display: this.state.select == `${k}` + `${i}` ? '' : "none", cursor: "pointer" }} onClick={(e) => {
                                            e.preventDefault()
                                        }}>
                                            <Icon
                                                style={{ marginRight: 5 }}
                                                type="edit"
                                                onClick={this.editReceive.bind(this, { pid: this.state.id, sort: d.sort, id: d.id, type: d.type, sortData: dd })}
                                            />
                                            <Popconfirm title="确定要删除?"
                                                onConfirm={() => {
                                                    this.deleteData(d.id);
                                                    this.setState({ leave: false });
                                                }}
                                                onCancel={() => {
                                                    this.setState({ leave: false });
                                                }}
                                                okText="是"
                                                cancelText="否"
                                            >
                                                <Icon
                                                    style={{ marginLeft: 5 }}
                                                    onClick={() => {
                                                        this.setState({ select: `${k}` + `${i}`, leave: true });
                                                    }}
                                                    type="delete"
                                                />
                                            </Popconfirm>
                                        </div>
                                    </Col>
                                </Row>
                            )
                        }

                    })}
                    {data[k].list.map((d, i) => {
                        let dd = JSON.parse(d.json)
                        if (d.type == 2) {
                            return (
                                <Row
                                    key={i}
                                    style={{ height: 40, backgroundColor: this.state.select == `${k}` + `${i}` ? "#eff0f2" : "", lineHeight: "40px" }}
                                    onMouseEnter={(e) => {
                                        this.setState({ select: `${k}` + `${i}` });
                                    }}
                                >

                                    <Col span={1}></Col>
                                    <Col span={16}>
                                        <div
                                            style={{ color: '#fff', height: 22, width: 50, backgroundColor: d.type == 1 ? "#eff0f2" : d.type == 2 ? "#00bcd4" : "#8bc34a", textAlign: "center", lineHeight: "22px", float: "left", marginTop: 9 }}
                                        >
                                            {type[d.type]}
                                        </div>
                                        <div style={{ float: "left", marginLeft: 5 }}>{dd.date}</div>
                                        <div style={{ float: "left", marginLeft: 20 }}>收款：{dd.money || 0}元</div>

                                        <div style={{ float: "left", marginLeft: 50, display: this.state.select == `${k}` + `${i}` ? '' : "none", cursor: "pointer" }} onClick={(e) => {
                                            e.preventDefault()
                                        }}>
                                            <Icon
                                                style={{ marginRight: 5 }}
                                                type="edit"
                                                onClick={this.editReceive.bind(this, { pid: this.state.id, sort: d.sort, id: d.id, type: d.type, sortData: dd })}
                                            />
                                            <Popconfirm title="确定要删除?"
                                                onConfirm={() => {
                                                    this.deleteData(d.id);
                                                    this.setState({ leave: false });
                                                }}
                                                onCancel={() => {
                                                    this.setState({ leave: false });
                                                }}
                                                okText="是"
                                                cancelText="否"
                                            >
                                                <Icon
                                                    style={{ marginLeft: 5 }}
                                                    onClick={() => {
                                                        this.setState({ select: `${k}` + `${i}`, leave: true });
                                                    }}
                                                    type="delete"
                                                />
                                            </Popconfirm>
                                        </div>
                                    </Col>
                                </Row>
                            )
                        }

                    })}
                    {data[k].list.map((d, i) => {
                        let dd = JSON.parse(d.json)
                        if (d.type == 3) {
                            return (
                                <Row
                                    key={i}
                                    style={{ height: 40, backgroundColor: this.state.select == `${k}` + `${i}` ? "#eff0f2" : "", lineHeight: "40px" }}
                                    onMouseEnter={(e) => {
                                        this.setState({ select: `${k}` + `${i}` });
                                    }}
                                >

                                    <Col span={1}></Col>
                                    <Col span={16}>
                                        <div
                                            style={{ color: '#fff', height: 22, width: 50, backgroundColor: d.type == 1 ? "#eff0f2" : d.type == 2 ? "#00bcd4" : "#8bc34a", textAlign: "center", lineHeight: "22px", float: "left", marginTop: 9 }}
                                        >
                                            {type[d.type]}
                                        </div>
                                        <div style={{ float: "left", marginLeft: 5 }}>{dd.date}</div>
                                        <div style={{ float: "left", marginLeft: 20 }}>收款：{dd.money || 0}元</div>

                                        <div style={{ float: "left", marginLeft: 50, display: this.state.select == `${k}` + `${i}` ? '' : "none", cursor: "pointer" }} onClick={(e) => {
                                            e.preventDefault()
                                        }}>
                                            <Icon
                                                style={{ marginRight: 5 }}
                                                type="edit"
                                                onClick={this.editReceive.bind(this, { pid: this.state.id, sort: d.sort, id: d.id, type: d.type, sortData: dd })}
                                            />
                                            <Popconfirm title="确定要删除?"
                                                onConfirm={() => {
                                                    this.deleteData(d.id);
                                                    this.setState({ leave: false });
                                                }}
                                                onCancel={() => {
                                                    this.setState({ leave: false });
                                                }}
                                                okText="是"
                                                cancelText="否"
                                            >
                                                <Icon
                                                    style={{ marginLeft: 5 }}
                                                    onClick={() => {
                                                        this.setState({ select: `${k}` + `${i}`, leave: true });
                                                    }}
                                                    type="delete"
                                                />
                                            </Popconfirm>
                                        </div>
                                    </Col>
                                </Row>
                            )
                        }

                    })}

                </Row >
            )
        })
        return (
            <div>

                <CollectionCreate
                    visible={this.state.visible}
                    handleCancel={this.handleCancel.bind(this)}
                    pid={this.state.id}
                    sort={this.state.sort}
                />
                <Billing
                    visible={this.state.visibleBilling}
                    handleCancel={this.handleCancelBilling.bind(this)}
                    pid={this.state.id}
                    sort={this.state.sort}
                />
                <ReceiveLog
                    //ref={this.ReceivesaveFormRef.bind(this)}
                    visible={this.state.receivelog}
                    onCancel={this.ReceiveCancel.bind(this)}
                    sort={this.state.sort}
                    id={this.state.id}
                />
                {/* 编辑 */}
                <Billingedit
                    visible={this.state.visibleBillingedit}
                    handleCancel={() => {
                        this.setState({ visibleBillingedit: false });
                        this.Refresh();
                    }}
                    pid={this.state.id}
                    sort={this.state.sortEdit}
                    sortId={this.state.sortId}
                    sortData={this.state.sortData}
                />
                <Collectionedit
                    visible={this.state.visibleColection}
                    handleCancel={() => {
                        this.setState({ visibleColection: false });
                        this.Refresh();
                    }}
                    pid={this.state.id}
                    sort={this.state.sortEdit}
                    sortId={this.state.sortId}
                    sortData={this.state.sortData}
                />
                <Receiveedit
                    visible={this.state.visibleReceive}
                    onCancel={() => {
                        this.setState({ visibleReceive: false });
                        this.Refresh();
                    }}
                    sort={this.state.sortEdit}
                    id={this.state.id}
                    sortId={this.state.sortId}
                    sortData={this.state.sortData}
                />
                <Row style={{ fontWeight: 'bold', background: '#f1f1f1', height: '40px', lineHeight: '40px' }}>
                    <Col span={1}></Col>
                    <Col span={2}>回款记录</Col>
                </Row>
                <Row style={{ height: '20px', lineHeight: '20px' }}></Row>
                <Form >
                    {formItems}
                </Form>
                <Row>
                    <Col span={1}></Col>
                    <Col span={2}><Button icon="plus" onClick={this.add.bind(this)}>添加回款期次</Button></Col>
                </Row>
            </div>
        )
    }
}