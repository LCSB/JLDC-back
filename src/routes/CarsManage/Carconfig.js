import React, { PureComponent } from 'react';
import {
  Button, Input, Modal, Form, Radio, Select, DatePicker,
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
// const { TextArea } = Input;
@Form.create()
export default class Modalconfig extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { dispatch } = this.props;
        this.props.cancelModal();
        if (this.props.modalType === '添加') {
          dispatch({
            // type: 'car/addCar',
            payload: fieldsValue,
            callback: () => {
              dispatch({
                type: 'car/getAllCarList',
              });
            },
          });
        }
        // if (this.props.modalType === '添加') {
        //   dispatch({
        //     type: 'car/reviseCar',
        //     payload: fieldsValue,
        //     callback: () => {
        //       dispatch({
        //         type: 'car/getAllCarList',
        //       })
        //     }
        //   });
        // }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { modalType, cancelModal, record, orgList, carVisible } = this.props;
    return (
      <Modal
        visible={carVisible}
        width={1000}
        footer={null}
        title={modalType}
        maskClosable={false}
        onCancel={cancelModal}
      >
        <Form
          onSubmit={this.handleSubmit}
        >
          <FormItem
            label="车牌号"
          >
            {getFieldDecorator('vehicle_number', {
              rules: [{ required: true, message: '请输入车牌号' }],
              initialValue: modalType === '添加' ? '' : record.name,
            })(
              <Input
                disabled={modalType === '详情'}
                placeholder="车牌号"
              />
            )}
          </FormItem>
          <FormItem
            label="车辆用途"
          >
            {getFieldDecorator('vehicle_type', {
              rules: [{ required: true, message: '请输入车辆用途' }],
              initialValue: modalType === '添加' ? '' : record.police_number,
            })(
              <Input
                disabled={modalType === '详情'}
                placeholder="车辆用途"
              />
            )}
          </FormItem>
          <FormItem
            label="座位数"
          >
            {getFieldDecorator('seat_number', {
              rules: [{ required: true, message: '请输入座位数' }],
              initialValue: modalType === '添加' ? '' : record.enable,
            })(
              <Input
                disabled={modalType === '详情'}
                placeholder="座位数"
              />
            )}
          </FormItem>
          <FormItem
            label="采购时间"
          >
            {getFieldDecorator('purchasing_time', {
              rules: [{ required: true, message: '请输入采购时间' }],
              // initialValue: modalType === '添加' ? '' : record.police_number,
            })(
              <DatePicker
                disabled={modalType === '详情'}
              />
            )}
          </FormItem>
          <FormItem
            label="用车部门"
          >
            {getFieldDecorator('depart_id', {
              rules: [{ required: true, message: '请选择用车部门' }],
              initialValue: modalType === '添加' ? '' : record.vehicle_depart_id,
            })(
              <Select
                disabled={modalType === '详情'}
              >
                {
                  orgList.map((val) => {
                    return (
                      <Option
                        key={val.organization.id}
                        value={val.organization.id}
                      >
                        {val.organization.org_name}
                      </Option>
                    );
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            label="车辆状态"
          >
            {getFieldDecorator('vehicle_status', {
              initialValue: modalType === '添加' ? false : record.is_system,
            })(
              <RadioGroup
                disabled={modalType === '详情'}
              >
                <Radio value>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          {
            modalType !== '详情' &&
            (
              <div className="btns">
                <Button type="primary" htmlType="submit">{modalType}</Button>
                <Button
                  type="primary"
                  onClick={cancelModal}
                >
                  取消
                </Button>
              </div>
            )
          }
        </Form>
      </Modal>
    );
  }
}
