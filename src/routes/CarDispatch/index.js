import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Input, Icon,
} from 'antd';
import moment from 'moment';
import styles from './index.less';

// const { Search } = Input;
const requestFormat = 'YYYY-MM-DD';

@connect(({ carDispatch }) => ({
  StatusList: carDispatch.StatusList,
  StatusLoad: carDispatch.StatusLoad,
}))
export default class CarStatusList extends PureComponent {
  state = {
    filterDropdownVisible: false,
    data: [],
    filtered: '',
  }
  componentWillMount() {
    const TodayDate = moment(new Date());
    const startDate = `${TodayDate.format(requestFormat)} 00:00:00`;
    const endDate = `${TodayDate.add(6, 'days').format(requestFormat)} 00:00:00`;
    // const startDate = '2018-03-28 00:00:00';
    // const endDate = '2018-04-03 00:00:00';
    this.props.dispatch({
      type: 'carDispatch/getCarStatusList',
      payload: {
        start_time: startDate,
        end_time: endDate,
      },
    });
  }

  onInputChange = (e) => {
    const searchText = e.target.value;
    const filterData = [];
    this.setState({
      data: filterData,
      filtered: searchText,
    });
  }

  addOrder = () => {
    this.props.history.push('/carMes/orderDetail?status=1');
  }

  render() {
    const { StatusList, ListLoading } = this.props;
    const { data } = this.state;
    let StatusListData = [];
    // console.log(StatusList);
    if (data && data.length > 0) {
      StatusListData = data;
    } else {
      StatusListData = StatusList;
    }
    const pagination = {
      pageSize: 8,
      total: StatusList.length,
    };

    const TodayDate = moment(new Date());

    const columns = [{
      title: '车牌号',
      dataIndex: 'vehicle_number',
      align: 'center',
      width: 150,
      filterDropdown: (
        <div className="custom-filter-dropdown-status">
          <Input
            ref={(ele) => { this.searchInput = ele; }}
            placeholder="搜索车牌号"
            onChange={this.onInputChange}
          />
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
    },
    {
      title: TodayDate.add(1, 'days').format(requestFormat),
      align: 'center',
      key: '1',
      width: 200,
      render: (record) => {
        const vehicleCollectDatas = record.vehicle_collect_datas;
        const vehicleCollects = vehicleCollectDatas[0].vehicle_collects;
        if (vehicleCollects.length > 0) {
          const val = vehicleCollects[0];
          return (
            <div>
              <div>{val.used_status}</div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
              style={{
                cursor: 'pointer',
                width: '100%',
                height: '30px',
              }}
            />
          );
        }
      },
    },
    {
      title: TodayDate.add(1, 'days').format(requestFormat),
      align: 'center',
      key: '2',
      width: 200,
      render: (record) => {
        const vehicleCollectDatas = record.vehicle_collect_datas;
        const vehicleCollects = vehicleCollectDatas[1].vehicle_collects;
        if (vehicleCollects.length > 0) {
          const val = vehicleCollects[0];
          return (
            <div>
              <div>{val.used_status}</div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
              style={{
                cursor: 'pointer',
                width: '100%',
                height: '30px',
              }}
            />
          );
        }
      },
    },
    {
      title: TodayDate.add(1, 'days').format(requestFormat),
      align: 'center',
      key: '3',
      width: 200,
      render: (record) => {
        const vehicleCollectDatas = record.vehicle_collect_datas;
        const vehicleCollects = vehicleCollectDatas[2].vehicle_collects;
        if (vehicleCollects.length > 0) {
          const val = vehicleCollects[0];
          return (
            <div>
              <div>{val.used_status}</div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
              style={{
                cursor: 'pointer',
                width: '100%',
                height: '30px',
              }}
            />
          );
        }
      },
    },
    {
      title: TodayDate.add(1, 'days').format(requestFormat),
      align: 'center',
      key: '4',
      width: 200,
      render: (record) => {
        const vehicleCollectDatas = record.vehicle_collect_datas;
        const vehicleCollects = vehicleCollectDatas[3].vehicle_collects;
        if (vehicleCollects.length > 0) {
          const val = vehicleCollects[0];
          return (
            <div>
              <div>{val.used_status}</div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
              style={{
                cursor: 'pointer',
                width: '100%',
                height: '30px',
              }}
            />
          );
        }
      },
    },
    {
      title: TodayDate.add(1, 'days').format(requestFormat),
      align: 'center',
      key: '5',
      width: 200,
      render: (record) => {
        const vehicleCollectDatas = record.vehicle_collect_datas;
        const vehicleCollects = vehicleCollectDatas[4].vehicle_collects;
        if (vehicleCollects.length > 0) {
          const val = vehicleCollects[0];
          return (
            <div>
              <div>{val.used_status}</div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
              style={{
                cursor: 'pointer',
                width: '100%',
                height: '30px',
              }}
            />
          );
        }
      },
    },
    {
      title: TodayDate.add(1, 'days').format(requestFormat),
      align: 'center',
      key: '6',
      width: 200,
      render: (record) => {
        const vehicleCollectDatas = record.vehicle_collect_datas;
        const vehicleCollects = vehicleCollectDatas[5].vehicle_collects;
        if (vehicleCollects.length > 0) {
          const val = vehicleCollects[0];
          return (
            <div>
              <div>{val.used_status}</div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
              style={{
                cursor: 'pointer',
                width: '100%',
                height: '30px',
              }}
            />
          );
        }
      },
    },
    {
      title: TodayDate.add(1, 'days').format(requestFormat),
      align: 'center',
      key: '7',
      width: 200,
      render: (record) => {
        const vehicleCollectDatas = record.vehicle_collect_datas;
        const vehicleCollects = vehicleCollectDatas[6].vehicle_collects;
        if (vehicleCollects.length > 0) {
          const val = vehicleCollects[0];
          return (
            <div>
              <div>{val.used_status}</div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
              style={{
                cursor: 'pointer',
                width: '100%',
                height: '30px',
              }}
            />
          );
        }
      },
    }];
    return (
      <div className={styles.carType}>
        <h2>车辆调度调控</h2>
        <Table
          dataSource={StatusListData}
          columns={columns}
          rowKey={(record => record.vehicle_id)}
          loading={ListLoading}
          pagination={pagination}
        />
      </div>
    );
  }
}
