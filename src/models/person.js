import {
  getAllUserList, getAllOrgList, addUser, reviseUser, deleteSysUser, getWeChatList,
  reviseWeChat, deleteWeChat,
} from '../services/api';

export default {
  namespace: 'person',

  state: {
    userList: [],
    ListLoading: false,
    orgList: [],
    WeChatList: [],
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
    *addPerson({ payload, callback }, { call }) {
      yield call(addUser, payload);
      if (callback) {
        callback();
      }
    },
    *revisePerson({ payload, callback }, { call }) {
      yield call(reviseUser, payload);
      if (callback) {
        callback();
      }
    },
    *deleteUser({ payload, callback }, { call }) {
      yield call(deleteSysUser, payload);
      if (callback) {
        callback();
      }
    },

    // 微信用户
    *getWeChatList(_, { call, put }) {
      yield put({
        type: 'changeListLoad',
        ListLoading: true,
      });
      const response = yield call(getWeChatList);
      if (response && response.userExts instanceof Array) {
        yield put({
          type: 'saveWeChatList',
          WeChatList: response.userExts,
        });
      }
      yield put({
        type: 'changeListLoad',
        ListLoading: false,
      });
    },
    *reviseWeChatStatus({ payload, callback }, { call }) {
      yield call(reviseWeChat, payload);
      if (callback) {
        callback();
      }
    },
    *deleteWeChat({ callback }, { call }) {
      yield call(deleteWeChat);
      if (callback) {
        callback();
      }
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
    saveWeChatList(state, { WeChatList }) {
      return {
        ...state,
        WeChatList,
      };
    },
  },
};
