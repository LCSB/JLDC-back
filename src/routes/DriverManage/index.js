import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Input,
} from 'antd';
// import PrototypeConfig from './config';
import styles from './index.less';

const { Search } = Input;

@connect(({ driver }) => ({
  driverList: driver.driverList,
  driverLoad: driver.driverLoad,
}))
export default class CarModalList extends PureComponent {
  // state = {
  //   modalVisible: false,
  //   prototypeType: '',
  //   record: {},
  // }
  componentWillMount() {
    this.props.dispatch({
      type: 'driver/getDriverList',
    });
  }

  // addPrototype = () => {
  //   this.setState({
  //     modalVisible: true,
  //     prototypeType: '添加',
  //     record: {},
  //   });
  // }

  // canclePrototype = () => {
  //   this.setState({
  //     modalVisible: false,
  //     prototypeType: '',
  //     record: {},
  //   });
  // }

  // revsiePrototype = (record) => {
  //   this.setState({
  //     modalVisible: true,
  //     prototypeType: '修改',
  //     record,
  //   });
  // }

  // deletePrototype = (id) => {
  //   this.props.dispatch({
  //     type: 'CarPrototype/deleteCarPrototype',
  //     payload: id,
  //     callbakc: () => {
  //       this.props.dispatch({
  //         type: 'CarPrototype/getUseCarReason',
  //       });
  //     },
  //   });
  // }

  render() {
    const { driverList, driverLoad } = this.props;
    // const { prototypeType, record } = this.state;
    const pagination = {
      pageSize: 10,
      total: driverList.length,
    };
    const columns = [{
      title: '姓名',
      dataIndex: 'sys_user.name',
      align: 'center',
    }, {
      title: '警号',
      dataIndex: 'sys_user.police_number',
      align: 'center',
    }, {
      title: '可用状态',
      dataIndex: 'sys_user.enable',
      align: 'center',
      render: (val) => {
        const mes = val ? '可用' : '不可用';
        return mes;
      },
    }, {
      title: '所属单位',
      dataIndex: 'vehicle_depart_name',
      align: 'center',
    }];
    return (
      <div className={styles.carType}>
        <h2>司机</h2>
        <div className={styles.title}>
          <Search
            placeholder="司机姓名"
            style={{ width: 400 }}
            enterButton
          />
          {/* <Button
            type="primary"
            icon="plus"
            onClick={this.addPrototype}
          >
            添加司机
          </Button> */}
        </div>
        <Table
          dataSource={driverList}
          columns={columns}
          rowKey={(recordMes => recordMes.sys_user.id)}
          loading={driverLoad}
          pagination={pagination}
        />
        {/* <PrototypeConfig
          prototypeVisible={this.state.modalVisible}
          dispatch={this.props.dispatch}
          cancelPrototype={this.canclePrototype}
          prototypeType={prototypeType}
          record={record}
        /> */}
      </div>
    );
  }
}
