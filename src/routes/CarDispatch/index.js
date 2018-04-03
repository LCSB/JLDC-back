import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Input, Icon, DatePicker,
} from 'antd';
import moment from 'moment';
import styles from './index.less';

// const { Search } = Input;
const requestFormat = 'YYYY-MM-DD';
// const { RangePicker } = DatePicker;

@connect(({ carDispatch }) => ({
  StatusList: carDispatch.StatusList,
  StatusLoad: carDispatch.StatusLoad,
}))
export default class CarStatusList extends PureComponent {
  state = {
    filterDropdownVisible: false,
    data: [],
    filtered: '',
    DateMoment: moment(new Date(), requestFormat),
  }
  componentWillMount() {
    const { DateMoment } = this.state;
    const initDate = DateMoment.format(requestFormat);
    const startDate = `${moment(initDate).format(requestFormat)} 00:00:00`;
    const endDate = `${moment(initDate).add(6, 'days').format(requestFormat)} 00:00:00`;
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
    const { StatusList } = this.props;
    StatusList.map((val) => {
      if (val.vehicle_number.indexOf(searchText) >= 0) {
        filterData.push(val);
      }
      return val;
    });
    this.setState({
      data: filterData,
      filtered: searchText,
    });
  }

  changeList = (dates) => {
    this.setState({
      DateMoment: dates,
    });
    const initDate = dates.format(requestFormat);
    const startDate = `${moment(initDate).format(requestFormat)} 00:00:00`;
    const endDate = `${moment(initDate).add(6, 'days').format(requestFormat)} 00:00:00`;
    this.props.dispatch({
      type: 'carDispatch/getCarStatusList',
      payload: {
        start_time: startDate,
        end_time: endDate,
      },
    });
  }

  showOrder = (id) => {
    this.props.history.push(`/carMes/orderDetail?id=${id}&status=2`);
  }

  addOrder = () => {
    this.props.history.push('/carMes/orderDetail?status=1');
  }

