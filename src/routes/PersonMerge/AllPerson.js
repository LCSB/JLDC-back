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
    userVisible: false,
    moadlType: '',
    record: {},
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
    });
  }

  revsieUser = (record) => {
    this.setState({
      userVisible: true,
      moadlType: '修改',
      record,
    });
  }

  detailUser = (record) => {
    this.setState({
      userVisible: true,
      moadlType: '详情',
      record,
    });
  }

  forbiddenUser = (record) => {
    const params = {};
    params.id = record.id;
    params.enable = false;
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
    });
  }
  render() {
    const {
      userList, ListLoading, orgById, orgFilter, orgList,
    } = this.props;
    const pagination = {
      pageSize: 10,
      total: userList.length,
    };
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      width: 200,
    }, {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
      width: 200,
    }, {
      title: '警号',
      dataIndex: 'police_number',
      align: 'center',
      width: 200,
    }, {
      title: '部门',
      dataIndex: 'depart_id',
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
      dataIndex: 'enable',
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
              record.enable &&
              (
                <div>
                  <Divider type="vertical" />
                  <Popconfirm
                    title={`你确认要停用用户${record.name}么?`}
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
          共{userList.length}人
        </div>
        <Table
          dataSource={userList}
          columns={columns}
          rowKey={(record => record.id)}
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
          // form={this.props.form}
        />
      </div>
    );
  }
}
