import { getAllcarList, getVehicleTypeAll, addNewCar } from '../services/api';

export default {
  namespace: 'car',

  state: {
    carList: [],
    carListLoading: false,
    typeList: [],
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
    *getVehicleTypeAll(_, { call, put }) {
      const response = yield call(getVehicleTypeAll);
      if (response && response.vehicleTypes instanceof Array) {
        yield put({
          type: 'saveTypeList',
          typeList: response.vehicleTypes,
        });
      }
    },
    *addCar({ payload, callback }, { call }) {
      yield call(addNewCar, payload);
      if (callback) {
        callback();
      }
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
    saveTypeList(state, { typeList }) {
      return {
        ...state,
        typeList,
      };
    },
  },
};