  render() {
    const { StatusList, StatusLoad } = this.props;
    const { data, DateMoment } = this.state;

    const initDate = DateMoment.format(requestFormat);

    const TodayDate = moment(initDate, requestFormat);
    const WeekDate = moment(initDate, requestFormat).add(6, 'days');
    let StatusListData = [];

    if (data && data.length > 0) {
      StatusListData = data;
    } else {
      StatusListData = StatusList;
    }
    const pagination = {
      pageSize: 8,
      total: StatusList.length,
    };

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
      title: TodayDate.format(requestFormat),
      align: 'center',
      key: '1',
      width: 200,
      render: (record) => {
        const vehicleCollectDatas = record.vehicle_collect_datas;
        const vehicleCollects = vehicleCollectDatas[0].vehicle_collects;
        if (vehicleCollects.length > 0) {
          // const val = vehicleCollects[0];
          return (
            <div>
              {
                vehicleCollects.map((val) => {
                  return (
                    <div
                      onClick={this.showOrder.bind(this, val.order_id)}
                      className="orderShow"
                      key={val.order_id}
                    >
                      {val.used_status}
                    </div>
                  );
                })
              }
              <div
                onClick={this.addOrder}
              >
                <Icon
                  type="plus"
                  style={{
                    fontSize: 32,
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
            >
              <Icon
                type="plus"
                style={{
                  fontSize: 32,
                  cursor: 'pointer',
                }}
              />
            </div>
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
          // const val = vehicleCollects[0];
          return (
            <div>
              {
                vehicleCollects.map((val) => {
                  return (
                    <div
                      onClick={this.showOrder.bind(this, val.order_id)}
                      className="orderShow"
                      key={val.order_id}
                    >
                      {val.used_status}
                    </div>
                  );
                })
              }
              <div
                onClick={this.addOrder}
              >
                <Icon
                  type="plus"
                  style={{
                    fontSize: 32,
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
            >
              <Icon
                type="plus"
                style={{
                  fontSize: 32,
                  cursor: 'pointer',
                }}
              />
            </div>
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
          // const val = vehicleCollects[0];
          return (
            <div>
              {
                vehicleCollects.map((val) => {
                  return (
                    <div
                      onClick={this.showOrder.bind(this, val.order_id)}
                      className="orderShow"
                      key={val.order_id}
                    >
                      {val.used_status}
                    </div>
                  );
                })
              }
              <div
                onClick={this.addOrder}
              >
                <Icon
                  type="plus"
                  style={{
                    fontSize: 32,
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
            >
              <Icon
                type="plus"
                style={{
                  fontSize: 32,
                  cursor: 'pointer',
                }}
              />
            </div>
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
          // const val = vehicleCollects[0];
          return (
            <div>
              {
                vehicleCollects.map((val) => {
                  return (
                    <div
                      onClick={this.showOrder.bind(this, val.order_id)}
                      className="orderShow"
                      key={val.order_id}
                    >
                      {val.used_status}
                    </div>
                  );
                })
              }
              <div
                onClick={this.addOrder}
              >
                <Icon
                  type="plus"
                  style={{
                    fontSize: 32,
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
            >
              <Icon
                type="plus"
                style={{
                  fontSize: 32,
                  cursor: 'pointer',
                }}
              />
            </div>
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
          // const val = vehicleCollects[0];
          return (
            <div>
              {
                vehicleCollects.map((val) => {
                  return (
                    <div
                      onClick={this.showOrder.bind(this, val.order_id)}
                      className="orderShow"
                      key={val.order_id}
                    >
                      {val.used_status}
                    </div>
                  );
                })
              }
              <div
                onClick={this.addOrder}
              >
                <Icon
                  type="plus"
                  style={{
                    fontSize: 32,
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
            >
              <Icon
                type="plus"
                style={{ fontSize: 32 }}
              />
            </div>
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
          // const val = vehicleCollects[0];
          return (
            <div>
              {
                vehicleCollects.map((val) => {
                  return (
                    <div
                      onClick={this.showOrder.bind(this, val.order_id)}
                      className="orderShow"
                      key={val.order_id}
                    >
                      {val.used_status}
                    </div>
                  );
                })
              }
              <div
                onClick={this.addOrder}
              >
                <Icon
                  type="plus"
                  style={{
                    fontSize: 32,
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
            >
              <Icon
                type="plus"
                style={{ fontSize: 32 }}
              />
            </div>
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
          // const val = vehicleCollects[0];
          return (
            <div>
              {
                vehicleCollects.map((val) => {
                  return (
                    <div
                      onClick={this.showOrder.bind(this, val.order_id)}
                      className="orderShow"
                      key={val.order_id}
                    >
                      {val.used_status}
                    </div>
                  );
                })
              }
              <div
                onClick={this.addOrder}
              >
                <Icon
                  type="plus"
                  style={{
                    fontSize: 32,
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div
              onClick={this.addOrder}
            >
              <Icon
                type="plus"
                style={{ fontSize: 32 }}
              />
            </div>
          );
        }
      },
    }];
    return (
      <div className={styles.carType}>
        <div className={styles.titleContent}>
          <h2>车辆调度调控</h2>
          <div className={styles.titleTimes}>
            <div>
              <span>开始时间：</span>
              <DatePicker
                defaultValue={DateMoment}
                format={requestFormat}
                onChange={this.changeList}
              />
            </div>
            <div>
              <span>结束时间：</span>
              <DatePicker
                value={WeekDate}
                format={requestFormat}
                disabled
              />
            </div>
          </div>
        </div>
        <Table
          dataSource={StatusListData}
          columns={columns}
          rowKey={(record => record.vehicle_id)}
          loading={StatusLoad}
          pagination={pagination}
        />
      </div>
    );
  }
}
