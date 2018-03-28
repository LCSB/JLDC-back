import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Select, DatePicker, Button, Spin,
} from 'antd';
import moment from 'moment';
import { getUrlParams } from '../../utils/utils';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const showDate = 'YYYY-MM-DD';
const getCarDate = 'YYYY-MM-DD HH:mm:ss';
const statusOrder = {
  1: '新建',
  2: '查看',
  3: '编辑',
};

const statusCar = {
  1: '等待调度',
  2: '开始用车',
  3: '行程取消',
  4: '行程结束',
};

@connect(({ orderDetail, car, person }) => ({
  carList: car.carList,
  userList: person.userList,
  detailList: orderDetail.detailList,
  detailLoading: orderDetail.detailLoading,
  reasonList: orderDetail.reasonList,
  AvailableVehicles: orderDetail.AvailableVehicles,
}))
@Form.create()
export default class DetailOrder extends PureComponent {
  state = {
    status: 0,
  }
  componentWillMount() {
    const { search } = this.props.location;
    const { id, status } = getUrlParams(search);
    this.setState({
      status: parseInt(status, 10),
    });
    this.props.dispatch({
      type: 'car/getAllCarList',
    });
    this.props.dispatch({
      type: 'orderDetail/getUseCarReason',
    });
    this.props.dispatch({
      type: 'person/getAllList',
    });
    if (id) {
      this.props.dispatch({
        type: 'orderDetail/getOrderList',
        payload: id,
      });
    }
  }

  showUseCar = (paramsItem, data) => {
    const { getFieldValue } = this.props.form;
    const params = {
      user_id: getFieldValue('originator'),
      start_time: getFieldValue('start_time'),
      end_time: getFieldValue('end_time'),
    };
    params[paramsItem] = data;
    if (!!params.user_id && !!params.start_time && !!params.end_time) {
      params.start_time = params.start_time.format(getCarDate);
      params.end_time = params.end_time.format(getCarDate);
      this.props.dispatch({
        type: 'orderDetail/getAvailableVehicles',
        payload: params,
      });
    }
  }

