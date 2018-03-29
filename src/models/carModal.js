import { getAllCarModalList } from '../services/api';

export default {
  namespace: 'carModal',

  state: {
    List: [],
    ListLoading: false,
  },

  effects: {
    *getCarModalList(_, { call, put }) {
      yield put({
        type: 'changeListLoading',
        ListLoading: true,
      });
      const response = yield call(getAllCarModalList);
      if (response && response.vehicleModels instanceof Array) {
        yield put({
          type: 'saveList',
          List: response.vehicleModels,
        });
      }
      yield put({
        type: 'changeListLoading',
        ListLoading: false,
      });
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
