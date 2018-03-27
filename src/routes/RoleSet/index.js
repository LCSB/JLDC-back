import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Button, Input, Divider,
} from 'antd';
import modalConfig from './config';

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
  render() {
    const { roleList, ListLoading } = this.props;
    const columns = [{
      title: '名称',
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
    }, {
      title: '角色属性',
      dataIndex: 'role_type',
      width: 200,
      align: 'center',
    }, {
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
          <div>
            {
              val &&
              <span>可用</span>
            }
            {
              !val &&
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
          <div>
            <span>详情</span>
            <Divider type="vertical" />
            <span onClick={this.resiveRole.bind(this, record)}>编辑</span>
            <Divider type="vertical" />
            <span>删除</span>
          </div>
        );
      },
    }];
    return (
      <div>
        <div>
          <Search
            placeholder="部门名称/编码"
            enterButton
          />
          <Button
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
        <modalConfig
          roleVisible={this.state.roleVisible}
          moadlType={this.state.moadlType}
          record={this.state.record}
          dispatch={this.props.dispatch}
        />
      </div>
    );
  }
}
