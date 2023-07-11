import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { menuSelector } from 'store/selectors';

import Icons from '../../../../utils/icons';
import NavGroup from './NavGroup';
import Dashboard from '../../../../menu-items/dashboard';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const menuData = useSelector(menuSelector);

  const createMenu = (menu, parentId = 0) => {
    const menuItems = menu.filter((item) => item.parentId === parentId);

    return menuItems.map((item) => {
      const menuItem = {
        id: `menu-${item.menuId}`,
        title: item.nameMenu.replace(/-/g, ''),
        type: item.levelMenu === 1 ? 'group' : 'item',
        url: item.link,
        icon: item.icon === '' ? item.icon : Icons[item.icon] || item.icon
      };

      const children = createMenu(menuData, item.menuId);
      if (children.length > 0) {
        delete menuItem.url;
        menuItem.children = children;
        if (menuItem.type !== 'group') {
          menuItem.type = 'collapse';
        }
      }

      return menuItem;
    });
  };

  const transformedMenuData = createMenu(menuData);
  transformedMenuData.unshift(Dashboard);

  const menu = { items: transformedMenuData };

  const navItems = menu.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });
  return <>{navItems}</>;
};

export default MenuList;
