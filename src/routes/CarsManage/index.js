import React, { PureComponent } from 'react';
import { connect } from 'dva';
import AllCar from './AllCar';
import styles from './index.less';

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
        <AllCar
          orgList={orgList}
          orgById={orgById}
          orgFilter={orgFilter}
        />
      </div>
    );
  }
}
