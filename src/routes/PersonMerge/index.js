import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Tabs,
} from 'antd';
import AllPerson from './AllPerson';
import WeChat from './WeChat';
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
      <div className={styles.personMerge}>
        <Tabs defaultActiveKey="全部人员">
          <TabPane tab="全部人员" key="全部人员">
            <AllPerson
              orgList={orgList}
              orgById={orgById}
              orgFilter={orgFilter}
            />
          </TabPane>
          <TabPane tab="微信绑定人员" key="微信绑定人员">
            <WeChat />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
