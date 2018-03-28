import { getAllOrderList, reviseOrder } from '../services/api';

export default {
  namespace: 'order',

  state: {
    orderList: [],
    ListLoading: false,
  },

  effects: {
    *getOrderList(_, { call, put }) {
      yield put({
        type: 'changeListLoading',
        ListLoading: true,
      });
      const response = yield call(getAllOrderList);
      if (response && response.vehicleOrderExts instanceof Array) {
        yield put({
          type: 'saveList',
          orderList: response.vehicleOrderExts,
        });
      }
      yield put({
        type: 'changeListLoading',
        ListLoading: false,
      });
    },
    *reviseOrder({ callback, payload }, { call }) {
      yield call(reviseOrder, payload);
      if (callback) {
        callback();
      }
    },
  },

  reducers: {
    saveList(state, { orderList }) {
      return {
        ...state,
        orderList,
      };
    },
    changeListLoading(state, { ListLoading }) {
      return {
        ...state,
        ListLoading,
      };
    },
  },
};
