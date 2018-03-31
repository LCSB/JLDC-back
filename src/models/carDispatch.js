import {
  getCarStatusList,
} from '../services/api';

export default {
  namespace: 'carDispatch',

  state: {
    StatusLoad: false,
    StatusList: [],
  },

  effects: {
    *getCarStatusList({ payload }, { call, put }) {
      yield put({
        type: 'changeStatusLoad',
        StatusLoad: true,
      });
      const response = yield call(getCarStatusList, payload);
      if (response && response.vehicleStatus) {
        yield put({
          type: 'saveStatusList',
          StatusList: response.vehicleStatus,
        });
      }
      yield put({
        type: 'changeStatusLoad',
        StatusLoad: false,
      });
    },
  },

  reducers: {
    changeStatusLoad(state, { StatusLoad }) {
      return {
        ...state,
        StatusLoad,
      };
    },
    saveStatusList(state, { StatusList }) {
      return {
        ...state,
        StatusList,
      };
    },
  },
};
