import React, { PureComponent } from 'react';
import { Table, Button, Input, Divider } from 'antd';
import { connect } from 'dva';
import Myplist from './OrgProp';
import styles from './index.less';

const { Search } = Input;

@connect(({ org }) => ({
  List: org.List,
  ListLoading: org.ListLoading,
}))
export default class OrgMerge extends PureComponent {
  state = {
    orgVisible: false,
    modalType: '',
    record: {},
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'org/getOrgList',
    });
  }

  addRole = () => {
    this.setState({
      orgVisible: true,
      modalType: '添加',
    });
  }
  detailRole = (record) => {
    this.setState({
      orgVisible: true,
      modalType: '详情',
      record,
    });
  }
  resiveRole = (record) => {
    this.setState({
      orgVisible: true,
      modalType: '修改',
      record,
    });
  }
  cancelModal = () => {
    this.setState({
      orgVisible: false,
      record: {},
    });
  }
  render() {
    const { List, ListLoading } = this.props;
    const pagination = {
      pageSize: 10,
      total: List.length,
    };
    const orgById = {};
    const orgFilter = [];
    List.map((val) => {
      orgById[val.organization.id] = val.organization.org_name;
      orgFilter.push({
        text: val.organization.org_name,
        value: val.organization.org_name,
      });
      return val;
    });
    const columns = [{
      title: '单位名称',
      dataIndex: 'organization.org_name',
      width: 200,
      filters: orgFilter,
      onFilter: (value, record) => record.organization.org_name === value,
      align: 'center',
    }, {
      title: '编码',
      dataIndex: 'organization.org_code',
      width: 200,
      align: 'center',
    }, {
      title: '上级单位ID',
      dataIndex: 'parent_name',
      width: 200,
      align: 'center',
    }, {
      title: '电话',
      dataIndex: 'organization.tel_phone',
      width: 200,
      align: 'center',
    }, {
      title: '地址',
      dataIndex: 'organization.address',
      width: 150,
      align: 'center',
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
            <Divider type="vertical" />
            <span
              onClick={this.resiveRole.bind(this, record)}
            >
              编辑
            </span>
            {/* <Divider type="vertical" />
            <Popconfirm
              title={`你确认要删除${record.organization.org_name}么?`}
              onConfirm={this.deleteRole.bind(this, record)}
            >
              删除
            </Popconfirm> */}
          </div>
        );
      },
    }];
    return (
      <div className={styles.AllPerson}>
        <h2>部门</h2>
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
            icon="plus"
          >
            添加单位
          </Button>
        </div>
        <Table
          dataSource={List}
          columns={columns}
          rowKey={(record => record.organization.id)}
          loading={ListLoading}
          pagination={pagination}
        />
        <Myplist
          orgVisible={this.state.orgVisible}
          cancelModal={this.cancelModal}
          record={this.state.record}
          dispatch={this.props.dispatch}
          List={List}
          modalType={this.state.modalType}
        />
      </div>
    );
  }
}
