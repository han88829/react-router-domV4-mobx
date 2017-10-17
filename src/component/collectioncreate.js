import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Form, Modal, Input, Radio, DatePicker, message } from 'antd';
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

  }


  handleOk(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        pid: this.props.pid,
        type: 1,
        sort: this.props.sort,
        json: {
          date: fieldsValue['date-picker'].format('YYYY-MM-DD'),
          money: fieldsValue["money"],
          note: fieldsValue["remark"],
          ownership: fieldsValue["ownership"],
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
    });
  }
  handleCancel() {
    this.setState({ visible: false });
    this.props.handleCancel();
  }

componentWillReceiveProps(nextProps) {
  this.setState({visible:nextProps.visible});
}

  render() {
    const { getFieldDecorator } = this.props.form;
    let userinfo = sessionStorage.user;
    let data = this.state.data;
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

    return (
      <div>
        <Modal
          visible={this.state.visible}
          title={this.props.edit ? "修改回款计划" : "新建回款计划"}
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
              label="计划回款金额（元）"
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
              label="计划回款日期"
            >
              {getFieldDecorator('date-picker', {
                rules: [{ type: 'object', required: true, message: 'Please select time!' }],
              })(
                <DatePicker />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所有人"
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
              {getFieldDecorator('remark', {
              })(
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