import { getVehicleTypeAll } from '../services/api';

export default {
  namespace: 'carType',

  state: {
    List: [],
    ListLoading: false,
  },

  effects: {
    *getCarTypeList(_, { call, put }) {
      yield put({
        type: 'changeListLoading',
        ListLoading: true,
      });
      const response = yield call(getVehicleTypeAll);
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
