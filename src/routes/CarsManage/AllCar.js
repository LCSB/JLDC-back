import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Button, Input, Divider, Popconfirm,
} from 'antd';
import CarModal from './Carconfig';
// import CarTypeModal from './CarTypeConfig';
import styles from './index.less';

const { Search } = Input;
const carStatus = {
  1: '空闲',
  2: '占用',
  3: '维修',
  4: '停用',
};

@connect(({ car }) => ({
  carList: car.carList,
  carLoad: car.carListLoading,
  typeList: car.typeList,
  ModalList: car.ModalList,
}))

export default class AllPerson extends PureComponent {
  state = {
    carVisible: false,
    modalType: '',
    record: {},
    // carTypeVisible: false,
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'car/getAllCarList',
    });
    this.props.dispatch({
      type: 'car/getVehicleTypeAll',
    });
    this.props.dispatch({
      type: 'car/getAllCarModalList',
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
      payload: record.vehicle.id,
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

  render() {
    const {
      carList, carLoad, orgById, orgFilter, orgList,
      typeList, ModalList,
    } = this.props;
    const pagination = {
      pageSize: 8,
      total: carList.length,
    };
    const columns = [{
      title: '车牌号',
      dataIndex: 'vehicle.vehicle_number',
      width: 200,
      align: 'left',
    }, {
      title: '车型',
      dataIndex: 'vehicle_model_name',
      width: 150,
      align: 'left',
    }, {
      title: '车型用途',
      dataIndex: 'vehicle_type_name',
      width: 150,
      align: 'left',
    }, {
      title: '座位数',
      dataIndex: 'vehicle.seat_number',
      width: 100,
      align: 'left',
    }, {
      title: '采购时间',
      dataIndex: 'vehicle.purchasing_time',
      width: 250,
      align: 'left',
    }, {
      title: '部门',
      dataIndex: 'vehicle.depart_id',
      width: 150,
      align: 'left',
      filters: orgFilter,
      onFilter: (value, record) => parseInt(record.depart_id, 10) === parseInt(value, 10),
      render: (value) => {
        return (
          <span>{orgById[value]}</span>
        );
      },
    }, {
      title: '车辆状态',
      dataIndex: 'vehicle.vehicle_status',
      width: 150,
      align: 'left',
      render: val => carStatus[val],
    }, {
      title: '操作',
      width: 250,
      align: 'left',
      render: (record) => {
        return (
          <div className="tableBtns">
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
              title={`你确认要删除车辆${record.vehicle.vehicle_number}么?`}
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
          <Search
            placeholder="请输入车牌号"
            size="default"
            style={{ width: 400 }}
            enterButton
          />
          <Button
            type="primary"
            onClick={this.addCar}
          >
            新增车辆
          </Button>
        </div>
        <div className={styles.carNum}>
          共{carList.length}辆车
        </div>
        <Table
          dataSource={carList}
          columns={columns}
          rowKey={(record => record.vehicle.id)}
          loading={carLoad}
          pagination={pagination}
        />
        <CarModal
          carVisible={this.state.carVisible}
          modalType={this.state.modalType}
          record={this.state.record}
          dispatch={this.props.dispatch}
          cancelModal={this.cancelModal}
          orgList={orgList}
          typeList={typeList}
          ModalList={ModalList}
          // form={this.props.form}
        />
      </div>
    );
  }
}
