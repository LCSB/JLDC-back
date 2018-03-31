import { getAllOrgList, addlist, resivelist } from '../services/api';

export default {
  namespace: 'org',

  state: {
    List: [],
    ListLoading: false,
  },

  effects: {
    *getOrgList(_, { call, put }) {
      yield put({
        type: 'changeListLoading',
        ListLoading: true,
      });
      const response = yield call(getAllOrgList);
      if (response && response.organization_list instanceof Array) {
        yield put({
          type: 'saveList',
          List: response.organization_list,
        });
      }
      yield put({
        type: 'changeListLoading',
        ListLoading: false,
      });
    },

    *addlist({ payload, callback }, { call }) {
      yield call(addlist, payload);
      if (callback) {
        callback();
      }
    },
    *resivelist({ payload, callback }, { call }) {
      yield call(resivelist, payload);
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
