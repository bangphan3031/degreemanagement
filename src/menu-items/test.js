// assets
import { IconUser, IconSettings, IconBrowserCheck } from '@tabler/icons';

// constant
const icons = {
  IconUser, IconSettings, IconBrowserCheck
};

// ==============================|| TEST MENU ITEMS ||============================== //

const test = {
  id: 'test',
  title: 'Hệ thống',
  type: 'group',
  children: [
    {
      id: 'test-api',
      title: 'Người dùng',
      type: 'item',
      url: '/test/testAPI',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'role',
      title: 'Nhóm quyền',
      type: 'item',
      url: '/role/Role',
      icon: icons.IconBrowserCheck,
      breadcrumbs: false
    },
    {
      id: 'function',
      title: 'Chức năng',
      type: 'item',
      url: '/function/function',
      icon: icons.IconSettings,
      breadcrumbs: false
    }
    
  ]
};

export default test;
