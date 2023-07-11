// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ============================== DASHBOARD MENU ITEMS ============================== //

const dashboard = {
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Trang chủ',
      type: 'item',
      url: '',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
