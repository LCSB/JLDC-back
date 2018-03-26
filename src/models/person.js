import { getAllUserList, getAllOrgList } from '../services/api';

export default {
  namespace: 'person',

  state: {
    userList: [],
    ListLoading: false,
    orgList: [],
  },

  effects: {
    *getOrgList(_, { call, put }) {
      const response = yield call(getAllOrgList);
      if (response && response.organization_list instanceof Array) {
        yield put({
          type: 'saveOrgList',
          orgList: response.organization_list,
        });
      }
    },
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
    saveOrgList(state, { orgList }) {
      return {
        ...state,
        orgList,
      };
    },
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
