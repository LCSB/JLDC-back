import React, { PureComponent } from 'react';
import {
  Tabs,
} from 'antd';
import styles from './index.less';
import CarModal from '../CarModal';
import CarPrototype from '../CarPrototype';

const { TabPane } = Tabs;

export default class CarBasic extends PureComponent {
  render() {
    return (
      <div className={styles.CarBasic}>
        <h2>基础数据</h2>
        <Tabs defaultActiveKey="车型">
          <TabPane tab="车型" key="车型">
            <CarModal />
          </TabPane>
          <TabPane tab="用车原因" key="3">
            <CarPrototype />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
