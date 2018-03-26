import React, { PureComponent } from 'react';
import {
  Tabs,
} from 'antd';
import AllPerson from './AllPerson';
import styles from './index.less';

const { TabPane } = Tabs;

export default class PersonMerge extends PureComponent {
  render() {
    return (
      <div className={styles.personMerge}>
        <Tabs defaultActiveKey="全部人员">
          <TabPane tab="全部人员" key="全部人员">
            <AllPerson />
          </TabPane>
          <TabPane tab="微信绑定人员" key="微信绑定人员">微信绑定人员</TabPane>
          <TabPane tab="调度人员" key="调度人员">调度人员</TabPane>
        </Tabs>
      </div>
    );
  }
}
