import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Button, Input, Divider,
} from 'antd';
import styles from './index.less';

const { Search } = Input;

@connect(({ org }) => ({
  List: org.List,
  ListLoading: org.ListLoading,
}))
export default class OrgMerge extends PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'org/getOrgList',
    });
  }
  render() {
    const { List, ListLoading } = this.props;
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
      title: '部门名称',
      dataIndex: 'organization.org_name',
      width: 200,
      filters: orgFilter,
      onFilter: (value, record) => record.organization.org_name === value,
      align: 'left',
    }, {
      title: '编码',
      dataIndex: 'organization.org_code',
      width: 200,
      align: 'left',
    }, {
      title: '上级部门',
      dataIndex: 'organization.parent_id',
      width: 200,
      align: 'left',
    }, {
      title: '电话',
      dataIndex: 'organization.tel_phone',
      width: 200,
      align: 'left',
    }, {
      title: '地址',
      dataIndex: 'organization.address',
      width: 150,
      align: 'left',
    }, {
      title: '操作',
      width: 200,
      align: 'left',
      render: () => {
        return (
          <div className={styles.tableBtns}>
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
      <div className={styles.AllPerson}>
        <div className={styles.AllHeader}>
          <Search
            placeholder="部门名称/编码"
            size="default"
            style={{ width: 400 }}
            enterButton
          />
          <Button type="primary">添加单位</Button>
        </div>
        <Table
          dataSource={List}
          columns={columns}
          rowKey={(record => record.organization.id)}
          loading={ListLoading}
        />
      </div>
    );
  }
}