  submitOrder = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { status } = this.state;
        if (status === 1) {
          this.props.dispatch({
            type: 'orderDetail/createOrder',
            payload: fieldsValue,
          });
        }
        if (status === 3) {
          const { detailList } = this.props;
          const params = {};
          params.id = detailList.vehicle_order.id;
          params.originator = fieldsValue.originator;
          params.end_time = fieldsValue.end_time;
          params.vehicle_id = fieldsValue.vehicle_id;
          params.start_place = fieldsValue.start_place;
          params.end_place = fieldsValue.end_place;
          params.prototype_id = fieldsValue.prototype_id;
          params.order_status = fieldsValue.order_status;
          this.props.dispatch({
            type: 'orderDetail/reviseOrder',
            payload: params,
          });
        }
      }
    });
  }

  changeOrderStatus = (status) => {
    const { detailList } = this.props;
    const params = {};
    params.id = detailList.vehicle_order.id;
    params.order_status = status;
    this.props.dispatch({
      type: 'orderDetail/reviseOrder',
      payload: params,
    });
  }

  render() {
    const { status } = this.state;
    const {
      detailList, form, reasonList, userList, AvailableVehicles,
      detailLoading,
    } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    // moment(detailList.vehicle_order.end_time, showDate)
    const realityTime = [];
    if (detailList.vehicle_order) {
      realityTime.push(moment(detailList.vehicle_order.start_time, showDate));
      realityTime.push(moment(detailList.vehicle_order.fact_back_time, showDate));
    }
    // console.log(AvailableVehicles);
    let showCarList = [];
    if (AvailableVehicles && AvailableVehicles['current-user-vehicle']) {
      const AvailableMes = AvailableVehicles['current-user-vehicle'];
      if (AvailableMes.vehicle_exts instanceof Array) {
        showCarList = AvailableMes.vehicle_exts;
      }
    }
    return (
      <div className={styles.detailOrder}>
        <div className={styles.orderMes}>
          <Spin spinning={detailLoading}>
            <h2>{statusOrder[status]}派车单</h2>
            <Form
              onSubmit={this.submitOrder}
            >
              {
                status !== 1 &&
                (
                  <FormItem
                    label="车单号"
                  >
                    {getFieldDecorator('serial_no', {
                      initialValue: detailList.vehicle_order ? detailList.vehicle_order.serial_no : '',
                    })(
                      <Input
                        disabled
                        placeholder="车单号"
                      />
                    )}
                  </FormItem>
                )
              }
              <div className={styles.formH}>
                <FormItem
                  label="用车人"
                >
                  {getFieldDecorator('originator', {
                    rules: [{ required: true, message: '请输入用车人' }],
                    initialValue: detailList.vehicle_order ? detailList.vehicle_order.originator : '',
                  })(
                    <Select
                      disabled={status === 2}
                      placeholder="用车人"
                      onChange={this.showUseCar.bind(this, 'user_id')}
                    >
                      {
                        userList.map((val) => {
                          return (
                            <Option
                              value={val.id}
                              key={val.id}
                            >
                              {val.name}
                            </Option>
                          );
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </div>
              <div className={styles.formH}>
                <FormItem
                  label="预计出车时间"
                >
                  {getFieldDecorator('start_time', {
                    rules: [{ required: true, message: '请输入预计出车时间' }],
                    initialValue: detailList.vehicle_order ?
                    moment(detailList.vehicle_order.start_time, getCarDate) : undefined,
                  })(
                    <DatePicker
                      showTime
                      format={getCarDate}
                      disabled={status === 2}
                      onChange={this.showUseCar.bind(this, 'start_time')}
                    />
                  )}
                </FormItem>
                <FormItem
                  label="预计结束时间"
                >
                  {getFieldDecorator('end_time', {
                    rules: [{ required: true, message: '请输入预计结束时间' }],
                    initialValue: detailList.vehicle_order ?
                    moment(detailList.vehicle_order.end_time, getCarDate) : undefined,
                  })(
                    <DatePicker
                      showTime
                      format={getCarDate}
                      disabled={status === 2}
                      onChange={this.showUseCar.bind(this, 'end_time')}
                    />
                  )}
                </FormItem>
              </div>
              {
                getFieldValue('originator') !== '' &&
                getFieldValue('start_time') !== undefined &&
                getFieldValue('end_time') !== undefined &&
                (
                  <FormItem
                    label="车牌号"
                  >
                    {getFieldDecorator('vehicle_id', {
                      rules: [{ required: true, message: '请选择车牌号' }],
                      initialValue: detailList.vehicle_order ? detailList.vehicle_order.vehicle_id : '',
                    })(
                      <Select
                        disabled={status === 2}
                      >
                        {
                          showCarList.map((val) => {
                            return (
                              <Option
                                value={val.vehicle.id}
                                key={val.vehicle.id}
                              >
                                {val.vehicle.vehicle_number}
                              </Option>
                            );
                          })
                        }
                      </Select>
                    )}
                  </FormItem>
                )
              }
              {
                status !== 1 &&
                (
                  <FormItem
                    label="实际出车时间"
                  >
                    {getFieldDecorator('realityTime', {
                      initialValue: detailList.vehicle_order ? realityTime : '',
                    })(
                      <RangePicker
                        disabled
                      />
                    )}
                  </FormItem>
                )
              }
              <div className={styles.formH}>
                <FormItem
                  label="出发地"
                >
                  {getFieldDecorator('start_place', {
                    rules: [{ required: true, message: '请输入出发地' }],
                    initialValue: detailList.vehicle_order ? detailList.vehicle_order.start_place : '',
                  })(
                    <Input
                      disabled={status === 2}
                      placeholder="出发地"
                    />
                  )}
                </FormItem>
                <FormItem
                  label="目的地"
                >
                  {getFieldDecorator('end_place', {
                    rules: [{ required: true, message: '请输入目的地' }],
                    initialValue: detailList.vehicle_order ? detailList.vehicle_order.end_place : '',
                  })(
                    <Input
                      disabled={status === 2}
                      placeholder="目的地"
                    />
                  )}
                </FormItem>
              </div>
              <div className={styles.formH}>
                {/* <FormItem
                  label="司机"
                >
                  {getFieldDecorator('driver ', {
                    // rules: [{ required: true, message: '请输入司机' }],
                    // initialValue: moadlType === '添加' ? '' : record.phone,
                  })(
                    <Input
                      // disabled={moadlType !== '添加'}
                      placeholder="司机"
                    />
                  )}
                </FormItem> */}
                {/* <FormItem
                  label="目的地"
                >
                  {getFieldDecorator('Phone', {
                    rules: [{ required: true, message: '请输入目的地' }],
                    // initialValue: moadlType === '添加' ? '' : record.phone,
                  })(
                    <Input
                      // disabled={moadlType !== '添加'}
                      placeholder="目的地"
                    />
                  )}
                </FormItem> */}
              </div>
              <FormItem
                label="用车原因"
              >
                {
                  getFieldDecorator('prototype_id', {
                    rules: [{ required: true, message: '请输入用车原因' }],
                    initialValue: detailList.vehicle_order ? detailList.vehicle_order.prototype_id : '',
                  })(
                    <Select
                      disabled={status === 2}
                    >
                      {
                        reasonList.map((val) => {
                          return (
                            <Option value={val.id} key={val.id}>
                              {val.prototype_name}
                            </Option>
                          );
                        })
                      }
                    </Select>
                  )
                }
              </FormItem>
              {
                status !== 1 &&
                (
                  <FormItem
                    label="订单状态"
                  >
                    {getFieldDecorator('order_status', {
                      initialValue: detailList.vehicle_order ? detailList.vehicle_order.order_status : '',
                    })(
                      <Select
                        disabled={status === 2}
                      >
                        <Option value={1} key={1}>
                          {statusCar[1]}
                        </Option>
                        <Option value={2} key={2}>
                          {statusCar[2]}
                        </Option>
                        <Option value={3} key={3}>
                          {statusCar[3]}
                        </Option>
                        <Option value={4} key={4}>
                          {statusCar[4]}
                        </Option>
                      </Select>
                    )}
                  </FormItem>
                )
              }
              {
                status !== 2 &&
                (
                  <div className={styles.btns}>
                    {
                      status === 1 &&
                      <Button type="primary" htmlType="submit">拿钥匙</Button>
                    }
                    {
                      status !== 1 &&
                      (
                        <div className={styles.Setbtns}>
                          <Button
                            type="primary"
                            onClick={this.changeOrderStatus.bind(this, 3)}
                          >
                            取消订单
                          </Button>
                          <Button type="primary" htmlType="submit">修改订单</Button>
                          <Button
                            type="primary"
                            onClick={this.changeOrderStatus.bind(this, 4)}
                          >
                            还钥匙
                          </Button>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </Form>
          </Spin>
        </div>
        {/* <div className={styles.mapMes}>
        </div> */}
      </div>
    );
  }
}
