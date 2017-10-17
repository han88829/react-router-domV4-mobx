import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Form, Modal, Input, Radio, DatePicker, Select, message } from 'antd';
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
    this.setState({ visible: nextProps.visible, });
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
        pid: this.props.id,
        type: 2,
        sort: this.props.sort,
        id: this.props.sortId,
        json: {
          date: fieldsValue['date-picker'].format('YYYY-MM-DD'),
          paytype: fieldsValue['paytype'],
          money: fieldsValue["money"],
          note: fieldsValue["note"],
          ownership: this.state.uname,
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
            data: {
              money: "",
              date: "",
              note: "",
              paytype: ""
            }
          });

          this.props.onCancel(true);
          return
        }
        message.error('保存失败！');
      })
    });
  }
  handleCancel() {
    this.setState({ visible: false });
    this.props.onCancel();
  }

  render() {
    // let userinfo = sessionStorage.user
    // userinfo = JSON.parse(userinfo)
    let data = this.state.data;
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    return (
      <Modal
        visible={visible}
        title="Create a new collection1"
        okText="保存"
        onCancel={onCancel}
        onOk={this.handleOk.bind(this)}
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
            label="实际回款金额"
            hasFeedback
          >
            {getFieldDecorator('money', {
              rules: [{
                required: true, message: '请输入回款金额!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input placeholder="请输入回款金额" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="实际回款日期"
          >
            {getFieldDecorator('date-picker', {
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            })(
              <DatePicker />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="付款方式"
          >
            {getFieldDecorator('paytype', {
            })(
              <Select placeholder='请选择付款方式'>
                <Option value="1">支票</Option>
                <Option value="2">现金</Option>
                <Option value="3">银行转账</Option>
                <Option value="4">支付宝</Option>
                <Option value="5">其他</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="所有人"
            hasFeedback
          >
            {getFieldDecorator('ownership', {
              initialValue: 1,
              rules: [{
                required: true, message: '请输入所有人',
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
            {getFieldDecorator('note', {
            })(
              <Input placeholder="备注" />
              )}
          </FormItem>
        </Form>
      </Modal>
    )
  }

}
const ReceiveLog = Form.create()(ReceiveLogForm)
export default ReceiveLog