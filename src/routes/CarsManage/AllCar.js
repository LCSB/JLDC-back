import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Button, Input, Divider, Popconfirm, Form,
} from 'antd';
import CarModal from './Carconfig';
import CarTypeModal from './CarTypeConfig';
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
@Form.create()
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
    this.props.form.resetFields();
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
    this.props.form.resetFields();
    this.setState({
      carTypeVisible: false,
    });
  }

  render() {
    const {
      carList, carLoad, orgById, orgFilter, orgList,
      typeList, ModalList,
    } = this.props;
    const pagination = {
      pageSize: 6,
      total: carList.length,
    };
    const columns = [{
      title: '车牌号',
      dataIndex: 'vehicle.vehicle_number',
      width: 200,
      align: 'center',
    }, {
      title: '车型',
      dataIndex: 'vehicle_model_name',
      width: 150,
      align: 'center',
    }, {
      title: '车型用途',
      dataIndex: 'vehicle_type_name',
      width: 150,
      align: 'center',
    }, {
      title: '座位数',
      dataIndex: 'vehicle.seat_number',
      width: 100,
      align: 'center',
    }, {
      title: '采购时间',
      dataIndex: 'vehicle.purchasing_time',
      width: 250,
      align: 'center',
    }, {
      title: '部门',
      dataIndex: 'vehicle.depart_id',
      width: 150,
      align: 'center',
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
      align: 'center',
      render: val => carStatus[val],
    }, {
      title: '操作',
      width: 250,
      align: 'center',
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
          form={this.props.form}
        />
        <CarTypeModal
          carTypeVisible={this.state.carTypeVisible}
          cancelTypeModal={this.cancelTypeModal}
          form={this.props.form}
          dispatch={this.props.dispatch}
        />
      </div>
    );
  }
}
