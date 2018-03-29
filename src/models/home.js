import {
  getCarStatusCoord,
} from '../services/api';

export default {
  namespace: 'home',

  state: {
    onlines: [],
    // onlinesLoad: false,
  },

  effects: {
    *getCarStatusCoord(_, { call, put }) {
      // yield put({
      //   type: 'saveOnlineLoad',
      //   onlinesLoad: true,
      // });
      const response = yield call(getCarStatusCoord);
      if (response && response.onlines instanceof Array) {
        yield put({
          type: 'saveOnline',
          onlines: response.onlines,
        });
      }
      // yield put({
      //   type: 'saveOnlineLoad',
      //   onlinesLoad: false,
      // });
    },
  },

  reducers: {
    saveOnline(state, { onlines }) {
      return {
        ...state,
        onlines,
      };
    },
  },
};
