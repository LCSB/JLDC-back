import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import {
//   Divider,
// } from 'antd';
// import G from 'geohey-javascript-sdk';
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
    }, 2000);
  }
  componentDidMount() {
    this.QQmap = new qq.maps.Map(document.getElementById('container'), {
      // 地图的中心地理坐标。
      center: new qq.maps.LatLng(30.880300, 114.366802),
      zoom: 14,
    });
    this.QQmap.getCenter();
  }

  componentWillReceiveProps() {
    this.oldOnlines = this.props.onlines;
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    // console.log(IconCar);
    const { onlines } = this.props;
    if (Array.isArray(onlines)) {
      try {
        onlines.map((val, index) => {
          const valGpsLon = parseFloat(val.gps_lon);
          const valGpsLat = parseFloat(val.gps_lat);
          const that = this;
          let carReg = 0;
          if (this.oldOnlines && this.oldOnlines[index]) {
            const oldValue = this.oldOnlines[index];
            const oldGpsLon = parseFloat(oldValue.gps_lon);
            const oldGpsLat = parseFloat(oldValue.gps_lat);
            if (valGpsLat !== oldGpsLat) {
              const regNum = (valGpsLon - oldGpsLon) / (valGpsLat - oldGpsLat);
              carReg = Math.tan(regNum);
              this[`${val.vehicle_name}rotate`] = carReg;
              if (carReg < 0) {
                this[`${val.vehicle_name}rotate`] = carReg + 180;
              }
            } else if (valGpsLon !== oldGpsLon && valGpsLon - oldGpsLon > 0) {
              carReg = 90;
              this[`${val.vehicle_name}rotate`] = carReg;
            } else if (valGpsLon !== oldGpsLon && valGpsLon - oldGpsLon < 0) {
              carReg = 270;
              this[`${val.vehicle_name}rotate`] = carReg;
            }
          }
          // const GArr = G.Proj.Gcj.project(valGpsLon, valGpsLat);
          // console.log(valGpsLon);
          // console.log(valGpsLat);
          const QQLatLng = new qq.maps.LatLng(valGpsLat, valGpsLon);

          // 车辆
          if (this[val.vehicle_name]) {
            this[val.vehicle_name].moveTo(QQLatLng, 60);
            if (this[`${val.vehicle_name}rotate`]) {
              this[val.vehicle_name].setRotation(this[`${val.vehicle_name}rotate`]);
            }
          } else {
            this[val.vehicle_name] = new qq.maps.Marker({
              position: QQLatLng,
              map: this.QQmap,
              title: val.vehicle_name,
            });
            let anchor = new qq.maps.Point(11.5, 23.4);
            let size = new qq.maps.Size(21, 46.8);
            let origin = new qq.maps.Point(0, 0);
            let markerIcon = new qq.maps.MarkerImage(
              IconCar,
              undefined,
              origin,
              anchor,
              size,
            );
            this[val.vehicle_name].setIcon(markerIcon);
            anchor = null;
            size = null;
            origin = null;
            markerIcon = null;
            // 车辆信息
            this[`${val.vehicle_name}info`] = new qq.maps.InfoWindow({
              map: this.QQmap,
            });
          }
          qq.maps.event.addListener(that[val.vehicle_name], 'click', () => {
            this[`${val.vehicle_name}info`].open();
            this[`${val.vehicle_name}info`].setContent(
              '<div style="text-align:center;white-space:nowrap;margin:10px;">' +
              '<h3>车辆信息</h3>' +
              `<div>车牌号：${val.vehicle_name}</div>` +
              `<div>车辆状态：${onlineStatus[val.online_status]}</div>` +
              '</div>'
            );
            this.QQmap.setCenter(QQLatLng);
            this.QQmap.getCenter();
            this[`${val.vehicle_name}info`].setPosition(QQLatLng);
          });
          return val;
        });
      } catch (err) {
        // console.log(err);
      }
      // console.log(this);
    }
    // console.log(onlines);
    return (
      <div className={styles.home}>
        <div className={styles.homeNotify}>
          {/* <h2>警务保障部</h2>
          <Divider /> */}
          <div id="container" className={styles['map-view']} />
        </div>
      </div>
    );
  }
}
