import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table, Input, Divider, Popconfirm, Form,
} from 'antd';
import styles from './index.less';

const { Search } = Input;
const WeChatStatus = {
  1: '正常绑定',
  2: '微信停用',
};

@connect(({ person }) => ({
  WeChatList: person.WeChatList,
  ListLoading: person.ListLoading,
}))
@Form.create()
export default class WeChat extends PureComponent {
  state = {
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'person/getWeChatList',
    });
  }

  reviseWeChatStatus = (record, status) => {
    const params = {};
    params.user_status = status;
    this.props.dispatch({
      type: 'person/reviseWeChatStatus',
      payload: params,
      callback: () => {
        this.props.dispatch({
          type: 'person/getWeChatList',
        });
      },
    });
  }

  deleteWeChat = (record) => {
    this.props.dispatch({
      type: 'person/deleteWeChat',
      payload: record.user.id,
      callback: () => {
        this.props.dispatch({
          type: 'person/getWeChatList',
        });
      },
    });
  }

  render() {
    const {
      WeChatList, ListLoading,
    } = this.props;
    const pagination = {
      pageSize: 6,
      total: WeChatList.length,
    };
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      width: 200,
    }, {
      title: '手机号',
      dataIndex: 'phone',
      width: 200,
    }, {
      title: '微信ID',
      dataIndex: 'user.wechat_openid',
      width: 200,
    }, {
      title: '添加时间',
      dataIndex: 'user.created',
      width: 200,
    }, {
      title: '状态',
      dataIndex: 'user.user_status',
      width: 150,
      render: val => WeChatStatus[val],
    }, {
      title: '操作',
      width: 200,
      render: (record) => {
        return (
          <div>
            {
              record.user.user_status === 1 &&
              (
                <Popconfirm
                  title={`你确认要停用用户${record.name}么?`}
                  onConfirm={this.reviseWeChatStatus.bind(this, record, 2)}
                >
                  停用
                </Popconfirm>
              )
            }
            {
              record.user.user_status === 2 &&
              (
                <Popconfirm
                  title={`你确认要启用用户${record.name}么?`}
                  onConfirm={this.reviseWeChatStatus.bind(this, record, 1)}
                >
                  启用
                </Popconfirm>
              )
            }
            <Divider type="vertical" />
            <Popconfirm
              title={`你确认要删除用户${record.name}么?`}
              onConfirm={this.deleteWeChat.bind(this, record)}
            >
              删除
            </Popconfirm>
          </div>
        );
      },
    }];
    return (
      <div className={styles.AllPerson}>
        <div className={styles.AllHeader}>
          <Search
            placeholder="姓名/手机号/微信号"
            size="default"
            style={{ width: 400 }}
            enterButton
          />
        </div>
        <div className={styles.weChatNum}>
          共{WeChatList.length}人
        </div>
        <Table
          dataSource={WeChatList}
          columns={columns}
          rowKey={(record => record.user.id)}
          loading={ListLoading}
          pagination={pagination}
        />
      </div>
    );
  }
}
