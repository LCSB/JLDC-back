import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Button, Input, Divider, Popconfirm,
} from 'antd';
import styles from './index.less';
import CarTypeModal from './CarTypeConfig';

const { Search } = Input;

@connect(({ carModal }) => ({
  List: carModal.List,
  ListLoading: carModal.ListLoading,
}))
export default class CarModalList extends PureComponent {
  state = {
    ModalVisible: false,
    modalType: '',
    recordMes: {},
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'carModal/getCarModalList',
    });
  }

  addModal = () => {
    this.setState({
      ModalVisible: true,
      modalType: '添加',
      recordMes: {},
    });
  }

  revisModal = (recordMes) => {
    this.setState({
      ModalVisible: true,
      modalType: '修改',
      recordMes,
    });
  }

  cancelModal = () => {
    this.setState({
      ModalVisible: false,
      modalType: '',
      recordMes: {},
    });
  }

  deleteCarModal = (id) => {
    this.props.dispatch({
      type: 'carModal/deleteCarModal',
      payload: id,
      callback: () => {
        this.props.dispatch({
          type: 'carModal/getCarModalList',
        });
      },
    });
  }

  render() {
    const { List, ListLoading } = this.props;
    const { modalType, recordMes } = this.state;
    const pagination = {
      pageSize: 10,
      total: List.length,
    };
    const columns = [{
      title: '车型名称',
      dataIndex: 'vehicle_model_name',
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
      render: (record) => {
        return (
          <div>
            <span
              onClick={this.revisModal.bind(this, record)}
            >
              修改
            </span>
            <Divider type="vertical" />
            <Popconfirm
              title={`你确认要删除车型${record.vehicle_model_name}么?`}
              onConfirm={this.deleteCarModal.bind(this, record.id)}
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
            placeholder="车型名称"
            style={{ width: 400 }}
            enterButton
          />
          <Button
            type="primary"
            icon="plus"
            onClick={this.addModal}
          >
            添加车型
          </Button>
        </div>
        <Table
          dataSource={List}
          columns={columns}
          rowKey={(record => record.id)}
          loading={ListLoading}
          pagination={pagination}
        />
        <CarTypeModal
          carTypeVisible={this.state.ModalVisible}
          modalType={modalType}
          recordMes={recordMes}
          cancelTypeModal={this.cancelModal}
          // form={this.props.form}
          dispatch={this.props.dispatch}
        />
      </div>
    );
  }
}
