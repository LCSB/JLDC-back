import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Button, Input, Divider, Popconfirm } from 'antd';
import ModalConfig from './config';
import styles from './index.less';

const { Search } = Input;

@connect(({ role }) => ({
  roleList: role.roleList,
  ListLoading: role.ListLoading,
}))
export default class OrgMerge extends PureComponent {
  state = {
    roleVisible: false,
    moadlType: '',
    record: {},
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'role/getList',
    });
  }

  resiveRole = (record) => {
    this.setState({
      roleVisible: true,
      moadlType: '修改',
      record,
    });
  }

  addRole = () => {
    this.setState({
      roleVisible: true,
      moadlType: '添加',
    });
  }

  detailRole = (record) => {
    this.setState({
      roleVisible: true,
      moadlType: '详情',
      record,
    });
  }
  cancelModal = () => {
    this.setState({
      roleVisible: false,
      record: {},
    });
  }

  deleteRole = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/deleterole',
      payload: record.id,
      callback: () => {
        dispatch({
          type: 'role/getList',
        });
      },
    });
  }
  render() {
    const { roleList, ListLoading } = this.props;
    const columns = [{
      title: '角色名称',
      dataIndex: 'role_name',
      width: 200,
      align: 'center',
    }, {
      title: '系统用户',
      dataIndex: 'is_system',
      width: 200,
      align: 'center',
      render: (val) => {
        return (
          <div>
            {
              val &&
              <span>是</span>
            }
            {
              !val &&
              <span>否</span>
            }
          </div>
        );
      },
    },
    // {
    //   title: '角色属性',
    //   dataIndex: 'role_type',
    //   width: 180,
    //   align: 'center',
    // },
    {
      title: '角色描述',
      dataIndex: 'description',
      width: 200,
      align: 'center',
    }, {
      title: '角色状态',
      dataIndex: 'enable',
      width: 150,
      align: 'center',
      render: (val) => {
        return (
          <div> { val &&
          <span >可用</span>
                }
            {!val &&
            <span>不可用</span>
                }
          </div>
        );
      },
    }, {
      title: '操作',
      width: 200,
      align: 'center',
      render: (record) => {
        return (
          <div className="tableBtns">
            <span
              onClick={this.detailRole.bind(this, record)}
            >
              详情
            </span>
            {
              record.role_type !== 1 &&
              (
                <div className="SysNoBtns">
                  <Divider type="vertical" />
                  <span onClick={this.resiveRole.bind(this, record)}>编辑</span>
                  <Divider type="vertical" />
                  <Popconfirm
                    title={`你确认要删除${record.role_name}么?`}
                    onConfirm={this.deleteRole.bind(this, record)}
                  >
                    删除
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
        <h2>角色</h2>
        <div className={styles.AllHeader}>
          <Search
            placeholder="角色名称"
            size="default"
            style={{ width: 400 }}
            enterButton
          />
          <Button
            type="primary"
            onClick={this.addRole}
            icon="plus"
          >
            添加角色
          </Button>
        </div>
        <Table
          dataSource={roleList}
          columns={columns}
          rowKey={(record => record.id)}
          loading={ListLoading}
        />
        <ModalConfig
          roleVisible={this.state.roleVisible}
          moadlType={this.state.moadlType}
          record={this.state.record}
          dispatch={this.props.dispatch}
          cancelModal={this.cancelModal}
          roleList={roleList}
        />
      </div>
    );
  }
}
