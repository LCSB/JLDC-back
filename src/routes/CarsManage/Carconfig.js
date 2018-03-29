import React, { PureComponent } from 'react';
import moment from 'moment';
import {
  Button, Input, Modal, Form, Radio, Select, DatePicker,
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const showDate = 'YYYY-MM-DD';
const { Option } = Select;
const carStatus = {
  1: '空闲',
  2: '占用',
  3: '维修',
  4: '停用',
};

// const { TextArea } = Input;
@Form.create()
export default class Modalconfig extends PureComponent {
  cancelFormModal = () => {
    this.props.form.resetFields();
    this.props.cancelModal();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      // const arr = Object.keys(err);
      if (!err) {
        const { dispatch } = this.props;
        const params = {};
        params.vehicle_number = fieldsValue.vehicle_number;
        params.vehicle_model = fieldsValue.vehicle_model;
        params.vehicle_type = fieldsValue.vehicle_type;
        params.vehicle_weight = fieldsValue.vehicle_weight;
        params.seat_number = parseInt(fieldsValue.seat_number, 10);
        params.purchasing_time = fieldsValue.purchasing_time;
        params.depart_id = fieldsValue.depart_id;
        params.vehicle_status = fieldsValue.vehicle_status;
        if (this.props.modalType === '添加') {
          dispatch({
            type: 'car/addCar',
            payload: params,
            callback: () => {
              dispatch({
                type: 'car/getAllCarList',
              });
            },
          });
        }
        if (this.props.modalType === '修改') {
          const { id } = this.props.record.vehicle;
          params.id = id;
          dispatch({
            type: 'car/reviseCar',
            payload: params,
            callback: () => {
              dispatch({
                type: 'car/getAllCarList',
              });
            },
          });
        }
        this.props.form.resetFields();
        this.props.cancelModal();
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      modalType, record, orgList, carVisible,
      typeList, ModalList,
    } = this.props;
    return (
      <Modal
        visible={carVisible}
        width={1000}
        footer={null}
        title={modalType}
        maskClosable={false}
        onCancel={this.cancelFormModal}
        style={{ top: 25 }}
      >
        <Form
          onSubmit={this.handleSubmit}
        >
          <FormItem
            label="车牌号"
          >
            {getFieldDecorator('vehicle_number', {
              rules: [{ required: true, message: '请输入车牌号' }],
              initialValue: (modalType !== '添加' && record.vehicle) ? record.vehicle.vehicle_number : '',
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
              initialValue: (modalType !== '添加' && record.vehicle) ? record.vehicle.vehicle_type : '',
            })(
              <Select
                disabled={modalType === '详情'}
              >
                {
                  typeList.map((val) => {
                    return (
                      <Option
                        key={val.id}
                        value={val.id}
                      >
                        {val.vehicle_type_name}
                      </Option>
                    );
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            label="车辆车型"
          >
            {getFieldDecorator('vehicle_model', {
              rules: [{ required: true, message: '请输入车辆车型' }],
              initialValue: (modalType !== '添加' && record.vehicle) ? record.vehicle.vehicle_model : '',
            })(
              <Select
                disabled={modalType === '详情'}
              >
                {
                  ModalList.map((val) => {
                    return (
                      <Option
                        key={val.id}
                        value={val.id}
                      >
                        {val.vehicle_model_name}
                      </Option>
                    );
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            label="座位数"
          >
            {getFieldDecorator('seat_number', {
              rules: [{ required: true, message: '请输入座位数' }],
              initialValue: (modalType !== '添加' && record.vehicle) ? record.vehicle.seat_number : '',
            })(
              <Input
                disabled={modalType === '详情'}
                placeholder="座位数"
              />
            )}
          </FormItem>
          <FormItem
            label="车辆重量"
          >
            {getFieldDecorator('vehicle_weight', {
              rules: [{ required: true, message: '请输入车辆重量' }],
              initialValue: (modalType !== '添加' && record.vehicle) ? record.vehicle.vehicle_weight : '',
            })(
              <Input
                disabled={modalType === '详情'}
                placeholder="车辆重量"
                addonAfter="吨"
              />
            )}
          </FormItem>
          <FormItem
            label="采购时间"
          >
            {getFieldDecorator('purchasing_time', {
              rules: [{ required: true, message: '请输入采购时间' }],
              initialValue: (modalType !== '添加' && record.vehicle) ?
              moment(record.vehicle.purchasing_time, showDate) : undefined,
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
              initialValue: (modalType !== '添加' && record.vehicle) ? record.vehicle.depart_id : '',
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
              initialValue: (modalType !== '添加' && record.vehicle) ? record.vehicle.vehicle_status : 1,
            })(
              <RadioGroup
                disabled={modalType === '详情'}
              >
                <Radio value={1}>{carStatus[1]}</Radio>
                <Radio value={2}>{carStatus[2]}</Radio>
                <Radio value={3}>{carStatus[3]}</Radio>
                <Radio value={4}>{carStatus[4]}</Radio>
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
                  onClick={this.cancelFormModal}
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
