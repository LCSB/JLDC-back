import { getAllcarList } from '../services/api';

export default {
  namespace: 'car',

  state: {
    carList: [],
    carListLoading: false,
  },

  effects: {
    *getAllCarList(_, { call, put }) {
      yield put({
        type: 'changeListLoading',
        carListLoading: true,
      });
      const response = yield call(getAllcarList);
      if (response && response.vehicles instanceof Array) {
        yield put({
          type: 'saveList',
          carList: response.vehicles,
        });
      }
      yield put({
        type: 'changeListLoading',
        carListLoading: false,
      });
    },
  },
  reducers: {
    changeListLoading(state, { carListLoading }) {
      return {
        ...state,
        carListLoading,
      };
    },
    saveList(state, { carList }) {
      return {
        ...state,
        carList,
      };
    },
  },
};
