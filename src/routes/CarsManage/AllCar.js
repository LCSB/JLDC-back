import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Button, Input, Divider, Popconfirm,
} from 'antd';
import CarModal from './Carconfig';
import CarTypeModal from './CarTypeConfig';
import styles from './index.less';

const { Search } = Input;

@connect(({ car }) => ({
  carList: car.carList,
  carLoad: car.carListLoading,
}))
export default class AllPerson extends PureComponent {
  state = {
    carVisible: false,
    modalType: '',
    record: {},
    carTypeVisible: false,
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'car/getAllCarList',
    });
  }

  addCar = () => {
    this.setState({
      carVisible: true,
      modalType: '添加',
    });
  }

  revsieUser = (record) => {
    this.setState({
      carVisible: true,
      modalType: '修改',
      record,
    });
  }

  detailUser = (record) => {
    this.setState({
      carVisible: true,
      modalType: '详情',
      record,
    });
  }

  deleteCar = (record) => {
    this.props.dispatch({
      type: 'car/deleteCar',
      payload: record.id,
      callback: () => {
        this.props.dispatch({
          type: 'car/getAllCarList',
        });
      },
    });
  }

  cancelModal = () => {
    this.setState({
      carVisible: false,
      record: {},
    });
  }

  addCarType = () => {
    this.setState({
      carTypeVisible: true,
    });
  }

  cancelTypeModal = () => {
    this.setState({
      carTypeVisible: false,
    });
  }

  render() {
    const {
      carList, carLoad, orgById, orgFilter, orgList,
    } = this.props;
    const columns = [{
      title: '车牌号',
      dataIndex: 'vehicle_number',
      width: 200,
    }, {
      title: '车型用途',
      dataIndex: 'vehicle_type',
      width: 200,
    }, {
      title: '座位数',
      dataIndex: 'seat_number',
      width: 200,
    }, {
      title: '采购时间',
      dataIndex: 'purchasing_time',
      width: 200,
    }, {
      title: '部门',
      dataIndex: 'depart_id',
      width: 150,
      filters: orgFilter,
      onFilter: (value, record) => parseInt(record.depart_id, 10) === parseInt(value, 10),
      render: (value) => {
        return (
          <span>{orgById[value]}</span>
        );
      },
    }, {
      title: '车辆状态',
      dataIndex: 'vehicle_status',
      width: 150,
    }, {
      title: '操作',
      width: 200,
      render: (record) => {
        return (
          <div>
            <span
              onClick={this.detailUser.bind(this, record)}
            >
              查看
            </span>
            <Divider type="vertical" />
            <span
              onClick={this.revsieUser.bind(this, record)}
            >
              编辑
            </span>
            <Divider type="vertical" />
            <Popconfirm
              title={`你确认要删除车辆${record.vehicle_number}么?`}
              onConfirm={this.deleteCar.bind(this, record)}
            >
              删除
            </Popconfirm>
          </div>
        );
      },
    }];
    return (
      <div className={styles.AllCar}>
        <div className={styles.AllHeader}>
          <div className={styles.AllCarBtns}>
            <Button
              type="primary"
              onClick={this.addCar}
            >
              新增车辆
            </Button>
            <Button
              type="primary"
              onClick={this.addCarType}
            >
              新增车型
            </Button>
          </div>
          <Search
            placeholder="请输入车牌号"
            size="default"
            style={{ width: 400 }}
            enterButton
          />
        </div>
        <div className={styles.carNum}>
          共{carList.length}辆车
        </div>
        <Table
          dataSource={carList}
          columns={columns}
          rowKey={(record => record.id)}
          loading={carLoad}
        />
        <CarModal
          carVisible={this.state.carVisible}
          modalType={this.state.modalType}
          record={this.state.record}
          dispatch={this.props.dispatch}
          cancelModal={this.cancelModal}
          orgList={orgList}
        />
        <CarTypeModal
          carTypeVisible={this.state.carTypeVisible}
          cancelTypeModal={this.cancelTypeModal}
        />
      </div>
    );
  }
}
