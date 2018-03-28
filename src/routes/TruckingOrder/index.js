import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Table, Divider, Popconfirm,
} from 'antd';

// const orderStatus = {
//   1: '等待调度',
//   2: '预约成功',
//   3: '行程取消',
//   4: '用车中',
//   5: '行程结束',
// };

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
  render() {
    const { orderList, ListLoading } = this.props;
    const pagination = {
      pageSize: 6,
      total: orderList.length,
    };
    const columns = [
      {
        title: '车牌号',
        dataIndex: 'vehicle_number',
        width: 200,
      },
      {
        title: '下单人',
        dataIndex: 'originator_name',
        width: 150,
      },
      {
        title: '出车时间',
        dataIndex: 'vehicle_order.start_time',
        width: 250,
      },
      {
        title: '出发地',
        dataIndex: 'vehicle_order.start_place',
        width: 200,
      },
      {
        title: '目的地',
        dataIndex: 'vehicle_order.end_place',
        width: 200,
      },
      {
        title: '回车时间',
        dataIndex: 'vehicle_order.end_time',
        width: 250,
      },
      {
        title: '订单状态',
        dataIndex: 'vehicle_order.order_status',
        width: 200,
      },
      {
        title: '操作',
        width: 200,
        render: (record) => {
          return (
            <div>
              <span>
                查看
              </span>
              <Divider type="vertical" />
              <Popconfirm
                title={`你确认要取消${record.originator_name}的订单么?`}
              >
                取消
              </Popconfirm>
              <Divider type="vertical" />
              <span>
                编辑
              </span>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <h2>派出单管理</h2>
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
