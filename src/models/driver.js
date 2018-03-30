import { getAllOrgList } from '../services/api';

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
      const response = yield call(getAllOrgList);
      if (!response) {
        yield put({
          type: 'saveDriverList',
          driverList: response.organization_list,
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
