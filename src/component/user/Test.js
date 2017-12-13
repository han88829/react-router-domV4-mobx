import React, { Component } from 'react';
import { Input } from 'antd';

class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plan: props.plan
        }
    }

    componentDidMount() {
        this.setState({
            plan: this.props.plan
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            plan: nextProps.plan
        });
    }


    render() {
        const data = this.state.plan
        return (
            <div>
                <Input
                    value={data.name}
                    onChange={(e) => {
                        this.props.onChange("name", e.target.value)
                    }}
                />
            </div>
        );
    }
}

export default componentName;