import {
  getUseCarReason, addCarReason, deleteCarReason, reviseCarReason,
} from '../services/api';

export default {
  namespace: 'CarPrototype',

  state: {
    List: [],
    ListLoading: false,
  },

  effects: {
    *getUseCarReason(_, { call, put }) {
      yield put({
        type: 'changeListLoading',
        ListLoading: true,
      });
      const response = yield call(getUseCarReason);
      if (response && response.vehicleTypes instanceof Array) {
        yield put({
          type: 'saveList',
          List: response.vehicleTypes,
        });
      }
      yield put({
        type: 'changeListLoading',
        ListLoading: false,
      });
    },
    *addCarPrototype({ payload, callback }, { call }) {
      yield call(addCarReason, payload);
      if (callback) {
        callback();
      }
    },
    *reviseCarPrototype({ payload, callback }, { call }) {
      yield call(reviseCarReason, payload);
      if (callback) {
        callback();
      }
    },
    *deleteCarPrototype({ payload, callback }, { call }) {
      yield call(deleteCarReason, payload);
      if (callback) {
        callback();
      }
    },
  },

  reducers: {
    saveList(state, { List }) {
      return {
        ...state,
        List,
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
