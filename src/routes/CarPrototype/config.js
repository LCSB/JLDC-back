import React, { PureComponent } from 'react';
import {
  Button, Input, Modal, Form, Radio,
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
// const { Option } = Select;
// const { TextArea } = Input;

@Form.create()
export default class Prototypeconfig extends PureComponent {
  cancelPrototypeForm = () => {
    this.props.form.resetFields();
    this.props.cancelPrototype();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { dispatch, prototypeType, record } = this.props;
        const params = {};
        params.prototype_name = fieldsValue.prototype_name;
        params.enable = fieldsValue.enable;
        if (prototypeType === '添加') {
          dispatch({
            type: 'CarPrototype/addCarPrototype',
            payload: params,
            callback: () => {
              this.props.dispatch({
                type: 'CarPrototype/getUseCarReason',
              });
            },
          });
        }
        if (prototypeType === '修改') {
          params.id = record.id;
          dispatch({
            type: 'CarPrototype/reviseCarPrototype',
            payload: params,
            callback: () => {
              this.props.dispatch({
                type: 'CarPrototype/getUseCarReason',
              });
            },
          });
        }
        this.props.form.resetFields();
        this.props.cancelPrototype();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { prototypeVisible, record, prototypeType } = this.props;
    return (
      <Modal
        visible={prototypeVisible}
        width={1000}
        footer={null}
        title={`${prototypeType}用车原因`}
        maskClosable={false}
        onCancel={this.cancelPrototypeForm}
      >
        <Form
          onSubmit={this.handleSubmit}
        >
          <FormItem
            label="用车原因"
          >
            {getFieldDecorator('prototype_name', {
              rules: [{ required: true, message: '请输入用车原因' }],
              initialValue: prototypeType === '修改' ? record.prototype_name : '',
            })(
              <Input
                placeholder="用车原因"
              />
            )}
          </FormItem>
          <FormItem
            label="可用状态"
          >
            {getFieldDecorator('enable', {
              rules: [{ required: true, message: '请选择可用状态' }],
              initialValue: prototypeType === '修改' ? record.enable : true,
            })(
              <RadioGroup>
                <Radio value>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <div className="btns">
            <Button type="primary" htmlType="submit">{prototypeType}</Button>
            <Button
              type="primary"
              onClick={this.cancelPrototypeForm}
            >
              取消
            </Button>
          </div>
        </Form>
      </Modal>
    );
  }
}
