import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Button, Input, Divider,
} from 'antd';
import styles from './index.less';

const { Search } = Input;

@connect(({ CarPrototype }) => ({
  List: CarPrototype.List,
  ListLoading: CarPrototype.ListLoading,
}))
export default class CarModalList extends PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'CarPrototype/getUseCarReason',
    });
  }
  render() {
    const { List, ListLoading } = this.props;
    const pagination = {
      pageSize: 8,
      total: List.length,
    };
    const columns = [{
      title: '车型名称',
      dataIndex: 'prototype_name',
      align: 'center',
    }, {
      title: '创建时间',
      dataIndex: 'created',
      align: 'center',
    }, {
      title: '可用状态',
      dataIndex: 'enable',
      align: 'center',
      render: (val) => {
        const mes = val ? '可用' : '不可用';
        return mes;
      },
    }, {
      title: '操作',
      width: 200,
      align: 'center',
      render: () => {
        return (
          <div>
            <span>详情</span>
            <Divider type="vertical" />
            <span>编辑</span>
            <Divider type="vertical" />
            <span>删除</span>
          </div>
        );
      },
    }];
    return (
      <div className={styles.carType}>
        <div className={styles.title}>
          <Search
            placeholder="用车原因"
            style={{ width: 400 }}
            enterButton
          />
          <Button
            type="primary"
          >
            添加用车原因
          </Button>
        </div>
        <Table
          dataSource={List}
          columns={columns}
          rowKey={(record => record.id)}
          loading={ListLoading}
          pagination={pagination}
        />
      </div>
    );
  }
}
