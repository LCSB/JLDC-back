import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Button, Input, Divider, Popconfirm,
} from 'antd';
import PrototypeConfig from './config';
import styles from './index.less';

const { Search } = Input;

@connect(({ CarPrototype }) => ({
  List: CarPrototype.List,
  ListLoading: CarPrototype.ListLoading,
}))
export default class CarModalList extends PureComponent {
  state = {
    modalVisible: false,
    prototypeType: '',
    record: {},
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'CarPrototype/getUseCarReason',
    });
  }

  addPrototype = () => {
    this.setState({
      modalVisible: true,
      prototypeType: '添加',
      record: {},
    });
  }

  canclePrototype = () => {
    this.setState({
      modalVisible: false,
      prototypeType: '',
      record: {},
    });
  }

  revsiePrototype = (record) => {
    this.setState({
      modalVisible: true,
      prototypeType: '修改',
      record,
    });
  }

  deletePrototype = (id) => {
    this.props.dispatch({
      type: 'CarPrototype/deleteCarPrototype',
      payload: id,
      callbakc: () => {
        this.props.dispatch({
          type: 'CarPrototype/getUseCarReason',
        });
      },
    });
  }

  render() {
    const { List, ListLoading } = this.props;
    const { prototypeType, record } = this.state;
    const pagination = {
      pageSize: 8,
      total: List.length,
    };
    const columns = [{
      title: '用车原因',
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
      render: (recordMes) => {
        return (
          <div>
            <span
              onClick={this.revsiePrototype.bind(this, recordMes)}
            >
              修改
            </span>
            <Divider type="vertical" />
            <Popconfirm
              title={`你确认要删除用车原因${recordMes.prototype_name}么?`}
              onConfirm={this.deletePrototype.bind(this, recordMes.id)}
            >
              删除
            </Popconfirm>
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
            icon="plus"
            onClick={this.addPrototype}
          >
            添加用车原因
          </Button>
        </div>
        <Table
          dataSource={List}
          columns={columns}
          rowKey={(recordMes => recordMes.id)}
          loading={ListLoading}
          pagination={pagination}
        />
        <PrototypeConfig
          prototypeVisible={this.state.modalVisible}
          dispatch={this.props.dispatch}
          cancelPrototype={this.canclePrototype}
          prototypeType={prototypeType}
          record={record}
        />
      </div>
    );
  }
}
