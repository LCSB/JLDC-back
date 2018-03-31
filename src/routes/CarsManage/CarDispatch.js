import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Input, Divider, Icon,
} from 'antd';
// import moment from 'moment';
import styles from './index.less';

// const { Search } = Input;

@connect(({ car }) => ({
  StatusList: car.StatusList,
  StatusLoad: car.StatusLoad,
}))
export default class CarStatusList extends PureComponent {
  state = {
    filterDropdownVisible: false,
    data: [],
    filtered: '',
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'car/getCarStatusList',
      payload: {
        id: 1,
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

  render() {
    const { StatusList, ListLoading } = this.props;
    const { data } = this.state;
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
        <Table
          dataSource={StatusListData}
          columns={columns}
          rowKey={(record => record.id)}
          loading={ListLoading}
          pagination={pagination}
        />
      </div>
    );
  }
}
