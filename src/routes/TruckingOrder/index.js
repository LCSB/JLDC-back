import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Table, Divider, Popconfirm, Button,
} from 'antd';
// import moment from 'moment';
import styles from './index.less';

const orderStatus = {
  1: '预约成功',
  2: '执行中',
  3: '订单完成',
  4: '取消订单',
};
// const showFormat = 'YYYY-MM-DD HH:mm:ss';

@connect(({ order }) => ({
  orderList: order.orderList,
  ListLoading: order.ListLoading,
}))
@Form.create()
export default class TruckingOrder extends PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'order/getOrderList',
    });
  }

  showOrder = (id, status) => {
    // const name = Date.parse(new Date());
    // window.open(`/orderDetail?id=${id}&status=${status}`, name);
    this.props.history.replace(`/carMes/orderDetail?id=${id}&status=${status}`);
  }

  addOrder = () => {
    // const name = Date.parse(new Date());
    // window.open('/orderDetail?status=1', name);
    this.props.history.replace('/carMes/orderDetail?status=1');
  }

  changeOrderStatus = (id, status) => {
    const params = {};
    params.id = id;
    params.order_status = status;
    this.props.dispatch({
      type: 'order/reviseOrder',
      payload: params,
      callback: () => {
        this.props.dispatch({
          type: 'order/getOrderList',
        });
      },
    });
  }

  render() {
    const { orderList, ListLoading } = this.props;
    const pagination = {
      pageSize: 10,
      total: orderList.length,
    };
    const columns = [
      {
        title: '车牌号',
        dataIndex: 'vehicle_number',
        width: 150,
        align: 'center',
      },
      {
        title: '申请人',
        dataIndex: 'originator_name',
        width: 150,
        align: 'center',
      },
      {
        title: '出车时间',
        dataIndex: 'vehicle_order.start_time',
        width: 250,
        align: 'center',
        render: (val) => {
          const valMes = val.replace(/[T|Z]/g, ' ');
          return valMes;
        },
      },
      {
        title: '出发地',
        dataIndex: 'vehicle_order.start_place',
        width: 200,
        align: 'center',
      },
      {
        title: '目的地',
        dataIndex: 'vehicle_order.end_place',
        width: 200,
        align: 'center',
      },
      {
        title: '回车时间',
        dataIndex: 'vehicle_order.end_time',
        width: 250,
        align: 'center',
        render: (val) => {
          const valMes = val.replace(/[T|Z]/g, ' ');
          return valMes;
        },
      },
      {
        title: '订单状态',
        dataIndex: 'vehicle_order.order_status',
        width: 120,
        align: 'center',
        render: val => orderStatus[val],
      },
      {
        title: '操作',
        width: 200,
        align: 'center',
        render: (record) => {
          return (
            <div className="tableBtns">
              <span
                onClick={this.showOrder.bind(this, record.vehicle_order.id, 2)}
              >
                查看
              </span>
              {
                record.vehicle_order.order_status === 1 &&
                (
                  <div style={{ display: 'flex' }}>
                    <Divider type="vertical" />
                    <span
                      onClick={this.showOrder.bind(this, record.vehicle_order.id, 3)}
                    >
                      编辑
                    </span>
                    <Divider type="vertical" />
                    <Popconfirm
                      title={`你确认要取消${record.originator_name}的订单么?`}
                      onConfirm={this.changeOrderStatus.bind(this, record.vehicle_order.id, 4)}
                    >
                      取消
                    </Popconfirm>
                  </div>
                )
              }
              {
                record.vehicle_order.order_status === 2 &&
                (
                <div>
                  <Divider type="vertical" />
                  <Popconfirm
                    title={`你确认${record.originator_name}订单已完成么?`}
                    onConfirm={this.changeOrderStatus.bind(this, record.vehicle_order.id, 3)}

                  >
                    完成
                  </Popconfirm>
                </div>
                )
              }
            </div>
          );
        },
      },
    ];
    return (
      <div className={styles.TruckingOrder}>
        <div className={styles.orderTitle}>
          <h2>派车单管理</h2>
          <Button
            type="primary"
            onClick={this.addOrder}
            icon="plus"
            // style={{margin: 10 }}
          >
            新建派车单
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={orderList}
          rowKey={(record => record.vehicle_order.id)}
          loading={ListLoading}
          pagination={pagination}
        />
      </div>
    );
  }
}
