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

// 获取登陆用户系统信息
export async function getSysUser() {
  return request('/api/admin/sysuser/current_user_ext_get', {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 获取车辆在线状态
export async function getCarStatusCoord() {
  return request('/api/admin/vehicle/vehicle_online', {
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

// 添加用户
export async function addUser(params) {
  return request('/api/admin/sysuser/sys_user_add', {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 修改用户
export async function reviseUser(params) {
  return request(`/api/admin/sysuser/sys_user_update?id=${params.id}`, {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 删除用户
export async function deleteSysUser(params) {
  return request(`/api/admin/sysuser/sys_user_delete?id=${params}`, {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 获取微信用户
export async function getWeChatList() {
  return request('/api/admin/user/user_get_all', {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 改变微信用户状态
export async function reviseWeChat(params) {
  return request(`/api/admin/user/user_update?id=${params.id}`, {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 删除微信用户
export async function deleteWeChat(params) {
  return request(`/api/admin/user/user_delete?id=${params}`, {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 获取车辆信息
export async function getAllcarList() {
  return request('/api/admin/vehicle/vehicle_get_all', {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 获取车型信息
export async function getAllCarModalList() {
  return request('/api/admin/vehicle/vehicle_model_get_all', {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 添加车型信息
export async function addCarModal(params) {
  return request('/api/admin/vehicle/vehicle_model_add', {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 修改车型信息
export async function reviseCarModal(params) {
  return request(`/api/admin/vehicle/vehicle_model_update?id=${params.id}`, {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 删除车型信息
export async function deleteCarModal(params) {
  return request(`/api/admin/vehicle/vehicle_model_delete?id=${params}`, {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 添加车辆
export async function addNewCar(params) {
  return request('/api/admin/vehicle/vehicle_add', {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 修改车辆
export async function reviseCar(params) {
  return request(`/api/admin/vehicle/vehicle_update?id=${params.id}`, {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 删除车辆
export async function deleteCar(params) {
  return request(`/api/admin/vehicle/vehicle_delete?id=${params}`, {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 获取车辆调度信息
export async function getCarStatusList() {
  // console.log(1);
  // return request('/api/admin/vehicle/vehicle_status', {
  //   method: 'POST',
  //   headers: {
  //     'x-token': getAuthority(),
  //   },
  // });
}

// 获取车辆用途
export async function getVehicleTypeAll() {
  return request('/api/admin/vehicle/vehicle_type_get_all', {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 用车原因列表
export async function getUseCarReason() {
  return request('/api/admin/vehicle/vehicle_prototyepe_get_all', {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 添加用车原因
export async function addCarReason(params) {
  return request('/api/admin/vehicle/vehicle_prototyepe_add', {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 修改用车原因
export async function reviseCarReason(params) {
  return request(`/api/admin/vehicle/vehicle_prototyepe_update?id=${params.id}`, {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 删除用车原因
export async function deleteCarReason(params) {
  return request(`/api/admin/vehicle/vehicle_prototyepe_delete?id=${params}`, {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 获取订单列表
export async function getAllOrderList() {
  return request('/api/admin/vehicle/vehicle_order_get_all', {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 获取指定订单信息
export async function getOrderDatail(params) {
  return request(`/api/admin/vehicle/vehicle_order_get?id=${params}`, {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 创建订单信息
export async function createOrder(params) {
  return request('/api/admin/vehicle/vehicle_order_add', {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 修改订单信息
export async function reviseOrder(params) {
  return request(`/api/admin/vehicle/vehicle_order_update?id=${params.id}`, {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 获取可用车辆
export async function getAvailableVehicles(params) {
  return request(`/api/admin/vehicle/current_user_vehicle?user_id=${params.user_id}&start_time=${params.start_time}&end_time=${params.end_time}`, {
    method: 'POST',
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 获取指定订单历史车辆轨迹信息
export async function getOrderHistory(params) {
  return request(`/api/admin/vehicle/vehicle_order_get?id=${params}`, {
    method: 'POST',
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
//  添加单位列表
export async function addlist(params) {
  return request('/api/admin/organization/organization_add', {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}
// 修改单位列表
export async function resivelist(params) {
  console.log(getAuthority());
  return request(`/api/admin/organization/organization_update?id=${params.id}`, {
    method: 'POST',
    body: params,
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
// 添加单位
export async function addRole(params) {
  return request('/api/admin/sysuser/sysuser_role_add', {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 修改单位
export async function resiveRole(params) {
  console.log(getAuthority());
  return request(`/api/admin/sysuser/sysuser_role_update?id=${params.id}`, {
    method: 'POST',
    body: params,
    headers: {
      'x-token': getAuthority(),
    },
  });
}

// 删除单位
export async function deleteRole(params) {
  return request(`/api/admin/sysuser/sysuser_role_delete?id=${params}`, {
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
