import { getAllRoleList } from '../services/api';

export default {
  namespace: 'role',

  state: {
    roleList: [],
    ListLoading: false,
  },

  effects: {
    *getList(_, { call, put }) {
      yield put({
        type: 'changeListLoading',
        List: true,
      });
      const response = yield call(getAllRoleList);
      if (response && response.sysuser_roles instanceof Array) {
        yield put({
          type: 'saveList',
          roleList: response.sysuser_roles,
        });
      }
      yield put({
        type: 'changeListLoading',
        List: false,
      });
    },
  },

  reducers: {
    saveList(state, { roleList }) {
      return {
        ...state,
        roleList,
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
