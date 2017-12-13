import React, { Component } from 'react';
import { Modal, Input } from 'antd';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: "111", age: "111" },
                { name: "222", age: "222" },
                { name: "333", age: "333" },
                { name: "444", age: "444" },
                { name: "555", age: "555" },
            ],
            plan: {}
        }
    }

    render() {
        return (
            <div>
                {this.state.data.map((x, i) => {
                    return (
                        <div
                            key={i}
                            onClick={() => {
                                this.setState({
                                    visible: true,
                                    plan: x
                                });
                            }}
                        >
                            name:{x.name}
                        </div>
                    )
                })}
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={() => {
                        this.setState({ visible: false });
                    }}
                    onCancel={() => {
                        this.setState({ visible: false });
                    }}
                >
                    <Input
                        value={this.state.plan.name}
                        onChange={(e) => {
                            let plan = { ...this.state.plan, name: e.target.value }
                            this.setState({
                                plan
                            });
                        }}
                    />
                </Modal>
            </div>
        );
    }
}

export default User;