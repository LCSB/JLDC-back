import { routerRedux } from 'dva/router';
import moment from 'moment';
import { getOrderDatail, getUseCarReason, getAvailableVehicles, createOrder, reviseOrder } from '../services/api';

export default {
  namespace: 'orderDetail',

  state: {
    detailList: {},
    detailLoading: false,
    reasonList: [],
    AvailableVehicles: {},
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
      }
      yield put({
        type: 'changeListLoading',
        detailLoading: false,
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
      yield put(routerRedux.push('/task/order'));
    },
    *reviseOrder({ payload }, { call, put }) {
      yield put({
        type: 'changeListLoading',
        detailLoading: true,
      });
      yield call(reviseOrder, payload);
      yield put(routerRedux.push('/task/order'));
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
  },
};
