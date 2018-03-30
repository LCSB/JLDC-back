import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Divider,
} from 'antd';
import styles from './index.less';
import IconCar from '../../../public/car.png';
// import AddPersonModal from '../PersonMerge/AllPersonConfig';

const onlineStatus = {
  OffLine: '不在线',
  OnLine: '在线',
};

const { qq } = window;
// const { Sider } = Layout;
@connect(({ home }) => ({
  onlines: home.onlines,
}))
export default class home extends PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'home/getCarStatusCoord',
    });
    this.interval = window.setInterval(() => {
      this.props.dispatch({
        type: 'home/getCarStatusCoord',
      });
    }, 5000);
  }
  componentDidMount() {
    this.QQmap = new qq.maps.Map(document.getElementById('container'), {
      // 地图的中心地理坐标。
      center: new qq.maps.LatLng(30.880300, 114.366802),
      zoom: 14,
    });
    this.QQmap.getCenter();
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    // console.log(IconCar);
    const { onlines } = this.props;
    if (Array.isArray(onlines)) {
      try {
        onlines.map((val) => {
          if (this[val.vehicle_name]) {
            this[val.vehicle_name] = null;
            this[`${val.vehicle_name}info`] = null;
          }
          // console.log(new qq.maps.Size(10, 10));
          // this[`${val.vehicle_name}size`] = new qq.maps.Size(10);
          // this[`${val.vehicle_name}point`] = new new qq.maps.Point(5, 5);
          const that = this;
          this[val.vehicle_name] = new qq.maps.Marker({
            position: new qq.maps.LatLng(val.gps_lat, val.gps_lon),
            map: this.QQmap,
            title: val.vehicle_name,
          });
          const anchor = new qq.maps.Point(8, 18.4);
          const size = new qq.maps.Size(16, 36.8);
          const origin = new qq.maps.Point(0, 0);
          const markerIcon = new qq.maps.MarkerImage(
            IconCar,
            undefined,
            origin,
            anchor,
            size,
          );
          this[val.vehicle_name].setIcon(markerIcon);
          this[`${val.vehicle_name}info`] = new qq.maps.InfoWindow({
            map: this.QQmap,
          });
          qq.maps.event.addListener(that[val.vehicle_name], 'click', () => {
            this[`${val.vehicle_name}info`].open();
            this[`${val.vehicle_name}info`].setContent(
              '<div style="text-align:center;white-space:nowrap;margin:10px;">' +
              '<h3>车辆信息</h3>' +
              `<div>车牌号：${val.vehicle_name}</div>` +
              `<div>车辆状态：${onlineStatus[val.online_status]}</div>` +
              '</div>'
            );
            this[`${val.vehicle_name}info`].setPosition(new qq.maps.LatLng(val.gps_lat, val.gps_lon));
          });
          return val;
        });
      } catch (err) {
        // console.log(err);
      }
    }
    // console.log(onlines);
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
