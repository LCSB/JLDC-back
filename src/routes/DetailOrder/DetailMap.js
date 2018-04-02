import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ orderDetail }) => ({
  RouterLoad: orderDetail.RouterLoad,
  HistortyRoutes: orderDetail.HistortyRoutes,
}))
export default class DetailMap extends PureComponent {
  componentWillMount() {
    const { id } = this.props;
    if (id) {
      this.props.dispatch({
        type: 'orderDetail/getHistoryRouter',
        payload: id,
      });
    }
  }
  // componentDidMount() {
  //   this.QQmap = new qq.maps.Map(document.getElementById('container'), {
  //     // 地图的中心地理坐标。
  //     center: new qq.maps.LatLng(30.880300, 114.366802),
  //     zoom: 14,
  //   });
  //   this.QQmap.getCenter();
  // }

  render() {
    return (
      <div>
        <div className={styles.ceshi} />
        {/* <h2>历史行驶轨迹</h2>
        <div id="container" className={styles['map-view']} /> */}
      </div>
    );
  }
}
