import { isUrl } from '../utils/utils';

const menuData = [{
  name: 'dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  hideInMenu: true,
  children: [{
    name: '分析页',
    path: 'analysis',
  }, {
    name: '监控页',
    path: 'monitor',
  }, {
    name: '工作台',
    path: 'workplace',
    // hideInMenu: true,
  }],
}, {
  name: '主页',
  icon: 'home',
  path: 'home',
},
{
  name: '基本信息',
  icon: 'solution',
  path: 'basic',
  children: [
    {
      name: '人员',
      path: 'person',
    },
    {
      name: '部门',
      path: 'org',
    },
    {
      name: '角色',
      path: 'roleSet',
    },
  ],
},
{
  name: '车辆信息',
  icon: 'solution',
  path: 'carMes',
  children: [
    {
      name: '车辆',
      path: 'car',
    },
    {
      name: '车辆用途',
      path: 'carType',
      hideInMenu: true,
    },
    {
      name: '车型',
      path: 'carModal',
    },
    {
      name: '用车原因',
      path: 'CarPrototype',
    },
  ],
},
{
  name: '任务调度',
  icon: 'profile',
  path: 'task',
  children: [
    {
      name: '派车单',
      path: 'order',
    },
  ],
},
// {
//   name: '人员',
//   icon: 'dashboard',
//   path: 'person',
// }, {
//   name: '车辆',
//   icon: 'dashboard',
//   path: 'car',
// }, {
//   name: '派车单',
//   icon: 'dashboard',
//   path: 'order',
// },
{
  name: '派车单详情',
  icon: 'dashboard',
  path: 'orderDetail',
  hideInMenu: true,
},
// {
//   name: '部门',
//   icon: 'dashboard',
//   path: 'org',
// }, {
//   name: '财务',
//   icon: 'dashboard',
//   path: 'caiwu',
// }, {
//   name: '设置',
//   icon: 'dashboard',
//   path: 'roleSet',
// },
{
  name: '表单页',
  icon: 'form',
  path: 'form',
  hideInMenu: true,
  children: [{
    name: '基础表单',
    path: 'basic-form',
  }, {
    name: '分步表单',
    path: 'step-form',
  }, {
    name: '高级表单',
    authority: 'admin',
    path: 'advanced-form',
  }],
}, {
  name: '列表页',
  icon: 'table',
  path: 'list',
  hideInMenu: true,
  children: [{
    name: '查询表格',
    path: 'table-list',
  }, {
    name: '标准列表',
    path: 'basic-list',
  }, {
    name: '卡片列表',
    path: 'card-list',
  }, {
    name: '搜索列表',
    path: 'search',
    children: [{
      name: '搜索列表（文章）',
      path: 'articles',
    }, {
      name: '搜索列表（项目）',
      path: 'projects',
    }, {
      name: '搜索列表（应用）',
      path: 'applications',
    }],
  }],
}, {
  name: '详情页',
  icon: 'profile',
  path: 'profile',
  hideInMenu: true,
  children: [{
    name: '基础详情页',
    path: 'basic',
  }, {
    name: '高级详情页',
    path: 'advanced',
    authority: 'admin',
  }],
}, {
  name: '结果页',
  icon: 'check-circle-o',
  path: 'result',
  hideInMenu: true,
  children: [{
    name: '成功',
    path: 'success',
  }, {
    name: '失败',
    path: 'fail',
  }],
}, {
  name: '异常页',
  icon: 'warning',
  path: 'exception',
  hideInMenu: true,
  children: [{
    name: '403',
    path: '403',
  }, {
    name: '404',
    path: '404',
  }, {
    name: '500',
    path: '500',
  }, {
    name: '触发异常',
    path: 'trigger',
  }],
}, {
  name: '账户',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
