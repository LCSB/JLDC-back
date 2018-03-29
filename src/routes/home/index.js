import React, { PureComponent } from 'react';
import {
  Divider,
} from 'antd';
import styles from './index.less';
// import AddPersonModal from '../PersonMerge/AllPersonConfig';

const { qq } = window;
// const { Sider } = Layout;

export default class home extends PureComponent {
  componentDidMount() {
    const map = new qq.maps.Map(document.getElementById('container'), {
      // 地图的中心地理坐标。
      center: new qq.maps.LatLng(30.880300, 114.366802),
      zoom: 14,
    });
    map.getCenter();
  }
  render() {
    // const base
    return (
      <div className={styles.home}>
        <div className={styles.homeNotify}>
          <h2>警务保障部</h2>
          <Divider />
          <div id="container" className={styles['map-view']} />
        </div>
      </div>
    );
  }
}
