import { stringify } from 'qs';
import request from '../utils/request';
import { getAuthority } from '../utils/authority';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

// 登陆
export async function fakeAccountLogin(params) {
  return request(`/api/admin/auth/auth_admin?phone=${params.phone}&password=${params.password}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

// 获取用户系统信息
export async function getSysUser() {
  return request('/api/admin/sysuser/current_user_ext_get', {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 查找用户
export async function getAllUserList() {
  return request('/api/admin/sysuser/sys_user_get_all', {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 删除用户
export async function deleteSysUser(params) {
  return request('/admin/sysuser/sys_user_delete', {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 获取所有单位列表
export async function getAllOrgList() {
  return request('/api/admin/organization/organization_all', {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 获取所有权限
export async function getAllRoleList() {
  return request('/api/admin/sysuser/sysuser_role_get_all', {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
