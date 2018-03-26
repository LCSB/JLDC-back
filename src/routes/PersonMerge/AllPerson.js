import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Button, Input, Divider,
} from 'antd';
import styles from './index.less';

const { Search } = Input;

@connect(({ person }) => ({
  userList: person.userList,
  ListLoading: person.ListLoading,
}))
export default class AllPerson extends PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'person/getAllList',
    });
  }
  render() {
    const {
      userList, ListLoading, orgById, orgFilter,
    } = this.props;
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      width: 200,
    }, {
      title: '手机号',
      dataIndex: 'phone',
      width: 200,
    }, {
      title: '警号',
      dataIndex: 'police_number',
      width: 200,
    }, {
      title: '部门',
      dataIndex: 'depart_id',
      width: 200,
      filters: orgFilter,
      onFilter: (value, record) => parseInt(record.depart_id, 10) === parseInt(value, 10),
      render: (value) => {
        return (
          <span>{orgById[value]}</span>
        );
      },
    }, {
      title: '用车权限',
      dataIndex: 'age',
      width: 150,
    }, {
      title: '操作',
      width: 200,
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
        />
      </div>
    );
  }
}
