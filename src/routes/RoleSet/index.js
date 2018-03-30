import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Button, Input, Divider,
} from 'antd';
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

  render() {
    const { roleList, ListLoading } = this.props;
    const columns = [{
      title: '名称',
      dataIndex: 'role_name',
      width: 200,
      align: 'left',
    }, {
      title: '系统用户',
      dataIndex: 'is_system',
      width: 200,
      align: 'left',
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
    }, {
      title: '角色属性',
      dataIndex: 'role_type',
      width: 180,
      align: 'left',
    }, {
      title: '角色描述',
      dataIndex: 'description',
      width: 200,
      align: 'left',
    }, {
      title: '角色状态',
      dataIndex: 'enable',
      width: 150,
      align: 'left',
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
      align: 'left',
      render: (record) => {
        return (
          <div className="tableBtns">
            <span
              onClick={this.detailRole.bind(this, record)}
            >
              详情
            </span>
            <Divider type="vertical" />
            <span onClick={this.resiveRole.bind(this, record)}>编辑</span>
            <Divider type="vertical" />
            <span>删除</span>
          </div>
        );
      },
    }];
    return (
      <div className={styles.AllPerson}>
        <div className={styles.AllHeader}>
          <Search
            placeholder="部门名称/编码"
            size="default"
            style={{ width: 400 }}
            enterButton
          />
          <Button
            type="primary"
            onClick={this.addRole}
          >
            添加单位
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
        />
      </div>
    );
  }
}
