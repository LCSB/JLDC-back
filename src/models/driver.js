import { getAllDriverList } from '../services/api';

export default {
  namespace: 'driver',

  state: {
    driverList: [],
    driverLoad: false,
  },

  effects: {
    *getDriverList(_, { call, put }) {
      yield put({
        type: 'changeDriverLoad',
        driverLoad: true,
      });
      const response = yield call(getAllDriverList);
      if (response && response.sysusers instanceof Array) {
        yield put({
          type: 'saveDriverList',
          driverList: response.sysusers,
        });
      }
      yield put({
        type: 'changeDriverLoad',
        driverLoad: false,
      });
    },
  },

  reducers: {
    saveDriverList(state, { driverList }) {
      return {
        ...state,
        driverList,
      };
    },
    changeDriverLoad(state, { driverLoad }) {
      return {
        ...state,
        driverLoad,
      };
    },
  },
};
