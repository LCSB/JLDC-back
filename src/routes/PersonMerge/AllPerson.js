import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Button, Input, Divider, Popconfirm,
} from 'antd';
import AllModal from './AllPersonConfig';
import styles from './index.less';

const { Search } = Input;

@connect(({ person }) => ({
  userList: person.userList,
  ListLoading: person.ListLoading,
}))
// @Form.create()
export default class AllPerson extends PureComponent {
  state = {
    DataList: [],
    userVisible: false,
    moadlType: '',
    record: {},
    selectRole: [],
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'person/getAllList',
    });
  }

  addPerson = () => {
    this.setState({
      userVisible: true,
      moadlType: '添加',
      selectRole: [],
    });
  }

  revsieUser = (record) => {
    let roleId = [];
    if (record.sysuser_roles && record.sysuser_roles.length > 0) {
      const [roleMes] = record.sysuser_roles;
      roleId = [roleMes.id];
    }
    this.setState({
      userVisible: true,
      moadlType: '修改',
      selectRole: roleId,
      record,
    });
  }

  detailUser = (record) => {
    let roleId = [];
    if (record.sysuser_roles && record.sysuser_roles.length > 0) {
      const [roleMes] = record.sysuser_roles;
      roleId = [roleMes.id];
    }
    this.setState({
      userVisible: true,
      moadlType: '详情',
      selectRole: roleId,
      record,
    });
  }

  forbiddenUser = (record) => {
    const params = {
      sys_user: {
        id: record.sys_user.id,
        enable: false,
      },
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'person/revisePerson',
      payload: params,
      callback: () => {
        dispatch({
          type: 'person/getAllList',
        });
      },
    });
  }

  // deleteUser = (record) => {
  //   this.props.dispatch({
  //     type: 'person/deleteUser',
  //     payload: record.id,
  //     callback: () => {
  //       this.props.dispatch({
  //         type: 'person/getAllList',
  //       });
  //     },
  //   });
  // }

  cancelModal = () => {
    this.setState({
      userVisible: false,
      record: {},
      selectRole: [],
    });
  }

  searchValue = (value) => {
    this.searchList(value);
  }

  enterSearch = (e) => {
    // console.log(e.target.value);
    const { value } = e.target;
    this.searchList(value);
  }

  searchList = (value) => {
    const { userList } = this.props;
    const filterList = [];
    userList.map((item) => {
      if (
        item.name.indexOf(value) >= 0 ||
        item.phone.indexOf(value) >= 0 ||
        item.police_number.indexOf(value) >= 0
      ) {
        filterList.push(item);
      }
      return item;
    });
    this.setState({
      DataList: filterList,
    });
  }

  changeRowData = (selectedRowKeys) => {
    this.setState({
      selectRole: selectedRowKeys,
    });
  }

  render() {
    const {
      userList, ListLoading, orgById, orgFilter, orgList,
    } = this.props;
    const {
      DataList, selectRole,
    } = this.state;
    let userDataList = [];
    if (DataList.length > 0) {
      userDataList = DataList;
    } else {
      userDataList = userList;
    }
    const pagination = {
      pageSize: 10,
      total: userDataList.length,
    };
    const columns = [{
      title: '姓名',
      dataIndex: 'sys_user.name',
      align: 'center',
      width: 200,
    }, {
      title: '手机号',
      dataIndex: 'sys_user.phone',
      align: 'center',
      width: 200,
    }, {
      title: '警号',
      dataIndex: 'sys_user.police_number',
      align: 'center',
      width: 200,
    }, {
      title: '部门',
      dataIndex: 'sys_user.depart_id',
      align: 'center',
      width: 200,
      filters: orgFilter,
      onFilter: (value, record) => parseInt(record.depart_id, 10) === parseInt(value, 10),
      render: (value) => {
        return (
          <span>{orgById[value]}</span>
        );
      },
    },
    {
      title: '用户状态',
      dataIndex: 'sys_user.enable',
      align: 'center',
      width: 150,
      render: (val) => {
        const valMes = val ? '正常' : '停用';
        return valMes;
      },
    },
    {
      title: '操作',
      align: 'center',
      width: 200,
      render: (record) => {
        return (
          <div className="personTableBtns">
            <span
              onClick={this.detailUser.bind(this, record)}
            >
              详情
            </span>
            <Divider type="vertical" />
            <span
              onClick={this.revsieUser.bind(this, record)}
            >
              编辑
            </span>
            {
              record.sys_user &&
              record.sys_user.enable &&
              (
                <div>
                  <Divider type="vertical" />
                  <Popconfirm
                    title={`你确认要停用用户${record.sys_user.name}么?`}
                    onConfirm={this.forbiddenUser.bind(this, record)}
                  >
                    停用
                  </Popconfirm>
                </div>
              )
            }
          </div>
        );
      },
    }];
    return (
      <div className={styles.AllPerson}>
        <div className={styles.AllHeader}>
          <Search
            placeholder="姓名/手机号/警号"
            size="default"
            style={{ width: 400 }}
            enterButton
            onSearch={this.searchValue}
            onPressEnter={this.enterSearch}
            onChange={this.enterSearch}
          />
          <Button
            type="primary"
            onClick={this.addPerson}
            icon="plus"
          >
            新增人员
          </Button>
        </div>
        <div className={styles.perosnNum}>
          共{userDataList.length}人
        </div>
        <Table
          dataSource={userDataList}
          columns={columns}
          rowKey={(recordMes => recordMes.sys_user.id)}
          loading={ListLoading}
          pagination={pagination}
        />
        <AllModal
          userVisible={this.state.userVisible}
          moadlType={this.state.moadlType}
          record={this.state.record}
          // dispatch={this.props.dispatch}
          cancelModal={this.cancelModal}
          orgList={orgList}
          selectRole={selectRole}
          changeRowData={this.changeRowData}
          // form={this.props.form}
        />
      </div>
    );
  }
}
