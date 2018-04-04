import React, { PureComponent } from 'react';
import {
  Button, Input, Modal, Form, Radio,
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
// const { Option } = Select;
// const { TextArea } = Input;

@Form.create()
export default class Modalconfig extends PureComponent {
  cancelTypeModalForm = () => {
    this.props.form.resetFields();
    this.props.cancelTypeModal();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { dispatch, modalType, recordMes } = this.props;
        const params = {};
        params.vehicle_model_name = fieldsValue.vehicle_model_name;
        params.enable = fieldsValue.enable;
        if (modalType === '添加') {
          dispatch({
            type: 'carModal/addCarModal',
            payload: params,
            callback: () => {
              this.props.dispatch({
                type: 'carModal/getCarModalList',
              });
            },
          });
        }
        if (modalType === '修改') {
          params.id = recordMes.id;
          dispatch({
            type: 'carModal/reviseCarModal',
            payload: params,
            callback: () => {
              this.props.dispatch({
                type: 'carModal/getCarModalList',
              });
            },
          });
        }
        this.props.form.resetFields();
        this.props.cancelTypeModal();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { carTypeVisible, modalType, recordMes } = this.props;
    return (
      <Modal
        visible={carTypeVisible}
        width={1000}
        footer={null}
        title={`${modalType}车型`}
        maskClosable={false}
        onCancel={this.cancelTypeModalForm}
      >
        <Form
          onSubmit={this.handleSubmit}
        >
          <FormItem
            label="车型名称"
          >
            {getFieldDecorator('vehicle_model_name', {
              rules: [{ required: true, message: '请输入车型号 ' }],
              initialValue: modalType === '添加' ? '' : recordMes.vehicle_model_name,
            })(
              <Input
                placeholder="车型名称"
              />
            )}
          </FormItem>
          <FormItem
            label="可用状态"
          >
            {getFieldDecorator('enable', {
              rules: [{ required: true, message: '请选择可用状态' }],
              initialValue: modalType === '添加' ? true : recordMes.enable,
            })(
              <RadioGroup>
                <Radio value>可用</Radio>
                <Radio value={false}>不可用</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <div className="btns">
            <Button type="primary" htmlType="submit">{modalType}</Button>
            <Button
              type="primary"
              onClick={this.cancelTypeModalForm}
            >
              取消
            </Button>
          </div>
        </Form>
      </Modal>
    );
  }
}
