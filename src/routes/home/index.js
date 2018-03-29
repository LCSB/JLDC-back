import React, { PureComponent } from 'react';
import {
  Button, Divider,
} from 'antd';
// import EsriLoaderReact from 'esri-loader-react';
import styles from './index.less';
// import AddPersonModal from '../PersonMerge/AllPersonConfig';

// const { Sider } = Layout;

export default class home extends PureComponent {
  render() {
    // const base
    return (
      <div className={styles.home}>
        <div className={styles.homeNotify}>
          <h2>警务保障部</h2>
          <Divider />
          <div className={styles.homeStatus}>
            <div className={styles.homeRy}>
              <div className={styles.title}>人员数量</div>
              <div className={styles.num}>19人</div>
              <Button
                type="primary"
              >
                添加人员
              </Button>
              {/* <AddPersonModal
                userVisible={this.state.userVisible}
                moadlType={this.state.moadlType}
                record={this.state.record}
                dispatch={this.props.dispatch}
                cancelModal={this.cancelModal}
                orgList={orgList}
                form={this.props.form}
              /> */}
            </div>
            <Divider type="vertical" />
            <div className={styles.homeRy}>
              <div className={styles.title}>车辆数量</div>
              <div className={styles.num}>19人</div>
              <Button
                type="primary"
              >
                添加车辆
              </Button>
            </div>
            <Divider type="vertical" />
            <div className={styles.homeRy}>
              <div className={styles.title}>当前可用</div>
              <div className={styles.num}>19人</div>
              <Button
                type="primary"
              >
                用车
              </Button>
            </div>
          </div>
          <Divider />
          <div className={styles.newNotify}>
            <h4>通知公告</h4>
          </div>
        </div>
        <div className={styles.homeMap}>
          map
        </div>
      </div>
    );
  }
}
