import { getAllUserList } from '../services/api';

export default {
  namespace: 'person',

  state: {
    userList: [],
    ListLoading: false,
  },

  effects: {
    *getAllList(_, { call, put }) {
      yield put({
        type: 'changeListLoad',
        ListLoading: true,
      });
      const response = yield call(getAllUserList);
      if (response && response.sysusers instanceof Array) {
        yield put({
          type: 'saveList',
          userList: response.sysusers,
        });
      }
      yield put({
        type: 'changeListLoad',
        ListLoading: false,
      });
    },
  },

  reducers: {
    changeListLoad(state, { ListLoading }) {
      return {
        ...state,
        ListLoading,
      };
    },
    saveList(state, { userList }) {
      return {
        ...state,
        userList,
      };
    },
  },
};
