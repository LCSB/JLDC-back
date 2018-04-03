import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  getOrderDatail, getUseCarReason, getAvailableVehicles, createOrder, reviseOrder,
  getAvailableDriver, getOrderHistory,
} from '../services/api';

export default {
  namespace: 'orderDetail',

  state: {
    detailList: {},
    detailLoading: false,
    reasonList: [],
    AvailableVehicles: {},
    AvailableDriver: [],
    RouterLoad: false,
    HistortyRoutes: [],
  },

  effects: {
    *getOrderList({ payload }, { call, put }) {
      yield put({
        type: 'changeListLoading',
        detailLoading: true,
      });
      const response = yield call(getOrderDatail, payload);
      if (response && response.error.msg === 'success') {
        yield put({
          type: 'saveList',
          detailList: response.vehicleOrderExt,
        });
        const orderMes = response.vehicleOrderExt.vehicle_order;
        const getCarDate = 'YYYY-MM-DD HH:mm:ss';
        const params = {
          user_id: orderMes.originator,
          start_time: moment(orderMes.start_time).format(getCarDate),
          end_time: moment(orderMes.end_time).format(getCarDate),
        };
        const responseAvailable = yield call(getAvailableVehicles, params);
        if (responseAvailable && responseAvailable.error.code === 0) {
          yield put({
            type: 'saveAvailableVehicles',
            AvailableVehicles: responseAvailable,
          });
        }
        const responseDrivers = yield call(getAvailableDriver, params);
        if (responseDrivers && responseDrivers.error.code === 0) {
          yield put({
            type: 'saveAvailableDriver',
            AvailableDriver: responseDrivers['vehicle-driver'],
          });
        }
      }
      yield put({
        type: 'changeListLoading',
        detailLoading: false,
      });
    },
    // 获取车辆历史行驶信息
    *getHistoryRouter({ payload }, { call, put }) {
      yield put({
        type: 'changeRouterLoading',
        RouterLoad: true,
      });
      const response = yield call(getOrderHistory, payload);
      if (response && response.routes instanceof Array) {
        put({
          type: 'saveRoutes',
          HistortyRoutes: response.routes,
        });
      }
      yield put({
        type: 'changeRouterLoading',
        RouterLoad: false,
      });
    },
    *getUseCarReason(_, { call, put }) {
      yield put({
        type: 'changeListLoading',
        detailLoading: true,
      });
      const response = yield call(getUseCarReason);
      if (response && response.vehicleTypes instanceof Array) {
        yield put({
          type: 'saveReasons',
          reasonList: response.vehicleTypes,
        });
      }
      yield put({
        type: 'changeListLoading',
        detailLoading: false,
      });
    },
    *createOrder({ payload }, { call, put }) {
      yield put({
        type: 'changeListLoading',
        detailLoading: true,
      });
      yield call(createOrder, payload);
      yield put(routerRedux.push('/carMes/order'));
    },
    *reviseOrder({ payload }, { call, put }) {
      yield put({
        type: 'changeListLoading',
        detailLoading: true,
      });
      yield call(reviseOrder, payload);
      yield put(routerRedux.push('/carMes/order'));
    },
    *getAvailableVehicles({ payload }, { call, put }) {
      yield put({
        type: 'changeListLoading',
        detailLoading: true,
      });
      const response = yield call(getAvailableVehicles, payload);
      if (response && response.error.code === 0) {
        yield put({
          type: 'saveAvailableVehicles',
          AvailableVehicles: response,
        });
      }
      yield put({
        type: 'changeListLoading',
        detailLoading: false,
      });
    },
    *getAvailableDriver({ payload }, { call, put }) {
      yield put({
        type: 'changeListLoading',
        detailLoading: true,
      });
      const response = yield call(getAvailableDriver, payload);
      if (response && response.error.code === 0) {
        yield put({
          type: 'saveAvailableDriver',
          AvailableDriver: response['vehicle-driver'],
        });
      }
      yield put({
        type: 'changeListLoading',
        detailLoading: false,
      });
    },
  },

  reducers: {
    saveList(state, { detailList }) {
      return {
        ...state,
        detailList,
      };
    },
    changeListLoading(state, { detailLoading }) {
      return {
        ...state,
        detailLoading,
      };
    },
    changeRouterLoading(state, { RouterLoad }) {
      return {
        ...state,
        RouterLoad,
      };
    },
    saveRoutes(state, { HistortyRoutes }) {
      return {
        ...state,
        HistortyRoutes,
      };
    },
    saveReasons(state, { reasonList }) {
      return {
        ...state,
        reasonList,
      };
    },
    saveAvailableVehicles(state, { AvailableVehicles }) {
      return {
        ...state,
        AvailableVehicles,
      };
    },
    saveAvailableDriver(state, { AvailableDriver }) {
      return {
        ...state,
        AvailableDriver,
      };
    },
    clearOrderHistory(state) {
      return {
        ...state,
        detailList: {},
      };
    },
  },
};
