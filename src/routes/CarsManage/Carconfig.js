import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {
  Button, Input, Modal, Form, Radio, Select, DatePicker,
  Table,
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

const orderStatus = {
  1: '预约成功',
  2: '执行中',
  3: '订单完成',
  4: '取消订单',
};

// const { TextArea } = Input;
@connect(({ car }) => ({
  carOrderList: car.carOrderList,
  carOrderLoad: car.carOrderLoad,
}))
@Form.create()
export default class Modalconfig extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { vehicle } = nextProps.record;
    if ((vehicle !== undefined) && (vehicle.id !== undefined)) {
      if (this.props.record.vehicle === undefined || vehicle.id !== this.props.record.vehicle.id) {
        const { id } = nextProps.record.vehicle;
        const startTime = moment(new Date()).subtract(1, 'months').format(showDate);
        const endTime = moment(new Date()).format(showDate);
        this.props.dispatch({
          type: 'car/getCarOrderList',
          payload: {
            vehicle_id: id,
            start_time: `${startTime} 00:00:00`,
            end_time: `${endTime} 00:00:00`,
          },
        });
      }
    }
  }

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
      typeList, ModalList, carOrderList,
      carOrderLoad,
    } = this.props;

    const pagination = {
      pageSize: 6,
      total: carOrderList.length,
    };
    const columns = [
      {
        title: '申请人',
        dataIndex: 'originator_name',
        width: 150,
        align: 'left',
      },
      {
        title: '出车时间',
        dataIndex: 'vehicle_order.start_time',
        width: 250,
        align: 'left',
      },
      {
        title: '出发地',
        dataIndex: 'vehicle_order.start_place',
        width: 200,
        align: 'left',
      },
      {
        title: '目的地',
        dataIndex: 'vehicle_order.end_place',
        width: 200,
        align: 'left',
      },
      {
        title: '回车时间',
        dataIndex: 'vehicle_order.end_time',
        width: 250,
        align: 'left',
      },
      {
        title: '订单状态',
        dataIndex: 'vehicle_order.order_status',
        width: 120,
        align: 'left',
        render: val => orderStatus[val],
      },
    ];
    return (
      <Modal
        visible={carVisible}
        width={1400}
        footer={null}
        title={modalType}
        maskClosable={false}
        onCancel={this.cancelFormModal}
        style={{ top: 25 }}
      >
        <div className={modalType !== '详情' ? '' : 'carAddModal'}>
          <div className={modalType !== '详情' ? '' : 'carBasic'}>
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
          </div>
          {
            modalType === '详情' &&
            (
              <div className="carOrderList">
                <Table
                  columns={columns}
                  dataSource={carOrderList}
                  rowKey={(recordKey) => {
                      return recordKey.vehicle_order.id;
                    }
                  }
                  loading={carOrderLoad}
                  pagination={pagination}
                />
              </div>
            )
          }
        </div>
      </Modal>
    );
  }
}
