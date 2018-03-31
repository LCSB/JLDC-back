import {
  getAllcarList, getVehicleTypeAll, addNewCar, getAllCarModalList,
  reviseCar, deleteCar, addCarModal, getCarOrderList,
} from '../services/api';

export default {
  namespace: 'car',

  state: {
    carList: [],
    carListLoading: false,
    typeList: [],
    ModalList: [],
    carOrderList: [],
    carOrderLoad: false,
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
    *getAllCarModalList(_, { call, put }) {
      const response = yield call(getAllCarModalList);
      if (response && response.vehicleModels instanceof Array) {
        yield put({
          type: 'saveModalList',
          ModalList: response.vehicleModels,
        });
      }
    },
    *addCar({ payload, callback }, { call }) {
      yield call(addNewCar, payload);
      if (callback) {
        callback();
      }
    },
    *addCarModal({ payload }, { call }) {
      yield call(addCarModal, payload);
    },
    *reviseCar({ payload, callback }, { call }) {
      yield call(reviseCar, payload);
      if (callback) {
        callback();
      }
    },
    *deleteCar({ payload, callback }, { call }) {
      yield call(deleteCar, payload);
      if (callback) {
        callback();
      }
    },
    *getCarOrderList({ payload }, { call, put }) {
      yield put({
        type: 'changeCarOrderLoad',
        carOrderLoad: true,
      });
      // console.log(payload);
      const response = yield call(getCarOrderList, payload);
      if (response && response.vehicleOrderExts instanceof Array) {
        yield put({
          type: 'saveCarOrderList',
          carOrderList: response.vehicleOrderExts,
        });
      }
      yield put({
        type: 'changeCarOrderLoad',
        carOrderLoad: false,
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
    saveTypeList(state, { typeList }) {
      return {
        ...state,
        typeList,
      };
    },
    saveModalList(state, { ModalList }) {
      return {
        ...state,
        ModalList,
      };
    },
    changeCarOrderLoad(state, { carOrderLoad }) {
      return {
        ...state,
        carOrderLoad,
      };
    },
    saveCarOrderList(state, { carOrderList }) {
      return {
        ...state,
        carOrderList,
      };
    },
  },
};
