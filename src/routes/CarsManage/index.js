import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Tabs,
} from 'antd';
import AllCar from './AllCar';
import CarDispatch from './CarDispatch';
import styles from './index.less';

const { TabPane } = Tabs;
@connect(({ person }) => ({
  orgList: person.orgList,
}))
export default class PersonMerge extends PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'person/getOrgList',
    });
  }
  render() {
    const { orgList } = this.props;
    const orgById = {};
    const orgFilter = [];
    orgList.map((val) => {
      orgById[val.organization.id] = val.organization.org_name;
      orgFilter.push({
        text: val.organization.org_name,
        value: val.organization.id,
      });
      return val;
    });
    return (
      <div className={styles.carsManage}>
        <Tabs defaultActiveKey="全部车辆">
          <TabPane tab="全部车辆" key="全部车辆">
            <AllCar
              orgList={orgList}
              orgById={orgById}
              orgFilter={orgFilter}
            />
          </TabPane>
          <TabPane tab="车辆调控状态" key="车辆调控状态">
            <CarDispatch />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
