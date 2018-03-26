import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';
import { setAuthority, clearAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    submitting: false,
    loginLoading: false,
  },

  effects: {
    *login({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmit',
        payload: false,
      });
      yield put({
        type: 'changeLoad',
        payload: true,
      });
      const response = yield call(fakeAccountLogin, payload);
      if (response && response.auth) {
        setAuthority(response.auth);
        yield put({
          type: 'changeLoad',
          payload: false,
        });
        yield put(routerRedux.push('/'));
      } else {
        yield put({
          type: 'changeLoad',
          payload: false,
        });
        yield put({
          type: 'changeSubmit',
          payload: true,
        });
      }
      // let oReq = new XMLHttpRequest();
      // let response = {};
      // yield oReq.onload = () => {
      //   response = JSON.parse(oReq.response);
      //   if (response && response.auth) {
      //     setAuthority(payload.auth)
      //     console.log(1);
      //     routerRedux.push('/');
      //   } else {
      //     // yield put({
      //     //   type: 'changeLoad',
      //     //   payload: false,
      //     // });
      //     // yield put({
      //     //   type: 'changeSubmit',
      //     //   payload: true,
      //     // });
      //   }
      // };
      // oReq.open(
      //   "post",
      //   `http://www.superdata-tech.com/api/admin/auth/auth_admin?phone=${payload.phone}&password=${payload.password}`,
      //   true
      // );
      // oReq.send();
      // Login successfully
    },
    *logout(_, { put }) {
      yield clearAuthority();
      reloadAuthorized();
      yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
    changeSubmit(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
    changeLoad(state, { payload }) {
      return {
        ...state,
        loginLoading: payload,
      };
    },
  },
};
