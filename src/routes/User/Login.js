import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Alert } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

@connect(({ login }) => ({
  login,
  submitting: login.submitting,
  loginLoading: login.loginLoading,
}))
export default class LoginPage extends Component {
  // state = {
  //   type: 'account',
  //   autoLogin: true,
  // }

  // onTabChange = (type) => {
  //   this.setState({ type });
  // }

  handleSubmit = (err, values) => {
    // const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    }
  }

  // changeAutoLogin = (e) => {
  //   this.setState({
  //     autoLogin: e.target.checked,
  //   });
  // }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }

  render() {
    const { submitting, loginLoading } = this.props;
    // const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          // defaultActiveKey={type}
          // onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          {
            submitting &&
            this.renderMessage('手机号或密码错误')
          }
          <UserName name="phone" placeholder="请输入手机号" />
          <Password name="password" placeholder="请输入密码" />
          <Submit loading={loginLoading}>登录</Submit>
          <div className={styles.other}>
            <Link className={styles.register} to="/user/register">注册账户</Link>
          </div>
        </Login>
      </div>
    );
  }
}
